import fs from 'fs-extra';
import path from 'path';
import getRawData from '../getRawData';
import defaultConfig from '../../defaultConfig';
import generateXlfData from '../generateXlfData';

async function writeXlf({
  localizationFolder,
  xlfData,
}) {
  await fs.ensureDir(localizationFolder);
  await Promise.all(
    Object.keys(xlfData)
      .map(async (locale) => {
        const fileName = path.resolve(localizationFolder, `${locale}.xlf`);
        await fs.writeFile(fileName, xlfData[locale]);
      })
  );
}


export default async function exportLocale({
  sourceFolder = defaultConfig.sourceFolder,
  localizationFolder = defaultConfig.localizationFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales = defaultConfig.supportedLocales,
  exportType = 'diff',
} = {}) {
  const rawData = await getRawData({
    sourceFolder,
    sourceLocale,
    supportedLocales,
  });
  const xlfData = generateXlfData({
    rawData,
    sourceFolder,
    sourceLocale,
    supportedLocales,
    exportType,
  });
  await writeXlf({
    xlfData,
    localizationFolder,
  });
}
