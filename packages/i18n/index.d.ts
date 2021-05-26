export declare const DEFAULT_LOCALE = 'en-US';
export declare const PSEUDO_LOCALE = 'en-ZZ';
export declare const RUNTIME: {
  locale: string;
  defaultLocale: string;
  instances: Set<any>;
  padRatio: number;
};
declare function setLocale(locale: any): Promise<void>;
export default class I18n {
  _loadLocale: string;
  _cache: Record<string, Record<string, string>>;
  constructor(loadLocale: string);
  _load(locale: string): Promise<void>;
  load(): Promise<void>;
  _getString(key: string, locale: string): string;
  getString(key: string, locale?: string): string;
  readonly currentLocale: string;
  static readonly setLocale: typeof setLocale;
  static setDefaultLocale: (locale: string) => void;
}
export {};
