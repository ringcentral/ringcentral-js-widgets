import { GetExtensionInfoResponse } from '@rc-ex/core/definitions';
import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import url from 'url';

import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import validateIsOffline from '../../lib/validateIsOffline';
import { Deps, Token, TokenInfo } from './Auth.interface';
import { authMessages } from './authMessages';
import { loginStatus } from './loginStatus';

export const LoginStatusChangeEvent = 'loginStatusChange';

@Module({
  name: 'Auth',
  deps: [
    'Client',
    'Alert',
    'Locale',
    { dep: 'TabManager', optional: true },
    { dep: 'Environment', optional: true },
    { dep: 'AuthOptions', optional: true },
  ],
})
class Auth extends RcModuleV2<Deps> {
  private _loggedIn: boolean = null;
  _beforeLogoutHandlers: Set<Function> = new Set();
  _afterLoggedInHandlers: Set<() => any> = new Set();
  _unbindEvents: any = null;
  _lastEnvironmentCounter: number = 0;
  _proxyUri: string;
  _redirectUri: string;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @state
  loginStatus: string = null;

  @state
  isFreshLogin: boolean = null;

  @state
  token: Token = {};

  @action
  setLoginSuccess(token: TokenInfo) {
    this.loginStatus = loginStatus.loggedIn;
    this.token = {
      ownerId: token.owner_id,
      endpointId: token.endpoint_id,
      accessToken: token.access_token,
      expireTime: token.expire_time,
      expiresIn: token.expires_in,
      scope: token.scope,
    };
  }

  @action
  setLoginError() {
    this.loginStatus = loginStatus.notLoggedIn;
    this.token = {};
    this.isFreshLogin = null;
  }

  @action
  setLogoutSuccess() {
    this.loginStatus = loginStatus.notLoggedIn;
    this.token = {};
    this.isFreshLogin = null;
  }

  @action
  setRefreshSuccess(token: TokenInfo) {
    this.loginStatus = loginStatus.loggedIn;
    this.token = {
      ownerId: token.owner_id,
      endpointId: token.endpoint_id,
      accessToken: token.access_token,
      expireTime: token.expire_time,
      expiresIn: token.expires_in,
      scope: token.scope,
    };
  }

  @action
  setRefreshError(refreshTokenValid: boolean) {
    this.isFreshLogin = null;
    if (!refreshTokenValid) {
      this.token = {};
      this.loginStatus = loginStatus.notLoggedIn;
    }
  }

  @action
  setLogoutError() {
    this.loginStatus = loginStatus.notLoggedIn;
    this.token = {};
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
    this.token = token
      ? {
          ownerId: token.owner_id,
          endpointId: token.endpoint_id,
          accessToken: token.access_token,
          expireTime: token.expire_time,
          expiresIn: token.expires_in,
          scope: token.scope,
        }
      : {};
  }

  _bindEvents() {
    if (this._unbindEvents) this._unbindEvents();

    const platform = this._deps.client.service.platform();
    const client = this._deps.client.service._client;
    const onRequestError = (error: Error) => {
      if (error instanceof Error && error.message === 'Token revoked') {
        this.logout();
      }
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
    const onLogoutError = (error: Error) => {
      platform._cache.clean();
      this.setLogoutError();
      if (error) {
        this._deps.alert.danger({
          message: authMessages.logoutError,
          payload: error,
        });
      }
    };
    const onRefreshSuccess = async () => {
      const token: TokenInfo = await platform.auth().data();
      this.setRefreshSuccess(token);
    };
    // TODO: fix `error` type.
    const onRefreshError = async (error: any) => {
      // user is still considered logged in if the refreshToken is still valid
      const isOffline = validateIsOffline(error.message);

      const resStatus = (error.response && error.response.status) || null;
      const refreshTokenValid =
        (isOffline || resStatus >= 500) &&
        (await platform.auth().refreshTokenValid());
      this.setRefreshError(refreshTokenValid);

      if (
        !refreshTokenValid &&
        (await platform.auth().data()).access_token !== ''
      ) {
        this._deps.alert.danger({
          message: authMessages.sessionExpired,
          payload: error,
          ttl: 0,
        });
        // clean the cache so the error doesn't show again
        platform._cache.clean();
      }
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

  _shouldInit() {
    return (
      this.status === moduleStatuses.pending &&
      this._deps.locale.ready &&
      (!this._deps.tabManager || this._deps.tabManager.ready) &&
      (!this._deps.environment || this._deps.environment.ready)
    );
  }

  async onStateChange() {
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
        this._deps.tabManager.event.args[0] !== this.loggedIn
      ) {
        /* eslint { "prefer-destructuring": 0 } */
        this._loggedIn = this._deps.tabManager.event.args[0];
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

  async onInit() {
    const platform = this._deps.client.service.platform();
    this._loggedIn = await platform.loggedIn();
    this._bindEvents();
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

  async onInitSuccess() {
    await this.fetchToken();
  }

  get redirectUri() {
    return url.resolve(window.location.href, this._redirectUri);
  }

  get proxyUri() {
    return this._proxyUri;
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
  }: {
    username: string;
    password: string;
    extension: string;
    remember: boolean | number;
    code: string;
    redirectUri: string;
    accessToken: TokenInfo['access_token'];
    expiresIn: TokenInfo['expires_in'];
    endpointId: TokenInfo['endpoint_id'];
    tokenType: TokenInfo['token_type'];
    scope: TokenInfo['scope'];
  }) {
    this.setLogin();
    let ownerId: number;
    if (accessToken) {
      await this._deps.client.service.platform().auth().setData({
        token_type: tokenType,
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token_expires_in: expiresIn,
        scope,
      });
      const extensionData: GetExtensionInfoResponse = await this._deps.client
        .account()
        .extension()
        .get();
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
    });
  }

  @proxify
  async refreshToken() {
    const token = await this._deps.client.service
      .platform()
      .refresh()
      .then((response: any) => response.json());

    return token;
  }

  getLoginUrl({
    redirectUri,
    state,
    brandId,
    display,
    prompt,
    force,
    implicit = false,
  }: {
    redirectUri: string;
    state: string;
    brandId: string;
    display: string;
    prompt: string;
    force: boolean;
    implicit?: boolean;
  }) {
    // TODO: support to set redirectUri in js sdk v4 login function
    if (!this._deps.client.service.platform()._redirectUri) {
      this._deps.client.service.platform()._redirectUri = redirectUri;
    }
    return `${this._deps.client.service.platform().loginUrl({
      redirectUri,
      state,
      brandId,
      display,
      prompt,
      implicit,
      usePKCE: this.usePKCE,
    })}${force ? '&force' : ''}`;
  }

  /**
   * @description Triggers the beforeLogoutHandlers to run
   *  and then proceed to logout from ringcentral.
   */
  @proxify
  async logout({ dismissAllAlert = true } = {}) {
    if (dismissAllAlert) {
      this._deps.alert.dismissAll();
    }
    this.setBeforeLogout();
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
    } catch (error) {
      console.error(error);
      this._deps.alert.danger({
        message: authMessages.beforeLogoutError,
        payload: error,
      });
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
   * @function
   * @param {Function} handler
   * @returns {Function} return that delete handler event, call that will delete that event
   */
  addBeforeLogoutHandler(handler: Function): Function {
    this._beforeLogoutHandlers.add(handler);
    return () => {
      this.removeBeforeLogoutHandler(handler);
    };
  }

  /**
   * @function
   * @param {Function} handler
   */
  removeBeforeLogoutHandler(handler: Function) {
    this._beforeLogoutHandlers.delete(handler);
  }

  addAfterLoggedInHandler(handler: () => any) {
    this._afterLoggedInHandlers.add(handler);
    return () => {
      this._afterLoggedInHandlers.delete(handler);
    };
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
      const extensionData: GetExtensionInfoResponse = await this._deps.client
        .account()
        .extension()
        .get();
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
      platform.auth().setData(newAuthData);
      platform.emit(platform.events.refreshSuccess, newAuthData);
    } catch (error) {
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
