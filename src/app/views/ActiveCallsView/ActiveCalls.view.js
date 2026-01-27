"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallsView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _views = require("@ringcentral-integration/micro-contacts/src/app/views");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _views2 = require("@ringcentral-integration/micro-core/src/app/views");
var _services4 = require("@ringcentral-integration/micro-message/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ActiveCallsPanel = require("@ringcentral-integration/widgets/components/ActiveCallsPanel");
var _react = _interopRequireWildcard(require("react"));
var _services5 = require("../../services");
var _webphoneHelper = require("../../services/Webphone/webphoneHelper");
var _MergeCallConfirmView = require("../MergeCallConfirmView");
var _SwitchCallConfirmView = require("../SwitchCallConfirmView");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _class;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ActiveCallsView = exports.ActiveCallsView = (_dec = (0, _nextCore.injectable)({
  name: 'ActiveCallsView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 16);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 17);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 18);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 19);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 20);
}, _dec7 = function _dec7(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 21);
}, _dec8 = function _dec8(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 22);
}, _dec9 = function _dec9(target, key) {
  return (0, _nextCore.optional)('ActiveCallsViewOptions')(target, undefined, 23);
}, _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services5.CallMonitor === "undefined" ? Object : _services5.CallMonitor, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _services5.CallingSettings === "undefined" ? Object : _services5.CallingSettings, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _views2.ModalView === "undefined" ? Object : _views2.ModalView, typeof _services5.Webphone === "undefined" ? Object : _services5.Webphone, typeof _services5.CallLogger === "undefined" ? Object : _services5.CallLogger, typeof _services4.ComposeText === "undefined" ? Object : _services4.ComposeText, typeof _MergeCallConfirmView.MergeCallConfirmView === "undefined" ? Object : _MergeCallConfirmView.MergeCallConfirmView, typeof _SwitchCallConfirmView.SwitchCallConfirmView === "undefined" ? Object : _SwitchCallConfirmView.SwitchCallConfirmView, typeof _views.ContactDetailsView === "undefined" ? Object : _views.ContactDetailsView, typeof _services5.ActiveCallControl === "undefined" ? Object : _services5.ActiveCallControl, typeof ActiveCallsViewOptions === "undefined" ? Object : ActiveCallsViewOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = _dec0(_class = _dec1(_class = /*#__PURE__*/function (_RcViewModule) {
  function ActiveCallsView(_brand, _locale, _callMonitor, _rateLimiter, _contactSearch, _regionSettings, _contactMatcher, _callingSettings, _router, _appFeatures, _connectivityMonitor, _connectivityManager, _accountInfo, _extensionInfo, _portManager, _modalView, _webphone, _callLogger, _composeText, _mergeCallConfirmView, _switchCallConfirmView, _contactDetailsView, _activeCallControl, _activeCallsViewOptions) {
    var _this;
    _classCallCheck(this, ActiveCallsView);
    _this = _callSuper(this, ActiveCallsView);
    _this._brand = _brand;
    _this._locale = _locale;
    _this._callMonitor = _callMonitor;
    _this._rateLimiter = _rateLimiter;
    _this._contactSearch = _contactSearch;
    _this._regionSettings = _regionSettings;
    _this._contactMatcher = _contactMatcher;
    _this._callingSettings = _callingSettings;
    _this._router = _router;
    _this._appFeatures = _appFeatures;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._connectivityManager = _connectivityManager;
    _this._accountInfo = _accountInfo;
    _this._extensionInfo = _extensionInfo;
    _this._portManager = _portManager;
    _this._modalView = _modalView;
    _this._webphone = _webphone;
    _this._callLogger = _callLogger;
    _this._composeText = _composeText;
    _this._mergeCallConfirmView = _mergeCallConfirmView;
    _this._switchCallConfirmView = _switchCallConfirmView;
    _this._contactDetailsView = _contactDetailsView;
    _this._activeCallControl = _activeCallControl;
    _this._activeCallsViewOptions = _activeCallsViewOptions;
    _this._defaultOnViewContact = function (options) {
      var _this$_contactDetails;
      var _options$contact = options.contact,
        id = _options$contact.id,
        type = _options$contact.type;
      (_this$_contactDetails = _this._contactDetailsView) === null || _this$_contactDetails === void 0 ? void 0 : _this$_contactDetails.showContactDetails({
        type: type,
        id: id,
        direct: true
      });
    };
    _this._defaultOnLogCall = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var _this$_callLogger;
        var call, contact, _ref$redirect, redirect;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              call = _ref.call, contact = _ref.contact, _ref$redirect = _ref.redirect, redirect = _ref$redirect === void 0 ? true : _ref$redirect;
              _context.n = 1;
              return (_this$_callLogger = _this._callLogger) === null || _this$_callLogger === void 0 ? void 0 : _this$_callLogger.logCall({
                call: call,
                contact: contact,
                redirect: redirect
              });
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    _this._defaultOnCallsEmpty = function () {
      var _this$_webphone;
      var isWebRTC = _this._callingSettings.callingMode === _services5.callingModes.webphone;
      if (isWebRTC && !((_this$_webphone = _this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.sessions.length)) {
        _this._router.push('/dialer');
      }
    };
    return _this;
  }
  _inherits(ActiveCallsView, _RcViewModule);
  return _createClass(ActiveCallsView, [{
    key: "isWide",
    get: function get() {
      var _this$_activeCallsVie, _this$_activeCallsVie2;
      return (_this$_activeCallsVie = (_this$_activeCallsVie2 = this._activeCallsViewOptions) === null || _this$_activeCallsVie2 === void 0 ? void 0 : _this$_activeCallsVie2.isWide) !== null && _this$_activeCallsVie !== void 0 ? _this$_activeCallsVie : true;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref3) {
      var _this$_activeCallCont, _this$_callLogger2;
      var _ref3$showContactDisp = _ref3.showContactDisplayPlaceholder,
        showContactDisplayPlaceholder = _ref3$showContactDisp === void 0 ? false : _ref3$showContactDisp,
        _ref3$showRingoutCall = _ref3.showRingoutCallControl,
        showRingoutCallControl = _ref3$showRingoutCall === void 0 ? false : _ref3$showRingoutCall,
        _ref3$showSwitchCall = _ref3.showSwitchCall,
        showSwitchCall = _ref3$showSwitchCall === void 0 ? false : _ref3$showSwitchCall,
        _ref3$showTransferCal = _ref3.showTransferCall,
        showTransferCall = _ref3$showTransferCal === void 0 ? true : _ref3$showTransferCal,
        _ref3$showHoldOnOther = _ref3.showHoldOnOtherDevice,
        showHoldOnOtherDevice = _ref3$showHoldOnOther === void 0 ? false : _ref3$showHoldOnOther,
        useV2 = _ref3.useV2,
        useCallControl = _ref3.useCallControl,
        showMergeCall = _ref3.showMergeCall;
      var isWebRTC = this._callingSettings.callingMode === _services5.callingModes.webphone;
      var controlBusy = ((_this$_activeCallCont = this._activeCallControl) === null || _this$_activeCallCont === void 0 ? void 0 : _this$_activeCallCont.busy) || false;
      return {
        currentLocale: this._locale.currentLocale,
        activeRingCalls: this._callMonitor.activeRingCalls,
        activeOnHoldCalls: this._callMonitor.activeOnHoldCalls,
        activeCurrentCalls: this._callMonitor.activeCurrentCalls,
        otherDeviceCalls: this._callMonitor.otherDeviceCalls,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        outboundSmsPermission: this._appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._appFeatures.hasInternalSMSPermission,
        showSpinner: false,
        brand: this._brand.name,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        showRingoutCallControl: showRingoutCallControl,
        showTransferCall: showTransferCall,
        showMergeCall: showMergeCall,
        showHoldOnOtherDevice: showHoldOnOtherDevice,
        showSwitchCall: !!(showSwitchCall && isWebRTC && !this._connectivityManager.webphoneUnavailable),
        autoLog: !!((_this$_callLogger2 = this._callLogger) === null || _this$_callLogger2 === void 0 ? void 0 : _this$_callLogger2.autoLog),
        isWebRTC: isWebRTC,
        conferenceCallParties: [],
        useV2: !!useV2,
        disableLinks: !this._connectivityMonitor.connectivity || this._rateLimiter.restricted || controlBusy,
        useCallControl: !!useCallControl,
        isWide: this.isWide,
        allCalls: this._callMonitor.allCalls
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref4) {
      var _this2 = this;
      var _ref4$composeTextRout = _ref4.composeTextRoute,
        composeTextRoute = _ref4$composeTextRout === void 0 ? '/composeText' : _ref4$composeTextRout,
        _ref4$callCtrlRoute = _ref4.callCtrlRoute,
        callCtrlRoute = _ref4$callCtrlRoute === void 0 ? '/calls/active' : _ref4$callCtrlRoute,
        onCreateContact = _ref4.onCreateContact,
        _ref4$onLogCall = _ref4.onLogCall,
        onLogCall = _ref4$onLogCall === void 0 ? this._defaultOnLogCall : _ref4$onLogCall,
        isLoggedContact = _ref4.isLoggedContact,
        _ref4$onCallsEmpty = _ref4.onCallsEmpty,
        onCallsEmpty = _ref4$onCallsEmpty === void 0 ? this._defaultOnCallsEmpty : _ref4$onCallsEmpty,
        _ref4$onViewContact = _ref4.onViewContact,
        _onViewContact = _ref4$onViewContact === void 0 ? this._defaultOnViewContact : _ref4$onViewContact,
        _ref4$showViewContact = _ref4.showViewContact,
        showViewContact = _ref4$showViewContact === void 0 ? true : _ref4$showViewContact,
        getAvatarUrl = _ref4.getAvatarUrl,
        useV2 = _ref4.useV2,
        useCallControl = _ref4.useCallControl;
      // Toggle to control if use new call control API, should using the ActiveCallControl module same time,
      // when you set this toggle to true (https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession)
      var useActiveCallControl = !!(useCallControl && this._activeCallControl);
      return {
        onSwitchCall: function onSwitchCall(call) {
          var _this2$_switchCallCon, _this2$_switchCallCon2;
          (_this2$_switchCallCon = _this2._switchCallConfirmView) === null || _this2$_switchCallCon === void 0 ? void 0 : _this2$_switchCallCon.setIsWide(_this2.isWide);
          (_this2$_switchCallCon2 = _this2._switchCallConfirmView) === null || _this2$_switchCallCon2 === void 0 ? void 0 : _this2$_switchCallCon2.open(call);
        },
        formatPhone: function formatPhone(phoneNumber) {
          var _this2$_extensionInfo;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            maxExtensionLength: _this2._accountInfo.maxExtensionNumberLength,
            siteCode: (_this2$_extensionInfo = _this2._extensionInfo.site) === null || _this2$_extensionInfo === void 0 ? void 0 : _this2$_extensionInfo.code,
            isMultipleSiteEnabled: _this2._extensionInfo.isMultipleSiteEnabled
          });
        },
        onMergeCall: function () {
          var _onMergeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(webphoneSessionId, telephonySessionId) {
            var _this2$_activeCallCon, _this2$_callMonitor$a, _this2$_mergeCallConf, telephonySessionIdToMergeWith, confirmed, _this2$_activeCallCon2;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  if (!useActiveCallControl) {
                    _context2.n = 3;
                    break;
                  }
                  (_this2$_activeCallCon = _this2._activeCallControl) === null || _this2$_activeCallCon === void 0 ? void 0 : _this2$_activeCallCon.clickConferenceCallMerge('All calls page');
                  telephonySessionIdToMergeWith = (_this2$_callMonitor$a = _this2._callMonitor.activeCurrentCalls[0]) === null || _this2$_callMonitor$a === void 0 ? void 0 : _this2$_callMonitor$a.telephonySessionId;
                  if (telephonySessionIdToMergeWith) {
                    _context2.n = 1;
                    break;
                  }
                  console.warn('[ActiveCalls.view] No active call to merge.');
                  return _context2.a(2);
                case 1:
                  _context2.n = 2;
                  return (_this2$_mergeCallConf = _this2._mergeCallConfirmView) === null || _this2$_mergeCallConf === void 0 ? void 0 : _this2$_mergeCallConf.confirm({
                    telephonySessionId: telephonySessionId
                    // telephonySessionIdToMergeWith
                  });
                case 2:
                  confirmed = _context2.v;
                  if (confirmed) {
                    (_this2$_activeCallCon2 = _this2._activeCallControl) === null || _this2$_activeCallCon2 === void 0 ? void 0 : _this2$_activeCallCon2.mergeCalls(telephonySessionId, telephonySessionIdToMergeWith);
                  }
                case 3:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          function onMergeCall(_x2, _x3) {
            return _onMergeCall.apply(this, arguments);
          }
          return onMergeCall;
        }(),
        webphoneAnswer: function () {
          var _webphoneAnswer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(sessionId, telephonySessionId) {
            var isHoldAndAnswer,
              session,
              _args3 = arguments;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  isHoldAndAnswer = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;
                  if (!(useActiveCallControl && _this2._activeCallControl)) {
                    _context3.n = 1;
                    break;
                  }
                  isHoldAndAnswer && _this2._activeCallControl.answerAndHold ? _this2._activeCallControl.answerAndHold(telephonySessionId) : _this2._activeCallControl.answer(telephonySessionId);
                  _context3.n = 3;
                  break;
                case 1:
                  if (_this2._webphone) {
                    _context3.n = 2;
                    break;
                  }
                  return _context3.a(2);
                case 2:
                  session = _this2._webphone.sessions.find(function (session) {
                    return session.id === sessionId;
                  });
                  _this2._webphone.answer(sessionId);
                case 3:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          function webphoneAnswer(_x4, _x5) {
            return _webphoneAnswer.apply(this, arguments);
          }
          return webphoneAnswer;
        }(),
        webphoneToVoicemail: function webphoneToVoicemail(sessionId, telephonySessionId) {
          if (useActiveCallControl) {
            return _this2._activeCallControl.reject(telephonySessionId);
          }
          return _this2._webphone.toVoiceMail(sessionId);
        },
        webphoneReject: function webphoneReject(sessionId) {
          return _this2._webphone.reject(sessionId);
        },
        webphoneHangup: function webphoneHangup(sessionId, telephonySessionId) {
          var _this2$_webphone;
          // user action track
          _this2._callMonitor.allCallsClickHangupTrack();
          if (useActiveCallControl) {
            return _this2._activeCallControl.hangUp(telephonySessionId);
          }
          return (_this2$_webphone = _this2._webphone) === null || _this2$_webphone === void 0 ? void 0 : _this2$_webphone.hangup(sessionId);
        },
        webphoneResume: function () {
          var _webphoneResume = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(sessionId, telephonySessionId) {
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  if (!useActiveCallControl) {
                    _context4.n = 1;
                    break;
                  }
                  return _context4.a(2, _this2._activeCallControl.unhold(telephonySessionId));
                case 1:
                  if (_this2._webphone) {
                    _context4.n = 2;
                    break;
                  }
                  return _context4.a(2);
                case 2:
                  _context4.n = 3;
                  return _this2._webphone.resume(sessionId);
                case 3:
                  if (_this2._router.currentPath !== callCtrlRoute && !useV2) {
                    _this2._router.push(callCtrlRoute);
                  }
                case 4:
                  return _context4.a(2);
              }
            }, _callee4);
          }));
          function webphoneResume(_x6, _x7) {
            return _webphoneResume.apply(this, arguments);
          }
          return webphoneResume;
        }(),
        webphoneHold: function webphoneHold(sessionId, telephonySessionId) {
          var _this2$_webphone2;
          // user action track
          _this2._callMonitor.allCallsClickHoldTrack();
          if (useActiveCallControl) {
            return _this2._activeCallControl.hold(telephonySessionId);
          }
          return (_this2$_webphone2 = _this2._webphone) === null || _this2$_webphone2 === void 0 ? void 0 : _this2$_webphone2.hold(sessionId);
        },
        webphoneSwitchCall: function () {
          var _webphoneSwitchCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(activeCall) {
            var session;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  if (!useActiveCallControl) {
                    _context5.n = 1;
                    break;
                  }
                  return _context5.a(2, _this2._activeCallControl["switch"](activeCall.telephonySessionId));
                case 1:
                  if (_this2._webphone) {
                    _context5.n = 2;
                    break;
                  }
                  return _context5.a(2);
                case 2:
                  _context5.n = 3;
                  return _this2._webphone.switchCall(activeCall, _this2._regionSettings.homeCountryId);
                case 3:
                  session = _context5.v;
                  return _context5.a(2, session);
              }
            }, _callee5);
          }));
          function webphoneSwitchCall(_x8) {
            return _webphoneSwitchCall.apply(this, arguments);
          }
          return webphoneSwitchCall;
        }(),
        webphoneIgnore: function webphoneIgnore(telephonySessionId) {
          var _this2$_activeCallCon3;
          return (_this2$_activeCallCon3 = _this2._activeCallControl) === null || _this2$_activeCallCon3 === void 0 ? void 0 : _this2$_activeCallCon3.ignore(telephonySessionId);
        },
        ringoutHangup: function () {
          var _ringoutHangup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
            var _this2$_activeCallCon4;
            var _len,
              args,
              _key,
              _args6 = arguments;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  // user action track
                  _this2._callMonitor.allCallsClickHangupTrack();
                  for (_len = _args6.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = _args6[_key];
                  }
                  return _context6.a(2, (_this2$_activeCallCon4 = _this2._activeCallControl) === null || _this2$_activeCallCon4 === void 0 ? void 0 : _this2$_activeCallCon4.hangUp.apply(_this2$_activeCallCon4, args));
              }
            }, _callee6);
          }));
          function ringoutHangup() {
            return _ringoutHangup.apply(this, arguments);
          }
          return ringoutHangup;
        }(),
        ringoutTransfer: function ringoutTransfer(sessionId) {
          _this2._router.push("/transfer/".concat(sessionId, "/active"));
        },
        ringoutReject: function () {
          var _ringoutReject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(sessionId) {
            var _this2$_activeCallCon5;
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  // user action track
                  _this2._callMonitor.allCallsClickRejectTrack();
                  return _context7.a(2, (_this2$_activeCallCon5 = _this2._activeCallControl) === null || _this2$_activeCallCon5 === void 0 ? void 0 : _this2$_activeCallCon5.reject(sessionId));
              }
            }, _callee7);
          }));
          function ringoutReject(_x9) {
            return _ringoutReject.apply(this, arguments);
          }
          return ringoutReject;
        }(),
        onViewContact: function onViewContact(options) {
          if (!showViewContact) return;
          _onViewContact(options);
        },
        onClickToSms: this._composeText ? (/*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(contact) {
            var isDummyContact,
              _ref6,
              name,
              _args8 = arguments;
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  isDummyContact = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : false;
                  if (_this2._router) {
                    _this2._router.push(composeTextRoute);
                  }
                  if (_this2._composeText) {
                    _context8.n = 1;
                    break;
                  }
                  return _context8.a(2);
                case 1:
                  _this2._composeText.clean();
                  _ref6 = contact, name = _ref6.name;
                  if (name && contact.phoneNumber && isDummyContact) {
                    _this2._composeText.updateTypingToNumber(name);
                    _this2._contactSearch.search({
                      searchString: name
                    });
                  } else {
                    _this2._composeText.addToRecipients(contact);
                  }
                case 2:
                  return _context8.a(2);
              }
            }, _callee8);
          }));
          return function (_x0) {
            return _ref5.apply(this, arguments);
          };
        }()) : undefined,
        onCreateContact: onCreateContact ? (/*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(_ref7) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return _regenerator().w(function (_context9) {
              while (1) switch (_context9.n) {
                case 0:
                  phoneNumber = _ref7.phoneNumber, name = _ref7.name, entityType = _ref7.entityType;
                  _context9.n = 1;
                  return _this2._contactMatcher.hasMatchNumber({
                    phoneNumber: phoneNumber,
                    ignoreCache: true
                  });
                case 1:
                  hasMatchNumber = _context9.v;
                  if (hasMatchNumber) {
                    _context9.n = 3;
                    break;
                  }
                  _context9.n = 2;
                  return onCreateContact({
                    phoneNumber: phoneNumber,
                    name: name,
                    entityType: entityType
                  });
                case 2:
                  _context9.n = 3;
                  return _this2._contactMatcher.forceMatchNumber({
                    phoneNumber: phoneNumber
                  });
                case 3:
                  return _context9.a(2);
              }
            }, _callee9);
          }));
          return function (_x1) {
            return _ref8.apply(this, arguments);
          };
        }()) : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall,
        onCallsEmpty: onCallsEmpty,
        isSessionAConferenceCall: function isSessionAConferenceCall(sessionId) {
          return false;
        },
        onCallItemClick: function onCallItemClick(call) {
          if (!call.webphoneSession) {
            // For ringout call
            if ((0, _callLogHelpers.isRingingInboundCall)(call)) {
              return;
            }
            var telephonySessionId = call.telephonySessionId;
            // to track the call item be clicked.
            _this2._callMonitor.callItemClickTrack();
            _this2._router.push("/simplifycallctrl/".concat(telephonySessionId));
          } else {
            // For webphone call
            // show the ring call modal when click a ringing call.
            if ((0, _callLogHelpers.isRingingInboundCall)(call)) {
              var _this2$_webphone3;
              (_this2$_webphone3 = _this2._webphone) === null || _this2$_webphone3 === void 0 ? void 0 : _this2$_webphone3.toggleMinimized(call.webphoneSession.id);
              return;
            }
            if (call.webphoneSession && call.webphoneSession.id) {
              // to track the call item be clicked.
              _this2._callMonitor.callItemClickTrack();
              _this2._router.push("".concat(callCtrlRoute, "/").concat(call.webphoneSession.id));
            }
          }
        },
        getAvatarUrl: getAvatarUrl,
        updateSessionMatchedContact: function () {
          var _updateSessionMatchedContact = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(sessionId, contact) {
            var _this2$_webphone4;
            return _regenerator().w(function (_context0) {
              while (1) switch (_context0.n) {
                case 0:
                  _context0.n = 1;
                  return (_this2$_webphone4 = _this2._webphone) === null || _this2$_webphone4 === void 0 ? void 0 : _this2$_webphone4.updateSessionMatchedContact(sessionId, contact);
                case 1:
                  return _context0.a(2);
              }
            }, _callee0);
          }));
          function updateSessionMatchedContact(_x10, _x11) {
            return _updateSessionMatchedContact.apply(this, arguments);
          }
          return updateSessionMatchedContact;
        }(),
        // function to check if a call is on hold status
        isOnHold: function isOnHold(webphoneSession) {
          if (useActiveCallControl) {
            var call = _this2._callMonitor.allCalls.find(function (call) {
              return call.webphoneSession === webphoneSession;
            });
            if (call === null || call === void 0 ? void 0 : call.telephonySession) {
              return (0, _services5.isHolding)({
                status: call.telephonySession.status
              });
            }
            if (process.env.NODE_ENV !== 'production') {
              console.log('🚀 ~ call not found, should confirm what happened.');
            }
            return false;
          }
          return (0, _webphoneHelper.isOnHold)(webphoneSession);
        },
        clickSwitchTrack: function clickSwitchTrack() {
          var _this2$_activeCallCon6, _this2$_activeCallCon7;
          (_this2$_activeCallCon6 = _this2._activeCallControl) === null || _this2$_activeCallCon6 === void 0 ? void 0 : (_this2$_activeCallCon7 = _this2$_activeCallCon6.clickSwitchTrack) === null || _this2$_activeCallCon7 === void 0 ? void 0 : _this2$_activeCallCon7.call(_this2$_activeCallCon6);
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_activeCallsVie3;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;

      // TODO: fix type
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_activeCallsVie3 = this._activeCallsViewOptions) === null || _this$_activeCallsVie3 === void 0 ? void 0 : _this$_activeCallsVie3.component) || _ActiveCallsPanel.ActiveCallsPanel;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions)));
    }
  }]);
}(_nextCore.RcViewModule)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ActiveCalls.view.js.map
