import SDK from 'ringcentral';
import RingCentralClient from 'ringcentral-client';

import { ModuleFactory } from '../../../lib/di';
import RcModule from '../../../lib/RcModule';

import AccountContacts from '../../../modules/AccountContacts';
import AccountDirectory from '../../../modules/AccountDirectory';
import AccountInfo from '../../../modules/AccountInfo';
// import AccountPhoneNumber from '../../../modules/AccountPhoneNumber';
import AddressBook from '../../../modules/AddressBook';
import Alert from '../../../modules/Alert';
import Auth from '../../../modules/Auth';
import Brand from '../../../modules/Brand';
import Call from '../../../modules/Call';
import CallingSettings from '../../../modules/CallingSettings';
import Contacts from '../../../modules/Contacts';
import ContactDetails from '../../../modules/ContactDetails';
import ConnectivityMonitor from '../../../modules/ConnectivityMonitor';
import DialingPlan from '../../../modules/DialingPlan';
import ExtensionDevice from '../../../modules/ExtensionDevice';
import Environment from '../../../modules/Environment';
import ExtensionInfo from '../../../modules/ExtensionInfo';
import ExtensionPhoneNumber from '../../../modules/ExtensionPhoneNumber';
import ForwardingNumber from '../../../modules/ForwardingNumber';
import GlobalStorage from '../../../modules/GlobalStorage';
import Locale from '../../../modules/Locale';
import RateLimiter from '../../../modules/RateLimiter';
import RegionSettings from '../../../modules/RegionSettings';
import Ringout from '../../../modules/Ringout';
import Webphone from '../../../modules/Webphone';
import RolesAndPermissions from '../../../modules/RolesAndPermissions';
import Softphone from '../../../modules/Softphone';
import Storage from '../../../modules/Storage';
import Subscription from '../../../modules/Subscription';
import TabManager from '../../../modules/TabManager';
import NumberValidate from '../../../modules/NumberValidate';
import MessageSender from '../../../modules/MessageSender';
import ComposeText from '../../../modules/ComposeText';
import MessageStore from '../../../modules/MessageStore';
import Conversations from '../../../modules/Conversations';
import ContactSearch from '../../../modules/ContactSearch';
import DateTimeFormat from '../../../modules/DateTimeFormat';
import Conference from '../../../modules/Conference';
import ConferenceCall from '../../../modules/ConferenceCall';
import QuickAccess from '../../../modules/QuickAccess';
import ActiveCallControl from '../../../modules/ActiveCallControl';

import ActiveCalls from '../../../modules/ActiveCalls';
import DetailedPresence from '../../../modules/DetailedPresence';
import CallLog from '../../../modules/CallLog';
import CallMonitor from '../../../modules/CallMonitor';
import CallHistory from '../../../modules/CallHistory';
import RecentMessages from '../../../modules/RecentMessages';
import RecentCalls from '../../../modules/RecentCalls';
import AudioSettings from '../../../modules/AudioSettings';
import Meeting from '../../../modules/Meeting';
import LocaleSettings from '../../../modules/LocaleSettings';
import ContactMatcher from '../../../modules/ContactMatcher';
import UserGuide from '../../../modules/UserGuide';

import normalizeNumber from '../../../lib/normalizeNumber';
import ringoutStatus from '../../../modules/Ringout/ringoutStatus';
import softphoneStatus from '../../../modules/Softphone/softphoneStatus';
import callingModes from '../../../modules/CallingSettings/callingModes';
import AvailabilityMonitor from '../../../modules/AvailabilityMonitor';
import BlockedNumber from '../../../modules/BlockedNumber';

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
    { provide: 'Ringout', useClass: Ringout },
    { provide: 'ConnectivityMonitor', useClass: ConnectivityMonitor },
    { provide: 'RateLimiter', useClass: RateLimiter },
    { provide: 'Storage', useClass: Storage },
    { provide: 'AudioSettings', useClass: AudioSettings },
    { provide: 'AccountDirectory', useClass: AccountDirectory },
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
    { provide: 'CallLog', useClass: CallLog },
    { provide: 'CallHistory', useClass: CallHistory },
    // { provide: 'AccountPhoneNumber', useClass: AccountPhoneNumber },
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
    // provide: 'ConferenceCallOptions',
    // useValue: {
    // pulling: false,
    // },
    // spread: true,
    // },
    { provide: 'AvailabilityMonitor', useClass: AvailabilityMonitor },
    { provide: 'BlockedNumber', useClass: BlockedNumber }
  ]
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

    //     contactSearch.addSearchSource({
    //       sourceName: 'contacts',
    //       searchFn({ searchString }) {
    //         const items = contacts.allContacts;
    //         if (!searchString) {
    //           return items;
    //         }
    //         const searchText = searchString.toLowerCase();
    //         const result = [];
    //         items.forEach((item) => {
    //           const name = item.name || `${item.firstName} ${item.lastName}`;
    //           item.phoneNumbers.forEach((p) => {
    //             if (
    //               name.toLowerCase().indexOf(searchText) >= 0 ||
    // p.phoneNumber.indexOf(searchText) >= 0
    //             ) {
    //               result.push({
    //                 id: `${item.id}${p.phoneNumber}`,
    //                 name,
    //                 type: item.type,
    //                 phoneNumber: p.phoneNumber,
    //                 phoneType: p.phoneType.replace('Phone', ''),
    //                 entityType: 'contact',
    //               });
    //             }
    //           });
    //         });
    //         return result;
    //       },
    //       formatFn: entities => entities,
    //       readyCheckFn: () => contacts.ready,
    //     });
    //     contactMatcher.addSearchProvider({
    //       name: 'contacts',
    //       searchFn: async ({ queries }) => contacts.matchContacts({ phoneNumbers: queries }),
    //       readyCheckFn: () => contacts.ready,
    //     });

    //     // Webphone configuration
    //     webphone.onCallEnd((session, currentSession, ringSession) => {
    //       const callsOnholdReg = /^\/conferenceCall\/callsOnhold\/(.+)\/(.+)$/;
    //       const execCallsOnhold = callsOnholdReg.exec(routerInteraction.currentPath);

    //       if (execCallsOnhold) {
    //         const fromSessionIdOfCallsOnhold = execCallsOnhold[2];
    //         if (!currentSession || session.id === currentSession.id) {
    //           routerInteraction.go(-2);
    //           return;
    //         }
    //         if (session.id === fromSessionIdOfCallsOnhold) {
    //           routerInteraction.replace('/calls/active');
    //           return;
    //         }
    //       }

    //       const withinCallCtrl = !![
    //         '/calls/active',
    //         '/conferenceCall/dialer/',
    //         '/conferenceCall/callsOnhold',
    //         '/conferenceCall/participants',
    //       ].find(path => routerInteraction.currentPath.indexOf(path) === 0);

    //       if (
    //         withinCallCtrl
    // && (!currentSession || session.id === currentSession.id)
    // && !ringSession
    //       ) {
    //         if (!currentSession) {
    //           routerInteraction.replace('/dialer');
    //           return;
    //         }
    //         if (routerInteraction.currentPath.indexOf('/calls/active') === -1) {
    //           routerInteraction.replace('/calls/active');
    //           return;
    //         }
    //         if (conferenceCall.isMerging) {
    //           // Do nothing, let the merge() to do the jump
    //           return;
    //         }
    //         routerInteraction.goBack();
    //         return;
    //       }

    //       if (
    //         currentSession
    // && currentSession.id !== session.id
    // && routerInteraction.currentPath === `/calls/active/${session.id}`
    //       ) {
    //         routerInteraction.replace(`/calls/active/${currentSession.id}`);
    //         return;
    //       }

    //       if (!currentSession && ringSession) {
    //         routerInteraction.push('/calls');
    //       }
    //     });

    //     webphone.onCallStart((session) => {
    //       const path = `/calls/active/${session.id}`;
    //       if (routerInteraction.currentPath !== path) {
    //         if (routerInteraction.currentPath.indexOf('/calls/active') === 0) {
    //           routerInteraction.replace(path);
    //         } else {
    //           routerInteraction.push(path);
    //         }
    //       }
    //     });

    //     webphone.onCallRing(() => {
    //       if (webphone.ringSessions.length > 1) {
    //         if (routerInteraction.currentPath !== '/calls') {
    //           routerInteraction.push('/calls');
    //         }
    //         webphone.ringSessions.forEach((session) => {
    //           if (!session.minimized) {
    //             webphone.toggleMinimized(session.id);
    //           }
    //         });
    //       }
    //     });

    //     webphone.onBeforeCallResume((session) => {
    //       const sessionId = session && session.id;
    //       const mergingPair = conferenceCall && conferenceCall.mergingPair;
    //       if (mergingPair && sessionId !== mergingPair.toSessionId) {
    //         // close merging pair to close the merge call.
    //         conferenceCall.closeMergingPair();
    //       }
    //     });

    //     webphone.onBeforeCallEnd((session) => {
    //       const mergingPair = conferenceCall && conferenceCall.mergingPair;
    //       if (
    //         session
    // && mergingPair
    // && (Object.values(mergingPair).indexOf(session.id) !== -1)
    //       ) {
    //         // close merging pair to close the merge call.
    //         conferenceCall.closeMergingPair();
    //       }
    //     });

    //     conferenceCall.onMergeSuccess((conferenceData) => {
    //       routerInteraction.push(`/calls/active/${conferenceData.sessionId}`);
    //     });

    //     // CallMonitor configuration
    //     this._softphoneConnectTime = null;
    //     this._softphoneConnectNumber = null;

    //     callMonitor._onRinging = (call) => {
    //       // auto nav rules
    //       if (
    //         callingSettings.callingMode !== callingModes.webphone // not webRTC mode
    // && routerInteraction.currentPath === '/dialer'
    // && (
    // // for ringout
    //   ringout.ringoutStatus === ringoutStatus.connecting
    // // for softphone
    // || (
    //   this._softphoneConnectTime && call && call.to
    // && (new Date() - this._softphoneConnectTime) < 1 * 60 * 1000 // in 1 minute
    // && this._normalizeNumber(call.to.phoneNumber)
    // === this._normalizeNumber(this._softphoneConnectNumber)
    // )
    // )
    //       ) {
    //         routerInteraction.push('/calls');
    //         this._softphoneConnectTime = null;
    //         this._softphoneConnectNumber = null;
    //       }
    //     };

    //     const phone = this;
    //     callMonitor._onCallEnded = () => {
    //       if (
    //         routerInteraction.currentPath === '/calls'
    // && !hasActiveCalls(phone)
    //       ) {
    //         routerInteraction.replace('/dialer');
    //       }
    //     };
  }

  _normalizeNumber(phoneNumber) {
    return normalizeNumber({
      phoneNumber,
      countryCode: this.regionSettings.countryCode,
      areaCode: this.regionSettings.areaCode,
    });
  }

  //   initialize() {
  //     const { rolesAndPermissions } = this;
  //     this.store.subscribe(() => {
  //       if (this.auth.ready) {
  //         if (
  //           this.routerInteraction.currentPath !== '/'
  // && !this.auth.loggedIn
  //         ) {
  //           this.routerInteraction.push('/');
  //         } else if (
  //           this.routerInteraction.currentPath === '/'
  // && this.auth.loggedIn
  // && rolesAndPermissions.ready
  //         ) {
  //           // Determine default tab
  //           const showDialPad = rolesAndPermissions.callingEnabled;
  //           const showCalls = (
  //             rolesAndPermissions.callingEnabled
  // && this.callingSettings.ready
  // && this.callingSettings.callWith !== callingOptions.browser
  //           );
  //           const showHistory = rolesAndPermissions.permissions.ReadCallLog;
  //           const showContact = rolesAndPermissions.callingEnabled;
  //           const showComposeText = rolesAndPermissions.hasComposeTextPermission;
  //           const showMessages = rolesAndPermissions.hasReadMessagesPermission;
  //           const showConference = rolesAndPermissions.permissions.OrganizeConference;
  //           const showMeeting = rolesAndPermissions.permissions.Meetings;
  //           if (showDialPad) {
  //             this.routerInteraction.push('/dialer');
  //           } else if (showCalls) {
  //             this.routerInteraction.push('/calls');
  //           } else if (showHistory) {
  //             this.routerInteraction.push('/history');
  //           } else if (showMessages) {
  //             this.routerInteraction.push('/messages');
  //           } else if (showComposeText) {
  //             this.routerInteraction.push('/composeText');
  //           } else if (showContact) {
  //             this.routerInteraction.push('/contacts');
  //           } else if (showMeeting) {
  //             this.routerInteraction.push('/meeting');
  //           } else if (showConference) {
  //             this.routerInteraction.push('/conference');
  //           } else {
  //             this.routerInteraction.push('/settings');
  //           }
  //         } else if (
  //           this.routerInteraction.currentPath === '/dialer'
  // && this.softphone.softphoneStatus === softphoneStatus.connecting
  //         ) {
  //           this._softphoneConnectTime = new Date();
  //           this._softphoneConnectNumber = this.softphone.connectingPhoneNumber;
  //         }
  //       }
  //     });
  //   }

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
        // appKey: apiConfig.appKey,
        appKey: 'eac8797af1b3502F2CEAAEECAC3Ed378AA7858A386656f28A008b0c638A754B1',
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
