"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsView = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _views2 = require("@ringcentral-integration/micro-setting/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _SettingsPanel = require("@ringcentral-integration/widgets/components/SettingsPanel");
var _react = _interopRequireWildcard(require("react"));
var _services3 = require("../../services");
var _SettingsPanel2 = require("./SettingsPanel");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_REGION_SETTINGS_URL = '/settings/region';
var DEFAULT_CALLING_SETTINGS_URL = '/settings/calling';
var DEFAULT_AUDIO_SETTINGS_URL = '/settings/audio';
var DEFAULT_FEEDBACK_SETTINGS_URL = '/settings/feedback';
var DEFAULT_ISSUE_TACKING_SETTINGS_URL = '/settings/issuesTracking';
var DEFAULT_THEME_SWITCH_URL = '/settings/theme';
var DEFAULT_AUTO_LOG_SETTINGS_URL = '/settings/autoCallLogSettings';
var DEFAULT_CALL_QUEUE_MANAGEMENT_URL = '/settings/callQueueManagement';
var SettingsView = exports.SettingsView = (_dec = (0, _nextCore.injectable)({
  name: 'SettingsView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Version')(target, undefined, 14);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 15);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 16);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('SettingsViewOptions')(target, undefined, 17);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _services.UserInfo === "undefined" ? Object : _services.UserInfo, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services2.Theme === "undefined" ? Object : _services2.Theme, typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.ExtensionFeatures === "undefined" ? Object : _services.ExtensionFeatures, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.Presence === "undefined" ? Object : _services.Presence, typeof _views2.CPRClientView === "undefined" ? Object : _views2.CPRClientView, typeof _views2.CallQueueManagementView === "undefined" ? Object : _views2.CallQueueManagementView, String, typeof _services3.QuickAccess === "undefined" ? Object : _services3.QuickAccess, typeof _services3.UserGuide === "undefined" ? Object : _services3.UserGuide, typeof SettingsViewOptions === "undefined" ? Object : SettingsViewOptions]), _dec8 = (0, _nextCore.dynamic)('WelcomeView'), _dec9 = Reflect.metadata("design:type", typeof WelcomeView === "undefined" ? Object : WelcomeView), _dec0 = (0, _nextCore.dynamic)('AutoCallLoggingSwitchView'), _dec1 = Reflect.metadata("design:type", typeof AutoCallLoggingSwitchView === "undefined" ? Object : AutoCallLoggingSwitchView), _dec10 = (0, _nextCore.dynamic)('IntegrationConfig'), _dec11 = Reflect.metadata("design:type", typeof IntegrationConfig === "undefined" ? Object : IntegrationConfig), _dec12 = Reflect.metadata("design:type", Boolean), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [Boolean]), _dec15 = (0, _nextCore.dynamic)('CallingSettings'), _dec16 = Reflect.metadata("design:type", typeof CallingSettings === "undefined" ? Object : CallingSettings), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec21 = (0, _nextCore.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", []), _dec24 = (0, _services.track)(_trackEvents.trackEvents.clickFeedback), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = (0, _nextCore.delegate)('server'), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function SettingsView(_userInfo, _auth, _theme, _brand, _locale, _accountInfo, _extensionInfo, _regionSettings, _extensionFeatures, _appFeatures, _router, _presence, _cPRClientView, _callQueueManagementView, _version, _quickAccess, _userGuide, _settingsViewOptions) {
    var _this;
    _classCallCheck(this, SettingsView);
    _this = _callSuper(this, SettingsView);
    _this._userInfo = _userInfo;
    _this._auth = _auth;
    _this._theme = _theme;
    _this._brand = _brand;
    _this._locale = _locale;
    _this._accountInfo = _accountInfo;
    _this._extensionInfo = _extensionInfo;
    _this._regionSettings = _regionSettings;
    _this._extensionFeatures = _extensionFeatures;
    _this._appFeatures = _appFeatures;
    _this._router = _router;
    _this._presence = _presence;
    _this._cPRClientView = _cPRClientView;
    _this._callQueueManagementView = _callQueueManagementView;
    _this._version = _version;
    _this._quickAccess = _quickAccess;
    _this._userGuide = _userGuide;
    _this._settingsViewOptions = _settingsViewOptions;
    _initializerDefineProperty(_this, "welcomeView", _descriptor, _this);
    _initializerDefineProperty(_this, "_autoCallLoggingSwitchView", _descriptor2, _this);
    _initializerDefineProperty(_this, "_integrationConfig", _descriptor3, _this);
    _initializerDefineProperty(_this, "autoLogTextUpdating", _descriptor4, _this);
    _initializerDefineProperty(_this, "_callingSettings", _descriptor5, _this);
    _initializerDefineProperty(_this, "popUpAppForInboundCall", _descriptor6, _this);
    return _this;
  }
  _inherits(SettingsView, _RcViewModule);
  return _createClass(SettingsView, [{
    key: "_setAutoLogTextUpdating",
    value: function _setAutoLogTextUpdating(val) {
      this.autoLogTextUpdating = val;
    }
  }, {
    key: "loginNumber",
    get: function get() {
      return this._userInfo.loginNumber && (0, _formatNumber.formatNumber)({
        phoneNumber: this._userInfo.loginNumber,
        countryCode: this._regionSettings.countryCode,
        areaCode: this._regionSettings.areaCode
      }) || this._brand.name;
    }
  }, {
    key: "_togglePopUpAppForInboundCall",
    value: function _togglePopUpAppForInboundCall() {
      this.popUpAppForInboundCall = !this.popUpAppForInboundCall;
    }
  }, {
    key: "togglePopUpAppForInboundCall",
    value: function () {
      var _togglePopUpAppForInboundCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._togglePopUpAppForInboundCall();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function togglePopUpAppForInboundCall() {
        return _togglePopUpAppForInboundCall2.apply(this, arguments);
      }
      return togglePopUpAppForInboundCall;
    }()
  }, {
    key: "trackOnFeedbackClick",
    value: function trackOnFeedbackClick() {}
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_settingsViewOp, _this$_settingsViewOp2, _this$_presence, _this$_presence2, _this$_presence3, _this$_userGuide, _this$_settingsViewOp3, _this$_settingsViewOp4, _this$_settingsViewOp5, _this$_settingsViewOp6, _this$_settingsViewOp7, _this$_settingsViewOp8, _this$_settingsViewOp9, _this$_settingsViewOp0, _this$_integrationCon, _this$_settingsViewOp1, _this$_settingsViewOp10, _this$_settingsViewOp11, _this$_settingsViewOp12;
      var _ref$showCalling = _ref.showCalling,
        showCalling = _ref$showCalling === void 0 ? true : _ref$showCalling,
        _ref$showAudio = _ref.showAudio,
        showAudio = _ref$showAudio === void 0 ? true : _ref$showAudio,
        _ref$showFeedback = _ref.showFeedback,
        showFeedback = _ref$showFeedback === void 0 ? (_this$_settingsViewOp = (_this$_settingsViewOp2 = this._settingsViewOptions) === null || _this$_settingsViewOp2 === void 0 ? void 0 : _this$_settingsViewOp2.showFeedback) !== null && _this$_settingsViewOp !== void 0 ? _this$_settingsViewOp : true : _ref$showFeedback,
        _ref$showUserGuide = _ref.showUserGuide,
        showUserGuide = _ref$showUserGuide === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' ?
        // TODO: welcome page not include in this stage, but in test env we already have that test to check all exist case of welcome page can be passed to reduce wrong update in the future
        process.env.NODE_ENV === 'test' ? true : false : true : _ref$showUserGuide,
        _ref$showPresenceSett = _ref.showPresenceSettings,
        showPresenceSettings = _ref$showPresenceSett === void 0 ? true : _ref$showPresenceSett,
        _ref$showQuickAccess = _ref.showQuickAccess,
        showQuickAccess = _ref$showQuickAccess === void 0 ? false : _ref$showQuickAccess,
        params = _ref.params;
      var loggedIn = this._auth.loggedIn;
      return _objectSpread({
        version: this._version,
        loginNumber: this.loginNumber,
        showFeedback: showFeedback,
        showQuickAccess: showQuickAccess,
        showSpinner: !(this._accountInfo.ready && this._auth.ready && loggedIn && this._extensionInfo.ready && this._locale.ready && this._regionSettings.ready && (!this._callingSettings || this._callingSettings.ready) && this._appFeatures.ready && (!this._presence || this._presence.ready)),
        showCalling: showCalling && this._callingSettings && this._appFeatures.isCallingEnabled,
        showAudio: showAudio && this._appFeatures.isCallingEnabled,
        showRegion: loggedIn && this._regionSettings.showRegionSettings && this._appFeatures.isCallingEnabled,
        currentLocale: this._locale.currentLocale,
        eulaLabel: this._brand.brandConfig.eulaLabel,
        eulaLink: this._brand.brandConfig.eulaLink,
        outboundSMS: this._appFeatures.hasComposeTextPermission,
        isCallQueueMember: this._extensionInfo.isCallQueueMember,
        dndStatus: (_this$_presence = this._presence) === null || _this$_presence === void 0 ? void 0 : _this$_presence.dndStatus,
        userStatus:
        // TODO: spring-ui use presenceStatus as the user status, because presenceStatus will group the user status and telephony status, that be real user status(in meeting also will be busy)
        (process.env.THEME_SYSTEM === 'spring-ui' ? (_this$_presence2 = this._presence) === null || _this$_presence2 === void 0 ? void 0 : _this$_presence2.presenceStatus : (_this$_presence3 = this._presence) === null || _this$_presence3 === void 0 ? void 0 : _this$_presence3.userStatus) || undefined,
        openPresenceSettings: !!(this._presence && params && params.showPresenceSettings),
        showPresenceSettings:
        // https://jira_domain/browse/RCINT-43739
        // TODO: currently we only show the presence settings when has edit permission, but that may consider about the user which only has the read permission also should show but not allow to edit
        showPresenceSettings && this._appFeatures.hasEditPresenceStatus,
        showUserGuide: showUserGuide && !!((_this$_userGuide = this._userGuide) === null || _this$_userGuide === void 0 ? void 0 : _this$_userGuide.hasPermission),
        brandConfig: this._brand.brandConfig,
        showRemoveMeetingWarning: !!((_this$_settingsViewOp3 = this._settingsViewOptions) === null || _this$_settingsViewOp3 === void 0 ? void 0 : _this$_settingsViewOp3.showRemoveMeetingWarning),
        showTrackingIssue: true,
        showMatchesToggle: (_this$_settingsViewOp4 = this._settingsViewOptions) === null || _this$_settingsViewOp4 === void 0 ? void 0 : _this$_settingsViewOp4.showMatchesToggle,
        showPopUpForInboundCall: this._appFeatures.isCallingEnabled && ((_this$_settingsViewOp5 = this._settingsViewOptions) === null || _this$_settingsViewOp5 === void 0 ? void 0 : _this$_settingsViewOp5.showPopUpForInboundCall),
        showMatches: !!((_this$_settingsViewOp6 = this._settingsViewOptions) === null || _this$_settingsViewOp6 === void 0 ? void 0 : _this$_settingsViewOp6.showMatches),
        autoLogSMSEnabled: !!((_this$_settingsViewOp7 = this._settingsViewOptions) === null || _this$_settingsViewOp7 === void 0 ? void 0 : _this$_settingsViewOp7.autoLogSMSEnabled),
        showThemeSwitch: this._theme.supportedThemeTypes && this._theme.supportedThemeTypes.length > 1,
        autoLogSMSTitle: (_this$_settingsViewOp8 = this._settingsViewOptions) === null || _this$_settingsViewOp8 === void 0 ? void 0 : _this$_settingsViewOp8.autoLogSMSTitle,
        enableAcceptQueueCallsControl: this._appFeatures.enableAcceptQueueCallsControl,
        versionContainer: (_this$_settingsViewOp9 = this._settingsViewOptions) === null || _this$_settingsViewOp9 === void 0 ? void 0 : _this$_settingsViewOp9.versionContainer,
        autoLogTextUpdating: this.autoLogTextUpdating,
        isLogRefreshing: (_this$_settingsViewOp0 = this._settingsViewOptions) === null || _this$_settingsViewOp0 === void 0 ? void 0 : _this$_settingsViewOp0.isLogRefreshing
      }, process.env.THEME_SYSTEM === 'spring-ui' ? {
        crmService: (_this$_integrationCon = this._integrationConfig) === null || _this$_integrationCon === void 0 ? void 0 : _this$_integrationCon.name,
        popUpAppForInboundCall: (_this$_settingsViewOp1 = (_this$_settingsViewOp10 = this._settingsViewOptions) === null || _this$_settingsViewOp10 === void 0 ? void 0 : _this$_settingsViewOp10.popUpAppForInboundCall) !== null && _this$_settingsViewOp1 !== void 0 ? _this$_settingsViewOp1 : this.popUpAppForInboundCall,
        customRenderInfo: (_this$_settingsViewOp11 = this._settingsViewOptions) === null || _this$_settingsViewOp11 === void 0 ? void 0 : _this$_settingsViewOp11.customRenderInfo,
        showAutoLogSMS: !!((_this$_settingsViewOp12 = this._settingsViewOptions) === null || _this$_settingsViewOp12 === void 0 ? void 0 : _this$_settingsViewOp12.showAutoLogSMS)
      } : undefined);
    }
  }, {
    key: "_navigateTo",
    value: function _navigateTo(url) {
      var _this2 = this;
      return (0, _views.slideInViewTransition)(function () {
        return _this2._router.push(url);
      }, this._theme.reducedMotion);
    }
  }, {
    key: "onAutoLogSMSChange",
    value: function () {
      var _onAutoLogSMSChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this$_settingsViewOp13, _this$_settingsViewOp14;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              this._setAutoLogTextUpdating(true);
              _context2.p = 1;
              _context2.n = 2;
              return (_this$_settingsViewOp13 = this._settingsViewOptions) === null || _this$_settingsViewOp13 === void 0 ? void 0 : (_this$_settingsViewOp14 = _this$_settingsViewOp13.onAutoLogSMSChange) === null || _this$_settingsViewOp14 === void 0 ? void 0 : _this$_settingsViewOp14.call(_this$_settingsViewOp13);
            case 2:
              _context2.p = 2;
              this._setAutoLogTextUpdating(false);
              return _context2.f(2);
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[1,, 2, 3]]);
      }));
      function onAutoLogSMSChange() {
        return _onAutoLogSMSChange.apply(this, arguments);
      }
      return onAutoLogSMSChange;
    }()
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this3 = this;
      var _ref2$regionSettingsU = _ref2.regionSettingsUrl,
        regionSettingsUrl = _ref2$regionSettingsU === void 0 ? DEFAULT_REGION_SETTINGS_URL : _ref2$regionSettingsU,
        _ref2$callingSettings = _ref2.callingSettingsUrl,
        callingSettingsUrl = _ref2$callingSettings === void 0 ? DEFAULT_CALLING_SETTINGS_URL : _ref2$callingSettings,
        _ref2$audioSettingsUr = _ref2.audioSettingsUrl,
        audioSettingsUrl = _ref2$audioSettingsUr === void 0 ? DEFAULT_AUDIO_SETTINGS_URL : _ref2$audioSettingsUr,
        _ref2$feedbackSetting = _ref2.feedbackSettingsUrl,
        feedbackSettingsUrl = _ref2$feedbackSetting === void 0 ? DEFAULT_FEEDBACK_SETTINGS_URL : _ref2$feedbackSetting,
        _ref2$autoCallLogSett = _ref2.autoCallLogSettingsUrl,
        autoCallLogSettingsUrl = _ref2$autoCallLogSett === void 0 ? DEFAULT_AUTO_LOG_SETTINGS_URL : _ref2$autoCallLogSett;
      return {
        onLogoutButtonClick: function () {
          var _onLogoutButtonClick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  _context3.n = 1;
                  return _this3._auth.logout({
                    reason: 'Manually sign out'
                  });
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          function onLogoutButtonClick() {
            return _onLogoutButtonClick.apply(this, arguments);
          }
          return onLogoutButtonClick;
        }(),
        onRegionSettingsLinkClick: function onRegionSettingsLinkClick() {
          _this3._navigateTo(regionSettingsUrl);
        },
        onCallingSettingsLinkClick: function onCallingSettingsLinkClick() {
          _this3._navigateTo(callingSettingsUrl);
        },
        onAutoCallLogSettingLinkClick: function onAutoCallLogSettingLinkClick() {
          _this3._navigateTo(autoCallLogSettingsUrl);
        },
        onAudioSettingsLinkClick: function onAudioSettingsLinkClick() {
          _this3._navigateTo(audioSettingsUrl);
        },
        onFeedbackSettingsLinkClick: function onFeedbackSettingsLinkClick() {
          var _this3$_settingsViewO;
          if ((_this3$_settingsViewO = _this3._settingsViewOptions) === null || _this3$_settingsViewO === void 0 ? void 0 : _this3$_settingsViewO.onFeedBackSettingsLink) {
            _this3._settingsViewOptions.onFeedBackSettingsLink();
          } else {
            _this3._navigateTo(feedbackSettingsUrl);
          }
          _this3.trackOnFeedbackClick();
        },
        onUserGuideClick: function onUserGuideClick() {
          var _this3$_userGuide;
          if (process.env.THEME_SYSTEM === 'spring-ui' && _this3.welcomeView) {
            _this3.welcomeView.start(_this3._router.currentPath);
            return;
          }
          (_this3$_userGuide = _this3._userGuide) === null || _this3$_userGuide === void 0 ? void 0 : _this3$_userGuide.start();
        },
        onTrackingClick: function onTrackingClick() {
          _this3._navigateTo(DEFAULT_ISSUE_TACKING_SETTINGS_URL);
        },
        onQuickAccessLinkClick: function onQuickAccessLinkClick() {
          var _this3$_quickAccess;
          (_this3$_quickAccess = _this3._quickAccess) === null || _this3$_quickAccess === void 0 ? void 0 : _this3$_quickAccess.enter();
        },
        setAvailable: function setAvailable() {
          var _this3$_presence;
          return (_this3$_presence = _this3._presence) === null || _this3$_presence === void 0 ? void 0 : _this3$_presence.setAvailable();
        },
        setBusy: function setBusy() {
          var _this3$_presence2;
          return (_this3$_presence2 = _this3._presence) === null || _this3$_presence2 === void 0 ? void 0 : _this3$_presence2.setBusy();
        },
        setDoNotDisturb: function setDoNotDisturb() {
          var _this3$_presence3;
          return (_this3$_presence3 = _this3._presence) === null || _this3$_presence3 === void 0 ? void 0 : _this3$_presence3.setDoNotDisturb();
        },
        setInvisible: function setInvisible() {
          var _this3$_presence4;
          return (_this3$_presence4 = _this3._presence) === null || _this3$_presence4 === void 0 ? void 0 : _this3$_presence4.setInvisible();
        },
        toggleAcceptCallQueueCalls: function toggleAcceptCallQueueCalls() {
          var _this3$_presence5;
          return (_this3$_presence5 = _this3._presence) === null || _this3$_presence5 === void 0 ? void 0 : _this3$_presence5.toggleAcceptCallQueueCalls();
        },
        onToggleShowMatches: function onToggleShowMatches() {
          var _this3$_settingsViewO2, _this3$_settingsViewO3;
          return (_this3$_settingsViewO2 = _this3._settingsViewOptions) === null || _this3$_settingsViewO2 === void 0 ? void 0 : (_this3$_settingsViewO3 = _this3$_settingsViewO2.onToggleShowMatches) === null || _this3$_settingsViewO3 === void 0 ? void 0 : _this3$_settingsViewO3.call(_this3$_settingsViewO2);
        },
        onTogglePopUpAppForInboundCall: function onTogglePopUpAppForInboundCall(checked) {
          var _this3$_settingsViewO4, _this3$_settingsViewO5;
          (_this3$_settingsViewO4 = _this3._settingsViewOptions) === null || _this3$_settingsViewO4 === void 0 ? void 0 : (_this3$_settingsViewO5 = _this3$_settingsViewO4.onTogglePopUpAppForInboundCall) === null || _this3$_settingsViewO5 === void 0 ? void 0 : _this3$_settingsViewO5.call(_this3$_settingsViewO4, checked);
          _this3.togglePopUpAppForInboundCall();
        },
        onAutoLogSMSChange: this.onAutoLogSMSChange.bind(this),
        onThemeSwitchClick: function onThemeSwitchClick() {
          _this3._navigateTo(DEFAULT_THEME_SWITCH_URL);
        },
        onCallQueueManagementClick: this._callQueueManagementView.enableCallQueueManagement ? function () {
          _this3._navigateTo(DEFAULT_CALL_QUEUE_MANAGEMENT_URL);
        } : undefined
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this,
        _this$_settingsViewOp16;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var _this4$_settingsViewO, _this4$_settingsViewO2, _this4$_settingsViewO3;
        var uiProps = _this4.getUIProps(props);
        return _objectSpread(_objectSpread(_objectSpread({}, props), uiProps), process.env.THEME_SYSTEM === 'spring-ui' ? {
          additional: (_this4$_settingsViewO = _this4._settingsViewOptions) === null || _this4$_settingsViewO === void 0 ? void 0 : _this4$_settingsViewO.additional,
          additionalLogItems: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null,
          // when have inject the AutoCallLoggingSwitchView, it will be show the AutoCallLoggingSwitchView in the SettingsView
          _this4._autoCallLoggingSwitchView ? /*#__PURE__*/_react["default"].createElement(_this4._autoCallLoggingSwitchView.component, null) : null, (_this4$_settingsViewO2 = _this4._settingsViewOptions) === null || _this4$_settingsViewO2 === void 0 ? void 0 : _this4$_settingsViewO2.additionalLogItems),
          additionalAnalytics: (_this4$_settingsViewO3 = _this4._settingsViewOptions) === null || _this4$_settingsViewO3 === void 0 ? void 0 : _this4$_settingsViewO3.additionalAnalytics
        } : undefined);
      });
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        var _this$_settingsViewOp15;
        // use connector to ensure the update functions are updated
        var connectorUpdateFunctions = (0, _nextCore.useConnector)(function () {
          var _this4$_settingsViewO4;
          return {
            onRefreshLog: (_this4$_settingsViewO4 = _this4._settingsViewOptions) === null || _this4$_settingsViewO4 === void 0 ? void 0 : _this4$_settingsViewO4.onRefreshLog
          };
        });
        var _Component = ((_this$_settingsViewOp15 = this._settingsViewOptions) === null || _this$_settingsViewOp15 === void 0 ? void 0 : _this$_settingsViewOp15.component) || _SettingsPanel2.SettingsPanel;
        return /*#__PURE__*/_react["default"].createElement(_Component, _extends({}, _props, uiFunctions, connectorUpdateFunctions));
      }
      var Component = ((_this$_settingsViewOp16 = this._settingsViewOptions) === null || _this$_settingsViewOp16 === void 0 ? void 0 : _this$_settingsViewOp16.component) || _SettingsPanel.SettingsPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "welcomeView", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_autoCallLoggingSwitchView", [_dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_integrationConfig", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "autoLogTextUpdating", [_nextCore.state, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setAutoLogTextUpdating", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAutoLogTextUpdating"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_callingSettings", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "loginNumber", [_nextCore.computed, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "loginNumber"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "popUpAppForInboundCall", [_nextCore.userStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_togglePopUpAppForInboundCall", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_togglePopUpAppForInboundCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "togglePopUpAppForInboundCall", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "togglePopUpAppForInboundCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackOnFeedbackClick", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "trackOnFeedbackClick"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onAutoLogSMSChange", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "onAutoLogSMSChange"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Settings.view.js.map
