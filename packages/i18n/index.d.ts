export declare const DEFAULT_LOCALE = 'en-US';
export declare const PSEUDO_LOCALE = 'en-ZZ';
export declare const RUNTIME: {
  locale: string;
  defaultLocale: string;
  fallbackLocale: string;
  instances: Set<any>;
  padRatio: number;
};
declare function setLocale(locale: any): Promise<void>;

export type GetI18nKey<T> = Parameters<T['getString']>[0];

export default class I18n<T = Record<string, string>> {
  _loadLocale: string;
  _cache: Record<string, Record<string, string>>;
  constructor(loadLocale: string);
  _load(locale: string): Promise<void>;
  load(): Promise<void>;
  _getString(key: string, locale: string): string;
  getString<K extends keyof T = string>(key: K, locale?: string): string;
  readonly currentLocale: string;
  /**
   * set current locale, that will fetch the locale data
   */
  static readonly setLocale: typeof setLocale;
  static setDefaultLocale: (locale: string) => void;
  static padRatio: number;
}
export {};
