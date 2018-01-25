import SDK from 'ringcentral';
import RingCentralClient from 'ringcentral-client';
import { combineReducers } from 'redux';

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
import Feedback from 'ringcentral-integration/modules/Feedback';
import { ModuleFactory } from 'ringcentral-integration/lib/di';
import RouterInteraction from '../src/modules/RouterInteraction';
import DialerUI from '../src/modules/DialerUI';
import ProxyFrameOAuth from '../src/modules/ProxyFrameOAuth';

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
    Alert,
    Brand,
    Softphone,
    Locale,
    DateTimeFormat,
    TabManager,
    GlobalStorage,
    LocaleSettings,
    Environment,
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
    ContactSearch,
    CallMonitor,
    DialerUI,
    Feedback
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
  class Phone extends BasePhone {}
  return Phone.create();
}
