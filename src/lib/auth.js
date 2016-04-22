import Wrapper from './wrapper';

const BRAND = Symbol();
const SDK = Symbol();
const PLATFORM = Symbol();


export default class Auth extends Wrapper {
  constructor({
    brand,
    sdk,
  }) {
    super(sdk.base.platform().auth());

    this[BRAND] = brand;
    this[SDK] = sdk;
    /**
     * Platform module should depend on auth module to ensure logged-in status.
     * To avoid circular dependency, auth will use the underlying platform object from sdk instead.
     */
    this[PLATFORM] = sdk.base.platform();
  }


  async requestClientCredential() {
    let resp = await this[PLATFORM]._tokenRequest('/restapi/oauth/token', {
      'grant_type': 'client_credentials',
      'brand_id': this[BRAND].id
    });
    this.base.setData(resp.json());
  }
  async login() {
  }
  async logout() {
  }
  async loggedIn() {
    return this[PLATFORM].loggedIn();
  }
}
