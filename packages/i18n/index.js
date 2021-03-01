import toPseudoString from './lib/toPseudoString';

export const DEFAULT_LOCALE = 'en-US';
export const PSEUDO_LOCALE = 'en-ZZ';
export const RUNTIME = {
  locale: DEFAULT_LOCALE,
  defaultLocale: DEFAULT_LOCALE,
  instances: new Set(),
  padRatio: 0.3,
  fallbackLocale: DEFAULT_LOCALE,
  languageDefaults: null,
};

/**
 * @function
 * @description Set current runtime locale and load the locale files accordingly
 * @param {String} locale - The desired locale.
 * @return Promise<undefined>
 */
async function setLocale(locale) {
  RUNTIME.locale = locale;
  await reloadLocales();
}

async function reloadLocales() {
  for (const i of RUNTIME.instances) {
    await i.load();
  }
}

async function setDefaultLocale(locale) {
  RUNTIME.defaultLocale = locale;
  await reloadLocales();
}

async function setLanguageDefaults(defaults) {
  RUNTIME.languageDefaults = defaults;
  await reloadLocales();
}

function checkDefaults(locale) {
  return (
    (RUNTIME.languageDefaults && RUNTIME.languageDefaults[locale]) || locale
  );
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
    await this._load(checkDefaults(RUNTIME.fallbackLocale));
    await this._load(checkDefaults(RUNTIME.defaultLocale));
    await this._load(checkDefaults(RUNTIME.locale));
  }
  _getString(key, locale) {
    if (
      this._cache[locale] &&
      Object.prototype.hasOwnProperty.call(this._cache[locale], key)
    ) {
      return this._cache[locale][key];
    }
    if (
      this._cache[RUNTIME.defaultLocale] &&
      Object.prototype.hasOwnProperty.call(
        this._cache[RUNTIME.defaultLocale],
        key,
      )
    ) {
      return this._cache[RUNTIME.defaultLocale][key];
    }
    if (
      this._cache[RUNTIME.fallbackLocale] &&
      Object.prototype.hasOwnProperty.call(
        this._cache[RUNTIME.fallbackLocale],
        key,
      )
    ) {
      return this._cache[RUNTIME.fallbackLocale][key];
    }

    return key;
  }
  getString(key, locale = RUNTIME.locale) {
    if (locale === PSEUDO_LOCALE) {
      return toPseudoString({
        str: this._getString(key, RUNTIME.fallbackLocale),
        padRatio: RUNTIME.padRatio,
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
      console.log('ratio must be a number');
      return;
    }
    RUNTIME.padRatio = Number.parseFloat(ratio);
  }

  static setDefaultLocale(locale) {
    RUNTIME.defaultLocale = locale;
  }

  static async setDefaultLocale(locale) {
    return setDefaultLocale(locale);
  }

  async setDefaultLocale(locale) {
    return setDefaultLocale(locale);
  }

  static async setLanguageDefaults(defaults) {
    return setLanguageDefaults(defaults);
  }

  async setLanguageDefaults(defaults) {
    return setLanguageDefaults(defaults);
  }
}
