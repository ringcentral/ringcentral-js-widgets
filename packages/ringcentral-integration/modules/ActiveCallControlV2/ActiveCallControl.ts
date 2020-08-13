import {
  RcModuleV2,
  state,
  action,
  storage,
  computed,
  track,
  watch,
} from '@ringcentral-integration/core';
import { RingCentralCall } from 'ringcentral-call';
import { Session } from 'ringcentral-call/lib/Session';
import {
  Session as TelephonySession,
  SessionData,
} from 'ringcentral-call-control/lib/Session';
import { WebPhoneSession } from 'ringcentral-web-phone/lib/session';
import { Module } from '../../lib/di';
// eslint-disable-next-line import/no-named-as-default
import subscriptionFilters from '../../enums/subscriptionFilters';
import callErrors from '../Call/callErrors';
import { normalizeSession, conflictError } from './helpers';
import { trackEvents } from '../Analytics';
import callControlError from '../ActiveCallControl/callControlError';
import { Deps } from './ActiveCallControl.interface';

const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const DEFAULT_BUSY_TIMEOUT = 3 * 1000;
const telephonySessionsEndPoint = /\/telephony\/sessions$/;
const subscribeEvent = subscriptionFilters.telephonySessions;

@Module({
  name: 'ActiveCallControl',
  deps: [
    'Client',
    'Auth',
    'ConnectivityMonitor',
    'RolesAndPermissions',
    'CallMonitor',
    'Alert',
    'NumberValidate',
    'AccountInfo',
    'ExtensionInfo',
    'Subscription',
    { dep: 'Webphone', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'ActiveCallControlOptions', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
  ],
})
export class ActiveCallControl extends RcModuleV2<Deps> {
  _ttl: number;
  _timeToRetry: number;
  _polling: boolean;
  _enableCache: boolean;
  private _promise: Promise<void> = null;
  private _rcCall: RingCentralCall;
  private _tabActive: boolean;
  private _connectivity: boolean;
  private _onCallEndFunc: () => void;
  private _timeoutId: NodeJS.Timeout;
  private _lastSubscriptionMessage: string;
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: deps.activeCallControlOptions?.enableCache ?? true,
      storageKey: 'activeCallControl',
    });
    const { activeCallControlOptions } = this._deps;
    this._ttl = activeCallControlOptions?.ttl ?? DEFAULT_TTL;
    this._timeToRetry =
      activeCallControlOptions?.timeToRetry ?? DEFAULT_TIME_TO_RETRY;
    this._polling = activeCallControlOptions?.polling ?? false;
    this._enableCache = activeCallControlOptions?.enableCache ?? true;
    this._promise = null;
    this._rcCall = null;
  }

  async onStateChange() {
    if (this.ready && this._hasPermission) {
      this._subscriptionHandler();
      this._checkConnectivity();
      await this._checkTabActive();
    }
  }

  @storage
  @state
  activeSessionId: string = null;

  @storage
  @state
  busyTimestamp: number = 0;

  @storage
  @state
  timestamp: number = 0;

  @storage
  @state
  sessions: SessionData[] = [];

  async onInit() {
    if (!this._hasPermission) return;
    this._deps.subscription.subscribe([subscribeEvent]);
    this._rcCall = new RingCentralCall({
      sdk: this._deps.client.service,
      subscriptions: null,
      enableSubscriptionHander: false,
      callControlOptions: {
        preloadDevices: false,
        preloadSessions: false,
        extensionInfo: {
          ...this._deps.extensionInfo.info,
          // TODO: add info type in 'AccountInfo'
          // @ts-ignore
          account: this._deps.accountInfo.info,
        },
      },
    });
    this._rcCall.on('new', (session: Session) => {
      this._newSessionHandler(session);
    });
    this._tabActive = this._deps.tabManager?.active;
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
    if (this._deps.webphone) {
      watch(
        this,
        () => this._deps.webphone.connected,
        (newValue) => {
          if (newValue && this._deps.webphone._webphone) {
            this._rcCall.setWebphone(this._deps.webphone._webphone);
          }
        },
      );
    }
  }

  onReset() {
    this.resetState();
  }

  @action
  resetState() {
    this.activeSessionId = null;
    this.busyTimestamp = 0;
    this.timestamp = 0;
    this.sessions = [];
  }

  _shouldFetch() {
    return !this._deps.tabManager || this._deps.tabManager.active;
  }

  async fetchData() {
    if (!this._promise) {
      this._promise = this._fetchData();
    }
    await this._promise;
  }

  _clearTimeout() {
    if (this._timeoutId) clearTimeout(this._timeoutId);
  }

  _subscriptionHandler() {
    if (
      !this.ready ||
      (this._deps.storage &&
        this._deps.tabManager &&
        !this._deps.tabManager?.active)
    ) {
      return;
    }
    const { message } = this._deps.subscription;
    if (
      message &&
      message !== this._lastSubscriptionMessage &&
      telephonySessionsEndPoint.test(message.event) &&
      message.body
    ) {
      this._lastSubscriptionMessage = message;
      if (this._rcCall) {
        this._rcCall.onNotificationEvent(message);
      }
    }
  }

  _retry(t = this.timeToRetry) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        if (!this._deps.tabManager || this._deps.tabManager.active) {
          this.fetchData();
        } else {
          // continue retry checks in case tab becomes main tab
          this._retry();
        }
      }
    }, t);
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
      if (!this._deps.tabManager || this._deps.tabManager?.active) {
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
      const activeCalls = this._deps.callMonitor.calls;
      await this._rcCall.loadSessions(activeCalls);
      this.updateActiveSessions();
      this._rcCall.sessions.forEach((session: Session) => {
        this._newSessionHandler(session);
      });
    } catch (error) {
      console.log('sync data error:', error);
      throw error;
    }
  }

  _updateSessionsHandler = () => {
    this.updateActiveSessions();
  };

  @action
  updateActiveSessions() {
    this.timestamp = Date.now();
    this.sessions =
      this._rcCall?._callControl?.sessions.map((session: TelephonySession) => {
        return session.data;
      }) || [];
  }

  _newSessionHandler(session: Session) {
    this._updateSessionsHandler();
    session.removeListener('status', this._updateSessionsHandler);
    session.removeListener('muted', this._updateSessionsHandler);
    session.removeListener('recordings', this._updateSessionsHandler);
    session.on('status', this._updateSessionsHandler);
    session.on('muted', this._updateSessionsHandler);
    session.on('recordings', this._updateSessionsHandler);
  }

  @action
  removeActiveSession() {
    this.activeSessionId = null;
  }

  // count it as load (should only call on container init step)
  @action
  setActiveSessionId(telephonySessionId: string) {
    this.activeSessionId = telephonySessionId;
  }

  _checkConnectivity() {
    if (
      this._deps.connectivityMonitor &&
      this._deps.connectivityMonitor.ready &&
      this._connectivity !== this._deps.connectivityMonitor.connectivity
    ) {
      this._connectivity = this._deps.connectivityMonitor.connectivity;
      if (this._connectivity) {
        this.fetchData();
      }
    }
  }

  async _checkTabActive() {
    if (!this._deps.tabManager || !this._deps.storage || !this._enableCache) {
      return;
    }
    if (this._tabActive !== this._deps.tabManager?.active) {
      this._tabActive = this._deps.tabManager?.active;
      if (this._deps.tabManager?.active && this._rcCall) {
        await this._rcCall.restoreSessions(this.sessions);
        this._rcCall.sessions.forEach((session: Session) => {
          this._newSessionHandler(session);
        });
      }
    }
  }

  @action
  setCallControlBusyTimestamp() {
    this.busyTimestamp = Date.now();
  }

  @action
  clearCallControlBusyTimestamp() {
    this.busyTimestamp = 0;
  }

  @track(trackEvents.mute)
  async mute(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      await session.mute();
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (await conflictError(error)) {
        this._deps.alert.warning({
          message: callControlError.muteConflictError,
        });
      } else if (
        !(await this._deps.availabilityMonitor?.checkIfHAError(error))
      ) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  @track(trackEvents.unmute)
  async unmute(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      await session.unmute();
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (await conflictError(error)) {
        this._deps.alert.warning({
          message: callControlError.unMuteConflictError,
        });
      } else if (
        !(await this._deps.availabilityMonitor?.checkIfHAError(error))
      ) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  async startRecord(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      const recordingId = this.getRecordingId(session);
      await session.startRecord(recordingId);
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      this.clearCallControlBusyTimestamp();
    }
  }

  getRecordingId(session: Session) {
    const recording = session.recordings[0];
    const recodingId = recording && recording.id;
    return recodingId;
  }

  async stopRecord(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      const recordingId = this.getRecordingId(session);
      await session.stopRecord(recordingId);
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      console.log('stop record error:', error);
      this.clearCallControlBusyTimestamp();
      throw error;
    }
  }

  @track(trackEvents.hangup)
  async hangUp(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      await session.hangup();
      if (typeof this._onCallEndFunc === 'function') {
        this._onCallEndFunc();
      }
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      console.error('hangup error', error);
      if (!(await this._deps.availabilityMonitor?.checkIfHAError(error))) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  async reject(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      await session.toVoicemail();
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (!(await this._deps.availabilityMonitor?.checkIfHAError(error))) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  @track(trackEvents.hold)
  async hold(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      await session.hold();
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (await conflictError(error)) {
        this._deps.alert.warning({
          message: callControlError.holdConflictError,
        });
      } else if (
        !(await this._deps.availabilityMonitor?.checkIfHAError(error))
      ) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  @track(trackEvents.unhold)
  async unhold(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      await session.unhold();
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (await conflictError(error)) {
        this._deps.alert.warning({
          message: callControlError.unHoldConflictError,
        });
      } else if (
        !(await this._deps.availabilityMonitor?.checkIfHAError(error))
      ) {
        this._deps.alert.warning({
          message: callControlError.generalError,
        });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  async transfer(transferNumber: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      const validatedResult = await this._deps.numberValidate.validateNumbers([
        transferNumber,
      ]);
      if (!validatedResult.result) {
        validatedResult.errors.forEach(async (error) => {
          const isHAError: boolean = await this._deps.availabilityMonitor?.checkIfHAError(
            error,
          );
          if (!isHAError) {
            // TODO: fix `callErrors` type
            this._deps.alert.warning({
              message: (callErrors as any)[error.type],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          }
        });
        return;
      }
      // TODO: fix `validatedResult` type in `numberValidate` module.
      const validPhoneNumber =
        (validatedResult as any).numbers[0] &&
        (validatedResult as any).numbers[0].e164;
      let phoneNumber = validPhoneNumber;
      if (validPhoneNumber.indexOf('+') === -1) {
        phoneNumber = [
          this._deps.accountInfo.mainCompanyNumber,
          validPhoneNumber,
        ].join('*');
      }
      session.transfer(phoneNumber);
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (!(await this._deps.availabilityMonitor?.checkIfHAError(error))) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  // Incomplete Implementation?
  async flip(flipValue: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find((s: Session) => {
        return s.id === telephonySessionId;
      });
      await session.flip({ callFlipId: flipValue });
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      console.error('flip error', error);
      this.clearCallControlBusyTimestamp();
      throw error;
    }
  }

  async forward() {
    // No implement at the moment
    // Need to check the API document
  }

  // DTMF handing by webphone session temporary, due to rc call session doesn't support currently
  async sendDTMF(dtmfValue: string, telephonySessionId: string) {
    try {
      const session = this._rcCall.sessions.find((s: Session) => {
        return s.id === telephonySessionId;
      });
      // TODO: using rc call session
      const { webphoneSession } = session;
      if (webphoneSession) {
        await webphoneSession.dtmf(dtmfValue, 100);
      }
    } catch (error) {
      console.log('send dtmf error', error);
      throw error;
    }
  }

  getActiveSession(telephonySessionId: string) {
    return this.activeSessions[telephonySessionId];
  }

  @computed(({ activeSessionId, activeSessions }: ActiveCallControl) => [
    activeSessionId,
    activeSessions,
  ])
  get activeSession() {
    return this.getActiveSession(this.activeSessionId);
  }

  @computed((that: ActiveCallControl) => [
    that._deps.callMonitor.calls,
    that.sessions,
    that.timestamp,
  ])
  get activeSessions() {
    // TODO: add calls type in callMonitor modules
    const reducer = (accumulator: any, call: any) => {
      const { telephonySessionId } = call;
      const session = this.sessions.find((s) => s.id === telephonySessionId);
      if (!session) {
        return accumulator;
      }
      accumulator[telephonySessionId] = normalizeSession({
        session,
        call,
      });
      return accumulator;
    };
    return this._deps.callMonitor.calls.reduce(reducer, {});
  }

  @computed((that: ActiveCallControl) => [that._deps.callMonitor.calls])
  get sessionIdToTelephonySessionIdMapping() {
    // TODO: add calls type in callMonitor modules
    const reducer = (accumulator: any, call: any) => {
      const { telephonySessionId, sessionId } = call;
      accumulator[sessionId] = telephonySessionId;
      return accumulator;
    };
    return this._deps.callMonitor.calls.reduce(reducer, {});
  }

  /**
   * Mitigation strategy for avoiding 404/409 on call control endpoings.
   * This should gradually move towards per session controls rather than
   * a global busy timeout.
   */
  get busy() {
    return Date.now() - this.busyTimestamp < DEFAULT_BUSY_TIMEOUT;
  }

  get _hasPermission() {
    return this._deps.rolesAndPermissions.ringoutEnabled;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }

  get ttl() {
    return this._ttl;
  }
}
