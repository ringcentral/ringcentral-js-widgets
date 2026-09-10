"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocaleFromFilePath = getLocaleFromFilePath;
exports.replaceLocaleInFilePath = replaceLocaleInFilePath;
exports.default = isLocaleFile;
exports.localeFilter = localeFilter;
const tslib_1 = require("tslib");
const formatLocale_1 = tslib_1.__importDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
const path_1 = tslib_1.__importDefault(require("path"));
const localeFileRegExp = /^([a-z]{2}(-|_)([A-Z]{2}|[0-9]{3}|[A-Z][a-z]{3}(-|_)[A-Z]{2})|[a-z]{3}(-|_)[A-Z]{2})$/;
const fileRegExp = /\.(js|ts)$/i;
function getFileName(filename) {
    return path_1.default.basename(filename);
}
function getLocaleFromFilePath(filename) {
    const fileName = getFileName(filename);
    if (!fileRegExp.test(fileName) || fileName.includes('rc-XX')) {
        return null;
    }
    const name = fileName.replace(fileRegExp, '');
    if (!localeFileRegExp.test(name)) {
        return null;
    }
    return (0, formatLocale_1.default)(name);
}
function replaceLocaleInFilePath(filename, locale) {
    const fileName = getFileName(filename);
    const currentLocale = getLocaleFromFilePath(fileName);
    if (!currentLocale) {
        throw new Error(`'${filename}' is not a valid locale file`);
    }
    const ext = path_1.default.extname(fileName);
    return path_1.default.join(path_1.default.dirname(filename), `${(0, formatLocale_1.default)(locale)}${ext}`);
}
function isLocaleFile(filename, locale) {
    const fileLocale = getLocaleFromFilePath(filename);
    if (!fileLocale) {
        return false;
    }
    if (typeof locale !== 'string' || !locale) {
        return true;
    }
    return fileLocale === (0, formatLocale_1.default)(locale);
}
function localeFilter(locales) {
    const normalizedLocales = Array.isArray(locales)
        ? locales.map((locale) => (0, formatLocale_1.default)(locale))
        : [];
    return (filename) => {
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
//# sourceMappingURL=index.js.map