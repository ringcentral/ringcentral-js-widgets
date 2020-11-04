import path from 'path';
import xml from 'xml-js';
import { reduce, forEach } from 'ramda';

function generateBaseData(allLocales) {
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
    {},
    allLocales,
  );
}

// the new json export-import flow will only require exporting en-US files
export function generateJsonData({
  localeData,
  sourceFolder,
  sourceLocale,
  supportedLocales,
}) {
  return reduce(
    (result, folderPath) => {
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
              (acc, [, { key, value }]) => {
                if (locale === sourceLocale) {
                  acc[key] = value;
                } else if (targetFile?.data?.get(key)?.source === value) {
                  acc[key] = targetFile.data.get(key).value;
                }
                return acc;
              },
              {},
              sourceFile.data,
            );
          }
        }, supportedLocales);
      }
      return result;
    },
    reduce(
      (acc, locale) => {
        acc[locale] = {};
        return acc;
      },
      {},
      supportedLocales,
    ),
    Object.keys(localeData),
  );
}

export function generateXlfData({
  localeData,
  sourceLocale,
  supportedLocales,
  sourceFolder,
  exportType,
  fillEmptyWithSource,
}) {
  const isFull = exportType.toLowerCase() === 'full';
  const onlyTranslated = exportType.toLowerCase() === 'translated';
  const allLocales = supportedLocales.filter(
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
              (transUnits, [key]) => {
                if (onlyTranslated) {
                  if (
                    targetFile &&
                    targetFile.data.get(key) &&
                    (!targetFile.data.get(key).source ||
                      targetFile.data.get(key).source ===
                        sourceFile.data.get(key).value)
                  ) {
                    const unit = {
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
                    const unit = {
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
              [],
              sourceFile.data,
            );
            if (transUnits.length) {
              const unit = {
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
        }, supportedLocales);
      }
      return result;
    },
    generateBaseData(allLocales),
    Object.keys(localeData),
  );
  return reduce(
    (xlfData, locale) => {
      xlfData[locale] = xml.json2xml(jsonData[locale], {
        compact: true,
        spaces: 4,
      });
      return xlfData;
    },
    {},
    allLocales,
  );
}
