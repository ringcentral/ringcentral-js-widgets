import {
  action,
  RcModuleV2,
  state,
  track,
  watch,
} from '@ringcentral-integration/core';
import type { ApiError } from '@ringcentral/sdk';

import { trackEvents } from '../../enums/trackEvents';
import { createRefreshTokenHelper } from '../../lib/createRefreshTokenHelper';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type {
  Deps,
  LoginOptions,
  LoginUrlOptions,
  Token,
  TokenInfo,
  BeforeLogoutHandler,
  AfterLoggedInHandler,
  RefreshErrorHandler,
} from './Auth.interface';
import { matchKnownRequestErrors } from './authErrors';
import { authMessages } from './authMessages';
import { loginStatus } from './loginStatus';

export const LoginStatusChangeEvent = 'loginStatusChange';
export const TriggerSyncTokenEvent = 'triggerSyncTokenEvent';

@Module({
  name: 'Auth',
  deps: [
    'Client',
    'Alert',
    'Locale',
    { dep: 'TabManager', optional: true },
    { dep: 'RateLimiter', optional: true },
    { dep: 'Environment', optional: true },
    { dep: 'AuthOptions', optional: true },
  ],
})
class Auth extends RcModuleV2<Deps> {
  private _loggedIn = false;
  _beforeLogoutHandlers: Set<BeforeLogoutHandler> = new Set();
  _afterLoggedInHandlers: Set<AfterLoggedInHandler> = new Set();
  _onRefreshErrorHandlers: Set<RefreshErrorHandler> = new Set();
  _unbindEvents?: () => void;
  _lastEnvironmentCounter = 0;

  private refreshTokenHelper = createRefreshTokenHelper(
    () => this._deps.client.service.platform(),
    console,
  );

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @state
  loginStatus: string | null = null;

  @state
  isFreshLogin: boolean | null = null;

  @state
  token: Token = {};

  @state
  protected _triggerSyncToken = false;

  @action
  _setToken(token: TokenInfo, triggerSyncToken = true) {
    this.token = {
      ownerId: token.owner_id,
      endpointId: token.endpoint_id,
      accessToken: token.access_token,
      tokenType: token.token_type,
      expireTime: token.expire_time,
      expiresIn: token.expires_in,
      scope: token.scope,
    };
    this._triggerSyncToken = triggerSyncToken;
  }

  @track(() => (analytics) => {
    // @ts-expect-error TS(2339): Property 'setUserId' does not exist on type 'IAnal... Remove this comment to see the full error message
    analytics.setUserId();
    return [trackEvents.authentication];
  })
  @action
  setLoginSuccess(token: TokenInfo) {
    this.loginStatus = loginStatus.loggedIn;
    this._setToken(token);
  }

  @action
  setLoginError() {
    this.loginStatus = loginStatus.notLoggedIn;
    this._setToken({});
    this.isFreshLogin = null;
  }

  @action
  setLogoutSuccess() {
    this.loginStatus = loginStatus.notLoggedIn;
    this._setToken({});
    this.isFreshLogin = null;
  }

  @action
  setRefreshSuccess(token: TokenInfo) {
    this.loginStatus = loginStatus.loggedIn;
    this._setToken(token);
  }

  @action
  setRefreshError(refreshTokenValid: boolean) {
    this.isFreshLogin = null;
    if (!refreshTokenValid) {
      this._setToken({});
      this.loginStatus = loginStatus.notLoggedIn;
    }
  }

  @action
  setLogoutError() {
    this.loginStatus = loginStatus.notLoggedIn;
    this._setToken({});
    this.isFreshLogin = null;
  }

  @action
  setLogin() {
    this.loginStatus = loginStatus.loggingIn;
    this.isFreshLogin = true;
  }

  @action
  setBeforeLogout() {
    this.loginStatus = loginStatus.beforeLogout;
  }

  @action
  setCancelLogout() {
    this.loginStatus = loginStatus.loggedIn;
  }

  @track(trackEvents.logout)
  @action
  setLogout() {
    this.loginStatus = loginStatus.loggingOut;
  }

  @action
  setInitLogin({ loggedIn, token }: { loggedIn: boolean; token: TokenInfo }) {
    this.loginStatus = loggedIn
      ? loginStatus.loggedIn
      : loginStatus.notLoggedIn;
    this.isFreshLogin = loggedIn ? false : null;
    this._setToken(token ?? {}, false);
  }

  _bindEvents() {
    if (this._unbindEvents) this._unbindEvents();
    const platform = this._deps.client.service.platform();
    const client = this._deps.client.service.client();
    const onRequestError = async (error: ApiError) => {
      const matches = await matchKnownRequestErrors(error);
      // logout solution
      const logoutRequired = matches.some(
        ([_0, _1, solutions]) => solutions?.logout,
      );
      if (logoutRequired && this.loginStatus === loginStatus.loggedIn) {
        await this.logout();
      }
      // alert solution
      const alerts = matches
        .map(([_0, _1, solutions]) => solutions?.alert)
        .filter((x) => !!x) // remove empty
        .filter((x, index, array) => array.indexOf(x) === index); // remove duplicates
      alerts.forEach((alert) => {
        this._deps.alert.warning({
          message: alert!,
          payload: error,
          ttl: 0,
        });
      });
    };

    const onLoginSuccess = async () => {
      const token: TokenInfo = await platform.auth().data();
      this.setLoginSuccess(token);
      const handlers = [...this._afterLoggedInHandlers];
      for (const handler of handlers) {
        handler();
      }
    };
    const onLoginError = () => {
      this.setLoginError();
    };
    const onLogoutSuccess = () => {
      this.setLogoutSuccess();
    };
    const onLogoutError = () => {
      platform._cache.clean();
      this.setLogoutError();
    };
    const onRefreshSuccess = async () => {
      const token: TokenInfo = await platform.auth().data();
      this.setRefreshSuccess(token);
    };
    const onRefreshError = async (error: ApiError) => {
      // user is still considered logged in if the refreshToken is still valid
      const { refreshTokenValid, resStatus } =
        await this.refreshTokenHelper.getRefreshTokenState(error);

      const handlers = [...this._onRefreshErrorHandlers];
      const results = await Promise.allSettled(
        handlers.map(async (handler) => await handler(refreshTokenValid)),
      );
      results.forEach((x) => {
        if (x.status === 'rejected') {
          console.warn('Trigger [RefreshErrorHandler] failed', x.reason);
        }
      });

      this.setRefreshError(refreshTokenValid);

      await this.refreshTokenHelper.processRefreshError({
        error,
        refreshTokenValid,
        resStatus,
        onSessionExpired: () => {
          this._deps.alert.danger({
            message: authMessages.sessionExpired,
            payload: error,
            ttl: 0,
          });
        },
      });
    };
    platform.addListener(platform.events.loginSuccess, onLoginSuccess);
    platform.addListener(platform.events.loginError, onLoginError);
    platform.addListener(platform.events.logoutSuccess, onLogoutSuccess);
    platform.addListener(platform.events.logoutError, onLogoutError);
    platform.addListener(platform.events.refreshSuccess, onRefreshSuccess);
    platform.addListener(platform.events.refreshError, onRefreshError);
    client.addListener(client.events.requestError, onRequestError);
    this._unbindEvents = () => {
      platform.removeListener(platform.events.loginSuccess, onLoginSuccess);
      platform.removeListener(platform.events.loginError, onLoginError);
      platform.removeListener(platform.events.logoutSuccess, onLogoutSuccess);
      platform.removeListener(platform.events.logoutError, onLogoutError);
      platform.removeListener(platform.events.refreshSuccess, onRefreshSuccess);
      platform.removeListener(platform.events.refreshError, onRefreshError);
      client.removeListener(client.events.requestError, onRequestError);
    };
  }

  override _shouldInit() {
    return (
      this.pending &&
      this._deps.locale.ready &&
      (!this._deps.tabManager || this._deps.tabManager.ready) &&
      (!this._deps.environment || this._deps.environment.ready)
    );
  }

  override async onStateChange() {
    if (this._deps.tabManager && this._deps.tabManager.ready && this.ready) {
      if (
        (this._loggedIn && this.loginStatus === loginStatus.notLoggedIn) ||
        (!this._loggedIn && this.loginStatus === loginStatus.loggedIn)
      ) {
        this._loggedIn = !this._loggedIn;
        this._deps.tabManager.send(LoginStatusChangeEvent, this._loggedIn);
      } else if (
        this._deps.tabManager.event &&
        this._deps.tabManager.event.name === LoginStatusChangeEvent &&
        this._deps.tabManager.event.args?.[0] !== this.loggedIn
      ) {
        /* eslint { "prefer-destructuring": 0 } */
        this._loggedIn = this._deps.tabManager.event.args?.[0];
        await this.fetchToken();
      }
    }
    if (
      this.ready &&
      this._deps.environment &&
      this._deps.environment.changeCounter !== this._lastEnvironmentCounter
    ) {
      this._lastEnvironmentCounter = this._deps.environment.changeCounter;
      this._bindEvents();
    }
  }

  override async onInit() {
    this._loggedIn = await this.refreshTokenHelper.loggedIn();
    this._bindEvents();
    watch(
      this,
      () => [this.token, this._triggerSyncToken],
      () => {
        if (this._triggerSyncToken) {
          this._deps.tabManager?.send(TriggerSyncTokenEvent);
        }
      },
    );
    watch(
      this,
      () => this._deps.tabManager?.event,
      () => {
        if (this._deps.tabManager?.event?.name === TriggerSyncTokenEvent) {
          this.fetchToken();
        }
      },
    );

    // must check token from storage before that module ready, put that inside onInit lifeCycle
    await this.fetchToken();
  }

  async fetchToken() {
    const platform = this._deps.client.service.platform();
    const token: TokenInfo = this._loggedIn
      ? await platform.auth().data()
      : null;
    this.setInitLogin({
      loggedIn: this._loggedIn,
      token,
    });
  }

  get ownerId() {
    return this.token.ownerId;
  }

  get endpointId() {
    return this.token.endpointId;
  }

  get accessToken() {
    return this.token.accessToken;
  }

  /**
   * @description Login either with username/password or with authorization code
   */
  @proxify
  async login({
    username,
    password,
    extension,
    remember,
    code,
    redirectUri,
    accessToken,
    expiresIn,
    endpointId,
    tokenType,
    scope,
    tokenUri,
    discoveryUri,
  }: // TODO: should use SDK Type if that can be work
  Partial<LoginOptions>) {
    this.setLogin();
    let ownerId: number | undefined;
    if (accessToken) {
      await this._deps.client.service.platform().auth().setData({
        token_type: tokenType,
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token_expires_in: expiresIn,
        scope,
      });
      const extensionData = await this._deps.client.account().extension().get();
      ownerId = extensionData.id;
    }
    // TODO: support to set redirectUri in js sdk v4 login function
    if (!this._deps.client.service.platform()._redirectUri) {
      this._deps.client.service.platform()._redirectUri = redirectUri;
    }
    return this._deps.client.service.platform().login({
      username,
      password,
      extension,
      remember,
      code,
      redirectUri,
      endpoint_id: endpointId,
      expires_in: expiresIn,
      access_token: accessToken,
      token_type: tokenType,
      owner_id: ownerId,
      token_uri: tokenUri,
      discovery_uri: discoveryUri,
    });
  }

  @proxify
  async refreshToken() {
    const resp = await this._deps.client.service.platform().refresh();
    const token = await resp.json();
    return token;
  }

  getLoginUrl({
    redirectUri,
    force,
    implicit = false,
    ...options
  }: LoginUrlOptions) {
    // TODO: support to set redirectUri in js sdk v4 login function
    if (!this._deps.client.service.platform()._redirectUri) {
      this._deps.client.service.platform()._redirectUri = redirectUri;
    }
    return `${this._deps.client.service.platform().loginUrl({
      ...options,
      redirectUri,
      implicit,
      usePKCE: this.usePKCE,
    })}${force ? '&force=true' : ''}`;
  }

  /**
   * @description Triggers the beforeLogoutHandlers to run
   *  and then proceed to logout from ringcentral.
   */
  @proxify
  async logout({ dismissAllAlert = true } = {}) {
    this.setBeforeLogout();
    if (dismissAllAlert) {
      // fix bug [https://jira_domain/browse/RCINT-17381]
      this._deps.alert.dismissAllExpectSpecified({
        specifiedAlertIds: [this._deps.rateLimiter?.rateLimitAlertId!],
      });
    }
    const handlers = [...this._beforeLogoutHandlers];
    try {
      if (this._deps.tabManager && this._deps.tabManager.ready) {
        this._deps.tabManager.send(LoginStatusChangeEvent, false);
      }
      for (const handler of handlers) {
        const result = await (async () => handler())();
        if (result) {
          this.setCancelLogout();
          if (this._deps.tabManager && this._deps.tabManager.ready) {
            this._deps.tabManager.send(LoginStatusChangeEvent, true);
          }
          return Promise.reject(result);
        }
      }
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.error(error);
    }
    this.setLogout();
    if (this.isImplicit) {
      this._deps.client.service.platform()._cache.clean();
      this.setLogoutSuccess();
      return null;
    }
    return this._deps.client.service.platform().logout();
  }

  /**
   * Add handler on "before logout" event
   * - Return anything not empty in the handler to cancel the logout as needed
   * @param handler event handler function
   * @returns cancel current handler, call that will delete the handler from that event
   */
  addBeforeLogoutHandler(handler: BeforeLogoutHandler) {
    this._beforeLogoutHandlers.add(handler);
    return () => {
      this.removeBeforeLogoutHandler(handler);
    };
  }

  /**
   * Remove handler from "before logout" event
   * @param handler event handler function
   */
  removeBeforeLogoutHandler(handler: BeforeLogoutHandler) {
    this._beforeLogoutHandlers.delete(handler);
  }

  /**
   * Add handler on "after logged in" event
   * @param handler event handler function
   * @returns cancel current handler, call that will delete the handler from that event
   */
  addAfterLoggedInHandler(handler: AfterLoggedInHandler) {
    this._afterLoggedInHandlers.add(handler);
    return () => {
      this.removeAfterLoggedInHandler(handler);
    };
  }

  /**
   * Remove handler from "after logged in" event
   * @param handler event handler function
   */
  removeAfterLoggedInHandler(handler: AfterLoggedInHandler) {
    this._afterLoggedInHandlers.delete(handler);
  }

  /**
   * Add handler on "refresh error" event
   * @param handler event handler function
   * @returns cancel current handler, call that will delete the handler from that event
   */
  addRefreshErrorHandler(handler: RefreshErrorHandler) {
    this._onRefreshErrorHandlers.add(handler);
    return () => {
      this.removeRefreshErrorHandler(handler);
    };
  }

  /**
   * Remove handler from "refresh error" event
   * @param handler event handler function
   */
  removeRefreshErrorHandler(handler: RefreshErrorHandler) {
    this._onRefreshErrorHandlers.delete(handler);
  }

  @proxify
  async refreshImplicitToken({
    tokenType,
    accessToken,
    expiresIn,
    endpointId,
  }: {
    tokenType: TokenInfo['token_type'];
    accessToken: TokenInfo['access_token'];
    expiresIn: TokenInfo['expires_in'];
    endpointId: TokenInfo['endpoint_id'];
  }) {
    try {
      const extensionData = await this._deps.client.account().extension().get();
      const ownerId = String(extensionData.id);
      if (ownerId !== String(this.ownerId)) {
        return;
      }
      const platform = this._deps.client.service.platform();
      const newAuthData = {
        token_type: tokenType,
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token_expires_in: expiresIn,
        endpoint_id: endpointId,
      };
      await platform.auth().setData(newAuthData);
      platform.emit(platform.events.refreshSuccess, newAuthData);
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.error('refreshImplicitToken error:', error);
    }
  }

  @proxify
  async checkIsLoggedIn() {
    // SDK would return false when there's temporary network issues,
    // but we should not return use back to welcome string and should
    // still consider the user as being logged in.
    await this._deps.client.service.platform().loggedIn();
    return this.loginStatus === loginStatus.loggedIn;
  }

  get loggedIn() {
    return (
      this.loginStatus === loginStatus.loggedIn ||
      this.loginStatus === loginStatus.beforeLogout
    );
  }

  get notLoggedIn() {
    return this.loginStatus === loginStatus.notLoggedIn;
  }

  get isImplicit() {
    return !(
      this.usePKCE ||
      (this._deps.client.service.platform()._clientSecret &&
        this._deps.client.service.platform()._clientSecret.length > 0)
    );
  }

  get usePKCE() {
    return this._deps.authOptions?.usePKCE ?? false;
  }
}

export { Auth };
