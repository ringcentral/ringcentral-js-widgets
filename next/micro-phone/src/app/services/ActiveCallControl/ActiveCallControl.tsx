import type ExtensionTelephonySessionsEvent from '@rc-ex/core/lib/definitions/ExtensionTelephonySessionsEvent';
import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import {
  SubscriptionFilter,
  subscriptionFilters,
} from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { validateNumbers } from '@ringcentral-integration/commons/lib/validateNumbers';
import type {
  RateLimiter,
  WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AccountInfo,
  Analytics,
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  Client,
  ConnectivityMonitor,
  ExtensionInfo,
  Presence,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  NumberValidate,
  type ValidateParsingResult,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  ModalView,
  useModalItemView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  computed,
  delegate,
  dynamic,
  fromWatch,
  fromWatchValue,
  getRef,
  inject,
  injectable,
  logger,
  optional,
  portal,
  PortManager,
  RcModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  watch,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';
import { LeaveConferenceCall } from '@ringcentral-integration/widgets/components/CallLogCallCtrlComponent/LeaveConferenceCall';
import React from 'react';
import type { Unsubscribe } from 'redux';
import { RingCentralCallControl } from 'ringcentral-call-control';
import {
  type Party,
  PartyStatusCode,
  type ReplyWithTextParams,
  type Session as TelephonySession,
} from 'ringcentral-call-control/lib/Session';
import {
  filter,
  firstValueFrom,
  fromEvent,
  map,
  merge,
  share,
  tap,
  timer,
} from 'rxjs';

import { CallingSettings } from '../CallingSettings';
import {
  createConferenceParticipantRemovalId,
  PreinsertCall,
} from '../PreinsertCall';
import { Webphone } from '../Webphone';
import { readPartyDataFromHeaders } from '../Webphone/webphoneHelper';

import type {
  ActiveCallControlOptions,
  ActiveCallControlSessionData,
  ActiveSession,
  ICurrentDeviceCallsMap,
  IPickUpCallDataMap,
  IPickUpCallParams,
  ITransferCallSessionMapping,
  ModuleMakeCallParams,
  TelephonySessionsCallAnsweredElsewhereEvent,
  TelephonySessionsMissedCallsEvent,
} from './ActiveCallControl.interface';
import { CallControlEvents } from './callControlEvents';
import {
  checkIfConferenceCall,
  checkRingOutCallDirection,
  CONFERENCE_ORIGIN_TYPE,
  conflictError,
  findConferenceParticipants,
  getWebphoneReplyMessageOption,
  isConnectedCall,
  isProceeding,
  isRecording,
  normalizeSession,
  normalizeToActiveCallControlSession,
} from './helpers';
import { t } from './i18n';

const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const DEFAULT_BUSY_TIMEOUT = 3 * 1000;
const DEFAULT_CONF_ACCEPT_TIMEOUT = 5 * 1000;
export const MAXIMUM_CONF_PARTICIPANTS = 10;
const telephonySessionsEndPoint = /\/telephony\/sessions$/;
const startRingEndPoint = /start-ring$/;
const stopRingEndPoint = /stop-ring$/;

@injectable({
  name: 'ActiveCallControl',
})
export class ActiveCallControl extends RcModule {
  @dynamic('RateLimiter') _rateLimiter?: RateLimiter;
  onCallIgnoreFunc?: (partyId: string) => void;
  private _onCallEndFunc?: () => void;
  public _onCallSwitchedFunc?: (sessionId: string) => void;

  private _timeoutId: ReturnType<typeof setTimeout> | null = null;
  protected _stopWatchingConnectivity?: Unsubscribe;
  protected _stopWatchingSubscription?: Unsubscribe;

  private _ttl = this._activeCallControlOptions?.ttl ?? DEFAULT_TTL;
  private _timeToRetry =
    this._activeCallControlOptions?.timeToRetry ?? DEFAULT_TIME_TO_RETRY;
  private _polling = this._activeCallControlOptions?.polling ?? false;
  private _promise: Promise<void> | null = null;
  private _rcCallControl: RingCentralCallControl | null = null;
  private _permissionCheck =
    this._activeCallControlOptions?.permissionCheck ?? true;

  @state
  pickUpCallDataMap: IPickUpCallDataMap = {};

  @state
  transferCallMapping: ITransferCallSessionMapping = {};

  @state
  data: {
    activeSessionId: string | null;
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
  protected ringMessages: Record<
    string,
    ExtensionTelephonySessionsEvent['body']
  > = {};

  @action
  addRingMessage(
    telephonySessionId: string,
    message: ExtensionTelephonySessionsEvent['body'],
  ) {
    this.ringMessages[telephonySessionId] = message;
  }

  @action
  removeRingMessage(telephonySessionId: string) {
    delete this.ringMessages[telephonySessionId];
  }

  // TODO: non spring-ui only feature, will be removed in the future
  @portal
  private drawer = this._modalView.create({
    view: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { props } = useModalItemView<{ telephonySessionId: string }>();
      const { telephonySessionId } = props.payload!;

      return (
        <LeaveConferenceCall
          onEndCallForEveryOne={() => {
            this.endCall(telephonySessionId, false);
            this.closeDrawer();
          }}
          onLeaveCall={() => {
            this.endCall(telephonySessionId, true);
            this.closeDrawer();
          }}
          currentLocale={this._locale.currentLocale}
        />
      );
    },

    props: () => ({
      type: 'drawer',
      disableBackdropClick: false,
    }),
  });

  openDrawer(telephonySessionId: string) {
    this._modalView.open(this.drawer, {
      telephonySessionId: telephonySessionId,
    });
  }

  closeDrawer() {
    this._modalView.close(this.drawer);
  }

  constructor(
    private _preInsertCall: PreinsertCall,
    protected _portManager: PortManager,
    protected _auth: Auth,
    protected _toast: Toast,
    protected _brand: Brand,
    protected _client: Client,
    protected _presence: Presence,
    protected _accountInfo: AccountInfo,
    @inject('Subscription') protected _subscription: Subscription,
    protected _extensionInfo: ExtensionInfo,
    protected _numberValidate: NumberValidate,
    protected _regionSettings: RegionSettings,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _appFeatures: AppFeatures,
    protected _modalView: ModalView,
    protected _locale: Locale,
    protected _webphone: Webphone,
    protected _callingSettings: CallingSettings,
    @optional('Prefix') protected _prefix?: string,
    @optional() protected _analytics?: Analytics,
    @optional()
    protected _availabilityMonitor?: AvailabilityMonitor,
    @optional('ActiveCallControlOptions')
    protected _activeCallControlOptions?: ActiveCallControlOptions,
    @optional() protected _router?: RouterPlugin,
  ) {
    super();
    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindServerListener();
      });
    } else {
      this.bindServerListener();
    }

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      this._preInsertCall.listenPreinsertFromWebphone();
    }

    this._webphone.useWebphoneMainTab();

    const filters: SubscriptionFilter[] = [
      subscriptionFilters.telephonySessions,
      subscriptionFilters.startRing,
      subscriptionFilters.stopRing,
    ];

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      filters.push(subscriptionFilters.callAnsweredElsewhere);
      filters.push(subscriptionFilters.missedCalls);
    }

    this._subscription.register(this, {
      filters,
    });
  }

  fromCallAnsweredElsewhere = (telephonySessionId: string) => {
    return this._subscription
      .fromMessage$<TelephonySessionsCallAnsweredElsewhereEvent>(
        'call-answered-elsewhere',
      )
      .pipe(filter((data) => data.telephonySessionId === telephonySessionId));
  };

  fromMissedCalls = (telephonySessionId: string) => {
    return this._subscription
      .fromMessage$<TelephonySessionsMissedCallsEvent>('missed-calls')
      .pipe(filter((data) => data.telephonySessionId === telephonySessionId));
  };

  override async onInit() {
    if (!this.hasPermission) return;
    this._rcCallControl = this._initRcCallControl();
    this._iniSubscription();
    this._initConnectivity();

    try {
      await this.fetchData();
    } catch (e) {
      this._retry();
    }
  }

  private _iniSubscription() {
    this._stopWatchingSubscription = watch(
      this,
      () =>
        this._subscription.message as
          | ExtensionTelephonySessionsEvent
          | undefined,
      (message) => this._handleSubscription(message),
    );
  }

  private _initConnectivity() {
    this._stopWatchingConnectivity = watch(
      this,
      () => this._connectivityMonitor.connectivity,
      (connectivity) => this._handleConnectivity(connectivity),
    );
  }

  private _initRcCallControl() {
    const rcCallControl = new RingCentralCallControl({
      sdk: this._client.service,
      preloadDevices: false,
      preloadSessions: false,
      extensionInfo: {
        ...this._extensionInfo.info,
        account: this._accountInfo.info,
        // TODO: add info type in 'AccountInfo'
      } as any,
    });

    rcCallControl.on('new', (session: TelephonySession) => {
      this._newSessionHandler(session);
    });

    // TODO: should fix the issue about the WebRTC outbound call with wrong sequences of telephony sessions then call log section will not show issue

    return rcCallControl;
  }

  override onReset() {
    this._stopWatchingConnectivity?.();
    this._stopWatchingConnectivity = undefined;
    this._stopWatchingSubscription?.();
    this._stopWatchingSubscription = undefined;
    this.resetState();
  }

  @action
  resetState() {
    this.data.activeSessionId = null;
    this.data.busyTimestamp = 0;
    this.data.timestamp = 0;
    this.data.sessions = [];
  }

  @delegate('server')
  async fetchData() {
    if (!this._promise) {
      this._promise = this._fetchData();
    }
    await this._promise;
  }

  _clearTimeout() {
    if (this._timeoutId) clearTimeout(this._timeoutId);
  }

  _handleConnectivity(connectivity: boolean) {
    if (this.ready && this.hasPermission && connectivity) {
      this.fetchData();
    }
  }

  protected _handleSubscription(message?: ExtensionTelephonySessionsEvent) {
    if (message?.event && startRingEndPoint.test(message.event)) {
      const telephonySessionId = message.body?.telephonySessionId;

      if (telephonySessionId) {
        this.addRingMessage(telephonySessionId, message.body);
      }
    }
    if (message?.event && stopRingEndPoint.test(message.event)) {
      const telephonySessionId = message.body?.telephonySessionId;
      if (telephonySessionId) {
        this.removeRingMessage(telephonySessionId);
      }
    }
    if (
      this.ready &&
      this.hasPermission &&
      message?.event &&
      message?.body &&
      telephonySessionsEndPoint.test(message.event)
    ) {
      message = checkRingOutCallDirection(message);
      const cloneMsg = JSON.parse(JSON.stringify(message));
      this._rcCallControl?.onNotificationEvent(cloneMsg);
    }
  }

  private _retry(t = this.timeToRetry) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        this.fetchData();
      }
    }, t);
  }

  @delegate('server')
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

  private _startPolling(t = this.timestamp + this.ttl + 10 - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        this.fetchData();
      } else {
        this._startPolling();
      }
    }, t);
  }

  async _syncData() {
    try {
      const activeCalls = this._presence.calls;
      await this._rcCallControl?.loadSessions(activeCalls);
      await this.updateActiveSessions();
      this._rcCallControl?.sessions.forEach((session) => {
        this._newSessionHandler(session);
      });
    } catch (error) {
      console.log('sync data error:', error);
      throw error;
    }
  }

  private _updateSessionsStatusHandler = async ({
    party,
  }: {
    party: Party;
  }) => {
    await this.updateActiveSessions();

    // spring-ui not handle those logic inside the active call control
    // TODO: remove those logic after all project switch to spring-ui
    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      // setActiveSessionId on call answered
      if (party.status.code === PartyStatusCode.answered) {
        const telephonySession = this.sessions.find(
          (x) => x.party.id === party.id,
        );
        if (
          telephonySession &&
          telephonySession.telephonySessionId !== this.activeSessionId
        ) {
          this.setActiveSessionId(telephonySession.telephonySessionId);
        }
      }
    }
  };

  private _updateSessionsHandler = async () => {
    await this.updateActiveSessions();
  };

  @delegate('server')
  async updateActiveSessions() {
    const sessions = this._rcCallControl?.sessions || [];

    const callControlSessions = sessions
      .filter((session) => isConnectedCall(session))
      .map((session) => {
        const conferenceSessions = findConferenceParticipants(
          session,
          sessions,
          this._extensionInfo.info,
          process.env.THEME_SYSTEM === 'spring-ui'
            ? (_, partyId) => {
                return this._preInsertCall.checkParticipantStillExist(
                  session,
                  partyId,
                );
              }
            : undefined,
        );

        return normalizeToActiveCallControlSession(
          session,
          conferenceSessions,
          // only process data in new version app, old version keep original logic
          process.env.THEME_SYSTEM === 'spring-ui'
            ? this._numberValidate.getPartyExtensionNumber
            : undefined,
        );
      })
      .filter((session) =>
        this.skipConferenceCall ? !session.isConferenceCall : true,
      );
    this._updateActiveSessions(JSON.parse(JSON.stringify(callControlSessions)));
  }

  @action
  private _updateActiveSessions(
    callControlSessions: ActiveCallControlSessionData[],
  ) {
    this.data.timestamp = Date.now();
    this.data.sessions = callControlSessions;
  }

  private _newSessionHandler(session: TelephonySession) {
    session.removeListener(
      CallControlEvents.status,
      this._updateSessionsStatusHandler,
    );
    session.removeListener(
      CallControlEvents.muted,
      this._updateSessionsHandler,
    );
    session.removeListener(
      CallControlEvents.recordings,
      this._updateSessionsHandler,
    );
    session.on(CallControlEvents.status, this._updateSessionsStatusHandler);
    session.on(CallControlEvents.muted, this._updateSessionsHandler);
    session.on(CallControlEvents.recordings, this._updateSessionsHandler);
    // Handle the session update at the end of function to reduce the probability of empty rc call
    // sessions
    this._updateSessionsHandler();
  }

  @action
  removeActiveSession() {
    this.data.activeSessionId = null;
  }

  setActiveSessionId(telephonySessionId: string) {
    if (!telephonySessionId || this.data.activeSessionId === telephonySessionId)
      return;

    this._setActiveSessionId(telephonySessionId);
  }

  @action
  private _setActiveSessionId(telephonySessionId: string) {
    this.data.activeSessionId = telephonySessionId;
  }

  private _getTrackEventName(name: string) {
    // in spring-ui always be same name
    if (process.env.THEME_SYSTEM === 'spring-ui') return name;

    // TODO: remove those logic after all project switch to spring-ui
    const currentPath = this._router?.currentPath;
    const CallLogSection = getRef(this).modules?.CallLogSection;
    const showCallLog = CallLogSection?.show;
    const showNotification = CallLogSection?.showNotification;

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

  protected muteErrorHandle = async (error: any) => {
    // TODO: fix error handling with instanceof
    if (error.response && !error.response._text) {
      error.response._text = await error.response.clone().text();
    }
    if (conflictError(error)) {
      this._toast.warning({
        message: t('muteConflictError'),
      });
    } else if (!(await this._availabilityMonitor?.checkIfHAError(error))) {
      this._showGeneralError();
    }
  };

  @delegate('mainClient')
  protected async muteWithWebphone(currentDeviceWebphoneId: string) {
    await this._webphone.mute(currentDeviceWebphoneId, this.muteErrorHandle);
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.mute),
  ])
  @delegate('server')
  async mute(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      // if current device call, using webphone mute directly
      if (currentDeviceWebphoneId) {
        await this.muteWithWebphone(currentDeviceWebphoneId);
      }
      const session = this._getSessionById(telephonySessionId)!;
      await session.mute();
    } catch (error: any) {
      await this.muteErrorHandle(error);
    }
    this.clearCallControlBusyTimestamp();
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.unmute),
  ])
  @delegate('server')
  async unmute(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      // if current device call, using webphone mute directly
      if (currentDeviceWebphoneId) {
        // No need to handle error here, webphone will handle it
        await this._webphone.unmute(currentDeviceWebphoneId);
      }
      const session = this._getSessionById(telephonySessionId)!;
      await session.unmute();
      this.clearCallControlBusyTimestamp();
    } catch (error: any) {
      // TODO: fix error handling with instanceof
      if (error.response && !error.response._text) {
        error.response._text = await error.response.clone().text();
      }
      if (conflictError(error)) {
        this._toast.warning({
          message: t('unMuteConflictError'),
        });
      } else if (!(await this._availabilityMonitor?.checkIfHAError(error))) {
        this._showGeneralError();
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  async transferUnmuteHandler(telephonySessionId: string) {
    try {
      const session = this._getSessionById(telephonySessionId);
      if (session?.party?.muted) {
        await session.unmute();
      }
    } catch (error) {
      // https://jira_domain/browse/NTP-1308
      // Unmute before transfer due to we can not sync the mute status after transfer.
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.record),
  ])
  @delegate('server')
  async startRecord(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId)!;
      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      // Call control record API failed when conference call(PLA-80490)
      // use webphone API instead
      if (currentDeviceWebphoneId && session.origin?.type === 'Conference') {
        await this._webphone.startRecord(currentDeviceWebphoneId);
      } else {
        const recordingId = this.getRecordingId(session);
        if (!recordingId) {
          await session.createRecord();
        } else {
          await session.resumeRecord(recordingId);
        }
      }
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
        if (process.env.THEME_SYSTEM === 'spring-ui') {
          this._toast.danger({
            message: t('recordErrorWithoutCode'),
          });
          return;
        }
        this._toast.danger({
          message: t('recordError', {
            errorCode: errors[0].errorCode,
          }),
        });
      }
    }
  }

  getRecordingId(session: TelephonySession) {
    const recording = session.recordings[0];
    const recodingId = recording && recording.id;
    return recodingId;
  }

  activeCallTelephonyIdChange$ = fromWatch(
    this,
    () => this.activeSession?.telephonySessionId,
  ).pipe(share());

  sessionsMap$ = fromWatchValue(this, () => this.sessionsMap).pipe(share());

  private bindServerListener() {
    // TODO: old version app, will be removed in the future
    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      fromWatch(this, () => this.activeCallTelephonyIdChange$)
        .pipe(
          tap(() => this.closeDrawer()),
          takeUntilAppDestroy,
        )
        .subscribe();

      return;
    }

    this._preInsertCall.listenPreinsertServerHandler(this.sessionsMap$);
  }

  protected stopRecordErrorHandle = async (error: any) => {
    console.log('stop record error:', error);

    this._toast.danger({
      message: t('pauseRecordError'),
    });
  };

  @delegate('mainClient')
  protected async stopRecordWithWebphone(currentDeviceWebphoneId: string) {
    await this._webphone.stopRecord(
      currentDeviceWebphoneId,
      this.stopRecordErrorHandle,
    );
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.stopRecord),
  ])
  @delegate('server')
  async stopRecord(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId)!;
      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      // if current device call, using webphone record directly
      if (currentDeviceWebphoneId && session.origin?.type === 'Conference') {
        await this.stopRecordWithWebphone(currentDeviceWebphoneId);
      } else {
        const recordingId = this.getRecordingId(session);
        await session.pauseRecord(recordingId);
      }
    } catch (error) {
      await this.stopRecordErrorHandle(error);
    }
    this.clearCallControlBusyTimestamp();
  }

  protected _hangUpErrorHandle = async (error: any) => {
    // TODO: fix error handling with instanceof
    console.error('hangup error', error);
    if (!(await this._availabilityMonitor?.checkIfHAError(error))) {
      this._showGeneralError();
    }
  };

  @delegate('mainClient')
  protected async _hangupWithWebphone(currentDeviceWebphoneId: string) {
    await this._webphone.hangup(
      currentDeviceWebphoneId,
      this._hangUpErrorHandle,
    );
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.hangup),
  ])
  @delegate('server')
  async checkIfConferenceCall(telephonySessionId: string) {
    const session = this._getSessionById(telephonySessionId)!;
    return checkIfConferenceCall(session);
  }

  //TODO refactor to move leave conf as host as separate optional module
  @delegate('server')
  async hangUp(telephonySessionId: string, hangupOnlyHost?: boolean) {
    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      const isConferenceCall = await this.checkIfConferenceCall(
        telephonySessionId,
      );
      const enableLeaveConferenceAsHost = this.enableLeaveConferenceAsHost;

      // isLeaveConferenceAsHostEnabled
      if (isConferenceCall && enableLeaveConferenceAsHost) {
        this.openDrawer(telephonySessionId);
        return;
      }
    }
    await this.endCall(telephonySessionId, hangupOnlyHost);
  }

  @delegate('server')
  async endCall(telephonySessionId: string, hangupOnlyHost?: boolean) {
    // TODO: when the call is preinsert call, should wait the call connected, then hangup in the background
    try {
      this.setCallControlBusyTimestamp();
      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      const session = this._getSessionById(telephonySessionId)!;
      const isConferenceCall = await this.checkIfConferenceCall(
        telephonySessionId,
      );
      if (isConferenceCall && hangupOnlyHost) {
        session.removeParty(session.party.id, { keepConferenceAlive: true });
        return;
      }

      // if current device call, using webphone mute directly
      if (currentDeviceWebphoneId) {
        logger.log(`[${this.identifier}] end call with webphone`);
        await this._hangupWithWebphone(currentDeviceWebphoneId);
      } else {
        await session.drop();
      }

      this._onCallEndFunc?.();
      // in spring-ui, when end call, the list will refresh, so no need to sleep here
      if (process.env.THEME_SYSTEM !== 'spring-ui') {
        // avoid hung up sync slow and user click multiple times, because the call state will sync with socket will take a while.
        await sleep(800);
      }
    } catch (error: any) {
      await this._hangUpErrorHandle(error);
    }
    this.clearCallControlBusyTimestamp();
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.voicemail),
  ])
  @delegate('server')
  async reject(telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();

      const session = this._getSessionById(telephonySessionId)!;
      // !If is a queue call, ignore is performed
      if (session.party.queueCall) {
        return await this.ignore(telephonySessionId);
      }

      logger.log(`[${this.identifier}] to voicemail with session`);
      await session.toVoicemail();
      this.clearCallControlBusyTimestamp();
    } catch (error: any) {
      // TODO: fix error handling with instanceof
      if (!(await this._availabilityMonitor?.checkIfHAError(error))) {
        this._showGeneralError();
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  @delegate('mainClient')
  protected async _switch(telephonySessionId: string) {
    try {
      await this.transferUnmuteHandler(telephonySessionId);
      const activeCall = this._presence.calls.find(
        (call) => call.telephonySessionId === telephonySessionId,
      )!;
      await this._webphone.switchCall(
        activeCall as any,
        this._regionSettings.homeCountryId,
      );
      return this.getSession(telephonySessionId)?.sessionId;
    } catch (error: any) {
      // TODO: fix error handling with instanceof
      if (!(await this._availabilityMonitor?.checkIfHAError(error))) {
        this._showGeneralError();
      }
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.confirmSwitch),
  ])
  @delegate('server')
  async switch(telephonySessionId: string) {
    this.setCallControlBusyTimestamp();
    const switchedSessionId = await this._switch(telephonySessionId);
    this.clearCallControlBusyTimestamp();
    if (switchedSessionId) {
      this._onCallSwitchedFunc?.(switchedSessionId);
    }

    return switchedSessionId;
  }

  protected holdErrorHandle = async (error: any) => {
    // TODO: fix error handling with instanceof
    if (error.response && !error.response._text) {
      error.response._text = await error.response.clone().text();
    }
    if (conflictError(error)) {
      this._toast.warning({
        message: t('holdConflictError'),
      });
    } else if (!(await this._availabilityMonitor?.checkIfHAError(error))) {
      this._showGeneralError();
    }
  };

  @delegate('mainClient')
  protected async holdWithWebphone(currentDeviceWebphoneId: string) {
    await this._webphone.hold(currentDeviceWebphoneId, this.holdErrorHandle);
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.hold),
  ])
  @delegate('server')
  async hold(telephonySessionId: string) {
    this.setCallControlBusyTimestamp();
    try {
      const session = this._getSessionById(telephonySessionId)!;
      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      // if current device call, using webphone directly
      if (currentDeviceWebphoneId) {
        await this.holdWithWebphone(currentDeviceWebphoneId);
      } else {
        await session.hold();
      }
    } catch (error: any) {
      this.holdErrorHandle(error);
    }
    this.clearCallControlBusyTimestamp();
  }

  protected unholdErrorHandle = async (error: any) => {
    // TODO: fix error handling with instanceof
    if (error.response && !error.response._text) {
      error.response._text = await error.response.clone().text();
    }
    if (conflictError(error)) {
      this._toast.warning({
        message: t('unHoldConflictError'),
      });
    } else if (!(await this._availabilityMonitor?.checkIfHAError(error))) {
      this._showGeneralError();
    }
  };

  @delegate('mainClient')
  protected async _unholdWithWebphone(currentDeviceWebphoneId: string) {
    const session = this._webphone.originalSessions?.[currentDeviceWebphoneId];
    if (session?.localHold) {
      await this._webphone.unhold(
        currentDeviceWebphoneId,
        this.unholdErrorHandle,
      );
      return true;
    }
    return false;
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.unhold),
  ])
  @delegate('server')
  async unhold(telephonySessionId: string) {
    this.setCallControlBusyTimestamp();
    try {
      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      let result: boolean | undefined;
      // if current device call, using webphone directly
      if (currentDeviceWebphoneId) {
        result = await this._unholdWithWebphone(currentDeviceWebphoneId);
      }
      if (!currentDeviceWebphoneId || !result) {
        const session = this._getSessionById(telephonySessionId)!;
        await session.unhold();
      }

      // spring-ui not handle those logic inside the active call control
      // TODO: remove those logic after all project switch to spring-ui
      if (process.env.THEME_SYSTEM !== 'spring-ui') {
        this.setActiveSessionId(telephonySessionId);
      }
    } catch (error: any) {
      await this.unholdErrorHandle(error);
    }
    this.clearCallControlBusyTimestamp();
  }

  @delegate('mainClient')
  protected async _replyWithMessage(
    params: ReplyWithTextParams,
    currentDeviceWebphoneId: string,
  ) {
    if (params.replyWithText === '') {
      this._toast.danger({ message: t('replyEmptyError'), ttl: 3000 });
      return;
    }

    const webphoneReplyOption = getWebphoneReplyMessageOption(params) as any;
    const result = await this._webphone.replyWithMessage(
      currentDeviceWebphoneId,
      webphoneReplyOption,
      (error: any) => {
        logger.error('replyWithMessage error', error);
        // TODO: check the logic of error handling
        this._showGeneralError();
      },
    );
    if (result) {
      this._toast.success({ message: t('replyCompleted') });
    }
  }

  @track((_, params: ReplyWithTextParams) => {
    return [
      trackEvents.executionReplyWithMessage,
      {
        'message type': params.replyWithPattern ? 'Pattern' : 'Custom',
      },
    ];
  })
  @delegate('server')
  async replyWithMessage(
    params: ReplyWithTextParams,
    telephonySessionId: string,
  ) {
    this.setCallControlBusyTimestamp();
    const session = this._getSessionById(telephonySessionId);
    if (!session) {
      return false;
    }
    const currentDeviceWebphoneId =
      this._getCurrentDeviceCallsBySessionId(telephonySessionId);
    await this._replyWithMessage(params, currentDeviceWebphoneId);
    this.clearCallControlBusyTimestamp();
  }

  @delegate('server')
  async toVoicemail(voicemailId: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId);
      if (!session) {
        return false;
      }
      await session.transfer({ voicemail: voicemailId });
      this.clearCallControlBusyTimestamp();
      this._toast.success({ message: t('transferCompleted') });
    } catch (error) {
      console.error('toVoicemail error', error);
      this._toast.warning({ message: t('toVoiceMailError') });
      this.clearCallControlBusyTimestamp();
    }
  }

  @delegate('server')
  async completeWarmTransfer(telephonySession: string) {
    try {
      this.setCallControlBusyTimestamp();

      const { isOriginal, relatedTelephonySessionId } =
        this.transferCallMapping[telephonySession];

      const session = this._getSessionById(
        isOriginal ? telephonySession : relatedTelephonySessionId,
      )!;
      const transferSession = this._getSessionById(
        isOriginal ? relatedTelephonySessionId : telephonySession,
      );

      if (!transferSession) {
        return false;
      }
      await session.bridge({
        telephonySessionId: transferSession.id,
        partyId: transferSession.party.id,
      });
      this.clearCallControlBusyTimestamp();
      this._toast.success({ message: t('transferCompleted') });
    } catch (error) {
      console.error('warmTransfer error', error);
      this._showGeneralError();
      this.clearCallControlBusyTimestamp();
    }
  }

  @track(trackEvents.transfer)
  @delegate('server')
  async transfer(transferNumber: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const phoneNumber = await this.getValidPhoneNumber(transferNumber);
      if (phoneNumber) {
        const session = this._getSessionById(telephonySessionId)!;
        const params: { phoneNumber?: string; extensionNumber?: string } = {};
        if (phoneNumber.startsWith('+')) {
          params.phoneNumber = phoneNumber;
        } else {
          params.extensionNumber = phoneNumber;
        }
        await session.transfer(params);
        this.clearCallControlBusyTimestamp();
        this._toast.success({
          message: t('transferCompleted'),
        });
      }
    } catch (error: any) {
      // TODO: fix error handling with instanceof
      if (!(await this._availabilityMonitor?.checkIfHAError(error))) {
        this._toast.warning({ message: t('transferError') });
      }
      this.clearCallControlBusyTimestamp();
    }
  }

  async getValidPhoneNumber(phoneNumber: string, withMainNumber?: boolean) {
    let validPhoneNumber: string | undefined;
    if (!this._permissionCheck) {
      const validatedResult = validateNumbers({
        allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        phoneNumbers: [phoneNumber],
      });
      validPhoneNumber = validatedResult[0];
    } else {
      const isEDPEnabled = this._appFeatures?.isEDPEnabled;
      const validatedResult = isEDPEnabled
        ? this._numberValidate.validate([phoneNumber])
        : await this._numberValidate.validateNumbers([phoneNumber]);

      if (!validatedResult.result) {
        this._numberValidate.handleValidateToasts(validatedResult);

        return;
      }

      if (isEDPEnabled) {
        const parsedNumbers = await this._numberValidate.parseNumbers([
          phoneNumber,
        ]);
        validPhoneNumber =
          parsedNumbers?.[0].availableExtension ??
          parsedNumbers?.[0].parsedNumber;
      } else {
        validPhoneNumber = (validatedResult as ValidateParsingResult)
          .numbers?.[0]?.e164;
      }
    }

    let result = validPhoneNumber;
    if (withMainNumber && validPhoneNumber?.indexOf('+') === -1) {
      result = [this._accountInfo.mainCompanyNumber, validPhoneNumber].join(
        '*',
      );
    }

    return result;
  }

  @delegate('server')
  async flip(flipValue: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const session = this._getSessionById(telephonySessionId)!;
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
  @delegate('server')
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
          allowRegionSettings: this._brand.brandConfig.allowRegionSettings!,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          phoneNumbers: [forwardNumber],
        });
        validPhoneNumber = validatedResult[0];
      } else {
        const isEDPEnabled = this._appFeatures?.isEDPEnabled;
        const _validatedResult = isEDPEnabled
          ? this._numberValidate.validate([forwardNumber])
          : await this._numberValidate.validateNumbers([forwardNumber]);
        validatedResult = _validatedResult;

        if (!_validatedResult.result) {
          this._numberValidate.handleValidateToasts(_validatedResult);

          return false;
        }
        if (isEDPEnabled) {
          const parsedNumbers = await this._numberValidate.parseNumbers([
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

      if (!validPhoneNumber) {
        return;
      }

      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      // if current device call, using webphone directly
      if (currentDeviceWebphoneId) {
        // No need to handle error here, webphone module handle it
        await this._webphone.forward(currentDeviceWebphoneId, validPhoneNumber);
      } else {
        const params: { phoneNumber?: string; extensionNumber?: string } = {};
        if (forwardNumber.length > 5) {
          params.phoneNumber = forwardNumber;
        } else {
          params.extensionNumber = forwardNumber;
        }
        return session.forward(params);
      }
      this._toast.success({
        message: t('forwardSuccess'),
      });
      if (typeof this._onCallEndFunc === 'function') {
        this._onCallEndFunc();
      }
      return true;
    } catch (e) {
      console.error('transfer fail', e);
      this._toast.warning({
        message: t('failWithoutStatusCode', {
          brandName: this._brand.name,
        }),
      });
      return false;
    }
  }

  // DTMF handing by webphone session temporary, due to rc call session doesn't support currently
  @delegate('server')
  async sendDTMF(dtmfValue: string, telephonySessionId: string) {
    try {
      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);
      // if current device call, using webphone directly
      if (currentDeviceWebphoneId) {
        await this._webphone.sendDTMF(dtmfValue, currentDeviceWebphoneId);
      }
    } catch (error) {
      console.log('send dtmf error', error);
      throw error;
    }
  }

  @action
  setPickUpCallData(data: IPickUpCallDataMap) {
    this.pickUpCallDataMap = { ...data };
  }

  @delegate('server')
  private async _answer(telephonySessionId: string, needPickupCall = false) {
    try {
      this.setCallControlBusyTimestamp();

      const currentDeviceWebphoneId =
        this._getCurrentDeviceCallsBySessionId(telephonySessionId);

      // if current device call, using webphone directly
      if (currentDeviceWebphoneId && !needPickupCall) {
        await this._webphone.answer(currentDeviceWebphoneId);
      } else {
        const data = this.pickUpCallDataMap[telephonySessionId];
        await this.pickUpCall(telephonySessionId, data);
      }
    } finally {
      this.clearCallControlBusyTimestamp();
    }
  }

  public async pickUpCall(
    telephonySessionId: string,
    data?: IPickUpCallParams,
  ) {
    const session = this.ringMessages[telephonySessionId] ?? {};
    await this._webphone.pickupInboundCall(
      data ?? {
        serverId: session.serverId!,
        sessionId: session.sessionId!,
        telephonySessionId: session.telephonySessionId!,
        // @ts-ignore
        toNumber: session.to!,
        // @ts-ignore
        fromNumber: session.from!,
      },
    );
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.answer),
  ])
  async answer(telephonySessionId: string) {
    const currentDeviceWebphoneId =
      this._getCurrentDeviceCallsBySessionId(telephonySessionId);
    let needPickupCall: boolean | undefined = false;
    if (currentDeviceWebphoneId) {
      needPickupCall = await this._webphone.switchWebphoneInstance();
    }
    try {
      await this._answer(telephonySessionId, needPickupCall);
    } catch (error) {
      this.logger.log('answer failed.', error);
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.holdAndAnswer),
  ])
  async answerAndHold(telephonySessionId: string) {
    const currentDeviceWebphoneId =
      this._getCurrentDeviceCallsBySessionId(telephonySessionId);
    let needPickupCall: boolean | undefined = false;
    if (currentDeviceWebphoneId) {
      needPickupCall = await this._webphone.switchWebphoneInstance();
    }
    // currently, the logic is same as answer
    try {
      await this._answer(telephonySessionId, needPickupCall);
    } catch (error) {
      console.log('answer hold failed.', error);
    }
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.ignore),
  ])
  @delegate('server')
  async ignore(telephonySessionId: string) {
    const currentDeviceWebphoneId =
      this._getCurrentDeviceCallsBySessionId(telephonySessionId);
    if (!currentDeviceWebphoneId) {
      logger.log(
        '[ActiveCallControl] not in current device, not able to ignore.',
      );
      return;
    }

    this.setCallControlBusyTimestamp();

    try {
      const session = this._getSessionById(telephonySessionId)!;
      await this._webphone.reject(currentDeviceWebphoneId);
      this.onCallIgnoreFunc?.(session.party.id);
      // hack for update sessions, then incoming call log page can re-render
      setTimeout(async () => await this.updateActiveSessions(), 0);
    } catch (error) {
      logger.log('[ActiveCallControl] ignore failed.', error);
    }

    this.clearCallControlBusyTimestamp();
  }

  @track((that: ActiveCallControl) => [
    that._getTrackEventName(trackEvents.endAndAnswer),
  ])
  @delegate('server')
  async answerAndEnd(telephonySessionId: string, needPickupCall = false) {
    try {
      if (this.busy) return;
      const currentActiveCalls = this._rcCallControl!.sessions.filter((s) => {
        const currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(
          s.id,
        );
        return (
          s.id !== telephonySessionId &&
          currentDeviceWebphoneId &&
          (s.party?.status?.code === PartyStatusCode.answered ||
            (s.party?.direction === callDirection.outbound &&
              s.party?.status?.code === PartyStatusCode.proceeding))
        );
      });
      for (const s of currentActiveCalls) {
        await this.hangUp(s.id);
      }

      await this._answer(telephonySessionId, needPickupCall);
    } catch (error) {
      console.log('answer and end fail.');
      console.error(error);
    }
  }

  // TODO: after full migrate to spring-ui, can remove the condition
  // only spring-ui track at root, others track from view
  @track(trackEvents.transferAskFirst, process.env.THEME_SYSTEM === 'spring-ui')
  @delegate('server')
  async startWarmTransfer(transferNumber: string, telephonySessionId: string) {
    try {
      this.setCallControlBusyTimestamp();
      const toNumber = await this.getValidPhoneNumber(transferNumber);
      if (!toNumber) {
        throw new Error('Invalid phone number');
      }
      return this.makeCall({
        toNumber,
        transferSessionId: telephonySessionId,
      });
    } catch (error) {
      this._toast.danger({
        message: t('somethingWentWrong'),
      });
    } finally {
      this.clearCallControlBusyTimestamp();
    }
  }

  @action
  setWarmTransferMapping(originalId: string, transferredId: string) {
    this.transferCallMapping[originalId] = {
      relatedTelephonySessionId: transferredId,
      isOriginal: true,
    };
    this.transferCallMapping[transferredId] = {
      relatedTelephonySessionId: originalId,
      isOriginal: false,
    };
  }

  @action
  cleanCurrentWarmTransferData(cleanCalls: ICall[]) {
    cleanCalls.forEach((call) => {
      const telephonySessionId = call.telephonySessionId!;
      const transferringData = this.transferCallMapping[telephonySessionId];

      if (transferringData) {
        logger.log(`[${this.identifier}] clean not exist warm transfer call`, {
          telephonySessionId,
          ...transferringData,
        });

        delete this.transferCallMapping[call.telephonySessionId!];
        delete this.transferCallMapping[
          transferringData.relatedTelephonySessionId
        ];
      }
    });
  }

  // TODO: similar logic in apps/micro-phone/src/app/services/Call/Call.ts:475 should unify
  private async getDefaultFromNumber() {
    const isWebphone = this._callingSettings.isWebphoneMode;

    if (isWebphone) {
      return this._callingSettings.fromNumber;
    }

    const theFromNumber = this._callingSettings.myLocation;

    if (theFromNumber && theFromNumber.length > 0) {
      const [formatted] =
        (await this._numberValidate.parseNumbers([theFromNumber])) || [];
      return formatted?.parsedNumber;
    }

    return undefined;
  }

  @delegate('server')
  async makeCall(params: ModuleMakeCallParams) {
    try {
      // pre-push a call into all call
      const result = await this._webphone.makeCall({
        fromNumber:
          params.fromNumber || (await this.getDefaultFromNumber()) || undefined,
        homeCountryId: params.homeCountryId!,
        toNumber: params.toNumber!,
      });

      if (result && result.id && params.transferSessionId) {
        this._initWebphoneSessionEvents(result.id, params.transferSessionId);
      }
      return result;
    } catch (error) {
      console.log('make call fail.', error);
    }

    return null;
  }

  @delegate('mainClient')
  private async _initWebphoneSessionEvents(
    webphoneSessionId: string,
    transferSessionId?: string,
  ) {
    const webphoneOriginalSession =
      this._webphone.originalSessions[webphoneSessionId]!;
    // TODO: should fix the memory leak issue, should remove the event listener when the session is destroyed or done
    webphoneOriginalSession.on('progress', async (request) => {
      // Event "progress" is triggered 3 times for establishing webphone session
      // The first two triggers are missing party data in the request headers
      const partyData = readPartyDataFromHeaders(request.headers);
      if (partyData) {
        await this._onWebphoneSessionProgress(
          partyData.sessionId,
          transferSessionId,
        );
      }
    });
  }

  /**
   * merge two calls into a conference
   *
   * @returns the conference telephonySessionId
   */
  @delegate('server')
  async mergeCalls(
    telephonySessionId: string,
    telephonySessionIdToMergeWith: string,
  ): Promise<string | undefined> {
    const session = this._getSessionById(telephonySessionId);
    const mergeWithSession = this._getSessionById(
      telephonySessionIdToMergeWith,
    );
    if (!session || !mergeWithSession) {
      logger.log('mergeCalls: session not found', !session, !mergeWithSession);
      return;
    }

    const sourceSession = this.getSession(telephonySessionId);
    const mergeWithSessionData = this.getSession(telephonySessionIdToMergeWith);
    if (
      (sourceSession &&
        sourceSession.conferenceParticipants.length >=
          MAXIMUM_CONF_PARTICIPANTS) ||
      (mergeWithSessionData &&
        mergeWithSessionData.conferenceParticipants.length >=
          MAXIMUM_CONF_PARTICIPANTS)
    ) {
      this._toast.danger({
        message: t('tooManyParticipants'),
      });
      return;
    }

    // https://developers.ringcentral.com/guide/voice/conference
    if (
      session.origin.type !== CONFERENCE_ORIGIN_TYPE &&
      mergeWithSession.origin.type !== CONFERENCE_ORIGIN_TYPE
    ) {
      try {
        this.setCallControlBusyTimestamp();
        const conferenceSession = await this._createConferenceSession();

        await conferenceSession.bringInParty({
          partyId: session.party.id,
          sessionId: session.sessionId,
        });
        logger.log(`[${this.identifier}] bringInParty`, session);
        // pre inset the session to avoid the that show in end call
        if (process.env.THEME_SYSTEM === 'spring-ui') {
          this._preInsertCall.setPreinsert(session.id, 'bringInParty');
        }

        await conferenceSession.bringInParty({
          partyId: mergeWithSession.party.id,
          sessionId: mergeWithSession.sessionId,
        });
        logger.log(`[${this.identifier}] bringInParty`, mergeWithSession);

        if (process.env.THEME_SYSTEM === 'spring-ui') {
          this._preInsertCall.setPreinsert(mergeWithSession.id, 'bringInParty');
        }

        this._toast.success({
          message: t('callsMerged'),
        });

        return conferenceSession.id as string;
      } catch (err) {
        console.log('error in mergeCalls', err);

        this._toast.danger({
          message: t('somethingWentWrong'),
        });
      } finally {
        this.clearCallControlBusyTimestamp();
      }
      return;
    }
    try {
      this.setCallControlBusyTimestamp();

      const conferenceSessionId = await this.addPartyToSession(
        session,
        mergeWithSession,
      );

      this._toast.success({
        message: t('callsMerged'),
      });
      return conferenceSessionId;
    } catch (err) {
      console.log('error in mergeCalls one', err);
      this._toast.danger({
        message: t('somethingWentWrong'),
      });
    } finally {
      this.clearCallControlBusyTimestamp();
    }
  }

  private async addPartyToSession(
    session: TelephonySession,
    mergeWithSession: TelephonySession,
  ) {
    if (session.origin.type === CONFERENCE_ORIGIN_TYPE) {
      await session.bringInParty({
        partyId: mergeWithSession.party.id,
        sessionId: mergeWithSession.id,
      });

      if (process.env.THEME_SYSTEM === 'spring-ui') {
        this._preInsertCall.setPreinsert(mergeWithSession.id, 'bringInParty');
      }
      return session.id;
    }

    if (mergeWithSession.origin.type === CONFERENCE_ORIGIN_TYPE) {
      await mergeWithSession.bringInParty({
        partyId: session.party.id,
        sessionId: session.id,
      });
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        this._preInsertCall.setPreinsert(session.id, 'bringInParty');
      }

      return mergeWithSession.id;
    }
  }

  private async _createConferenceSession() {
    const conferenceSession = await this._rcCallControl!.createConference();
    const voiceCallToken = conferenceSession.data.voiceCallToken;
    await this._initConferenceVoiceCall(voiceCallToken);
    return conferenceSession;
  }

  @delegate('server')
  async _initConferenceVoiceCall(voiceCallToken: string) {
    const webphoneSession = await this.makeCall({
      toNumber: voiceCallToken,
      homeCountryId: this._regionSettings.homeCountryId,
    });

    if (webphoneSession) {
      // Wait for the conference webphone session to be accepted
      await this._waitForWebphoneSessionAccepted(webphoneSession.id);
    }

    return webphoneSession;
  }

  @delegate('mainClient')
  async _waitForWebphoneSessionAccepted(webphoneSessionId: string) {
    const sipSession = this._webphone.originalSessions[webphoneSessionId];
    if (!sipSession) {
      throw new Error('conferencing session not found');
    }

    const reject$ = merge(
      fromEvent(sipSession, 'cancel'),
      fromEvent(sipSession, 'failed'),
      fromEvent(sipSession, 'rejected'),
      fromEvent(sipSession, 'terminated'),
    ).pipe(
      tap((e) => {
        logger.log('[waitForWebphoneSessionAccepted] error', e);
        throw new Error('conferencing failed');
      }),
    );

    const resolve$ = fromEvent(sipSession, 'accepted').pipe(
      map(() => sipSession.id),
    );

    const timeout$ = timer(DEFAULT_CONF_ACCEPT_TIMEOUT).pipe(
      tap(() => {
        throw new Error('conferencing timeout');
      }),
    );

    return await firstValueFrom(merge(reject$, resolve$, timeout$));
  }

  @track(trackEvents.clickConfirmRemoveParticipant)
  @delegate('server')
  async removeConferenceParticipant(
    telephonySessionId: string,
    removedPartyId: string,
  ) {
    try {
      this.setCallControlBusyTimestamp();
      const confSession = this._getSessionById(telephonySessionId)!;
      await confSession.removeParty(removedPartyId);

      if (process.env.THEME_SYSTEM === 'spring-ui') {
        await this._preInsertCall.setPreinsert(
          createConferenceParticipantRemovalId(
            telephonySessionId,
            removedPartyId,
          ),
          'partyRemoved',
        );
        await this.updateActiveSessions();
      }
    } catch (error) {
      console.log('removeConferenceParticipant error', error);
      this._toast.danger({
        message: t('somethingWentWrong'),
      });
    } finally {
      this.clearCallControlBusyTimestamp();
    }
  }

  @delegate('server')
  private async _onWebphoneSessionProgress(
    telephonySessionId: string,
    transferSessionId?: string,
  ) {
    // For SpringUI: Always set warm transfer mapping if transferSessionId is provided
    // Keep original logic for other projects
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      if (telephonySessionId && transferSessionId) {
        this.setWarmTransferMapping(transferSessionId, telephonySessionId);
      }
    } else {
      // spring-ui not handle those logic inside the active call control
      // TODO: remove those logic after all project switch to spring-ui
      if (this.activeSessionId !== telephonySessionId) {
        this.setActiveSessionId(telephonySessionId);

        if (transferSessionId) {
          this.setWarmTransferMapping(transferSessionId, telephonySessionId);
        }
      }
    }
  }

  /**
   * get active session by telephonySessionId
   */
  getActiveSession(telephonySessionId: string | null) {
    if (!telephonySessionId) {
      return undefined;
    }
    return this.activeSessions[telephonySessionId];
  }

  getSession(telephonySessionId: string) {
    return this.sessionsMap[telephonySessionId];
  }

  /**
   * Get the active session(accepted call)
   */
  @computed(({ activeSessionId, activeSessions }: ActiveCallControl) => [
    activeSessionId,
    activeSessions,
  ])
  get activeSession() {
    return this.getActiveSession(this.activeSessionId);
  }

  @computed(({ sessions }: ActiveCallControl) => [sessions])
  get ringSessions() {
    if (!this.sessions) {
      return [];
    }
    return this.sessions.filter((session: ActiveCallControlSessionData) =>
      isProceeding(session),
    );
  }

  @computed((that: ActiveCallControl) => [that.sessions, that.timestamp])
  get activeSessions() {
    return this.sessions.reduce((acc, session) => {
      const webphoneSession = this._findWebphoneSession(
        session.telephonySessionId,
      );

      acc[session.id!] = normalizeSession(session, webphoneSession);
      return acc;
    }, {} as Record<string, ActiveSession>);
  }

  @computed((that: ActiveCallControl) => [that._presence.calls])
  get sessionIdToTelephonySessionIdMapping() {
    return this._presence.calls.reduce((accumulator, call) => {
      const { telephonySessionId, sessionId } = call;
      accumulator[sessionId!] = telephonySessionId!;
      return accumulator;
    }, {} as Record<string, string>);
  }

  @computed((that: ActiveCallControl) => [that._webphone.sessions])
  get currentDeviceCallsMap(): ICurrentDeviceCallsMap {
    if (!this._webphone) {
      return {};
    }
    const currentDeviceCallsMap = {} as ICurrentDeviceCallsMap;
    this._webphone.sessions.forEach((session) => {
      const telephonySessionId = session.partyData?.sessionId!;
      currentDeviceCallsMap[telephonySessionId] = session.id;
    });
    return currentDeviceCallsMap;
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
    return this._appFeatures.hasCallControl;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }

  get ttl() {
    return this._ttl;
  }

  get hasCallInRecording() {
    return this.sessions.some((session) => isRecording(session));
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

  @computed
  get sessionsMap() {
    return this.sessions.reduce((acc, session) => {
      acc[session.telephonySessionId] = session;
      return acc;
    }, {} as Record<string, ActiveCallControlSessionData | undefined>);
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

  @track((that: ActiveCallControl, entry: string) => [
    trackEvents.phoneConferenceCallMerge,
    { entry },
  ])
  clickConferenceCallMerge(entry: string) {
    //
  }

  @track((that: ActiveCallControl, path: string) => {
    const target = that._analytics!.getTrackTarget()!;
    return [trackEvents.openEntityDetailLink, { path: path || target.router }];
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

  private _getSessionById(telephonySessionId: string) {
    return this._rcCallControl!.sessions.find(
      (s) => s.id === telephonySessionId,
    );
  }

  public _findWebphoneSession(telephonySessionId: string) {
    return this._webphone.sessions.find(
      (x) => x.partyData?.sessionId === telephonySessionId,
    );
  }

  private _getCurrentDeviceCallsBySessionId(telephonySessionId: string) {
    return this.currentDeviceCallsMap[telephonySessionId];
  }

  private _showGeneralError() {
    this._toast.warning({ message: t('generalError') });
  }

  getTelephonySessionIdBySessionId = (sessionId: string) =>
    this.sessionIdToTelephonySessionIdMapping[sessionId];

  get skipConferenceCall() {
    return Boolean(this._activeCallControlOptions?.skipConferenceCall);
  }

  get enableLeaveConferenceAsHost() {
    return Boolean(
      this._activeCallControlOptions?.getEnableLeaveConferenceAsHost?.(),
    );
  }
}
