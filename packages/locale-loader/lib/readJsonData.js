import path from 'path';
import fs from 'fs-extra';
import { reduce } from 'ramda';

export function readJsonData({
  localizationFolder,
  translationLocales,
  sourceLocale,
  rawData,
}) {
  if (!rawData) {
    rawData = reduce(
      (acc, locale) => {
        const fileName = `${locale}.json`;
        const filePath = path.resolve(localizationFolder, fileName);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const content = fs.readFileSync(filePath, 'utf8');
          acc[locale] = JSON.parse(content);
        }
        return acc;
      },
      {},
      translationLocales,
    );
  }

  return reduce(
    (result, locale) => {
      if (locale !== sourceLocale) {
        result[locale] = reduce(
          (fileData, filePath) => {
            const folderPath = path.dirname(filePath);
            const targetFile = `${locale}${path.extname(filePath)}`;
            const targetFilePath = path.join(folderPath, targetFile);
            fileData[targetFilePath] = reduce(
              (acc, key) => {
                const value = rawData[locale][filePath][key];
                const source = rawData[sourceLocale][filePath][key];
                if (source && value) {
                  acc[key] = {
                    source,
                    value,
                  };
                }
                return acc;
              },
              {},
              Object.keys(rawData[locale][filePath]),
            );
            return fileData;
          },
          {},
          Object.keys(rawData[locale]),
        );
      }
      return result;
    },
    {},
    translationLocales,
  );
}
