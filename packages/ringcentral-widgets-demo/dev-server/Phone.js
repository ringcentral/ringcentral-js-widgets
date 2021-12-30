import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { ModuleFactory } from '@ringcentral-integration/commons/lib/di';
import { LocalForageStorage } from '@ringcentral-integration/commons/lib/LocalForageStorage';
import normalizeNumber from '@ringcentral-integration/commons/lib/normalizeNumber';
import RcModule from '@ringcentral-integration/commons/lib/RcModule';
import { RingCentralClient } from '@ringcentral-integration/commons/lib/RingCentralClient';
import '@ringcentral-integration/commons/lib/TabFreezePrevention';
import { AccountContacts } from '@ringcentral-integration/commons/modules/AccountContactsV2';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfoV2';
import { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControlV2';
import { ActiveCalls } from '@ringcentral-integration/commons/modules/ActiveCallsV2';
import { AddressBook } from '@ringcentral-integration/commons/modules/AddressBookV2';
import { Alert } from '@ringcentral-integration/commons/modules/AlertV2';
import { Analytics } from '@ringcentral-integration/commons/modules/AnalyticsV2';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettingsV2';
import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { AvailabilityMonitor } from '@ringcentral-integration/commons/modules/AvailabilityMonitorV2';
import { BlockedNumber } from '@ringcentral-integration/commons/modules/BlockedNumberV2';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { CallerId } from '@ringcentral-integration/commons/modules/CallerIdV2';
import { CallHistory } from '@ringcentral-integration/commons/modules/CallHistoryV2';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettingsV2/callingModes';
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettingsV2/callingOptions';
import { CallLog } from '@ringcentral-integration/commons/modules/CallLogV2';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
import { Call } from '@ringcentral-integration/commons/modules/CallV2';
import { CompanyContacts } from '@ringcentral-integration/commons/modules/CompanyContactsV2';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeTextV2';
import Conference from '@ringcentral-integration/commons/modules/Conference';
import { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCallV2';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitorV2';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcherV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { Contacts } from '@ringcentral-integration/commons/modules/ContactsV2';
import { Conversations } from '@ringcentral-integration/commons/modules/ConversationsV2';
import { DataFetcherV2 } from '@ringcentral-integration/commons/modules/DataFetcherV2';
import { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormatV2';
import { DialingPlan } from '@ringcentral-integration/commons/modules/DialingPlanV2';
import { Environment } from '@ringcentral-integration/commons/modules/EnvironmentV2';
import { ExtensionDevice } from '@ringcentral-integration/commons/modules/ExtensionDeviceV2';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import { ExtensionPhoneNumber } from '@ringcentral-integration/commons/modules/ExtensionPhoneNumberV2';
import { Feedback } from '@ringcentral-integration/commons/modules/FeedbackV2';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumberV2';
import { GlobalStorage } from '@ringcentral-integration/commons/modules/GlobalStorageV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { LocaleSettings } from '@ringcentral-integration/commons/modules/LocaleSettingsV2';
import { Meeting } from '@ringcentral-integration/commons/modules/MeetingV2';
import { RcVideo } from '@ringcentral-integration/commons/modules/RcVideoV2';
import { MessageSender } from '@ringcentral-integration/commons/modules/MessageSenderV2';
import { MessageStore } from '@ringcentral-integration/commons/modules/MessageStoreV2';
import { NumberValidate } from '@ringcentral-integration/commons/modules/NumberValidate';
import { Presence } from '@ringcentral-integration/commons/modules/PresenceV2';
// import ConferenceCall from '@ringcentral-integration/commons/modules/ConferenceCall';
import { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccessV2';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { RecentCalls } from '@ringcentral-integration/commons/modules/RecentCallsV2';
import { RecentMessages } from '@ringcentral-integration/commons/modules/RecentMessagesV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import ringoutStatus from '@ringcentral-integration/commons/modules/Ringout/ringoutStatus';
import { Ringout } from '@ringcentral-integration/commons/modules/RingoutV2';
import { SleepDetector } from '@ringcentral-integration/commons/modules/SleepDetectorV2';
import {
  Softphone,
  softphoneStatus,
} from '@ringcentral-integration/commons/modules/Softphone';
import { Storage } from '@ringcentral-integration/commons/modules/StorageV2';
import { Subscription } from '@ringcentral-integration/commons/modules/SubscriptionV2';
import { TabManager } from '@ringcentral-integration/commons/modules/TabManager';
import { TierChecker } from '@ringcentral-integration/commons/modules/TierChecker';
import { UserGuide } from '@ringcentral-integration/commons/modules/UserGuideV2';
import { VideoConfiguration } from '@ringcentral-integration/commons/modules/VideoConfiguration';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';
import { GenericMeeting } from '@ringcentral-integration/commons/modules/GenericMeetingV2';
import hasActiveCalls from '@ringcentral-integration/widgets/lib/hasActiveCalls';
import { ActiveCallsUI } from '@ringcentral-integration/widgets/modules/ActiveCallsUI';
import { AlertUI } from '@ringcentral-integration/widgets/modules/AlertUI';
import { AudioSettingsUI } from '@ringcentral-integration/widgets/modules/AudioSettingsUI';
import { CallBadgeUI } from '@ringcentral-integration/widgets/modules/CallBadgeUI';
import { CallControlUI } from '@ringcentral-integration/widgets/modules/CallControlUI';
import { CallHistoryUI } from '@ringcentral-integration/widgets/modules/CallHistoryUI';
import { CallingSettingsUI } from '@ringcentral-integration/widgets/modules/CallingSettingsUI';
import { CallsListUI } from '@ringcentral-integration/widgets/modules/CallsListUI';
import { CallsOnholdUI } from '@ringcentral-integration/widgets/modules/CallsOnholdUI';
import { ComposeTextUI } from '@ringcentral-integration/widgets/modules/ComposeTextUI';
import ConferenceDialerUI from '@ringcentral-integration/widgets/modules/ConferenceDialerUI';
import { ConferenceParticipantUI } from '@ringcentral-integration/widgets/modules/ConferenceParticipantUI';
import { ConferenceUI } from '@ringcentral-integration/widgets/modules/ConferenceUI';
import { ConnectivityBadgeUI } from '@ringcentral-integration/widgets/modules/ConnectivityBadgeUI';
import { ConnectivityManager } from '@ringcentral-integration/widgets/modules/ConnectivityManager';
import { ContactDetailsUI } from '@ringcentral-integration/widgets/modules/ContactDetailsUI';
import { ContactListUI } from '@ringcentral-integration/widgets/modules/ContactListUI';
import { ConversationsUI } from '@ringcentral-integration/widgets/modules/ConversationsUI';
import { ConversationUI } from '@ringcentral-integration/widgets/modules/ConversationUI';
import { DialerAndCallsTabUI } from '@ringcentral-integration/widgets/modules/DialerAndCallsTabUI';
import DialerUI from '@ringcentral-integration/widgets/modules/DialerUI';
import { FeedbackUI } from '@ringcentral-integration/widgets/modules/FeedbackUI';
import FlipUI from '@ringcentral-integration/widgets/modules/FlipUI';
import { IncomingCallUI } from '@ringcentral-integration/widgets/modules/IncomingCallUI';
import LoginUI from '@ringcentral-integration/widgets/modules/LoginUI';
import { ModalUI } from '@ringcentral-integration/widgets/modules/ModalUI';
import OAuth from '@ringcentral-integration/widgets/modules/OAuth';
import { RecentActivityUI } from '@ringcentral-integration/widgets/modules/RecentActivityUI';
import RegionSettingsUI from '@ringcentral-integration/widgets/modules/RegionSettingsUI';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';
import { SettingsUI } from '@ringcentral-integration/widgets/modules/SettingsUI';
import { SimpleCallControlUI } from '@ringcentral-integration/widgets/modules/SimpleCallControlUI';
import TransferUI from '@ringcentral-integration/widgets/modules/TransferUI';
import { UserGuideUI } from '@ringcentral-integration/widgets/modules/UserGuideUI';
import { GenericMeetingUI } from '@ringcentral-integration/widgets/modules/GenericMeetingUI';
import { SDK } from '@ringcentral/sdk';
import { hashHistory } from 'react-router';
import url from 'url';

const history =
  global.process &&
  global.process.release &&
  global.process.release.name === 'node'
    ? undefined
    : hashHistory;
@ModuleFactory({
  providers: [
    {
      provide: 'FeatureConfiguration',
      useValue: {
        CDC: true,
      },
    },
    { provide: 'Alert', useClass: Alert },
    { provide: 'ActiveCalls', useClass: ActiveCalls },
    { provide: 'AlertUI', useClass: AlertUI },
    { provide: 'AppFeatures', useClass: AppFeatures },
    { provide: 'RegionSettingsUI', useClass: RegionSettingsUI },
    { provide: 'ConferenceParticipantUI', useClass: ConferenceParticipantUI },
    { provide: 'Brand', useClass: Brand },
    { provide: 'Softphone', useClass: Softphone },
    { provide: 'Locale', useClass: Locale },
    { provide: 'DateTimeFormat', useClass: DateTimeFormat },
    { provide: 'TabManager', useClass: TabManager },
    { provide: 'GlobalStorage', useClass: GlobalStorage },
    { provide: 'LocaleSettings', useClass: LocaleSettings },
    { provide: 'Environment', useClass: Environment },
    { provide: 'Auth', useClass: Auth },
    { provide: 'OAuth', useClass: OAuth },
    { provide: 'SleepDetector', useClass: SleepDetector },
    { provide: 'DataFetcherV2', useClass: DataFetcherV2 },
    { provide: 'ModalUI', useClass: ModalUI },
    { provide: 'Ringout', useClass: Ringout },
    { provide: 'ConnectivityMonitor', useClass: ConnectivityMonitor },
    { provide: 'ConnectivityManager', useClass: ConnectivityManager },
    { provide: 'ConnectivityBadgeUI', useClass: ConnectivityBadgeUI },
    { provide: 'RateLimiter', useClass: RateLimiter },
    { provide: 'Storage', useClass: Storage },
    { provide: 'AudioSettings', useClass: AudioSettings },
    { provide: 'AudioSettingsUI', useClass: AudioSettingsUI },
    { provide: 'IncomingCallUI', useClass: IncomingCallUI },
    { provide: 'CompanyContacts', useClass: CompanyContacts },
    { provide: 'AccountInfo', useClass: AccountInfo },
    { provide: 'ExtensionDevice', useClass: ExtensionDevice },
    { provide: 'ExtensionInfo', useClass: ExtensionInfo },
    { provide: 'ExtensionFeatures', useClass: ExtensionFeatures },
    { provide: 'DialingPlan', useClass: DialingPlan },
    { provide: 'ExtensionPhoneNumber', useClass: ExtensionPhoneNumber },
    { provide: 'ForwardingNumber', useClass: ForwardingNumber },
    { provide: 'RegionSettings', useClass: RegionSettings },
    { provide: 'NumberValidate', useClass: NumberValidate },
    { provide: 'CallerId', useClass: CallerId },
    { provide: 'CallingSettings', useClass: CallingSettings },
    {
      provide: 'CallingSettingsUIOptions',
      useValue: {
        ringtoneSettings: false,
      },
    },
    { provide: 'CallingSettingsUI', useClass: CallingSettingsUI },
    { provide: 'Call', useClass: Call },
    { provide: 'Subscription', useClass: Subscription },
    { provide: 'Presence', useClass: Presence },
    { provide: 'MessageSender', useClass: MessageSender },
    { provide: 'ComposeText', useClass: ComposeText },
    { provide: 'MessageStore', useClass: MessageStore },
    { provide: 'Conversations', useClass: Conversations },
    { provide: 'Conference', useClass: Conference },
    { provide: 'RouterInteraction', useClass: RouterInteraction },
    { provide: 'CallLog', useClass: CallLog },
    { provide: 'CallHistory', useClass: CallHistory },
    { provide: 'CallControlUI', useClass: CallControlUI },
    { provide: 'AccountContacts', useClass: AccountContacts },
    { provide: 'AddressBook', useClass: AddressBook },
    { provide: 'Contacts', useClass: Contacts },
    { provide: 'QuickAccess', useClass: QuickAccess },
    {
      provide: 'ContactSources',
      deps: ['AddressBook', 'AccountContacts'],
      useFactory: ({ addressBook, accountContacts }) => [
        addressBook,
        accountContacts,
      ],
    },
    { provide: 'ContactMatcher', useClass: ContactMatcher },
    { provide: 'RecentMessages', useClass: RecentMessages },
    { provide: 'RecentCalls', useClass: RecentCalls },
    { provide: 'Meeting', useClass: Meeting },
    { provide: 'VideoConfiguration', useClass: VideoConfiguration },
    { provide: 'Webphone', useClass: Webphone },
    { provide: 'ContactSearch', useClass: ContactSearch },
    { provide: 'CallMonitor', useClass: CallMonitor },
    { provide: 'DialerUI', useClass: DialerUI },
    { provide: 'DialerUIOptions', useValue: { useV2: false }, spread: true },
    { provide: 'ConferenceDialerUI', useClass: ConferenceDialerUI },
    { provide: 'ConferenceUI', useClass: ConferenceUI },
    { provide: 'ContactListUI', useClass: ContactListUI },
    { provide: 'ContactDetailsUI', useClass: ContactDetailsUI },
    { provide: 'ActiveCallsUI', useClass: ActiveCallsUI },
    { provide: 'SettingsUI', useClass: SettingsUI },
    { provide: 'ComposeTextUI', useClass: ComposeTextUI },
    { provide: 'CallsListUI', useClass: CallsListUI },
    { provide: 'FeedbackUI', useClass: FeedbackUI },
    { provide: 'UserGuideUI', useClass: UserGuideUI },
    { provide: 'LoginUI', useClass: LoginUI },
    { provide: 'FlipUI', useClass: FlipUI },
    { provide: 'CallBadgeUI', useClass: CallBadgeUI },
    { provide: 'CallHistoryUI', useClass: CallHistoryUI },
    { provide: 'DialerAndCallsTabUI', useClass: DialerAndCallsTabUI },
    { provide: 'TransferUI', useClass: TransferUI },
    { provide: 'ConversationUI', useClass: ConversationUI },
    { provide: 'ConversationsUI', useClass: ConversationsUI },
    { provide: 'SimpleCallControlUI', useClass: SimpleCallControlUI },
    { provide: 'RecentActivityUI', useClass: RecentActivityUI },
    { provide: 'CallsOnholdUI', useClass: CallsOnholdUI },
    { provide: 'Feedback', useClass: Feedback },
    { provide: 'UserGuide', useClass: UserGuide },
    { provide: 'ActiveCallControl', useClass: ActiveCallControl },
    { provide: 'BlockedNumber', useClass: BlockedNumber },
    { provide: 'RcVideo', useClass: RcVideo },
    {
      provide: 'RcVideoOptions',
      useValue: {
        showSaveAsDefault: false,
      },
    },
    {
      // for StorageV2
      provide: 'StorageOptions',
      useValue: {
        StorageProvider: LocalForageStorage, // IndexedDB
        disableInactiveTabsWrite: true,
      },
    },
    {
      // for GlobalStorageV2
      provide: 'GlobalStorageOptions',
      useValue: {
        StorageProvider: LocalForageStorage, // IndexedDB
      },
    },
    {
      provide: 'MessageStoreOptions',
      useValue: {
        daySpan: 90,
        conversationsLoadLength: 10,
        conversationLoadLength: 15,
      },
    },
    {
      provide: 'ConversationsOptions',
      useValue: {
        enableLoadOldMessages: true,
        showMMSAttachment: true,
      },
    },
    { provide: 'ConferenceCall', useClass: ConferenceCall },
    { provide: 'AvailabilityMonitor', useClass: AvailabilityMonitor },
    {
      provide: 'AvailabilityMonitorOptions',
      useValue: {
        enabled: true,
      },
    },
    {
      provide: 'EnvironmentOptions',
      useValue: {
        defaultRecordingHost:
          'https://apps.ringcentral.com/integrations/recording/index.html',
      },
    },
    // {
    //   provide: 'ConferenceCallOptions',
    //   useValue: {
    //     pulling: false,
    //   },
    //   spread: true,
    // },
    {
      provide: 'AccountContactsOptions',
      useValue: {
        avatarTtl: 5 * 60 * 1000,
        presenceTtl: 5 * 60 * 1000,
        needCheckStatus: false,
      },
    },
    {
      provide: 'RouterInteractionOptions',
      useValue: {
        history,
      },
      spread: true,
    },
    {
      provide: 'Analytics',
      useClass: Analytics,
    },
    {
      provide: 'AnalyticsOptions',
      useValue: {
        analyticsKey: '',
        appVersion: '',
        useLog: true,
      },
    },
    { provide: 'AuthOptions', useValue: { usePKCE: true } },
    { provide: 'CRMCheck', useClass: TierChecker },
    { provide: 'GenericMeeting', useClass: GenericMeeting },
    { provide: 'GenericMeetingUI', useClass: GenericMeetingUI },
  ],
})
export default class BasePhone extends RcModule {
  constructor(options) {
    super(options);
    const {
      ringout,
      webphone,
      callingSettings,
      routerInteraction,
      callMonitor,
      contactSearch,
      contacts,
      contactMatcher,
      conferenceCall,
    } = options;

    contactSearch.addSearchSource({
      sourceName: 'contacts',
      async searchFn({ searchString }) {
        const items = await contacts.searchForPhoneNumbers(searchString);
        return items;
      },
      formatFn(entities) {
        return entities;
      },
      readyCheckFn() {
        return contacts.ready;
      },
    });

    contactMatcher.addSearchProvider({
      name: 'contacts',
      async searchFn({ queries }) {
        const items = await contacts.matchContacts({ phoneNumbers: queries });
        return items;
      },
      readyCheckFn() {
        return contacts.ready;
      },
    });

    // Webphone configuration
    webphone.onCallEnd((session, currentSession, ringSession) => {
      const callsOnholdReg = /^\/conferenceCall\/callsOnhold\/(.+)\/(.+)$/;
      const execCallsOnhold = callsOnholdReg.exec(
        routerInteraction.currentPath,
      );

      if (execCallsOnhold) {
        const fromSessionIdOfCallsOnhold = execCallsOnhold[2];
        if (!currentSession || session.id === currentSession.id) {
          routerInteraction.go(-2);
          return;
        }
        if (session.id === fromSessionIdOfCallsOnhold) {
          routerInteraction.replace('/calls/active');
          return;
        }
      }

      const withinCallCtrl = !![
        '/calls/active',
        '/conferenceCall/dialer/',
        '/conferenceCall/callsOnhold',
        '/conferenceCall/participants',
      ].find((path) => routerInteraction.currentPath.indexOf(path) === 0);

      if (
        withinCallCtrl &&
        (!currentSession || session.id === currentSession.id) &&
        !ringSession
      ) {
        if (!currentSession) {
          routerInteraction.replace('/dialer');
          return;
        }
        if (routerInteraction.currentPath.indexOf('/calls/active') === -1) {
          routerInteraction.replace('/calls/active');
          return;
        }
        if (conferenceCall.isMerging) {
          // Do nothing, let the merge() to do the jump
          return;
        }
        routerInteraction.goBack();
        return;
      }

      if (
        currentSession &&
        currentSession.id !== session.id &&
        routerInteraction.currentPath === `/calls/active/${session.id}`
      ) {
        routerInteraction.replace(`/calls/active/${currentSession.id}`);
        return;
      }

      if (!currentSession && ringSession) {
        routerInteraction.push('/calls');
      }
    });

    webphone.onCallInit((session) => {
      const path = `/calls/active/${session.id}`;
      if (routerInteraction.currentPath !== path) {
        if (routerInteraction.currentPath.indexOf('/calls/active') === 0) {
          routerInteraction.replace(path);
        } else {
          routerInteraction.push(path);
        }
      }
    });

    webphone.onCallStart((session) => {
      if (session.direction === callDirections.outbound) {
        return;
      }
      const path = `/calls/active/${session.id}`;
      if (routerInteraction.currentPath !== path) {
        if (routerInteraction.currentPath.indexOf('/calls/active') === 0) {
          routerInteraction.replace(path);
        } else {
          routerInteraction.push(path);
        }
      }
    });

    webphone.onCallRing(() => {
      if (webphone.ringSessions.length > 1) {
        if (routerInteraction.currentPath !== '/calls') {
          routerInteraction.push('/calls');
        }
        webphone.ringSessions.forEach((session) => {
          if (!session.minimized) {
            webphone.toggleMinimized(session.id);
          }
        });
      }
    });

    webphone.onBeforeCallResume((session) => {
      const sessionId = session && session.id;
      const mergingPair = conferenceCall && conferenceCall.mergingPair;
      if (mergingPair && sessionId !== mergingPair.toSessionId) {
        // close merging pair to close the merge call.
        conferenceCall.closeMergingPair();
      }
    });

    webphone.onBeforeCallEnd((session) => {
      const mergingPair = conferenceCall && conferenceCall.mergingPair;
      if (
        session &&
        mergingPair &&
        Object.values(mergingPair).indexOf(session.id) !== -1
      ) {
        // close merging pair to close the merge call.
        conferenceCall.closeMergingPair();
      }
    });

    conferenceCall.onMergeSuccess((conferenceData) => {
      routerInteraction.push(`/calls/active/${conferenceData.sessionId}`);
    });

    // CallMonitor configuration
    this._softphoneConnectTime = null;
    this._softphoneConnectNumber = null;

    callMonitor
      .onCallRinging((call) => {
        // auto nav rules
        if (
          callingSettings.callingMode !== callingModes.webphone && // not webRTC mode
          routerInteraction.currentPath === '/dialer' &&
          // for ringout
          (ringout.ringoutStatus === ringoutStatus.connecting ||
            // for softphone
            (this._softphoneConnectTime &&
              call &&
              call.to &&
              new Date() - this._softphoneConnectTime < 1 * 60 * 1000 && // in 1 minute
              this._normalizeNumber(call.to.phoneNumber) ===
                this._normalizeNumber(this._softphoneConnectNumber)))
        ) {
          routerInteraction.push('/calls');
          this._softphoneConnectTime = null;
          this._softphoneConnectNumber = null;
        }
      })
      .onCallEnded(() => {
        if (
          routerInteraction.currentPath === '/calls' &&
          !hasActiveCalls(this)
        ) {
          routerInteraction.replace('/dialer');
        }
      });
  }

  _normalizeNumber(phoneNumber) {
    return normalizeNumber({
      phoneNumber,
      countryCode: this.regionSettings.countryCode,
      areaCode: this.regionSettings.areaCode,
    });
  }

  initialize() {
    const { accountInfo, appFeatures } = this;
    this.store.subscribe(() => {
      if (this.auth.ready) {
        if (this.routerInteraction.currentPath !== '/' && !this.auth.loggedIn) {
          this.routerInteraction.push('/');
        } else if (
          this.routerInteraction.currentPath === '/' &&
          this.auth.loggedIn &&
          appFeatures.ready &&
          // make sure that we do not show dialer before brand-check
          accountInfo.ready
        ) {
          // Determine default tab
          const showDialPad = appFeatures.isCallingEnabled;
          const showCalls =
            appFeatures.isCallingEnabled &&
            this.callingSettings.ready &&
            this.callingSettings.callWith !== callingOptions.browser;
          const showHistory =
            !!appFeatures.features?.ReadExtensionCallLog?.available;
          const showContact = appFeatures.isCallingEnabled;
          const showComposeText = appFeatures.hasComposeTextPermission;
          const showMessages = appFeatures.hasReadMessagesPermission;
          const showConference = appFeatures.hasConferencing;
          const showMeeting = appFeatures.hasMeetingsPermission;
          if (showDialPad) {
            this.routerInteraction.push('/dialer');
          } else if (showCalls) {
            this.routerInteraction.push('/calls');
          } else if (showHistory) {
            this.routerInteraction.push('/history');
          } else if (showMessages) {
            this.routerInteraction.push('/messages');
          } else if (showComposeText) {
            this.routerInteraction.push('/composeText');
          } else if (showContact) {
            this.routerInteraction.push('/contacts');
          } else if (showMeeting) {
            this.routerInteraction.push('/meeting');
          } else if (showConference) {
            this.routerInteraction.push('/conference');
          } else {
            this.routerInteraction.push('/settings');
          }
        } else if (
          this.routerInteraction.currentPath === '/dialer' &&
          this.softphone.softphoneStatus === softphoneStatus.connecting
        ) {
          this._softphoneConnectTime = new Date();
          this._softphoneConnectNumber = this.softphone.connectingPhoneNumber;
        }
      }
    });
  }

  get _actionTypes() {
    /* no action types */
    return null;
  }
}

export function createPhone({
  prefix = 'rc',
  version = '0.1.0',
  apiConfig,
  brandConfig,
  clientService,
  enableDiscovery = true,
}) {
  @ModuleFactory({
    providers: [
      {
        provide: 'Client',
        useFactory: ({ sdkConfig }) =>
          new RingCentralClient(clientService || new SDK(sdkConfig)),
        deps: [{ dep: 'SdkConfig', useParam: true }],
      },
      {
        provide: 'SdkConfig',
        useValue: {
          ...apiConfig,
          enableDiscovery,
          discoveryServer: apiConfig.discoveryServer || apiConfig.server,
          brandId: brandConfig.id,
          appName: 'Widgets Demo App',
          appVersion: 'N/A',
          cachePrefix: `sdk-${prefix}`,
          clearCacheOnRefreshError: false,
          clientId: apiConfig.clientId || apiConfig.appKey,
          clientSecret: apiConfig.clientSecret || apiConfig.appSecret,
          redirectUri: url.resolve(window.location.href, './redirect.html'),
        },
      },
      {
        provide: 'BrandConfig',
        useValue: brandConfig,
      },
      {
        provide: 'Prefix',
        useValue: prefix,
      },
      {
        provide: 'WebphoneOptions',
        useValue: {
          appKey: apiConfig.clientId || apiConfig.appKey,
          appName: brandConfig.appName,
          appVersion: version,
          webphoneLogLevel: 3,
          // connectDelay: 2000,
          // disconnectOnInactive: true,
        },
      },
      {
        provide: 'Version',
        useFactory: () => version,
      },
    ],
  })
  class Phone extends BasePhone {}
  return Phone.create();
}
