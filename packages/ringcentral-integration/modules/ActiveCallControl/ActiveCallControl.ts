import type ExtensionTelephonySessionsEvent from '@rc-ex/core/lib/definitions/ExtensionTelephonySessionsEvent';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';
import { sleep } from '@ringcentral-integration/utils';
import { filter, find, forEach, isEmpty } from 'ramda';
import type { ActiveCallInfo, MakeCallParams } from 'ringcentral-call';
import { events as callEvents, RingCentralCall } from 'ringcentral-call';
import type { ReplyWithTextParams } from 'ringcentral-call-control/lib/Session';
import {
  PartyStatusCode,
  ReplyWithPattern,
} from 'ringcentral-call-control/lib/Session';
import { events as eventsEnum } from 'ringcentral-call/lib/Session';
import { v4 as uuidV4 } from 'uuid';

import { callDirection } from '../../enums/callDirections';
// eslint-disable-next-line import/no-named-as-default
import subscriptionFilters from '../../enums/subscriptionFilters';
import { trackEvents } from '../../enums/trackEvents';
import type {
  Session,
  WebphoneSession,
} from '../../interfaces/Webphone.interface';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { validateNumbers } from '../../lib/validateNumbers';
// TODO: should move that callErrors to enums
import { callErrors } from '../Call/callErrors';
import type { MessageBase } from '../Subscription';
import { sessionStatus } from '../Webphone/sessionStatus';
import { webphoneErrors } from '../Webphone/webphoneErrors';
import {
  extractHeadersData,
  normalizeSession as normalizeWebphoneSession,
} from '../Webphone/webphoneHelper';

import type {
  ActiveCallControlSessionData,
  ActiveSession,
  Deps,
  ICurrentDeviceCallsMap,
  ITransferCallSessionMapping,
  ModuleMakeCallParams,
  IPickUpCallDataMap,
  IPickUpCallParams,
} from './ActiveCallControl.interface';
import { callControlError } from './callControlError';
import {
  conflictError,
  filterDisconnectedCalls,
  isAtMainNumberPromptToneStage,
  isHolding,
  isOnRecording,
  isRecording,
  isRinging,
  normalizeSession,
  normalizeTelephonySession,
  getWebphoneReplyMessageOption,
  isGoneSession,
} from './helpers';

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
    'AppFeatures',
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
  private _onCallEndFunc?: () => void;
  private _onCallSwitchedFunc?: (sessionId: string) => void;
  onCallIgnoreFunc?: (partyId: string) => void;
  private _connectivity = false;
  private _timeoutId: ReturnType<typeof setTimeout> | null = null;
  private _lastSubscriptionMessage: MessageBase | null = null;
  private _activeSession?: Session;

  private _ttl = this._deps.activeCallControlOptions?.ttl ?? DEFAULT_TTL;
  private _timeToRetry =
    this._deps.activeCallControlOptions?.timeToRetry ?? DEFAULT_TIME_TO_RETRY;
  private _polling = this._deps.activeCallControlOptions?.polling ?? false;
  private _promise: Promise<void> | null = null;
  private _rcCall: RingCentralCall | null = null;
  private _permissionCheck =
    this._deps.activeCallControlOptions?.permissionCheck ?? true;
  private _enableAutoSwitchFeature =
    this._deps.activeCallControlOptions?.enableAutoSwitchFeature ?? false;
  private _autoMergeSignCallIdKey = `${this._deps.prefix}-auto-merge-sign-call-id-key`;
  private _autoMergeCallsKey = `${this._deps.prefix}-auto-merge-calls-key`;
  private _autoMergeWebphoneSessionsMap = new Map<WebphoneSession, boolean>();

  @state
  pickUpCallDataMap: IPickUpCallDataMap = {};

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: deps.activeCallControlOptions?.enableCache ?? true,
      storageKey: 'activeCallControl',
    });
  }

  override async onStateChange() {
    if (this.ready && this.hasPermission) {
      this._subscriptionHandler();
      this._checkConnectivity();
    }
  }

  override async _initModule() {
    this._createOtherInstanceListener();
    await super._initModule();
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
        e.newValue!,
      );
      const ids = this.rcCallSessions
        .filter(
          (s) =>
            !isRinging(s) &&
            !!s.webphoneSession &&
            s.telephonySessionId !== telephoneSessionId,
        )
        .map((s) => s.telephonySessionId);
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
    if (!this._deps.tabManager?.active) return;

    try {
      const { ids }: { ids: string[] } = JSON.parse(e.newValue!);
      const response = await this._deps.client.service
        .platform()
        .get(subscriptionFilters.detailedPresence);
      const data = await response.json();
      const activeCalls: ActiveCallInfo[] = data.activeCalls;
      const callsList = ids
        // filter calls which are already in current instance.
        .filter((id) =>
          this.sessions.find(
            (item: ActiveCallControlSessionData) =>
              item.telephonySessionId === id &&
              !!item.telephonySession &&
              !isEmpty(item.telephonySession),
          ),
        )
        // transfer id to ActiveCallInfo.
        .reduce((acc, telephonySessionId: string) => {
          const activeCall = activeCalls.find(
            (call) => call.telephonySessionId === telephonySessionId,
          );

          if (!activeCall) {
            console.log(
              `Auto Switch failed with telephonySessionId ${telephonySessionId}`,
            );
            return acc;
          }

          acc.push(activeCall);
          return acc;
        }, [] as ActiveCallInfo[]);

      if (callsList.length) {
        await Promise.all(
          callsList.map(async (activeCall) => {
            await this.transferUnmuteHandler(activeCall.telephonySessionId);
            const switchSession = this._rcCall!.switchCallFromActiveCall(
              activeCall,
              {
                homeCountryId: this._deps.regionSettings.homeCountryId,
              },
            );
            this._autoMergeWebphoneSessionsMap.set(
              switchSession.webphoneSession as WebphoneSession,
              true,
            );
            switchSession.webphoneSession.mute();
            switchSession.webphoneSession.once('accepted', async () => {
              switchSession.webphoneSession.unmute();
              await switchSession.webphoneSession.hold();
              this._addTrackToActiveSession();
            });
          }),
        );
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
    const activeRCCallSession =
      this.rcCallSessions.find(
        (s) => s.telephonySessionId === telephonySessionId,
      ) || this._activeSession;
    if (
      activeRCCallSession &&
      activeRCCallSession.webphoneSession &&
      this._deps.webphone
    ) {
      const { _remoteVideo, _localVideo } = this._deps.webphone;
      activeRCCallSession.webphoneSession.addTrack(_remoteVideo, _localVideo);
    }
  }

  @storage
  @state
  transferCallMapping: ITransferCallSessionMapping = {};

  @storage
  @state
  data: {
    activeSessionId: string | null;
    busyTimestamp: number;
    timestamp: number;
    sessions: ActiveCallControlSessionData[];
    ringSessionId: string | null;
  } = {
    activeSessionId: null,
    busyTimestamp: 0,
    timestamp: 0,
    sessions: [],
    ringSessionId: null,
  };

  @state
  currentDeviceCallsMap: ICurrentDeviceCallsMap = {};

  @state
  lastEndedSessionIds: string[] = [];

  // TODO: conference call using
  @state
  cachedSessions: object[] = [];

  override async onInit() {
    if (!this.hasPermission) return;

    await this._deps.subscription.subscribe([subscribeEvent]);
    this._rcCall = this._initRcCall();

    if (this._shouldFetch()) {
      try {
        await this.fetchData();
      } catch (e: any /** TODO: confirm with instanceof */) {
        this._retry();
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
  }

  private _initRcCall() {
    const rcCall = new RingCentralCall({
      sdk: this._deps.client.service,
      subscriptions: undefined,
      enableSubscriptionHander: false,
      callControlOptions: {
        preloadDevices: false,
        preloadSessions: false,
        extensionInfo: {
          ...this._deps.extensionInfo.info,
          // TODO: add info type in 'AccountInfo'
          // @ts-expect-error TS(2322): Type 'GetAccountInfoResponse' is not assignable to... Remove this comment to see the full error message
          account: this._deps.accountInfo.info,
        },
      },
      webphone: this._deps.webphone?._webphone!,
    });
    rcCall.on(callEvents.NEW, (session: Session) => {
      this._newSessionHandler(session);
    });
    rcCall.on(callEvents.WEBPHONE_INVITE, (session: WebphoneSession) =>
      this._onWebphoneInvite(session),
    );
    rcCall.on(callEvents.WEBPHONE_INVITE_SENT, (session: WebphoneSession) =>
      this._onWebphoneInvite(session),
    );
    // TODO: workaround of bug:
    // WebRTC outbound call with wrong sequences of telephony sessions then call log section will not show
    // @ts-expect-error TS(2341): Property '_callControl' is private and only access... Remove this comment to see the full error message
    rcCall._callControl?.on('new', (session: Session) =>
      this._onNewCall(session),
    );

    return rcCall;
  }

  override onInitOnce() {
    if (this._deps.availabilityMonitor && this._deps.tabManager) {
      watch(
        this,
        () => this.currentDeviceCallsMap,
        () => {
          const hasCallSession = Object.values(this.currentDeviceCallsMap).some(
            (webphoneSession) => !!webphoneSession,
          );
          const key = `acc-${this._deps.tabManager!.id}`;
          this._deps.availabilityMonitor!.setSharedState(key, {
            hasCallSession,
          });
        },
      );
    }
    if (this._deps.webphone) {
      watch(
        this,
        () => this._deps.webphone?.connected,
        (newValue) => {
          if (newValue && this._deps.webphone?._webphone) {
            this._rcCall?.setWebphone(this._deps.webphone._webphone);
          }
        },
      );

      watch(
        this,
        () => this.activeSessionId,
        () => {
          this._addTrackToActiveSession();
        },
      );
    }
  }

  override onReset() {
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

  @proxify
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
    let { message } = this._deps.subscription;
    if (
      message &&
      // FIXME: is that object compare is fine, should confirm that?
      message !== this._lastSubscriptionMessage &&
      message.event &&
      telephonySessionsEndPoint.test(message.event) &&
      message.body
    ) {
      message = this._checkRingOutCallDirection(message);
      this._lastSubscriptionMessage = message;
      if (this._rcCall) {
        this._rcCall.onNotificationEvent(message);
      }
    }
  }

  // TODO: workaround of PLA bug: https://jira_domain/browse/PLA-52742, remove these code after PLA
  // fixed this bug
  private _checkRingOutCallDirection(message: ExtensionTelephonySessionsEvent) {
    const { body } = message;
    const originType = body?.origin?.type;

    if (body && originType === 'RingOut') {
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

  private _retry(t = this.timeToRetry) {
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

  @proxify
  async _fetchData() {
    try {
      await this._syncData();
      if (this._polling) {
        this._startPolling();
      }
      this._promise = null;
    } catch (error: any /** TODO: confirm with instanceof */) {
      this._promise = null;
      if (this._polling) {
        this._startPolling(this.timeToRetry);
      } else {
        this._retry();
      }
      throw error;
    }
  }

  private _startPolling(t = this.timestamp + this.ttl + 10 - Date.now()) {
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
      await this._rcCall!.loadSessions(activeCalls);
      this.updateActiveSessions();
      this._rcCall!.sessions.forEach((session) => {
        this._newSessionHandler(session as Session);
      });
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.log('sync data error:', error);
      throw error;
    }
  }

  private _onSessionDisconnected = () => {
    this.updateActiveSessions();
    if (!this._deps.tabManager || this._deps.tabManager?.active) {
      this.cleanCurrentWarmTransferData();
    }
  };

  private _updateSessionsStatusHandler = ({
    status,
    telephonySessionId,
  }: {
    status: PartyStatusCode;
    telephonySessionId: string;
  }) => {
    this.updateActiveSessions();

    if (
      status === PartyStatusCode.answered &&
      this.activeSessionId !== telephonySessionId
    ) {
      this.setActiveSessionId(telephonySessionId);
    }
  };

  private _updateSessionsHandler = () => {
    this.updateActiveSessions();
  };

  @proxify
  async _onNewCall(session: Session) {
    this.updateActiveSessions();
    const ringSession = find(
      (x) => isRinging(x) && x.id === session.id,
      this.sessions,
    );
    const sessionId = ringSession?.id;

    this._setRingSessionId(sessionId);
  }

  @action
  private _onCallAccepted(telephonySessionId: string) {
    if (this.ringSessionId === telephonySessionId) {
      this.data.ringSessionId = this.ringSessions[0]?.id || null;
    }
  }

  @action
  private _onCallEnd(telephonySessionId: string) {
    if (this.ringSessionId === telephonySessionId) {
      this.data.ringSessionId = this.ringSessions[0]?.id || null;
    }
  }

  updateActiveSessions() {
    const currentDeviceCallsMap: ICurrentDeviceCallsMap = {};
    const callControlSessions = (this._rcCall?.sessions || [])
      .filter((session) => filterDisconnectedCalls(session))
      .map((session) => {
        // @ts-expect-error TS(2322): Type 'NormalizedSession | undefined' is not assign... Remove this comment to see the full error message
        currentDeviceCallsMap[session.telephonySessionId] =
          // @ts-expect-error TS(2345): Argument of type 'WebPhoneSession' is not assignab... Remove this comment to see the full error message
          normalizeWebphoneSession(session.webphoneSession);

        return {
          ...session.data,
          activeCallId: session.activeCallId,
          direction: session.direction,
          from: session.from,
          id: session.id,
          otherParties: session.otherParties,
          party: session.party || {},
          recordings: session.recordings,
          isRecording: isOnRecording(session.recordings),
          sessionId: session.sessionId,
          startTime: session.startTime,
          status: session.status,
          telephonySessionId: session.telephonySessionId,
          telephonySession: normalizeTelephonySession(session.telephonySession),
          to: session.to,
        } as ActiveCallControlSessionData;
      });
    this._updateActiveSessions(
      currentDeviceCallsMap,
      callControlSessions.filter((x) => !isGoneSession(x)),
    );
  }

  @action
  private _updateActiveSessions(
    currentDeviceCallsMap: ICurrentDeviceCallsMap,
    callControlSessions: ActiveCallControlSessionData[],
  ) {
    this.data.timestamp = Date.now();
    this.currentDeviceCallsMap = currentDeviceCallsMap;
    this.data.sessions = callControlSessions || [];
  }

  private _newSessionHandler(session: Session) {
    session.removeListener(
      eventsEnum.STATUS,
      this._updateSessionsStatusHandler,
    );
    session.removeListener(eventsEnum.MUTED, this._updateSessionsHandler);
    session.removeListener(eventsEnum.RECORDINGS, this._updateSessionsHandler);
    session.removeListener(
      eventsEnum.DISCONNECTED,
      this._onSessionDisconnected,
    );
    session.removeListener(
      eventsEnum.WEBPHONE_SESSION_CONNECTED,
      this._updateSessionsHandler,
    );
    session.on(eventsEnum.STATUS, this._updateSessionsStatusHandler);
    session.on(eventsEnum.MUTED, this._updateSessionsHandler);
    session.on(eventsEnum.RECORDINGS, this._updateSessionsHandler);
    session.on(eventsEnum.DISCONNECTED, this._onSessionDisconnected);
    session.on(
      eventsEnum.WEBPHONE_SESSION_CONNECTED,
      this._updateSessionsHandler,
    );
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
  setLastEndedSessionIds(session: WebphoneSession) {
    /**
     * don't add incoming call that isn't relied by current app
     *   to end sessions. this call can be answered by other apps
     */
    const normalizedWebphoneSession = normalizeWebphoneSession(session);
    if (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !normalizedWebphoneSession.startTime &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !normalizedWebphoneSession.isToVoicemail &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !normalizedWebphoneSession.isForwarded &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !normalizedWebphoneSession.isReplied
    ) {
      return;
    }
    // @ts-expect-error TS(2339): Property 'partyData' does not exist on type 'Norma... Remove this comment to see the full error message
    const { partyData } = normalizedWebphoneSession;
    if (!partyData) return;
    if (this.lastEndedSessionIds.indexOf(partyData.sessionId) === -1) {
      this.lastEndedSessionIds = [partyData.sessionId]
        .concat(this.lastEndedSessionIds)
        .slice(0, 5);
    }
  }

  private _checkConnectivity() {
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

  private _getTrackEventName(name: string) {
    // TODO: refactor to remove `this.parentModule`.
    const currentPath = this._deps.routerInteraction?.currentPath;
    const showCallLog = (this.parentModule as any).callLogSection?.show;
    const showNotification = (this.parentModule as any).callLogSection
      ?.showNotification;
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
  @proxify
  async mute(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      await session.mute();
      this.clearCallControlBusyTimestamp();
    } catch (error: any) {
      // TODO: fix error handling with instanceof
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
  @proxify
  async unmute(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      await session.unmute();
      this.clearCallControlBusyTimestamp();
    } catch (error: any) {
      // TODO: fix error handling with instanceof
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
      const session = this._getSessionById(telephonySessionId);
      if (session?.telephonySession?.party?.muted) {
        await session.unmute();
      }
    } catch (error: any /** TODO: confirm with instanceof */) {
      // https://jira_domain/browse/NTP-1308
      // Unmute before transfer due to we can not sync the mute status after transfer.
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.record),
  ])
  @proxify
  async startRecord(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      const recordingId = this.getRecordingId(session);
      await session.startRecord({ recordingId });
      this.clearCallControlBusyTimestamp();
      return true;
    } catch (error: any) {
      // TODO: fix error handling with instanceof
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
  @proxify
  async stopRecord(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      const recordingId = this.getRecordingId(session);
      await session.stopRecord({ recordingId });
      this.clearCallControlBusyTimestamp();
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.log('stop record error:', error);

      this._deps.alert.danger({
        message: webphoneErrors.pauseRecordError,
      });

      this.clearCallControlBusyTimestamp();
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.hangup),
  ])
  @proxify
  async hangUp(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      await session.hangup();

      this._onCallEndFunc?.();
      // TODO: find way to fix that 800ms
      // avoid hung up sync slow and user click multiple times.
      await sleep(800);
      this.clearCallControlBusyTimestamp();
    } catch (error: any) {
      // TODO: fix error handling with instanceof
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
  @proxify
  async reject(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);

      // !If is a queue call, ignore is performed
      if (session.party.queueCall) {
        return await this.ignore(telephonySessionId);
      }

      await session.toVoicemail();

      if (session && session.webphoneSession) {
        (session.webphoneSession as WebphoneSession).__rc_isToVoicemail = true;
      }
      this.clearCallControlBusyTimestamp();
    } catch (error: any) {
      // TODO: fix error handling with instanceof
      if (!(await this._deps.availabilityMonitor?.checkIfHAError(error))) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.confirmSwitch),
  ])
  @proxify
  async switch(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      await this.transferUnmuteHandler(telephonySessionId);
      const switchedSession = await this._rcCall!.switchCall(
        telephonySessionId,
        {
          homeCountryId: this._deps.regionSettings.homeCountryId,
        },
      );
      this._triggerAutoMergeEvent(telephonySessionId);
      await this._holdOtherCalls(telephonySessionId);
      this.clearCallControlBusyTimestamp();
      this._onCallSwitchedFunc?.(switchedSession.sessionId);
    } catch (error: any) {
      // TODO: fix error handling with instanceof
      if (!(await this._deps.availabilityMonitor?.checkIfHAError(error))) {
        this._deps.alert.warning({ message: callControlError.generalError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.hold),
  ])
  @proxify
  async hold(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      const { webphoneSession, otherParties = [] } = session;
      if (
        // when call is connecting or in voicemail then call control's Hold API will not work
        // so use webphone hold here
        (session.direction === callDirection.outbound &&
          (otherParties[0]?.status?.code === PartyStatusCode.proceeding ||
            otherParties[0]?.status?.code === PartyStatusCode.voicemail)) ||
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
    } catch (error: any) {
      // TODO: fix error handling with instanceof
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
  @proxify
  async unhold(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      await this._holdOtherCalls(telephonySessionId);
      await session.unhold();
      this._activeSession = session;
      const { webphoneSession } = session;
      if (webphoneSession && webphoneSession.__rc_callStatus) {
        webphoneSession.__rc_callStatus = sessionStatus.connected;
      }
      this.setActiveSessionId(telephonySessionId);
      this._addTrackToActiveSession();
      this.clearCallControlBusyTimestamp();
    } catch (error: any) {
      // TODO: fix error handling with instanceof
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

  @track((_, params: ReplyWithTextParams) => {
    let messageType = 'End-User Custom Message';
    if (params.replyWithPattern) {
      const pattern = params.replyWithPattern?.pattern;
      if (
        pattern === ReplyWithPattern.inAMeeting ||
        pattern === ReplyWithPattern.onMyWay
      ) {
        messageType = 'Default Static Message';
      } else {
        messageType = 'Default Dynamic Message';
      }
    }
    return [
      trackEvents.executionReplyWithMessage,
      {
        'Message Type': messageType,
      },
    ];
  })
  @proxify
  async replyWithMessage(
    params: ReplyWithTextParams,
    telephonySessionId: string,
  ) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      if (!session) {
        return false;
      }
      // await session.replyWithMessage(params);
      const webphoneReplyOption = getWebphoneReplyMessageOption(params) as any;
      await session.webphoneSession.replyWithMessage(webphoneReplyOption);
      this.clearCallControlBusyTimestamp();
      this._deps.alert.success({ message: callControlError.replyCompleted });
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.error('replyWithMessage error', error);
      this._deps.alert.warning({ message: callControlError.generalError });
      this.clearCallControlBusyTimestamp();
    }
  }

  @proxify
  async toVoicemail(voicemailId: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      if (!session) {
        return false;
      }
      await session.transfer(voicemailId, { type: 'voicemail' });
      this.clearCallControlBusyTimestamp();
      this._deps.alert.success({ message: callControlError.transferCompleted });
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.error('toVoicemail error', error);
      this._deps.alert.warning({ message: webphoneErrors.toVoiceMailError });
      this.clearCallControlBusyTimestamp();
    }
  }

  @proxify
  async completeWarmTransfer(telephonySession: string) {
    try {
      this.setCallControlBusyTimestamp();

      const { isOriginal, relatedTelephonySessionId } =
        this.transferCallMapping[telephonySession];

      const session = this._getSessionById(
        isOriginal ? telephonySession : relatedTelephonySessionId,
      );
      const transferSession = this._getSessionById(
        isOriginal ? relatedTelephonySessionId : telephonySession,
      );

      if (!transferSession) {
        return false;
      }
      await session.warmTransfer(transferSession);
      this.clearCallControlBusyTimestamp();
      this._deps.alert.success({ message: callControlError.transferCompleted });
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.error('warmTransfer error', error);
      this._deps.alert.warning({ message: callControlError.generalError });
      this.clearCallControlBusyTimestamp();
    }
  }

  @track(trackEvents.transfer)
  @proxify
  async transfer(transferNumber: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      const phoneNumber = await this.getValidPhoneNumber(transferNumber, true);
      if (phoneNumber) {
        await session.transfer(phoneNumber);
        this.clearCallControlBusyTimestamp();
        this._deps.alert.success({
          message: callControlError.transferCompleted,
        });
      }
    } catch (error: any) {
      // TODO: fix error handling with instanceof
      if (!(await this._deps.availabilityMonitor?.checkIfHAError(error))) {
        this._deps.alert.warning({ message: webphoneErrors.transferError });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  async getValidPhoneNumber(phoneNumber: string, withMainNumber?: boolean) {
    let validatedResult;
    let validPhoneNumber;
    if (!this._permissionCheck) {
      validatedResult = validateNumbers({
        allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        phoneNumbers: [phoneNumber],
      });
      validPhoneNumber = validatedResult[0];
    } else {
      const isEDPEnabled = this._deps.appFeatures?.isEDPEnabled;
      validatedResult = isEDPEnabled
        ? this._deps.numberValidate.validate([phoneNumber])
        : await this._deps.numberValidate.validateNumbers([phoneNumber]);

      if (!validatedResult.result) {
        validatedResult.errors.forEach(async (error) => {
          const isHAError =
            // @ts-expect-error TS(2345): Argument of type '{ phoneNumber: string; type: "sp... Remove this comment to see the full error message
            !!(await this._deps.availabilityMonitor?.checkIfHAError(error));
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
      if (isEDPEnabled) {
        const parsedNumbers = await this._deps.numberValidate.parseNumbers([
          phoneNumber,
        ]);
        validPhoneNumber =
          parsedNumbers?.[0].availableExtension ??
          parsedNumbers?.[0].parsedNumber;
      } else {
        // TODO: fix `validatedResult` type in `numberValidate` module.
        validPhoneNumber = (validatedResult as any).numbers?.[0]?.e164;
      }
    }

    let result = validPhoneNumber;
    if (withMainNumber && validPhoneNumber.indexOf('+') === -1) {
      result = [
        this._deps.accountInfo.mainCompanyNumber,
        validPhoneNumber,
      ].join('*');
    }

    return result;
  }

  // FIXME: Incomplete Implementation?
  @proxify
  async flip(flipValue: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      await session.flip({ callFlipId: flipValue });
      this.clearCallControlBusyTimestamp();
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.error('flip error', error);
      this.clearCallControlBusyTimestamp();
      throw error;
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.confirmForward),
  ])
  @proxify
  async forward(forwardNumber: string, telephonySessionId: string) {
    const session = this._getSessionById(telephonySessionId);
    if (!session) {
      return false;
    }
    try {
      let validatedResult;
      let validPhoneNumber;
      if (!this._permissionCheck) {
        validatedResult = validateNumbers({
          allowRegionSettings:
            !!this._deps.brand.brandConfig.allowRegionSettings,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          phoneNumbers: [forwardNumber],
        });
        validPhoneNumber = validatedResult[0];
      } else {
        const isEDPEnabled = this._deps.appFeatures?.isEDPEnabled;
        validatedResult = isEDPEnabled
          ? this._deps.numberValidate.validate([forwardNumber])
          : await this._deps.numberValidate.validateNumbers([forwardNumber]);

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
        if (isEDPEnabled) {
          const parsedNumbers = await this._deps.numberValidate.parseNumbers([
            forwardNumber,
          ]);
          if (parsedNumbers) {
            validPhoneNumber =
              parsedNumbers[0].availableExtension ??
              parsedNumbers[0].parsedNumber;
          }
        } else {
          validPhoneNumber = (validatedResult as any).numbers?.[0]?.e164;
        }
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
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error(e);
      this._deps.alert.warning({
        message: webphoneErrors.unknownError,
      });
      return false;
    }
  }

  // DTMF handing by webphone session temporary, due to rc call session doesn't support currently
  @proxify
  async sendDTMF(dtmfValue: string, telephonySessionId: string) {
    try {
      const session = this._getSessionById(telephonySessionId);
      // TODO: using rc call session
      const { webphoneSession } = session;
      if (webphoneSession) {
        await webphoneSession.dtmf(dtmfValue, 100);
      }
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.log('send dtmf error', error);
      throw error;
    }
  }

  private _onWebphoneInvite(session: WebphoneSession) {
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
          (s) => s.webphoneSession === webphoneSession,
        ) || {};

      if (!telephonySessionId) return;

      this._setActiveSessionIdFromOnHoldCalls(telephonySessionId);
      this._onCallEnd(telephonySessionId);
    });
    webphoneSession.on('accepted', () => {
      const { telephonySessionId } =
        this.rcCallSessions.find(
          (s) => s.webphoneSession === webphoneSession,
        ) || {};

      if (!telephonySessionId) return;

      if (this._autoMergeWebphoneSessionsMap.get(webphoneSession)) {
        this._autoMergeWebphoneSessionsMap.delete(webphoneSession);
      } else {
        this.setActiveSessionId(telephonySessionId);
        this._holdOtherCalls(telephonySessionId);
        this._addTrackToActiveSession();
      }
      this.updateActiveSessions();
      this._onCallAccepted(telephonySessionId);
    });
  }

  @action
  private _setRingSessionId(sessionId: string | null = null) {
    this.data.ringSessionId = sessionId;
  }

  /**
   *if current call is terminated, then pick the first onhold call as active current call;
   *
   * @param {Session} session
   * @memberof ActiveCallControl
   */
  private _setActiveSessionIdFromOnHoldCalls(telephonySessionId: string) {
    if (!telephonySessionId) return;
    if (this.activeSessionId === telephonySessionId) {
      const onHoldSessions: ActiveCallControlSessionData[] = filter(
        (s: ActiveCallControlSessionData) => isHolding(s),
        this.sessions,
      );
      if (onHoldSessions.length) {
        this.setActiveSessionId(onHoldSessions[0].telephonySessionId);
      }
    }
  }

  @proxify
  private async _holdOtherCalls(telephonySessionId?: string) {
    const currSessions = this._rcCall!.sessions! as Session[];
    const otherSessions = filter((s) => {
      return (
        s.telephonySessionId !== telephonySessionId &&
        (s.status === PartyStatusCode.answered ||
          (s.webphoneSession && !s.webphoneSession.localHold))
      );
    }, currSessions);
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
            (otherParties[0]?.status?.code === PartyStatusCode.proceeding ||
              otherParties[0]?.status?.code === PartyStatusCode.voicemail)) ||
          isAtMainNumberPromptToneStage(session)
        ) {
          await webphoneSession.hold();
        } else {
          await session.hold();
        }
        if (webphoneSession && webphoneSession.__rc_callStatus) {
          webphoneSession.__rc_callStatus = sessionStatus.onHold;
        }
      } catch (error: any /** TODO: confirm with instanceof */) {
        console.log('Hold call fail.', error);
      }
    });
    await Promise.all(holdOtherSessions);
  }

  @action
  setPickUpCallData(data: IPickUpCallDataMap) {
    this.pickUpCallDataMap = { ...data };
  }

  @proxify
  private async _answer(telephonySessionId: string) {
    try {
      this._triggerAutoMergeEvent(telephonySessionId);
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);

      this._activeSession = session;
      await this._holdOtherCalls(telephonySessionId);
      const { webphoneSession } = session;
      const deviceId = this._deps.webphone?.device?.id;
      if (webphoneSession) {
        this._deps.webphone?.initWebphoneSessionEvents(webphoneSession);
        await session.answer({ deviceId });
      } else {
        await this.pickUpCall({
          ...this.pickUpCallDataMap[telephonySessionId],
        });
      }
      this._trackWebRTCCallAnswer();
      if (webphoneSession && webphoneSession.__rc_callStatus) {
        webphoneSession.__rc_callStatus = sessionStatus.connected;
      }
    } finally {
      this.clearCallControlBusyTimestamp();
    }
  }

  public async pickUpCall(data: IPickUpCallParams) {
    const { telephonySessionId } = data;
    await this._rcCall?.pickupInboundCall({
      ...this.pickUpCallDataMap[telephonySessionId],
      ...data,
      ...this.acceptOptions,
    });
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.answer),
  ])
  @proxify
  async answer(telephonySessionId: string) {
    try {
      await this._answer(telephonySessionId);
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.log('answer failed.');
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.holdAndAnswer),
  ])
  @proxify
  async answerAndHold(telephonySessionId: string) {
    // currently, the logic is same as answer
    try {
      await this._answer(telephonySessionId);
    } catch (error: any /** TODO: confirm with instanceof */) {
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
  @proxify
  async ignore(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      const { webphoneSession } = session;
      await webphoneSession?.reject();
      // hack for update sessions, then incoming call log page can re-render
      setTimeout(() => this.updateActiveSessions(), 0);
      this.clearCallControlBusyTimestamp();
      this.onCallIgnoreFunc?.(session.party.id);
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.log('===ignore failed.', error);
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.endAndAnswer),
  ])
  @proxify
  async answerAndEnd(telephonySessionId: string) {
    try {
      if (this.busy) return;
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      const currentActiveCalls = this._rcCall!.sessions.filter(
        (s) =>
          s.id !== telephonySessionId &&
          s.webphoneSession &&
          (s.status === PartyStatusCode.answered ||
            (s.direction === callDirection.outbound &&
              s.status === PartyStatusCode.proceeding)),
      );
      for (const s of currentActiveCalls) {
        await s.hangup();
      }
      const deviceId = this._deps.webphone?.device?.id;
      if (session.webphoneSession) {
        await session.answer({ deviceId });
      } else {
        await this.pickUpCall({
          ...this.pickUpCallDataMap[telephonySessionId],
        });
      }
      this._trackWebRTCCallAnswer();
      const { webphoneSession } = session;
      if (webphoneSession && webphoneSession.__rc_callStatus) {
        webphoneSession.__rc_callStatus = sessionStatus.connected;
      }
      this.clearCallControlBusyTimestamp();
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.log('answer and end fail.');
      console.error(error);
    }
  }

  async startWarmTransfer(transferNumber: string, telephonySessionId: string) {
    // todo handle error;
    const toNumber = await this.getValidPhoneNumber(transferNumber);
    return this.makeCall({
      toNumber,
      transferSessionId: telephonySessionId,
    });
  }

  @action
  setWarmTransferMapping(originalId: string, transferredId: string) {
    this.transferCallMapping = {
      ...this.transferCallMapping,
      [originalId]: {
        relatedTelephonySessionId: transferredId,
        isOriginal: true,
      },
      [transferredId]: {
        relatedTelephonySessionId: originalId,
        isOriginal: false,
      },
    };
  }

  @action
  cleanCurrentWarmTransferData() {
    const warmTransferSessionIds = Object.keys(this.transferCallMapping);
    const currentSessionIds = this.sessions.map(
      (session) => session.telephonySessionId,
    );
    const needRemovedIds = warmTransferSessionIds.filter(
      (telephonySessionId) => !currentSessionIds.includes(telephonySessionId),
    );

    if (needRemovedIds.length > 0) {
      const removeSessionSet = new Set(needRemovedIds);

      const filteredData = Object.fromEntries(
        Object.entries(this.transferCallMapping).filter(
          ([id, transferInfo]) =>
            !(
              removeSessionSet.has(id) ||
              removeSessionSet.has(transferInfo.relatedTelephonySessionId)
            ),
        ),
      );

      this.transferCallMapping = filteredData;
    }
  }

  @proxify
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
      const session = (await this._rcCall!.makeCall(
        sdkMakeCallParams,
      )) as Session;
      this._activeSession = session;
      this._deps.webphone?.initWebphoneSessionEvents(session.webphoneSession);
      session.webphoneSession.on('progress', (incomingResponse) => {
        if (
          session.telephonySessionId &&
          this.activeSessionId !== session.telephonySessionId
        ) {
          this.setActiveSessionId(session.telephonySessionId);

          const { transferSessionId } = params;
          if (transferSessionId) {
            this.setWarmTransferMapping(
              transferSessionId,
              session.telephonySessionId,
            );
          }
        }
      });
      this._triggerAutoMergeEvent();
      return session;
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.log('make call fail.', error);
    }
  }

  private async _fetchDL() {
    const response = await this._deps.client
      .account()
      .extension()
      .device()
      .list();
    const devices = response.records;
    let phoneLines: any[] = [];
    devices?.forEach((device) => {
      // wrong type of phoneLines, temporary treat it as any
      if (!device.phoneLines || (device.phoneLines as any).length === 0) {
        return;
      }
      phoneLines = phoneLines.concat(device.phoneLines);
    });
    return phoneLines;
  }

  getActiveSession(telephonySessionId: string | null) {
    if (!telephonySessionId) {
      return null;
    }
    return this.activeSessions[telephonySessionId];
  }

  getSession(telephonySessionId: string) {
    return this.sessions.find(
      (session) => session.telephonySessionId === telephonySessionId,
    );
  }

  @computed(({ activeSessionId, activeSessions }: ActiveCallControl) => [
    activeSessionId,
    activeSessions,
  ])
  get activeSession() {
    return this.getActiveSession(this.activeSessionId);
  }

  @computed(({ ringSessionId, activeSessions }: ActiveCallControl) => [
    ringSessionId,
    activeSessions,
  ])
  get ringSession() {
    return this.getActiveSession(this.ringSessionId);
  }

  @computed(({ sessions }: ActiveCallControl) => [sessions])
  get ringSessions() {
    if (!this.sessions) {
      return [];
    }
    return this.sessions.filter((session: ActiveCallControlSessionData) =>
      isRinging(session),
    );
  }

  @computed((that: ActiveCallControl) => [that.sessions, that.timestamp])
  get activeSessions() {
    return this.sessions.reduce((accumulator, session) => {
      const { id } = session;
      accumulator[id!] = normalizeSession({ session });
      return accumulator;
    }, {} as Record<string, Partial<ActiveSession>>);
  }

  @computed((that: ActiveCallControl) => [that._deps.presence.calls])
  get sessionIdToTelephonySessionIdMapping() {
    return this._deps.presence.calls.reduce((accumulator, call) => {
      const { telephonySessionId, sessionId } = call;
      accumulator[sessionId!] = telephonySessionId!;
      return accumulator;
    }, {} as Record<string, string>);
  }

  /**
   * Mitigation strategy for avoiding 404/409 on call control endpoints.
   * This should gradually move towards per session controls rather than
   * a global busy timeout.
   */
  get busy() {
    return Date.now() - this.busyTimestamp < DEFAULT_BUSY_TIMEOUT;
  }

  // This should reflect on the app permissions setting in DWP
  get hasPermission() {
    return this._deps.appFeatures.hasCallControl;
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

  // TODO:refactor, use this.sessions instead
  get rcCallSessions() {
    return filter(
      (session) => filterDisconnectedCalls(session),
      this._rcCall?.sessions || [],
    );
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

  get ringSessionId() {
    return this.data.ringSessionId;
  }

  @track(trackEvents.inboundWebRTCCallConnected)
  _trackWebRTCCallAnswer() {
    //
  }

  @track(trackEvents.dialpadOpen)
  dialpadOpenTrack() {
    //
  }

  @track(trackEvents.dialpadClose)
  dialpadCloseTrack() {
    //
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.clickTransfer),
  ])
  clickTransferTrack() {
    //
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.forward),
  ])
  clickForwardTrack() {
    //
  }

  @track((that: ActiveCallControl, path: string) => {
    return (analytics) => {
      // @ts-expect-error TS(2339): Property 'getTrackTarget' does not exist on type '... Remove this comment to see the full error message
      const target = analytics.getTrackTarget();
      return [
        trackEvents.openEntityDetailLink,
        { path: path || target.router },
      ];
    };
  })
  openEntityDetailLinkTrack(path: string) {
    //
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.switch),
  ])
  clickSwitchTrack() {
    //
  }

  private _getSessionById(sessionId: string) {
    const session = this._rcCall!.sessions.find((s) => s.id === sessionId);

    return session as Session;
  }
}
