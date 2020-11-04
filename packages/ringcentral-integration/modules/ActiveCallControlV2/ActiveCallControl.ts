import {
  RcModuleV2,
  state,
  action,
  storage,
  computed,
  track,
  watch,
} from '@ringcentral-integration/core';
import {
  RingCentralCall,
  events as callEvents,
  MakeCallParams,
} from 'ringcentral-call';
import { Session, events as eventsEnum } from 'ringcentral-call/lib/Session';
import {
  Session as TelephonySession,
  SessionData,
  PartyStatusCode,
} from 'ringcentral-call-control/lib/Session';
import { WebPhoneSession } from 'ringcentral-web-phone/lib/session';
import { filter, sort } from 'ramda';
import { Module } from '../../lib/di';
// eslint-disable-next-line import/no-named-as-default
import subscriptionFilters from '../../enums/subscriptionFilters';
import callErrors from '../Call/callErrors';
import {
  normalizeSession,
  conflictError,
  isRecording,
  isHolding,
} from './helpers';
import { trackEvents } from '../Analytics';
import callControlError from '../ActiveCallControl/callControlError';
import { Deps, ModuleMakeCallParams } from './ActiveCallControl.interface';
import validateNumbers from '../../lib/validateNumbers';
import { webphoneErrors } from '../Webphone/webphoneErrors';
import {
  normalizeSession as normalizeWebphoneSession,
  sortByCreationTimeDesc,
} from '../Webphone/webphoneHelper';
import { sessionStatus } from '../Webphone/sessionStatus';

const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const DEFAULT_BUSY_TIMEOUT = 3 * 1000;
const telephonySessionsEndPoint = /\/telephony\/sessions$/;
const subscribeEvent = subscriptionFilters.telephonySessions;

@Module({
  name: 'ActiveCallControl',
  deps: [
    'Auth',
    'Alert',
    'Brand',
    'Client',
    'Presence',
    'AccountInfo',
    'Subscription',
    'ExtensionInfo',
    'NumberValidate',
    'RegionSettings',
    'ConnectivityMonitor',
    'RolesAndPermissions',
    { dep: 'Storage', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'AudioSettings', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'ActiveCallControlOptions', optional: true },
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
  private _timeoutId: number;
  private _lastSubscriptionMessage: string;
  private _permissionCheck: boolean;
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
    this._permissionCheck = activeCallControlOptions?.permissionCheck ?? true;
  }

  async onStateChange() {
    if (this.ready && this._hasPermission) {
      this._subscriptionHandler();
      this._checkConnectivity();
      await this._checkTabActive();
    }
  }

  get activeSessionId() {
    return this.data.activeSessionId;
  }

  get busyTimestamp() {
    return this.data.busyTimestamp;
  }

  get timestamp() {
    return this.data.timestamp;
  }

  get sessions() {
    return this.data.sessions;
  }

  @storage
  @state
  data: {
    activeSessionId: string;
    busyTimestamp: number;
    timestamp: number;
    sessions: SessionData[];
  } = {
    activeSessionId: null,
    busyTimestamp: 0,
    timestamp: 0,
    sessions: [],
  };

  @state
  lastEndedSessionIds: string[] = [];

  // TODO conference call using
  @state
  cachedSessions: object[] = [];

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
      webphone: this._deps.webphone?._webphone,
    });
    this._rcCall.on(callEvents.NEW, (session: Session) => {
      this._newSessionHandler(session);
    });
    this._rcCall.on(callEvents.WEBPHONE_INVITE, (session: WebPhoneSession) =>
      this._onWebphoneInvite(session),
    );
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
    this.data.activeSessionId = null;
    this.data.busyTimestamp = 0;
    this.data.timestamp = 0;
    this.data.sessions = [];
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
      const activeCalls = this._deps.presence.calls;
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
    this.data.timestamp = Date.now();
    const callControlSessions = this._rcCall?._callControl?.sessions.map(
      (session: TelephonySession) => {
        return session.data;
      },
    );
    this.data.sessions = callControlSessions || [];
  }

  _newSessionHandler(session: Session) {
    session.removeListener(eventsEnum.STATUS, this._updateSessionsHandler);
    session.removeListener(eventsEnum.MUTED, this._updateSessionsHandler);
    session.removeListener(eventsEnum.RECORDINGS, this._updateSessionsHandler);
    session.removeListener(
      eventsEnum.DISCONNECTED,
      this._updateSessionsHandler,
    );
    session.on(eventsEnum.STATUS, this._updateSessionsHandler);
    session.on(eventsEnum.MUTED, this._updateSessionsHandler);
    session.on(eventsEnum.RECORDINGS, this._updateSessionsHandler);
    session.on(eventsEnum.DISCONNECTED, this._updateSessionsHandler);
    // Handle the session update at the end of function to reduce the probability of empty rc call
    // sessions
    this._updateSessionsHandler();
  }

  @action
  removeActiveSession() {
    this.data.activeSessionId = null;
  }

  // count it as load (should only call on container init step)
  @action
  setActiveSessionId(telephonySessionId: string) {
    if (!telephonySessionId) return;
    this.data.activeSessionId = telephonySessionId;
  }

  @action
  setLastEndedSessionIds(session: WebPhoneSession) {
    /**
     * don't add incoming call that isn't relied by current app
     *   to end sessions. this call can be answered by other apps
     */
    const normalizedWebphoneSession = normalizeWebphoneSession(session);
    if (
      !normalizedWebphoneSession.startTime &&
      !normalizedWebphoneSession.isToVoicemail &&
      !normalizedWebphoneSession.isForwarded &&
      !normalizedWebphoneSession.isReplied
    ) {
      return;
    }
    const { partyData } = normalizedWebphoneSession;
    if (!partyData) return;
    if (this.lastEndedSessionIds.indexOf(partyData.sessionId) === -1) {
      this.lastEndedSessionIds = [partyData.sessionId]
        .concat(this.lastEndedSessionIds)
        .slice(0, 5);
    }
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
    this.data.busyTimestamp = Date.now();
  }

  @action
  clearCallControlBusyTimestamp() {
    this.data.busyTimestamp = 0;
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
      await session.startRecord({ recordingId });
      this.clearCallControlBusyTimestamp();
      return true;
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
      await session.stopRecord({ recordingId });
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
      if (session && session.webphoneSession) {
        session.webphoneSession.__rc_isToVoicemail = true;
      }
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
      const { webphoneSession } = session;
      if (webphoneSession && webphoneSession.__rc_callStatus) {
        webphoneSession.__rc_callStatus = sessionStatus.onHold;
      }
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
      await this._holdOtherCalls(telephonySessionId);
      await session.unhold();
      const { webphoneSession } = session;
      if (webphoneSession && webphoneSession.__rc_callStatus) {
        webphoneSession.__rc_callStatus = sessionStatus.connected;
      }
      this.setActiveSessionId(telephonySessionId);
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

  @track(trackEvents.transfer)
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

  async forward(forwardNumber: string, telephonySessionId: string) {
    const { regionSettings, brand } = this._deps;
    const session = this._rcCall.sessions.find((s: Session) => {
      return s.id === telephonySessionId;
    });
    if (!session) {
      return false;
    }
    try {
      let validatedResult;
      let validPhoneNumber;
      if (!this._permissionCheck) {
        validatedResult = validateNumbers(
          [forwardNumber],
          regionSettings,
          brand.id,
        );
        validPhoneNumber = validatedResult[0];
      } else {
        validatedResult = await this._deps.numberValidate.validateNumbers([
          forwardNumber,
        ]);
        if (!validatedResult.result) {
          validatedResult.errors.forEach((error) => {
            this._deps.alert.warning({
              message: (callErrors as any)[error.type],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          });
          return false;
        }
        validPhoneNumber =
          (validatedResult as any).numbers[0] &&
          (validatedResult as any).numbers[0].e164;
      }
      if (session && session.webphoneSession) {
        session.webphoneSession.__rc_isForwarded = true;
      }

      await session.forward(validPhoneNumber, this.acceptOptions);
      this._deps.alert.success({
        message: callControlError.forwardSuccess,
      });
      if (typeof this._onCallEndFunc === 'function') {
        this._onCallEndFunc();
      }
      return true;
    } catch (e) {
      console.error(e);
      this._deps.alert.warning({
        message: webphoneErrors.forwardError,
      });
      return false;
    }
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

  _onWebphoneInvite(session: WebPhoneSession) {
    const webphoneSession = session;
    if (!webphoneSession) return;
    if (!webphoneSession.__rc_creationTime) {
      webphoneSession.__rc_creationTime = Date.now();
    }
    if (!webphoneSession.__rc_lastActiveTime) {
      webphoneSession.__rc_lastActiveTime = Date.now();
    }
    webphoneSession.on('terminated', () => {
      console.log('Call Event: terminated');
      this.setLastEndedSessionIds(webphoneSession);
      const { telephonySessionId } =
        this.rcCallSessions.find(
          (s: Session) => s.webphoneSession === webphoneSession,
        ) || {};
      this._setActiveSessionIdFromOnHoldCalls(telephonySessionId);
    });
    webphoneSession.on('accepted', () => {
      const { telephonySessionId } =
        this.rcCallSessions.find(
          (s: Session) => s.webphoneSession === webphoneSession,
        ) || {};
      this.setActiveSessionId(telephonySessionId);
      this.updateActiveSessions();
    });
  }

  /**
   *if current call is terminated, then pick the first onhold call as active current call;
   *
   * @param {Session} session
   * @memberof ActiveCallControl
   */
  _setActiveSessionIdFromOnHoldCalls(telephonySessionId: string) {
    if (!telephonySessionId) return;
    if (this.activeSessionId === telephonySessionId) {
      const onHoldSessions: Session[] = sort(
        (l, r) =>
          sortByCreationTimeDesc(
            normalizeWebphoneSession(l.webphoneSession),
            normalizeWebphoneSession(r.webphoneSession),
          ),
        filter(
          (s: Session) => isHolding(s) && !!s.webphoneSession,
          this.rcCallSessions,
        ),
      );
      if (onHoldSessions.length) {
        this.setActiveSessionId(onHoldSessions[0].telephonySessionId);
      }
    }
  }

  async _holdOtherCalls(telephonySessionId?: string) {
    const otherSessions = filter(
      (s: Session) =>
        s.telephonySessionId !== telephonySessionId &&
        s.status === PartyStatusCode.answered &&
        s.webphoneSession &&
        !s.webphoneSession.localHold,
      this._rcCall.sessions,
    );
    if (!otherSessions.length) {
      return;
    }
    const holdOtherSessions = otherSessions.map(async (session) => {
      try {
        await session.hold();
        const { webphoneSession } = session;
        if (webphoneSession && webphoneSession.__rc_callStatus) {
          webphoneSession.__rc_callStatus = sessionStatus.onHold;
        }
      } catch (error) {
        console.log('Hold call fail.', error);
      }
    });
    await Promise.all(holdOtherSessions);
  }

  async answer(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find((s: Session) => {
        return s.id === telephonySessionId;
      });
      await this._holdOtherCalls(telephonySessionId);
      const { webphoneSession } = session;
      const deviceId = this._deps.webphone?.device?.id;
      await session.answer({ deviceId });
      if (webphoneSession && webphoneSession.__rc_callStatus) {
        webphoneSession.__rc_callStatus = sessionStatus.connected;
      }
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      console.log('answer failed.');
    }
  }

  /**
   * ignore an incoming WebRTC call, after action executed, call will be ignored at current
   * device and move to "calls on other device" section. This call still can be answered at other
   * device
   * @param {string} telephonySessionId
   * @memberof ActiveCallControl
   */
  async ignore(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find((s: Session) => {
        return s.id === telephonySessionId;
      });
      const { webphoneSession } = session;
      await webphoneSession.reject();
      // hack for update sessions, then incoming call log page can re-render
      setTimeout(() => this.updateActiveSessions(), 0);
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      console.log('ignore failed.', error);
    }
  }

  async answerAndHold(telephonySessionId: string) {
    // currently, the logic is same as answer
    try {
      await this.answer(telephonySessionId);
    } catch (error) {
      console.log('answer hold failed.', error);
    }
  }

  async answerAndEnd(telephonySessionId: string) {
    try {
      if (this.busy) return;
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find((s: Session) => {
        return s.id === telephonySessionId;
      });
      const currentActiveCall = this._rcCall.sessions.find(
        (s: Session) =>
          s.id !== telephonySessionId &&
          s.webphoneSession &&
          s.status === PartyStatusCode.answered,
      );
      if (currentActiveCall) {
        await currentActiveCall.hangup();
      }
      const deviceId = this._deps.webphone?.device?.id;
      await session.answer({ deviceId });
      const { webphoneSession } = session;
      if (webphoneSession && webphoneSession.__rc_callStatus) {
        webphoneSession.__rc_callStatus = sessionStatus.connected;
      }
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      console.log('answer and end fail.');
      console.error(error);
    }
  }

  async makeCall(params: ModuleMakeCallParams) {
    try {
      if (
        params.toNumber.length > 6 &&
        (!this._deps.availabilityMonitor ||
          !this._deps.availabilityMonitor.isVoIPOnlyMode)
      ) {
        const phoneLines = await this._fetchDL();
        if (phoneLines.length === 0) {
          this._deps.alert.warning({
            message: webphoneErrors.noOutboundCallWithoutDL,
          });
          return null;
        }
      }
      await this._holdOtherCalls();
      const sdkMakeCallParams: MakeCallParams = {
        // type 'callControl' not support webphone's sip device currently.
        type: 'webphone',
        toNumber: params.toNumber,
        fromNumber: params.fromNumber,
        homeCountryId: params.homeCountryId,
      };
      const session = await this._rcCall.makeCall(sdkMakeCallParams);
      return session;
    } catch (error) {
      console.log('make call fail.', error);
    }
  }

  async _fetchDL() {
    const response = await this._deps.client
      .account()
      .extension()
      .device()
      .list();
    const devices = response.records;
    let phoneLines: any[] = [];
    devices.forEach((device) => {
      // wrong type of phoneLines, temporary treat it as any
      if (!device.phoneLines || (device.phoneLines as any).length === 0) {
        return;
      }
      phoneLines = phoneLines.concat(device.phoneLines);
    });
    return phoneLines;
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
    that._deps.presence.calls,
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
    return this._deps.presence.calls.reduce(reducer, {});
  }

  @computed((that: ActiveCallControl) => [that._deps.presence.calls])
  get sessionIdToTelephonySessionIdMapping() {
    // TODO: add calls type in callMonitor modules
    const reducer = (accumulator: any, call: any) => {
      const { telephonySessionId, sessionId } = call;
      accumulator[sessionId] = telephonySessionId;
      return accumulator;
    };
    return this._deps.presence.calls.reduce(reducer, {});
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

  get acceptOptions() {
    return {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: {
            deviceId: this._deps.audioSettings?.inputDeviceId,
          },
          video: false,
        },
      },
    };
  }

  get hasCallInRecording() {
    return this.sessions.some((session) => isRecording(session));
  }

  get rcCallSessions() {
    return this._rcCall?.sessions || [];
  }
}
