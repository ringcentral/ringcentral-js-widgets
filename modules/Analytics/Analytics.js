"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-iso-string");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.values");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRACK_LIST = exports.DEFAULT_TAG_NAME = exports.Analytics = void 0;
exports.track = track;
exports.tracking = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _mixpanelBrowser = _interopRequireDefault(require("mixpanel-browser"));
var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));
var _Analytics = require("../../lib/Analytics");
var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));
var _di = require("../../lib/di");
var _saveBlob = _interopRequireDefault(require("../../lib/saveBlob"));
var _callingModes = require("../CallingSettings/callingModes");
var _actionTypes = require("./actionTypes");
var _getAnalyticsReducer = _interopRequireDefault(require("./getAnalyticsReducer"));
var _dec, _dec2, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function warn() {
  console.warn('Do NOT call this directly.');
}
var TRACK_LIST = [];
exports.TRACK_LIST = TRACK_LIST;
function track(tagName) {
  return function _track(prototype, property, descriptor) {
    var value = descriptor.value,
      options = _objectWithoutProperties(descriptor, ["value"]);
    if (typeof value === 'function') {
      TRACK_LIST.push({
        tagName: tagName,
        funcName: property,
        funcImpl: value
      });
    }
    return _objectSpread(_objectSpread({}, options), {}, {
      value: warn,
      configurable: false
    });
  };
}
var DEFAULT_TAG_NAME = 'default';
exports.DEFAULT_TAG_NAME = DEFAULT_TAG_NAME;
var tracking = track(DEFAULT_TAG_NAME);

/**
 * @class
 * @description Analytics module.
 */
exports.tracking = tracking;
var Analytics = (_dec = (0, _di.Module)({
  name: 'Analytics',
  deps: [{
    dep: 'AnalyticsOptions',
    optional: true
  }, {
    dep: 'Adapter',
    optional: true
  }, {
    dep: 'Auth',
    optional: true
  }, {
    dep: 'Call',
    optional: true
  }, {
    dep: 'CallingSettings',
    optional: true
  }, {
    dep: 'AccountInfo',
    optional: true
  }, {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'ExtensionInfo',
    optional: true
  }, {
    dep: 'CallHistory',
    optional: true
  }, {
    dep: 'CallMonitor',
    optional: true
  }, {
    dep: 'Conference',
    optional: true
  }, {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'MessageSender',
    optional: true
  }, {
    dep: 'MessageStore',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }, {
    dep: 'UserGuide',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'Locale',
    optional: true
  }, {
    dep: 'Meeting',
    optional: true
  }, {
    dep: 'RcVideo',
    optional: true
  }, {
    dep: 'CallLogSection',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }, {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'TierChecker',
    optional: true
  }, {
    dep: 'Brand',
    optional: true
  }, {
    dep: 'ExtensionFeatures',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  var _that$_accountInfo, _that$_extensionInfo, _that$_extensionFeatu;
  return [that._brand.brandConfig, (_that$_accountInfo = that._accountInfo) === null || _that$_accountInfo === void 0 ? void 0 : _that$_accountInfo.id, (_that$_extensionInfo = that._extensionInfo) === null || _that$_extensionInfo === void 0 ? void 0 : _that$_extensionInfo.country, (_that$_extensionFeatu = that._extensionFeatures) === null || _that$_extensionFeatu === void 0 ? void 0 : _that$_extensionFeatu.features];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(Analytics, _RcModule);
  var _super = _createSuper(Analytics);
  function Analytics(_ref) {
    var _analyticsOptions$use;
    var _this;
    var analyticsOptions = _ref.analyticsOptions,
      analyticsKey = _ref.analyticsKey,
      pendoApiKey = _ref.pendoApiKey,
      appName = _ref.appName,
      appVersion = _ref.appVersion,
      brandCode = _ref.brandCode,
      adapter = _ref.adapter,
      auth = _ref.auth,
      call = _ref.call,
      callingSettings = _ref.callingSettings,
      accountInfo = _ref.accountInfo,
      extensionInfo = _ref.extensionInfo,
      callHistory = _ref.callHistory,
      callMonitor = _ref.callMonitor,
      conference = _ref.conference,
      conferenceCall = _ref.conferenceCall,
      contactDetailsUI = _ref.contactDetailsUI,
      messageSender = _ref.messageSender,
      messageStore = _ref.messageStore,
      routerInteraction = _ref.routerInteraction,
      userGuide = _ref.userGuide,
      webphone = _ref.webphone,
      locale = _ref.locale,
      meeting = _ref.meeting,
      environment = _ref.environment,
      rcVideo = _ref.rcVideo,
      dialerUI = _ref.dialerUI,
      tierChecker = _ref.tierChecker,
      brand = _ref.brand,
      extensionFeatures = _ref.extensionFeatures,
      _ref$useLog = _ref.useLog,
      useLog = _ref$useLog === void 0 ? false : _ref$useLog,
      _ref$lingerThreshold = _ref.lingerThreshold,
      lingerThreshold = _ref$lingerThreshold === void 0 ? 1000 : _ref$lingerThreshold,
      callLogSection = _ref.callLogSection,
      activeCallControl = _ref.activeCallControl,
      _ref$enablePendo = _ref.enablePendo,
      enablePendo = _ref$enablePendo === void 0 ? false : _ref$enablePendo,
      _ref$enableMixpanel = _ref.enableMixpanel,
      enableMixpanel = _ref$enableMixpanel === void 0 ? false : _ref$enableMixpanel,
      _ref$env = _ref.env,
      env = _ref$env === void 0 ? 'dev' : _ref$env,
      options = _objectWithoutProperties(_ref, ["analyticsOptions", "analyticsKey", "pendoApiKey", "appName", "appVersion", "brandCode", "adapter", "auth", "call", "callingSettings", "accountInfo", "extensionInfo", "callHistory", "callMonitor", "conference", "conferenceCall", "contactDetailsUI", "messageSender", "messageStore", "routerInteraction", "userGuide", "webphone", "locale", "meeting", "environment", "rcVideo", "dialerUI", "tierChecker", "brand", "extensionFeatures", "useLog", "lingerThreshold", "callLogSection", "activeCallControl", "enablePendo", "enableMixpanel", "env"]);
    _classCallCheck(this, Analytics);
    // TODO: fix type from new modules based on RcModulesV2
    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.analyticsActionTypes
    }));
    _this.appInitTime = Date.now();
    // TODO: add state interface
    // AnalyticsOptions
    _this._analyticsKey = void 0;
    _this._pendoApiKey = void 0;
    _this._appName = void 0;
    _this._appVersion = void 0;
    _this._brandCode = void 0;
    _this._adapter = void 0;
    _this._auth = void 0;
    _this._call = void 0;
    _this._callingSettings = void 0;
    _this._accountInfo = void 0;
    _this._extensionInfo = void 0;
    _this._environment = void 0;
    _this._callHistory = void 0;
    _this._callMonitor = void 0;
    _this._conference = void 0;
    _this._conferenceCall = void 0;
    _this._contactDetailsUI = void 0;
    _this._messageSender = void 0;
    _this._messageStore = void 0;
    _this._routerInteraction = void 0;
    _this._userGuide = void 0;
    _this._webphone = void 0;
    _this._locale = void 0;
    _this._meeting = void 0;
    _this._rcVideo = void 0;
    _this._tierChecker = void 0;
    _this._brand = void 0;
    _this._extensionFeatures = void 0;
    _this._dialerUI = void 0;
    _this._segment = void 0;
    _this._pendo = void 0;
    _this._trackList = void 0;
    _this._useLog = void 0;
    _this._logs = [];
    _this._lingerThreshold = void 0;
    _this._lingerTimeout = void 0;
    _this._promise = void 0;
    _this._callLogSection = void 0;
    _this._activeCallControl = void 0;
    _this._enablePendo = void 0;
    _this._enableMixpanel = void 0;
    _this._waitPendoCount = void 0;
    _this._pendoTimeout = void 0;
    _this._env = void 0;
    _this._useLocalPendoJS = void 0;
    _this._OSInfo = void 0;
    _this._OSInfo = (0, _utils.getOsInfo)();

    // config
    _this._analyticsKey = analyticsKey;
    _this._pendoApiKey = pendoApiKey;
    _this._appName = appName;
    _this._appVersion = appVersion;
    _this._brandCode = brandCode;

    // modules
    _this._adapter = adapter;
    _this._auth = auth;
    _this._call = call;
    _this._callingSettings = callingSettings;
    _this._accountInfo = accountInfo;
    _this._extensionInfo = extensionInfo;
    _this._environment = environment;
    _this._callHistory = callHistory;
    _this._callMonitor = callMonitor;
    _this._conference = conference;
    _this._conferenceCall = conferenceCall;
    _this._contactDetailsUI = contactDetailsUI;
    _this._messageSender = messageSender;
    _this._messageStore = messageStore;
    _this._routerInteraction = routerInteraction;
    _this._userGuide = userGuide;
    _this._webphone = webphone;
    _this._locale = locale;
    _this._meeting = meeting;
    _this._rcVideo = rcVideo;
    _this._callLogSection = callLogSection;
    _this._activeCallControl = activeCallControl;
    _this._dialerUI = dialerUI;
    _this._tierChecker = tierChecker;
    _this._brand = brand;
    _this._extensionFeatures = extensionFeatures;
    // init
    _this._reducer = (0, _getAnalyticsReducer["default"])(_this.actionTypes);
    _this._trackList = [].concat(TRACK_LIST);
    _this._useLog = useLog;
    _this._lingerThreshold = lingerThreshold;
    _this._enablePendo = enablePendo;
    _this._pendo = null;
    _this._waitPendoCount = 0;
    _this._env = env;
    _this._analyticsKey = analyticsKey;
    _this._useLocalPendoJS = (_analyticsOptions$use = analyticsOptions === null || analyticsOptions === void 0 ? void 0 : analyticsOptions.useLocalPendoJS) !== null && _analyticsOptions$use !== void 0 ? _analyticsOptions$use : false;
    _this._enableMixpanel = !!(enableMixpanel && analyticsKey);
    _this._segment = _this._enableMixpanel ? null : (0, _Analytics.Segment)();
    if (_this.enableMixpanel) {
      _mixpanelBrowser["default"].init(_this._analyticsKey);
      // According to EU policy, we had to disable mixpanel to upload IP addresses
      _mixpanelBrowser["default"].set_config({
        ip: false
      });
      // ready
      _this.onAnalyticsReady();
    }
    if (_this._enablePendo && _this._pendoApiKey) {
      _Analytics.Pendo.init(_this._pendoApiKey, _this._useLocalPendoJS, function (pendoInstance) {
        _this._pendo = pendoInstance;
      });
    }
    return _this;
  }

  /** Hook to be override by subclass */
  _createClass(Analytics, [{
    key: "onAnalyticsReady",
    value: function onAnalyticsReady() {}
  }, {
    key: "identify",
    value: function identify(options) {
      this._identify(options);
    }
  }, {
    key: "_identify",
    value: function _identify(_ref2) {
      var _this2 = this;
      var userId = _ref2.userId,
        props = _objectWithoutProperties(_ref2, ["userId"]);
      if (this.enableMixpanel) {
        // @ts-expect-error TS(2345): Argument of type '{ env: string; userId: string; }... Remove this comment to see the full error message
        this._mixpanelInitialize(_objectSpread(_objectSpread({
          userId: userId
        }, props), {}, {
          env: this._env
        }));
      } else if (this.analytics) {
        this.analytics.ready(function () {
          // According to EU policy, we had to disable mixpanel to upload IP addresses
          // @ts-expect-error TS(2339): Property 'mixpanel' does not exist on type 'Window... Remove this comment to see the full error message
          if (typeof window.mixpanel !== 'undefined') {
            // @ts-expect-error TS(2339): Property 'mixpanel' does not exist on type 'Window... Remove this comment to see the full error message
            window.mixpanel.set_config(_objectSpread(_objectSpread({}, window.mixpanel.config), {}, {
              ip: false
            }));
          } else {
            console.error('mixpanel is not defined, and failure to disable IP address upload');
          }
          // ready
          _this2.onAnalyticsReady();
        });
        this.analytics.identify(userId, props, {
          integrations: {
            All: true,
            Mixpanel: true
          }
        });
      }
      if (this._enablePendo && this._pendoApiKey) {
        this._pendoInitialize(_objectSpread(_objectSpread({
          userId: userId
        }, props), {}, {
          env: this._env
        }));
      }
    }
  }, {
    key: "_mixpanelInitialize",
    value: function _mixpanelInitialize(_ref3) {
      var _mixpanel$get_distinc;
      var userId = _ref3.userId;
      if (!userId || ((_mixpanel$get_distinc = _mixpanelBrowser["default"].get_distinct_id) === null || _mixpanel$get_distinc === void 0 ? void 0 : _mixpanel$get_distinc.call(_mixpanelBrowser["default"])) === userId) {
        return;
      }
      console.log('mixpanel identify');
      _mixpanelBrowser["default"].identify(userId);
    }
  }, {
    key: "_pendoInitialize",
    value: function _pendoInitialize(_ref4) {
      var _this3 = this,
        _this$_accountInfo,
        _this$_accountInfo$se,
        _this$_accountInfo$se2,
        _this$_accountInfo2;
      var userId = _ref4.userId,
        props = _objectWithoutProperties(_ref4, ["userId"]);
      if (!this._accountInfo || !this._accountInfo.id || !userId) {
        return;
      }
      if (this._pendoTimeout) {
        clearTimeout(this._pendoTimeout);
        this._pendoTimeout = undefined;
      }
      if (this._waitPendoCount > 3) {
        return;
      }
      if (!this._pendo) {
        this._pendoTimeout = setTimeout(function () {
          _this3._waitPendoCount += 1;
          _this3._pendoInitialize(_objectSpread({
            userId: userId
          }, props));
        }, 5 * 1000);
        return;
      }
      var initializeFunc = !this._pendo.isReady() ? this._pendo.initialize : this._pendo.updateOptions;
      var pendoAgent = {
        visitor: _objectSpread(_objectSpread({
          id: userId
        }, props), {}, {
          appName: this._appName,
          appVersion: this._appVersion,
          appBrand: this._brandCode,
          plaBrand: (_this$_accountInfo = this._accountInfo) === null || _this$_accountInfo === void 0 ? void 0 : (_this$_accountInfo$se = _this$_accountInfo.serviceInfo) === null || _this$_accountInfo$se === void 0 ? void 0 : (_this$_accountInfo$se2 = _this$_accountInfo$se.brand) === null || _this$_accountInfo$se2 === void 0 ? void 0 : _this$_accountInfo$se2.name,
          countryCode: (_this$_accountInfo2 = this._accountInfo) === null || _this$_accountInfo2 === void 0 ? void 0 : _this$_accountInfo2.countryCode
        }),
        account: {
          id: this._accountInfo.id
        }
      };
      typeof initializeFunc === 'function' && initializeFunc(_objectSpread({}, pendoAgent));
    }
  }, {
    key: "track",
    value: function track(event) {
      var _this$_pendo, _this$_pendo$isReady;
      var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.analytics && !this.enableMixpanel) {
        return;
      }
      var trackProps = _objectSpread(_objectSpread({}, this.trackProps), properties);
      if (this.enableMixpanel) {
        var _this$_auth;
        // NOTE: Data tracking has been migrated from Segment to Mixpanel.
        // Add id to identify in Mixpanel, so the usage data can be filtered same as before.
        if ((_this$_auth = this._auth) === null || _this$_auth === void 0 ? void 0 : _this$_auth.ownerId) {
          trackProps.id = this._auth.ownerId;
        }
        _mixpanelBrowser["default"].track(event, trackProps);
      }
      if (this.analytics) {
        this.analytics.track(event, trackProps, {
          integrations: {
            All: true,
            Mixpanel: true
          }
        });
      }
      if (this._useLog) {
        this._logs.push({
          timeStamp: new Date().toISOString(),
          event: event,
          trackProps: trackProps
        });
      }
      if (this._enablePendo && ((_this$_pendo = this._pendo) === null || _this$_pendo === void 0 ? void 0 : (_this$_pendo$isReady = _this$_pendo.isReady) === null || _this$_pendo$isReady === void 0 ? void 0 : _this$_pendo$isReady.call(_this$_pendo))) {
        this._pendo.track("".concat(trackProps.appName, "-").concat(event), trackProps);
      }
    }
  }, {
    key: "downloadLogs",
    value: function downloadLogs() {
      if (!this._useLog) {
        return;
      }
      var blob = new Blob([JSON.stringify(this._logs, null, 2)], {
        type: 'application/json'
      });
      (0, _saveBlob["default"])('logs.json', blob);
    }
  }, {
    key: "trackNavigation",
    value: function trackNavigation(_ref5) {
      var router = _ref5.router,
        eventPostfix = _ref5.eventPostfix;
      var trackProps = {
        router: router,
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      };
      this.track("Navigation: Click/".concat(eventPostfix), trackProps);
    }
  }, {
    key: "trackLinger",
    value: function trackLinger(_ref6) {
      var router = _ref6.router,
        eventPostfix = _ref6.eventPostfix;
      var trackProps = {
        router: router,
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      };
      this.track("Navigation: View/".concat(eventPostfix), trackProps);
    }
  }, {
    key: "trackSchedule",
    value: function trackSchedule(_ref7) {
      var router = _ref7.router;
      var trackProps = {
        router: router,
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode
      };
      this.track('Meeting: Click Schedule/Meeting schedule page', trackProps);
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.pending) {
                  this.store.dispatch({
                    type: this.actionTypes.init
                  });
                  if (this._analyticsKey && this._segment) {
                    this._segment.load(this._analyticsKey, {
                      integrations: {
                        All: true,
                        Mixpanel: true
                      }
                    });
                  }
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                }
                if (this.ready && this.lastActions.length && !this._promise) {
                  this._promise = this._processActions();
                }
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }
      return _onStateChange;
    }()
  }, {
    key: "_processActions",
    value: function () {
      var _processActions2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this4 = this;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.lastActions.length) {
                  _context2.next = 6;
                  break;
                }
                _context2.next = 3;
                return (0, _utils.sleep)(300);
              case 3:
                this.lastActions.forEach(function (action) {
                  _this4.processAction(action);
                });
                this.store.dispatch({
                  type: this.actionTypes.clear
                });
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Promise<voi... Remove this comment to see the full error message
                this._promise = null;
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _processActions() {
        return _processActions2.apply(this, arguments);
      }
      return _processActions;
    }()
  }, {
    key: "processAction",
    value: function processAction(action) {
      var _this5 = this;
      (this.trackList || []).forEach(function (_ref8) {
        var funcImpl = _ref8.funcImpl;
        if (typeof funcImpl === 'function') {
          funcImpl.call(_this5, action);
        }
      });
    }
  }, {
    key: "_authentication",
    value: function _authentication(action) {
      var _this$_auth2;
      if (((_this$_auth2 = this._auth) === null || _this$_auth2 === void 0 ? void 0 : _this$_auth2.actionTypes.loginSuccess) === action.type) {
        this.setUserId();
        this.track('Authentication');
      }
    }
  }, {
    key: "_logout",
    value: function _logout(action) {
      var _this$_auth3;
      if (((_this$_auth3 = this._auth) === null || _this$_auth3 === void 0 ? void 0 : _this$_auth3.actionTypes.logout) === action.type) {
        this.track('Logout');
      }
    }
  }, {
    key: "_accountInfoReady",
    value: function _accountInfoReady(action) {
      var _this$_accountInfo3;
      if (((_this$_accountInfo3 = this._accountInfo) === null || _this$_accountInfo3 === void 0 ? void 0 : _this$_accountInfo3.actionTypes.initSuccess) === action.type) {
        var _this$_auth4, _this$_tierChecker;
        this._identify({
          userId: (_this$_auth4 = this._auth) === null || _this$_auth4 === void 0 ? void 0 : _this$_auth4.ownerId,
          accountId: this._accountInfo.id,
          servicePlanId: this._accountInfo.servicePlan.id,
          edition: this._accountInfo.servicePlan.edition,
          CRMEnabled: (_this$_tierChecker = this._tierChecker) === null || _this$_tierChecker === void 0 ? void 0 : _this$_tierChecker.isCRMEnabled
        });
      }
    }
  }, {
    key: "_callAttempt",
    value: function _callAttempt(action) {
      var _this$_call;
      if (((_this$_call = this._call) === null || _this$_call === void 0 ? void 0 : _this$_call.actionTypes.connect) === action.type) {
        if (action.callSettingMode === _callingModes.callingModes.webphone) {
          this.track('Call Attempt WebRTC');
        } else {
          this.track('Call Attempt', {
            callSettingMode: action.callSettingMode
          });
        }
      }
    }
  }, {
    key: "_callConnected",
    value: function _callConnected(action) {
      var _this$_call2;
      if (((_this$_call2 = this._call) === null || _this$_call2 === void 0 ? void 0 : _this$_call2.actionTypes.connectSuccess) === action.type) {
        if (action.callSettingMode === _callingModes.callingModes.webphone) {
          this.track('Outbound WebRTC Call Connected');
        } else {
          this.track('Outbound Call Connected', {
            callSettingMode: action.callSettingMode
          });
        }
      }
    }
  }, {
    key: "_webRTCRegistration",
    value: function _webRTCRegistration(action) {
      var _this$_webphone;
      if (((_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.actionTypes.registered) === action.type) {
        this.track('WebRTC registration');
      }
    }
  }, {
    key: "_smsAttempt",
    value: function _smsAttempt(action) {
      var _this$_messageSender;
      if (((_this$_messageSender = this._messageSender) === null || _this$_messageSender === void 0 ? void 0 : _this$_messageSender.actionTypes.send) === action.type) {
        this.track('SMS Attempt');
      }
    }
  }, {
    key: "_smsSentOver",
    value: function _smsSentOver(action) {
      var _this$_messageSender2;
      if (((_this$_messageSender2 = this._messageSender) === null || _this$_messageSender2 === void 0 ? void 0 : _this$_messageSender2.actionTypes.sendOver) === action.type) {
        this.track('SMS: SMS sent successfully');
      }
    }
  }, {
    key: "_smsSentError",
    value: function _smsSentError(action) {
      var _this$_messageSender3;
      if (((_this$_messageSender3 = this._messageSender) === null || _this$_messageSender3 === void 0 ? void 0 : _this$_messageSender3.actionTypes.sendError) === action.type) {
        this.track('SMS: SMS sent failed');
      }
    }
  }, {
    key: "_logCall",
    value: function _logCall(action) {
      var _this$_adapter;
      if (((_this$_adapter = this._adapter) === null || _this$_adapter === void 0 ? void 0 : _this$_adapter.actionTypes.createCallLog) === action.type) {
        this.track('Log Call');
      }
    }
  }, {
    key: "_logSMS",
    value: function _logSMS(action) {
      var _this$_adapter2;
      if (((_this$_adapter2 = this._adapter) === null || _this$_adapter2 === void 0 ? void 0 : _this$_adapter2.actionTypes.createSMSLog) === action.type) {
        this.track('Log SMS');
      }
    }
  }, {
    key: "_clickToDial",
    value: function _clickToDial(action) {
      var _this$_adapter3;
      if (((_this$_adapter3 = this._adapter) === null || _this$_adapter3 === void 0 ? void 0 : _this$_adapter3.actionTypes.clickToDial) === action.type) {
        this.track('Click To Dial');
      }
    }
  }, {
    key: "_clickToDialPlaceRingOutCall",
    value: function _clickToDialPlaceRingOutCall(action) {
      var _this$_adapter4;
      if (((_this$_adapter4 = this._adapter) === null || _this$_adapter4 === void 0 ? void 0 : _this$_adapter4.actionTypes.clickToDial) === action.type && action.callSettingMode !== _callingModes.callingModes.webphone) {
        var _this$_callingSetting;
        this.track('Call: Place RingOut call/Click to Dial ', {
          'RingOut type': (_this$_callingSetting = this._callingSettings) === null || _this$_callingSetting === void 0 ? void 0 : _this$_callingSetting.callWith
        });
      }
    }
  }, {
    key: "_clickToSMS",
    value: function _clickToSMS(action) {
      var _this$_adapter5;
      if (((_this$_adapter5 = this._adapter) === null || _this$_adapter5 === void 0 ? void 0 : _this$_adapter5.actionTypes.clickToSMS) === action.type) {
        this.track('Click To SMS');
      }
    }
  }, {
    key: "_viewEntity",
    value: function _viewEntity(action) {
      var _this$_adapter6;
      if (((_this$_adapter6 = this._adapter) === null || _this$_adapter6 === void 0 ? void 0 : _this$_adapter6.actionTypes.viewEntity) === action.type) {
        this.track('View Entity Details');
      }
    }
  }, {
    key: "_createEntity",
    value: function _createEntity(action) {
      var _this$_adapter7;
      if (((_this$_adapter7 = this._adapter) === null || _this$_adapter7 === void 0 ? void 0 : _this$_adapter7.actionTypes.createEntity) === action.type) {
        this.track('Add Entity');
      }
    }
  }, {
    key: "_editCallLog",
    value: function _editCallLog(action) {
      var _this$_adapter8;
      if (((_this$_adapter8 = this._adapter) === null || _this$_adapter8 === void 0 ? void 0 : _this$_adapter8.actionTypes.editCallLog) === action.type) {
        this.track('Edit Call Log');
      }
    }
  }, {
    key: "_editSMSLog",
    value: function _editSMSLog(action) {
      var _this$_adapter9;
      if (((_this$_adapter9 = this._adapter) === null || _this$_adapter9 === void 0 ? void 0 : _this$_adapter9.actionTypes.editSMSLog) === action.type) {
        this.track('Edit SMS Log');
      }
    }
  }, {
    key: "_navigate",
    value: function _navigate(action) {
      var _this$_routerInteract,
        _this6 = this;
      if (((_this$_routerInteract = this._routerInteraction) === null || _this$_routerInteract === void 0 ? void 0 : _this$_routerInteract.actionTypes.locationChange) === action.type) {
        var path = action.payload && action.payload.pathname;
        var target = this.getTrackTarget(path);
        if (target) {
          this.trackNavigation(target);
        }
        if (this._lingerTimeout) {
          clearTimeout(this._lingerTimeout);
        }
        this._lingerTimeout = setTimeout(function () {
          _this6._lingerTimeout = undefined;
          if (target && _this6._routerInteraction.currentPath === path) {
            _this6.trackLinger(target);
          }
        }, this._lingerThreshold);
      }
    }
  }, {
    key: "_inboundCall",
    value: function _inboundCall(action) {
      var _this$_webphone2;
      if (((_this$_webphone2 = this._webphone) === null || _this$_webphone2 === void 0 ? void 0 : _this$_webphone2.actionTypes.callAnswer) === action.type) {
        this.track('Inbound WebRTC Call Connected');
      }
    }
  }, {
    key: "_textClickToDial",
    value: function _textClickToDial(action) {
      var _this$_messageStore;
      if (((_this$_messageStore = this._messageStore) === null || _this$_messageStore === void 0 ? void 0 : _this$_messageStore.actionTypes.clickToCall) === action.type && (action.fromType === 'Pager' || action.fromType === 'SMS')) {
        this.track('Click To Dial (Text List)');
      }
    }
  }, {
    key: "_voicemailClickToDial",
    value: function _voicemailClickToDial(action) {
      var _this$_messageStore2;
      if (((_this$_messageStore2 = this._messageStore) === null || _this$_messageStore2 === void 0 ? void 0 : _this$_messageStore2.actionTypes.clickToCall) === action.type && action.fromType === 'VoiceMail') {
        this.track('Click To Dial (Voicemail List)');
      }
    }
  }, {
    key: "_voicemailClickToSMS",
    value: function _voicemailClickToSMS(action) {
      var _this$_messageStore3;
      if (((_this$_messageStore3 = this._messageStore) === null || _this$_messageStore3 === void 0 ? void 0 : _this$_messageStore3.actionTypes.clickToSMS) === action.type) {
        this.track('Click to SMS (Voicemail List)');
      }
    }
  }, {
    key: "_voicemailDelete",
    value: function _voicemailDelete(action) {
      var _this$_messageStore4;
      if (((_this$_messageStore4 = this._messageStore) === null || _this$_messageStore4 === void 0 ? void 0 : _this$_messageStore4.actionTypes.removeMessage) === action.type) {
        this.track('Delete Voicemail');
      }
    }
  }, {
    key: "_voicemailFlag",
    value: function _voicemailFlag(action) {
      var _this$_messageStore5;
      if (((_this$_messageStore5 = this._messageStore) === null || _this$_messageStore5 === void 0 ? void 0 : _this$_messageStore5.actionTypes.markMessages) === action.type) {
        this.track('Flag Voicemail');
      }
    }
  }, {
    key: "_contactDetailClickToDial",
    value: function _contactDetailClickToDial(action) {
      var _this$_contactDetails;
      if (((_this$_contactDetails = this._contactDetailsUI) === null || _this$_contactDetails === void 0 ? void 0 : _this$_contactDetails.actionTypes.clickToCall) === action.type) {
        this.track('Click To Dial (Contact Details)');
      }
    }
  }, {
    key: "_contactDetailClickToSMS",
    value: function _contactDetailClickToSMS(action) {
      var _this$_contactDetails2;
      if (((_this$_contactDetails2 = this._contactDetailsUI) === null || _this$_contactDetails2 === void 0 ? void 0 : _this$_contactDetails2.actionTypes.clickToSMS) === action.type) {
        this.track('Click To SMS (Contact Details)');
      }
    }
  }, {
    key: "_callHistoryClickToDial",
    value: function _callHistoryClickToDial(action) {
      var _this$_callHistory;
      if (((_this$_callHistory = this._callHistory) === null || _this$_callHistory === void 0 ? void 0 : _this$_callHistory.actionTypes.clickToCall) === action.type) {
        this.track('Click To dial (Call History)');
      }
    }
  }, {
    key: "_callHistoryClickToSMS",
    value: function _callHistoryClickToSMS(action) {
      var _this$_callHistory2;
      if (((_this$_callHistory2 = this._callHistory) === null || _this$_callHistory2 === void 0 ? void 0 : _this$_callHistory2.actionTypes.clickToSMS) === action.type) {
        this.track('Click To SMS (Call History)');
      }
    }
  }, {
    key: "_conferenceInviteWithText",
    value: function _conferenceInviteWithText(action) {
      var _this$_conference;
      if (((_this$_conference = this._conference) === null || _this$_conference === void 0 ? void 0 : _this$_conference.actionTypes.inviteWithText) === action.type) {
        this.track('Invite With Text (Conference)');
      }
    }
  }, {
    key: "_conferenceAddDialInNumber",
    value: function _conferenceAddDialInNumber(action) {
      var _this$_conference2;
      if (((_this$_conference2 = this._conference) === null || _this$_conference2 === void 0 ? void 0 : _this$_conference2.actionTypes.updateAdditionalNumbers) === action.type) {
        this.track('Select Additional Dial-in Number (Conference)');
      }
    }
  }, {
    key: "_conferenceJoinAsHost",
    value: function _conferenceJoinAsHost(action) {
      var _this$_conference3;
      if (((_this$_conference3 = this._conference) === null || _this$_conference3 === void 0 ? void 0 : _this$_conference3.actionTypes.joinAsHost) === action.type) {
        this.track('Join As Host (Conference)');
      }
    }
  }, {
    key: "_showWhatsNew",
    value: function _showWhatsNew(action) {
      var _this$_userGuide;
      if (((_this$_userGuide = this._userGuide) === null || _this$_userGuide === void 0 ? void 0 : _this$_userGuide.actionTypes.updateCarousel) === action.type && action.curIdx === 0 && action.playing) {
        this.track("What's New");
      }
    }
  }, {
    key: "_allCallsClickHold",
    value: function _allCallsClickHold(action) {
      var _this$_callMonitor;
      if (((_this$_callMonitor = this._callMonitor) === null || _this$_callMonitor === void 0 ? void 0 : _this$_callMonitor.actionTypes.allCallsClickHoldTrack) === action.type) {
        this.track('Click Hold (All Calls)');
      }
    }
  }, {
    key: "_allCallsClickHangup",
    value: function _allCallsClickHangup(action) {
      var _this$_callMonitor2;
      if (((_this$_callMonitor2 = this._callMonitor) === null || _this$_callMonitor2 === void 0 ? void 0 : _this$_callMonitor2.actionTypes.allCallsClickHangupTrack) === action.type) {
        this.track('Click Hangup (All Calls)');
      }
    }
  }, {
    key: "_allCallsCallItemClick",
    value: function _allCallsCallItemClick(action) {
      var _this$_callMonitor3;
      if (((_this$_callMonitor3 = this._callMonitor) === null || _this$_callMonitor3 === void 0 ? void 0 : _this$_callMonitor3.actionTypes.callItemClickTrack) === action.type) {
        this.track('Click Call Item (All Calls)');
      }
    }
  }, {
    key: "_callControlClickAdd",
    value: function _callControlClickAdd(action) {
      var _this$_callMonitor4;
      if (((_this$_callMonitor4 = this._callMonitor) === null || _this$_callMonitor4 === void 0 ? void 0 : _this$_callMonitor4.actionTypes.callControlClickAddTrack) === action.type) {
        this.track('Click Add (Call Control)');
      }
    }
  }, {
    key: "_callControlClickMerge",
    value: function _callControlClickMerge(action) {
      var _this$_callMonitor5;
      if (((_this$_callMonitor5 = this._callMonitor) === null || _this$_callMonitor5 === void 0 ? void 0 : _this$_callMonitor5.actionTypes.callControlClickMergeTrack) === action.type && !Object.values(this._conferenceCall.state.mergingPair).length) {
        this.track('Click Merge (Call Control)');
      }
    }
  }, {
    key: "_mergeCallControlClickMerge",
    value: function _mergeCallControlClickMerge(action) {
      var _this$_callMonitor6;
      if (((_this$_callMonitor6 = this._callMonitor) === null || _this$_callMonitor6 === void 0 ? void 0 : _this$_callMonitor6.actionTypes.callControlClickMergeTrack) === action.type && Object.values(this._conferenceCall.state.mergingPair).length) {
        this.track('Click Merge (Merge Call Control)');
      }
    }
  }, {
    key: "_mergeCallControlClickHangup",
    value: function _mergeCallControlClickHangup(action) {
      var _this$_callMonitor7;
      if (((_this$_callMonitor7 = this._callMonitor) === null || _this$_callMonitor7 === void 0 ? void 0 : _this$_callMonitor7.actionTypes.mergeControlClickHangupTrack) === action.type) {
        this.track('Click Hangup (Merge Call Control)');
      }
    }
  }, {
    key: "_inboundCallConnectedTrack",
    value: function _inboundCallConnectedTrack(action) {
      var _this$_callMonitor8;
      if (((_this$_callMonitor8 = this._callMonitor) === null || _this$_callMonitor8 === void 0 ? void 0 : _this$_callMonitor8.actionTypes.inboundCallConnectedTrack) === action.type) {
        this.track('Call: Inbound call connected');
      }
    }
  }, {
    key: "_outboundCallConnectedTrack",
    value: function _outboundCallConnectedTrack(action) {
      var _this$_callMonitor9;
      if (((_this$_callMonitor9 = this._callMonitor) === null || _this$_callMonitor9 === void 0 ? void 0 : _this$_callMonitor9.actionTypes.outboundCallConnectedTrack) === action.type) {
        this.track('Call: Outbound RingOut Call connected');
      }
    }
  }, {
    key: "_callsOnHoldClickAdd",
    value: function _callsOnHoldClickAdd(action) {
      var _this$_callMonitor10;
      if (((_this$_callMonitor10 = this._callMonitor) === null || _this$_callMonitor10 === void 0 ? void 0 : _this$_callMonitor10.actionTypes.callsOnHoldClickAddTrack) === action.type) {
        this.track('Click Add (Calls OnHold)');
      }
    }
  }, {
    key: "_callsOnHoldClickMerge",
    value: function _callsOnHoldClickMerge(action) {
      var _this$_callMonitor11;
      if (((_this$_callMonitor11 = this._callMonitor) === null || _this$_callMonitor11 === void 0 ? void 0 : _this$_callMonitor11.actionTypes.callsOnHoldClickMergeTrack) === action.type) {
        this.track('Click Merge (Calls OnHold)');
      }
    }
  }, {
    key: "_confirmMergeClickClose",
    value: function _confirmMergeClickClose(action) {
      var _this$_callMonitor12;
      if (((_this$_callMonitor12 = this._callMonitor) === null || _this$_callMonitor12 === void 0 ? void 0 : _this$_callMonitor12.actionTypes.confirmMergeClickCloseTrack) === action.type) {
        this.track('Click Close (ConfirmMerge Modal)');
      }
    }
  }, {
    key: "_confirmMergeClickMerge",
    value: function _confirmMergeClickMerge(action) {
      var _this$_callMonitor13;
      if (((_this$_callMonitor13 = this._callMonitor) === null || _this$_callMonitor13 === void 0 ? void 0 : _this$_callMonitor13.actionTypes.confirmMergeClickMergeTrack) === action.type) {
        this.track('Click Merge (ConfirmMerge Modal)');
      }
    }
  }, {
    key: "_removeParticipantClickRemove",
    value: function _removeParticipantClickRemove(action) {
      var _this$_conferenceCall;
      if (((_this$_conferenceCall = this._conferenceCall) === null || _this$_conferenceCall === void 0 ? void 0 : _this$_conferenceCall.actionTypes.removeParticipantClickRemoveTrack) === action.type) {
        this.track('Click Remove (RemoveParticipants Modal)');
      }
    }
  }, {
    key: "_removeParticipantClickCancel",
    value: function _removeParticipantClickCancel(action) {
      var _this$_conferenceCall2;
      if (((_this$_conferenceCall2 = this._conferenceCall) === null || _this$_conferenceCall2 === void 0 ? void 0 : _this$_conferenceCall2.actionTypes.removeParticipantClickCancelTrack) === action.type) {
        this.track('Cancel Remove (RemoveParticipants Modal)');
      }
    }
  }, {
    key: "_participantListClickHangup",
    value: function _participantListClickHangup(action) {
      var _this$_conferenceCall3;
      if (((_this$_conferenceCall3 = this._conferenceCall) === null || _this$_conferenceCall3 === void 0 ? void 0 : _this$_conferenceCall3.actionTypes.participantListClickHangupTrack) === action.type) {
        this.track('Click Hangup (Participant List)');
      }
    }
  }, {
    key: "_callControlClickParticipantArea",
    value: function _callControlClickParticipantArea(action) {
      var _this$_callMonitor14;
      if (((_this$_callMonitor14 = this._callMonitor) === null || _this$_callMonitor14 === void 0 ? void 0 : _this$_callMonitor14.actionTypes.callControlClickParticipantAreaClickTrack) === action.type) {
        this.track('Click Participant Area (Call Control)');
      }
    }
  }, {
    key: "_callsOnHoldClickHangup",
    value: function _callsOnHoldClickHangup(action) {
      var _this$_callMonitor15;
      if (((_this$_callMonitor15 = this._callMonitor) === null || _this$_callMonitor15 === void 0 ? void 0 : _this$_callMonitor15.actionTypes.callsOnHoldClickHangupTrack) === action.type) {
        this.track('Click Hangup (Calls OnHold)');
      }
    }
  }, {
    key: "setUserId",
    value: function setUserId() {
      this._identify({
        userId: this._auth.ownerId
      });
    }
  }, {
    key: "getTrackTarget",
    value: function getTrackTarget() {
      var _this$_routerInteract2;
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_this$_routerInteract2 = this._routerInteraction) === null || _this$_routerInteract2 === void 0 ? void 0 : _this$_routerInteract2.currentPath;
      if (!path) {
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'TrackTarget... Remove this comment to see the full error message
        return null;
      }
      var routes = path.split('/');
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      var formatRoute = null;
      var needMatchSecondRoutes = ['calls'];
      if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
        formatRoute = "/".concat(routes[1], "/").concat(routes[2]);
      } else if (routes.length > 1) {
        formatRoute = "/".concat(routes[1]);
      }
      var targets = [{
        eventPostfix: 'Dialer',
        router: '/dialer'
      }, {
        eventPostfix: 'Compose SMS',
        router: '/composeText'
      }, {
        eventPostfix: 'Messages',
        router: '/messages'
      }, {
        eventPostfix: 'Conversation',
        router: '/conversations'
      }, {
        eventPostfix: 'Call History',
        router: '/history'
      }, {
        eventPostfix: 'All calls page',
        router: '/calls'
      }, {
        eventPostfix: 'Settings',
        router: '/settings'
      }, {
        eventPostfix: 'Meeting',
        router: '/meeting'
      }, {
        eventPostfix: 'Contacts',
        router: '/contacts'
      }, {
        eventPostfix: 'Call Control',
        router: '/calls/active'
      }, {
        eventPostfix: 'Transfer',
        router: '/transfer'
      }, {
        eventPostfix: 'Small call control',
        router: '/simplifycallctrl'
      }, {
        eventPostfix: 'Flip',
        router: '/flip'
      }, {
        eventPostfix: 'Add',
        router: '/conferenceCall'
      }];
      var target = targets.find(function (target) {
        return formatRoute === target.router;
      });
      // @ts-expect-error TS(2322): Type 'TrackTarget | undefined' is not assignable t... Remove this comment to see the full error message
      return target;
    }
  }, {
    key: "_schedule",
    value: function _schedule(action) {
      var _this$_meeting, _this$_rcVideo;
      if (((_this$_meeting = this._meeting) === null || _this$_meeting === void 0 ? void 0 : _this$_meeting.actionTypes.initScheduling) === action.type || ((_this$_rcVideo = this._rcVideo) === null || _this$_rcVideo === void 0 ? void 0 : _this$_rcVideo.actionTypes.initCreating) === action.type) {
        var _this$_routerInteract3;
        var target = this.getTrackTarget((_this$_routerInteract3 = this._routerInteraction) === null || _this$_routerInteract3 === void 0 ? void 0 : _this$_routerInteract3.currentPath);
        if (target) {
          this.trackSchedule(target);
        }
      }
    }
  }, {
    key: "_viewCallLogPage",
    value: function _viewCallLogPage(action) {
      var _this$_callLogSection;
      if (((_this$_callLogSection = this._callLogSection) === null || _this$_callLogSection === void 0 ? void 0 : _this$_callLogSection.actionTypes.showLogSection) === action.type) {
        this.track('Call Log: View/Call log page');
      }
    }
  }, {
    key: "_notificationClickLog",
    value: function _notificationClickLog(action) {
      var _this$_callLogSection2;
      if (((_this$_callLogSection2 = this._callLogSection) === null || _this$_callLogSection2 === void 0 ? void 0 : _this$_callLogSection2.actionTypes.expandNotification) === action.type) {
        this.track('Call Log: Click call log/Notification');
      }
    }
  }, {
    key: "_muteOnSimpleCallControl",
    value: function _muteOnSimpleCallControl(action) {
      var _this$_activeCallCont, _this$_routerInteract4;
      if (((_this$_activeCallCont = this._activeCallControl) === null || _this$_activeCallCont === void 0 ? void 0 : _this$_activeCallCont.actionTypes.mute) === action.type && ((_this$_routerInteract4 = this._routerInteraction) === null || _this$_routerInteract4 === void 0 ? void 0 : _this$_routerInteract4.currentPath.includes('/simplifycallctrl'))) {
        this.track('Call Control: Mute/Small call control');
      }
    }
  }, {
    key: "_unmuteOnSimpleCallControl",
    value: function _unmuteOnSimpleCallControl(action) {
      var _this$_activeCallCont2, _this$_routerInteract5;
      if (((_this$_activeCallCont2 = this._activeCallControl) === null || _this$_activeCallCont2 === void 0 ? void 0 : _this$_activeCallCont2.actionTypes.unmute) === action.type && ((_this$_routerInteract5 = this._routerInteraction) === null || _this$_routerInteract5 === void 0 ? void 0 : _this$_routerInteract5.currentPath.includes('/simplifycallctrl'))) {
        this.track('Call Control: Unmute/Small call control');
      }
    }
  }, {
    key: "_holdOnSimpleCallControl",
    value: function _holdOnSimpleCallControl(action) {
      var _this$_activeCallCont3, _this$_routerInteract6;
      if (((_this$_activeCallCont3 = this._activeCallControl) === null || _this$_activeCallCont3 === void 0 ? void 0 : _this$_activeCallCont3.actionTypes.hold) === action.type && ((_this$_routerInteract6 = this._routerInteraction) === null || _this$_routerInteract6 === void 0 ? void 0 : _this$_routerInteract6.currentPath.includes('/simplifycallctrl'))) {
        this.track('Call Control: Hold/Small call control');
      }
    }
  }, {
    key: "_unholdOnSimpleCallControl",
    value: function _unholdOnSimpleCallControl(action) {
      var _this$_activeCallCont4, _this$_routerInteract7;
      if (((_this$_activeCallCont4 = this._activeCallControl) === null || _this$_activeCallCont4 === void 0 ? void 0 : _this$_activeCallCont4.actionTypes.unhold) === action.type && ((_this$_routerInteract7 = this._routerInteraction) === null || _this$_routerInteract7 === void 0 ? void 0 : _this$_routerInteract7.currentPath.includes('/simplifycallctrl'))) {
        this.track('Call Control: Unhold/Small call control');
      }
    }
  }, {
    key: "_confirmTransfer",
    value: function _confirmTransfer(action) {
      var _this$_activeCallCont5;
      if (((_this$_activeCallCont5 = this._activeCallControl) === null || _this$_activeCallCont5 === void 0 ? void 0 : _this$_activeCallCont5.actionTypes.transfer) === action.type) {
        this.track('Call Control: Cold transfer/Transfer page');
      }
    }
  }, {
    key: "_muteOnCallLogPage",
    value: function _muteOnCallLogPage(action) {
      var _this$_callLogSection3, _this$_activeCallCont6;
      if (((_this$_callLogSection3 = this._callLogSection) === null || _this$_callLogSection3 === void 0 ? void 0 : _this$_callLogSection3.show) && ((_this$_activeCallCont6 = this._activeCallControl) === null || _this$_activeCallCont6 === void 0 ? void 0 : _this$_activeCallCont6.actionTypes.mute) === action.type) {
        this.track('Call Control: Mute/Call log page');
      }
    }
  }, {
    key: "_unmuteOnCallLogPage",
    value: function _unmuteOnCallLogPage(action) {
      var _this$_callLogSection4, _this$_activeCallCont7;
      if (((_this$_callLogSection4 = this._callLogSection) === null || _this$_callLogSection4 === void 0 ? void 0 : _this$_callLogSection4.show) && ((_this$_activeCallCont7 = this._activeCallControl) === null || _this$_activeCallCont7 === void 0 ? void 0 : _this$_activeCallCont7.actionTypes.unmute) === action.type) {
        this.track('Call Control: Unmute/Call log page');
      }
    }
  }, {
    key: "_holdOnCallLogPage",
    value: function _holdOnCallLogPage(action) {
      var _this$_callLogSection5, _this$_activeCallCont8;
      if (((_this$_callLogSection5 = this._callLogSection) === null || _this$_callLogSection5 === void 0 ? void 0 : _this$_callLogSection5.show) && ((_this$_activeCallCont8 = this._activeCallControl) === null || _this$_activeCallCont8 === void 0 ? void 0 : _this$_activeCallCont8.actionTypes.hold) === action.type) {
        this.track('Call Control: Hold/Call log page');
      }
    }
  }, {
    key: "_unholdOnCallLogPage",
    value: function _unholdOnCallLogPage(action) {
      var _this$_callLogSection6, _this$_activeCallCont9;
      if (((_this$_callLogSection6 = this._callLogSection) === null || _this$_callLogSection6 === void 0 ? void 0 : _this$_callLogSection6.show) && ((_this$_activeCallCont9 = this._activeCallControl) === null || _this$_activeCallCont9 === void 0 ? void 0 : _this$_activeCallCont9.actionTypes.unhold) === action.type) {
        this.track('Call Control: Unhold/Call log page');
      }
    }
  }, {
    key: "_hangupOnCallLogPage",
    value: function _hangupOnCallLogPage(action) {
      var _this$_callLogSection7, _this$_activeCallCont10;
      if (((_this$_callLogSection7 = this._callLogSection) === null || _this$_callLogSection7 === void 0 ? void 0 : _this$_callLogSection7.show) && ((_this$_activeCallCont10 = this._activeCallControl) === null || _this$_activeCallCont10 === void 0 ? void 0 : _this$_activeCallCont10.actionTypes.hangUp) === action.type) {
        this.track('Call Control: Hang up/Call log page');
      }
    }
  }, {
    key: "_smsHistoryPlaceRingOutCall",
    value: function _smsHistoryPlaceRingOutCall(action) {
      var _this$_messageStore6;
      if (((_this$_messageStore6 = this._messageStore) === null || _this$_messageStore6 === void 0 ? void 0 : _this$_messageStore6.actionTypes.clickToCall) === action.type && this._callingSettings.callingMode !== _callingModes.callingModes.webphone) {
        var _this$_callingSetting2;
        this.track('Call: Place RingOut call/SMS history', {
          'RingOut type': (_this$_callingSetting2 = this._callingSettings) === null || _this$_callingSetting2 === void 0 ? void 0 : _this$_callingSetting2.callWith
        });
      }
    }
  }, {
    key: "_callHistoryPlaceRingOutCall",
    value: function _callHistoryPlaceRingOutCall(action) {
      var _this$_callHistory3;
      if (((_this$_callHistory3 = this._callHistory) === null || _this$_callHistory3 === void 0 ? void 0 : _this$_callHistory3.actionTypes.clickToCall) === action.type && this._callingSettings.callingMode !== _callingModes.callingModes.webphone) {
        var _this$_callingSetting3;
        this.track('Call: Place RingOut call/Call history', {
          'RingOut type': (_this$_callingSetting3 = this._callingSettings) === null || _this$_callingSetting3 === void 0 ? void 0 : _this$_callingSetting3.callWith
        });
      }
    }
  }, {
    key: "_dialerPlaceRingOutCall",
    value: function _dialerPlaceRingOutCall(action) {
      var _this$_dialerUI, _action$phoneNumber;
      if (((_this$_dialerUI = this._dialerUI) === null || _this$_dialerUI === void 0 ? void 0 : _this$_dialerUI.actionTypes.call) === action.type && (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      ((_action$phoneNumber = action.phoneNumber) === null || _action$phoneNumber === void 0 ? void 0 : _action$phoneNumber.length) > 0 || action.recipient) && this._callingSettings.callingMode !== _callingModes.callingModes.webphone) {
        var _this$_callingSetting4;
        this.track('Call: Place RingOut call/Dialer', {
          'RingOut type': (_this$_callingSetting4 = this._callingSettings) === null || _this$_callingSetting4 === void 0 ? void 0 : _this$_callingSetting4.callWith
        });
      }
    }
  }, {
    key: "toggleDebug",
    value: function toggleDebug() {
      this.mixpanel.set_config({
        debug: !this.mixpanel.get_config('debug')
      });
    }
  }, {
    key: "trackList",
    get: function get() {
      return this._trackList;
    }
  }, {
    key: "mixpanel",
    get: function get() {
      return _mixpanelBrowser["default"];
    }
  }, {
    key: "analytics",
    get: function get() {
      return global.analytics;
    }
  }, {
    key: "lastActions",
    get: function get() {
      return this.state.lastActions;
    } // @ts-expect-error TS(2416): Property 'status' in type 'Analytics' is not assig... Remove this comment to see the full error message
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "trackedUserInfo",
    get: function get() {
      var _this$_accountInfo4, _this$_accountInfo5, _this$_accountInfo6, _this$_accountInfo7, _this$_extensionFeatu, _features$RingOut, _features$WebPhone, _features$PagesReceiv, _features$SMSReceivin, _features$FaxReceivin, _features$Glip;
      var userInfo = {
        BrandId: this._brand.brandConfig.id,
        AccountID: (_this$_accountInfo4 = this._accountInfo) === null || _this$_accountInfo4 === void 0 ? void 0 : _this$_accountInfo4.id,
        BrandName: this._brand.brandConfig.name,
        CRMEnabled: (_this$_accountInfo5 = this._accountInfo) === null || _this$_accountInfo5 === void 0 ? void 0 : _this$_accountInfo5.isCRMEnabled,
        servicePlanId: (_this$_accountInfo6 = this._accountInfo) === null || _this$_accountInfo6 === void 0 ? void 0 : _this$_accountInfo6.servicePlan.id,
        edition: (_this$_accountInfo7 = this._accountInfo) === null || _this$_accountInfo7 === void 0 ? void 0 : _this$_accountInfo7.servicePlan.edition
      };
      var features = (_this$_extensionFeatu = this._extensionFeatures) === null || _this$_extensionFeatu === void 0 ? void 0 : _this$_extensionFeatu.features;
      var isCallingEnabled = (features === null || features === void 0 ? void 0 : (_features$RingOut = features.RingOut) === null || _features$RingOut === void 0 ? void 0 : _features$RingOut.available) || (features === null || features === void 0 ? void 0 : (_features$WebPhone = features.WebPhone) === null || _features$WebPhone === void 0 ? void 0 : _features$WebPhone.available);
      var hasSmsPermission = (features === null || features === void 0 ? void 0 : (_features$PagesReceiv = features.PagesReceiving) === null || _features$PagesReceiv === void 0 ? void 0 : _features$PagesReceiv.available) || (features === null || features === void 0 ? void 0 : (_features$SMSReceivin = features.SMSReceiving) === null || _features$SMSReceivin === void 0 ? void 0 : _features$SMSReceivin.available);
      var hasFaxPermission = features === null || features === void 0 ? void 0 : (_features$FaxReceivin = features.FaxReceiving) === null || _features$FaxReceivin === void 0 ? void 0 : _features$FaxReceivin.available;
      var hasGlipPermission = features === null || features === void 0 ? void 0 : (_features$Glip = features.Glip) === null || _features$Glip === void 0 ? void 0 : _features$Glip.available;
      var properties = [{
        name: 'PhoneService',
        value: isCallingEnabled
      }, {
        name: 'SMSService',
        value: hasSmsPermission
      }, {
        name: 'FaxService',
        value: hasFaxPermission
      }, {
        name: 'MessageService',
        value: hasGlipPermission
      }];
      properties.forEach(function (_ref9) {
        var name = _ref9.name,
          value = _ref9.value;
        if (value !== undefined) {
          userInfo[name] = value ? 'ON' : 'OFF';
        }
      });
      return userInfo;
    }
  }, {
    key: "trackProps",
    get: function get() {
      var _this$_locale, _this$_locale2, _this$_extensionInfo;
      return _objectSpread(_objectSpread(_objectSpread({}, this.trackedUserInfo), this._OSInfo), {}, {
        appName: this._appName,
        appVersion: this._appVersion,
        brand: this._brandCode,
        'App Language': ((_this$_locale = this._locale) === null || _this$_locale === void 0 ? void 0 : _this$_locale.currentLocale) || '',
        'Browser Language': ((_this$_locale2 = this._locale) === null || _this$_locale2 === void 0 ? void 0 : _this$_locale2.browserLocale) || '',
        'Extension Type': ((_this$_extensionInfo = this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : _this$_extensionInfo.info.type) || '',
        'App Init Time': this.appInitTime
      });
    }
  }, {
    key: "enableMixpanel",
    get: function get() {
      return !!(this._enableMixpanel && (!this._environment || this._environment.allowDataTracking));
    }
  }]);
  return Analytics;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_authentication", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_authentication"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_logout", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_logout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_accountInfoReady", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_accountInfoReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callAttempt", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callAttempt"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callConnected", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callConnected"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_webRTCRegistration", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_webRTCRegistration"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsAttempt", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsAttempt"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentOver", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentOver"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentError", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_logCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_logCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_logSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_logSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_clickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clickToDialPlaceRingOutCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_clickToDialPlaceRingOutCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clickToSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_clickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_viewEntity", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_viewEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_createEntity", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_createEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_editCallLog", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_editCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_editSMSLog", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_editSMSLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_navigate", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_navigate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_inboundCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_inboundCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_textClickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_textClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_voicemailClickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_voicemailClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_voicemailClickToSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_voicemailClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_voicemailDelete", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_voicemailDelete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_voicemailFlag", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_voicemailFlag"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_contactDetailClickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_contactDetailClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_contactDetailClickToSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_contactDetailClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callHistoryClickToDial", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callHistoryClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callHistoryClickToSMS", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callHistoryClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_conferenceInviteWithText", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_conferenceInviteWithText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_conferenceAddDialInNumber", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_conferenceAddDialInNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_conferenceJoinAsHost", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_conferenceJoinAsHost"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_showWhatsNew", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_showWhatsNew"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_allCallsClickHold", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_allCallsClickHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_allCallsClickHangup", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_allCallsClickHangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_allCallsCallItemClick", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_allCallsCallItemClick"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callControlClickAdd", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callControlClickAdd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callControlClickMerge", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callControlClickMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_mergeCallControlClickMerge", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_mergeCallControlClickMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_mergeCallControlClickHangup", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_mergeCallControlClickHangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_inboundCallConnectedTrack", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_inboundCallConnectedTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_outboundCallConnectedTrack", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_outboundCallConnectedTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callsOnHoldClickAdd", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callsOnHoldClickAdd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callsOnHoldClickMerge", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callsOnHoldClickMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_confirmMergeClickClose", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_confirmMergeClickClose"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_confirmMergeClickMerge", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_confirmMergeClickMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeParticipantClickRemove", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeParticipantClickRemove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeParticipantClickCancel", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeParticipantClickCancel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_participantListClickHangup", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_participantListClickHangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callControlClickParticipantArea", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callControlClickParticipantArea"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callsOnHoldClickHangup", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callsOnHoldClickHangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_schedule", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_viewCallLogPage", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_viewCallLogPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_notificationClickLog", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_notificationClickLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_muteOnSimpleCallControl", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_muteOnSimpleCallControl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_unmuteOnSimpleCallControl", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_unmuteOnSimpleCallControl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_holdOnSimpleCallControl", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_holdOnSimpleCallControl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_unholdOnSimpleCallControl", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_unholdOnSimpleCallControl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_confirmTransfer", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_confirmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_muteOnCallLogPage", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_muteOnCallLogPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_unmuteOnCallLogPage", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_unmuteOnCallLogPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_holdOnCallLogPage", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_holdOnCallLogPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_unholdOnCallLogPage", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_unholdOnCallLogPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_hangupOnCallLogPage", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_hangupOnCallLogPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsHistoryPlaceRingOutCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsHistoryPlaceRingOutCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callHistoryPlaceRingOutCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_callHistoryPlaceRingOutCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_dialerPlaceRingOutCall", [tracking], Object.getOwnPropertyDescriptor(_class2.prototype, "_dialerPlaceRingOutCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackedUserInfo", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "trackedUserInfo"), _class2.prototype)), _class2)) || _class);
exports.Analytics = Analytics;
//# sourceMappingURL=Analytics.js.map
