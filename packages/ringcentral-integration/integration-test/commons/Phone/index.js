import RingCentral from 'ringcentral';
import RingCentralClient from 'ringcentral-client';
import { combineReducers } from 'redux';

import RcModule from '../../../lib/RcModule';
import AccountExtension from '../../../modules/AccountExtension';
import AccountInfo from '../../../modules/AccountInfo';
import Alert from '../../../modules/Alert';
import Auth from '../../../modules/Auth';
import AccountPhoneNumber from '../../../modules/AccountPhoneNumber';
import Brand from '../../../modules/Brand';
import BlockedNumber from '../../../modules/BlockedNumber';
import Call from '../../../modules/Call';
import CallingSettings from '../../../modules/CallingSettings';
import ConnectivityMonitor from '../../../modules/ConnectivityMonitor';
import DialingPlan from '../../../modules/DialingPlan';
import Environment from '../../../modules/Environment';
import ExtensionInfo from '../../../modules/ExtensionInfo';
import ExtensionPhoneNumber from '../../../modules/ExtensionPhoneNumber';
import ForwardingNumber from '../../../modules/ForwardingNumber';
import GlobalStorage from '../../../modules/GlobalStorage';
import Locale from '../../../modules/Locale';
import Presence from '../../../modules/Presence';
import RateLimiter from '../../../modules/RateLimiter';
import RegionSettings from '../../../modules/RegionSettings';
import Ringout from '../../../modules/Ringout';
import RolesAndPermissions from '../../../modules/RolesAndPermissions';
import Softphone from '../../../modules/Softphone';
import Storage from '../../../modules/Storage';
import Subscription from '../../../modules/Subscription';
import TabManager from '../../../modules/TabManager';
// import RouterInteraction from 'ringcentral-js-widget/modules/RouterInteraction';

import NumberValidate from '../../../modules/NumberValidate';
import MessageSender from '../../../modules/MessageSender';
import ComposeText from '../../../modules/ComposeText';
import ContactSearch from '../../../modules/ContactSearch';

import Messages from '../../../modules/Messages';
import MessageStore from '../../../modules/MessageStore';
import Conversation from '../../../modules/Conversation';

import ContactMatcher from '../../../modules/ContactMatcher';
import ActivityMatcher from '../../../modules/ActivityMatcher';

// import DynamicsAdapter from '../../../modules/DynamicsInteraction';

// import { callMonitorReducer } from '../CallMonitor/reducers';


// import CallLog from '../CallLog';
// import AutoLogger from '../AutoLogger';
// import DataMatcher from '../DataMatcher';


export default class Phone extends RcModule {
  constructor({
    history,
    appKey,
    appSecret,
    server,
    appName,
    appVersion,
    brandId,
    brandName,
    brandFullName,
    redirectUri,
    proxyUri,
    ...options
  } = {}) {
    super({
      ...options,
    });

    const cachePrefix = `sdk${options.prefix ? `-${options.prefix}` : ''}`;

    this.addModule('client', new RingCentralClient(new RingCentral({
      cachePrefix,
      appKey,
      appSecret,
      appName,
      appVersion,
      server,
    })));
    this.addModule('tabManager', new TabManager({
      ...options,
      getState: () => this.state.tabManager,
    }));
    this.addModule('globalStorage', new GlobalStorage({
      ...options,
      getState: () => this.state.globalStorage,
    }));
    this.addModule('alert', new Alert({
      ...options,
      getState: () => this.state.alert,
    }));

    this.addModule('brand', new Brand({
      ...options,
      id: brandId,
      name: brandName,
      fullName: brandFullName,
      getState: () => this.state.brand,
    }));
    this.addModule('locale', new Locale({
      ...options,
      getState: () => this.state.locale,
    }));
    this.addModule('environment', new Environment({
      ...options,
      sdkConfig: {
        cachePrefix,
        appKey,
        appSecret,
        appName,
        appVersion,
        server,
      },
      client: this.client,
      globalStorage: this.globalStorage,
      getState: () => this.state.environment,
    }));
    this.addModule('connectivityMonitor', new ConnectivityMonitor({
      ...options,
      alert: this.alert,
      client: this.client,
      environment: this.environment,
      checkConnectionFunc: () => true,
      getState: () => this.state.connectivityMonitor,
    }));
    this.addModule('auth', new Auth({
      ...options,
      client: this.client,
      brand: this.brand,
      locale: this.locale,
      alert: this.alert,
      environment: this.environment,
      tabManager: this.tabManager,
      proxyUri,
      redirectUri,
      getState: () => this.state.auth,
    }));
    this.addModule('storage', new Storage({
      ...options,
      auth: this.auth,
      getState: () => this.state.storage,
    }));
    this.addModule('subscription', new Subscription({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      getState: () => this.state.subscription,
    }));
    // this.addModule('router', new RouterInteraction({
    //   ...options,
    //   history,
    //   getState: () => this.state.router,
    // }));
    this.addModule('extensionInfo', new ExtensionInfo({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      alert: this.alert,
      getState: () => this.state.extensionInfo,
    }));
    this.addModule('rolesAndPermissions', new RolesAndPermissions({
      ...options,
      auth: this.auth,
      storage: this.storage,
      client: this.client,
      extensionInfo: this.extensionInfo,
      tabManager: this.tabManager,
      alert: this.alert,
      getState: () => this.state.rolesAndPermissions,
    }));
    this.addModule('accountInfo', new AccountInfo({
      ...options,
      auth: this.auth,
      storage: this.storage,
      client: this.client,
      tabManager: this.tabManager,
      rolesAndPermissions: this.rolesAndPermissions,
      alert: this.alert,
      getState: () => this.state.accountInfo,
    }));
    this.addModule('presence', new Presence({
      ...options,
      auth: this.auth,
      client: this.client,
      subscription: this.subscription,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.presence,
    }));
    this.addModule('accountExtension', new AccountExtension({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      subscription: this.subscription,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.accountExtension,
    }));
    this.addModule('accountPhoneNumber', new AccountPhoneNumber({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      subscription: this.subscription,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.accountPhoneNumber,
    }));
    this.addModule('dialingPlan', new DialingPlan({
      ...options,
      auth: this.auth,
      storage: this.storage,
      client: this.client,
      tabManager: this.tabManager,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.dialingPlan,
    }));
    this.addModule('extensionPhoneNumber', new ExtensionPhoneNumber({
      ...options,
      auth: this.auth,
      storage: this.storage,
      client: this.client,
      tabManager: this.tabManager,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.extensionPhoneNumber,
    }));
    this.addModule('forwardingNumber', new ForwardingNumber({
      ...options,
      auth: this.auth,
      storage: this.storage,
      client: this.client,
      tabManager: this.tabManager,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.forwardingNumber,
    }));
    this.addModule('blockedNumber', new BlockedNumber({
      ...options,
      auth: this.auth,
      storage: this.storage,
      client: this.client,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.blockedNumber,
    }));
    this.addModule('regionSettings', new RegionSettings({
      ...options,
      storage: this.storage,
      alert: this.alert,
      extensionInfo: this.extensionInfo,
      dialingPlan: this.dialingPlan,
      tabManager: this.tabManager,
      getState: () => this.state.regionSettings,
    }));
    this.addModule('rateLimiter', new RateLimiter({
      ...options,
      alert: this.alert,
      client: this.client,
      environment: this.environment,
      globalStorage: this.globalStorage,
      getState: () => this.state.rateLimiter,
    }));

    this.addModule('contactMatcher', new ContactMatcher({
      ...options,
      auth: this.auth,
      storage: this.storage,
      getState: () => this.state.contactMatcher,
    }));
    this.addModule('activityMatcher', new ActivityMatcher({
      ...options,
      auth: this.auth,
      storage: this.storage,
      getState: () => this.state.activityMatcher,
    }));
    // this.addModule('callLog', new CallLog({
    //   ...options,
    //   auth: this.auth,
    //   client: this.client,
    //   storage: this.storage,
    //   regionSettings: this.regionSettings,
    //   onFetchSuccess: () => {
    //     this.contactMatcher.triggerMatch();
    //     this.activityMatcher.triggerMatch();
    //   },
    //   getState: () => this.state.callLog,
    // }));
    // this.contactMatcher.addQuerySource({
    //   sourceName: 'callLog',
    //   getQueriesFn: this.callLog.getSelector('normalizedPhoneNumbers'),
    //   readyCheckFn: () => this.callLog.ready,
    // });
    // this.contactMatcher.addSearchSource({
    //   sourceName: 'dynamics',
    //   searchFn: async ({ queries }) => this.adapter.matchEntities({ phoneNumbers: queries }),
    //   readyCheckFn: () => this.adapter.ready,
    // });
    // this.activityMatcher.addQuerySource({
    //   sourceName: 'callLog',
    //   getQueriesFn: this.callLog.getSelector('callLogSessionIds'),
    //   readyCheckFn: () => this.callLog.ready,
    // });
    // this.activityMatcher.addSearchSource({
    //   sourceName: 'dynamics',
    //   searchFn: async ({ queries }) => this.adapter.matchPhoneCalls({ sessionIds: queries }),
    //   readyCheckFn: () => this.adapter.ready,
    // });
    this.addModule('callingSettings', new CallingSettings({
      ...options,
      alert: this.alert,
      brand: this.brand,
      client: this.client,
      storage: this.storage,
      extensionInfo: this.extensionInfo,
      extensionPhoneNumber: this.extensionPhoneNumber,
      forwardingNumber: this.forwardingNumber,
      rolesAndPermissions: this.rolesAndPermissions,
      onFirstLogin: () => {
        this.router.history.push('/settings'); // TODO find a better solution
      },
      getState: () => this.state.callingSettings,
    }));
    this.addModule('softphone', new Softphone({
      ...options,
      getState: () => this.state.softphone,
      brand: this.brand,
    }));
    this.addModule('ringout', new Ringout({
      ...options,
      auth: this.auth,
      client: this.client,
      getState: () => this.state.ringout,
    }));
    this.addModule('numberValidate', new NumberValidate({
      ...options,
      brand: this.brand,
      client: this.client,
      accountExtension: this.accountExtension,
      regionSettings: this.regionSettings,
      accountInfo: this.accountInfo,
      getState: () => this.state.numberValidate,
    }));
    this.addModule('call', new Call({
      ...options,
      alert: this.alert,
      client: this.client,
      callingSettings: this.callingSettings,
      softphone: this.softphone,
      storage: this.storage,
      ringout: this.ringout,
      numberValidate: this.numberValidate,
      regionSettings: this.regionSettings,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.call,
    }));
    // this.addModule('autoLogger', new AutoLogger({
    //   ...options,
    //   storage: this.storage,
    //   getState: () => this.state.autoLogger,
    // }));
    // this.autoLogger.addLogHandler({
    //   sourceName: 'dynamics',
    //   handlerFn: async args => this.adapter.logCallBatch(args),
    //   readyCheckFn: () => this.adapter.ready,
    // });

    this.addModule('contactSearch', new ContactSearch({
      ...options,
      auth: this.auth,
      storage: this.storage,
      getState: () => this.state.contactSearch,
    }));
    this.contactSearch.addSearchSource({
      sourceName: 'test',
      searchFn: ({ searchString }) => [{
        entityType: 'account',
        name: searchString,
        phoneNumber: '+1234567890',
        phoneType: 'phone',
      }],
      formatFn: entities => entities,
      readyCheckFn: () => true,
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

    this.addModule('composeText', new ComposeText({
      ...options,
      auth: this.auth,
      alert: this.alert,
      storage: this.storage,
      getState: () => this.state.composeText,
      messageSender: this.messageSender,
      numberValidate: this.numberValidate,
      rolesAndPermissions: this.rolesAndPermissions,
    }));

    this.addModule('messageStore', new MessageStore({
      ...options,
      alert: this.alert,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      subscription: this.subscription,
      connectivityMonitor: this.connectivityMonitor,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.messageStore,
    }));

    this.addModule('conversation', new Conversation({
      ...options,
      auth: this.auth,
      messageSender: this.messageSender,
      extensionInfo: this.extensionInfo,
      messageStore: this.messageStore,
      getState: () => this.state.conversation,
    }));

    this.addModule('messages', new Messages({
      ...options,
      auth: this.auth,
      messageStore: this.messageStore,
      extensionInfo: this.extensionInfo,
      rolesAndPermissions: this.rolesAndPermissions,
      getState: () => this.state.messages,
    }));

    // this.addModule('adapter', new DynamicsAdapter({
    //   ...options,
    //   auth: this.auth,
    //   call: this.call,
    //   composeText: this.composeText,
    //   locale: this.locale,
    //   router: this.router,
    //   presence: this.presence,
    //   storage: this.storage,
    //   globalStorage: this.globalStorage,
    //   regionSettings: this.regionSettings,
    //   getState: () => this.state.adapter,
    // }));

    this._reducer = combineReducers({
      app: (state = {
        name: appName,
        version: appVersion,
      }) => state,
      tabManager: this.tabManager.reducer,
      alert: this.alert.reducer,
      auth: this.auth.reducer,
      brand: this.brand.reducer,
      connectivityMonitor: this.connectivityMonitor.reducer,
      locale: this.locale.reducer,
      subscription: this.subscription.reducer,
      // router: this.router.reducer,
      accountExtension: this.accountExtension.reducer,
      accountPhoneNumber: this.accountPhoneNumber.reducer,
      accountInfo: this.accountInfo.reducer,
      rolesAndPermissions: this.rolesAndPermissions.reducer,
      extensionInfo: this.extensionInfo.reducer,
      dialingPlan: this.dialingPlan.reducer,
      extensionPhoneNumber: this.extensionPhoneNumber.reducer,
      forwardingNumber: this.forwardingNumber.reducer,
      blockedNumber: this.blockedNumber.reducer,
      regionSettings: this.regionSettings.reducer,
      callingSettings: this.callingSettings.reducer,
      call: this.call.reducer,
      rateLimiter: this.rateLimiter.reducer,
      ringout: this.ringout.reducer,
      softphone: this.softphone.reducer,
      // callLog: this.callLog.reducer,
      // callMonitor: callMonitorReducer,
      environment: this.environment.reducer,
      presence: this.presence.reducer,
      contactMatcher: this.contactMatcher.reducer,
      activityMatcher: this.activityMatcher.reducer,
      storage: this.storage.reducer,
      // autoLogger: this.autoLogger.reducer,
      globalStorage: this.globalStorage.reducer,
      contactSearch: this.contactSearch.reducer,
      numberValidate: this.numberValidate.reducer,
      messageSender: this.messageSender.reducer,
      composeText: this.composeText.reducer,
      messageStore: this.messageStore.reducer,
      conversation: this.conversation.reducer,
      messages: this.messages.reducer,
      // adapter: this.adapter.reducer,
    });
  }

  get name() {
    return this.state.app.name;
  }

  get version() {
    return this.state.app.version;
  }
}
