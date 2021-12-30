import fs from 'fs-extra';
import path from 'path';
import { forEach } from 'ramda';
import compileLocaleData from '../compileLocaleData';
import defaultConfig from '../defaultConfig';
import { generateXlfData, generateJsonData } from '../generateData';

export function writeData({ localizationFolder, data, ext }) {
  fs.ensureDirSync(localizationFolder);
  forEach((locale) => {
    const fileName = path.resolve(localizationFolder, `${locale}.${ext}`);
    fs.writeFileSync(
      fileName,
      ext === 'json' ? JSON.stringify(data[locale], null, 2) : data[locale],
    );
  }, Object.keys(data));
}

export default function exportLocale({
  sourceFolder = defaultConfig.sourceFolder,
  localizationFolder = defaultConfig.localizationFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales,
  translationLocales = supportedLocales,
  exportType = 'diff',
  fillEmptyWithSource = true,
  json = false,
  writeFile = true,
} = {}) {
  if (!supportedLocales) {
    throw new Error('options.supportedLocales is missing');
  }
  const localeData = compileLocaleData({
    sourceFolder,
    sourceLocale,
    translationLocales,
  });
  const data = json
    ? generateJsonData({
        localeData,
        sourceFolder,
        sourceLocale,
        translationLocales,
      })
    : generateXlfData({
        localeData,
        sourceFolder,
        sourceLocale,
        translationLocales,
        exportType,
        fillEmptyWithSource,
      });
  if (writeFile) {
    return writeData({
      data,
      localizationFolder,
      ext: json ? 'json' : 'xlf',
    });
  }
  return data;
}
