import SDK from 'ringcentral';
import RingCentralClient from 'ringcentral-client';
import { combineReducers } from 'redux';

import RcModule from 'ringcentral-integration/lib/RcModule';

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
import Messages from 'ringcentral-integration/modules/Messages';
import Conversation from 'ringcentral-integration/modules/Conversation';
import ContactSearch from 'ringcentral-integration/modules/ContactSearch';
import DateTimeFormat from 'ringcentral-integration/modules/DateTimeFormat';
import Conference from 'ringcentral-integration/modules/Conference';

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
import { ModuleFactory } from 'ringcentral-integration/lib/di';
import RouterInteraction from '../src/modules/RouterInteraction';
import DialerUI from '../src/modules/DialerUI';
import ProxyFrameOAuth from '../src/modules/ProxyFrameOAuth';
import apiConfig from './api-config';
import brandConfig from './brandConfig';


const sdkConfig = {
  ...apiConfig,
  cachePrefix: 'sdk-rc',
  clearCacheOnRefreshError: false,
};
@ModuleFactory({
  providers: [
    {
      provide: 'ModuleOptions',
      useValue: {
        prefix: 'rc'
      },
      spread: true
    },
    {
      provide: 'Client',
      useFactory: () => (
        new RingCentralClient(new SDK(sdkConfig))
      ),
    },
    {
      provide: 'BrandOptions',
      spread: true,
      useValue: brandConfig,
    },
    Alert,
    Brand,
    Softphone,
    Locale,
    DateTimeFormat,
    TabManager,
    GlobalStorage,
    LocaleSettings,
    Environment,
    {
      provide: 'EnvironmentOptions',
      useValue: {
        sdkConfig,
      },
      spread: true,
    },
    Auth,
    ProxyFrameOAuth,
    {
      provide: 'OAuth',
      deps: ['ProxyFrameOAuth'],
      useFactory: ({ proxyFrameOAuth }) => proxyFrameOAuth,
    },
    Ringout,
    ConnectivityMonitor,
    RateLimiter,
    Storage,
    AudioSettings,
    AccountExtension,
    AccountInfo,
    ExtensionDevice,
    ExtensionInfo,
    RolesAndPermissions,
    DialingPlan,
    ExtensionPhoneNumber,
    ForwardingNumber,
    RegionSettings,
    NumberValidate,
    CallingSettings,
    Call,
    Subscription,
    ActiveCalls,
    DetailedPresence,
    MessageSender,
    ComposeText,
    MessageStore,
    Conversation,
    Conference,
    RouterInteraction,
    CallLog,
    CallHistory,
    AccountPhoneNumber,
    AccountContacts,
    AddressBook,
    Contacts,
    {
      provide: 'ContactSources',
      deps: ['AddressBook', 'AccountContacts'],
      useFactory: ({ addressBook, accountContacts }) => ([
        addressBook,
        accountContacts,
      ])
    },
    ContactDetails,
    ContactMatcher,
    Messages,
    RecentMessages,
    RecentCalls,
    Meeting,
    Webphone,
    {
      provide: 'WebphoneOptions',
      useValue: {
        appKey: sdkConfig.appKey,
        appName: 'RingCentral Widgets',
        appVersion: '0.1.0',
      },
      spread: true,
    },
    ContactSearch,
    CallMonitor,
    {
      provide: 'Version',
      useFactory: () => '0.1.0',
    },
    DialerUI,
    Analytics,
    {
      provide: 'AnalyticsOptions',
      useValue: {
        appName: 'RingCentral Widgets',
        appVersion: '0.1.0',
        analyticsKey: 'BnyIBDFjj4oPggiCccU97IyfdTjlzJEj'
      },
      spread: true,
    }
  ]
})
export default class Phone extends RcModule {
  constructor({
    webphone,
    routerInteraction,
    callMonitor,
    contactSearch,
    contacts,
    contactMatcher,
    ...options,
  }) {
    super({
      ...options,
    });

    contactSearch.addSearchSource({
      sourceName: 'contacts',
      searchFn: ({ searchString }) => {
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


    webphone._onCallEndFunc = (session) => {
      if (routerInteraction.currentPath !== '/calls/active') {
        return;
      }
      const currentSession = webphone.activeSession;
      if (currentSession && session.id !== currentSession.id) {
        return;
      }
      routerInteraction.goBack();
    };
    webphone._onCallStartFunc = () => {
      if (routerInteraction.currentPath === '/calls/active') {
        return;
      }
      routerInteraction.push('/calls/active');
    };
    webphone._onCallRingFunc = () => {
      if (
        webphone.ringSessions.length > 1
      ) {
        if (routerInteraction.currentPath !== '/calls') {
          routerInteraction.push('/calls');
        }
        webphone.ringSessions.forEach((session) => {
          webphone.toggleMinimized(session.id);
        });
      }
    };

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
    this.store.subscribe(() => {
      if (this.auth.ready) {
        if (
          this.routerInteraction.currentPath !== '/' &&
          !this.auth.loggedIn
        ) {
          this.routerInteraction.push('/');
        } else if (
          this.routerInteraction.currentPath === '/' &&
          this.auth.loggedIn
        ) {
          this.routerInteraction.push('/dialer');
        }
      }
    });
  }

  get _actionTypes() {
    /* no action types */
    return null;
  }
}
