/**
 * @function
 * @description Determine whether file is valid locale file or not.
 * @param {String} filename
 * @returns {Boolean}
 */
export default function isLocaleFile(filename: string): boolean;
export declare function localeFilter(locales: string[]): (filename: string) => boolean;
