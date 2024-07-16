import { DEFAULT_LOCALE, PSEUDO_LOCALE } from './constants';
import { getLanguageFromLocale } from './lib/getLanguageFromLocale';
import toPseudoString from './lib/toPseudoString';

type LanguageInstance = Record<
  /**
   * key of i18n
   */
  string,
  string
> | null;

export const RUNTIME = {
  locale: DEFAULT_LOCALE as string,
  defaultLocale: DEFAULT_LOCALE as string,
  instances: new Set<{ load: () => Promise<void> }>(),
  padRatio: 0.3,
  fallbackLocale: DEFAULT_LOCALE as string,
  languageDefaults: null as LanguageInstance,
};

/**
 * @function
 * @description Set current runtime locale and load the locale files accordingly
 * @param {String} locale - The desired locale.
 * @return Promise<undefined>
 */
async function setLocale(locale: string) {
  RUNTIME.locale = locale;
  await reloadLocales();
}

async function reloadLocales() {
  for (const i of RUNTIME.instances) {
    await i.load();
  }
}

async function setDefaultLocale(locale: string) {
  RUNTIME.defaultLocale = locale;
  await reloadLocales();
}

async function setLanguageDefaults(defaults: LanguageInstance) {
  RUNTIME.languageDefaults = defaults;
  await reloadLocales();
}

function checkDefaults(locale: string) {
  return (
    (RUNTIME.languageDefaults && RUNTIME.languageDefaults[locale]) || locale
  );
}

/**
 * @class
 * @description I18n is a simple localizations helper class that represents a set of locale files.
 */
export default class I18n<T = Record<string, string>> {
  _cache: Record<string, LanguageInstance> = {};
  /**
   * @constructor
   * @description Accepts a loadLocale function that should be async and resolve to the locale
   *  object when invoked.
   * @param {String => Promise<Object>} loadLocale - Asynchronous locale loader function.
   */
  constructor(
    private _loadLocale: (local?: string) => Promise<
      | LanguageInstance
      | {
          __esModule: boolean;
          default: LanguageInstance;
        }
    >,
  ) {
    if (typeof _loadLocale !== 'function') {
      throw new Error('loadLocale must be a function');
    }

    RUNTIME.instances.add(this);
    this.load();
  }

  private async _loadLocaleInstance(locale: string) {
    const result = await this._loadLocale(locale);
    return (result?.__esModule ? result.default : result) as LanguageInstance;
  }

  async _load(locale: string) {
    if (locale !== PSEUDO_LOCALE && !this._cache[locale]) {
      let data;
      try {
        data = await this._loadLocaleInstance(locale);

        if (!data) {
          const lang = getLanguageFromLocale(locale);
          if (lang) {
            data = await this._loadLocaleInstance(lang);
          }
        }
      } catch (error) {
        /* ignore error */
      }
      if (!data) {
        data = {};
      }
      this._cache[locale] = data;
    }
  }
  async load() {
    await this._load(checkDefaults(RUNTIME.fallbackLocale));
    await this._load(checkDefaults(RUNTIME.defaultLocale));
    await this._load(checkDefaults(RUNTIME.locale));
  }
  _getString(key: string, locale: string) {
    const currI18n = this._cache[locale];
    if (currI18n && Object.prototype.hasOwnProperty.call(currI18n, key)) {
      return currI18n[key];
    }

    const lang = getLanguageFromLocale(locale);
    const currParsedLocal = lang && this._cache[lang];
    if (
      currParsedLocal &&
      Object.prototype.hasOwnProperty.call(currParsedLocal, key)
    ) {
      return currParsedLocal[key];
    }

    const defaultI18n = this._cache[RUNTIME.defaultLocale];
    if (defaultI18n && Object.prototype.hasOwnProperty.call(defaultI18n, key)) {
      return defaultI18n[key];
    }

    const fallbackI18n = this._cache[RUNTIME.fallbackLocale];
    if (
      fallbackI18n &&
      Object.prototype.hasOwnProperty.call(fallbackI18n, key)
    ) {
      return fallbackI18n[key];
    }

    return key;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getString<K extends keyof T = any>(key: K, locale = RUNTIME.locale) {
    if (locale === PSEUDO_LOCALE) {
      return toPseudoString({
        str: this._getString(key as never, RUNTIME.fallbackLocale),
        padRatio: RUNTIME.padRatio,
      });
    }
    return this._getString(key as never, checkDefaults(locale));
  }

  static checkDefaults(locale: string) {
    return checkDefaults(locale);
  }

  checkDefaults(locale: string) {
    return checkDefaults(locale);
  }

  get currentLocale() {
    return RUNTIME.locale;
  }

  get setLocale() {
    return setLocale;
  }

  static get currentLocale() {
    return RUNTIME.locale;
  }

  static get setLocale() {
    return setLocale;
  }

  static get padRatio() {
    return RUNTIME.padRatio;
  }

  static set padRatio(ratio) {
    if (Number.isNaN(ratio)) {
      // eslint-disable-next-line no-console
      console.log('ratio must be a number');
      return;
    }
    RUNTIME.padRatio =
      typeof ratio === 'number' ? ratio : Number.parseFloat(ratio);
  }

  static setDefaultLocale(locale: string) {
    return setDefaultLocale(locale);
  }

  async setDefaultLocale(locale: string) {
    return setDefaultLocale(locale);
  }

  static async setLanguageDefaults(defaults: LanguageInstance) {
    return setLanguageDefaults(defaults);
  }

  async setLanguageDefaults(defaults: LanguageInstance) {
    return setLanguageDefaults(defaults);
  }
}
