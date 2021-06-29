import formatMessage from 'format-message';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { combineReducers } from 'redux';
import I18n, {
  DEFAULT_LOCALE,
  PSEUDO_LOCALE,
} from '@ringcentral-integration/i18n';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
import RcModule from '../../lib/RcModule';
import proxify from '../../lib/proxy/proxify';
import { Module } from '../../lib/di';
import {
  getCurrentLocaleReducer,
  getProxyLocaleReducer,
  getToggleDebugMode,
} from './reducers';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import getProxyStatusReducer from '../../lib/getProxyStatusReducer';
import detectBrowserLocale from '../../lib/detectBrowserLocale';
import { moduleActionTypes } from '../../enums/moduleActionTypes';
import { proxyActionTypes } from '../../enums/proxyActionTypes';

/**
 * @class
 * @description Locale managing module
 */
@Module({
  deps: ['Brand', { dep: 'LocaleOptions', optional: true }],
})
export default class Locale extends RcModule {
  _defaultLocale: string;
  _detectBrowser: boolean;
  _polling: boolean;
  _pollingInterval: number;
  _transport: any;
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.defaultLocale - default 'en-US'
   */
  constructor({ brand, localeOptions = {}, ...options } = {}) {
    super({
      ...options,
    });
    const {
      defaultLocale = DEFAULT_LOCALE,
      detectBrowser = true,
      polling = false,
      pollingInterval = 2000,
    } = localeOptions;
    this._brand = brand;
    this._defaultLocale = defaultLocale;
    this._detectBrowser = detectBrowser;
    this._polling = polling;
    this._pollingInterval = pollingInterval;
    I18n.setDefaultLocale(this._defaultLocale);
  }

  _onStateChange() {
    /* do nothing */
  }

  get _supportedLocales() {
    return this._brand.brandConfig?.supportedLocales ?? [this._defaultLocale];
  }

  get _actionTypes() {
    return ObjectMap.prefixKeys(
      [
        ...ObjectMap.keys(moduleActionTypes),
        ...ObjectMap.keys(proxyActionTypes),
        'setLocale',
        'setLocaleSuccess',
        'setLocaleError',
        'syncProxyLocale',
        'toggleDebugMode',
      ],
      'locale',
    );
  }

  get reducer() {
    return combineReducers({
      status: getModuleStatusReducer(this.actionTypes),
      currentLocale: getCurrentLocaleReducer(this.actionTypes),
      debugMode: getToggleDebugMode(this.actionTypes),
    });
  }

  get proxyReducer() {
    return combineReducers({
      status: getProxyStatusReducer(this.actionTypes),
      proxyLocale: getProxyLocaleReducer(this.actionTypes),
    });
  }

  async initialize() {
    await this.setLocale(
      this._detectBrowser ? this.browserLocale : this._defaultLocale,
    );
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
    if (this._polling) {
      this._syncBrowserLocale();
    }
  }

  normalizeLocale(inputLocale: string) {
    const locale = formatLocale(inputLocale);

    const target = this._supportedLocales
      .map((item) => formatLocale(item))
      .find((item) => item === locale || item.split('-')[0] === locale);
    return target ?? this._defaultLocale;
  }

  async _syncBrowserLocale() {
    if (!this.debugMode && this.browserLocale !== this.currentLocale) {
      await this.setLocale(this.browserLocale);
    }
    setTimeout(() => this._syncBrowserLocale(), this._pollingInterval);
  }

  async initializeProxy() {
    this.store.dispatch({
      type: this.actionTypes.proxyInit,
    });
    await this._setLocale(this.currentLocale);
    this.store.dispatch({
      type: this.actionTypes.proxyInitSuccess,
    });
    this.store.subscribe(async () => {
      if (this.state.currentLocale !== this.proxyState.proxyLocale) {
        await this._setLocale(this.state.currentLocale);
        this.store.dispatch({
          type: this.actionTypes.syncProxyLocale,
          locale: this.state.currentLocale,
        });
      }
    });
  }

  /**
   * @property {String} currentLocale
   */
  get currentLocale() {
    return (
      (this._transport &&
        this.proxyState &&
        (this.proxyState.proxyLocale || this._defaultLocale)) ||
      this.state.currentLocale ||
      this._defaultLocale
    );
  }

  get browserLocale() {
    return detectBrowserLocale(this._defaultLocale);
  }

  get status() {
    return (this.proxyState && this.proxyState.status) || this.state.status;
  }

  get proxyStatus() {
    return this.proxyState.status;
  }

  get debugMode() {
    return this.state.debugMode;
  }

  @proxify
  async toggleDebugMode() {
    this.store.dispatch({
      type: this.actionTypes.toggleDebugMode,
      debugMode: this.debugMode,
    });
    if (this.debugMode) {
      this.setLocale(PSEUDO_LOCALE);
    }
  }

  async _setLocale(locale) {
    await I18n.setLocale(locale);
    formatMessage.setup({
      locale:
        this.currentLocale === PSEUDO_LOCALE
          ? DEFAULT_LOCALE
          : this.currentLocale,
    });
  }

  /**
   *  @function
   *  @description Sets the desired locale as the current locale. This will also
   *    set all I18n instances to the same locale, as well as set formatMessage to use
   *    the same locale.
   *  @param {String} locale
   *  @return {Promise}
   */
  @proxify
  async setLocale(locale) {
    this.store.dispatch({
      type: this.actionTypes.setLocale,
      locale,
    });
    try {
      await this._setLocale(locale);
      this.store.dispatch({
        type: this.actionTypes.setLocaleSuccess,
        locale,
      });
    } catch (error) {
      this.store.dispatch({
        type: this.actionTypes.setLocaleError,
        error,
      });
    }
  }
}
