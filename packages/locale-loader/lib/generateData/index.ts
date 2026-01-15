import { toHashPseudoString } from '@ringcentral-integration/i18n/lib/toPseudoString';
import fs from 'fs';
import path from 'path';
import { forEach, reduce } from 'ramda';
import xml from 'xml-js';

interface GenerateJsonDataParams {
  projectRoot?: string;
  localeData: any;
  sourceFolder: string;
  sourceLocale: string;
  translationLocales: string[];
}

interface GenerateXlfDataParams {
  localeData: any;
  sourceLocale: string;
  translationLocales: string[];
  sourceFolder: string;
  exportType: string;
  fillEmptyWithSource: boolean;
}

interface TransUnit {
  _attributes: {
    id: string;
  };
  source: {
    _text: string;
  };
  target?: {
    _text: string;
  };
}

interface XliffFile {
  _attributes: {
    original: string;
    'source-language': string;
    'target-language': string;
    datatype: string;
  };
  body: {
    'trans-unit': TransUnit[];
  };
}

interface XliffData {
  _declaration: {
    _attributes: {
      version: string;
    };
  };
  xliff: {
    _attributes: {
      version: string;
      xmlns: string;
    };
    file?: XliffFile[];
  };
}

/**
 * Find the project root by traversing up the directory tree looking for a package.json
 * with the specified project name. Search is limited to a maximum of 10 levels up.
 * @param startPath - The starting directory path
 * @param projectName - The name field to look for in package.json (default: 'integration-apps')
 * @returns The project root path or null if not found within 10 levels
 */
function findProjectRoot(
  startPath: string,
  projectName = 'integration-apps',
): string | null {
  let currentPath = path.resolve(startPath);
  const root = path.parse(currentPath).root;
  let depth = 0;
  const maxDepth = 10;

  while (currentPath !== root && depth < maxDepth) {
    const packageJsonPath = path.join(currentPath, 'package.json');

    try {
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, 'utf8'),
        );
        if (packageJson.name === projectName) {
          return currentPath;
        }
      }
    } catch (error) {
      // Continue searching if package.json is malformed or unreadable
    }

    currentPath = path.dirname(currentPath);
    depth++;
  }

  return null;
}

function generateBaseData(allLocales: string[]): Record<string, XliffData> {
  return reduce(
    (data, locale) => {
      data[locale] = {
        _declaration: {
          _attributes: {
            version: '1.0',
          },
        },
        xliff: {
          _attributes: {
            version: '1.2',
            xmlns: 'urn:oasis:names:tc:xliff:document:1.2',
          },
        },
      };
      return data;
    },
    {} as Record<string, XliffData>,
    allLocales,
  );
}

/**
 * Transform en-US data to rc-XX format with hashes
 * @param sourceFolder - The source folder path
 * @param source - The source locale data
 * @param projectRoot - The project root path that use to get the relative path of current project
 * @returns Transformed data with hash values
 */
function transformToRcXX(
  sourceFolder: string,
  projectRoot: string | undefined,
  source: any,
): any {
  const transformed: any = {};
  const rootPath =
    projectRoot ||
    findProjectRoot(sourceFolder) ||
    path.resolve(sourceFolder, '../../');

  forEach((filePath) => {
    const fileData = source[filePath];
    if (fileData) {
      transformed[filePath] = {};

      /**
       * the sourcePath is the path to the source file,
       *
       * result like '/apps/micro-core/src/app/views/HeaderNavView/i18n/en-US.ts'
       *
       * should have completed path for ensure the hash is unique
       */
      const sourcePath = path
        .join(sourceFolder, filePath)
        .replace(rootPath!, '');

      forEach((key) => {
        const value = fileData[key];
        const keyPath = key;

        const result = toHashPseudoString(sourcePath, keyPath, value);
        transformed[filePath][key] = result;
      }, Object.keys(fileData));
    }
  }, Object.keys(source));

  return transformed;
}

// the new json export-import flow will only require exporting en-US files
export function generateJsonData({
  projectRoot,
  localeData,
  sourceFolder,
  sourceLocale,
  translationLocales,
}: GenerateJsonDataParams): Record<string, any> {
  const result = reduce(
    (result: Record<string, any>, folderPath: string) => {
      const folderData = localeData[folderPath];
      // console.log(folderData, folderPath);
      const sourceFile = folderData.files[sourceLocale];
      if (sourceFile) {
        forEach((locale) => {
          const targetFile = folderData.files[locale];
          if (targetFile) {
            const relativePath = path.relative(
              sourceFolder,
              path.join(folderData.path, sourceFile.file),
            );

            result[locale][relativePath] = reduce(
              (
                acc: Record<string, any>,
                [, { key, value }]: [any, { key: any; value: any }],
              ) => {
                if (locale === sourceLocale) {
                  acc[key] = value;
                } else if (targetFile?.data?.get(key)?.source === value) {
                  acc[key] = targetFile.data.get(key).value;
                }
                return acc;
              },
              {} as Record<string, any>,
              sourceFile.data,
            );
          }
        }, translationLocales);
      }
      return result;
    },
    reduce(
      (acc, locale) => {
        acc[locale] = {};
        return acc;
      },
      {} as Record<string, any>,
      translationLocales,
    ),
    Object.keys(localeData),
  );

  if (result['rc-XX']) {
    // Transform en-US data to rc-XX format with hashes
    result['rc-XX'] = transformToRcXX(
      sourceFolder,
      projectRoot,
      result['en-US'],
    );
  }

  return result;
}

export function generateXlfData({
  localeData,
  sourceLocale,
  translationLocales,
  sourceFolder,
  exportType,
  fillEmptyWithSource,
}: GenerateXlfDataParams): Record<string, string> {
  const isFull = exportType.toLowerCase() === 'full';
  const onlyTranslated = exportType.toLowerCase() === 'translated';
  const allLocales = translationLocales.filter(
    (locale) => locale !== sourceLocale,
  );

  const jsonData = reduce(
    (result, folderPath) => {
      const folderData = localeData[folderPath];
      const sourceFile = folderData.files[sourceLocale];
      if (sourceFile) {
        forEach((locale) => {
          if (locale !== sourceLocale) {
            const targetFile = folderData.files[locale];
            const fileName =
              (targetFile && targetFile.file) ||
              `${locale}${path.extname(sourceFile.file)}`;
            const original = path.relative(
              sourceFolder,
              path.join(folderData.path, fileName),
            );
            const transUnits = reduce(
              (transUnits: TransUnit[], [key]: [any]) => {
                if (onlyTranslated) {
                  if (
                    targetFile &&
                    targetFile.data.get(key) &&
                    (!targetFile.data.get(key).source ||
                      targetFile.data.get(key).source ===
                        sourceFile.data.get(key).value)
                  ) {
                    const unit: TransUnit = {
                      _attributes: {
                        id: `[${key}]`,
                      },
                      source: {
                        _text: sourceFile.data.get(key).value,
                      },
                      target: {
                        _text: targetFile.data.get(key).value,
                      },
                    };
                    transUnits.push(unit);
                  }
                } else {
                  const diff =
                    !targetFile ||
                    !targetFile.data.get(key) ||
                    (targetFile.data.get(key).source &&
                      targetFile.data.get(key).source !==
                        sourceFile.data.get(key).value);
                  if ((!onlyTranslated && diff) || isFull) {
                    const unit: TransUnit = {
                      _attributes: {
                        id: `[${key}]`,
                      },
                      source: {
                        _text: sourceFile.data.get(key).value,
                      },
                    };
                    if (diff) {
                      if (fillEmptyWithSource) {
                        unit.target = {
                          _text: sourceFile.data.get(key).value,
                        };
                      } else {
                        unit.target = {
                          _text: '',
                        };
                      }
                    } else {
                      unit.target = {
                        _text: targetFile.data.get(key).value,
                      };
                    }
                    transUnits.push(unit);
                  }
                }
                return transUnits;
              },
              [] as TransUnit[],
              sourceFile.data,
            );
            if (transUnits.length) {
              const unit: XliffFile = {
                _attributes: {
                  original,
                  'source-language': sourceLocale,
                  'target-language': locale,
                  datatype: 'plaintext',
                },
                body: {
                  'trans-unit': transUnits,
                },
              };
              if (!result[locale].xliff.file) {
                result[locale].xliff.file = [];
              }
              result[locale].xliff.file.push(unit);
            }
          }
        }, translationLocales);
      }
      return result;
    },
    generateBaseData(allLocales),
    Object.keys(localeData),
  );
  return reduce(
    (xlfData, locale) => {
      xlfData[locale] = xml.json2xml(jsonData[locale] as any, {
        compact: true,
        spaces: 4,
      });
      return xlfData;
    },
    {} as Record<string, string>,
    allLocales,
  );
}
