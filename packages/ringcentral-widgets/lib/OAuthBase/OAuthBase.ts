import url from 'url';

import { Module } from '@ringcentral-integration/commons/lib/di';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import required from '@ringcentral-integration/commons/lib/required';
import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
import { action, RcModuleV2, state } from '@ringcentral-integration/core';

import parseCallbackUri from '../parseCallbackUri';
import type { Deps } from './OAuthBase.interface';

const DEFAULT_UI_OPTIONS = ['hide_remember_me', 'hide_tos'];

type RefreshWithCallbackQueryParams = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  endpoint_id?: string;
  code?: string;
  scope?: string;
  token_uri?: string;
  discovery_uri?: string;
};

@Module({
  deps: [
    'Auth',
    'Alert',
    'Locale',
    'Brand',
    { dep: 'TabManager', optional: true },
    { dep: 'OAuthOptions', optional: true },
  ],
})
export class OAuthBase<T extends Deps = Deps> extends RcModuleV2<T> {
  constructor(deps: T) {
    super({
      deps,
    });

    if (!this._redirectUri) {
      throw new Error('redirectUri is required');
    }
  }

  @state
  oAuthReady = false;

  @action
  setOAuthReady(val: boolean) {
    this.oAuthReady = val;
  }

  @required
  get name(): string {
    /* require implementation in descendent */
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
    return null;
  }

  @proxify
  protected async _handleCallbackUri(callbackUri: string, refresh = false) {
    try {
      const query = parseCallbackUri(callbackUri);
      if (refresh) {
        await this._refreshWithCallbackQuery(query);
      } else {
        await this._loginWithCallbackQuery(query);
      }
    } catch (error: any) {
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
      this._deps.alert.danger({
        message,
        payload: error,
      });
    }
  }

  protected async _loginWithCallbackQuery(
    query: RefreshWithCallbackQueryParams,
  ) {
    if (!(query.code || query.access_token)) {
      return;
    }
    await this._deps.auth.login({
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

  protected async _refreshWithCallbackQuery(
    query: RefreshWithCallbackQueryParams,
  ) {
    if (!query.access_token) {
      return;
    }
    await this._deps.auth.refreshImplicitToken({
      tokenType: query.token_type,
      accessToken: query.access_token,
      expiresIn: query.expires_in,
      endpointId: query.endpoint_id,
    });
  }

  protected get _redirectUri() {
    return this._deps.oAuthOptions?.redirectUri;
  }

  protected get _uiOptions() {
    return this._deps.oAuthOptions?.uiOptions || DEFAULT_UI_OPTIONS;
  }

  @required
  async destroyOAuth() {}

  @required
  async openOAuthPage() {}

  get oAuthUri() {
    return this._deps.auth.getLoginUrl({
      redirectUri: this.redirectUri,
      brandId: this._deps.brand.id,
      state: this.authState,
      display: 'page',
      localeId: this._deps.locale.currentLocale,
      uiOptions: this._uiOptions,
      implicit: this._deps.auth.isImplicit,
      force: true,
    });
  }

  get implicitRefreshOAuthUri() {
    return this._deps.auth.getLoginUrl({
      redirectUri: this.redirectUri,
      brandId: this._deps.brand.id,
      state: this.authState,
      display: 'page',
      prompt: 'none',
      implicit: this._deps.auth.isImplicit,
    });
  }

  get authState() {
    return btoa(`${Date.now()}`);
  }

  get redirectUri() {
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    return url.resolve(window.location.href, this._redirectUri);
  }
}
