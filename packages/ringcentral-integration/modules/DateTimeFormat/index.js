import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import getIntlDateTimeFormatter from '../../lib/getIntlDateTimeFormatter';
import actionTypes from './actionTypes';
import getDateTimeFormatReducer from './getDateTimeFormatReducer';
import getProxyReducer from './getProxyReducer';

/**
 * @class DateTimeFormat
 * @description Simple date and time formatting manager.
 */
@Module({
  deps: ['Locale', { dep: 'DateTimeFormatOptions', optional: true }]
})
export default class DateTimeFormat extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Locale} params.locale - locale module instance
   */
  constructor({
    locale,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._locale = ensureExist(locale, 'locale');

    this._reducer = getDateTimeFormatReducer(this.actionTypes);
    this._proxyReducer = getProxyReducer(this.actionTypes);

    this._formatters = {};
  }
  _shouldInit() {
    return this.pending && this._locale.ready;
  }
  _shouldReset() {
    return this.ready && !this._locale.ready;
  }
  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (!this._defaultFormatter) {
        this._defaultFormatter = getIntlDateTimeFormatter();
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.reset,
      });
      this._formatters = {};
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }
  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }
  initializeProxy() {
    this.store.subscribe(() => {
      if (
        this.proxyPending &&
        this._locale.proxyReady
      ) {
        this.store.dispatch({
          type: this.actionTypes.proxyInit,
        });
        if (!this._defaultFormatter) {
          this._defaultFormatter = getIntlDateTimeFormatter();
        }
        this.store.dispatch({
          type: this.actionTypes.proxyInitSuccess,
        });
      }
    });
  }
  addFormatter({
    name,
    formatter,
  }) {
    if (!name) {
      throw new Error('`name` property cannot be empty.');
    }
    if (this._formatters[name]) {
      throw new Error(`A formatter with the same name: ${name} already exists.`);
    }
    if (typeof formatter !== 'function') {
      throw new Error('formatter must be a function.');
    }
    this._formatters[name] = formatter;
  }

  formatDateTime({
    name,
    utcTimestamp,
    locale = this._locale.currentLocale,
    type,
  }) {
    if (name && typeof this._formatters[name] === 'function') {
      return this._formatters[name]({
        utcTimestamp,
        locale,
        type,
      });
    }
    return this._defaultFormatter({
      utcTimestamp,
      locale,
      type,
    });
  }
  formatDate({
    name,
    utcTimestamp,
    locale,
  }) {
    return this.formatDateTime({
      name,
      utcTimestamp,
      locale,
      type: 'date',
    });
  }
  formatTime({
    name,
    utcTimestamp,
    locale,
  }) {
    return this.formatDateTime({
      name,
      utcTimestamp,
      locale,
      type: 'time',
    });
  }

  get status() {
    return (this.proxyState && this.proxyState.status) || this.state.status;
  }

  get proxyStatus() {
    return this.proxyState.status;
  }
}
