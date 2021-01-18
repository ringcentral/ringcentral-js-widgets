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
  ActiveCallInfo,
} from 'ringcentral-call';
import { Session, events as eventsEnum } from 'ringcentral-call/lib/Session';
import {
  Session as TelephonySession,
  PartyStatusCode,
} from 'ringcentral-call-control/lib/Session';
import { WebPhoneSession } from 'ringcentral-web-phone/lib/session';
import { filter, sort, forEach } from 'ramda';
import { v4 as uuidV4 } from 'uuid';
import { ExtensionTelephonySessionsEvent } from '@rc-ex/core/definitions';
import { callDirection } from '../../enums/callDirections';
import { Module } from '../../lib/di';
// eslint-disable-next-line import/no-named-as-default
import subscriptionFilters from '../../enums/subscriptionFilters';
import callErrors from '../Call/callErrors';
import { webphoneErrors } from '../WebphoneV2/webphoneErrors';
import {
  normalizeSession,
  conflictError,
  isRecording,
  isHolding,
  ActiveCallControlSessionData,
  isRinging,
  isAtMainNumberPromptToneStage,
  getInboundSwitchedParty,
} from './helpers';
import { trackEvents } from '../Analytics';
import callControlError from '../ActiveCallControl/callControlError';
import { Deps, ModuleMakeCallParams } from './ActiveCallControl.interface';
import validateNumbers from '../../lib/validateNumbers';
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
    { dep: 'Prefix', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'AudioSettings', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'ActiveCallControlOptions', optional: true },
    { dep: 'RouterInteraction', optional: true },
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
  private _timeoutId: ReturnType<typeof setTimeout> = null;
  private _lastSubscriptionMessage: string;
  private _permissionCheck: boolean;
  private _autoMergeSignCallIdKey: string;
  private _autoMergeCallsKey: string;
  private _enableAutoSwitchFeature: boolean;
  private _autoMergeWebphoneSessionsMap: Map<WebPhoneSession, boolean>;
  private _onCallSwitchedFunc: (args: any) => any;
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
    this._enableAutoSwitchFeature =
      activeCallControlOptions?.enableAutoSwitchFeature ?? false;
    this._autoMergeSignCallIdKey = `${deps.prefix}-auto-merge-sign-call-id-key`;
    this._autoMergeCallsKey = `${deps.prefix}-auto-merge-calls-key`;
    this._autoMergeWebphoneSessionsMap = new Map();
  }

  async onStateChange() {
    if (this.ready && this._hasPermission) {
      this._subscriptionHandler();
      this._checkConnectivity();
      await this._checkTabActive();
    }
  }

  async initModule() {
    this._createOtherInstanceListener();
    await super.initModule();
  }

  _createOtherInstanceListener() {
    if (!this._deps.tabManager || !this._enableAutoSwitchFeature) {
      return;
    }
    window.addEventListener('storage', (e) => {
      this._onStorageChangeEvent(e);
    });
  }

  _onStorageChangeEvent(e: StorageEvent) {
    switch (e.key) {
      case this._autoMergeSignCallIdKey:
        this._triggerCurrentClientAutoMerge(e);
        break;
      case this._autoMergeCallsKey:
        this._autoMergeCallsHandler(e);
        break;
      default:
        break;
    }
  }

  _triggerCurrentClientAutoMerge(e: StorageEvent) {
    try {
      const { telephoneSessionId }: { telephoneSessionId: string } = JSON.parse(
        e.newValue,
      );
      const ids = this.rcCallSessions
        .filter(
          (s: Session) =>
            !isRinging(s) &&
            !!s.webphoneSession &&
            s.telephonySessionId !== telephoneSessionId,
        )
        .map((s: Session) => s.telephonySessionId);
      const id = uuidV4();
      const data = { id, ids };
      if (ids.length) {
        localStorage.setItem(this._autoMergeCallsKey, JSON.stringify(data));
      }
    } catch (err) {
      console.log('AutoMerge sign event parse error');
    }
  }

  async _autoMergeCallsHandler(e: StorageEvent) {
    if (!this._deps.tabManager.active) return;

    try {
      const { ids }: { ids: string[] } = JSON.parse(e.newValue);
      const response = await this._deps.client.service
        .platform()
        .get(subscriptionFilters.detailedPresence);
      const data = await response.json();
      const activeCalls: ActiveCallInfo[] = data.activeCalls;
      const callsList = ids
        // filter calls which are already in current instance.
        .filter((id) =>
          this.rcCallSessions.find(
            (item) => item.telephonySessionId === id && !!item.telephonySession,
          ),
        )
        // transfer id to ActiveCallInfo.
        .map((telephonySessionId: string) => {
          const activeCall = activeCalls.find(
            (call) => call.telephonySessionId === telephonySessionId,
          );
          if (!activeCall)
            console.log(
              `Auto Switch failed with telephonySessionId ${telephonySessionId}`,
            );
          return activeCall;
        })
        .filter((item: any) => !!item);

      if (callsList.length) {
        callsList.forEach(async (activeCall: ActiveCallInfo) => {
          await this.transferUnmuteHandler(activeCall.telephonySessionId);
          const switchSession = this._rcCall.switchCallFromActiveCall(
            activeCall,
            {
              homeCountryId: this._deps.regionSettings.homeCountryId,
            },
          );
          this._autoMergeWebphoneSessionsMap.set(
            switchSession.webphoneSession,
            true,
          );
          switchSession.webphoneSession.mute();
          switchSession.webphoneSession.once('accepted', async () => {
            switchSession.webphoneSession.unmute();
            await switchSession.webphoneSession.hold();
            this._addTrackToActiveSession();
          });
        });
      }
    } catch (err) {
      console.log(err);
      console.log('auto merge calls from other tabs failed');
    }
  }

  _triggerAutoMergeEvent(telephoneSessionId?: string) {
    if (!this._deps.tabManager || !this._enableAutoSwitchFeature) return;

    const id = uuidV4();
    const data = {
      id,
      telephoneSessionId,
    };
    localStorage.setItem(this._autoMergeSignCallIdKey, JSON.stringify(data));
  }

  _addTrackToActiveSession() {
    const telephonySessionId = this.activeSessionId;
    const activeRCCallSession = this.rcCallSessions.find(
      (s) => s.telephonySessionId === telephonySessionId,
    );
    if (activeRCCallSession && activeRCCallSession.webphoneSession) {
      const { _remoteVideo, _localVideo } = this._deps.webphone;
      activeRCCallSession.webphoneSession.addTrack(_remoteVideo, _localVideo);
    }
  }

  @storage
  @state
  data: {
    activeSessionId: string;
    busyTimestamp: number;
    timestamp: number;
    sessions: ActiveCallControlSessionData[];
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
    this._rcCall.on(
      callEvents.WEBPHONE_INVITE_SENT,
      (session: WebPhoneSession) => this._onWebphoneInvite(session),
    );
    // workaround of bug:
    // WebRTC outbound call with wrong sequences of telephony sessions then call log section will not show
    this._rcCall?._callControl?.on('new', this._updateSessionsHandler);
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
  }

  onInitOnce() {
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
    if (!this.ready) {
      return;
    }
    let { message } = this._deps.subscription;
    if (
      message &&
      message !== this._lastSubscriptionMessage &&
      telephonySessionsEndPoint.test(message.event) &&
      message.body
    ) {
      message = this._checkRingOutCallDirection(message);
      this._lastSubscriptionMessage = message;
      if (this._rcCall) {
        console.log('notification event:', JSON.stringify(message, null, 2));
        this._rcCall.onNotificationEvent(message);
      }
    }
  }

  // workaround of PLA bug: https://jira.ringcentral.com/browse/PLA-52742, remove these code after PLA
  // fixed this bug
  _checkRingOutCallDirection(message: ExtensionTelephonySessionsEvent) {
    const { body } = message;
    const originType = body?.origin?.type;
    if (originType === 'RingOut') {
      const { parties } = body;
      if (Array.isArray(parties) && parties.length) {
        forEach((party: any) => {
          if (
            party.ringOutRole &&
            party.ringOutRole === 'Initiator' &&
            party.direction === 'Inbound'
          ) {
            const tempFrom = { ...party.from };
            party.direction = 'Outbound';
            party.from = party.to;
            party.to = tempFrom;
          }
        }, parties);
      }
    }
    return message;
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
        return { ...session.data, party: session.party || {} };
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

  _getTrackEventName(name: string) {
    const currentPath = this._deps.routerInteraction?.currentPath;
    const showCallLog = this.parentModule.callLogSection?.show;
    const showNotification = this.parentModule.callLogSection?.showNotification;
    if (showNotification) {
      return `${name}/Call notification page`;
    }
    if (showCallLog) {
      return `${name}/Call log page`;
    }
    if (currentPath === '/calls') {
      return `${name}/All calls page`;
    }
    if (currentPath.includes('/simplifycallctrl')) {
      return `${name}/Small call control`;
    }
    return name;
  }

  @action
  setCallControlBusyTimestamp() {
    this.data.busyTimestamp = Date.now();
  }

  @action
  clearCallControlBusyTimestamp() {
    this.data.busyTimestamp = 0;
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.mute),
  ])
  async mute(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      await session.mute();
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (error.response && !error.response._text) {
        error.response._text = await error.response.clone().text();
      }
      if (conflictError(error)) {
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

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.unmute),
  ])
  async unmute(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      await session.unmute();
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (error.response && !error.response._text) {
        error.response._text = await error.response.clone().text();
      }
      if (conflictError(error)) {
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

  async transferUnmuteHandler(telephonySessionId: string) {
    try {
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      if (session?.telephonySession?.party?.muted) {
        await session.unmute();
      }
    } catch (error) {
      // https://jira.ringcentral.com/browse/NTP-1308
      // Unmute before transfer due to we can not sync the mute status after transfer.
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.record),
  ])
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
      const { errors = [] } = (await error.response.clone().json()) || {};
      if (errors.length) {
        for (const error of errors) {
          console.error('record fail:', error);
        }
        this._deps.alert.danger({
          message: webphoneErrors.recordError,
          payload: {
            errorCode: errors[0].errorCode,
          },
        });
      }
    }
  }

  getRecordingId(session: Session) {
    const recording = session.recordings[0];
    const recodingId = recording && recording.id;
    return recodingId;
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.stopRecord),
  ])
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

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.hangup),
  ])
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

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.voicemail),
  ])
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

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.confirmSwitch),
  ])
  async switch(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      await this.transferUnmuteHandler(telephonySessionId);
      const switchedSession = await this._rcCall.switchCall(
        telephonySessionId,
        {
          homeCountryId: this._deps.regionSettings.homeCountryId,
        },
      );
      this._triggerAutoMergeEvent(telephonySessionId);
      await this._holdOtherCalls(telephonySessionId);
      this.clearCallControlBusyTimestamp();
      if (typeof this._onCallSwitchedFunc === 'function') {
        this._onCallSwitchedFunc(switchedSession.sessionId);
      }
    } catch (error) {
      if (!(await this._deps.availabilityMonitor?.checkIfHAError(error))) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.hold),
  ])
  async hold(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._rcCall.sessions.find(
        (s: Session) => s.id === telephonySessionId,
      );
      const { webphoneSession, otherParties = [] } = session;
      if (
        // when call is connecting or in voicemail then call control's Hold API will not work
        // so use webphone hold here
        (session.direction === callDirection.outbound &&
          (otherParties[0]?.status.code === PartyStatusCode.proceeding ||
            otherParties[0]?.status.code === PartyStatusCode.voicemail)) ||
        isAtMainNumberPromptToneStage(session)
      ) {
        await webphoneSession.hold();
      } else {
        await session.hold();
      }
      if (webphoneSession && webphoneSession.__rc_callStatus) {
        webphoneSession.__rc_callStatus = sessionStatus.onHold;
      }
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (error.response && !error.response._text) {
        error.response._text = await error.response.clone().text();
      }
      if (conflictError(error)) {
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

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.unhold),
  ])
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
      this._addTrackToActiveSession();
      this.clearCallControlBusyTimestamp();
    } catch (error) {
      if (error.response && !error.response._text) {
        error.response._text = await error.response.clone().text();
      }
      if (conflictError(error)) {
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

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.confirmForward),
  ])
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
      // this.setLastEndedSessionIds(webphoneSession);
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
      if (this._autoMergeWebphoneSessionsMap.get(webphoneSession)) {
        this._autoMergeWebphoneSessionsMap.delete(webphoneSession);
      } else {
        this.setActiveSessionId(telephonySessionId);
      }
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
    const otherSessions = filter((s: Session) => {
      return (
        s.telephonySessionId !== telephonySessionId &&
        s.status === PartyStatusCode.answered &&
        s.webphoneSession &&
        !s.webphoneSession.localHold
      );
    }, this._rcCall.sessions);
    if (!otherSessions.length) {
      return;
    }
    const holdOtherSessions = otherSessions.map(async (session) => {
      const { webphoneSession, otherParties = [] } = session;
      try {
        if (
          // when call is connecting or in voicemail then call control's Hold API will not work
          // so use webphone hold here
          (session.direction === callDirection.outbound &&
            (otherParties[0]?.status.code === PartyStatusCode.proceeding ||
              otherParties[0]?.status.code === PartyStatusCode.voicemail)) ||
          isAtMainNumberPromptToneStage(session)
        ) {
          await webphoneSession.hold();
        } else {
          await session.hold();
        }
        if (webphoneSession && webphoneSession.__rc_callStatus) {
          webphoneSession.__rc_callStatus = sessionStatus.onHold;
        }
      } catch (error) {
        console.log('Hold call fail.', error);
      }
    });
    await Promise.all(holdOtherSessions);
  }

  async _answer(telephonySessionId: string) {
    this._triggerAutoMergeEvent(telephonySessionId);
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
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.answer),
  ])
  async answer(telephonySessionId: string) {
    try {
      await this._answer(telephonySessionId);
    } catch (error) {
      console.log('answer failed.');
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.holdAndAnswer),
  ])
  async answerAndHold(telephonySessionId: string) {
    // currently, the logic is same as answer
    try {
      await this._answer(telephonySessionId);
    } catch (error) {
      console.log('answer hold failed.', error);
    }
  }

  /**
   * ignore an incoming WebRTC call, after action executed, call will be ignored at current
   * device and move to "calls on other device" section. This call still can be answered at other
   * device
   * @param {string} telephonySessionId
   * @memberof ActiveCallControl
   */
  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.ignore),
  ])
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

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.endAndAnswer),
  ])
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
      this._triggerAutoMergeEvent();
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

  getRcCallSession(telephoneSessionId: string) {
    return this.rcCallSessions.find(
      (session: Session) => session.telephonySessionId === telephoneSessionId,
    );
  }

  @computed(({ activeSessionId, activeSessions }: ActiveCallControl) => [
    activeSessionId,
    activeSessions,
  ])
  get activeSession() {
    return this.getActiveSession(this.activeSessionId);
  }

  @computed((that: ActiveCallControl) => [that.sessions, that.timestamp])
  get activeSessions() {
    // TODO: add calls type in callMonitor modules
    const reducer = (accumulator: any, session: any) => {
      const { id } = session;
      accumulator[id] = normalizeSession({ session });
      return accumulator;
    };
    return this.sessions.reduce(reducer, {});
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
    // workaround of bug:
    // switch an inbound call then call direction will change to outbound
    return filter((session: Session) => {
      const { party, otherParties, direction, status } = session;
      if (
        direction === callDirection.outbound &&
        status !== PartyStatusCode.disconnected
      ) {
        const inboundSwitchedParty = getInboundSwitchedParty(otherParties);
        if (inboundSwitchedParty) {
          party.direction = inboundSwitchedParty.direction;
          party.to = inboundSwitchedParty.to;
          party.from = inboundSwitchedParty.from;
        }
      }
      return session.status !== PartyStatusCode.disconnected;
    }, this._rcCall?.sessions || []);
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

  @track(trackEvents.dialpadOpen)
  dialpadOpenTrack() {}

  @track(trackEvents.dialpadClose)
  dialpadCloseTrack() {}

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.clickTransfer),
  ])
  clickTransferTrack() {}

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.forward),
  ])
  clickForwardTrack() {}

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.switch),
  ])
  clickSwitchTrack() {}
}
