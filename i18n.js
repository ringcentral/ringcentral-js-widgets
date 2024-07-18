"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RUNTIME = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("./constants");
const getLanguageFromLocale_1 = require("./lib/getLanguageFromLocale");
const toPseudoString_1 = tslib_1.__importDefault(require("./lib/toPseudoString"));
exports.RUNTIME = {
    locale: constants_1.DEFAULT_LOCALE,
    defaultLocale: constants_1.DEFAULT_LOCALE,
    instances: new Set(),
    padRatio: 0.3,
    fallbackLocale: constants_1.DEFAULT_LOCALE,
    languageDefaults: null,
};
/**
 * @function
 * @description Set current runtime locale and load the locale files accordingly
 * @param {String} locale - The desired locale.
 * @return Promise<undefined>
 */
function setLocale(locale) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        exports.RUNTIME.locale = locale;
        yield reloadLocales();
    });
}
function reloadLocales() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (const i of exports.RUNTIME.instances) {
            yield i.load();
        }
    });
}
function setDefaultLocale(locale) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        exports.RUNTIME.defaultLocale = locale;
        yield reloadLocales();
    });
}
function setLanguageDefaults(defaults) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        exports.RUNTIME.languageDefaults = defaults;
        yield reloadLocales();
    });
}
function checkDefaults(locale) {
    return ((exports.RUNTIME.languageDefaults && exports.RUNTIME.languageDefaults[locale]) || locale);
}
/**
 * @class
 * @description I18n is a simple localizations helper class that represents a set of locale files.
 */
class I18n {
    /**
     * @constructor
     * @description Accepts a loadLocale function that should be async and resolve to the locale
     *  object when invoked.
     * @param {String => Promise<Object>} loadLocale - Asynchronous locale loader function.
     */
    constructor(_loadLocale) {
        this._loadLocale = _loadLocale;
        this._cache = {};
        if (typeof _loadLocale !== 'function') {
            throw new Error('loadLocale must be a function');
        }
        exports.RUNTIME.instances.add(this);
        this.load();
    }
    _loadLocaleInstance(locale) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this._loadLocale(locale);
            return ((result === null || result === void 0 ? void 0 : result.__esModule) ? result.default : result);
        });
    }
    _load(locale) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (locale !== constants_1.PSEUDO_LOCALE && !this._cache[locale]) {
                let data;
                try {
                    data = yield this._loadLocaleInstance(locale);
                    if (!data) {
                        const lang = (0, getLanguageFromLocale_1.getLanguageFromLocale)(locale);
                        if (lang) {
                            data = yield this._loadLocaleInstance(lang);
                        }
                    }
                }
                catch (error) {
                    /* ignore error */
                }
                if (!data) {
                    data = {};
                }
                this._cache[locale] = data;
            }
        });
    }
    load() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._load(checkDefaults(exports.RUNTIME.fallbackLocale));
            yield this._load(checkDefaults(exports.RUNTIME.defaultLocale));
            yield this._load(checkDefaults(exports.RUNTIME.locale));
        });
    }
    _getString(key, locale) {
        const currI18n = this._cache[locale];
        if (currI18n && Object.prototype.hasOwnProperty.call(currI18n, key)) {
            return currI18n[key];
        }
        const lang = (0, getLanguageFromLocale_1.getLanguageFromLocale)(locale);
        const currParsedLocal = lang && this._cache[lang];
        if (currParsedLocal &&
            Object.prototype.hasOwnProperty.call(currParsedLocal, key)) {
            return currParsedLocal[key];
        }
        const defaultI18n = this._cache[exports.RUNTIME.defaultLocale];
        if (defaultI18n && Object.prototype.hasOwnProperty.call(defaultI18n, key)) {
            return defaultI18n[key];
        }
        const fallbackI18n = this._cache[exports.RUNTIME.fallbackLocale];
        if (fallbackI18n &&
            Object.prototype.hasOwnProperty.call(fallbackI18n, key)) {
            return fallbackI18n[key];
        }
        return key;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getString(key, locale = exports.RUNTIME.locale) {
        if (locale === constants_1.PSEUDO_LOCALE) {
            return (0, toPseudoString_1.default)({
                str: this._getString(key, exports.RUNTIME.fallbackLocale),
                padRatio: exports.RUNTIME.padRatio,
            });
        }
        return this._getString(key, checkDefaults(locale));
    }
    static checkDefaults(locale) {
        return checkDefaults(locale);
    }
    checkDefaults(locale) {
        return checkDefaults(locale);
    }
    get currentLocale() {
        return exports.RUNTIME.locale;
    }
    get setLocale() {
        return setLocale;
    }
    static get currentLocale() {
        return exports.RUNTIME.locale;
    }
    static get setLocale() {
        return setLocale;
    }
    static get padRatio() {
        return exports.RUNTIME.padRatio;
    }
    static set padRatio(ratio) {
        if (Number.isNaN(ratio)) {
            // eslint-disable-next-line no-console
            console.log('ratio must be a number');
            return;
        }
        exports.RUNTIME.padRatio =
            typeof ratio === 'number' ? ratio : Number.parseFloat(ratio);
    }
    static setDefaultLocale(locale) {
        return setDefaultLocale(locale);
    }
    setDefaultLocale(locale) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return setDefaultLocale(locale);
        });
    }
    static setLanguageDefaults(defaults) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return setLanguageDefaults(defaults);
        });
    }
    setLanguageDefaults(defaults) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return setLanguageDefaults(defaults);
        });
    }
}
exports.default = I18n;
//# sourceMappingURL=i18n.js.map