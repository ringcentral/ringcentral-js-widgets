import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import Enum from '../../lib/enum';
import webphoneActions from './webphone-actions';
import callActions from './call-actions';
import getReducer from './webphone-reducer';
import RingCentralWebphone from 'ringcentral-web-phone';
import webphoneStatus from './webphone-status';
import callStatus from './call-status';

import { authEventTypes } from '../auth/auth-events';
import { webphoneEvents } from './webphone-events';

const symbols = new SymbolMap([
  'api',
  'auth',
  'platform',
  'emitter',
  'settings',
  'phoneInstance',
]);

const ENUMS = new Enum({
  webphoneStatus,
  callStatus,
});

async function initPhoneInstance() {
  const info = await this[symbols.platform]
    .post('/client-info/sip-provision', {
      sipInfo: [{ transport: 'WSS' }],
    })
    .then(res => res.json());
  return new RingCentralWebphone(info, {
    logLevel: 0,
    audioHelper: {
      enabled: true,
    },
  });
}

async function record(flag = true) {
  if (!flag) {
    await this.currentSession.stopRecord();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.stopRecord,
      },
    });
  } else {
    await this.currentSession.startRecord();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.record,
      },
    });
  }
}

async function mute(flag = true) {
  if (!flag) {
    await this.currentSession.unmute();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.unmute,
      },
    });
  } else {
    await this.currentSession.mute();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.mute,
      },
    });
  }
}

async function hold(flag = true) {
  if (!flag) {
    await this.currentSession.unhold();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.unhold,
      },
    });
  } else {
    await this.currentSession.hold();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.hold,
      },
    });
  }
}

async function park() {
  await this.currentSession.park();
  this.store.dispatch({
    type: this.actions.callOperation,
    operation: {
      type: callActions.park,
    },
  });
}

async function transfer(number) {
  this.checkSession();
  await this.currentSession.transfer(number);
  this.store.dispatch({
    type: this.actions.callOperation,
    operation: {
      type: callActions.transfer,
      payload: {
        number,
      },
    },
  });
}

async function flip(number) {
  this.checkSession();
  await this.currentSession.flip(number);
  this.store.dispatch({
    type: this.actions.callOperation,
    operation: {
      type: callActions.flip,
      payload: {
        number,
      },
    },
  });
}

async function dtmf(number) {
  this.checkSession();
  await this.currentSession.dtmf(number);
  this.store.dispatch({
    type: this.actions.callOperation,
    operation: {
      type: callActions.dtmf,
      payload: {
        number,
      },
    },
  });
}

async function operations(name, ...args) {
  const actions = { record, mute, hold, park, transfer, flip, dtmf };
  this.checkSession();
  try {
    await actions[name].call(this, ...args);
  } catch (error) {
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.error,
        error,
      },
    });
    this.emit(webphoneEvents[name]);
    // TODO: needed?
    throw error;
  }
}

export default class Webphone extends RcModule {
  constructor(options) {
    super({
      ...options,
      actions: webphoneActions,
    });
    const {
      api,
      platform,
      settings,
      auth,
    } = options;
    this[symbols.api] = api;
    this[symbols.platform] = platform;
    this[symbols.settings] = settings;
    this[symbols.auth] = auth;

    this.currentSession = null;
    this.isRegistered = false;

    // TODO: commented out until setting module completed
    // settings.registerReducer('webphone', getWebphoneReducer())
    this[symbols.auth].on(authEventTypes.loginStatusChanged, async () => {
      this[symbols.phoneInstance] = await this::initPhoneInstance();
      this[symbols.phoneInstance].userAgent.on('registered', () => {
        // sip will fire multiple registered events, only dispatch one register action to state.
        // TODO: is this isRegistered state needed to be store as instance variable
        //       or just check store state
        if (!this.isRegistered) {
          this.store.dispatch({
            type: this.actions.registerSuccess,
          });
          this.emit(webphoneEvents.registerSuccessed);
        }
        this.isRegistered = this[symbols.phoneInstance].userAgent.isRegistered();
      });
      this[symbols.phoneInstance].userAgent.on('unregistered', () => {
        this.isRegistered = this[symbols.phoneInstance].userAgent.isRegistered();
        this.store.dispatch({
          type: this.actions.unregister,
          operation: {
            type: callActions.clear,
          },
        });
      });
      this[symbols.phoneInstance].userAgent.on('registrationFailed', (error) => {
        this.store.dispatch({
          type: this.actions.registerError,
          error,
        });
        this.emit(webphoneEvents.registerFailed);
      });
      this[symbols.phoneInstance].userAgent.on('invite', (session) => {
        this.currentSession = session;
        this.listenSessionEvents();
        this.store.dispatch({
          type: this.actions.callIncoming,
          payload: {
            remoteIdentity: session.remoteIdentity,
            localIdentity: session.localIdentity,
          },
        });
        this.emit(webphoneEvents.callIncoming);
      });
    });
  }

  get reducer() {
    return getReducer(this.prefix);
  }

  get enums() {
    return ENUMS;
  }

  /**
   * Make a phone call, this method should be called in registerSuccess state
   * @param {string} toNumber
   * @param {string} [fromNumber]
   * @return {Session}
   */
  async call({ toNumber, fromNumber, media }) {
    // Check status
    if (!this[symbols.phoneInstance]) {
      throw Error('not registered');
    }
    this.store.dispatch({
      type: this.actions.call,
      payload: {
        toNumber,
        fromNumber,
      },
    });
    this.emit(webphoneEvents.callConnecting);
    this.currentSession = this[symbols.phoneInstance].userAgent.invite(toNumber, {
      media: {
        render: media,
      },
    });
    this.listenSessionEvents();
    try {
      await this.currentSession;
    } catch (error) {
      console.error(error);
      this.store.dispatch({
        type: this.actions.callError,
        error,
      });
      this.emit(webphoneEvents.callFailed);
    }
    return this.currentSession;
  }

  /**
   * Accept a phone call, this method should be called when call is incoming
   * @param {Object} media, see https://github.com/ringcentral/ringcentral-web-phone#accepting-incoming-call
   * @return {Promise}
   */
  async accept(media) {
    this.checkSession();
    try {
      await this.currentSession.accept(media);
    } catch (error) {
      // TODO
      console.error(error);
    }
  }

  async bye() {
    this.checkSession();
    try {
      await this.currentSession.terminate();
    } catch (error) {
      // TODO
      console.error(error);
    }
  }

  async record(flag) {
    operations.call(this, 'record', flag);
  }

  async mute(flag) {
    operations.call(this, 'mute', flag);
  }

  async hold(flag) {
    operations.call(this, 'hold', flag);
  }

  async park(flag) {
    operations.call(this, 'park', flag);
  }

  async transfer(number) {
    operations.call(this, 'transfer', number);
  }

  async flip(number) {
    operations.call(this, 'flip', number);
  }

  async dtmf(number) {
    operations.call(this, 'dtmf', number);
  }

  loadRingAudio({ incoming, outgoing }) {
    this[symbols.phoneInstance].userAgent.audioHelper.loadAudio({
      incoming,
      outgoing,
    });
  }

  checkSession() {
    if (!this.currentSession) {
      this.store.dispatch({
        type: this.actions.sessionError,
      });
      throw Error('No active session');
    }
  }

  /**
   * Internal method for listen session events
   */
  listenSessionEvents() {
    this.currentSession.on('accepted', (response) => {
      // accepted event for outbound call will returne a incomingResponse
      if (response.data) {
        this.store.dispatch({
          type: this.actions.callConnect,
          payload: {
            remoteIdentity: response.to,
            localIdentity: response.from,
          },
        });
      // accepted event for inbound call will only contain a raw sip data
      } else {
        this.store.dispatch({
          type: this.actions.callAccept,
        });
      }
      this.emit(webphoneEvents.callConnected);
    });
    // all situation about call terminated except 'call cancel'
    this.currentSession.on('terminated', (response, cause) => {
      this.store.dispatch({
        type: this.actions.callEnd,
        error: cause,
      });
      this.currentSession = null;
    });
    // when we call out and cancel the phone call
    this.currentSession.on('cancel', (response, cause) => {
      this.store.dispatch({
        type: this.actions.callEnd,
        error: cause,
      });
      this.currentSession = null;
    });
    // should not need
    this.currentSession.on('bye', (response) => {
      this.store.dispatch({
        type: this.actions.callEnd,
      });
      this.currentSession = null;
    });
  }
}
