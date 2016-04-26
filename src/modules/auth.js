import Wrapper from '../lib/wrapper';
import loginStatus from '../enums/login-status';

const BRAND = Symbol();
const PLATFORM = Symbol();
const IS_USER = Symbol();

export default class Auth extends Wrapper {
  constructor({
    platform,
    brand,
  }) {
    super(platform.auth());

    this[BRAND] = brand;
    this[PLATFORM] = platform;
    this[IS_USER] = false;
  }


  async requestClientCredential() {
    if (await this.getLoggedInStatus() === loginStatus.userLoggedIn) {
      throw new Error('user logged in');
    }
    const resp = await this[PLATFORM]._tokenRequest('/restapi/oauth/token', {
      grant_type: 'client_credentials',
      brand_id: this[BRAND].id,
    });
    this.base.setData(resp.json());
  }

  /**
   * @param {string} options.username
   * @param {string} options.password
   * @param {string} options.extension
   */
  async login(options) {
    if (await this.getLoggedInStatus() === loginStatus.userLoggedIn) {
      throw new Error('Already logged in');
    }
    await this[PLATFORM].login(options);
    this[IS_USER] = true;
  }

  async authorize(authCode) {

  }

  async logout() {
    // TODO: verify what to do if logout fails
    await this[PLATFORM].logout();
    this[IS_USER] = false;
  }

  async getLoggedInStatus() {
    if (await this[PLATFORM].loggedIn()) {
      return this[IS_USER] ?
        loginStatus.userLoggedIn :
        loginStatus.hasPublicToken;
    }
    return loginStatus.notLoggedIn;
  }

}
