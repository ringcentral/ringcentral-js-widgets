import toPseudoString from './lib/toPseudoString';

export const DEFAULT_LOCALE = 'en-US';
export const PSEUDO_LOCALE = 'en-ZZ';
export const RUNTIME = {
  locale: DEFAULT_LOCALE,
  defaultLocale: DEFAULT_LOCALE,
  instances: new Set(),
};

/**
 * @function
 * @description Set currrent runtime locale and load the locale files accordingly
 * @param {String} locale - The desired locale.
 * @return Promise<undefined>
 */
async function setLocale(locale) {
  RUNTIME.locale = locale;
  for (const i of RUNTIME.instances) {
    await i.load();
  }
}

/**
 * @class
 * @description I18n is a simple localizations helper class that represents a set of locale files.
 */
export default class I18n {
  /**
   * @constructor
   * @description Accepts a loadLocale function that should be async and resolve to the locale
   *  object when invoked.
   * @param {String => Promise<Object>} loadLocale - Asynchronous locale loader function.
   */
  constructor(loadLocale) {
    if (typeof loadLocale !== 'function') {
      throw new Error('loadLocale must be a function');
    }
    this._loadLocale = loadLocale;
    this._cache = {};
    RUNTIME.instances.add(this);
    this.load();
  }
  async _load(locale) {
    if (locale !== PSEUDO_LOCALE && !this._cache[locale]) {
      let data;
      try {
        data = await (async () => this._loadLocale(locale))();
      } catch (error) {
        /* ignore error */
        data = {};
      }
      this._cache[locale] = data;
    }
  }
  async load() {
    await this._load(RUNTIME.defaultLocale);
    await this._load(RUNTIME.locale);
  }
  _getString(key, locale) {
    if (
      this._cache[locale] &&
      this._cache[locale]::Object.prototype.hasOwnProperty(key)
    ) {
      return this._cache[locale][key];
    }
    if (
      this._cache[RUNTIME.defaultLocale] &&
      this._cache[RUNTIME.defaultLocale]::Object.prototype.hasOwnProperty(key)
    ) {
      return this._cache[RUNTIME.defaultLocale][key];
    }
    return key;
  }
  getString(key, locale = RUNTIME.locale) {
    if (locale === PSEUDO_LOCALE) {
      return toPseudoString(this._getString(key, RUNTIME.defaultLocale));
    }
    return this._getString(key, locale);
  }

  // eslint-disable-next-line class-methods-use-this
  get currentLocale() {
    return RUNTIME.locale;
  }
  // eslint-disable-next-line class-methods-use-this
  get setLocale() {
    return setLocale;
  }

  static get currentLocale() {
    return RUNTIME.locale;
  }

  static get setLocale() {
    return setLocale;
  }

  static setDefaultLocale(locale) {
    RUNTIME.defaultLocale = locale;
  }
}
