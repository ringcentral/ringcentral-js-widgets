import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import fs from 'fs-extra';
import path from 'path';
import { filter, reduce } from 'ramda';

import findLoaderFiles from '../findLoaderFiles';
import isLocaleFile from '../isLocaleFile';
import parseLocaleFile from '../parseLocaleFile';

interface CompileDataParams {
  folderPath: string;
  sourceLocale: string;
  translationLocales: readonly string[];
}

interface LocaleFileData {
  file: string;
  locale: string;
  rawContent: string;
  data: Map<string, any>;
  [key: string]: any;
}

interface CompiledData {
  path: string;
  files: Record<string, LocaleFileData>;
}

interface CompileLocaleDataParams {
  sourceFolder: string;
  sourceLocale: string;
  translationLocales: readonly string[];
}

export function findLocaleFiles(folderPath: string): string[] {
  return filter(isLocaleFile, fs.readdirSync(folderPath));
}

export function compileData({
  folderPath,
  sourceLocale,
  translationLocales,
}: CompileDataParams): CompiledData {
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
    } as CompiledData,
    findLocaleFiles(folderPath),
  );
}

export default function compileLocaleData({
  sourceFolder,
  sourceLocale,
  translationLocales,
}: CompileLocaleDataParams): Record<string, CompiledData> {
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
    {} as Record<string, CompiledData>,
    findLoaderFiles(sourceFolder),
  );
}
