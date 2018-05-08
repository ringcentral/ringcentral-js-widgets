import fs from 'fs-extra';
import path from 'path';
import xml from 'xml-js';
import escodegen from 'escodegen';
import chalk from 'chalk';

import getRawData from '../getRawData';
import defaultConfig from '../../defaultConfig';

function extractKey(str) {
  return str.substring(1, str.length - 1);
}

function extractXlfData({ locale, content }) {
  const data = xml.xml2js(content, { compact: true });
  const output = {};
  if (
    data.xliff &&
    data.xliff.file
  ) {
    const files = Array.isArray(data.xliff.file) ?
      data.xliff.file :
      [data.xliff.file];
    files.forEach((fileData) => {
      if (
        fileData._attributes &&
        fileData._attributes['target-language'] === locale &&
        fileData.body &&
        fileData.body['trans-unit']
      ) {
        const fileName = fileData._attributes.original;
        output[fileName] = {};
        const units = Array.isArray(fileData.body['trans-unit']) ?
          fileData.body['trans-unit'] :
          [fileData.body['trans-unit']];
        units.forEach((unit) => {
          if (
            unit._attributes &&
            unit._attributes.id &&
            unit.target &&
            unit.target._text
          ) {
            output[fileName][extractKey(unit._attributes.id)] = {
              value: unit.target._text,
              source: unit.source._text,
            };
          }
        });
      }
    });
  }
  return output;
}

async function readXlf({
  localizationFolder,
  supportedLocales,
}) {
  const output = {};
  await Promise.all(supportedLocales.map(async (locale) => {
    const fileName = `${locale}.xlf`;
    const filePath = path.resolve(localizationFolder, fileName);
    if ((await fs.exists(filePath)) && (await fs.stat(filePath)).isFile()) {
      const content = await fs.readFile(filePath, 'utf8');
      output[locale] = extractXlfData({ locale, content });
    }
  }));
  return output;
}

function generateMergedContent({
  content,
  ast,
  mergedData,
  annotations,
}) {
  const entries = Object.keys(mergedData)
    .map(key => mergedData[key]).sort((a, b) => a.valueStart - b.valueStart);
  let offset = 0;
  let output = content;
  entries.forEach((item) => {
    if (item.output) {
      const valueStart = ast.tokens[item.valueStart].start + offset;
      const valueEnd = ast.tokens[item.valueEnd].end + offset;
      const code = escodegen.generate({
        type: 'Literal',
        value: item.value,
      });
      output = `${output.substring(0, valueStart)}${code}${output.substring(valueEnd)}`;
      offset += code.length - (valueEnd - valueStart);
    } else {
      const startIdx = ast.tokens[item.startIdx].start + offset;
      const endIdx = ast.tokens[item.endIdx].end + offset;
      output = `${output.substring(0, startIdx)}${output.substring(endIdx)}`;
      offset -= endIdx - startIdx;
    }
  });
  const annoString = annotations.map(a => (
    `// @key: @#@${JSON.stringify(a.key)}@#@ @source: @#@${JSON.stringify(a.value)}@#@`
  )).join('\n');

  return `${output}\n${annoString}\n`;
}

async function mergeToFiles({
  rawData,
  translatedData,
  sourceFolder,
  sourceLocale,
}) {
  await Promise.all(Object.keys(translatedData).map(async (locale) => {
    await Promise.all(Object.keys(translatedData[locale]).map(async (fileName) => {
      const filePath = path.resolve(sourceFolder, fileName);
      const folderPath = path.dirname(filePath);
      if (!rawData[folderPath] || !rawData[folderPath].files[sourceLocale]) return;
      const sourceData = rawData[folderPath].files[sourceLocale].data;
      const original = (rawData[folderPath] &&
        rawData[folderPath].files &&
        rawData[folderPath].files[locale] &&
        rawData[folderPath].files[locale].data) || {};

      const annotations = Object.keys(rawData[folderPath].files[sourceLocale].data)
        .map(key => ({
          key,
          value: rawData[folderPath].files[sourceLocale].data[key].value
        }));

      const translated = translatedData[locale][fileName];
      const mergedData = {};

      Object.keys(sourceData).forEach((key) => {
        mergedData[key] = {
          ...sourceData[key],
        };
      });

      // convert original values into string literals
      Object.keys(original).forEach((key) => {
        if (!sourceData[key]) {
          console.log(`[import-locale] ${chalk.red('{Delete}')} Key: '[${key}]', Reason: Source no longer exist.`);
          return;
        }
        if (sourceData[key].value !== original[key].source) {
          console.log(`[import-locale] ${chalk.red('{Delete}')} Key: '[${key}]', Reason: Source value changed.`);
          return;
        }
        mergedData[key] = {
          ...mergedData[key],
          ...original[key],
          output: true,
        };
      });
      Object.keys(translated).forEach((key) => {
        if (!sourceData[key]) {
          console.log(`[import-locale] ${chalk.red('{Skip}')} Key: '[${key}]', Reason: Source no longer exist.`);
          return;
        }
        if (sourceData[key].value !== translated[key].source) {
          console.log(`[import-locale] ${chalk.red('{Skip}')} Key: '[${key}]', Reason: Source value changed.`);
          return;
        }
        mergedData[key] = {
          ...mergedData[key],
          ...translated[key],
          output: true,
        };
      });
      const mergedContent = generateMergedContent({
        ...rawData[folderPath].files[sourceLocale],
        mergedData,
        annotations,
      });
      await fs.writeFile(path.resolve(sourceFolder, fileName), mergedContent);
    }));
  }));
}

async function importLocale({
  sourceFolder = defaultConfig.sourceFolder,
  localizationFolder = defaultConfig.localizationFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales = defaultConfig.supportedLocales,
} = {}) {
  const rawData = await getRawData({
    sourceFolder,
    sourceLocale,
    supportedLocales,
  });
  const translatedData = await readXlf({
    localizationFolder,
    supportedLocales,
  });
  await mergeToFiles({
    rawData,
    translatedData,
    sourceFolder,
    sourceLocale,
  });
}

export default importLocale;

