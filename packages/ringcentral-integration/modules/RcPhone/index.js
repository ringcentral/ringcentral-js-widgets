import 'whatwg-fetch';
import SDK from 'ringcentral';
import RingCentralClient from 'ringcentral-client';

import { ModuleFactory } from '../../lib/di';
import RcModule from '../../lib/RcModule';

import AccountContacts from '../AccountContacts';
import AccountExtension from '../AccountExtension';
import AccountInfo from '../AccountInfo';
import AccountPhoneNumber from '../AccountPhoneNumber';
import ActivityMatcher from '../ActivityMatcher';
import AddressBook from '../AddressBook';
import Alert from '../Alert';
import Auth from '../Auth';
import BlockedNumber from '../BlockedNumber';
import Brand from '../Brand';
import Call from '../Call';
import CallHistory from '../CallHistory';
import CallingSettings from '../CallingSettings';
import CallLog from '../CallLog';
import CallLogger from '../CallLogger';
import CallMonitor from '../CallMonitor';
import ComposeText from '../ComposeText';
import Conference from '../Conference';
import ConnectivityMonitor from '../ConnectivityMonitor';
import ContactMatcher from '../ContactMatcher';
import Contacts from '../Contacts';
import ContactDetails from '../ContactDetails';
import ContactSearch from '../ContactSearch';
import Conversation from '../Conversation';
import ConversationLogger from '../ConversationLogger';
import ConversationMatcher from '../ConversationMatcher';
import DateTimeFormat from '../DateTimeFormat';
import Presence from '../Presence';
import DetailedPresence from '../DetailedPresence';
import DialingPlan from '../DialingPlan';
import Environment from '../Environment';
import ExtensionDevice from '../ExtensionDevice';
import ExtensionInfo from '../ExtensionInfo';
import ExtensionPhoneNumber from '../ExtensionPhoneNumber';
import ForwardingNumber from '../ForwardingNumber';
import GlobalStorage from '../GlobalStorage';
import Locale from '../Locale';
import Messages from '../Messages';
import MessageSender from '../MessageSender';
import MessageStore from '../MessageStore';
import NumberValidate from '../NumberValidate';
import RateLimiter from '../RateLimiter';
import RegionSettings from '../RegionSettings';
import Ringout from '../Ringout';
import RolesAndPermissions from '../RolesAndPermissions';
import Softphone from '../Softphone';
import Storage from '../Storage';
import Subscription from '../Subscription';
import TabManager from '../TabManager';
import Webphone from '../Webphone';
import RecentMessages from '../RecentMessages';
import RecentCalls from '../RecentCalls';
import Analytics from '../Analytics';
import AudioSettings from '../AudioSettings';
import Meeting from '../Meeting';
import GlipCompany from '../GlipCompany';
import GlipPersons from '../GlipPersons';
import GlipPosts from '../GlipPosts';
import GlipGroups from '../GlipGroups';

@ModuleFactory({
  providers: [
    AudioSettings,
    Alert,
    Brand,
    Locale,
    TabManager,
    GlobalStorage,
    Environment,
    ConnectivityMonitor,
    Auth,
    Storage,
    RateLimiter,
    ExtensionDevice,
    Softphone,
    Ringout,
    AccountInfo,
    ExtensionInfo,
    RolesAndPermissions,
    DialingPlan,
    ExtensionPhoneNumber,
    ForwardingNumber,
    BlockedNumber,
    ContactMatcher,
    Subscription,
    RegionSettings,
    AccountExtension,
    NumberValidate,
    Webphone,
    CallingSettings,
    Presence,
    DetailedPresence,
    CallLog,
    Call,
    MessageSender,
    ComposeText,
    CallMonitor,
    CallHistory,
    ActivityMatcher,
    ConversationMatcher,
    ContactSearch,
    MessageStore,
    Conversation,
    DateTimeFormat,
    Conference,
    CallLogger,
    AccountPhoneNumber,
    AddressBook,
    AccountContacts,
    Contacts,
    ContactDetails,
    ConversationLogger,
    Messages,
    RecentMessages,
    RecentCalls,
    Analytics,
    Meeting,
    GlipCompany,
    GlipPersons,
    GlipPosts,
    GlipGroups,
    {
      provide: 'ModuleOptions',
      useValue: { prefix: 'rc-phone' },
      spread: true
    },
    {
      provide: 'Client',
      useFactory: ({ clientOptions, config }) =>
        new RingCentralClient(new SDK({
          clearCacheOnRefreshError: false,
          cachePrefix: 'rc-sdk',
          ...config,
          ...clientOptions,
        })),
      deps: [{ dep: 'Config' }, { dep: 'ClientOptions', optional: true }]
    },
    {
      provide: 'BrandOptions',
      spread: true,
      useValue: { id: '1210', name: 'RingCentral', fullName: 'RingCentral' }
    },
    {
      provide: 'ConnectivityMonitorOptions',
      useValue: { checkConnectionFunc: async () => { await fetch('//pubsub.pubnub.com/time/0'); } },
      spread: true
    },
    {
      provide: 'CallLoggerOptions',
      useValue: {
        logFunction: async () => { },
        readyCheckFunction: () => true
      },
      spread: true
    },
    {
      provide: 'WebphoneOptions',
      spread: true,
      useValue: { appKey: null, appName: null, appVersion: null }
    },
    {
      provide: 'ConversationLoggerOptions',
      useValue: {
        logFunction: async () => { },
        readyCheckFunction: () => true
      },
      spread: true
    },
    { provide: 'SoftphoneOptions', useValue: { extensionMode: null }, spread: true },
    {
      provide: 'ContactSources',
      useFactory: ({ addressBook, accountContacts }) =>
        [addressBook, accountContacts],
      deps: ['AccountContacts', 'AddressBook']
    },
    {
      provide: 'EnvironmentOptions',
      useFactory: ({ clientOptions, config }) => ({
        sdkConfig: {
          cachePrefix: 'rc-sdk',
          clearCacheOnRefreshError: false,
          ...config,
          ...clientOptions,
        },
      }),
      deps: [{ dep: 'Config' }, { dep: 'ClientOptions', optional: true }]
    },
  ]
})
export default class RcPhone extends RcModule {
  constructor({ moduleOptions, ...modules }) {
    super({ prefix: moduleOptions.prefix, ...modules });
    const {
      router,
      webphone,
      contactSearch,
      contacts,
      callMonitor,
      contactMatcher,
    } = modules;

    // Webphone configuration
    // webphone._onCallEndFunc = (session) => {
    //   if (router.currentPath !== '/calls/active') {
    //     return;
    //   }
    //   const currentSession = webphone.activeSession;
    //   if (currentSession && session.id !== currentSession.id) {
    //     return;
    //   }
    //   router.goBack();
    // };
    // webphone._onCallStartFunc = () => {
    //   if (router.currentPath === '/calls/active') {
    //     return;
    //   }
    //   router.push('/calls/active');
    // };
    // webphone._onCallRingFunc = () => {
    //   if (
    //     webphone.ringSessions.length > 1
    //   ) {
    //     if (router.currentPath !== '/calls') {
    //       router.push('/calls');
    //     }
    //     webphone.ringSessions.forEach((session) => {
    //       webphone.toggleMinimized(session.id);
    //     });
    //   }
    // };

    // ContactMatcher configuration
    contactMatcher.addSearchProvider({
      name: 'contacts',
      searchFn: async ({ queries }) => this.contacts.matchContacts({ phoneNumbers: queries }),
      readyCheckFn: () => this.contacts.ready,
    });

    // ContactSearch configuration
    contactSearch.addSearchSource({
      sourceName: 'companyContacts',
      searchFn: ({ searchString }) => {
        const items = contacts.companyContacts;
        if (!searchString) {
          return items;
        }
        const searchText = searchString.toLowerCase();
        return items.filter((item) => {
          const name = `${item.firstName} ${item.lastName}`;
          if (
            name.toLowerCase().indexOf(searchText) >= 0 ||
            item.extensionNumber.indexOf(searchText) >= 0 ||
            item.phoneNumbers.find(x => x.phoneNumber.indexOf(searchText) >= 0)
          ) {
            return true;
          }
          return false;
        });
      },
      formatFn: entities => entities.map(entity => ({
        id: entity.id.toString(),
        type: entity.type,
        name: `${entity.firstName} ${entity.lastName}`,
        hasProfileImage: !!entity.hasProfileImage,
        phoneNumbers: entity.phoneNumbers,
        phoneNumber: entity.extensionNumber,
        phoneType: 'extension',
        entityType: 'companyContact',
      })),
      readyCheckFn: () => contacts.ready,
    });
    contactSearch.addSearchSource({
      sourceName: 'personalContacts',
      searchFn: ({ searchString }) => {
        const items = contacts.personalContacts;
        if (!searchString) {
          return items;
        }
        const searchText = searchString.toLowerCase();
        return items.filter((item) => {
          const name = `${item.firstName} ${item.lastName}`;
          if (
            name.toLowerCase().indexOf(searchText) >= 0 ||
            item.phoneNumbers.find(x => x.phoneNumber.indexOf(searchText) >= 0)
          ) {
            return true;
          }
          return false;
        });
      },
      formatFn: entities => entities.map(entity => ({
        id: entity.id.toString(),
        type: entity.type,
        name: `${entity.firstName} ${entity.lastName}`,
        hasProfileImage: false,
        phoneNumbers: entity.phoneNumbers,
        phoneNumber: entity.phoneNumbers[0] && entity.phoneNumbers[0].phoneNumber,
        phoneType: entity.phoneNumbers[0] && entity.phoneNumbers[0].phoneType,
        entityType: 'personalContact',
      })),
      readyCheckFn: () => contacts.ready,
    });

    // CallMonitor configuration
    // callMonitor._onRinging = async () => {
    //   if (this.webphone._webphone) {
    //     return;
    //   }
    //   // TODO refactor some of these logic into appropriate modules
    //   this.router.push('/calls');
    // };
  }

  get _actionTypes() {
    return null;
  }
}
