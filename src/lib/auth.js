import Wrapper from './wrapper';

const BRAND = Symbol();
const PLATFORM = Symbol();

export default class Auth extends Wrapper {
  constructor({
    platform,
    brand
  }) {
    super(platform.auth());

    this[BRAND] = brand;
    this[PLATFORM] = platform;
    this._isLoginWithClientCredential = false;
  }

  async requestClientCredential() {
    let loggedIn = await this[PLATFORM].loggedIn();
    if(loggedIn) {
      if(this._isLoginWithClientCredential) {
        if(!this.base.accessTokenValid()) {
          await this._getClientCredential();
        }
      }else {
        //already login with extension. Throw exception here
      }
    }else{
      await this._getClientCredential();
      this._isLoginWithClientCredential = true;
    } 
  }
  
  /**
   * @param {string} options.username
   * @param {string} options.password
   * @param {string} options.extension
   */
  async login(options) {
    let loggedIn = await this[PLATFORM].loggedIn();
    if(loggedIn) {
      if(this._isLoginWithClientCredential) {
        await this._login(options);
      }
    }else {
      await this._login(options);
    }
  }
  
  async authorize(authCode) {
    
  }
  
  async logout() {
    await this[PLATFORM].logout();
    this._isLoginWithClientCredential = false;
  }
  
  async getLoggedInStatus() {
    let loggedIn = await this[PLATFORM].loggedIn();
    if(loggedIn) {
      if(this._isLoginWithClientCredential) {
        return 'loggedInWithClientCredential';
      }else {
        return 'loggedIn'
      }
    }else {
      return 'notLoggedIn'
    }
  }
  
  async _getClientCredential() {
    let resp = await this[PLATFORM]._tokenRequest('/restapi/oauth/token', {
      'grant_type': 'client_credentials',
      'brand_id': this[BRAND].id
    });
    this.base.setData(resp.json());
  }
  
  async _login(options) {
    let result = await this[PLATFORM].login(options);
    this._isLoginWithClientCredential = false;
  }
}
