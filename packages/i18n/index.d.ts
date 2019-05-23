export declare const DEFAULT_LOCALE = "en-US";
export declare const PSEUDO_LOCALE = "en-ZZ";
export declare const RUNTIME: {
    locale: string;
    defaultLocale: string;
    instances: Set<any>;
    padRatio: number;
};
declare function setLocale(locale: any): Promise<void>;
export default class I18n {
    _loadLocale: any;
    _cache: any;
    constructor(loadLocale: any);
    _load(locale: any): Promise<void>;
    load(): Promise<void>;
    _getString(key: any, locale: any): any;
    getString(key: any, locale?: string): any;
    readonly currentLocale: string;
    readonly setLocale: typeof setLocale;
}
export {};
