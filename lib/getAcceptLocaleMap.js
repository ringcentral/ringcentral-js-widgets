"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAcceptLocaleMap = void 0;
const tslib_1 = require("tslib");
const formatLocale_1 = tslib_1.__importDefault(require("./formatLocale"));
/**
 * get accept locale map, use for map the outside locale to the supported locale
 *
 * @param supportedLocales
 */
const getAcceptLocaleMap = (supportedLocales) => {
    const map = new Map();
    // Process all supported locales
    supportedLocales.forEach((locale) => {
        const formattedLocale = (0, formatLocale_1.default)(locale);
        // Add exact matches
        map.set(formattedLocale, formattedLocale);
        // Add language-only matches (only if not already set)
        const language = formattedLocale.split('-')[0];
        if (!map.has(language)) {
            map.set(language, formattedLocale);
        }
    });
    return map;
};
exports.getAcceptLocaleMap = getAcceptLocaleMap;
//# sourceMappingURL=getAcceptLocaleMap.js.map