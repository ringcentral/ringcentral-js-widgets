import defaultConfig from 'locale-loader/defaultConfig';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import RcModule from '../../lib/RcModule';
import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';
import proxify from '../../lib/proxy/proxify';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import getter from '../../lib/getter';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import {
  getSavedLocaleReducer,
} from './reducers';

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
    { dep: 'LocaleSettingsOptions', optional: true }
  ]
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
    supportedLocales = defaultConfig.supportedLocales,
    ...options
  } = {}) {
    super({
      ...options,
    });
    this._globalStorage = this::ensureExist(globalStorage, 'globalStorage');
    this._locale = this::ensureExist(locale, 'locale');
    this._supportedLocales = supportedLocales;
    this._storageKey = 'localeSettingsData';
    this._globalStorage.registerReducer({
      key: this._storageKey,
      reducer: getSavedLocaleReducer(this.actionTypes),
    });
  }

  get _actionTypes() {
    return new Enum([
      ...Object.keys(moduleActionTypes),
      'saveLocale',
    ], 'localeSettings');
  }

  get reducer() {
    return combineReducers({
      status: getModuleStatusReducer(this.actionTypes),
    });
  }

  async _onStateChange() {
    if (
      this.pending &&
      this._globalStorage.ready &&
      this._locale.ready
    ) {
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

  @getter
  supportedLocales = createSelector(
    () => this._supportedLocales,
    s => s.slice().sort(),
  );

  @proxify
  async saveLocale(locale) {
    await this._locale.setLocale(locale);
    this.store.dispatch({
      type: this.actionTypes.saveLocale,
      locale,
    });
  }
}
