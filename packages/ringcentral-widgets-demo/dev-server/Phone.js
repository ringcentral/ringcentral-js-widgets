import url from 'url';
import { SDK } from '@ringcentral/sdk';
// import RingCentralClient from 'ringcentral-client';
import { RingCentralClient } from 'ringcentral-integration/lib/RingCentralClient';

import { ModuleFactory } from 'ringcentral-integration/lib/di';
import RcModule from 'ringcentral-integration/lib/RcModule';

import { phoneSources } from 'ringcentral-integration/enums/phoneSources';
import callDirections from 'ringcentral-integration/enums/callDirections';
import { callingOptions } from 'ringcentral-integration/modules/CallingSettingsV2/callingOptions';
import { AccountContacts } from 'ringcentral-integration/modules/AccountContactsV2';
import { CompanyContacts } from 'ringcentral-integration/modules/CompanyContactsV2';
import { AddressBook } from 'ringcentral-integration/modules/AddressBookV2';
import { Alert } from 'ringcentral-integration/modules/AlertV2';
import { Brand } from 'ringcentral-integration/modules/BrandV2';
import CallCtrlUI from 'ringcentral-widgets/modules/CallCtrlUI';
import { Contacts } from 'ringcentral-integration/modules/ContactsV2';
import { ContactList } from 'ringcentral-integration/modules/ContactList';
import { ConnectivityMonitor } from 'ringcentral-integration/modules/ConnectivityMonitorV2';
import { DialingPlan } from 'ringcentral-integration/modules/DialingPlanV2';
import { ExtensionDevice } from 'ringcentral-integration/modules/ExtensionDeviceV2';
import { Environment } from 'ringcentral-integration/modules/EnvironmentV2';
import { ExtensionPhoneNumber } from 'ringcentral-integration/modules/ExtensionPhoneNumberV2';

import { ForwardingNumber } from 'ringcentral-integration/modules/ForwardingNumberV2';
import { GlobalStorage } from 'ringcentral-integration/modules/GlobalStorageV2';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { RateLimiter } from 'ringcentral-integration/modules/RateLimiterV2';
import { RegionSettings } from 'ringcentral-integration/modules/RegionSettingsV2';
import { Ringout } from 'ringcentral-integration/modules/RingoutV2';
import { Webphone } from 'ringcentral-integration/modules/WebphoneV2';
import { Softphone } from 'ringcentral-integration/modules/SoftphoneV2';
import { Storage } from 'ringcentral-integration/modules/StorageV2';
import { Subscription } from 'ringcentral-integration/modules/SubscriptionV2';
import { TabManager } from 'ringcentral-integration/modules/TabManagerV2';
import NumberValidate from 'ringcentral-integration/modules/NumberValidate';
import MessageStore from 'ringcentral-integration/modules/MessageStore';
import { ContactSearch } from 'ringcentral-integration/modules/ContactSearchV2';
import { DateTimeFormat } from 'ringcentral-integration/modules/DateTimeFormatV2';
import Conference from 'ringcentral-integration/modules/Conference';
import ConferenceCall from 'ringcentral-integration/modules/ConferenceCall';
import { QuickAccess } from 'ringcentral-integration/modules/QuickAccessV2';
import CallLog from 'ringcentral-integration/modules/CallLog';
import { CallMonitor } from 'ringcentral-integration/modules/CallMonitorV2';
import CallHistory from 'ringcentral-integration/modules/CallHistory';
import RecentMessages from 'ringcentral-integration/modules/RecentMessages';
import RecentCalls from 'ringcentral-integration/modules/RecentCalls';
import { AudioSettings } from 'ringcentral-integration/modules/AudioSettingsV2';
import Meeting from 'ringcentral-integration/modules/Meeting';
import { LocaleSettings } from 'ringcentral-integration/modules/LocaleSettingsV2';
import { ContactMatcher } from 'ringcentral-integration/modules/ContactMatcherV2';
import { Analytics } from 'ringcentral-integration/modules/Analytics';
import Feedback from 'ringcentral-integration/modules/Feedback';
import UserGuide from 'ringcentral-integration/modules/UserGuide';
import { SleepDetector } from 'ringcentral-integration/modules/SleepDetectorV2';

import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';
import DialerUI from 'ringcentral-widgets/modules/DialerUI';
import ConferenceDialerUI from 'ringcentral-widgets/modules/ConferenceDialerUI';
import ConferenceUI from 'ringcentral-widgets/modules/ConferenceUI';
import MeetingUI from 'ringcentral-widgets/modules/MeetingUI';
import { ContactListUI } from 'ringcentral-widgets/modules/ContactListUI';
import { ContactDetailsUI } from 'ringcentral-widgets/modules/ContactDetailsUI';
import OAuth from 'ringcentral-widgets/modules/OAuth';
import AudioSettingsUI from 'ringcentral-widgets/modules/AudioSettingsUI';
import RegionSettingsUI from 'ringcentral-widgets/modules/RegionSettingsUI';
import { CallingSettingsUI } from 'ringcentral-widgets/modules/CallingSettingsUI';
import ConnectivityManager from 'ringcentral-widgets/modules/ConnectivityManager';
import ConnectivityBadgeUI from 'ringcentral-widgets/modules/ConnectivityBadgeUI';
import LoginUI from 'ringcentral-widgets/modules/LoginUI';
import CallBadgeUI from 'ringcentral-widgets/modules/CallBadgeUI';
import CallHistoryUI from 'ringcentral-widgets/modules/CallHistoryUI';

import normalizeNumber from 'ringcentral-integration/lib/normalizeNumber';
import hasActiveCalls from 'ringcentral-widgets/lib/hasActiveCalls';
import ringoutStatus from 'ringcentral-integration/modules/Ringout/ringoutStatus';
import softphoneStatus from 'ringcentral-integration/modules/Softphone/softphoneStatus';
import { callingModes } from 'ringcentral-integration/modules/CallingSettingsV2/callingModes';
import AvailabilityMonitor from 'ringcentral-integration/modules/AvailabilityMonitor';
import ActiveCallsUI from 'ringcentral-widgets/modules/ActiveCallsUI';
import SettingsUI from 'ringcentral-widgets/modules/SettingsUI';
import ComposeTextUI from 'ringcentral-widgets/modules/ComposeTextUI';
import FeedbackUI from 'ringcentral-widgets/modules/FeedbackUI';
import UserGuideUI from 'ringcentral-widgets/modules/UserGuideUI';
import { hashHistory } from 'react-router';
import AlertUI from 'ringcentral-widgets/modules/AlertUI';
import FlipUI from 'ringcentral-widgets/modules/FlipUI';
import TransferUI from 'ringcentral-widgets/modules/TransferUI';
import 'ringcentral-integration/lib/TabFreezePrevention';
import { LocalForageStorage } from 'ringcentral-integration/lib/LocalForageStorage';
import { DataFetcherV2 } from 'ringcentral-integration/modules/DataFetcherV2';
import { ExtensionInfo } from 'ringcentral-integration/modules/ExtensionInfoV2';
import { ExtensionFeatures } from 'ringcentral-integration/modules/ExtensionFeaturesV2';
import { RolesAndPermissions } from 'ringcentral-integration/modules/RolesAndPermissionsV2';
import { AccountInfo } from 'ringcentral-integration/modules/AccountInfoV2';
import { Call } from 'ringcentral-integration/modules/CallV2';
import { ActiveCallControl } from 'ringcentral-integration/modules/ActiveCallControlV2';
import { Auth } from 'ringcentral-integration/modules/AuthV2';
import { MessageSender } from 'ringcentral-integration/modules/MessageSenderV2';
import { ComposeText } from 'ringcentral-integration/modules/ComposeTextV2';
import { CallingSettings } from 'ringcentral-integration/modules/CallingSettingsV2';
import { CallerId } from 'ringcentral-integration/modules/CallerIdV2';
import { BlockedNumber } from 'ringcentral-integration/modules/BlockedNumberV2';
import { Presence } from 'ringcentral-integration/modules/PresenceV2';
import { ActiveCalls } from 'ringcentral-integration/modules/ActiveCallsV2';
import { VideoConfiguration } from 'ringcentral-integration/modules/VideoConfiguration';
import { Conversations } from 'ringcentral-integration/modules/ConversationsV2';

const history =
  global.process &&
  global.process.release &&
  global.process.release.name === 'node'
    ? undefined
    : hashHistory;
@ModuleFactory({
  providers: [
    { provide: 'Alert', useClass: Alert },
    { provide: 'ActiveCalls', useClass: ActiveCalls },
    { provide: 'AlertUI', useClass: AlertUI },
    { provide: 'RegionSettingsUI', useClass: RegionSettingsUI },
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
    // {
    //   provide: 'OAuthOptions',
    //   useValue: {
    //     redirectUri:
    //       'https://nq4a0ukz22.execute-api.us-west-1.amazonaws.com/production/oauthredirect',
    //     proxyUri:
    //       'https://nq4a0ukz22.execute-api.us-west-1.amazonaws.com/production/oauthproxy',
    //   },
    //   spread: true,
    // },
    { provide: 'Ringout', useClass: Ringout },
    { provide: 'ConnectivityMonitor', useClass: ConnectivityMonitor },
    { provide: 'ConnectivityManager', useClass: ConnectivityManager },
    { provide: 'ConnectivityBadgeUI', useClass: ConnectivityBadgeUI },
    { provide: 'RateLimiter', useClass: RateLimiter },
    { provide: 'Storage', useClass: Storage },
    { provide: 'AudioSettings', useClass: AudioSettings },
    { provide: 'AudioSettingsUI', useClass: AudioSettingsUI },
    { provide: 'CompanyContacts', useClass: CompanyContacts },
    { provide: 'AccountInfo', useClass: AccountInfo },
    { provide: 'ExtensionDevice', useClass: ExtensionDevice },
    { provide: 'ExtensionInfo', useClass: ExtensionInfo },
    { provide: 'ExtensionFeatures', useClass: ExtensionFeatures },
    { provide: 'RolesAndPermissions', useClass: RolesAndPermissions },
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
      spread: true,
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
    { provide: 'CallCtrlUI', useClass: CallCtrlUI },
    { provide: 'AccountContacts', useClass: AccountContacts },
    { provide: 'AddressBook', useClass: AddressBook },
    { provide: 'Contacts', useClass: Contacts },
    { provide: 'ContactList', useClass: ContactList },
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
    { provide: 'MeetingProvider', useClass: VideoConfiguration },
    { provide: 'Webphone', useClass: Webphone },
    { provide: 'ContactSearch', useClass: ContactSearch },
    { provide: 'CallMonitor', useClass: CallMonitor },
    { provide: 'DialerUI', useClass: DialerUI },
    { provide: 'DialerUIOptions', useValue: { useV2: false }, spread: true },
    { provide: 'ConferenceDialerUI', useClass: ConferenceDialerUI },
    { provide: 'ConferenceUI', useClass: ConferenceUI },
    { provide: 'MeetingUI', useClass: MeetingUI },
    { provide: 'ContactListUI', useClass: ContactListUI },
    { provide: 'ContactDetailsUI', useClass: ContactDetailsUI },
    { provide: 'ActiveCallsUI', useClass: ActiveCallsUI },
    { provide: 'SettingsUI', useClass: SettingsUI },
    { provide: 'ComposeTextUI', useClass: ComposeTextUI },
    { provide: 'FeedbackUI', useClass: FeedbackUI },
    { provide: 'UserGuideUI', useClass: UserGuideUI },
    { provide: 'LoginUI', useClass: LoginUI },
    { provide: 'FlipUI', useClass: FlipUI },
    { provide: 'CallBadgeUI', useClass: CallBadgeUI },
    { provide: 'CallHistoryUI', useClass: CallHistoryUI },
    { provide: 'TransferUI', useClass: TransferUI },
    { provide: 'Feedback', useClass: Feedback },
    { provide: 'UserGuide', useClass: UserGuide },
    { provide: 'ActiveCallControl', useClass: ActiveCallControl },
    { provide: 'BlockedNumber', useClass: BlockedNumber },
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
      spread: true,
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
      spread: true,
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
      spread: true,
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
        useLog: true,
      },
      spread: true,
    },
    { provide: 'AuthOptions', useValue: { usePKCE: true } },
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

    callMonitor.onCallRinging = (call) => {
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
    };

    const phone = this;
    callMonitor.onCallEnded = () => {
      if (
        routerInteraction.currentPath === '/calls' &&
        !hasActiveCalls(phone)
      ) {
        routerInteraction.replace('/dialer');
      }
    };
  }

  _normalizeNumber(phoneNumber) {
    return normalizeNumber({
      phoneNumber,
      countryCode: this.regionSettings.countryCode,
      areaCode: this.regionSettings.areaCode,
    });
  }

  initialize() {
    const { rolesAndPermissions } = this;
    this.store.subscribe(() => {
      if (this.auth.ready) {
        if (this.routerInteraction.currentPath !== '/' && !this.auth.loggedIn) {
          this.routerInteraction.push('/');
        } else if (
          this.routerInteraction.currentPath === '/' &&
          this.auth.loggedIn &&
          rolesAndPermissions.ready
        ) {
          // Determine default tab
          const showDialPad = rolesAndPermissions.callingEnabled;
          const showCalls =
            rolesAndPermissions.callingEnabled &&
            this.callingSettings.ready &&
            this.callingSettings.callWith !== callingOptions.browser;
          const showHistory = rolesAndPermissions.permissions.ReadCallLog;
          const showContact = rolesAndPermissions.callingEnabled;
          const showComposeText = rolesAndPermissions.hasComposeTextPermission;
          const showMessages = rolesAndPermissions.hasReadMessagesPermission;
          const showConference =
            rolesAndPermissions.permissions.OrganizeConference;
          const showMeeting = rolesAndPermissions.hasMeetingsPermission;
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
        provide: 'ModuleOptions',
        useValue: {
          prefix,
        },
        spread: true,
      },
      {
        provide: 'SdkConfig',
        useValue: {
          ...apiConfig,
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
        // for Brand (V1) deprecated
        provide: 'BrandOptions',
        spread: true,
        useValue: brandConfig,
      },
      {
        // for BrandV2
        provide: 'BrandConfig',
        useValue: brandConfig,
      },
      {
        // for BrandV2
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
