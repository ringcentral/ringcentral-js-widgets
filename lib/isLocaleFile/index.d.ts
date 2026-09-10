export declare function getLocaleFromFilePath(filename: string): string | null;
export declare function replaceLocaleInFilePath(filename: string, locale: string): string;
/**
 * @function
 * @description Determine whether file is valid locale file or not.
 * @param {String} filename
 * @param {String} locale
 * @returns {Boolean}
 */
export default function isLocaleFile(filename: string): boolean;
export default function isLocaleFile(filename: string, locale: string): boolean;
export declare function localeFilter(locales: string[]): (filename: string) => boolean;
