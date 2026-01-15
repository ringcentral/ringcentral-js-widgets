"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isLocaleFile;
exports.localeFilter = localeFilter;
const localeFileRegExp = /^([a-z]{2}(-|_)([A-Z]{2}|[0-9]{3}|[A-Z][a-z]{3}(-|_)[A-Z]{2})|[a-z]{3}(-|_)[A-Z]{2})$/;
const fileRegExp = /\.(js|ts)$/i;
/**
 * @function
 * @description Determine whether file is valid locale file or not.
 * @param {String} filename
 * @returns {Boolean}
 */
function isLocaleFile(filename) {
    if (!fileRegExp.test(filename) || filename.includes('rc-XX')) {
        return false;
    }
    const name = filename.replace(fileRegExp, '');
    return localeFileRegExp.test(name);
}
function localeFilter(locales) {
    return (filename) => {
        if (!Array.isArray(locales) || locales.length === 0) {
            return true;
        }
        const name = filename.replace(fileRegExp, '');
        return locales.includes(name);
    };
}
//# sourceMappingURL=index.js.map