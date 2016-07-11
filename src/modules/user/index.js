import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import { extractData, fetchList } from '../../lib/utils';
import loginStatus from '../../enums/login-status';
import userActions from './user-actions';
import getUserReducer from './user-reducer';
import Emitter from 'component-emitter';
import { userEvents, userEventTypes } from './user-events';

const symbols = new SymbolMap([
  'api',
  'platform',
  'emitter',
  'settings',
]);

// const initialState = {
//   test: true,
// };

// function getUserSettingsReducer(prefix) {
//   return (state, action) => {
//     if (typeof state === 'undefined') return Object.assign({}, initialState);
//     if (!action) return state;
//     switch (action.type) {
//       default:
//         return state;
//     }
//   };
// }

/**
 * @function
 * @param {String} eventType
 * @param {String} event
 * @description Helper function to emit eventTyped events and the event itself
 */
function emit(eventType, event, ...payloads) {
  this[symbols.emitter].emit(event, ...payloads);
  this[symbols.emitter].emit(eventType, event, ...payloads);
}

/**
 * @function
 * @param {String} dataType
 * @param {function} loadFunction - async loader function returning a promise
 * @return {Promise}
 * @description Generic data loading logic with events
 */
async function loadData(dataType, loadFunction) {
  this.store.dispatch({
    type: this.actions[`load${dataType}`],
  });
  this[symbols.emitter].emit(userEvents[`load${dataType}`]);
  try {
    const payload = await this::loadFunction();
    this.store.dispatch({
      type: this.actions[`load${dataType}Success`],
      payload,
    });
    this::emit(userEventTypes.userInfoChanged, userEvents[`load${dataType}Success`]);
  } catch (error) {
    this.store.dispatch({
      type: this.actions[`load${dataType}Failed`],
    });
    this[symbols.emitter].emit(userEvents[`load${dataType}Failed`]);
    throw error;
  }
}

/**
 * @function
 * @return {Promise<Object>}
 * @description Fetch account info and extract the data
 */
async function extractAccountInfo() {
  return extractData(await this[symbols.api].account().loadAccount());
}
async function loadAccountInfo() {
  return await this::loadData('AccountInfo', extractAccountInfo);
}

async function extractExtensionInfo() {
  return extractData(await this[symbols.api].extension().loadExtensionInfo());
}
async function loadExtensionInfo() {
  return await this::loadData('ExtensionInfo', extractExtensionInfo);
}

async function extractDialingPlans() {
  return extractData(await this::fetchList(options => (
    this[symbols.api].account().listDialingPlans(options)
  )));
}
async function loadDialingPlans() {
  return await this::loadData('DialingPlans', extractDialingPlans);
}

async function extractPhoneNumbers() {
  return extractData(await this::fetchList(options => (
    this[symbols.api].extension().listExtensionPhoneNumbers(options)
  )));
}
async function loadPhoneNumbers() {
  return await this::loadData('PhoneNumbers', extractPhoneNumbers);
}

async function extractForwardingNumbers() {
  return extractData(await this::fetchList(options => (
    this[symbols.api].forwardingNumbers().listExtensionForwardingNumbers(options)
  )));
}
async function loadForwardingNumbers() {
  return await this::loadData('ForwardingNumbers', extractForwardingNumbers);
}

async function extractBlockedNumbers() {
  return extractData(await this::fetchList(options => (
    this[symbols.api].blockedNumbers().listBlockedNumbers(options)
  )));
}
async function loadBlockedNumbers() {
  return await this::loadData('BlockedNumbers', extractBlockedNumbers);
}

/**
 * @function
 * @return {Promise}
 */
async function loadInfo() {
  try {
    await Promise.all([
      this::loadAccountInfo(),
      this::loadExtensionInfo(),
      this::loadDialingPlans(),
      this::loadPhoneNumbers(),
      this::loadForwardingNumbers(),
      this::loadBlockedNumbers(),
    ]);
    // this[symbols.emitter].emit(userEvents.userInfoLoaded);
  } catch (e) {
    // TODO send error out
    console.log(e);
  }
}

/**
 * @class User
 * @extends RcModule
 * @default
 * @export
 */
export default class User extends RcModule {
  /**
   * @function
   * @param {Object} options
   */
  constructor(options) {
    super({
      ...options,
      actions: userActions,
    });
    const {
      api,
      platform,
      settings,
    } = options;
    this[symbols.api] = api;
    this[symbols.platform] = platform;
    this[symbols.emitter] = new Emitter();
    this[symbols.settings] = settings;

    // settings.registerReducer('user', getUserSettingsReducer());


    // load info on login
    platform.on(platform.events.loginSuccess, () => {
      this.store.dispatch({
        type: this.actions.loginSuccess,
      });
      this::emit(userEventTypes.loginStatusChanged, this.state.status);
      this::loadInfo();
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
      // this[symbols.emitter].emit(userEvents.userInfoCleared);
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
      this[symbols.emitter].emit(userEventTypes.userEventTypes, this.state.status);
      if (loggedIn) {
        await this::loadInfo();
      }
    })();

    /**
     * TODO:
     *   1. Dialing Plan Checking
     */
  }
  get reducer() {
    return getUserReducer(this.prefix);
  }

  on(event, handler) {
    this[symbols.emitter].on(event, handler);
    return () => {
      this.off(event, handler);
    };
  }
  off(event, handler) {
    this[symbols.emitter].off(event, handler);
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
    this::emit(userEventTypes.loginStatusChanged, userEvents.loggingIn);
    return await this[symbols.platform].login({
      username,
      password,
      extension,
      remember,
    });
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
    this::emit(userEventTypes.loginStatusChanged, userEvents.loggingIn);
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

    this::emit(userEventTypes.loginStatusChanged, userEvents.loggingOut);
    return await this[symbols.platform].logout();
  }

  get status() {
    return this.state.status;
  }

  get events() {
    return userEvents;
  }

  get eventTypes() {
    return userEventTypes;
  }

  async isLoggedIn() {
    return await this[symbols.platform].loggedIn();
  }

  get directNumbers() {
    return this.state.phoneNumbers.filter(n => n.usageType === 'DirectNumber');
  }

  get mainCompanyNumber() {
    return this.state.phoneNumbers.find(n => n.usageType === 'MainCompanyNumber');
  }

  get dialingPlans() {
    return this.state.dialingPlans;
  }

  get extensionNumber() {
    return this.state.extensionInfo.extensionNumber;
  }

  get smsNumbers() {
    return this.state.phoneNumbers.filter(n => n.features.indexOf('SmsSender') > -1);
  }

}
