import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import fs from 'fs-extra';
import path from 'path';

import defaultConfig from '../defaultConfig';
import isLocaleFile, { getLocaleFromFilePath } from '../isLocaleFile';
import parseLocaleFile from '../parseLocaleFile';

interface ExportLocaleFileParams {
  sourceRelativePath: string;
  sourceFolder?: string;
  sourceLocale?: string;
}

export default function exportLocaleFile({
  sourceRelativePath,
  sourceFolder = defaultConfig.sourceFolder,
  sourceLocale,
}: ExportLocaleFileParams) {
  if (!sourceRelativePath) {
    throw new Error('options.sourceRelativePath is missing');
  }

  const fileLocale =
    getLocaleFromFilePath(sourceRelativePath) || defaultConfig.sourceLocale;
  const expectedLocale = formatLocale(sourceLocale || fileLocale);

  if (!isLocaleFile(sourceRelativePath, expectedLocale)) {
    throw new Error(
      `options.sourceRelativePath must be a valid '${expectedLocale}' locale file`,
    );
  }

  const sourcePath = path.resolve(sourceFolder, sourceRelativePath);
  const { data } = parseLocaleFile(fs.readFileSync(sourcePath, 'utf8'));
  const result: Record<string, any> = {};

  data.forEach(({ key, value }) => {
    result[key] = value;
  });

  return result;
}
