import fs from 'fs-extra';
import path from 'path';
import { forEach } from 'ramda';

import compileLocaleData from '../compileLocaleData';
import defaultConfig from '../defaultConfig';
import { generateJsonData, generateXlfData } from '../generateData';

interface WriteDataParams {
  localizationFolder: string;
  data: Record<string, any>;
  ext: string;
}

interface ExportLocaleParams {
  sourceFolder?: string;
  localizationFolder?: string;
  sourceLocale?: string;
  projectRoot?: string;
  supportedLocales?: string[];
  translationLocales?: string[];
  exportType?: string;
  fillEmptyWithSource?: boolean;
  json?: boolean;
  writeFile?: boolean;
  pseudo?: boolean;
}

export function writeData({
  localizationFolder,
  data,
  ext,
}: WriteDataParams): void {
  fs.ensureDirSync(localizationFolder);
  forEach((locale) => {
    const fileName = path.resolve(localizationFolder, `${locale}.${ext}`);
    fs.writeFileSync(
      fileName,
      ext === 'json' ? JSON.stringify(data[locale], null, 2) : data[locale],
    );
  }, Object.keys(data));
}

/**
 * Exports the locale data based on the provided options.
 *
 * by default, it will export the data in `xlf` format.
 *
 * if the --json flag is provided, it will export the data in `json` format.
 *
 * @param {Object} options - The options for exporting the locale data.
 * @param {string} [options.sourceFolder] - The source folder path.
 * @param {string} [options.localizationFolder] - The localization folder path.
 * @param {string} [options.sourceLocale] - The source locale.
 * @param {string} [options.projectRoot] - The project root path use for get the relative path of current project in json pseudo mode.
 * @param {*} options.supportedLocales - The supported locales.
 * @param {*} [options.translationLocales] - The translation locales.
 * @param {string} [options.exportType='diff'] - The export type.
 * @param {boolean} [options.fillEmptyWithSource=true] - Whether to fill empty translations with the source text.
 * @param {boolean} [options.json] - Whether to export the data in JSON format.
 * @param {boolean} [options.writeFile=true] - Whether to write the data to a file.
 * @param {boolean} [options.pseudo=false] - Whether to include the pseudo locale results.
 * @returns {Promise<string|Object>} - The exported data or a promise that resolves with the exported data.
 * @throws {Error} - If options.supportedLocales is missing.
 */
export default function exportLocale({
  sourceFolder = defaultConfig.sourceFolder,
  localizationFolder = defaultConfig.localizationFolder,
  sourceLocale = defaultConfig.sourceLocale,
  projectRoot,
  supportedLocales,
  translationLocales = supportedLocales,
  exportType = 'diff',
  fillEmptyWithSource = true,
  json = process.argv.includes('--json'),
  writeFile = true,
  pseudo = process.argv.includes('--pseudo') || false,
}: ExportLocaleParams = {}): any {
  if (!supportedLocales || !translationLocales) {
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
        projectRoot,
        sourceFolder,
        sourceLocale,
        translationLocales: pseudo
          ? [...translationLocales, 'rc-XX']
          : translationLocales,
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
