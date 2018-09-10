import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { reduce, filter, forEach, find } from 'ramda';
import { parse } from 'babylon';
import generate from 'babel-generator';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import inquirer from 'inquirer';

import compileLocaleData from '../compileLocaleData';
import defaultConfig from '../defaultConfig';
import readXlfData from '../readXlfData';
import asyncReduce from '../asyncReduce';
import asyncForEach from '../asyncForEach';

const prompt = inquirer.createPromptModule();

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

function formatReason({
  reason,
  key,
  fileName,
  type,
}) {
  return `[locale] ${chalk.red(`{${type}}`)} Key: '${key}', File: '${fileName}', Reason: ${reason}.`;
}

async function mergeTranslationData({
  localeData,
  translations = {},
  sourceFolder,
  sourceLocale,
  interactive = true,
  silent = false,
}) {
  // clean up original Data
  await asyncForEach(
    async (folderPath) => {
      await asyncForEach(
        async (locale) => {
          if (locale !== sourceLocale) {
            const targetData = localeData[folderPath].files[locale];
            const sourceData = localeData[folderPath].files[sourceLocale];
            const relativePath = path.relative(
              sourceFolder,
              path.resolve(folderPath, targetData.file),
            );
            targetData.data = await asyncReduce(
              async (newData, [key, value]) => {
                const type = 'Delete';
                let shouldDelete = false;
                let message;
                if (sourceData.data.has(key)) {
                  if (sourceData.data.get(key).value !== value.source) {
                    message = formatReason({
                      type,
                      reason: 'Source value changed',
                      key,
                      fileName: relativePath,
                    });
                    if (interactive) {
                      shouldDelete = (await prompt({
                        name: 'result',
                        type: 'confirm',
                        message,
                      })).result;
                    } else {
                      shouldDelete = true;
                    }
                  }
                } else {
                  message = formatReason({
                    type,
                    reason: 'Source no longer exists',
                    key,
                    fileName: relativePath,
                  });
                  if (interactive) {
                    shouldDelete = (await prompt({
                      name: 'result',
                      type: 'confirm',
                      message,
                    })).result;
                  } else {
                    shouldDelete = true;
                  }
                }
                if (shouldDelete) {
                  if (!interactive && !silent) {
                    console.log(message);
                  }
                } else {
                  newData.set(key, value);
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
  await asyncForEach(
    async (locale) => {
      await asyncForEach(
        async (fileName) => {
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
            await asyncForEach(
              async (key) => {
                const type = 'Skip';
                let shouldSkip = false;
                let message;
                if (!sourceData.has(key)) {
                  message = formatReason({
                    type,
                    reason: 'Source no longer exists',
                    key,
                    fileName,
                  });
                  if (interactive) {
                    shouldSkip = (await prompt({
                      name: 'result',
                      type: 'confirm',
                      message,
                    })).result;
                  } else {
                    shouldSkip = true;
                  }
                } else if (sourceData.get(key).value !== translatedData[key].source) {
                  message = formatReason({
                    type,
                    reason: 'Source value changed',
                    key,
                    fileName,
                  });
                  if (interactive) {
                    shouldSkip = (await prompt({
                      name: 'result',
                      type: 'confirm',
                      message,
                    })).result;
                  } else {
                    shouldSkip = true;
                  }
                }

                if (shouldSkip) {
                  if (!interactive && !silent) {
                    console.log(message);
                  }
                } else {
                  originalData.set(key, {
                    ...translatedData[key],
                    key,
                  });
                }
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
                const wrapInBracket = (
                  prop.key.type === 'MemberExpression' ||
                  prop.key.type === 'TemplateLiteral'
                );
                const key = wrapInBracket ?
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

export default async function importLocale({
  sourceFolder = defaultConfig.sourceFolder,
  localizationFolder = defaultConfig.localizationFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales,
  interactive = defaultConfig.interactive,
  silent = defaultConfig.silent,
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
  const mergedData = await mergeTranslationData({
    localeData,
    translations,
    sourceFolder,
    sourceLocale,
    interactive,
    silent,
  });
  writeFiles({
    localeData: mergedData,
    sourceFolder,
    sourceLocale,
  });
}
