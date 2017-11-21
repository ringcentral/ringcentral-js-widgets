import RcModule from 'ringcentral-integration/lib/RcModule';
import { prefixEnum } from 'ringcentral-integration/lib/Enum';
import { Module } from 'ringcentral-integration/lib/di';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import parseCallbackUri from 'ringcentral-integration/lib/parseCallbackUri';
import popWindow from 'ringcentral-integration/lib/popWindow';
import required from 'ringcentral-integration/lib/required';
import qs from 'qs';
import url from 'url';
import baseActionTypes from './baseActionTypes';
import getOAuthBaseReducer from './getOAuthBaseReducer';
import oAuthMessages from './oAuthMessages';

@Module({
  deps: [
    'Auth',
    'Alert',
    'Locale',
    'Brand',
    { dep: 'TabManager', optional: true },
  ],
})
export default class OAuth extends RcModule {
  constructor({
    alert,
    auth,
    brand,
    locale,
    tabManager,
    redirectUri,
    ...options
  }) {
    super({
      ...options,
    });
    this._alert = this::ensureExist(alert, 'alert');
    this._auth = this::ensureExist(auth, 'auth');
    this._brand = this::ensureExist(brand, 'brand');
    this._locale = this::ensureExist(locale, 'locale');
    this._tabManager = tabManager;
    this._redirectUri = url.resolve(location.href, this::ensureExist(redirectUri, 'redirectUri'));
    this._reducer = getOAuthBaseReducer(this.actionTypes);
  }

  get _actionTypes() {
    return prefixEnum({ enumMap: baseActionTypes, prefix: this.name });
  }

  @required
  get name() {
    /* require implementation in descendent */
  }

  _onStateChange() {
    if (
      this.pending &&
      (
        this._auth.ready &&
        this._locale.ready &&
        this._alert.ready &&
        (!this._tabManager || this._tabManager.ready)
      )
    ) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    }
  }

  @proxify
  async _handleCallbackUri(callbackUri) {
    try {
      const code = parseCallbackUri(callbackUri);
      if (code) {
        await this._auth.login({
          code,
          redirectUri: this.redirectUri,
        });
      }
    } catch (error) {
      let message;
      switch (error.message) {
        case 'invalid_request':
        case 'unauthorized_client':
        case 'access_denied':
        case 'unsupported_response_type':
        case 'invalid_scope':
          message = oAuthMessages.accessDenied;
          break;
        case 'server_error':
        case 'temporarily_unavailable':
        default:
          message = oAuthMessages.internalError;
          break;
      }
      this._alert.danger({
        message,
        payload: error,
      });
    }
  }

  @required
  async prepareOAuth() {}

  @required
  async destroyOAuth() {}

  @required
  openOAuthPage() {}


  get oAuthUri() {
    const extendedQuery = qs.stringify({
      force: true,
      localeId: this._locale.currentLocale,
      ui_options: 'hide_remember_me hide_tos',
    });
    return `${this._auth.getLoginUrl({
      redirectUri: this.redirectUri,
      brandId: this._brand.id,
      state: btoa(Date.now()),
      display: 'page',
    })}&${extendedQuery}`;
  }

  get status() {
    return this.state.status;
  }

  get oAuthReady() {
    return this.state.oAuthReady;
  }

  get redirectUri() {
    return url.resolve(location.href, this._redirectUri);
  }
}
