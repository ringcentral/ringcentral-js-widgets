import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import sleep from '../../lib/sleep';
import saveBlob from '../../lib/saveBlob';
import moduleStatuses from '../../enums/moduleStatuses';
import actionTypes from './actionTypes';
import getAnalyticsReducer from './getAnalyticsReducer';

import { Segment } from '../../lib/Analytics';
import callingModes from '../CallingSettings/callingModes';

export const INIT_TRACK_LIST = [
  '_authentication',
  '_logout',
  '_callAttempt',
  '_callConnected',
  '_webRTCRegistration',
  '_smsAttempt',
  '_smsSentOver',
  '_smsSentError',
  '_logCall',
  '_logSMS',
  '_clickToDial',
  '_clickToSMS',
  '_viewEntity',
  '_createEntity',
  '_editCallLog',
  '_editSMSLog',
  '_navigate',
  '_inboundCall',
  '_coldTransfer',
  '_textClickToDial',
  '_voicemailClickToDial',
  '_voicemailClickToSMS',
  '_voicemailDelete',
  '_voicemailFlag',
  '_contactDetailClickToDial',
  '_contactDetailClickToSMS',
  '_callHistoryClickToDial',
  '_callHistoryClickToSMS',
  '_conferenceInviteWithText',
  '_conferenceAddDialInNumber',
  '_conferenceJoinAsHost',
  '_showWhatsNew',
  '_allCallsClickHangup',
  '_allCallsClickHold',
  '_allCallsCallItemClick',
  '_callControlClickAdd',
  '_mergeCallControlClickMerge',
  '_mergeCallControlClickHangup',
  '_callsOnHoldClickHangup',
  '_callsOnHoldClickAdd',
  '_callsOnHoldClickMerge',
  '_confirmMergeClickClose',
  '_confirmMergeClickMerge',
  '_removeParticipantClickRemove',
  '_removeParticipantClickCancel',
  '_participantListClickHangup',
  '_callControlClickMerge',
  '_callControlClickParticipantArea',
  '_accountInfoReady',
  '_schedule',
  '_clickToDialPlaceRingOutCall',
  '_inboundCallConnectedTrack',
  '_outboundCallConnectedTrack',
];

// TODO: refactoring the module against `https://docs.google.com/spreadsheets/d/1xufV6-C-RJR6OJgwFYHYzNQwhIdN4BXXCo8ABs7RT-8/edit#gid=1480480736`
/**
 * @class
 * @description Analytics module.
 */
@Module({
  deps: [
    { dep: 'Auth', optional: true },
    { dep: 'Call', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'Contacts', optional: true },
    { dep: 'MessageSender', optional: true },
    { dep: 'MessageStore', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    { dep: 'CallHistory', optional: true },
    { dep: 'Conference', optional: true },
    { dep: 'RouterInteraction', optional: true },
    { dep: 'AnalyticsAdapter', optional: true },
    { dep: 'AnalyticsOptions', optional: true },
    { dep: 'UserGuide', optional: true },
    { dep: 'CallMonitor', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'AccountInfo', optional: true },
    { dep: 'Locale', optional: true },
    { dep: 'Meeting', optional: true },
    { dep: 'RcVideo', optional: true },
    { dep: 'extensionInfo', optional: true },
  ],
})
export default class Analytics extends RcModule {
  constructor({
    // config
    analyticsKey,
    appName,
    appVersion,
    brandCode,
    // modules
    accountInfo,
    adapter,
    auth,
    call,
    callHistory,
    callMonitor,
    conference,
    conferenceCall,
    contactDetailsUI,
    contacts,
    messageSender,
    messageStore,
    routerInteraction,
    userGuide,
    webphone,
    locale,
    meeting,
    rcVideo,
    useLog = false,
    lingerThreshold = 1000,
    extensionInfo,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });

    // config
    this._analyticsKey = analyticsKey;
    this._appName = appName;
    this._appVersion = appVersion;
    this._brandCode = brandCode;

    // modules
    this._accountInfo = accountInfo;
    this._adapter = adapter;
    this._auth = auth;
    this._call = call;
    this._callHistory = callHistory;
    this._callMonitor = callMonitor;
    this._conference = conference;
    this._conferenceCall = conferenceCall;
    this._contactDetailsUI = contactDetailsUI;
    this._contacts = contacts;
    this._messageSender = messageSender;
    this._messageStore = messageStore;
    this._router = routerInteraction;
    this._userGuide = userGuide;
    this._webphone = webphone;
    this._locale = locale;
    this._meeting = meeting;
    this._rcVideo = rcVideo;
    this._extensionInfo = extensionInfo;

    // init
    this._reducer = getAnalyticsReducer(this.actionTypes);
    this._segment = Segment();
    this._trackList = INIT_TRACK_LIST;
    this._useLog = useLog;
    this._lingerThreshold = lingerThreshold;
    this._logs = [];
    this._lingerTimeout = null;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  identify({ userId, ...props }) {
    if (this.analytics) {
      this.analytics.identify(userId, props);
    }
  }

  track(event, { ...properties }) {
    if (!this.analytics) {
      return;
    }
    const trackProps = {
      ...this.trackProps,
      ...properties,
    };
    this.analytics.track(event, trackProps);
    if (this._useLog) {
      this._logs.push({
        timeStamp: new Date().toISOString(),
        event,
        trackProps,
      });
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

  trackNavigation({ router, eventPostfix }) {
    const trackProps = {
      router,
      appName: this._appName,
      appVersion: this._appVersion,
      brand: this._brandCode,
    };
    this.track(`Navigation: Click/${eventPostfix}`, trackProps);
  }

  trackLinger({ router, eventPostfix }) {
    const trackProps = {
      router,
      appName: this._appName,
      appVersion: this._appVersion,
      brand: this._brandCode,
    };
    this.track(`Navigation: View/${eventPostfix}`, trackProps);
  }

  trackSchedule({ router }) {
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
      if (this._analyticsKey) {
        this._segment.load(this._analyticsKey);
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    }
    if (this.ready && this.lastActions.length && !this._promise) {
      this._promise = this._processActions();
    }
  }

  async _processActions() {
    if (this.lastActions.length) {
      await sleep(300);
      this.lastActions.forEach((action) => {
        this._trackList.forEach((key) => {
          this[key](action);
        });
      });
      this._promise = null;
      this.store.dispatch({
        type: this.actionTypes.clear,
      });
    }
  }

  /**
   * Append more action to track
   * First, Inherit this class and declare channel specific method on it
   * Then append more method name to track using this method
   * @param {string[]} methodNames
   */
  appendTrackList(methodNames) {
    this._trackList.push(...methodNames);
  }

  _authentication(action) {
    if (this._auth && this._auth.actionTypes.loginSuccess === action.type) {
      this.identify({
        userId: this._auth.ownerId,
      });
      this.track('Authentication');
    }
  }

  _logout(action) {
    if (this._auth && this._auth.actionTypes.logout === action.type) {
      this.track('Logout');
    }
  }

  _accountInfoReady(action) {
    if (
      this._accountInfo &&
      this._accountInfo.actionTypes.initSuccess === action.type
    ) {
      this.identify({
        userId: this._accountInfo._auth.ownerId,
        accountId: this._accountInfo.id,
        servicePlanId: this._accountInfo.servicePlan.id,
        edition: this._accountInfo.servicePlan.edition,
        CRMEnabled: this._accountInfo._rolesAndPermissions.tierEnabled,
      });
    }
  }

  _callAttempt(action) {
    if (this._call && this._call.actionTypes.connect === action.type) {
      if (action.callSettingMode === callingModes.webphone) {
        this.track('Call Attempt WebRTC');
      } else {
        this.track('Call Attempt', {
          callSettingMode: action.callSettingMode,
        });
      }
    }
  }

  _callConnected(action) {
    if (this._call && this._call.actionTypes.connectSuccess === action.type) {
      if (action.callSettingMode === callingModes.webphone) {
        this.track('Outbound WebRTC Call Connected');
      } else {
        this.track('Outbound Call Connected', {
          callSettingMode: action.callSettingMode,
        });
      }
    }
  }

  _webRTCRegistration(action) {
    if (
      this._webphone &&
      this._webphone.actionTypes.registered === action.type
    ) {
      this.track('WebRTC registration');
    }
  }

  _smsAttempt(action) {
    if (
      this._messageSender &&
      this._messageSender.actionTypes.send === action.type
    ) {
      this.track('SMS Attempt');
    }
  }

  _smsSentOver(action) {
    if (
      this._messageSender &&
      this._messageSender.actionTypes.sendOver === action.type
    ) {
      this.track('SMS: SMS sent succesfully');
    }
  }

  _smsSentError(action) {
    if (
      this._messageSender &&
      this._messageSender.actionTypes.sendError === action.type
    ) {
      this.track('SMS: SMS sent failed');
    }
  }

  _logCall(action) {
    if (
      this._adapter &&
      this._adapter.actionTypes.createCallLog === action.type
    ) {
      this.track('Log Call');
    }
  }

  _logSMS(action) {
    if (
      this._adapter &&
      this._adapter.actionTypes.createSMSLog === action.type
    ) {
      this.track('Log SMS');
    }
  }

  _clickToDial(action) {
    if (
      this._adapter &&
      this._adapter.actionTypes.clickToDial === action.type
    ) {
      this.track('Click To Dial');
    }
  }

  _clickToDialPlaceRingOutCall(action) {
    if (
      this._adapter &&
      this._adapter.actionTypes.clickToDial === action.type &&
      action.callSettingMode !== callingModes.webphone
    ) {
      this.track('Call: Place RingOut call/Click to Dial ');
    }
  }

  _clickToSMS(action) {
    if (this._adapter && this._adapter.actionTypes.clickToSMS === action.type) {
      this.track('Click To SMS');
    }
  }

  _viewEntity(action) {
    if (this._adapter && this._adapter.actionTypes.viewEntity === action.type) {
      this.track('View Entity Details');
    }
  }

  _createEntity(action) {
    if (
      this._adapter &&
      this._adapter.actionTypes.createEntity === action.type
    ) {
      this.track('Add Entity');
    }
  }

  _editCallLog(action) {
    if (
      this._adapter &&
      this._adapter.actionTypes.editCallLog === action.type
    ) {
      this.track('Edit Call Log');
    }
  }

  _editSMSLog(action) {
    if (this._adapter && this._adapter.actionTypes.editSMSLog === action.type) {
      this.track('Edit SMS Log');
    }
  }

  _navigate(action) {
    if (
      this._router &&
      this._router.actionTypes.locationChange === action.type
    ) {
      if (this._lingerTimeout) {
        clearTimeout(this._lingerTimeout);
      }
      const path = action.payload && action.payload.pathname;
      const target = this._getTrackTarget(path);
      if (target) {
        this.trackNavigation({
          ...target,
        });
      }

      this._lingerTimeout = setTimeout(() => {
        if (this._router.currentPath !== path) {
          return;
        }
        this._lingerTimeout = null;
        this.trackLinger({
          ...target,
        });
      }, this._lingerThreshold);
    }
  }

  _inboundCall(action) {
    if (
      this._webphone &&
      this._webphone.actionTypes.callAnswer === action.type
    ) {
      this.track('Inbound WebRTC Call Connected');
    }
  }

  _coldTransfer(action) {
    if (
      this._webphone &&
      this._webphone.isOnTransfer === true &&
      this._webphone.actionTypes.updateSessions === action.type
    ) {
      this.track('Cold Transfer Call');
    }
  }

  _textClickToDial(action) {
    if (
      this._messageStore &&
      this._messageStore.actionTypes.clickToCall === action.type &&
      (action.fromType === 'Pager' || action.fromType === 'SMS')
    ) {
      this.track('Click To Dial (Text List)');
    }
  }

  _voicemailClickToDial(action) {
    if (
      this._messageStore &&
      this._messageStore.actionTypes.clickToCall === action.type &&
      action.fromType === 'VoiceMail'
    ) {
      this.track('Click To Dial (Voicemail List)');
    }
  }

  _voicemailClickToSMS(action) {
    if (
      this._messageStore &&
      this._messageStore.actionTypes.clickToSMS === action.type
    ) {
      this.track('Click to SMS (Voicemail List)');
    }
  }

  _voicemailDelete(action) {
    if (
      this._messageStore &&
      this._messageStore.actionTypes.removeMessage === action.type
    ) {
      this.track('Delete Voicemail');
    }
  }

  _voicemailFlag(action) {
    if (
      this._messageStore &&
      this._messageStore.actionTypes.markMessages === action.type
    ) {
      this.track('Flag Voicemail');
    }
  }

  _contactDetailClickToDial(action) {
    if (
      this._contactDetailsUI &&
      this._contactDetailsUI.actionTypes.clickToCall === action.type
    ) {
      this.track('Click To Dial (Contact Details)');
    }
  }

  _contactDetailClickToSMS(action) {
    if (
      this._contactDetailsUI &&
      this._contactDetailsUI.actionTypes.clickToSMS === action.type
    ) {
      this.track('Click To SMS (Contact Details)');
    }
  }

  _callHistoryClickToDial(action) {
    if (
      this._callHistory &&
      this._callHistory.actionTypes.clickToCall === action.type
    ) {
      this.track('Click To dial (Call History)');
    }
  }

  _callHistoryClickToSMS(action) {
    if (
      this._callHistory &&
      this._callHistory.actionTypes.clickToSMS === action.type
    ) {
      this.track('Click To SMS (Call History)');
    }
  }

  _conferenceInviteWithText(action) {
    if (
      this._conference &&
      this._conference.actionTypes.inviteWithText === action.type
    ) {
      this.track('Invite With Text (Conference)');
    }
  }

  _conferenceAddDialInNumber(action) {
    if (
      this._conference &&
      this._conference.actionTypes.updateAdditionalNumbers === action.type
    ) {
      this.track('Select Additional Dial-in Number (Conference)');
    }
  }

  _conferenceJoinAsHost(action) {
    if (
      this._conference &&
      this._conference.actionTypes.joinAsHost === action.type
    ) {
      this.track('Join As Host (Conference)');
    }
  }

  _showWhatsNew(action) {
    if (
      this._userGuide &&
      this._userGuide.actionTypes.updateCarousel === action.type &&
      action.curIdx === 0 &&
      action.playing
    ) {
      this.track("What's New");
    }
  }

  _allCallsClickHold(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.allCallsClickHoldTrack === action.type
    ) {
      this.track('Click Hold (All Calls)');
    }
  }

  _allCallsClickHangup(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.allCallsClickHangupTrack === action.type
    ) {
      this.track('Click Hangup (All Calls)');
    }
  }

  _allCallsCallItemClick(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.callItemClickTrack === action.type
    ) {
      this.track('Click Call Item (All Calls)');
    }
  }

  _callControlClickAdd(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.callControlClickAddTrack === action.type
    ) {
      this.track('Click Add (Call Control)');
    }
  }

  _callControlClickMerge(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.callControlClickMergeTrack ===
        action.type &&
      !Object.values(this._conferenceCall.state.mergingPair).length
    ) {
      this.track('Click Merge (Call Control)');
    }
  }

  _mergeCallControlClickMerge(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.callControlClickMergeTrack ===
        action.type &&
      Object.values(this._conferenceCall.state.mergingPair).length
    ) {
      this.track('Click Merge (Merge Call Control)');
    }
  }

  _mergeCallControlClickHangup(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.mergeControlClickHangupTrack === action.type
    ) {
      this.track('Click Hangup (Merge Call Control)');
    }
  }

  _inboundCallConnectedTrack(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.inboundCallConnectedTrack === action.type
    ) {
      this.track('Call: Inbound call connected');
    }
  }

  _outboundCallConnectedTrack(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.outboundCallConnectedTrack === action.type
    ) {
      this.track('Call: Outbound RingOut Call connected');
    }
  }

  _callsOnHoldClickAdd(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.callsOnHoldClickAddTrack === action.type
    ) {
      this.track('Click Add (Calls OnHold)');
    }
  }

  _callsOnHoldClickMerge(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.callsOnHoldClickMergeTrack === action.type
    ) {
      this.track('Click Merge (Calls OnHold)');
    }
  }

  _confirmMergeClickClose(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.confirmMergeClickCloseTrack === action.type
    ) {
      this.track('Click Close (ConfirmMerge Modal)');
    }
  }

  _confirmMergeClickMerge(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.confirmMergeClickMergeTrack === action.type
    ) {
      this.track('Click Merge (ConfirmMerge Modal)');
    }
  }

  _removeParticipantClickRemove(action) {
    if (
      this._conferenceCall &&
      this._conferenceCall.actionTypes.removeParticipantClickRemoveTrack ===
        action.type
    ) {
      this.track('Click Remove (RemoveParticipants Modal)');
    }
  }

  _removeParticipantClickCancel(action) {
    if (
      this._conferenceCall &&
      this._conferenceCall.actionTypes.removeParticipantClickCancelTrack ===
        action.type
    ) {
      this.track('Cancel Remove (RemoveParticipants Modal)');
    }
  }

  _participantListClickHangup(action) {
    if (
      this._conferenceCall &&
      this._conferenceCall.actionTypes.participantListClickHangupTrack ===
        action.type
    ) {
      this.track('Click Hangup (Participant List)');
    }
  }

  _callControlClickParticipantArea(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes
        .callControlClickParticipantAreaClickTrack === action.type
    ) {
      this.track('Click Participant Area (Call Control)');
    }
  }

  _callsOnHoldClickHangup(action) {
    if (
      this._callMonitor &&
      this._callMonitor.actionTypes.callsOnHoldClickHangupTrack === action.type
    ) {
      this.track('Click Hangup (Calls OnHold)');
    }
  }

  _getTrackTarget(path) {
    if (path) {
      const routes = path.split('/');
      let formatRoute = null;
      const needMatchSecondRoutes = ['calls'];
      if (
        routes.length >= 3 &&
        needMatchSecondRoutes.indexOf(routes[1]) !== -1
      ) {
        formatRoute = `/${routes[1]}/${routes[2]}`;
      } else if (routes.length > 1) {
        formatRoute = `/${routes[1]}`;
      }

      const targets = [
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
          eventPostfix: 'Conference',
          router: '/conference',
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
      return targets.find((target) => formatRoute === target.router);
    }
    return undefined;
  }

  _schedule(action) {
    if (
      ((this._meeting &&
        this._meeting.actionTypes.initScheduling === action.type) ||
        (this._rcVideo &&
          this._rcVideo.actionTypes.initCreating === action.type)) &&
      this._router
    ) {
      this.trackSchedule(this._getTrackTarget(this._router.currentPath));
    }
  }

  get analytics() {
    return global.analytics;
  }

  get lastActions() {
    return this.state.lastAction;
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pending() {
    return this.status === moduleStatuses.pending;
  }

  get trackProps() {
    return {
      appName: this._appName,
      appVersion: this._appVersion,
      brand: this._brandCode,
      'App Language': this._locale ? this._locale.currentLocale : '',
      'Browser Language': this._locale ? this._locale.browserLocale : '',
      'Extension Type': this._extensionInfo
        ? this._extensionInfo.info.type
        : '',
    };
  }
}
