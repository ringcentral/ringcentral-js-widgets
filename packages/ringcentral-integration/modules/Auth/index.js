import url from 'url';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import getAuthReducer from './getAuthReducer';
import actionTypes from './actionTypes';
import loginStatus from './loginStatus';
import authMessages from './authMessages';
import moduleStatuses from '../../enums/moduleStatuses';
import ensureExist from '../../lib/ensureExist';
import proxify from '../../lib/proxy/proxify';

/**
 * @class
 * @description Authentication module
 */
@Module({
  deps: [
    'Client',
    'Alert',
    'Brand',
    'Locale',
    { dep: 'TabManager', optional: true },
    { dep: 'Environment', optional: true },
    { dep: 'AuthOptions', optional: true }
  ]
})
export default class Auth extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Alert} params.alert - alert module instance
   * @param {Brand} params.brand - brand module instance
   * @param {Locale} params.locale - locale module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {environment} params.Environment - environment module instance
   * @param {String} params.redirectUri - redirect uri
   * @param {String} params.proxyUri - proxyUri module instance
   * @param {Number} params.defaultProxyRetry - default proxy retry time 5000
   */
  constructor({
    client,
    alert,
    brand,
    locale,
    tabManager,
    environment,
    ...options
  } = {}) {
    super({
      ...options,
      actionTypes,
    });
    this._client = ensureExist(client, 'client');
    this._alert = ensureExist(alert, 'alert');
    this._brand = ensureExist(brand, 'brand');
    this._locale = ensureExist(locale, 'locale');
    this._tabManager = tabManager;
    this._environment = environment;
    this._reducer = getAuthReducer(this.actionTypes);
    this._beforeLogoutHandlers = new Set();
    this._afterLoggedInHandlers = new Set();
    this._proxyFrame = null;
    this._proxyFrameLoaded = false;
    this._unbindEvents = null;
    this._lastEnvironmentCounter = 0;
  }
  _bindEvents() {
    if (this._unbindEvents) this._unbindEvents();

    const platform = this._client.service.platform();
    const client = this._client.service._client;
    const onRequestError = (apiResponse) => {
      if (
        apiResponse instanceof Error &&
        apiResponse.message === 'Roken revoked'
      ) {
        this.logout();
      }
    };

    const onLoginSuccess = async () => {
      this.store.dispatch({
        type: this.actionTypes.loginSuccess,
        token: platform.auth().data(),
      });
      const handlers = [...this._afterLoggedInHandlers];
      for (const handler of handlers) {
        await (async () => handler())();
      }
    };
    const onLoginError = (error) => {
      this.store.dispatch({
        type: this.actionTypes.loginError,
        error,
      });
      if (error) {
        this._alert.danger({
          message: authMessages.loginError,
          payload: error,
        });
      }
    };
    const onLogoutSuccess = () => {
      this.store.dispatch({
        type: this.actionTypes.logoutSuccess,
      });
    };
    const onLogoutError = (error) => {
      platform._cache.clean();
      this.store.dispatch({
        type: this.actionTypes.logoutError,
        error,
      });
      if (error) {
        this._alert.danger({
          message: authMessages.logoutError,
          payload: error,
        });
      }
    };
    const onRefreshSuccess = () => {
      this.store.dispatch({
        type: this.actionTypes.refreshSuccess,
        token: platform.auth().data(),
      });
    };
    const onRefreshError = (error) => {
      // user is still considered logged in if the refreshToken is still valid

      const refreshTokenValid = error.message === 'Failed to fetch' && platform.auth().refreshTokenValid();
      this.store.dispatch({
        type: this.actionTypes.refreshError,
        error,
        refreshTokenValid,
      });
      if (!refreshTokenValid && this._client.service.platform().auth().data().access_token !== '') {
        this._alert.danger({
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
  initialize() {
    let loggedIn;
    this.store.subscribe(async () => {
      if (
        this.status === moduleStatuses.pending &&
        this._locale.ready &&
        (!this._tabManager || this._tabManager.ready) &&
        (!this._environment || this._environment.ready)
      ) {
        this.store.dispatch({
          type: this.actionTypes.init,
        });
        const platform = this._client.service.platform();
        loggedIn = await platform.loggedIn();
        this._bindEvents();
        this.store.dispatch({
          type: this.actionTypes.initSuccess,
          loggedIn,
          token: loggedIn ? platform.auth().data() : null,
        });
      }
      if (
        (this._tabManager && this._tabManager.ready) &&
        this.ready
      ) {
        if (
          (loggedIn && this.loginStatus === loginStatus.notLoggedIn) ||
          (!loggedIn && this.loginStatus === loginStatus.loggedIn)
        ) {
          loggedIn = !loggedIn;
          this._tabManager.send('loginStatusChange', loggedIn);
        } else if (
          this._tabManager.event &&
          this._tabManager.event.name === 'loginStatusChange' &&
          this._tabManager.event.args[0] !== loggedIn
        ) {
          /* eslint { "prefer-destructuring": 0 } */
          loggedIn = this._tabManager.event.args[0];
          this.store.dispatch({
            type: this.actionTypes.tabSync,
            loggedIn,
            token: loggedIn ? this._client.service.platform().auth().data() : null,
          });
        }
      }
      if (
        this.ready &&
        this._environment &&
        this._environment.changeCounter !== this._lastEnvironmentCounter
      ) {
        this._lastEnvironmentCounter = this._environment.changeCounter;
        this._bindEvents();
      }
    });
  }

  get redirectUri() {
    return url.resolve(window.location.href, this._redirectUri);
  }

  get proxyUri() {
    return this._proxyUri;
  }

  get token() {
    return this.state.token;
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

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get loginStatus() {
    return this.state.loginStatus;
  }

  get isFreshLogin() {
    return this.state.freshLogin;
  }

  /**
   * @function
   * @param {String} options.username
   * @param {String} options.password
   * @param {String} options.extension
   * @param {Booleal|Number} options.remember
   * @param {String} params.code,
   * @param {String} params.redirectUri,
   * @return {Promise}
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
    tokenType
  }) {
    this.store.dispatch({
      type: this.actionTypes.login,
    });
    let ownerId;
    if (accessToken) {
      this._client.service.platform().auth().setData({
        token_type: tokenType,
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token_expires_in: expiresIn,
      });
      const extensionData = await this._client.account().extension().get();
      ownerId = extensionData.id;
    }
    return this._client.service.platform().login({
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
  /**
   * @function
   * @param {String} options.redirectUri
   * @param {String} options.brandId
   * @param {Boolean} options.force
   * @param {Boolean} options.implicit
   * @return {String}
   * @description get OAuth page url
   */
  getLoginUrl({
    redirectUri, state, brandId, display, prompt, force, implicit = false
  }) {
    return `${this._client.service.platform().loginUrl({
      redirectUri,
      state,
      brandId,
      display,
      prompt,
      implicit,
    })}${force ? '&force' : ''}`;
  }

  /**
   * @function
   * @description Triggers the beforeLogoutHandlers to run
   *  and then proceed to logout from ringcentral.
   */
  @proxify
  async logout() {
    this._alert.dismissAll();
    this.store.dispatch({
      type: this.actionTypes.beforeLogout,
    });
    const handlers = [...this._beforeLogoutHandlers];
    try {
      for (const handler of handlers) {
        const result = await (async () => handler())();
        if (result) {
          this.store.dispatch({
            type: this.actionTypes.cancelLogout,
          });
          return Promise.reject(result);
        }
      }
    } catch (error) {
      this._alert.danger({
        message: authMessages.beforeLogoutError,
        payload: error,
      });
    }
    this.store.dispatch({
      type: this.actionTypes.logout,
    });
    if (this.isImplicit) {
      this._client.service.platform()._cache.clean();
      this.store.dispatch({
        type: this.actionTypes.logoutSuccess,
      });
      return null;
    }
    return this._client.service.platform().logout();
  }

  /**
  * @function
  * @param {Function} handler
  * @returns {Function}
  */
  addBeforeLogoutHandler(handler) {
    this._beforeLogoutHandlers.add(handler);
    return () => {
      this.removeBeforeLogoutHandler(handler);
    };
  }

  /**
  * @function
  * @param {Function} handler
  */
  removeBeforeLogoutHandler(handler) {
    this._beforeLogoutHandlers.remove(handler);
  }

  addAfterLoggedInHandler(handler) {
    this._afterLoggedInHandlers.add(handler);
    return () => {
      this._afterLoggedInHandlers.remove(handler);
    };
  }

  @proxify
  async refreshImplicitToken({
    tokenType,
    accessToken,
    expiresIn,
    endpointId,
  }) {
    try {
      const extensionData = await this._client.account().extension().get();
      const ownerId = extensionData.id;
      if (ownerId !== this.ownerId) {
        return;
      }
      const platform = this._client.service.platform();
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
    await this._client.service.platform().loggedIn();
    return this.state.loginStatus === loginStatus.loggedIn;
  }

  get loggedIn() {
    return this.state.loginStatus === loginStatus.loggedIn ||
      this.state.loginStatus === loginStatus.beforeLogout;
  }

  get notLoggedIn() {
    return this.state.loginStatus === loginStatus.notLoggedIn;
  }

  get isImplicit() {
    return !(
      this._client.service.platform()._appSecret &&
      this._client.service.platform()._appSecret.length > 0
    );
  }
}
