import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import Enum from '../../lib/enum';
import loginStatus from './login-status';
import authActions from './auth-actions';
import getAuthReducer from './auth-reducer';
import { authEvents, authEventTypes } from './auth-events';
import { emit } from '../../lib/utils';


const symbols = new SymbolMap([
  'platform',
  'emitter',
  'beforeLogoutHandlers',
]);

const ENUMS = new Enum({
  loginStatus,
});


/**
 * @class
 * @description Authentication module
 */
export default class Auth extends RcModule {
  /**
   * @function
   */
  constructor(options) {
    super({
      ...options,
      actions: authActions,
    });
    const {
      platform,
    } = options;

    this[symbols.platform] = platform;
    this[symbols.beforeLogoutHandlers] = new Set();

    // load info on login
    platform.on(platform.events.loginSuccess, () => {
      this.store.dispatch({
        type: this.actions.loginSuccess,
      });
      this::emit(authEventTypes.loginStatusChanged, this.state.status);
    });
    // loginError
    platform.on(platform.events.loginError, error => {
      this.store.dispatch({
        type: this.actions.loginError,
        error,
      });
    });
    // unload info on logout
    platform.on(platform.events.logoutSuccess, () => {
      this.store.dispatch({
        type: this.actions.logoutSuccess,
      });
      // this.emit(authEvents.userInfoCleared);
    });

    platform.on(platform.events.logoutError, error => {
      this.store.dispatch({
        type: this.actions.logoutError,
        error,
      });
    });

    platform.on(platform.events.refreshError, error => {
      this.store.dispatch({
        type: this.actions.refreshError,
        error,
      });
    });

    // load info if already logged in
    (async () => {
      const loggedIn = await platform.loggedIn();
      this.store.dispatch({
        type: this.actions.init,
        status: loggedIn ? loginStatus.loggedIn : loginStatus.notLoggedIn,
      });
      this.emit(authEventTypes.loginStatusChanged, this.state.status);
    })();
  }

  get reducer() {
    return getAuthReducer(this.prefix);
  }
  /**
   * @function
   * @async
   * @description Login function using username and password
   */
  async login({ username, password, extension, remember }) {
    this.store.dispatch({
      type: this.actions.login,
      payload: {
        username,
        password,
        extension,
        remember,
      },
    });
    this::emit(authEventTypes.loginStatusChanged, authEvents.loggingIn);
    return await this[symbols.platform].login({
      username,
      password,
      extension,
      remember,
    });
  }

  /**
   * @function
   * @description get OAuth page url
   */
  loginUrl({ redirectUri, state, brandId, display, prompt }) {
    return this[symbols.platform].loginUrl({
      redirectUri,
      state,
      brandId,
      display,
      prompt,
    });
  }

  /**
   * @function
   * @param {string} url
   * @return {Object}
   */
  parseLoginUrl(url) {
    return this[symbols.platform].parseLoginRedirectUrl(url);
  }

  /**
   * @function
   * @async
   * @description Authorize using OAauth code
   */
  async authorize({ code, redirectUri }) {
    this.store.dispatch({
      type: this.actions.login,
      payload: {
        code,
        redirectUri,
      },
    });
    this::emit(authEventTypes.loginStatusChanged, authEvents.loggingIn);
    return await this[symbols.platform].login({
      code,
      redirectUri,
    });
  }

  /**
   * @function
   * @async
   * @description Log the user out
   */
  async logout() {
    // deal with removing subscriptions

    this::emit(authEventTypes.loginStatusChanged, authEvents.loggingOut);
    const handlers = [...this[symbols.beforeLogoutHandlers]];
    for (const handler of handlers) {
      try {
        // wraps with async so even normal functions can be awaited
        // TODO cancel logout if handler resolves to false
        await (async () => handler())();
      } catch (e) {
        // TODO: should emit error
      }
    }
    return await this[symbols.platform].logout();
  }
  /**
   * @function
   * @param {Function} handler
   * @returns {Function}
   */
  addBeforeLogoutHandler(handler) {
    this[symbols.beforeLogoutHandlers].add(handler);
    return () => {
      this[symbols.beforeLogoutHandlers].remove(handler);
    };
  }
  /**
   * @function
   * @param {Function} handler
   */
  removeBeforeLogoutHandler(handler) {
    this[symbols.beforeLogoutHandlers].remove(handler);
  }

  get status() {
    return this.state.status;
  }

  get events() {
    return authEvents;
  }

  get eventTypes() {
    return authEventTypes;
  }

  get enums() {
    return ENUMS;
  }

  async isLoggedIn() {
    return await this[symbols.platform].loggedIn();
  }
}
