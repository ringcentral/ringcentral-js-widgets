import SDK from 'ringcentral';
import RingCentralClient from 'ringcentral-client';

import RcModule from 'ringcentral-integration/lib/RcModule';

import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import AccountContacts from 'ringcentral-integration/modules/AccountContacts';
import AccountExtension from 'ringcentral-integration/modules/AccountExtension';
import AccountInfo from 'ringcentral-integration/modules/AccountInfo';
import AccountPhoneNumber from 'ringcentral-integration/modules/AccountPhoneNumber';
import AddressBook from 'ringcentral-integration/modules/AddressBook';
import Alert from 'ringcentral-integration/modules/Alert';
import Auth from 'ringcentral-integration/modules/Auth';
import Brand from 'ringcentral-integration/modules/Brand';
import Call from 'ringcentral-integration/modules/Call';
import CallingSettings from 'ringcentral-integration/modules/CallingSettings';
import Contacts from 'ringcentral-integration/modules/Contacts';
import ContactDetails from 'ringcentral-integration/modules/ContactDetails';
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

import ActiveCalls from 'ringcentral-integration/modules/ActiveCalls';
import DetailedPresence from 'ringcentral-integration/modules/DetailedPresence';
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
import { ModuleFactory } from 'ringcentral-integration/lib/di';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';
import DialerUI from 'ringcentral-widgets/modules/DialerUI';
import ConferenceDialerUI from 'ringcentral-widgets/modules/ConferenceDialerUI';
import ProxyFrameOAuth from 'ringcentral-widgets/modules/ProxyFrameOAuth';

@ModuleFactory({
  providers: [
    {
      provide: 'Client',
      useFactory: ({ sdkConfig }) => (
        new RingCentralClient(new SDK(sdkConfig))
      ),
      deps: [
        { dep: 'SdkConfig', useParam: true, },
      ],
    },
    { provide: 'Alert', useClass: Alert },
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
    { provide: 'Ringout', useClass: Ringout },
    { provide: 'ConnectivityMonitor', useClass: ConnectivityMonitor },
    { provide: 'RateLimiter', useClass: RateLimiter },
    { provide: 'Storage', useClass: Storage },
    { provide: 'AudioSettings', useClass: AudioSettings },
    { provide: 'AccountExtension', useClass: AccountExtension },
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
    { provide: 'Call', useClass: Call },
    { provide: 'Subscription', useClass: Subscription },
    { provide: 'ActiveCalls', useClass: ActiveCalls },
    { provide: 'DetailedPresence', useClass: DetailedPresence },
    { provide: 'MessageSender', useClass: MessageSender },
    { provide: 'ComposeText', useClass: ComposeText },
    { provide: 'MessageStore', useClass: MessageStore },
    { provide: 'Conversations', useClass: Conversations },
    { provide: 'Conference', useClass: Conference },
    { provide: 'RouterInteraction', useClass: RouterInteraction },
    { provide: 'CallLog', useClass: CallLog },
    { provide: 'CallHistory', useClass: CallHistory },
    { provide: 'AccountPhoneNumber', useClass: AccountPhoneNumber },
    { provide: 'AccountContacts', useClass: AccountContacts },
    { provide: 'AddressBook', useClass: AddressBook },
    { provide: 'Contacts', useClass: Contacts },
    { provide: 'QuickAccess', useClass: QuickAccess },
    {
      provide: 'ContactSources',
      deps: ['AddressBook', 'AccountContacts'],
      useFactory: ({ addressBook, accountContacts }) => ([
        addressBook,
        accountContacts,
      ])
    },
    { provide: 'ContactDetails', useClass: ContactDetails },
    { provide: 'ContactMatcher', useClass: ContactMatcher },
    { provide: 'RecentMessages', useClass: RecentMessages },
    { provide: 'RecentCalls', useClass: RecentCalls },
    { provide: 'Meeting', useClass: Meeting },
    { provide: 'Webphone', useClass: Webphone },
    { provide: 'ContactSearch', useClass: ContactSearch },
    { provide: 'CallMonitor', useClass: CallMonitor },
    { provide: 'DialerUI', useClass: DialerUI },
    { provide: 'ConferenceDialerUI', useClass: ConferenceDialerUI },
    { provide: 'Feedback', useClass: Feedback },
    { provide: 'UserGuide', useClass: UserGuide },
    { provide: 'ActiveCallControl', useClass: ActiveCallControl },
    {
      provide: 'StorageOptions',
      useValue: {
        // StorageProvider: LocalForageStorage, // IndexedDB
        disableAllowInactiveTabsWrite: true,
      },
      spread: true
    },
    {
      provide: 'MessageStoreOptions',
      useValue: {
        daySpan: 90,
        conversationsLoadLength: 10,
        conversationLoadLength: 15,
      },
      spread: true
    },
    {
      provide: 'ConversationsOptions',
      useValue: {
        enableLoadOldMessages: true,
        showMMSAttachment: true,
      },
      spread: true
    },
    { provide: 'ConferenceCall', useClass: ConferenceCall },
    // {
    //   provide: 'ConferenceCallOptions',
    //   useValue: {
    //     pulling: false,
    //   },
    //   spread: true,
    // },
  ]
})
export default class BasePhone extends RcModule {
  constructor({
    webphone,
    routerInteraction,
    callMonitor,
    contactSearch,
    contacts,
    contactMatcher,
    conferenceCall,
    ...options
  }) {
    super({
      ...options,
    });

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
      formatFn: entities => entities,
      readyCheckFn: () => contacts.ready,
    });
    contactMatcher.addSearchProvider({
      name: 'contacts',
      searchFn: async ({ queries }) => contacts.matchContacts({ phoneNumbers: queries }),
      readyCheckFn: () => contacts.ready,
    });

    webphone.onCallEnd((session, currentSession, ringSession) => {
      const callsOnholdReg = /^\/conferenceCall\/callsOnhold\/(.+)\/(.+)$/;
      const execCallsOnhold = callsOnholdReg.exec(routerInteraction.currentPath);

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
      ].find(path => routerInteraction.currentPath.indexOf(path) === 0);

      if (
        withinCallCtrl
        && (!currentSession || session.id === currentSession.id)
        && !ringSession
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
        currentSession
        && currentSession.id !== session.id
        && routerInteraction.currentPath === `/calls/active/${session.id}`
      ) {
        routerInteraction.replace(`/calls/active/${currentSession.id}`);
        return;
      }

      if (!currentSession && ringSession) {
        routerInteraction.push('/calls');
        return;
      }

      if (
        routerInteraction.currentPath === '/calls'
        && !callMonitor.activeRingCalls.length
        && !callMonitor.activeOnHoldCalls.length
        && !callMonitor.activeCurrentCalls.length
        && !conferenceCall.isMerging
        // && callMonitor.otherDeviceCalls.length === 0
      ) {
        routerInteraction.replace('/dialer');
      }
    });

    webphone.onCallStart(({ id }) => {
      const path = `/calls/active/${id}`;
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
          webphone.toggleMinimized(session.id);
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
        session
        && mergingPair
        && (Object.values(mergingPair).indexOf(session.id) !== -1)
      ) {
        // close merging pair to close the merge call.
        conferenceCall.closeMergingPair();
      }
    });

    conferenceCall.onMergeSuccess((conferenceData) => {
      routerInteraction.push(`/calls/active/${conferenceData.sessionId}`);
    });

    // CallMonitor configuration
    callMonitor._onRinging = async () => {
      if (this.webphone._webphone) {
        return;
      }
      // TODO refactor some of these logic into appropriate modules
      this.routerInteraction.push('/calls');
    };
  }

  initialize() {
    const { rolesAndPermissions } = this;
    this.store.subscribe(() => {
      if (this.auth.ready) {
        if (
          this.routerInteraction.currentPath !== '/' &&
          !this.auth.loggedIn
        ) {
          this.routerInteraction.push('/');
        } else if (
          this.routerInteraction.currentPath === '/' &&
          this.auth.loggedIn &&
          rolesAndPermissions.ready
        ) {
          // Determine default tab
          const showDialPad = rolesAndPermissions.callingEnabled;
          const showCalls = rolesAndPermissions.callingEnabled &&
            this.callingSettings.ready &&
            this.callingSettings.callWith !== callingOptions.browser;
          const showHistory = rolesAndPermissions.permissions.ReadCallLog;
          const showContact = rolesAndPermissions.callingEnabled;
          const showComposeText = rolesAndPermissions.hasComposeTextPermission;
          const showMessages = rolesAndPermissions.hasReadMessagesPermission;
          const showConference = rolesAndPermissions.permissions.OrganizeConference;
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
}) {
  @ModuleFactory({
    providers: [
      {
        provide: 'ModuleOptions',
        useValue: {
          prefix
        },
        spread: true
      },
      {
        provide: 'SdkConfig',
        useValue: {
          ...apiConfig,
          cachePrefix: 'sdk-rc',
          clearCacheOnRefreshError: false,
        },
      },
      {
        provide: 'EnvironmentOptions',
        useValue: {
          sdkConfig: {
            ...apiConfig,
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
          webphoneLogLevel: 1,
        },
      },
      {
        provide: 'Version',
        useFactory: () => version,
      },
    ]
  })
  class Phone extends BasePhone { }
  return Phone.create();
}
