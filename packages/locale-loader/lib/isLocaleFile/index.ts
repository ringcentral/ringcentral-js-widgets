import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import path from 'path';

const localeFileRegExp =
  /^([a-z]{2}(-|_)([A-Z]{2}|[0-9]{3}|[A-Z][a-z]{3}(-|_)[A-Z]{2})|[a-z]{3}(-|_)[A-Z]{2})$/;
const fileRegExp = /\.(js|ts)$/i;

function getFileName(filename: string) {
  return path.basename(filename);
}

export function getLocaleFromFilePath(filename: string) {
  const fileName = getFileName(filename);
  if (!fileRegExp.test(fileName) || fileName.includes('rc-XX')) {
    return null;
  }
  const name = fileName.replace(fileRegExp, '');
  if (!localeFileRegExp.test(name)) {
    return null;
  }
  return formatLocale(name);
}

export function replaceLocaleInFilePath(filename: string, locale: string) {
  const fileName = getFileName(filename);
  const currentLocale = getLocaleFromFilePath(fileName);
  if (!currentLocale) {
    throw new Error(`'${filename}' is not a valid locale file`);
  }
  const ext = path.extname(fileName);
  return path.join(path.dirname(filename), `${formatLocale(locale)}${ext}`);
}

/**
 * @function
 * @description Determine whether file is valid locale file or not.
 * @param {String} filename
 * @param {String} locale
 * @returns {Boolean}
 */
export default function isLocaleFile(filename: string): boolean;
export default function isLocaleFile(filename: string, locale: string): boolean;
export default function isLocaleFile(
  filename: string,
  locale?: string | number,
) {
  const fileLocale = getLocaleFromFilePath(filename);
  if (!fileLocale) {
    return false;
  }
  if (typeof locale !== 'string' || !locale) {
    return true;
  }
  return fileLocale === formatLocale(locale);
}

export function localeFilter(locales: string[]) {
  const normalizedLocales = Array.isArray(locales)
    ? locales.map((locale) => formatLocale(locale))
    : [];
  return (filename: string) => {
    const fileLocale = getLocaleFromFilePath(filename);
    if (!fileLocale) {
      return false;
    }
    if (normalizedLocales.length === 0) {
      return true;
    }
    return normalizedLocales.includes(fileLocale);
  };
}
