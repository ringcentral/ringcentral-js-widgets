'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ringcentral = require('ringcentral');

var _ringcentral2 = _interopRequireDefault(_ringcentral);

var _ringcentralClient = require('ringcentral-client');

var _ringcentralClient2 = _interopRequireDefault(_ringcentralClient);

var _redux = require('redux');

var _RcModule2 = require('../../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _AccountExtension = require('../../../modules/AccountExtension');

var _AccountExtension2 = _interopRequireDefault(_AccountExtension);

var _AccountInfo = require('../../../modules/AccountInfo');

var _AccountInfo2 = _interopRequireDefault(_AccountInfo);

var _Alert = require('../../../modules/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Auth = require('../../../modules/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Brand = require('../../../modules/Brand');

var _Brand2 = _interopRequireDefault(_Brand);

var _BlockedNumber = require('../../../modules/BlockedNumber');

var _BlockedNumber2 = _interopRequireDefault(_BlockedNumber);

var _Call = require('../../../modules/Call');

var _Call2 = _interopRequireDefault(_Call);

var _CallingSettings = require('../../../modules/CallingSettings');

var _CallingSettings2 = _interopRequireDefault(_CallingSettings);

var _ConnectivityMonitor = require('../../../modules/ConnectivityMonitor');

var _ConnectivityMonitor2 = _interopRequireDefault(_ConnectivityMonitor);

var _DialingPlan = require('../../../modules/DialingPlan');

var _DialingPlan2 = _interopRequireDefault(_DialingPlan);

var _Environment = require('../../../modules/Environment');

var _Environment2 = _interopRequireDefault(_Environment);

var _ExtensionInfo = require('../../../modules/ExtensionInfo');

var _ExtensionInfo2 = _interopRequireDefault(_ExtensionInfo);

var _ExtensionPhoneNumber = require('../../../modules/ExtensionPhoneNumber');

var _ExtensionPhoneNumber2 = _interopRequireDefault(_ExtensionPhoneNumber);

var _ForwardingNumber = require('../../../modules/ForwardingNumber');

var _ForwardingNumber2 = _interopRequireDefault(_ForwardingNumber);

var _GlobalStorage = require('../../../modules/GlobalStorage');

var _GlobalStorage2 = _interopRequireDefault(_GlobalStorage);

var _Locale = require('../../../modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _Presence = require('../../../modules/Presence');

var _Presence2 = _interopRequireDefault(_Presence);

var _RateLimiter = require('../../../modules/RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _RegionSettings = require('../../../modules/RegionSettings');

var _RegionSettings2 = _interopRequireDefault(_RegionSettings);

var _Ringout = require('../../../modules/Ringout');

var _Ringout2 = _interopRequireDefault(_Ringout);

var _RolesAndPermissions = require('../../../modules/RolesAndPermissions');

var _RolesAndPermissions2 = _interopRequireDefault(_RolesAndPermissions);

var _Softphone = require('../../../modules/Softphone');

var _Softphone2 = _interopRequireDefault(_Softphone);

var _Storage = require('../../../modules/Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var _Subscription = require('../../../modules/Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _TabManager = require('../../../modules/TabManager');

var _TabManager2 = _interopRequireDefault(_TabManager);

var _NumberValidate = require('../../../modules/NumberValidate');

var _NumberValidate2 = _interopRequireDefault(_NumberValidate);

var _MessageSender = require('../../../modules/MessageSender');

var _MessageSender2 = _interopRequireDefault(_MessageSender);

var _ComposeText = require('../../../modules/ComposeText');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _ContactSearch = require('../../../modules/ContactSearch');

var _ContactSearch2 = _interopRequireDefault(_ContactSearch);

var _Messages = require('../../../modules/Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _MessageStore = require('../../../modules/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _Conversation = require('../../../modules/Conversation');

var _Conversation2 = _interopRequireDefault(_Conversation);

var _ContactMatcher = require('../../../modules/ContactMatcher');

var _ContactMatcher2 = _interopRequireDefault(_ContactMatcher);

var _ActivityMatcher = require('../../../modules/ActivityMatcher');

var _ActivityMatcher2 = _interopRequireDefault(_ActivityMatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import DynamicsAdapter from '../../../modules/DynamicsInteraction';

// import { callMonitorReducer } from '../CallMonitor/reducers';


// import CallLog from '../CallLog';
// import AutoLogger from '../AutoLogger';
// import DataMatcher from '../DataMatcher';


var Phone = function (_RcModule) {
  (0, _inherits3.default)(Phone, _RcModule);

  function Phone() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var history = _ref.history,
        appKey = _ref.appKey,
        appSecret = _ref.appSecret,
        server = _ref.server,
        appName = _ref.appName,
        appVersion = _ref.appVersion,
        brandId = _ref.brandId,
        brandName = _ref.brandName,
        brandFullName = _ref.brandFullName,
        redirectUri = _ref.redirectUri,
        proxyUri = _ref.proxyUri,
        options = (0, _objectWithoutProperties3.default)(_ref, ['history', 'appKey', 'appSecret', 'server', 'appName', 'appVersion', 'brandId', 'brandName', 'brandFullName', 'redirectUri', 'proxyUri']);
    (0, _classCallCheck3.default)(this, Phone);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Phone.__proto__ || (0, _getPrototypeOf2.default)(Phone)).call(this, (0, _extends3.default)({}, options)));

    var cachePrefix = 'sdk' + (options.prefix ? '-' + options.prefix : '');

    _this.addModule('client', new _ringcentralClient2.default(new _ringcentral2.default({
      cachePrefix: cachePrefix,
      appKey: appKey,
      appSecret: appSecret,
      appName: appName,
      appVersion: appVersion,
      server: server
    })));
    _this.addModule('tabManager', new _TabManager2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.tabManager;
      }
    })));
    _this.addModule('globalStorage', new _GlobalStorage2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.globalStorage;
      }
    })));
    _this.addModule('alert', new _Alert2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.alert;
      }
    })));

    _this.addModule('brand', new _Brand2.default((0, _extends3.default)({}, options, {
      id: brandId,
      name: brandName,
      fullName: brandFullName,
      getState: function getState() {
        return _this.state.brand;
      }
    })));
    _this.addModule('locale', new _Locale2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.locale;
      }
    })));
    _this.addModule('environment', new _Environment2.default((0, _extends3.default)({}, options, {
      sdkConfig: {
        cachePrefix: cachePrefix,
        appKey: appKey,
        appSecret: appSecret,
        appName: appName,
        appVersion: appVersion,
        server: server
      },
      client: _this.client,
      globalStorage: _this.globalStorage,
      getState: function getState() {
        return _this.state.environment;
      }
    })));
    _this.addModule('connectivityMonitor', new _ConnectivityMonitor2.default((0, _extends3.default)({}, options, {
      alert: _this.alert,
      client: _this.client,
      environment: _this.environment,
      getState: function getState() {
        return _this.state.connectivityMonitor;
      }
    })));
    _this.addModule('auth', new _Auth2.default((0, _extends3.default)({}, options, {
      client: _this.client,
      brand: _this.brand,
      locale: _this.locale,
      alert: _this.alert,
      environment: _this.environment,
      tabManager: _this.tabManager,
      proxyUri: proxyUri,
      redirectUri: redirectUri,
      getState: function getState() {
        return _this.state.auth;
      }
    })));
    _this.addModule('storage', new _Storage2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      getState: function getState() {
        return _this.state.storage;
      }
    })));
    _this.addModule('subscription', new _Subscription2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      client: _this.client,
      storage: _this.storage,
      getState: function getState() {
        return _this.state.subscription;
      }
    })));
    _this.addModule('presence', new _Presence2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      client: _this.client,
      subscription: _this.subscription,
      getState: function getState() {
        return _this.state.presence;
      }
    })));
    // this.addModule('router', new RouterInteraction({
    //   ...options,
    //   history,
    //   getState: () => this.state.router,
    // }));
    _this.addModule('accountInfo', new _AccountInfo2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      client: _this.client,
      tabManager: _this.tabManager,
      getState: function getState() {
        return _this.state.accountInfo;
      }
    })));
    _this.addModule('accountExtension', new _AccountExtension2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      client: _this.client,
      storage: _this.storage,
      subscription: _this.subscription,
      getState: function getState() {
        return _this.state.accountExtension;
      }
    })));
    _this.addModule('extensionInfo', new _ExtensionInfo2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      client: _this.client,
      storage: _this.storage,
      tabManager: _this.tabManager,
      getState: function getState() {
        return _this.state.extensionInfo;
      }
    })));
    _this.addModule('rolesAndPermissions', new _RolesAndPermissions2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      client: _this.client,
      extensionInfo: _this.extensionInfo,
      tabManager: _this.tabManager,
      getState: function getState() {
        return _this.state.rolesAndPermissions;
      }
    })));
    _this.addModule('dialingPlan', new _DialingPlan2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      client: _this.client,
      tabManager: _this.tabManager,
      getState: function getState() {
        return _this.state.dialingPlan;
      }
    })));
    _this.addModule('extensionPhoneNumber', new _ExtensionPhoneNumber2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      client: _this.client,
      tabManager: _this.tabManager,
      getState: function getState() {
        return _this.state.extensionPhoneNumber;
      }
    })));
    _this.addModule('forwardingNumber', new _ForwardingNumber2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      client: _this.client,
      tabManager: _this.tabManager,
      rolesAndPermissions: _this.rolesAndPermissions,
      getState: function getState() {
        return _this.state.forwardingNumber;
      }
    })));
    _this.addModule('blockedNumber', new _BlockedNumber2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      client: _this.client,
      getState: function getState() {
        return _this.state.blockedNumber;
      }
    })));
    _this.addModule('regionSettings', new _RegionSettings2.default((0, _extends3.default)({}, options, {
      storage: _this.storage,
      alert: _this.alert,
      extensionInfo: _this.extensionInfo,
      dialingPlan: _this.dialingPlan,
      tabManager: _this.tabManager,
      getState: function getState() {
        return _this.state.regionSettings;
      }
    })));
    _this.addModule('rateLimiter', new _RateLimiter2.default((0, _extends3.default)({}, options, {
      alert: _this.alert,
      client: _this.client,
      environment: _this.environment,
      globalStorage: _this.globalStorage,
      getState: function getState() {
        return _this.state.rateLimiter;
      }
    })));

    _this.addModule('contactMatcher', new _ContactMatcher2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      getState: function getState() {
        return _this.state.contactMatcher;
      }
    })));
    _this.addModule('activityMatcher', new _ActivityMatcher2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      getState: function getState() {
        return _this.state.activityMatcher;
      }
    })));
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
    _this.addModule('callingSettings', new _CallingSettings2.default((0, _extends3.default)({}, options, {
      alert: _this.alert,
      brand: _this.brand,
      client: _this.client,
      storage: _this.storage,
      extensionInfo: _this.extensionInfo,
      extensionPhoneNumber: _this.extensionPhoneNumber,
      forwardingNumber: _this.forwardingNumber,
      rolesAndPermissions: _this.rolesAndPermissions,
      onFirstLogin: function onFirstLogin() {
        _this.router.history.push('/settings'); // TODO find a better solution
      },
      getState: function getState() {
        return _this.state.callingSettings;
      }
    })));
    _this.addModule('softphone', new _Softphone2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.softphone;
      },
      brand: _this.brand
    })));
    _this.addModule('ringout', new _Ringout2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      client: _this.client,
      getState: function getState() {
        return _this.state.ringout;
      }
    })));
    _this.addModule('numberValidate', new _NumberValidate2.default((0, _extends3.default)({}, options, {
      client: _this.client,
      accountExtension: _this.accountExtension,
      regionSettings: _this.regionSettings,
      accountInfo: _this.accountInfo,
      getState: function getState() {
        return _this.state.numberValidate;
      }
    })));
    _this.addModule('call', new _Call2.default((0, _extends3.default)({}, options, {
      alert: _this.alert,
      client: _this.client,
      callingSettings: _this.callingSettings,
      softphone: _this.softphone,
      storage: _this.storage,
      ringout: _this.ringout,
      numberValidate: _this.numberValidate,
      getState: function getState() {
        return _this.state.call;
      }
    })));
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

    _this.addModule('contactSearch', new _ContactSearch2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      storage: _this.storage,
      getState: function getState() {
        return _this.state.contactSearch;
      }
    })));
    _this.contactSearch.addSearchSource({
      sourceName: 'test',
      searchFn: function searchFn(_ref2) {
        var searchString = _ref2.searchString;
        return [{
          entityType: 'account',
          name: searchString,
          phoneNumber: '+1234567890',
          phoneType: 'phone'
        }];
      },
      formatFn: function formatFn(entities) {
        return entities;
      },
      readyCheckFn: function readyCheckFn() {
        return true;
      }
    });

    _this.addModule('messageSender', new _MessageSender2.default((0, _extends3.default)({}, options, {
      alert: _this.alert,
      client: _this.client,
      getState: function getState() {
        return _this.state.messageSender;
      },
      extensionPhoneNumber: _this.extensionPhoneNumber,
      extensionInfo: _this.extensionInfo,
      numberValidate: _this.numberValidate
    })));

    _this.addModule('composeText', new _ComposeText2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      alert: _this.alert,
      storage: _this.storage,
      getState: function getState() {
        return _this.state.composeText;
      },
      messageSender: _this.messageSender,
      numberValidate: _this.numberValidate
    })));

    _this.addModule('messageStore', new _MessageStore2.default((0, _extends3.default)({}, options, {
      alert: _this.alert,
      auth: _this.auth,
      client: _this.client,
      storage: _this.storage,
      subscription: _this.subscription,
      connectivityMonitor: _this.connectivityMonitor,
      rolesAndPermissions: _this.rolesAndPermissions,
      getState: function getState() {
        return _this.state.messageStore;
      }
    })));

    _this.addModule('conversation', new _Conversation2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      messageSender: _this.messageSender,
      extensionInfo: _this.extensionInfo,
      messageStore: _this.messageStore,
      getState: function getState() {
        return _this.state.conversation;
      }
    })));

    _this.addModule('messages', new _Messages2.default((0, _extends3.default)({}, options, {
      auth: _this.auth,
      messageStore: _this.messageStore,
      extensionInfo: _this.extensionInfo,
      rolesAndPermissions: _this.rolesAndPermissions,
      getState: function getState() {
        return _this.state.messages;
      }
    })));

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

    _this._reducer = (0, _redux.combineReducers)({
      app: function app() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          name: appName,
          version: appVersion
        };
        return state;
      },
      tabManager: _this.tabManager.reducer,
      alert: _this.alert.reducer,
      auth: _this.auth.reducer,
      brand: _this.brand.reducer,
      connectivityMonitor: _this.connectivityMonitor.reducer,
      locale: _this.locale.reducer,
      subscription: _this.subscription.reducer,
      // router: this.router.reducer,
      accountExtension: _this.accountExtension.reducer,
      accountInfo: _this.accountInfo.reducer,
      rolesAndPermissions: _this.rolesAndPermissions.reducer,
      extensionInfo: _this.extensionInfo.reducer,
      dialingPlan: _this.dialingPlan.reducer,
      extensionPhoneNumber: _this.extensionPhoneNumber.reducer,
      forwardingNumber: _this.forwardingNumber.reducer,
      blockedNumber: _this.blockedNumber.reducer,
      regionSettings: _this.regionSettings.reducer,
      callingSettings: _this.callingSettings.reducer,
      call: _this.call.reducer,
      rateLimiter: _this.rateLimiter.reducer,
      ringout: _this.ringout.reducer,
      softphone: _this.softphone.reducer,
      // callLog: this.callLog.reducer,
      // callMonitor: callMonitorReducer,
      environment: _this.environment.reducer,
      presence: _this.presence.reducer,
      contactMatcher: _this.contactMatcher.reducer,
      activityMatcher: _this.activityMatcher.reducer,
      storage: _this.storage.reducer,
      // autoLogger: this.autoLogger.reducer,
      globalStorage: _this.globalStorage.reducer,
      contactSearch: _this.contactSearch.reducer,
      numberValidate: _this.numberValidate.reducer,
      messageSender: _this.messageSender.reducer,
      composeText: _this.composeText.reducer,
      messageStore: _this.messageStore.reducer,
      conversation: _this.conversation.reducer,
      messages: _this.messages.reducer
      // adapter: this.adapter.reducer,
    });
    return _this;
  }

  (0, _createClass3.default)(Phone, [{
    key: 'name',
    get: function get() {
      return this.state.app.name;
    }
  }, {
    key: 'version',
    get: function get() {
      return this.state.app.version;
    }
  }]);
  return Phone;
}(_RcModule3.default);
// import RouterInteraction from 'ringcentral-js-widget/modules/RouterInteraction';

exports.default = Phone;
//# sourceMappingURL=index.js.map
