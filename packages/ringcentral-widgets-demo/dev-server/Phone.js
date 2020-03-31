import SDK from 'ringcentral';
import RingCentralClient from 'ringcentral-client';

import { ModuleFactory } from 'ringcentral-integration/lib/di';
import RcModule from 'ringcentral-integration/lib/RcModule';

import callDirections from 'ringcentral-integration/enums/callDirections';
import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import AccountContacts from 'ringcentral-integration/modules/AccountContacts';
import CompanyContacts from 'ringcentral-integration/modules/CompanyContacts';
import AccountInfo from 'ringcentral-integration/modules/AccountInfo';
import AddressBook from 'ringcentral-integration/modules/AddressBook';
import Alert from 'ringcentral-integration/modules/Alert';
import Auth from 'ringcentral-integration/modules/Auth';
import Brand from 'ringcentral-integration/modules/Brand';
import Call from 'ringcentral-integration/modules/Call';
import CallingSettings from 'ringcentral-integration/modules/CallingSettings';
import CallCtrlUI from 'ringcentral-widgets/modules/CallCtrlUI';
import Contacts from 'ringcentral-integration/modules/Contacts';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import DialingPlan from 'ringcentral-integration/modules/DialingPlan';
import ExtensionDevice from 'ringcentral-integration/modules/ExtensionDevice';
import Environment from 'ringcentral-integration/modules/Environment';
import ExtensionInfo from 'ringcentral-integration/modules/ExtensionInfo';
import ExtensionPhoneNumber from 'ringcentral-integration/modules/ExtensionPhoneNumber';
import ForwardingNumber from 'ringcentral-integration/modules/ForwardingNumber';
import GlobalStorage from 'ringcentral-integration/modules/GlobalStorage';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import Ringout from 'ringcentral-integration/modules/Ringout';
import Webphone from 'ringcentral-integration/modules/Webphone';
import RolesAndPermissions from 'ringcentral-integration/modules/RolesAndPermissions';
import Softphone from 'ringcentral-integration/modules/Softphone';
import Storage from 'ringcentral-integration/modules/Storage';
import Subscription from 'ringcentral-integration/modules/Subscription';
import TabManager from 'ringcentral-integration/modules/TabManager';
import NumberValidate from 'ringcentral-integration/modules/NumberValidate';
import MessageSender from 'ringcentral-integration/modules/MessageSender';
import ComposeText from 'ringcentral-integration/modules/ComposeText';
import MessageStore from 'ringcentral-integration/modules/MessageStore';
import Conversations from 'ringcentral-integration/modules/Conversations';
import ContactSearch from 'ringcentral-integration/modules/ContactSearch';
import DateTimeFormat from 'ringcentral-integration/modules/DateTimeFormat';
import Conference from 'ringcentral-integration/modules/Conference';
import ConferenceCall from 'ringcentral-integration/modules/ConferenceCall';
import QuickAccess from 'ringcentral-integration/modules/QuickAccess';
import ActiveCallControl from 'ringcentral-integration/modules/ActiveCallControl';
import Presence from 'ringcentral-integration/modules/Presence';
import CallLog from 'ringcentral-integration/modules/CallLog';
import CallMonitor from 'ringcentral-integration/modules/CallMonitor';
import CallHistory from 'ringcentral-integration/modules/CallHistory';
import RecentMessages from 'ringcentral-integration/modules/RecentMessages';
import RecentCalls from 'ringcentral-integration/modules/RecentCalls';
import AudioSettings from 'ringcentral-integration/modules/AudioSettings';
import Meeting from 'ringcentral-integration/modules/Meeting';
import LocaleSettings from 'ringcentral-integration/modules/LocaleSettings';
import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';
import Analytics from 'ringcentral-integration/modules/Analytics';
import Feedback from 'ringcentral-integration/modules/Feedback';
import UserGuide from 'ringcentral-integration/modules/UserGuide';
import SleepDetector from 'ringcentral-integration/modules/SleepDetector';

import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';
import DialerUI from 'ringcentral-widgets/modules/DialerUI';
import ConferenceDialerUI from 'ringcentral-widgets/modules/ConferenceDialerUI';
import ConferenceUI from 'ringcentral-widgets/modules/ConferenceUI';
import MeetingUI from 'ringcentral-widgets/modules/MeetingUI';
import { ContactDetailsUI } from 'ringcentral-widgets/modules/ContactDetailsUI';
import ProxyFrameOAuth from 'ringcentral-widgets/modules/ProxyFrameOAuth';
import AudioSettingsUI from 'ringcentral-widgets/modules/AudioSettingsUI';
import RegionSettingsUI from 'ringcentral-widgets/modules/RegionSettingsUI';
import CallingSettingsUI from 'ringcentral-widgets/modules/CallingSettingsUI';
import ConnectivityManager from 'ringcentral-widgets/modules/ConnectivityManager';
import ConnectivityBadgeUI from 'ringcentral-widgets/modules/ConnectivityBadgeUI';
import LoginUI from 'ringcentral-widgets/modules/LoginUI';
import CallBadgeUI from 'ringcentral-widgets/modules/CallBadgeUI';
import CallHistoryUI from 'ringcentral-widgets/modules/CallHistoryUI';

import normalizeNumber from 'ringcentral-integration/lib/normalizeNumber';
import hasActiveCalls from 'ringcentral-widgets/lib/hasActiveCalls';
import ringoutStatus from 'ringcentral-integration/modules/Ringout/ringoutStatus';
import softphoneStatus from 'ringcentral-integration/modules/Softphone/softphoneStatus';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
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

const history =
  global.process &&
  global.process.release &&
  global.process.release.name === 'node'
    ? undefined
    : hashHistory;
@ModuleFactory({
  providers: [
    { provide: 'Alert', useClass: Alert },
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
    { provide: 'ProxyFrameOAuth', useClass: ProxyFrameOAuth },
    { provide: 'OAuth', useExisting: 'ProxyFrameOAuth' },
    { provide: 'SleepDetector', useClass: SleepDetector },
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
    { provide: 'RolesAndPermissions', useClass: RolesAndPermissions },
    { provide: 'DialingPlan', useClass: DialingPlan },
    { provide: 'ExtensionPhoneNumber', useClass: ExtensionPhoneNumber },
    { provide: 'ForwardingNumber', useClass: ForwardingNumber },
    { provide: 'RegionSettings', useClass: RegionSettings },
    { provide: 'NumberValidate', useClass: NumberValidate },
    { provide: 'CallingSettings', useClass: CallingSettings },
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
    { provide: 'Webphone', useClass: Webphone },
    { provide: 'ContactSearch', useClass: ContactSearch },
    { provide: 'CallMonitor', useClass: CallMonitor },
    { provide: 'DialerUI', useClass: DialerUI },
    { provide: 'DialerUIOptions', useValue: { useV2: false }, spread: true },
    { provide: 'ConferenceDialerUI', useClass: ConferenceDialerUI },
    { provide: 'ConferenceUI', useClass: ConferenceUI },
    { provide: 'MeetingUI', useClass: MeetingUI },
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
    {
      provide: 'StorageOptions',
      useValue: {
        // StorageProvider: LocalForageStorage, // IndexedDB
        disableAllowInactiveTabsWrite: true,
      },
      spread: true,
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
      spread: true,
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
      provide: 'CompanyContactsOptions',
      useValue: {
        polling: true,
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
      searchFn({ searchString }) {
        const items = contacts.allContacts;
        if (!searchString) {
          return items;
        }
        const searchText = searchString.toLowerCase();
        const result = [];
        items.forEach((item) => {
          const name = item.name || `${item.firstName} ${item.lastName}`;
          item.phoneNumbers.forEach((p) => {
            if (
              name.toLowerCase().indexOf(searchText) >= 0 ||
              p.phoneNumber.indexOf(searchText) >= 0
            ) {
              result.push({
                id: `${item.id}${p.phoneNumber}`,
                name,
                type: item.type,
                phoneNumber: p.phoneNumber,
                phoneType: p.phoneType.replace('Phone', ''),
                entityType: 'contact',
              });
            }
          });
        });
        return result;
      },
      formatFn: (entities) => entities,
      readyCheckFn: () => contacts.ready,
    });
    contactMatcher.addSearchProvider({
      name: 'contacts',
      searchFn: async ({ queries }) =>
        contacts.matchContacts({ phoneNumbers: queries }),
      readyCheckFn: () => contacts.ready,
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

    callMonitor._onRinging = (call) => {
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
    callMonitor._onCallEnded = () => {
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
          const showMeeting = rolesAndPermissions.permissions.Meetings;
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
          cachePrefix: 'sdk-rc',
          clearCacheOnRefreshError: false,
        },
      },
      {
        provide: 'EnvironmentOptions',
        useValue: {
          sdkConfig: {
            ...apiConfig,
            appName: 'Widgets Demo App',
            appVersion: 'N/A',
            cachePrefix: 'sdk-rc',
            clearCacheOnRefreshError: false,
          },
        },
        spread: true,
      },
      {
        provide: 'BrandOptions',
        spread: true,
        useValue: brandConfig,
      },
      {
        provide: 'WebphoneOptions',
        spread: true,
        useValue: {
          appKey: apiConfig.appKey,
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
