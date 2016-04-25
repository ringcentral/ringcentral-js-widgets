import Sdk from './modules/sdk';
import Subscription from './modules/subscription';
import Brand from './modules/brand';
import Api from './modules/api';
import Auth from './modules/auth';

const SDK = Symbol();
const SUBSCRIPTION = Symbol();
const BRAND = Symbol();
const API = Symbol();
const AUTH = Symbol();


/**
 * @class RcPhone
 * RingCentral phone class, provide feature complete ringcentral phone without UI.
 */
export default class RcPhone {
  constructor({
    sdkInstance,
    sdkSettings,
    sdkProvider = Sdk,
    storage,
    brandSettings, //TODO: should we default to rcus?
    brandProvider = Brand,
    authProvider = Auth,
  }) {

    if(!sdkInstance) {
      if(!sdkSettings) {
        throw new Error('no sdk settings found...');
      }
      sdkInstance = new sdkProvider({
        ...sdkSettings,
        storage
      });
    }
    this[SDK] = sdkInstance;

    this[BRAND] = new brandProvider(brandSettings);

    this[AUTH] = new authProvider({
      platform: this[SDK].base.platform(),
      brand: this[BRAND]
    });

    this[API] = new Api({
      platform: this[SDK].base.platform(),
      auth: this[AUTH]
    });

    this[SUBSCRIPTION] = new Subscription({
      sdk: this[SDK],
      auth: this[AUTH],
    });

  }

  get sdk() {
    return this[SDK];
  }

  get brand() {
    return this[BRAND];
  }

  get auth() {
    return this[AUTH];
  }

  get platform() {
    return this[PLATFORM];
  }

  get cache() {
    this[SDK].base._cache;
  }

  get contact() {

  }


  get conference() {

  }

  get meeting() {

  }

  get message() {

  }

  get subscription() {
    return this[SUBSCRIPTION];
  }



}
