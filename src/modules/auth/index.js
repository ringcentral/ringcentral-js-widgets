import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';

import loginStatus from '../../enums/login-status';
import authActions from './auth-actions';
import getReducer from './auth-reducer';

const symbols = new SymbolMap([
  'defaultBrand',
  'platform',
  'handlers',
]);

export default class Auth extends RcModule {
  constructor({
    registerStoreHandler,
    stateMapper,
    prefix,
    defaultBrand,
    platform,
  }) {
    super({
      registerStoreHandler,
      stateMapper,
      prefix,
      actions: authActions,
    });
    this[symbols.defaultBrand] = defaultBrand;
    this[symbols.platform] = platform;
    this[symbols.handlers] = new Map();

    platform.on(platform.events.loginSuccess, () => {
      this.store.dispatch({
        type: this.actions.loginSuccess,
      });
    });
    platform.on(platform.events.loginError, error => {
      this.store.dispatch({
        type: this.actions.loginError,
        error,
      });
    });
    platform.on(platform.events.logoutSuccess, () => {
      this.store.dispatch({
        type: this.actions.logoutSuccess,
      });
    });
    platform.on(platform.events.refreshError, error => {
      this.store.dispatch({
        type: this.actions.refreshError,
        error,
      });
    });

    platform.loggedIn().then((status) => {
      this.store.dispatch({
        type: this.actions.initAuth,
        status: status ? loginStatus.userAccess : loginStatus.notLoggedIn,
      });
    });
  }

  get reducer() {
    return getReducer({
      status: loginStatus.pending,
      error: null,
    }, this.prefix);
  }
  /**
   * @function ensureClientCredential
   * @description ensure that a valid token with at least client credential access is obtained
   * @return {Promise}
   * */
  // async ensureClientAccess() {
  //   // if (await this.getLoggedInStatus() === loginStatus.notLoggedIn) {
  //   const resp = await this[symbols.platform]._tokenRequest('/restapi/oauth/token', {
  //     grant_type: 'client_credentials',
  //     brand_id: this[symbols.defaultBrand].id,
  //   });
  //   this[symbols.platform].auth().setData(resp.json());
  //   // }
  // }

  /**
   * @typedef LoginOptions
   * @type Object
   * @property {string} username
   * @property {string} password
   * @property {string} extension
   * @property {boolean} remember
   */

  /**
   * @function
   * @description async login function
   * @param {LoginOptions} options
   * @return {Promise}
   */
  async login({ username, password, extension, remember }) {
    // dispatch a login action to change status to userAccessPending
    this.store.dispatch({
      type: this.actions.login,
      payload: {
        username,
        password,
        extension,
        remember,
      },
    });
    await this[symbols.platform].login({
      username,
      password,
      extension,
      remember,
    });
  }

  async logout() {
    await this[symbols.platform].logout();
  }

  async getStatus() {
    await this[symbols.platform].loggedIn();
    return this.state.status;
  }


}
