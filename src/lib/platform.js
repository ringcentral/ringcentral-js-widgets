import Wrapper from './wrapper';

const BRAND = Symbol();
const AUTH = Symbol();

async function getPublicToken() {

}

export default class Platform extends Wrapper {
  constructor({
    sdk,
    brand,
    auth,
  }) {
    super(sdk.base.platform());


    this[BRAND] = brand;
    this[AUTH] = auth;

  }



  async parseNumber() {
    await this[AUTH].loggedIn();
  }

}
