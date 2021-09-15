"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPhone = createPhone;
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _sdk = require("@ringcentral/sdk");

var _di = require("../../../lib/di");

var _normalizeNumber2 = _interopRequireDefault(require("../../../lib/normalizeNumber"));

var _RcModule2 = _interopRequireDefault(require("../../../lib/RcModule"));

var _RingCentralClient = require("../../../lib/RingCentralClient");

var _AccountContacts = _interopRequireDefault(require("../../../modules/AccountContacts"));

var _AccountInfo = _interopRequireDefault(require("../../../modules/AccountInfo"));

var _ActiveCallControl = _interopRequireDefault(require("../../../modules/ActiveCallControl"));

var _AddressBook = _interopRequireDefault(require("../../../modules/AddressBook"));

var _Alert = _interopRequireDefault(require("../../../modules/Alert"));

var _AppFeatures = require("../../../modules/AppFeatures");

var _AudioSettings = _interopRequireDefault(require("../../../modules/AudioSettings"));

var _Auth = _interopRequireDefault(require("../../../modules/Auth"));

var _AvailabilityMonitor = _interopRequireDefault(require("../../../modules/AvailabilityMonitor"));

var _BlockedNumber = _interopRequireDefault(require("../../../modules/BlockedNumber"));

var _Brand = require("../../../modules/Brand");

var _Call = _interopRequireDefault(require("../../../modules/Call"));

var _CallHistory = _interopRequireDefault(require("../../../modules/CallHistory"));

var _CallingSettings = _interopRequireDefault(require("../../../modules/CallingSettings"));

var _CallLog = _interopRequireDefault(require("../../../modules/CallLog"));

var _CallMonitor = _interopRequireDefault(require("../../../modules/CallMonitor"));

var _CompanyContacts = _interopRequireDefault(require("../../../modules/CompanyContacts"));

var _ComposeText = _interopRequireDefault(require("../../../modules/ComposeText"));

var _Conference = _interopRequireDefault(require("../../../modules/Conference"));

var _ConferenceCall = _interopRequireDefault(require("../../../modules/ConferenceCall"));

var _ConnectivityMonitor = _interopRequireDefault(require("../../../modules/ConnectivityMonitor"));

var _ContactMatcher = _interopRequireDefault(require("../../../modules/ContactMatcher"));

var _Contacts = _interopRequireDefault(require("../../../modules/Contacts"));

var _ContactSearch = _interopRequireDefault(require("../../../modules/ContactSearch"));

var _Conversations = _interopRequireDefault(require("../../../modules/Conversations"));

var _DateTimeFormat = _interopRequireDefault(require("../../../modules/DateTimeFormat"));

var _DialingPlan = _interopRequireDefault(require("../../../modules/DialingPlan"));

var _Environment = _interopRequireDefault(require("../../../modules/Environment"));

var _ExtensionDevice = _interopRequireDefault(require("../../../modules/ExtensionDevice"));

var _ExtensionFeatures = require("../../../modules/ExtensionFeatures");

var _ExtensionInfo = _interopRequireDefault(require("../../../modules/ExtensionInfo"));

var _ExtensionPhoneNumber = _interopRequireDefault(require("../../../modules/ExtensionPhoneNumber"));

var _ForwardingNumber = _interopRequireDefault(require("../../../modules/ForwardingNumber"));

var _GlobalStorage = _interopRequireDefault(require("../../../modules/GlobalStorage"));

var _Locale = require("../../../modules/Locale");

var _LocaleSettings = _interopRequireDefault(require("../../../modules/LocaleSettings"));

var _Meeting = _interopRequireDefault(require("../../../modules/Meeting"));

var _MessageSender = _interopRequireDefault(require("../../../modules/MessageSender"));

var _MessageStore = _interopRequireDefault(require("../../../modules/MessageStore"));

var _NumberValidate = _interopRequireDefault(require("../../../modules/NumberValidate"));

var _Presence = _interopRequireDefault(require("../../../modules/Presence"));

var _QuickAccess = _interopRequireDefault(require("../../../modules/QuickAccess"));

var _RateLimiter = _interopRequireDefault(require("../../../modules/RateLimiter"));

var _RecentCalls = _interopRequireDefault(require("../../../modules/RecentCalls"));

var _RecentMessages = _interopRequireDefault(require("../../../modules/RecentMessages"));

var _RegionSettings = _interopRequireDefault(require("../../../modules/RegionSettings"));

var _Ringout = _interopRequireDefault(require("../../../modules/Ringout"));

var _Softphone = require("../../../modules/Softphone");

var _Storage = _interopRequireDefault(require("../../../modules/Storage"));

var _Subscription = _interopRequireDefault(require("../../../modules/Subscription"));

var _TabManager = require("../../../modules/TabManager");

var _UserGuide = _interopRequireDefault(require("../../../modules/UserGuide"));

var _Webphone = _interopRequireDefault(require("../../../modules/Webphone"));

var _dec2, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BasePhone = (_dec2 = (0, _di.ModuleFactory)({
  providers: [{
    provide: 'Client',
    useFactory: function useFactory(_ref2) {
      var sdkConfig = _ref2.sdkConfig;
      return new _RingCentralClient.RingCentralClient(new _sdk.SDK(sdkConfig));
    },
    deps: [{
      dep: 'SdkConfig',
      useParam: true
    }]
  }, {
    provide: 'Alert',
    useClass: _Alert["default"]
  }, {
    provide: 'Brand',
    useClass: _Brand.Brand
  }, {
    provide: 'Softphone',
    useClass: _Softphone.Softphone
  }, {
    provide: 'Locale',
    useClass: _Locale.Locale
  }, {
    provide: 'DateTimeFormat',
    useClass: _DateTimeFormat["default"]
  }, {
    provide: 'TabManager',
    useClass: _TabManager.TabManager
  }, {
    provide: 'GlobalStorage',
    useClass: _GlobalStorage["default"]
  }, {
    provide: 'LocaleSettings',
    useClass: _LocaleSettings["default"]
  }, {
    provide: 'Environment',
    useClass: _Environment["default"]
  }, {
    provide: 'Auth',
    useClass: _Auth["default"]
  }, {
    provide: 'Ringout',
    useClass: _Ringout["default"]
  }, {
    provide: 'ConnectivityMonitor',
    useClass: _ConnectivityMonitor["default"]
  }, {
    provide: 'RateLimiter',
    useClass: _RateLimiter["default"]
  }, {
    provide: 'Storage',
    useClass: _Storage["default"]
  }, {
    provide: 'AudioSettings',
    useClass: _AudioSettings["default"]
  }, {
    provide: 'CompanyContacts',
    useClass: _CompanyContacts["default"]
  }, {
    provide: 'AccountInfo',
    useClass: _AccountInfo["default"]
  }, {
    provide: 'ExtensionDevice',
    useClass: _ExtensionDevice["default"]
  }, {
    provide: 'ExtensionInfo',
    useClass: _ExtensionInfo["default"]
  }, {
    provide: 'ExtensionFeatures',
    useClass: _ExtensionFeatures.ExtensionFeatures
  }, {
    provide: 'AppFeatures',
    useClass: _AppFeatures.AppFeatures
  }, {
    provide: 'DialingPlan',
    useClass: _DialingPlan["default"]
  }, {
    provide: 'ExtensionPhoneNumber',
    useClass: _ExtensionPhoneNumber["default"]
  }, {
    provide: 'ForwardingNumber',
    useClass: _ForwardingNumber["default"]
  }, {
    provide: 'RegionSettings',
    useClass: _RegionSettings["default"]
  }, {
    provide: 'NumberValidate',
    useClass: _NumberValidate["default"]
  }, {
    provide: 'CallingSettings',
    useClass: _CallingSettings["default"]
  }, {
    provide: 'Call',
    useClass: _Call["default"]
  }, {
    provide: 'Subscription',
    useClass: _Subscription["default"]
  }, {
    provide: 'Presence',
    useClass: _Presence["default"]
  }, {
    provide: 'MessageSender',
    useClass: _MessageSender["default"]
  }, {
    provide: 'ComposeText',
    useClass: _ComposeText["default"]
  }, {
    provide: 'MessageStore',
    useClass: _MessageStore["default"]
  }, {
    provide: 'Conversations',
    useClass: _Conversations["default"]
  }, {
    provide: 'Conference',
    useClass: _Conference["default"]
  }, {
    provide: 'CallLog',
    useClass: _CallLog["default"]
  }, {
    provide: 'CallHistory',
    useClass: _CallHistory["default"]
  }, {
    provide: 'AccountContacts',
    useClass: _AccountContacts["default"]
  }, {
    provide: 'AddressBook',
    useClass: _AddressBook["default"]
  }, {
    provide: 'Contacts',
    useClass: _Contacts["default"]
  }, {
    provide: 'QuickAccess',
    useClass: _QuickAccess["default"]
  }, {
    provide: 'ContactSources',
    deps: ['AddressBook', 'AccountContacts'],
    useFactory: function useFactory(_ref3) {
      var addressBook = _ref3.addressBook,
          accountContacts = _ref3.accountContacts;
      return [addressBook, accountContacts];
    }
  }, {
    provide: 'ContactMatcher',
    useClass: _ContactMatcher["default"]
  }, {
    provide: 'RecentMessages',
    useClass: _RecentMessages["default"]
  }, {
    provide: 'RecentCalls',
    useClass: _RecentCalls["default"]
  }, {
    provide: 'Meeting',
    useClass: _Meeting["default"]
  }, {
    provide: 'Webphone',
    useClass: _Webphone["default"]
  }, {
    provide: 'ContactSearch',
    useClass: _ContactSearch["default"]
  }, {
    provide: 'CallMonitor',
    useClass: _CallMonitor["default"]
  }, {
    provide: 'UserGuide',
    useClass: _UserGuide["default"]
  }, {
    provide: 'ActiveCallControl',
    useClass: _ActiveCallControl["default"]
  }, {
    provide: 'StorageOptions',
    useValue: {
      // StorageProvider: LocalForageStorage, // IndexedDB
      disableAllowInactiveTabsWrite: true
    },
    spread: true
  }, {
    provide: 'MessageStoreOptions',
    useValue: {
      daySpan: 90,
      conversationsLoadLength: 10,
      conversationLoadLength: 15
    },
    spread: true
  }, {
    provide: 'ConversationsOptions',
    useValue: {
      enableLoadOldMessages: true,
      showMMSAttachment: true
    },
    spread: true
  }, {
    provide: 'ConferenceCall',
    useClass: _ConferenceCall["default"]
  }, {
    provide: 'AvailabilityMonitor',
    useClass: _AvailabilityMonitor["default"]
  }, {
    provide: 'AvailabilityMonitorOptions',
    useValue: {
      enabled: true
    },
    spread: true
  }, {
    provide: 'BlockedNumber',
    useClass: _BlockedNumber["default"]
  }]
}), _dec2(_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(BasePhone, _RcModule);

  var _super2 = _createSuper(BasePhone);

  function BasePhone() {
    _classCallCheck(this, BasePhone);

    return _super2.apply(this, arguments);
  }

  _createClass(BasePhone, [{
    key: "_normalizeNumber",
    value: function _normalizeNumber(phoneNumber) {
      return (0, _normalizeNumber2["default"])({
        phoneNumber: phoneNumber,
        countryCode: this.regionSettings.countryCode,
        areaCode: this.regionSettings.areaCode
      });
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      /* no action types */
      return null;
    }
  }]);

  return BasePhone;
}(_RcModule2["default"])) || _class2);
exports["default"] = BasePhone;

function createPhone(_ref) {
  var _dec, _class;

  var _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? 'rc' : _ref$prefix,
      _ref$version = _ref.version,
      version = _ref$version === void 0 ? '0.1.0' : _ref$version,
      apiConfig = _ref.apiConfig,
      brandConfig = _ref.brandConfig;
  var Phone = (_dec = (0, _di.ModuleFactory)({
    providers: [{
      provide: 'Prefix',
      useValue: prefix
    }, {
      provide: 'SdkConfig',
      useValue: _objectSpread(_objectSpread({}, apiConfig), {}, {
        cachePrefix: 'sdk-rc',
        clearCacheOnRefreshError: false
      })
    }, {
      provide: 'BrandConfig',
      useValue: brandConfig
    }, {
      provide: 'WebphoneOptions',
      spread: true,
      useValue: {
        // appKey: apiConfig.appKey,
        appKey: 'eac8797af1b3502F2CEAAEECAC3Ed378AA7858A386656f28A008b0c638A754B1',
        appName: brandConfig.appName,
        appVersion: version
      }
    }, {
      provide: 'Version',
      useFactory: function useFactory() {
        return version;
      }
    }]
  }), _dec(_class = /*#__PURE__*/function (_BasePhone) {
    _inherits(Phone, _BasePhone);

    var _super = _createSuper(Phone);

    function Phone() {
      _classCallCheck(this, Phone);

      return _super.apply(this, arguments);
    }

    return Phone;
  }(BasePhone)) || _class);
  return Phone.create();
}
//# sourceMappingURL=index.js.map
