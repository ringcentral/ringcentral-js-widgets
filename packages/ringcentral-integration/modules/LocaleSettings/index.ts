import { combineReducers } from 'redux';

import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';

import { moduleActionTypes } from '../../enums/moduleActionTypes';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { selector } from '../../lib/selector';
import { getSavedLocaleReducer } from './reducers';

/* eslint-disable global-require */

/**
 * @class
 * @description Locale managing module
 */
@Module({
  name: 'LocaleSettings',
  deps: [
    'GlobalStorage',
    'Locale',
    { dep: 'LocaleSettingsOptions', optional: true },
  ],
})
export default class LocaleSettings extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.defaultLocale - default 'en-US'
   */
  constructor({
    globalStorage,
    locale,
    supportedLocales = [DEFAULT_LOCALE],
    ...options
  } = {}) {
    super({
      ...options,
    });
    this._globalStorage = ensureExist.call(
      this,
      globalStorage,
      'globalStorage',
    );
    this._locale = ensureExist.call(this, locale, 'locale');
    this._supportedLocales = supportedLocales;
    this._storageKey = 'localeSettingsData';
    this._globalStorage.registerReducer({
      key: this._storageKey,
      reducer: getSavedLocaleReducer(this.actionTypes),
    });
  }

  get _actionTypes() {
    return ObjectMap.prefixKeys(
      [...ObjectMap.keys(moduleActionTypes), 'saveLocale'],
      'localeSettings',
    );
  }

  get reducer() {
    return combineReducers({
      status: getModuleStatusReducer(this.actionTypes),
    });
  }

  async _onStateChange() {
    if (this.pending && this._globalStorage.ready && this._locale.ready) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (!this.savedLocale) {
        this.saveLocale(this._locale.currentLocale);
      } else if (this.savedLocale !== this._locale.currentLocale) {
        await this._locale.setLocale(this.savedLocale);
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    }
  }

  get status() {
    return this.state.status;
  }

  get savedLocale() {
    return this._globalStorage.getItem(this._storageKey);
  }

  @selector
  supportedLocales = [() => this._supportedLocales, (s) => s.slice().sort()];

  @proxify
  async saveLocale(locale) {
    await this._locale.setLocale(locale);
    this.store.dispatch({
      type: this.actionTypes.saveLocale,
      locale,
    });
  }
}
