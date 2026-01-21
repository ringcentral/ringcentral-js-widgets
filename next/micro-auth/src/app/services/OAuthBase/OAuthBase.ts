import {
  Brand,
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  RcModule,
  state,
} from '@ringcentral-integration/next-core';
import parseCallbackUri from '@ringcentral-integration/widgets/lib/parseCallbackUri';
import { filter, firstValueFrom, of, timeout } from 'rxjs';

import { trackEvent } from '../Analytics';
import { Auth } from '../Auth';

import type { OAuthBaseOptions } from './OAuthBase.interface';
import { t } from './i18n';

const DEFAULT_UI_OPTIONS: string[] = [];

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

export abstract class OAuthBase extends RcModule {
  constructor(
    protected _auth: Auth,
    protected _toast: Toast,
    protected _locale: Locale,
    protected _brand: Brand,
    protected _tabManager?: any,
    protected _oAuthOptions?: OAuthBaseOptions,
  ) {
    super();

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

  async handleCallbackLogin(callbackUri: string) {
    const result = await this._handleCallbackUri(callbackUri);

    if (result) {
      // wait ownerId be exist the track able to event, because our state change inside onLoginSuccess callback event with server state set, so we need wait the ownerId state be sync into client
      await firstValueFrom(
        this._auth.ownerId$.pipe(
          filter(Boolean),
          timeout({
            // in some slow device the sync time may longer, up to 5s to prevent that not be tracked
            each: 5000,
            with: () => {
              this.logger.error(
                'Login success but timeout 5s for the ownerId be exist',
              );

              return of('timeout' as const);
            },
          }),
        ),
      );
    }

    trackEvent('Int_signIn', {
      signInSource: 'CLW',
      signInResult: result ? 'Successfully signed in' : 'Failed',
    });
  }

  @delegate('server')
  protected async _handleCallbackUri(callbackUri: string) {
    try {
      const query = parseCallbackUri(callbackUri);

      await this._loginWithCallbackQuery(query);
      return true;
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
          message = t('accessDenied');
          break;
        case 'server_error':
        case 'temporarily_unavailable':
        default:
          message = t('internalError');
          break;
      }

      const showCustomToast = this._oAuthOptions?.showCustomToast;
      if (showCustomToast) {
        const status = showCustomToast(error.message, error.error_description);
        if (status) {
          return;
        }
      }
      this._toast.danger({
        message,
      });
    }
    return false;
  }

  protected async _loginWithCallbackQuery(
    query: RefreshWithCallbackQueryParams,
  ) {
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

  protected async _refreshWithCallbackQuery(
    query: RefreshWithCallbackQueryParams,
  ) {
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

  protected get _redirectUri() {
    return this._oAuthOptions?.redirectUri;
  }

  protected get _uiOptions() {
    return this._oAuthOptions?.uiOptions || DEFAULT_UI_OPTIONS;
  }

  abstract destroyOAuth(): Promise<void>;

  abstract openOAuthPage(): Promise<void>;

  async getOAuthUri() {
    const authState = await this.getAuthState();
    const redirectUri = await this.getRedirectUri();
    const loginUrl = await this._auth.getLoginUrl({
      redirectUri,
      brandId: this._brand.defaultConfig.id,
      state: authState,
      display: 'page',
      localeId: this._locale.currentLocale,
      uiOptions: this._uiOptions,
      implicit: this._auth.isImplicit,
      force: true,
    });
    return loginUrl;
  }

  async getImplicitRefreshOAuthUri() {
    const authState = await this.getAuthState();
    const redirectUri = await this.getRedirectUri();
    const loginUrl = await this._auth.getLoginUrl({
      redirectUri,
      brandId: this._brand.id,
      state: authState,
      display: 'page',
      prompt: 'none',
      implicit: this._auth.isImplicit,
    });
    return loginUrl;
  }

  /**
   * Make `authState` getter to be overridable for async scenario
   */
  async getAuthState() {
    return this.authState;
  }

  /**
   * Make `redirectUri` getter to be overridable for async scenario
   */
  @delegate('server')
  async getRedirectUri() {
    return this.redirectUri;
  }

  get authState() {
    return btoa(`${Date.now()}`);
  }

  get redirectUri() {
    return new URL(this._redirectUri!, global.location.href).href;
  }
}
