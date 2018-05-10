import path from 'path';
import xml from 'xml-js';

export default function generateXlfData({
  rawData,
  sourceLocale,
  supportedLocales,
  sourceFolder,
  exportType,
}) {
  const isFull = exportType.toLowerCase() === 'full';
  const onlyTranslated = exportType.toLowerCase() === 'translated';
  const jsonData = {};
  const allLocales = supportedLocales.filter(locale => locale !== sourceLocale);

  allLocales.forEach((locale) => {
    jsonData[locale] = {
      _declaration: {
        _attributes: {
          version: '1.0',
        }
      },
      xliff: {
        _attributes: {
          version: '1.2',
          xmlns: 'urn:oasis:names:tc:xliff:document:1.2',
        },
      },
    };
  });

  Object.keys(rawData).forEach((folderPath) => {
    const folderData = rawData[folderPath];
    const sourceFile = folderData.files[sourceLocale];
    if (sourceFile) {
      const keys = Object.keys(sourceFile.data);
      supportedLocales.forEach((locale) => {
        if (locale !== sourceLocale) {
          const targetFile = folderData.files[locale];
          const fileName = (targetFile && targetFile.file) || `${locale}.js`;
          const original = path.relative(
            sourceFolder,
            path.join(folderData.path, fileName),
          );
          const transUnits = [];
          keys.forEach((key) => {
            if (onlyTranslated) {
              if (
                targetFile &&
                targetFile.data[key] &&
                (
                  !targetFile.data[key].source ||
                  targetFile.data[key].source === sourceFile.data[key].value
                )
              ) {
                const unit = {
                  _attributes: {
                    id: `[${key}]`,
                  },
                  source: {
                    _text: sourceFile.data[key].value,
                  },
                  target: {
                    _text: targetFile.data[key].value
                  },
                };
                transUnits.push(unit);
              }
            } else {
              const diff = (
                !targetFile ||
                !targetFile.data[key] ||
                (targetFile.data[key].source &&
                  targetFile.data[key].source !== sourceFile.data[key].value)
              );
              if (!onlyTranslated && diff || isFull) {
                const unit = {
                  _attributes: {
                    id: `[${key}]`,
                  },
                  source: {
                    _text: sourceFile.data[key].value,
                  },
                  target: {
                    _text: diff ?
                      sourceFile.data[key].value :
                      targetFile.data[key].value
                  },
                };
                transUnits.push(unit);
              }
            }
          });
          if (transUnits.length) {
            const data = {
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
            if (!jsonData[locale].xliff.file) {
              jsonData[locale].xliff.file = [];
            }
            jsonData[locale].xliff.file.push(data);
          }
        }
      });
    }
  });
  const xlfData = {};
  allLocales.forEach((locale) => {
    xlfData[locale] = xml.json2xml(jsonData[locale], { compact: true, spaces: 4 });
  });
  return xlfData;
}
