import { RingCentralCallControl } from 'ringcentral-call-control';

import { selector } from '../../lib/selector';

import { Module } from '../../lib/di';
import Pollable from '../../lib/Pollable';
import moduleStatuses from '../../enums/moduleStatuses';
import callErrors from '../Call/callErrors';
import ensureExist from '../../lib/ensureExist';
import actionTypes from './actionTypes';
import getActiveCallControlReducer from './getActiveCallControlReducer';
import getDataReducer from './getDataReducer';
import { normalizeSession, confictError } from './helpers';
import callControlError from './callControlError';

const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const DEFAULT_BUSY_TIMEOUT = 3 * 1000;
const telephonySessionsEndPoint = /\/telephony\/sessions$/;
const storageKey = 'activeCallControl';
const subscribeEvent = '/account/~/extension/~/telephony/sessions';

@Module({
  deps: [
    'Client',
    'Auth',
    'Subscription',
    'ConnectivityMonitor',
    'RolesAndPermissions',
    'CallMonitor',
    'Alert',
    'NumberValidate',
    'AccountInfo',
    'ExtensionInfo',
    { dep: 'TabManager', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'ActiveCallControlOptions', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
  ],
})
export default class ActiveCallControl extends Pollable {
  constructor({
    client,
    auth,
    ttl = DEFAULT_TTL,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    storage,
    subscription,
    connectivityMonitor,
    rolesAndPermissions,
    availabilityMonitor,
    tabManager,
    callMonitor,
    polling = false,
    disableCache = false,
    alert,
    numberValidate,
    accountInfo,
    extensionInfo,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._client = client;
    if (!disableCache) {
      this._storage = storage;
    }
    this._subscription = this::ensureExist(subscription, 'subscription');
    this._connectivityMonitor = this::ensureExist(
      connectivityMonitor,
      'connectivityMonitor',
    );
    this._rolesAndPermissions = this::ensureExist(
      rolesAndPermissions,
      'rolesAndPermissions',
    );
    this._availabilityMonitor = availabilityMonitor;
    this._callMonitor = this::ensureExist(callMonitor, 'callMonitor');
    this._tabManager = tabManager;
    this._ttl = ttl;
    this._timeToRetry = timeToRetry;
    this._auth = this::ensureExist(auth, 'auth');
    this._promise = null;
    this._lastSubscriptionMessage = null;
    this._storageKey = storageKey;
    this._polling = polling;
    this._alert = alert;
    this._numberValidate = numberValidate;
    this._accountInfo = accountInfo;
    this._extensionInfo = extensionInfo;
    this._rcCallControl = null;

    if (this._storage) {
      this._reducer = getActiveCallControlReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._storageKey,
        reducer: getDataReducer(this.actionTypes),
      });
    } else {
      this._reducer = getActiveCallControlReducer(this.actionTypes, {
        data: getDataReducer(this.actionTypes),
      });
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this._connectivity = this._connectivityMonitor.connectivity;
      await this._init();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    } else if (this.ready && this._hasPermission) {
      this._subscriptionHandler();
      this._checkConnectivity();
      this._checkTabActive();
    }
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._accountInfo.ready &&
      this._extensionInfo.ready &&
      (!this._storage || this._storage.ready) &&
      this._subscription.ready &&
      this._connectivityMonitor.ready &&
      this._callMonitor.ready &&
      (!this._tabManager || this._tabManager.ready) &&
      this._rolesAndPermissions.ready &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._auth.loggedIn ||
        !this._accountInfo.ready ||
        !this._extensionInfo.ready ||
        (!!this._storage && !this._storage.ready) ||
        !this._subscription.ready ||
        (!!this._tabManager && !this._tabManager.ready) ||
        !this._connectivityMonitor.ready ||
        !this._callMonitor.ready ||
        !this._rolesAndPermissions.ready ||
        (!!this._availabilityMonitor && !this._availabilityMonitor.ready)) &&
      this.ready
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  get _hasPermission() {
    return this._rolesAndPermissions.ringoutEnabled;
  }

  _shouldFetch() {
    return !this._tabManager || this._tabManager.active;
  }

  async fetchData() {
    if (!this._promise) {
      this._promise = this._fetchData();
    }
    await this._promise;
  }

  async _fetchData() {
    try {
      await this._syncData();
      if (this._polling) {
        this._startPolling();
      }
      this._promise = null;
    } catch (error) {
      this._promise = null;
      if (this._polling) {
        this._startPolling(this.timeToRetry);
      } else {
        this._retry();
      }
      throw error;
    }
  }

  _startPolling(t = this.timestamp + this.ttl + 10 - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this._tabManager || this._tabManager.active) {
        if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
          this.fetchData();
        } else {
          this._startPolling();
        }
      } else if (this.timestamp && Date.now() - this.timestamp < this.ttl) {
        this._startPolling();
      } else {
        this._startPolling(this.timeToRetry);
      }
    }, t);
  }

  async _syncData() {
    try {
      const activeCalls = this._callMonitor.calls;
      await this._rcCallControl.loadSessions(activeCalls);
      this.store.dispatch({
        type: this.actionTypes.updateActiveSessions,
        timestamp: Date.now(),
        sessionDatas: this._rcCallControl.sessions.map((s) => s.data),
      });
      this._rcCallControl.sessions.forEach((session) => {
        this._newSessionHandler(session);
      });
    } catch (error) {
      throw error;
    }
  }

  async _init() {
    if (!this._hasPermission) return;
    this._subscription.subscribe(subscribeEvent);
    this._rcCallControl = new RingCentralCallControl({
      sdk: this._client.service,
      preloadDevices: false,
      preloadSessions: false,
      extensionInfo: {
        ...this._extensionInfo.info,
        account: this._accountInfo.info,
      },
    });
    this._rcCallControl.on('new', (session) => {
      this._newSessionHandler(session);
    });
    this._tabActive = this._tabManager.active;
    if (this._shouldFetch()) {
      try {
        await this.fetchData();
      } catch (e) {
        this._retry();
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
  }

  _updateSessionsHandler = () => {
    this.store.dispatch({
      type: this.actionTypes.updateActiveSessions,
      timestamp: Date.now(),
      sessionDatas: this._rcCallControl.sessions.map((s) => s.data),
    });
  };

  _newSessionHandler(session) {
    this._updateSessionsHandler();
    session.removeListener('status', this._updateSessionsHandler);
    session.removeListener('muted', this._updateSessionsHandler);
    session.removeListener('recordings', this._updateSessionsHandler);
    session.on('status', this._updateSessionsHandler);
    session.on('muted', this._updateSessionsHandler);
    session.on('recordings', this._updateSessionsHandler);
  }

  _subscriptionHandler() {
    if (
      !this.ready ||
      (this._storage && this._tabManager && !this._tabManager.active)
    ) {
      return;
    }
    const { message } = this._subscription;
    if (
      message &&
      message !== this._lastSubscriptionMessage &&
      telephonySessionsEndPoint.test(message.event) &&
      message.body
    ) {
      this._lastSubscriptionMessage = message;
      if (this._rcCallControl) {
        this._rcCallControl.onNotificationEvent(message);
      }
    }
  }

  removeActiveSession() {
    this.store.dispatch({
      type: this.actionTypes.removeActiveSession,
    });
  }

  // count it as load (should only call on container init step)
  setActiveSessionId(telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.setActiveSessionId,
      telephonySessionId,
    });
  }

  _checkConnectivity() {
    if (
      this._connectivityMonitor &&
      this._connectivityMonitor.ready &&
      this._connectivity !== this._connectivityMonitor.connectivity
    ) {
      this._connectivity = this._connectivityMonitor.connectivity;
      if (this._connectivity) {
        this.fetchData();
      }
    }
  }

  _checkTabActive() {
    if (!this._tabManager || !this._storage) {
      return;
    }
    if (this._tabActive !== this._tabManager.active) {
      this._tabActive = this._tabManager.active;
      if (this._tabManager.active && this._rcCallControl) {
        this._rcCallControl.restoreSessions(this.data.sessions);
        this._rcCallControl.sessions.forEach((session) => {
          this._newSessionHandler(session);
        });
      }
    }
  }

  getActiveSession(telephonySessionId) {
    return this.activeSessions[telephonySessionId];
  }

  async mute(telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.mute,
      timestamp: Date.now(),
    });
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      await session.mute();
      this.store.dispatch({
        type: this.actionTypes.muteSuccess,
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.muteConflictError,
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }
      this.store.dispatch({
        type: this.actionTypes.muteError,
      });
    }
  }

  async unmute(telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.unmute,
      timestamp: Date.now(),
    });
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      await session.unmute();
      this.store.dispatch({
        type: this.actionTypes.unmuteSuccess,
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.unMuteConflictError,
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }
      this.store.dispatch({
        type: this.actionTypes.unmuteError,
      });
    }
  }

  async startRecord(telephonySessionId) {
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      const recordingId = this.getRecordingId(session);
      if (recordingId) {
        await session.resumeRecord(recordingId);
      } else {
        await session.createRecord(recordingId);
      }
    } catch (error) {
      // this.store.dispatch({
      //   type: this.actionTypes.recordFail,
      //   sessionId,
      // });
    }
  }

  getRecordingId(session) {
    const recording = session.recordings[0];
    const recodingId = recording && recording.id;
    return recodingId;
  }

  async stopRecord(telephonySessionId) {
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      const recordingId = this.getRecordingId(session);
      await session.pauseRecord(recordingId);
      const activeSession = this.getActiveSession(telephonySessionId);
      this.store.dispatch({
        type: this.actionTypes.stopRecord,
        activeSession,
      });
    } catch (error) {
      throw error;
    }
  }

  async hangUp(telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.hangUp,
      timestamp: Date.now(),
    });
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      await session.drop();
      if (typeof this._onCallEndFunc === 'function') {
        this._onCallEndFunc();
      }
      this.store.dispatch({
        type: this.actionTypes.hangUpSuccess,
      });
    } catch (error) {
      if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }

      this.store.dispatch({
        type: this.actionTypes.hangUpError,
      });
    }
  }

  async reject(telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.reject,
      timestamp: Date.now(),
    });
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      await session.toVoicemail();
      this.store.dispatch({
        type: this.actionTypes.rejectSuccess,
      });
    } catch (error) {
      if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }
      this.store.dispatch({
        type: this.actionTypes.rejectError,
      });
    }
  }

  async hold(telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.hold,
      timestamp: Date.now(),
    });
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      await session.hold();
      this.store.dispatch({
        type: this.actionTypes.holdSuccess,
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.holdConflictError,
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }

      this.store.dispatch({
        type: this.actionTypes.holdError,
      });
    }
  }

  async unhold(telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.unhold,
      timestamp: Date.now(),
    });
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      await session.unhold();
      this.store.dispatch({
        type: this.actionTypes.unholdSuccess,
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.unHoldConflictError,
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({
          message: callControlError.generalError,
        });
      }
      this.store.dispatch({
        type: this.actionTypes.holdError,
      });
    }
  }

  async transfer(transferNumber, telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.transfer,
      timestamp: Date.now(),
    });
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      const validatedResult = await this._numberValidate.validateNumbers([
        transferNumber,
      ]);
      if (!validatedResult.result) {
        validatedResult.errors.forEach((error) => {
          if (
            !this._availabilityMonitor ||
            !this._availabilityMonitor.checkIfHAError(error)
          ) {
            this._alert.warning({
              message: callErrors[error.type],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          }
        });
        this.store.dispatch({
          type: this.actionTypes.transferError,
        });
        return;
      }
      const validPhoneNumber =
        validatedResult.numbers[0] && validatedResult.numbers[0].e164;
      let phoneNumber = validPhoneNumber;
      if (validPhoneNumber.indexOf('+') === -1) {
        phoneNumber = [
          this._accountInfo.mainCompanyNumber,
          validPhoneNumber,
        ].join('*');
      }
      session.transfer({ phoneNumber });
      this.store.dispatch({
        type: this.actionTypes.transferSuccess,
      });
    } catch (error) {
      if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }
      this.store.dispatch({
        type: this.actionTypes.transferError,
      });
    }
  }

  // Incomplete Implementation?
  async flip(flipValue, telephonySessionId) {
    this.store.dispatch({
      type: this.actionTypes.flip,
      timestamp: Date.now(),
    });
    try {
      const session = this._rcCallControl.sessions.find(
        (s) => s.id === telephonySessionId,
      );
      await session.flip({ callFlipId: flipValue });
      this.store.dispatch({
        type: this.actionTypes.flipSuccess,
      });
    } catch (error) {
      this.store.dispatch({
        type: this.actionTypes.flipError,
      });
      throw error;
    }
  }

  async forward() {
    // No implement at the moment
    // Need to check the API document
  }

  get data() {
    return (
      (this._storage &&
        this._storage.ready &&
        this._storage.getItem(this._storageKey)) ||
      this.state
    );
  }

  get activeSessionId() {
    return this.data.activeSessionId || null;
  }

  /**
   * Mitigation strategy for avoiding 404/409 on call control endpoings.
   * This should gradually move towards per session controls rather than
   * a global busy timeout.
   */
  get busy() {
    return Date.now() - this.data.busy < DEFAULT_BUSY_TIMEOUT;
  }

  get timestamp() {
    return this.data.timestamp;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }

  get ttl() {
    return this._ttl;
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  @selector
  activeSession = [
    () => this.activeSessionId,
    () => this.activeSessions,
    (sessionId) => this.getActiveSession(sessionId),
  ];

  @selector
  activeSessions = [
    () => this._callMonitor.calls,
    () => this.data.sessions,
    () => this.timestamp,
    (calls, sessions, _t) => {
      const reducer = (accumulator, call) => {
        const { telephonySessionId } = call;
        const session = sessions.find((s) => s.id === telephonySessionId);
        if (!session) {
          return accumulator;
        }
        accumulator[telephonySessionId] = normalizeSession({
          call,
          session,
        });
        return accumulator;
      };
      return calls.reduce(reducer, {});
    },
  ];

  @selector
  sessionIdToTelephonySessionIdMapping = [
    () => this._callMonitor.calls,
    (calls) => {
      const reducer = (accumulator, call) => {
        const { telephonySessionId, sessionId } = call;
        accumulator[sessionId] = telephonySessionId;
        return accumulator;
      };
      return calls.reduce(reducer, {});
    },
  ];
}
