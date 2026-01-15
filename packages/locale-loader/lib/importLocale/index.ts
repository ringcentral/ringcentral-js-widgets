/* eslint-disable no-inner-declarations */
import generate from '@babel/generator';
import { parse } from '@babel/parser';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
// @ts-ignore
import prettier from 'prettier';
import { forEach, reduce } from 'ramda';

import asyncForEach from '../asyncForEach';
import asyncReduce from '../asyncReduce';
import compileLocaleData from '../compileLocaleData';
import defaultConfig from '../defaultConfig';
import { readJsonData } from '../readJsonData';
import readXlfData from '../readXlfData';

const prompt = inquirer.createPromptModule();

interface AnnotationData {
  source: any;
  value: any;
}

interface TargetData {
  ast: any;
  annotations: Map<string, any>;
  data: Map<string, AnnotationData>;
  file: string;
}

interface LocaleData {
  [folderPath: string]: {
    files: {
      [locale: string]: TargetData;
    };
  };
}

interface WriteFilesParams {
  localeData: LocaleData;
  sourceFolder: string;
  sourceLocale: string;
  disableEslint?: boolean;
}

interface FormatReasonParams {
  reason: string;
  key: string;
  fileName: string;
  type: string;
}

interface MergeTranslationDataParams {
  localeData: LocaleData;
  translations?: Record<string, any>;
  sourceFolder: string;
  sourceLocale: string;
  interactive?: boolean;
  silent?: boolean;
}

interface ImportLocaleParams {
  sourceFolder?: string;
  localizationFolder?: string;
  sourceLocale?: string;
  supportedLocales?: readonly string[];
  translationLocales?: readonly string[];
  interactive?: boolean;
  silent?: boolean;
  json?: boolean;
  disableEslint?: boolean;
  rawData?: any;
}

const getAnnotations = (source: [string, any][]): string => {
  const annotations = reduce(
    (result, [key, value]) => {
      result.push(
        `// @key: @#@${JSON.stringify(key)}@#@ @source: @#@${JSON.stringify(
          value,
        )}@#@`,
      );
      return result;
    },
    [] as string[],
    source,
  ).join('\n');

  return annotations;
};

function writeFiles({
  localeData,
  sourceFolder,
  sourceLocale,
  disableEslint = true,
}: WriteFilesParams): void {
  const eslint = disableEslint ? '/* eslint-disable */\n' : '';
  forEach((folderPath) => {
    forEach((locale) => {
      if (locale !== sourceLocale) {
        // write file
        const targetData = localeData[folderPath].files[locale];
        const { code } = generate(targetData.ast);
        const annotations = getAnnotations(
          Array.from(targetData.annotations.entries()),
        );

        const output = prettier.format(`${eslint}${code}\n\n${annotations}\n`, {
          parser: 'typescript',
          // this copy from integration basic prettier config
          // TODO: read prettier config by user's project
          bracketSpacing: true,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          bracketSameLine: false,
          endOfLine: 'auto',
        });
        fs.writeFileSync(
          path.resolve(sourceFolder, folderPath, targetData.file),
          output,
        );
      }
    }, Object.keys(localeData[folderPath].files));
  }, Object.keys(localeData));
}

function formatReason({
  reason,
  key,
  fileName,
  type,
}: FormatReasonParams): string {
  return `[locale] ${chalk.red(
    `{${type}}`,
  )} Key: '${key}', File: '${fileName}', Reason: ${reason}.`;
}

async function mergeTranslationData({
  localeData,
  translations = {},
  sourceFolder,
  sourceLocale,
  interactive = true,
  silent = false,
}: MergeTranslationDataParams): Promise<LocaleData> {
  // clean up original Data
  await asyncForEach(async (folderPath) => {
    await asyncForEach(async (locale) => {
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
              if (sourceData.data.get(key)!.value !== value.source) {
                message = formatReason({
                  type,
                  reason: 'Source value changed',
                  key,
                  fileName: relativePath,
                });
                if (interactive) {
                  shouldDelete = (
                    await prompt({
                      name: 'result',
                      type: 'confirm',
                      message,
                    })
                  ).result;
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
                shouldDelete = (
                  await prompt({
                    name: 'result',
                    type: 'confirm',
                    message,
                  })
                ).result;
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
          new Map<string, AnnotationData>(),
          targetData.data,
        );
      }
    }, Object.keys(localeData[folderPath].files));
  }, Object.keys(localeData));

  // merge in translations
  await asyncForEach(async (locale) => {
    await asyncForEach(async (fileName) => {
      const filePath = path.resolve(sourceFolder, fileName);
      const folderPath = path.dirname(filePath);
      const sourceLocaleFile =
        localeData[folderPath] && localeData[folderPath].files[sourceLocale];

      if (sourceLocaleFile) {
        const sourceData = sourceLocaleFile.data;

        const ext = path.extname(sourceLocaleFile.file) || '.ts';

        if (!localeData[folderPath].files[locale]) {
          (localeData as any)[folderPath].files[locale] = {
            file: `${formatLocale(locale)}${ext}`,
          };
        }
        if (!localeData[folderPath].files[locale].data) {
          localeData[folderPath].files[locale].data = new Map();
        }
        const originalData = localeData[folderPath].files[locale].data;
        const translatedData = translations[locale][fileName];
        await asyncForEach(async (key) => {
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
              shouldSkip = (
                await prompt({
                  name: 'result',
                  type: 'confirm',
                  message,
                })
              ).result;
            } else {
              shouldSkip = true;
            }
          } else if (
            (sourceData.get(key) as any).value !== translatedData[key].source
          ) {
            message = formatReason({
              type,
              reason: 'Source value changed',
              key,
              fileName,
            });
            if (interactive) {
              shouldSkip = (
                await prompt({
                  name: 'result',
                  type: 'confirm',
                  message,
                })
              ).result;
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
        }, Object.keys(translatedData));
      }
    }, Object.keys(translations[locale]));
  }, Object.keys(translations));

  // Update ast and generate code
  forEach((folderPath) => {
    forEach((locale) => {
      if (locale !== sourceLocale) {
        const targetData = localeData[folderPath].files[locale];
        const sourceData = localeData[folderPath].files[sourceLocale];
        targetData.ast = parse((sourceData as any).content, {
          sourceType: 'module',
          plugins: ['typescript'],
        });
        targetData.annotations = new Map();

        function getData(source: any): void {
          const properties = source.properties.filter((prop: any) => {
            const wrapInBracket =
              prop.key.type === 'MemberExpression' ||
              prop.key.type === 'TemplateLiteral';
            const key = wrapInBracket
              ? `[${generate(prop.key).code}]`
              : generate(prop.key).code;
            const entry = targetData.data.get(key);
            if (entry && entry.value) {
              prop.value = {
                type: 'StringLiteral',
                value: entry.value,
                extra: {
                  // generate desired raw to by pass babel jsesc use
                  raw: JSON.stringify(entry.value),
                  rawValue: entry.value,
                },
              };
              targetData.annotations.set(key, sourceData.data.get(key)!.value);
              return true;
            }
            return false;
          });
          source.properties = properties;
        }

        const defaultExport = targetData.ast.program.body.find(
          (item: any) => item.type === 'ExportDefaultDeclaration',
        );

        if (defaultExport) {
          if (defaultExport.declaration.type === 'ObjectExpression') {
            getData(defaultExport.declaration);
          } else if (defaultExport.declaration.type === 'TSAsExpression') {
            const nest = defaultExport.declaration.expression;
            if (nest.type === 'ObjectExpression') {
              getData(nest);
            }
          }
        }
      }
    }, Object.keys(localeData[folderPath].files));
  }, Object.keys(localeData));
  return localeData;
}

export default async function importLocale({
  sourceFolder = defaultConfig.sourceFolder,
  localizationFolder = defaultConfig.localizationFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales,
  translationLocales = supportedLocales,
  interactive = defaultConfig.interactive,
  silent = defaultConfig.silent,
  json = false,
  disableEslint = true,
  rawData = undefined,
}: ImportLocaleParams = {}): Promise<void> {
  if (!supportedLocales || !translationLocales) {
    throw new Error('options.supportedLocales is missing');
  }
  const localeData = compileLocaleData({
    sourceFolder,
    sourceLocale,
    translationLocales,
  }) as any;
  const translations = json
    ? readJsonData({
        localizationFolder,
        translationLocales,
        sourceLocale,
        rawData,
      })
    : readXlfData({
        localizationFolder,
        translationLocales,
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
    disableEslint,
  });
}
