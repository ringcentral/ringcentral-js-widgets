import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import { extractData, fetchList, emit } from '../../lib/utils';
import userActions from './user-actions';
import getUserReducer from './user-reducer';
import { userEvents, userEventTypes } from './user-events';

const symbols = new SymbolMap([
  'api',
  'platform',
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
 * @param {String} dataType
 * @param {function} loadFunction - async loader function returning a promise
 * @return {Promise}
 * @description Generic data loading logic with events
 */
async function loadData(dataType, loadFunction) {
  this.store.dispatch({
    type: this.actions[`load${dataType}`],
  });
  this.emit(userEvents[`load${dataType}`]);
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
    this.emit(userEvents[`load${dataType}Failed`]);
    throw error;
  }
}

/**
 * @function
 * @return {Promise<Object>}
 * @description Fetch account info and extract the data
 */
async function extractAccountInfo() {
  return extractData(await this[symbols.api].account().get());
}
async function loadAccountInfo() {
  return await this::loadData('AccountInfo', extractAccountInfo);
}

async function extractExtensionInfo() {
  return extractData(await this[symbols.api].account().extension().get());
}
async function loadExtensionInfo() {
  return await this::loadData('ExtensionInfo', extractExtensionInfo);
}

async function extractDialingPlans() {
  // TODO: js-client have dialing-plan?
  return extractData(await this::fetchList(options => (
    this[symbols.api].account().listDialingPlans(options)
  )));
}
async function loadDialingPlans() {
  return await this::loadData('DialingPlans', extractDialingPlans);
}

async function extractPhoneNumbers() {
  return extractData(await this::fetchList(options => (
    this[symbols.api].account().extension().phoneNumber().list(options)
  )));
}
async function loadPhoneNumbers() {
  return await this::loadData('PhoneNumbers', extractPhoneNumbers);
}

async function extractForwardingNumbers() {
  return extractData(await this::fetchList(options => (
    this[symbols.api].account().extension().forwardingNumber().list()
  )));
}
async function loadForwardingNumbers() {
  return await this::loadData('ForwardingNumbers', extractForwardingNumbers);
}

async function extractBlockedNumbers() {
  return extractData(await this::fetchList(options => (
    this[symbols.api].account().extension().blockedNumber().list(options)
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
      // this::loadDialingPlans(),
      this::loadPhoneNumbers(),
      this::loadForwardingNumbers(),
      this::loadBlockedNumbers(),
    ]);
    // this.emit(userEvents.userInfoLoaded);
  } catch (e) {
    // TODO send error out
    console.error(e);
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
    this[symbols.settings] = settings;

    // settings.registerReducer('user', getUserSettingsReducer());

    // load info on login
    platform.on(platform.events.loginSuccess, () => {
      this::loadInfo();
    });
    // unload info on logout
    platform.on(platform.events.logoutSuccess, () => {
      this.store.dispatch({
        type: this.actions.clearUserInfo,
      });
      // this.emit(userEvents.userInfoCleared);
    });


    // load info if already logged in
    (async () => {
      if (await platform.loggedIn()) {
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

  get events() {
    return userEvents;
  }

  get eventTypes() {
    return userEventTypes;
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
