import addModule from './lib/add-module';
import RingCentral from 'ringcentral';
import RingCentralClient from 'ringcentral-client';

import RcModule from './lib/rc-module';

import Settings from './modules/settings';
import Brand from './modules/brand';
import User from './modules/user';
import Webphone from './modules/webphone';
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

    this::addModule('user', new User({
      registerStoreHandler: register,
      stateMapper: (state) => state.user,
      prefix,
      api: this.api,
      platform: this.platform,
      settings: this.settings,
    }));

    this::addModule('webphone', new Webphone({
      registerStoreHandler: register,
      stateMapper: (state) => state.webphone,
      prefix,
      api: this.api,
      platform: this.platform,
      settings: this.settings,
    }));

    // combine reducers
    this[REDUCER] = combineReducers({
      defaultBrand: this.defaultBrand.reducer,
      user: this.user.reducer,
      webphone: this.webphone.reducer,
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
