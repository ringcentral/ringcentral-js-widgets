import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { reduce, filter, forEach, find } from 'ramda';
import { parse } from 'babylon';
import generate from 'babel-generator';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';

import compileLocaleData from '../compileLocaleData';
import defaultConfig from '../defaultConfig';
import readXlfData from '../readXlfData';

function writeFiles({
  localeData,
  sourceFolder,
  sourceLocale,
}) {
  forEach(
    (folderPath) => {
      forEach(
        (locale) => {
          if (locale !== sourceLocale) {
            // write file
            const targetData = localeData[folderPath].files[locale];
            const { code } = generate(targetData.ast);
            const annotations = reduce(
              (result, [key, value]) => {
                result.push(
                  `// @key: @#@${JSON.stringify(key)}@#@ @source: @#@${JSON.stringify(value)}@#@`
                );
                return result;
              },
              [],
              targetData.annotations,
            ).join('\n');
            const output = `${code}\n\n${annotations}\n`;
            fs.writeFileSync(path.resolve(sourceFolder, folderPath, targetData.file), output);
          }
        },
        Object.keys(localeData[folderPath].files)
      );
    },
    Object.keys(localeData),
  );
}

function mergeTranslationData({
  localeData,
  translations = {},
  sourceFolder,
  sourceLocale,
}) {
  // clean up original Data
  forEach(
    (folderPath) => {
      forEach(
        (locale) => {
          if (locale !== sourceLocale) {
            const targetData = localeData[folderPath].files[locale];
            const sourceData = localeData[folderPath].files[sourceLocale];
            const relativePath = path.relative(
              sourceFolder,
              path.resolve(folderPath, targetData.file),
            );
            targetData.data = reduce(
              (newData, [key, value]) => {
                if (sourceData.data.has(key)) {
                  if (sourceData.data.get(key).value === value.source) {
                    newData.set(key, value);
                  } else {
                    console.log(`[locale] ${chalk.red('{Delete}')} Key: '${key}', File: '${relativePath}', Reason: Source value changed.`);
                  }
                } else {
                  console.log(`[locale] ${chalk.red('{Delete}')} Key: '${key}', File: '${relativePath}', Reason: Source no longer exist.`);
                }
                return newData;
              },
              new Map(),
              targetData.data,
            );
          }
        },
        Object.keys(localeData[folderPath].files)
      );
    },
    Object.keys(localeData),
  );

  // merge in translations
  forEach(
    (locale) => {
      forEach(
        (fileName) => {
          const filePath = path.resolve(sourceFolder, fileName);
          const folderPath = path.dirname(filePath);

          if (localeData[folderPath] && localeData[folderPath].files[sourceLocale]) {
            const sourceData = localeData[folderPath].files[sourceLocale].data;
            if (!localeData[folderPath].files[locale]) {
              localeData[folderPath].files[locale] = {
                file: `${formatLocale(locale)}.js`
              };
            }
            if (!localeData[folderPath].files[locale].data) {
              localeData[folderPath].files[locale].data = new Map();
            }
            const originalData = localeData[folderPath].files[locale].data;
            const translatedData = translations[locale][fileName];
            forEach(
              (key) => {
                if (!sourceData.has(key)) {
                  console.log(`[locale] ${chalk.red('{Skip}')} Key: '[${key}]', File: '${fileName}', Reason: Source no longer exist.`);
                  return;
                }
                if (sourceData.get(key).value !== translatedData[key].source) {
                  console.log(`[locale] ${chalk.red('{Skip}')} Key: '[${key}]', File: '${fileName}', Reason: Source value changed.`);
                  return;
                }
                originalData.set(key, {
                  ...translatedData[key],
                  key,
                });
              },
              Object.keys(translatedData),
            );
          }
        },
        Object.keys(translations[locale]),
      );
    },
    Object.keys(translations),
  );

  // Update ast and generate code
  forEach(
    (folderPath) => {
      forEach(
        (locale) => {
          if (locale !== sourceLocale) {
            const targetData = localeData[folderPath].files[locale];
            const sourceData = localeData[folderPath].files[sourceLocale];
            targetData.ast = parse(sourceData.content, { sourceType: 'module' });
            targetData.annotations = new Map();

            const defaultExport = find(
              item => item.type === 'ExportDefaultDeclaration',
              targetData.ast.program.body,
            );
            const properties = filter(
              (prop) => {
                const key = prop.key.type === 'MemberExpression' ?
                  `[${generate(prop.key).code}]` :
                  generate(prop.key).code;
                const entry = targetData.data.get(key);
                if (entry && entry.value) {
                  prop.value = {
                    type: 'StringLiteral',
                    value: entry.value,
                    extra: {
                      // generate desired raw to by pass babel jsesc use
                      raw: JSON.stringify(entry.value),
                      rawValue: entry.value,
                    }
                  };
                  targetData.annotations.set(key, sourceData.data.get(key).value);
                  return true;
                }
                return false;
              },
              defaultExport.declaration.properties,
            );
            defaultExport.declaration.properties = properties;
          }
        },
        Object.keys(localeData[folderPath].files)
      );
    },
    Object.keys(localeData),
  );
  return localeData;
}

export default function importLocale({
  sourceFolder = defaultConfig.sourceFolder,
  localizationFolder = defaultConfig.localizationFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales,
} = {}) {
  if (!supportedLocales) {
    throw new Error('options.supportedLocales is missing');
  }
  const localeData = compileLocaleData({
    sourceFolder,
    sourceLocale,
    supportedLocales,
  });
  const translations = readXlfData({
    localizationFolder,
    supportedLocales,
  });
  const mergedData = mergeTranslationData({
    localeData,
    translations,
    sourceFolder,
    sourceLocale,
  });
  writeFiles({
    localeData: mergedData,
    sourceFolder,
    sourceLocale,
  });
}
