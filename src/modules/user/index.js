import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import { extractData, fetchList } from '../../lib/utils';
import loginStatus from '../../enums/login-status';
import userActions from './user-actions';
import getUserReducer from './user-reducer';
import Emitter from 'component-emitter';
import userEvents from '../../enums/user-events';

const symbols = new SymbolMap([
  'api',
  'auth',
  'platform',
  'emitter',
  'settings',
]);

const initialState = {
  test: true,
};

function getUserSettingsReducer(prefix) {
  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {
      default:
        return state;
    }
  };
}

async function loadInfo() {
  try {
    const [
      accountInfo,
      extensionInfo,
      dialingPlans,
      phoneNumbers,
      forwardingNumbers,
      blockedNumbers,
    ] = (await Promise.all([
      this[symbols.api].account().loadAccount(),
      this[symbols.api].extension().loadExtensionInfo(),
      this::fetchList(options => (
        this[symbols.api].account().listDialingPlans(options)
      )),
      this::fetchList(options => (
        this[symbols.api].extension().listExtensionPhoneNumbers(options)
      )),
      this::fetchList(options => (
        this[symbols.api].forwardingNumbers().listExtensionForwardingNumbers(options)
      )),
      this::fetchList(options => (
        this[symbols.api].blockedNumbers().listBlockedNumbers(options)
      )),
    ])).map(data => extractData(data));

    this.store.dispatch({
      type: this.actions.loadUserInfo,
      payload: {
        accountInfo,
        extensionInfo,
        dialingPlans,
        phoneNumbers,
        forwardingNumbers,
        blockedNumbers,
      },
    });
    this[symbols.emitter].emit(userEvents.userInfoLoaded);
  } catch (e) {
    // TODO send error out
    console.log(e);
    this[symbols.auth].logout();
  }
}

export default class User extends RcModule {
  constructor(options) {
    super({
      ...options,
      actions: userActions,
    });
    const {
      api,
      auth,
      platform,
      settings,
    } = options;
    this[symbols.api] = api;
    this[symbols.auth] = auth;
    this[symbols.platform] = platform;
    this[symbols.emitter] = new Emitter();
    this[symbols.settings] = settings;

    settings.registerReducer('user', getUserSettingsReducer());

    // load info on login
    platform.on(platform.events.loginSuccess, () => {
      this::loadInfo();
    });
    // unload info on logout
    platform.on(platform.events.logoutSuccess, () => {
      this.store.dispatch({
        type: this.actions.clearUserInfo,
      });
      this[symbols.emitter].emit(userEvents.userInfoCleared);
    });
    // load info if already logged in
    (async () => {
      if (await auth.getStatus() === loginStatus.userAccess) {
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
