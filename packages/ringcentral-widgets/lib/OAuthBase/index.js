import RcModule from 'ringcentral-integration/lib/RcModule';
import { prefixEnum } from 'ringcentral-integration/lib/Enum';
import { Module } from 'ringcentral-integration/lib/di';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import authMessages from 'ringcentral-integration/modules/Auth/authMessages';
import required from 'ringcentral-integration/lib/required';
import qs from 'qs';
import url from 'url';

import parseCallbackUri from '../parseCallbackUri';
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
export default class OAuthBase extends RcModule {
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
    this._redirectUri = this::ensureExist(redirectUri, 'redirectUri');
    this._reducer = getOAuthBaseReducer(this.actionTypes);
  }

  get _actionTypes() {
    return prefixEnum({ enumMap: baseActionTypes, prefix: this.name });
  }

  @required
  get name() {
    /* require implementation in descendent */
    return null;
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
  async _handleCallbackUri(callbackUri, refresh = false) {
    try {
      const query = parseCallbackUri(callbackUri);
      if (refresh) {
        await this._refreshWithCallbackQuery(query);
      } else {
        await this._loginWithCallbackQuery(query);
      }
    } catch (error) {
      console.error('oauth error: ', error);
      let message;
      switch (error.message) {
        case 'invalid_request':
        case 'unauthorized_client':
        case 'access_denied':
        case 'unsupported_response_type':
        case 'invalid_scope':
          message = authMessages.accessDenied;
          break;
        case 'server_error':
        case 'temporarily_unavailable':
        default:
          message = authMessages.internalError;
          break;
      }
      this._alert.danger({
        message,
        payload: error,
      });
    }
  }

  async _loginWithCallbackQuery(query) {
    if (!(query.code || query.access_token)) {
      return;
    }
    await this._auth.login({
      code: query.code,
      accessToken: query.access_token,
      expiresIn: query.expires_in,
      endpointId: query.endpoint_id,
      redirectUri: this.redirectUri,
      tokenType: query.token_type,
    });
  }

  async _refreshWithCallbackQuery(query) {
    if (!query.access_token) {
      return;
    }
    await this._auth.refreshImplicitToken({
      tokenType: query.token_type,
      accessToken: query.access_token,
      expiresIn: query.expires_in,
      endpointId: query.endpoint_id,
    });
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
      implicit: this._auth.isImplicit,
    })}&${extendedQuery}`;
  }

  get implictRefreshOAuthUri() {
    return `${this._auth.getLoginUrl({
      redirectUri: this.redirectUri,
      brandId: this._brand.id,
      state: btoa(Date.now()),
      display: 'page',
      prompt: 'none',
      implicit: this._auth.isImplicit,
    })}`;
  }

  get status() {
    return this.state.status;
  }

  get oAuthReady() {
    return this.state.oAuthReady;
  }

  get redirectUri() {
    return url.resolve(window.location.href, this._redirectUri);
  }
}
