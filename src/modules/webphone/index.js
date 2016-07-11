import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import webphoneActions from './webphone-actions';
import callActions from './call-actions';
import getReducer from './webphone-reducer';
import Emitter from 'component-emitter';
import RingCentralWebphone from 'ringcentral-web-phone';
import webphoneStatus from '../../enums/webphone-status';
import callStatus from '../../enums/call-status';

const symbols = new SymbolMap([
  'api',
  'platform',
  'emitter',
  'settings',
  'phoneInstance',
]);

async function initPhoneInstance() {
  const info = await this[symbols.platform]
    .post('/client-info/sip-provision', {
      sipInfo: [{ transport: 'WSS' }],
    })
    .then(res => res.json());
  return new RingCentralWebphone(info, {
    logLevel: 0,
    audioHelper: {
      enabled: false,
    },
  });
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
    } = options;
    this[symbols.api] = api;
    this[symbols.platform] = platform;
    this[symbols.emitter] = new Emitter();
    this[symbols.settings] = settings;

    this.currentSession = null;
    this.isRegistered = false;

    // TODO: commented out until setting module completed
    // settings.registerReducer('webphone', getWebphoneReducer())

    platform.on(platform.events.loginSuccess, async () => {
      this[symbols.phoneInstance] = await this::initPhoneInstance();
      this[symbols.phoneInstance].userAgent.on('registered', () => {
        // sip will fire multiple registered events, only dispatch one register action to state.
        // TODO: is this isRegistered state needed to be store as instance variable
        //       or just check store state
        if (!this.isRegistered) {
          this.store.dispatch({
            type: this.actions.registerSuccess,
          });
        }
        this.isRegistered = this[symbols.phoneInstance].userAgent.isRegistered();
      });
      this[symbols.phoneInstance].userAgent.on('unregistered', () => {
        // TODO: we are not changing store state after unregister for now.
        this.isRegistered = this[symbols.phoneInstance].userAgent.isRegistered();
      });
      this[symbols.phoneInstance].userAgent.on('registrationFailed', (error) => {
        this.store.dispatch({
          type: this.actions.registerError,
          error,
        });
      });
      this[symbols.phoneInstance].userAgent.on('invite', (session) => {
        this.currentSession = session;
        this.listenSessionEvents();
        this.store.dispatch({
          type: this.actions.callIncoming,
        });
      });
    });
  }

  get reducer() {
    return getReducer({
      status: webphoneStatus.preRegister,
      operation: null,
    }, this.prefix);
  }

  /**
   * Make a phone call, this method should be called in registerSuccess state
   * @param {string} toNumber
   * @param {string} [fromNumber]
   * @return {Session}
   */
  async call({ toNumber, fromNumber }) {
    this.store.dispatch({
      type: this.actions.call,
      payload: {
        toNumber,
        fromNumber,
      },
    });
    this.currentSession = this[symbols.phoneInstance].userAgent.invite(toNumber);
    this.listenSessionEvents();
    try {
      await this.currentSession;
    } catch (error) {
      this.store.dispatch({
        type: this.actions.callError,
        error,
      });
    }
    return this.currentSession;
  }

  /**
   * Accept a phone call, this method should be called when call is incoming
   * @param {Object} media, see https://github.com/ringcentral/ringcentral-web-phone#accepting-incoming-call
   * @return {Promise}
   */
  async accept(media) {
    if (!this.currentSession) {
      throw Error('No active session');
    }
    console.log('accept');
    return await this.currentSession.accept(media);
  }

  async bye() {
    if (!this.currentSession) {
      throw Error('No active session');
    }
    return await this.currentSession.bye();
  }

  async record(flag = true) {
    if (!this.currentSession) {
      throw Error('No active session');
    }
    if (!flag) {
      await this.currentSession.stopRecord();
      this.store.dispatch({
        type: this.actions.callOperation,
        operation: {
          type: callActions.stopRecord,
        },
      });
    }
    await this.currentSession.startRecord();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.record,
      },
    });
  }

  /**
   * Internal method for listen session events
   */
  listenSessionEvents() {
    console.log('accepted event');
    this.currentSession.on('accepted', (data) => {
      this.store.dispatch({
        type: this.actions.callConnect,
      });
    });
    this.currentSession.on('rejected', (response, cause) => {
      this.store.dispatch({
        type: this.actions.callEnd,
      });
      this.currentSession = null;
    });
    this.currentSession.on('terminated', (message, cause) => {
      this.store.dispatch({
        type: this.actions.callEnd,
        error: cause,
      });
      this.currentSession = null;
    });
    this.currentSession.on('bye', (request) => {
      this.store.dispatch({
        type: this.actions.callEnd,
      });
      this.currentSession = null;
    });
  }
}
