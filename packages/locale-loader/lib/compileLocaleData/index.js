import fs from 'fs-extra';
import path from 'path';
import { filter, reduce } from 'ramda';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import isLocaleFile from '../isLocaleFile';
import findLoaderFiles from '../findLoaderFiles';
import parseLocaleFile from '../parseLocaleFile';

export function findLocaleFiles(folderPath) {
  return filter(isLocaleFile, fs.readdirSync(folderPath));
}

export function compileData({ folderPath, sourceLocale, translationLocales }) {
  return reduce(
    (data, file) => {
      const locale = formatLocale(file.replace(/\.(js|ts|json)$/i, ''));
      if (locale === sourceLocale || translationLocales.indexOf(locale) > -1) {
        const rawContent = fs.readFileSync(
          path.resolve(folderPath, file),
          'utf8',
        );
        data.files[locale] = {
          file,
          locale,
          rawContent,
          ...parseLocaleFile(rawContent),
        };
      }
      return data;
    },
    {
      path: folderPath,
      files: {},
    },
    findLocaleFiles(folderPath),
  );
}

export default function compileLocaleData({
  sourceFolder,
  sourceLocale,
  translationLocales,
}) {
  return reduce(
    (data, file) => {
      const folderPath = path.resolve(path.dirname(file));
      data[folderPath] = compileData({
        folderPath,
        sourceLocale,
        translationLocales,
      });
      return data;
    },
    {},
    findLoaderFiles(sourceFolder),
  );
}
