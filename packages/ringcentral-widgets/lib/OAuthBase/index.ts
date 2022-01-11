import url from 'url';

import { Module } from '@ringcentral-integration/commons/lib/di';
import ensureExist from '@ringcentral-integration/commons/lib/ensureExist';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import RcModule from '@ringcentral-integration/commons/lib/RcModule';
import required from '@ringcentral-integration/commons/lib/required';
import authMessages from '@ringcentral-integration/commons/modules/Auth/authMessages';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import parseCallbackUri from '../parseCallbackUri';
import { baseActionTypes } from './baseActionTypes';
import getOAuthBaseReducer from './getOAuthBaseReducer';

const DEFAULT_UI_OPTIONS = ['hide_remember_me', 'hide_tos'];
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
    extraUIOptions = DEFAULT_UI_OPTIONS,
    ...options
  }) {
    super({
      ...options,
    });
    this._alert = ensureExist.call(this, alert, 'alert');
    this._auth = ensureExist.call(this, auth, 'auth');
    this._brand = ensureExist.call(this, brand, 'brand');
    this._locale = ensureExist.call(this, locale, 'locale');
    this._tabManager = tabManager;
    this._redirectUri = ensureExist.call(this, redirectUri, 'redirectUri');
    this._reducer = getOAuthBaseReducer(this.actionTypes);
    this._extraUIOptions = extraUIOptions;
  }

  get _actionTypes() {
    return ObjectMap.prefixKeys(
      [...ObjectMap.keys(baseActionTypes)],
      this.name,
    );
  }

  @required
  get name() {
    /* require implementation in descendent */
    return null;
  }

  _onStateChange() {
    if (
      this.pending &&
      this._auth.ready &&
      this._locale.ready &&
      this._alert.ready &&
      (!this._tabManager || this._tabManager.ready)
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
      // Error handling standard in callback uri
      // https://openid.net/specs/openid-connect-core-1_0.html#AuthError
      // Error handling standard in api response
      // https://tools.ietf.org/html/rfc6749#section-4.1.2
      switch (error.message) {
        case 'invalid_request':
        case 'unauthorized_client':
        case 'access_denied':
        case 'unsupported_response_type':
        case 'invalid_scope':
        case 'interaction_required':
        case 'login_required':
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
      scope: query.scope,
      tokenUri: query.token_uri,
      discoveryUri: query.discovery_uri,
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
  async openOAuthPage() {}

  get oAuthUri() {
    return this._auth.getLoginUrl({
      redirectUri: this.redirectUri,
      brandId: this._brand.id,
      state: this.authState,
      display: 'page',
      localeId: this._locale.currentLocale,
      uiOptions: this._extraUIOptions,
      implicit: this._auth.isImplicit,
      force: true,
    });
  }

  get implicitRefreshOAuthUri() {
    return this._auth.getLoginUrl({
      redirectUri: this.redirectUri,
      brandId: this._brand.id,
      state: this.authState,
      display: 'page',
      prompt: 'none',
      implicit: this._auth.isImplicit,
    });
  }

  get authState() {
    return btoa(Date.now());
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
