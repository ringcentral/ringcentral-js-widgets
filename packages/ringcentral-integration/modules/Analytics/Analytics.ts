import { sleep } from '@ringcentral-integration/utils';

import RouterInteraction from '../../../ringcentral-widgets/modules/RouterInteraction';
import moduleStatuses from '../../enums/moduleStatuses';
import { Pendo, Segment } from '../../lib/Analytics';
import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import saveBlob from '../../lib/saveBlob';
import { callingModes } from '../CallingSettings/callingModes';
import { ExtensionInfo } from '../ExtensionInfo';
import { analyticsActionTypes, AnalyticsActionTypes } from './actionTypes';
import getAnalyticsReducer from './getAnalyticsReducer';

export interface TrackProps {
  appName: string;
  appVersion: string;
  brand: string;
  'App Language': string;
  'Browser Language': string;
  'Extension Type': string;
}

export interface TrackTarget {
  eventPostfix: string;
  router: string;
}

export interface TrackPayload {
  pathname: string;
}

export interface TrackAction {
  type: string;
  payload?: TrackPayload;
  curIdx?: number;
  playing?: boolean;
  fromType?: string;
  callSettingMode?: string;
  phoneNumber?: string;
  recipient?: any;
}

export interface TrackLog {
  timeStamp: string;
  event: string;
  trackProps: TrackProps;
}

export interface TrackImpl {
  (action: TrackAction): void;
}

export interface TrackItem {
  tagName: string;
  funcName: string;
  funcImpl: TrackImpl;
}

export interface PendoAgent {
  visitor: {
    id: string;
    appName: string;
    appVersion: string;
    appBrand: string;
    plaBrand: string;
    countryCode: string;
    [key: string]: string;
  };
  account: {
    id: string;
    [key: string]: string;
  };
}

interface IdentifyOptions {
  userId: string;
  [K: string]: any;
}

function warn() {
  console.warn('Do NOT call this directly.');
}

const TRACK_LIST: TrackItem[] = [];

export function track(tagName: string) {
  return function _track(
    prototype: any,
    property: string,
    descriptor: TypedPropertyDescriptor<TrackImpl>,
  ) {
    const { value, ...options } = descriptor;
    if (typeof value === 'function') {
      TRACK_LIST.push({
        tagName,
        funcName: property,
        funcImpl: value,
      });
    }
    return {
      ...options,
      value: warn,
      configurable: false,
    };
  };
}

export const DEFAULT_TAG_NAME = 'default';
export const tracking = track(DEFAULT_TAG_NAME);

// TODO: refactoring the module against `https://docs.google.com/spreadsheets/d/1xufV6-C-RJR6OJgwFYHYzNQwhIdN4BXXCo8ABs7RT-8/edit#gid=1480480736`
/**
 * @class
 * @description Analytics module.
 */
@Module({
  name: 'Analytics',
  deps: [
    { dep: 'AnalyticsOptions', optional: true },
    { dep: 'Adapter', optional: true },
    { dep: 'Auth', optional: true },
    { dep: 'Call', optional: true },
    { dep: 'CallingSettings', optional: true },
    { dep: 'AccountInfo', optional: true },
    { dep: 'ExtensionInfo', optional: true },
    { dep: 'CallHistory', optional: true },
    { dep: 'CallMonitor', optional: true },
    { dep: 'Conference', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    { dep: 'MessageSender', optional: true },
    { dep: 'MessageStore', optional: true },
    { dep: 'RouterInteraction', optional: true },
    { dep: 'UserGuide', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'Locale', optional: true },
    { dep: 'Meeting', optional: true },
    { dep: 'RcVideo', optional: true },
    { dep: 'CallLogSection', optional: true },
    { dep: 'ActiveCallControl', optional: true },
    { dep: 'DialerUI', optional: true },
    { dep: 'TierChecker', optional: true },
  ],
})
export class Analytics extends RcModule<
  Record<string, any>,
  AnalyticsActionTypes
> {
  // TODO: add state interface
  // AnalyticsOptions
  private _analyticsKey: string;
  private _pendoApiKey: string;
  private _appName: string;
  private _appVersion: string;
  private _brandCode: string;

  protected _adapter: any;
  protected _auth: any;
  protected _call: any;
  protected _callingSettings: any;
  protected _accountInfo: any;
  protected _extensionInfo: ExtensionInfo;
  protected _callHistory: any;
  protected _callMonitor: any;
  protected _conference: any;
  protected _conferenceCall: any;
  protected _contactDetailsUI: any;
  protected _messageSender: any;
  protected _messageStore: any;
  protected _routerInteraction: RouterInteraction;
  protected _userGuide: any;
  protected _webphone: any;
  protected _locale: any;
  protected _meeting: any;
  protected _rcVideo: any;
  protected _tierChecker: any;
  private _dialerUI: any;

  private _segment: any;
  private _pendo: any;
  private _trackList: TrackItem[];
  private _useLog: boolean;
  private _logs: TrackLog[] = [];
  private _lingerThreshold: number;

  private _lingerTimeout?: NodeJS.Timeout = null;
  private _promise?: Promise<void>;
  private _callLogSection: any;
  private _activeCallControl: any;
  private _enablePendo: boolean;
  private _waitPendoCount: number;
  private _pendoTimeout: ReturnType<typeof setTimeout>;
  private _env: string;

  constructor({
    // AnalyticsOptions
    analyticsKey,
    pendoApiKey,
    appName,
    appVersion,
    brandCode,
    // modules
    adapter,
    auth,
    call,
    callingSettings,
    accountInfo,
    extensionInfo,
    callHistory,
    callMonitor,
    conference,
    conferenceCall,
    contactDetailsUI,
    messageSender,
    messageStore,
    routerInteraction,
    userGuide,
    webphone,
    locale,
    meeting,
    rcVideo,
    dialerUI,
    tierChecker,
    // settinigs
    useLog = false,
    lingerThreshold = 1000,
    callLogSection,
    activeCallControl,
    enablePendo = false,
    env = 'dev',
    ...options
  }: Record<string, any>) {
    // TODO: fix type from new modules based on RcModulesV2
    super({
      ...options,
      actionTypes: analyticsActionTypes,
    });

    // config
    this._analyticsKey = analyticsKey;
    this._pendoApiKey = pendoApiKey;
    this._appName = appName;
    this._appVersion = appVersion;
    this._brandCode = brandCode;

    // modules
    this._adapter = adapter;
    this._auth = auth;
    this._call = call;
    this._callingSettings = callingSettings;
    this._accountInfo = accountInfo;
    this._extensionInfo = extensionInfo;
    this._callHistory = callHistory;
    this._callMonitor = callMonitor;
    this._conference = conference;
    this._conferenceCall = conferenceCall;
    this._contactDetailsUI = contactDetailsUI;
    this._messageSender = messageSender;
    this._messageStore = messageStore;
    this._routerInteraction = routerInteraction;
    this._userGuide = userGuide;
    this._webphone = webphone;
    this._locale = locale;
    this._meeting = meeting;
    this._rcVideo = rcVideo;
    this._callLogSection = callLogSection;
    this._activeCallControl = activeCallControl;
    this._dialerUI = dialerUI;
    this._tierChecker = tierChecker;
    // init
    this._reducer = getAnalyticsReducer(this.actionTypes);
    this._segment = Segment();
    this._trackList = [...TRACK_LIST];
    this._useLog = useLog;
    this._lingerThreshold = lingerThreshold;
    this._enablePendo = enablePendo;
    this._pendo = null;
    this._waitPendoCount = 0;
    this._pendoTimeout = null;
    this._env = env;
    if (this._enablePendo && this._pendoApiKey) {
      Pendo.init(this._pendoApiKey, (pendoInstance: any) => {
        this._pendo = pendoInstance;
      });
    }
  }

  identify(options: IdentifyOptions) {
    this._identify(options);
  }

  protected _identify({ userId, ...props }: IdentifyOptions) {
    if (this.analytics) {
      this.analytics.ready(() => {
        // According to EU policy, we had to disable mixpanel to upload IP addresses
        if (typeof window.mixpanel !== 'undefined') {
          window.mixpanel.set_config({
            ...window.mixpanel.config,
            ip: false,
          });
        } else {
          console.error(
            'Mixpanel is not defined, and failure to disable IP address upload',
          );
        }
      });
      this.analytics.identify(userId, props, {
        integrations: {
          All: true,
          Mixpanel: true,
        },
      });
    }
    if (this._enablePendo && this._pendoApiKey) {
      this._pendoInitialize({ userId, ...props, env: this._env });
    }
  }

  protected _pendoInitialize({
    userId,
    ...props
  }: { userId: string } & Record<string, any>) {
    if (!this._accountInfo || !this._accountInfo.id || !userId) {
      return;
    }
    if (this._pendoTimeout) {
      clearTimeout(this._pendoTimeout);
    }
    if (this._waitPendoCount > 3) {
      return;
    }
    if (!this._pendo) {
      this._pendoTimeout = setTimeout(() => {
        this._waitPendoCount += 1;
        this._pendoInitialize({ userId, ...props });
      }, 5 * 1000);
      return;
    }
    const initializeFunc = !this._pendo.isReady()
      ? this._pendo.initialize
      : this._pendo.updateOptions;
    const pendoAgent: PendoAgent = {
      visitor: {
        id: userId,
        ...props,
        appName: this._appName,
        appVersion: this._appVersion,
        appBrand: this._brandCode,
        plaBrand: this._accountInfo?.serviceInfo?.brand?.name,
        countryCode: this._accountInfo?.countryCode,
      },
      account: {
        id: this._accountInfo.id,
      },
    };
    typeof initializeFunc === 'function' &&
      initializeFunc({
        ...pendoAgent,
      });
  }

  track(event: string, properties: any = {}) {
    if (!this.analytics) {
      return;
    }

    const trackProps: TrackProps = {
      ...this.trackProps,
      ...properties,
    };

    this.analytics.track(event, trackProps, {
      integrations: {
        All: true,
        Mixpanel: true,
      },
    });

    if (this._useLog) {
      this._logs.push({
        timeStamp: new Date().toISOString(),
        event,
        trackProps,
      });
    }

    if (this._enablePendo && this._pendo?.isReady?.()) {
      this._pendo.track(`${trackProps.appName}-${event}`, trackProps);
    }
  }

  downloadLogs() {
    if (!this._useLog) {
      return;
    }

    const blob = new Blob([JSON.stringify(this._logs, null, 2)], {
      type: 'application/json',
    });

    saveBlob('logs.json', blob);
  }

  trackNavigation({ router, eventPostfix }: TrackTarget) {
    const trackProps = {
      router,
      appName: this._appName,
      appVersion: this._appVersion,
      brand: this._brandCode,
    };
    this.track(`Navigation: Click/${eventPostfix}`, trackProps);
  }

  trackLinger({ router, eventPostfix }: TrackTarget) {
    const trackProps = {
      router,
      appName: this._appName,
      appVersion: this._appVersion,
      brand: this._brandCode,
    };
    this.track(`Navigation: View/${eventPostfix}`, trackProps);
  }

  trackSchedule({ router }: TrackTarget) {
    const trackProps = {
      router,
      appName: this._appName,
      appVersion: this._appVersion,
      brand: this._brandCode,
    };
    this.track('Meeting: Click Schedule/Meeting schedule page', trackProps);
  }

  async _onStateChange() {
    if (this.pending) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (this._analyticsKey && this._segment) {
        this._segment.load(this._analyticsKey, {
          integrations: {
            All: true,
            Mixpanel: true,
          },
        });
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    }
    if (this.ready && this.lastActions.length && !this._promise) {
      this._promise = this._processActions();
    }
  }

  private async _processActions() {
    if (this.lastActions.length) {
      await sleep(300);
      this.lastActions.forEach((action: TrackAction) => {
        this.processAction(action);
      });
      this.store.dispatch({
        type: this.actionTypes.clear,
      });
      this._promise = null;
    }
  }

  processAction(action: TrackAction) {
    (this.trackList || []).forEach(({ funcImpl }: TrackItem) => {
      if (typeof funcImpl === 'function') {
        funcImpl.call(this, action);
      }
    });
  }

  @tracking
  private _authentication(action: TrackAction) {
    if (this._auth?.actionTypes.loginSuccess === action.type) {
      this.setUserId();
      this.track('Authentication');
    }
  }

  @tracking
  private _logout(action: TrackAction) {
    if (this._auth?.actionTypes.logout === action.type) {
      this.track('Logout');
    }
  }

  @tracking
  private _accountInfoReady(action: TrackAction) {
    if (this._accountInfo?.actionTypes.initSuccess === action.type) {
      this._identify({
        userId: this._auth?.ownerId,
        accountId: this._accountInfo.id,
        servicePlanId: this._accountInfo.servicePlan.id,
        edition: this._accountInfo.servicePlan.edition,
        CRMEnabled: this._tierChecker?.isCRMEnabled,
      });
    }
  }

  @tracking
  private _callAttempt(action: TrackAction) {
    if (this._call?.actionTypes.connect === action.type) {
      if (action.callSettingMode === callingModes.webphone) {
        this.track('Call Attempt WebRTC');
      } else {
        this.track('Call Attempt', {
          callSettingMode: action.callSettingMode,
        });
      }
    }
  }

  @tracking
  private _callConnected(action: TrackAction) {
    if (this._call?.actionTypes.connectSuccess === action.type) {
      if (action.callSettingMode === callingModes.webphone) {
        this.track('Outbound WebRTC Call Connected');
      } else {
        this.track('Outbound Call Connected', {
          callSettingMode: action.callSettingMode,
        });
      }
    }
  }

  @tracking
  private _webRTCRegistration(action: TrackAction) {
    if (this._webphone?.actionTypes.registered === action.type) {
      this.track('WebRTC registration');
    }
  }

  @tracking
  private _smsAttempt(action: TrackAction) {
    if (this._messageSender?.actionTypes.send === action.type) {
      this.track('SMS Attempt');
    }
  }

  @tracking
  private _smsSentOver(action: TrackAction) {
    if (this._messageSender?.actionTypes.sendOver === action.type) {
      this.track('SMS: SMS sent successfully');
    }
  }

  @tracking
  private _smsSentError(action: TrackAction) {
    if (this._messageSender?.actionTypes.sendError === action.type) {
      this.track('SMS: SMS sent failed');
    }
  }

  @tracking
  private _logCall(action: TrackAction) {
    if (this._adapter?.actionTypes.createCallLog === action.type) {
      this.track('Log Call');
    }
  }

  @tracking
  private _logSMS(action: TrackAction) {
    if (this._adapter?.actionTypes.createSMSLog === action.type) {
      this.track('Log SMS');
    }
  }

  @tracking
  private _clickToDial(action: TrackAction) {
    if (this._adapter?.actionTypes.clickToDial === action.type) {
      this.track('Click To Dial');
    }
  }

  @tracking
  private _clickToDialPlaceRingOutCall(action: TrackAction) {
    if (
      this._adapter?.actionTypes.clickToDial === action.type &&
      action.callSettingMode !== callingModes.webphone
    ) {
      this.track('Call: Place RingOut call/Click to Dial ', {
        'RingOut type': this._callingSettings?.callWith,
      });
    }
  }

  @tracking
  private _clickToSMS(action: TrackAction) {
    if (this._adapter?.actionTypes.clickToSMS === action.type) {
      this.track('Click To SMS');
    }
  }

  @tracking
  private _viewEntity(action: TrackAction) {
    if (this._adapter?.actionTypes.viewEntity === action.type) {
      this.track('View Entity Details');
    }
  }

  @tracking
  private _createEntity(action: TrackAction) {
    if (this._adapter?.actionTypes.createEntity === action.type) {
      this.track('Add Entity');
    }
  }

  @tracking
  private _editCallLog(action: TrackAction) {
    if (this._adapter?.actionTypes.editCallLog === action.type) {
      this.track('Edit Call Log');
    }
  }

  @tracking
  private _editSMSLog(action: TrackAction) {
    if (this._adapter?.actionTypes.editSMSLog === action.type) {
      this.track('Edit SMS Log');
    }
  }

  @tracking
  private _navigate(action: TrackAction) {
    if (this._routerInteraction?.actionTypes.locationChange === action.type) {
      const path = action.payload && action.payload.pathname;
      const target = this.getTrackTarget(path);
      if (target) {
        this.trackNavigation(target);
      }

      if (this._lingerTimeout) {
        clearTimeout(this._lingerTimeout);
      }
      this._lingerTimeout = setTimeout(() => {
        this._lingerTimeout = null;
        if (target && this._routerInteraction.currentPath === path) {
          this.trackLinger(target);
        }
      }, this._lingerThreshold);
    }
  }

  @tracking
  private _inboundCall(action: TrackAction) {
    if (this._webphone?.actionTypes.callAnswer === action.type) {
      this.track('Inbound WebRTC Call Connected');
    }
  }

  @tracking
  private _coldTransfer(action: TrackAction) {
    if (
      this._webphone?.isOnTransfer === true &&
      this._webphone?.actionTypes.updateSessions === action.type
    ) {
      this.track('Cold Transfer Call');
    }
  }

  @tracking
  private _textClickToDial(action: TrackAction) {
    if (
      this._messageStore?.actionTypes.clickToCall === action.type &&
      (action.fromType === 'Pager' || action.fromType === 'SMS')
    ) {
      this.track('Click To Dial (Text List)');
    }
  }

  @tracking
  private _voicemailClickToDial(action: TrackAction) {
    if (
      this._messageStore?.actionTypes.clickToCall === action.type &&
      action.fromType === 'VoiceMail'
    ) {
      this.track('Click To Dial (Voicemail List)');
    }
  }

  @tracking
  private _voicemailClickToSMS(action: TrackAction) {
    if (this._messageStore?.actionTypes.clickToSMS === action.type) {
      this.track('Click to SMS (Voicemail List)');
    }
  }

  @tracking
  private _voicemailDelete(action: TrackAction) {
    if (this._messageStore?.actionTypes.removeMessage === action.type) {
      this.track('Delete Voicemail');
    }
  }

  @tracking
  private _voicemailFlag(action: TrackAction) {
    if (this._messageStore?.actionTypes.markMessages === action.type) {
      this.track('Flag Voicemail');
    }
  }

  @tracking
  private _contactDetailClickToDial(action: TrackAction) {
    if (this._contactDetailsUI?.actionTypes.clickToCall === action.type) {
      this.track('Click To Dial (Contact Details)');
    }
  }

  @tracking
  private _contactDetailClickToSMS(action: TrackAction) {
    if (this._contactDetailsUI?.actionTypes.clickToSMS === action.type) {
      this.track('Click To SMS (Contact Details)');
    }
  }

  @tracking
  private _callHistoryClickToDial(action: TrackAction) {
    if (this._callHistory?.actionTypes.clickToCall === action.type) {
      this.track('Click To dial (Call History)');
    }
  }

  @tracking
  private _callHistoryClickToSMS(action: TrackAction) {
    if (this._callHistory?.actionTypes.clickToSMS === action.type) {
      this.track('Click To SMS (Call History)');
    }
  }

  @tracking
  private _conferenceInviteWithText(action: TrackAction) {
    if (this._conference?.actionTypes.inviteWithText === action.type) {
      this.track('Invite With Text (Conference)');
    }
  }

  @tracking
  private _conferenceAddDialInNumber(action: TrackAction) {
    if (this._conference?.actionTypes.updateAdditionalNumbers === action.type) {
      this.track('Select Additional Dial-in Number (Conference)');
    }
  }

  @tracking
  private _conferenceJoinAsHost(action: TrackAction) {
    if (this._conference?.actionTypes.joinAsHost === action.type) {
      this.track('Join As Host (Conference)');
    }
  }

  @tracking
  private _showWhatsNew(action: TrackAction) {
    if (
      this._userGuide?.actionTypes.updateCarousel === action.type &&
      action.curIdx === 0 &&
      action.playing
    ) {
      this.track("What's New");
    }
  }

  @tracking
  private _allCallsClickHold(action: TrackAction) {
    if (this._callMonitor?.actionTypes.allCallsClickHoldTrack === action.type) {
      this.track('Click Hold (All Calls)');
    }
  }

  @tracking
  private _allCallsClickHangup(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.allCallsClickHangupTrack === action.type
    ) {
      this.track('Click Hangup (All Calls)');
    }
  }

  @tracking
  private _allCallsCallItemClick(action: TrackAction) {
    if (this._callMonitor?.actionTypes.callItemClickTrack === action.type) {
      this.track('Click Call Item (All Calls)');
    }
  }

  @tracking
  private _callControlClickAdd(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.callControlClickAddTrack === action.type
    ) {
      this.track('Click Add (Call Control)');
    }
  }

  @tracking
  private _callControlClickMerge(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.callControlClickMergeTrack ===
        action.type &&
      !Object.values(this._conferenceCall.state.mergingPair).length
    ) {
      this.track('Click Merge (Call Control)');
    }
  }

  @tracking
  private _mergeCallControlClickMerge(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.callControlClickMergeTrack ===
        action.type &&
      Object.values(this._conferenceCall.state.mergingPair).length
    ) {
      this.track('Click Merge (Merge Call Control)');
    }
  }

  @tracking
  private _mergeCallControlClickHangup(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.mergeControlClickHangupTrack ===
      action.type
    ) {
      this.track('Click Hangup (Merge Call Control)');
    }
  }

  @tracking
  private _inboundCallConnectedTrack(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.inboundCallConnectedTrack === action.type
    ) {
      this.track('Call: Inbound call connected');
    }
  }

  @tracking
  private _outboundCallConnectedTrack(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.outboundCallConnectedTrack === action.type
    ) {
      this.track('Call: Outbound RingOut Call connected');
    }
  }

  @tracking
  private _callsOnHoldClickAdd(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.callsOnHoldClickAddTrack === action.type
    ) {
      this.track('Click Add (Calls OnHold)');
    }
  }

  @tracking
  private _callsOnHoldClickMerge(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.callsOnHoldClickMergeTrack === action.type
    ) {
      this.track('Click Merge (Calls OnHold)');
    }
  }

  @tracking
  private _confirmMergeClickClose(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.confirmMergeClickCloseTrack === action.type
    ) {
      this.track('Click Close (ConfirmMerge Modal)');
    }
  }

  @tracking
  private _confirmMergeClickMerge(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.confirmMergeClickMergeTrack === action.type
    ) {
      this.track('Click Merge (ConfirmMerge Modal)');
    }
  }

  @tracking
  private _removeParticipantClickRemove(action: TrackAction) {
    if (
      this._conferenceCall?.actionTypes.removeParticipantClickRemoveTrack ===
      action.type
    ) {
      this.track('Click Remove (RemoveParticipants Modal)');
    }
  }

  @tracking
  private _removeParticipantClickCancel(action: TrackAction) {
    if (
      this._conferenceCall?.actionTypes.removeParticipantClickCancelTrack ===
      action.type
    ) {
      this.track('Cancel Remove (RemoveParticipants Modal)');
    }
  }

  @tracking
  private _participantListClickHangup(action: TrackAction) {
    if (
      this._conferenceCall?.actionTypes.participantListClickHangupTrack ===
      action.type
    ) {
      this.track('Click Hangup (Participant List)');
    }
  }

  @tracking
  private _callControlClickParticipantArea(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes
        .callControlClickParticipantAreaClickTrack === action.type
    ) {
      this.track('Click Participant Area (Call Control)');
    }
  }

  @tracking
  private _callsOnHoldClickHangup(action: TrackAction) {
    if (
      this._callMonitor?.actionTypes.callsOnHoldClickHangupTrack === action.type
    ) {
      this.track('Click Hangup (Calls OnHold)');
    }
  }

  setUserId() {
    this._identify({
      userId: this._auth.ownerId,
    });
  }

  getTrackTarget(path = this._routerInteraction?.currentPath): TrackTarget {
    if (!path) {
      return null;
    }

    const routes = path.split('/');
    let formatRoute: string = null;
    const needMatchSecondRoutes = ['calls'];
    if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
      formatRoute = `/${routes[1]}/${routes[2]}`;
    } else if (routes.length > 1) {
      formatRoute = `/${routes[1]}`;
    }

    const targets: TrackTarget[] = [
      {
        eventPostfix: 'Dialer',
        router: '/dialer',
      },
      {
        eventPostfix: 'Compose SMS',
        router: '/composeText',
      },
      {
        eventPostfix: 'Messages',
        router: '/messages',
      },
      {
        eventPostfix: 'Conversation',
        router: '/conversations',
      },
      {
        eventPostfix: 'Call History',
        router: '/history',
      },
      {
        eventPostfix: 'All calls page',
        router: '/calls',
      },
      {
        eventPostfix: 'Settings',
        router: '/settings',
      },
      {
        eventPostfix: 'Meeting',
        router: '/meeting',
      },
      {
        eventPostfix: 'Contacts',
        router: '/contacts',
      },
      {
        eventPostfix: 'Call Control',
        router: '/calls/active',
      },
      {
        eventPostfix: 'Transfer',
        router: '/transfer',
      },
      {
        eventPostfix: 'Small call control',
        router: '/simplifycallctrl',
      },
      {
        eventPostfix: 'Flip',
        router: '/flip',
      },
      {
        eventPostfix: 'Add',
        router: '/conferenceCall',
      },
    ];

    const target = targets.find((target) => formatRoute === target.router);
    return target;
  }

  @tracking
  private _schedule(action: TrackAction) {
    if (
      this._meeting?.actionTypes.initScheduling === action.type ||
      this._rcVideo?.actionTypes.initCreating === action.type
    ) {
      const target = this.getTrackTarget(this._routerInteraction?.currentPath);
      if (target) {
        this.trackSchedule(target);
      }
    }
  }

  @tracking
  private _viewCallLogPage(action: TrackAction) {
    if (this._callLogSection?.actionTypes.showLogSection === action.type) {
      this.track('Call Log: View/Call log page');
    }
  }

  @tracking
  private _notificationClickLog(action: TrackAction) {
    if (this._callLogSection?.actionTypes.expandNotification === action.type) {
      this.track('Call Log: Click call log/Notification');
    }
  }

  @tracking
  private _muteOnSimpleCallControl(action: TrackAction) {
    if (
      this._activeCallControl?.actionTypes.mute === action.type &&
      this._routerInteraction?.currentPath.includes('/simplifycallctrl')
    ) {
      this.track('Call Control: Mute/Small call control');
    }
  }

  @tracking
  private _unmuteOnSimpleCallControl(action: TrackAction) {
    if (
      this._activeCallControl?.actionTypes.unmute === action.type &&
      this._routerInteraction?.currentPath.includes('/simplifycallctrl')
    ) {
      this.track('Call Control: Unmute/Small call control');
    }
  }

  @tracking
  private _holdOnSimpleCallControl(action: TrackAction) {
    if (
      this._activeCallControl?.actionTypes.hold === action.type &&
      this._routerInteraction?.currentPath.includes('/simplifycallctrl')
    ) {
      this.track('Call Control: Hold/Small call control');
    }
  }

  @tracking
  private _unholdOnSimpleCallControl(action: TrackAction) {
    if (
      this._activeCallControl?.actionTypes.unhold === action.type &&
      this._routerInteraction?.currentPath.includes('/simplifycallctrl')
    ) {
      this.track('Call Control: Unhold/Small call control');
    }
  }

  @tracking
  private _confirmTransfer(action: TrackAction) {
    if (this._activeCallControl?.actionTypes.transfer === action.type) {
      this.track('Call Control: Cold transfer/Transfer page');
    }
  }

  @tracking
  private _muteOnCallLogPage(action: TrackAction) {
    if (
      this._callLogSection?.show &&
      this._activeCallControl?.actionTypes.mute === action.type
    ) {
      this.track('Call Control: Mute/Call log page');
    }
  }

  @tracking
  private _unmuteOnCallLogPage(action: TrackAction) {
    if (
      this._callLogSection?.show &&
      this._activeCallControl?.actionTypes.unmute === action.type
    ) {
      this.track('Call Control: Unmute/Call log page');
    }
  }

  @tracking
  private _holdOnCallLogPage(action: TrackAction) {
    if (
      this._callLogSection?.show &&
      this._activeCallControl?.actionTypes.hold === action.type
    ) {
      this.track('Call Control: Hold/Call log page');
    }
  }

  @tracking
  private _unholdOnCallLogPage(action: TrackAction) {
    if (
      this._callLogSection?.show &&
      this._activeCallControl?.actionTypes.unhold === action.type
    ) {
      this.track('Call Control: Unhold/Call log page');
    }
  }

  @tracking
  private _hangupOnCallLogPage(action: TrackAction) {
    if (
      this._callLogSection?.show &&
      this._activeCallControl?.actionTypes.hangUp === action.type
    ) {
      this.track('Call Control: Hang up/Call log page');
    }
  }

  @tracking
  private _smsHistoryPlaceRingOutCall(action: TrackAction) {
    if (
      this._messageStore?.actionTypes.clickToCall === action.type &&
      this._callingSettings.callingMode !== callingModes.webphone
    ) {
      this.track('Call: Place RingOut call/SMS history', {
        'RingOut type': this._callingSettings?.callWith,
      });
    }
  }

  @tracking
  private _callHistoryPlaceRingOutCall(action: TrackAction) {
    if (
      this._callHistory?.actionTypes.clickToCall === action.type &&
      this._callingSettings.callingMode !== callingModes.webphone
    ) {
      this.track('Call: Place RingOut call/Call history', {
        'RingOut type': this._callingSettings?.callWith,
      });
    }
  }

  @tracking
  private _dialerPlaceRingOutCall(action: TrackAction) {
    if (
      this._dialerUI?.actionTypes.call === action.type &&
      (action.phoneNumber?.length > 0 || action.recipient) &&
      this._callingSettings.callingMode !== callingModes.webphone
    ) {
      this.track('Call: Place RingOut call/Dialer', {
        'RingOut type': this._callingSettings?.callWith,
      });
    }
  }

  get trackList(): TrackItem[] {
    return this._trackList;
  }

  get analytics() {
    return (global as any).analytics;
  }

  get lastActions(): TrackAction[] {
    return this.state.lastActions;
  }

  get status(): string {
    return this.state.status;
  }

  get ready(): boolean {
    return this.status === moduleStatuses.ready;
  }

  get pending(): boolean {
    return this.status === moduleStatuses.pending;
  }

  get trackProps(): TrackProps {
    return {
      appName: this._appName,
      appVersion: this._appVersion,
      brand: this._brandCode,
      'App Language': this._locale?.currentLocale || '',
      'Browser Language': this._locale?.browserLocale || '',
      'Extension Type': this._extensionInfo?.info.type || '',
    };
  }
}
