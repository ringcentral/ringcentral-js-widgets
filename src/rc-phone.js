import addModule from './lib/add-module';
import RingCentral from 'ringcentral';
import RingCentralClient from 'ringcentral-client';

import RcModule from './lib/rc-module';

import Settings from './modules/settings';
import Brand from './modules/brand';
import Auth from './modules/auth';
import User from './modules/user';

import { combineReducers, createStore } from 'redux';

const REDUCER = Symbol();

function getStoreRegisterAndResolver() {
  const handlers = new Set();
  return [
    (fn) => handlers.add(fn),
    (store) => handlers.forEach(fn => fn(store)),
  ];
}

export default class RcPhone extends RcModule {
  constructor({
    registerStoreHandler,
    stateMapper,
    prefix = 'rc',
    sdkSettings,
    defaultBrand,
  }) {
    let register = registerStoreHandler;
    let resolve;
    if (!register) {
      [register, resolve] = getStoreRegisterAndResolver();
    }

    super({
      registerStoreHandler: register,
      stateMapper,
    });

    this::addModule('sdk', new RingCentral({

      cachePrefix: `${prefix}-`,
      ...sdkSettings,
    }));

    this::addModule('platform', this.sdk.platform());

    this::addModule('api', new RingCentralClient(this.sdk));

    this::addModule('settings', new Settings({
      registerStoreHandler: register,
      stateMapper: (state) => state.settings,
    }));

    this::addModule('defaultBrand', new Brand({
      registerStoreHandler: register,
      prefix: `${prefix}-default`,
      stateMapper: (state) => state.defaultBrand,
      ...defaultBrand,
    }));
    this::addModule('auth', new Auth({
      registerStoreHandler: register,
      stateMapper: (state) => state.auth,
      prefix,
      defaultBrand: this.defaultBrand,
      platform: this.platform,
    }));

    this::addModule('user', new User({
      registerStoreHandler: register,
      stateMapper: (state) => state.user,
      prefix,
      api: this.api,
      auth: this.auth,
      platform: this.platform,
      settings: this.settings,
    }));

    // combine reducers
    this[REDUCER] = combineReducers({
      defaultBrand: this.defaultBrand.reducer,
      auth: this.auth.reducer,
      user: this.user.reducer,
      settings: this.settings.reducer,
    });

    if (resolve) {
      resolve(createStore(this.reducer));
    }
  }
  get reducer() {
    return this[REDUCER];
  }
}



















/**
 * @class RcPhone
 * Default RingCentral phone class, provide feature complete ringcentral phone without UI.
 * Application builders can directly use RcBase and build their own phone class if they need
 * different sets of modules.
 */
// export default class RcPhone extends RcBase {
//   constructor({
//     sdkSettings: {
//       appKey,
//       appSecret,
//       cachePrefix = 'rc',
//       server,
//     },
//     brandSettings, // TODO: should we default to rcus?
//   }) {
//     super();

//     this.addModule('sdk', new RingCentral({
//       appKey,
//       appSecret,
//       cachePrefix: `${cachePrefix}`,
//       server,
//     }));

//     const client = new RingCentralClient(this.sdk);
//     this.addModule('client', client);

//     this.addModule('brand', new Brand(brandSettings));
//     this.addModule('auth', new Auth({
//       ...this,
//       platform: this.sdk.platform(),
//     }));
//   }
// }
