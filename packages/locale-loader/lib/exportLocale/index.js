import fs from 'fs-extra';
import path from 'path';
import { forEach } from 'ramda';
import compileLocaleData from '../compileLocaleData';
import defaultConfig from '../defaultConfig';
import generateXlfData from '../generateXlfData';

export function writeXlf({
  localizationFolder,
  xlfData,
}) {
  fs.ensureDirSync(localizationFolder);
  forEach(
    (locale) => {
      const fileName = path.resolve(localizationFolder, `${locale}.xlf`);
      fs.writeFileSync(fileName, xlfData[locale]);
    },
    Object.keys(xlfData),
  );
}


export default function exportLocale({
  sourceFolder = defaultConfig.sourceFolder,
  localizationFolder = defaultConfig.localizationFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales,
  exportType = 'diff',
} = {}) {
  if (!supportedLocales) {
    throw new Error('options.supportedLocales is missing');
  }
  const localeData = compileLocaleData({
    sourceFolder,
    sourceLocale,
    supportedLocales,
  });
  const xlfData = generateXlfData({
    localeData,
    sourceFolder,
    sourceLocale,
    supportedLocales,
    exportType,
  });
  writeXlf({
    xlfData,
    localizationFolder,
  });
}
