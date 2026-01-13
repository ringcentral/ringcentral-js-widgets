import fs from 'fs-extra';
import path from 'path';
import { reduce } from 'ramda';

interface ReadJsonDataParams {
  localizationFolder: string;
  translationLocales: readonly string[];
  sourceLocale: string;
  rawData?: Record<string, Record<string, Record<string, any>>>;
}

interface TranslationData {
  source: any;
  value: any;
}

interface FileData {
  [key: string]: TranslationData;
}

interface LocaleData {
  [filePath: string]: FileData;
}

interface ResultData {
  [locale: string]: LocaleData;
}

export function readJsonData({
  localizationFolder,
  translationLocales,
  sourceLocale,
  rawData,
}: ReadJsonDataParams): ResultData {
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
      {} as Record<string, Record<string, Record<string, any>>>,
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
                const value = rawData![locale][filePath][key];
                const source = rawData![sourceLocale][filePath][key];
                if (source && value) {
                  acc[key] = {
                    source,
                    value,
                  };
                }
                return acc;
              },
              {} as FileData,
              Object.keys(rawData![locale][filePath]),
            );
            return fileData;
          },
          {} as LocaleData,
          Object.keys(rawData![locale]),
        );
      }
      return result;
    },
    {} as ResultData,
    translationLocales,
  );
}
