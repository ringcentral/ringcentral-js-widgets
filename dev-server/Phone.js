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
import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';
import ActivityMatcher from 'ringcentral-integration/modules/ActivityMatcher';
import CallLogger from 'ringcentral-integration/modules/CallLogger';
import ConversationMatcher from 'ringcentral-integration/modules/ConversationMatcher';
import ConversationLogger from 'ringcentral-integration/modules/ConversationLogger';
import RecentMessages from 'ringcentral-integration/modules/RecentMessages';
import RecentCalls from 'ringcentral-integration/modules/RecentCalls';
import AudioSettings from 'ringcentral-integration/modules/AudioSettings';
import Meeting from 'ringcentral-integration/modules/Meeting';
import RouterInteraction from '../src/modules/RouterInteraction';


export default class Phone extends RcModule {
  constructor({
    apiConfig,
    brandConfig,
    appVersion,
    useTabManager = true,
    extensionMode = false,
    ...options,
  }) {
    super({
      ...options,
    });
    const cachePrefix = `sdk${options.prefix ? `-${options.prefix}` : ''}`;
    const reducers = {};
    const proxyReducers = {};
    this.addModule('client', new RingCentralClient(new SDK({
      ...options,
      ...apiConfig,
      cachePrefix,
      clearCacheOnRefreshError: false,
    })));
    this.addModule('alert', new Alert({
      ...options,
      getState: () => this.state.alert,
    }));
    reducers.alert = this.alert.reducer;
    this.addModule('brand', new Brand({
      ...options,
      ...brandConfig,
      getState: () => this.state.brand,
    }));
    reducers.brand = this.brand.reducer;
    this.addModule('softphone', new Softphone({
      ...options,
      brand: this.brand,
      extensionMode,
    }));
    this.addModule('locale', new Locale({
      ...options,
      getState: () => this.state.locale,
      getProxyState: () => this.proxyState.locale,
    }));
    reducers.locale = this.locale.reducer;
    proxyReducers.locale = this.locale.proxyReducer;
    this.addModule('dateTimeFormat', new DateTimeFormat({
      ...options,
      locale: this.locale,
      getState: () => this.state.dateTimeFormat,
      getProxyState: () => this.proxyState.dateTimeFormat,
    }));
    reducers.dateTimeFormat = this.dateTimeFormat.reducer;
    proxyReducers.dateTimeFormat = this.dateTimeFormat.proxyReducer;
    if (useTabManager) {
      this.addModule('tabManager', new TabManager({
        ...options,
        getState: () => this.state.tabManager,
      }));
      reducers.tabManager = this.tabManager.reducer;
    }
    this.addModule('globalStorage', new GlobalStorage({
      ...options,
      getState: () => this.state.globalStorage,
    }));
    reducers.globalStorage = this.globalStorage.reducer;
    this.addModule('environment', new Environment({
      ...options,
      client: this.client,
      globalStorage: this.globalStorage,
      sdkConfig: {
        ...apiConfig,
        cachePrefix,
        clearCacheOnRefreshError: false,
      },
      getState: () => this.state.environment,
    }));
    reducers.environment = this.environment.reducer;
    this.addModule('auth', new Auth({
      ...options,
      alert: this.alert,
      brand: this.brand,
      client: this.client,
      environment: this.environment,
      locale: this.locale,
      tabManager: this.tabManager,
      getState: () => this.state.auth,
    }));
    reducers.auth = this.auth.reducer;
    this.addModule('ringout', new Ringout({
      ...options,
      auth: this.auth,
      client: this.client,
      getState: () => this.state.ringout,
    }));
    reducers.ringout = this.ringout.reducer;
    this.addModule('connectivityMonitor', new ConnectivityMonitor({
      ...options,
      alert: this.alert,
      client: this.client,
      environment: this.environment,
      getState: () => this.state.connectivityMonitor,
    }));
    reducers.connectivityMonitor = this.connectivityMonitor.reducer;
    this.addModule('rateLimiter', new RateLimiter({
      ...options,
      alert: this.alert,
      client: this.client,
      environment: this.environment,
      globalStorage: this.globalStorage,
      getState: () => this.state.rateLimiter,
    }));
    reducers.rateLimiter = this.rateLimiter.reducer;
    this.addModule('storage', new Storage({
      ...options,
      auth: this.auth,
      getState: () => this.state.storage,
    }));
    reducers.storage = this.storage.reducer;
    this.addModule('audioSettings', new AudioSettings({
      ...options,
      alert: this.alert,
      storage: this.storage,
      getState: () => this.state.audioSettings,
    }));
    reducers.audioSettings = this.audioSettings.reducer;
    this.addModule('accountExtension', new AccountExtension({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      // tabManager: this.tabManager,
      getState: () => this.state.accountExtension,
    }));
    reducers.accountExtension = this.accountExtension.reducer;
    this.addModule('accountInfo', new AccountInfo({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.accountInfo,
    }));
    reducers.accountInfo = this.accountInfo.reducer;
    this.addModule('extensionDevice', new ExtensionDevice({
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.extensionDevice,
    }));
    reducers.extensionDevice = this.extensionDevice.reducer;
    this.addModule('extensionInfo', new ExtensionInfo({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.extensionInfo,
    }));
    reducers.extensionInfo = this.extensionInfo.reducer;
    this.addModule('rolesAndPermissions', new RolesAndPermissions({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      extensionInfo: this.extensionInfo,
      tabManager: this.tabManager,
      getState: () => this.state.rolesAndPermissions,
    }));
    reducers.rolesAndPermissions = this.rolesAndPermissions.reducer;
    this.addModule('dialingPlan', new DialingPlan({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.dialingPlan,
    }));
    reducers.dialingPlan = this.dialingPlan.reducer;
    this.addModule('extensionPhoneNumber', new ExtensionPhoneNumber({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.extensionPhoneNumber,
    }));
    reducers.extensionPhoneNumber = this.extensionPhoneNumber.reducer;
    this.addModule('forwardingNumber', new ForwardingNumber({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.forwardingNumber,
    }));
    reducers.forwardingNumber = this.forwardingNumber.reducer;
    this.addModule('contactMatcher', new ContactMatcher({
      ...options,
      storage: this.storage,
      getState: () => this.state.contactMatcher,
    }));
    reducers.contactMatcher = this.contactMatcher.reducer;
    this.addModule('regionSettings', new RegionSettings({
      ...options,
      storage: this.storage,
      extensionInfo: this.extensionInfo,
      dialingPlan: this.dialingPlan,
      alert: this.alert,
      tabManager: this.tabManager,
      getState: () => this.state.regionSettings,
    }));
    reducers.regionSettings = this.regionSettings.reducer;
    this.addModule('numberValidate', new NumberValidate({
      ...options,
      client: this.client,
      accountExtension: this.accountExtension,
      regionSettings: this.regionSettings,
      accountInfo: this.accountInfo,
      getState: () => this.state.numberValidate,
    }));
    reducers.numberValidate = this.numberValidate.reducer;
    this.addModule('webphone', new Webphone({
      appKey: apiConfig.appKey,
      appName: 'RingCentral Widget',
      appVersion: '0.1.0',
      alert: this.alert,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      rolesAndPermissions: this.rolesAndPermissions,
      contactMatcher: this.contactMatcher,
      webphoneLogLevel: 3,
      extensionDevice: this.extensionDevice,
      globalStorage: this.globalStorage,
      numberValidate: this.numberValidate,
      audioSettings: this.audioSettings,
      getState: () => this.state.webphone,
      onCallEnd: (session) => {
        if (this.routerInteraction.currentPath !== '/calls/active') {
          return;
        }
        const currentSession = this.webphone.activeSession;
        if (currentSession && session.id !== currentSession.id) {
          return;
        }
        this.routerInteraction.goBack();
      },
      onCallStart: () => {
        if (this.routerInteraction.currentPath === '/calls/active') {
          return;
        }
        this.routerInteraction.push('/calls/active');
      },
      onCallRing: () => {
        if (
          this.webphone.ringSessions.length > 1
        ) {
          if (this.routerInteraction.currentPath !== '/calls') {
            this.routerInteraction.push('/calls');
          }
          this.webphone.ringSessions.forEach((session) => {
            this.webphone.toggleMinimized(session.id);
          });
        }
      }
    }));
    reducers.webphone = this.webphone.reducer;
    this.addModule('callingSettings', new CallingSettings({
      ...options,
      alert: this.alert,
      brand: this.brand,
      extensionInfo: this.extensionInfo,
      extensionPhoneNumber: this.extensionPhoneNumber,
      forwardingNumber: this.forwardingNumber,
      rolesAndPermissions: this.rolesAndPermissions,
      storage: this.storage,
      tabManager: this.tabManager,
      webphone: this.webphone,
      getState: () => this.state.callingSettings,
    }));
    reducers.callingSettings = this.callingSettings.reducer;
    this.addModule('call', new Call({
      ...options,
      alert: this.alert,
      client: this.client,
      storage: this.storage,
      regionSettings: this.regionSettings,
      callingSettings: this.callingSettings,
      softphone: this.softphone,
      ringout: this.ringout,
      webphone: this.webphone,
      extensionPhoneNumber: this.extensionPhoneNumber,
      numberValidate: this.numberValidate,
      getState: () => this.state.call,
    }));
    reducers.call = this.call.reducer;
    this.addModule('subscription', new Subscription({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.subscription,
    }));
    reducers.subscription = this.subscription.reducer;
    this.addModule('activeCalls', new ActiveCalls({
      ...options,
      auth: this.auth,
      client: this.client,
      subscription: this.subscription,
      getState: () => this.state.activeCalls,
    }));
    reducers.activeCalls = this.activeCalls.reducer;
    this.addModule('detailedPresence', new DetailedPresence({
      ...options,
      auth: this.auth,
      client: this.client,
      subscription: this.subscription,
      getState: () => this.state.detailedPresence,
    }));
    reducers.detailedPresence = this.detailedPresence.reducer;
    this.addModule('contactSearch', new ContactSearch({
      ...options,
      auth: this.auth,
      // storage: this.storage,
      getState: () => this.state.contactSearch,
    }));
    reducers.contactSearch = this.contactSearch.reducer;
    this.contactSearch.addSearchSource({
      sourceName: 'contacts',
      searchFn: ({ searchString }) => {
        const items = this.contacts.allContacts;
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
      readyCheckFn: () => this.contacts.ready,
    });
    this.addModule('messageSender', new MessageSender({
      ...options,
      alert: this.alert,
      client: this.client,
      getState: () => this.state.messageSender,
      extensionPhoneNumber: this.extensionPhoneNumber,
      extensionInfo: this.extensionInfo,
      numberValidate: this.numberValidate,
    }));
    reducers.messageSender = this.messageSender.reducer;
    this.addModule('composeText', new ComposeText({
      ...options,
      auth: this.auth,
      alert: this.alert,
      storage: this.storage,
      getState: () => this.state.composeText,
      messageSender: this.messageSender,
      numberValidate: this.numberValidate,
    }));
    reducers.composeText = this.composeText.reducer;
    this.addModule('messageStore', new MessageStore({
      ...options,
      auth: this.auth,
      storage: this.storage,
      alert: this.alert,
      client: this.client,
      subscription: this.subscription,
      getState: () => this.state.messageStore,
    }));
    reducers.messageStore = this.messageStore.reducer;
    this.addModule('conversation', new Conversation({
      ...options,
      auth: this.auth,
      alert: this.alert,
      messageSender: this.messageSender,
      extensionInfo: this.extensionInfo,
      messageStore: this.messageStore,
      getState: () => this.state.conversation,
    }));
    reducers.conversation = this.conversation.reducer;

    this.addModule('conference', new Conference({
      ...options,
      auth: this.auth,
      client: this.client,
      regionSettings: this.regionSettings,
      getState: () => this.state.conference,
    }));
    reducers.conference = this.conference.reducer;
    this.addModule('routerInteraction', new RouterInteraction({
      ...options,
      getState: () => this.state.routerInteraction,
    }));
    reducers.routerInteraction = this.routerInteraction.reducer;
    this.addModule('callLog', new CallLog({
      ...options,
      auth: this.auth,
      client: this.client,
      subscription: this.subscription,
      storage: this.storage,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.callLog,
    }));
    reducers.callLog = this.callLog.reducer;
    this.addModule('callMonitor', new CallMonitor({
      ...options,
      accountInfo: this.accountInfo,
      activeCalls: this.activeCalls,
      activityMatcher: this.activityMatcher,
      call: this.call,
      contactMatcher: this.contactMatcher,
      detailedPresence: this.detailedPresence,
      storage: this.storage,
      webphone: this.webphone,
      onRinging: async () => {
        if (this.webphone._webphone) {
          return;
        }
        // TODO refactor some of these logic into appropriate modules
        this.routerInteraction.push('/calls');
      },
      getState: () => this.state.callMonitor,
    }));
    reducers.callMonitor = this.callMonitor.reducer;
    this.addModule('callHistory', new CallHistory({
      ...options,
      accountInfo: this.accountInfo,
      callLog: this.callLog,
      callMonitor: this.callMonitor,
      activityMatcher: this.activityMatcher,
      contactMatcher: this.contactMatcher,
      getState: () => this.state.callHistory,
    }));
    reducers.callHistory = this.callHistory.reducer;
    this.addModule('activityMatcher', new ActivityMatcher({
      ...options,
      storage: this.storage,
      getState: () => this.state.activityMatcher,
    }));
    reducers.activityMatcher = this.activityMatcher.reducer;
    this.addModule('callLogger', new CallLogger({
      ...options,
      storage: this.storage,
      callMonitor: this.callMonitor,
      contactMatcher: this.contactMatcher,
      activityMatcher: this.activityMatcher,
      logFunction: async () => { },
      readyCheckFunction: () => true,
      getState: () => this.state.callLogger,
    }));
    reducers.callLogger = this.callLogger.reducer;
    this.addModule('accountPhoneNumber', new AccountPhoneNumber({
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      getState: () => this.state.accountPhoneNumber,
    }));
    reducers.accountPhoneNumber = this.accountPhoneNumber.reducer;
    this.addModule('accountContacts', new AccountContacts({
      client: this.client,
      accountExtension: this.accountExtension,
      accountPhoneNumber: this.accountPhoneNumber,
      getState: () => this.state.accountContacts,
    }));
    reducers.accountContacts = this.accountContacts.reducer;
    this.addModule('addressBook', new AddressBook({
      client: this.client,
      auth: this.auth,
      storage: this.storage,
      getState: () => this.state.addressBook,
    }));
    reducers.addressBook = this.addressBook.reducer;
    this.addModule('contacts', new Contacts({
      auth: this.auth,
      contactSources: [this.accountContacts, this.addressBook],
      getState: () => this.state.contacts,
      ...options,
    }));
    reducers.contacts = this.contacts.reducer;
    this.addModule('contactDetails', new ContactDetails({
      ...options,
      contacts: this.contacts,
      getState: () => this.state.contactDetails,
    }));
    reducers.contactDetails = this.contactDetails.reducer;
    this.contactMatcher.addSearchProvider({
      name: 'contacts',
      searchFn: async ({ queries }) => this.contacts.matchContacts({ phoneNumbers: queries }),
      readyCheckFn: () => this.contacts.ready,
    });
    this.addModule('conversationMatcher', new ConversationMatcher({
      storage: this.storage,
      getState: () => this.state.conversationMatcher,
    }));
    reducers.conversationMatcher = this.conversationMatcher.reducer;
    this.addModule('conversationLogger', new ConversationLogger({
      ...options,
      auth: this.auth,
      contactMatcher: this.contactMatcher,
      conversationMatcher: this.conversationMatcher,
      dateTimeFormat: this.dateTimeFormat,
      extensionInfo: this.extensionInfo,
      messageStore: this.messageStore,
      rolesAndPermissions: this.rolesAndPermissions,
      storage: this.storage,
      tabManager: this.tabManager,
      logFunction: async () => { },
      readyCheckFunction: () => true,
      getState: () => this.state.conversationLogger,
    }));
    reducers.conversationLogger = this.conversationLogger.reducer;
    this.addModule('messages', new Messages({
      ...options,
      alert: this.alert,
      messageStore: this.messageStore,
      extensionInfo: this.extensionInfo,
      contactMatcher: this.contactMatcher,
      conversationLogger: this.conversationLogger,
      getState: () => this.state.messages,
    }));
    reducers.messages = this.messages.reducer;
    this.addModule('recentMessages', new RecentMessages({
      ...options,
      client: this.client,
      messageStore: this.messageStore,
      getState: () => this.state.recentMessages
    }));
    reducers.recentMessages = this.recentMessages.reducer;
    this.addModule('recentCalls', new RecentCalls({
      ...options,
      client: this.client,
      callHistory: this.callHistory,
      getState: () => this.state.recentCalls
    }));
    reducers.recentCalls = this.recentCalls.reducer;
    this.addModule('meeting', new Meeting({
      ...options,
      client: this.client,
      alert: this.alert,
      extensionInfo: this.extensionInfo,
      getState: () => this.state.meeting,
    }));
    reducers.meeting = this.meeting.reducer;
    this._reducer = combineReducers({
      ...reducers,
      app: (state = {
        name: brandConfig.appName,
        version: appVersion,
      }) => state,
      lastAction: (state = null, action) => {
        console.log(action);
        return action;
      },
    });
    this._proxyReducer = combineReducers({
      ...proxyReducers,
    });
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

  get name() {
    return this.state.app.name;
  }

  get version() {
    return this.state.app.version;
  }
}
