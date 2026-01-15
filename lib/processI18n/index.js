"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processI18n = processI18n;
const tslib_1 = require("tslib");
const constants_1 = require("../../constants");
const i18n_1 = tslib_1.__importDefault(require("../../i18n"));
const getLanguageFromLocale_1 = require("../getLanguageFromLocale");
const toPseudoString_1 = require("../toPseudoString");
const type_1 = require("./type");
/**
 * processI18n takes brandConfigs with I18nStrings objects and based on the locale, return brandConfig without the I18nStrings.
 * @param config BrandConfig
 * @param locale
 * @param defaultLocale
 * @param parentKey parent key of object
 * @returns BrandConfig without I18nStrings structure
 */
function processI18n(input, locale = constants_1.DEFAULT_LOCALE, defaultLocale = constants_1.DEFAULT_LOCALE, parentKey) {
    var _a, _b, _c;
    if (Array.isArray(input)) {
        return input.map((item) => processI18n(item, locale, defaultLocale));
    }
    if (input && typeof input === 'object') {
        if (input[type_1.I18nFlag]) {
            if (locale === constants_1.PSEUDO_LOCALE) {
                return (0, toPseudoString_1.toPseudoStringWithPadding)({
                    str: (_a = input.translations[defaultLocale]) !== null && _a !== void 0 ? _a : parentKey,
                    padRatio: i18n_1.default.padRatio,
                });
            }
            return ((_c = (_b = input.translations[locale]) !== null && _b !== void 0 ? _b : input.translations[(0, getLanguageFromLocale_1.getLanguageFromLocale)(locale)]) !== null && _c !== void 0 ? _c : input.translations[defaultLocale]);
        }
        return Object.keys(input).reduce((acc, key) => {
            if (Object.hasOwnProperty.call(input, key)) {
                acc[key] = processI18n(input[key], locale, defaultLocale, key);
            }
            return acc;
        }, {});
    }
    return input;
}
//# sourceMappingURL=index.js.map