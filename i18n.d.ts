type LanguageInstance = Record<
/**
 * key of i18n
 */
string, string> | null;
export declare const RUNTIME: {
    locale: string;
    defaultLocale: string;
    instances: Set<{
        load: () => Promise<void>;
    }>;
    padRatio: number;
    fallbackLocale: string;
    languageDefaults: LanguageInstance;
};
/**
 * @function
 * @description Set current runtime locale and load the locale files accordingly
 * @param {String} locale - The desired locale.
 * @return Promise<undefined>
 */
declare function setLocale(locale: string): Promise<void>;
/**
 * @class
 * @description I18n is a simple localizations helper class that represents a set of locale files.
 */
export default class I18n<T = Record<string, string>> {
    private _loadLocale;
    _cache: Record<string, LanguageInstance>;
    /**
     * @constructor
     * @description Accepts a loadLocale function that should be async and resolve to the locale
     *  object when invoked.
     * @param {String => Promise<Object>} loadLocale - Asynchronous locale loader function.
     */
    constructor(_loadLocale: (local?: string) => Promise<LanguageInstance | {
        __esModule: boolean;
        default: LanguageInstance;
    }>);
    private _loadLocaleInstance;
    _load(locale: string): Promise<void>;
    load(): Promise<void>;
    _getString(key: string, locale: string): string;
    getString<K extends keyof T = any>(key: K, locale?: string): string;
    static checkDefaults(locale: string): string;
    checkDefaults(locale: string): string;
    get currentLocale(): string;
    get setLocale(): typeof setLocale;
    static get currentLocale(): string;
    static get setLocale(): typeof setLocale;
    static get padRatio(): number;
    static set padRatio(ratio: number);
    static setDefaultLocale(locale: string): Promise<void>;
    setDefaultLocale(locale: string): Promise<void>;
    static setLanguageDefaults(defaults: LanguageInstance): Promise<void>;
    setLanguageDefaults(defaults: LanguageInstance): Promise<void>;
}
export {};
