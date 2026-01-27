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
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
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
exports.CallControlView = void 0;
exports.getLastCallInfoFromWebphoneSession = getLastCallInfoFromWebphoneSession;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _CallCtrlContainer = require("@ringcentral-integration/widgets/components/CallCtrlContainer");
var _callCtrlLayouts = require("@ringcentral-integration/widgets/enums/callCtrlLayouts");
var _checkShouldHidePhoneNumber = require("@ringcentral-integration/widgets/lib/checkShouldHidePhoneNumber");
var _ramda = require("ramda");
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function getLastCallInfoFromWebphoneSession(webphoneSession) {
  var sessionNumber = webphoneSession.direction === _callDirections["default"].outbound ? webphoneSession.to : webphoneSession.from;
  var sessionStatus = webphoneSession.callStatus;
  var matchedContact = webphoneSession.contactMatch;
  var calleeType = matchedContact ? _calleeTypes["default"].contacts : _calleeTypes["default"].unknown;
  return {
    calleeType: calleeType,
    avatarUrl: matchedContact && matchedContact.profileImageUrl,
    name: matchedContact && matchedContact.name,
    status: sessionStatus,
    phoneNumber: sessionNumber
  };
}
var CallControlView = exports.CallControlView = (_dec = (0, _nextCore.injectable)({
  name: 'CallControlView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 13);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 14);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('CallControlViewOptions')(target, undefined, 15);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services4.Webphone === "undefined" ? Object : _services4.Webphone, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof _services4.CallingSettings === "undefined" ? Object : _services4.CallingSettings, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _services4.ForwardingNumber === "undefined" ? Object : _services4.ForwardingNumber, typeof _services4.CallMonitor === "undefined" ? Object : _services4.CallMonitor, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services4.AudioSettings === "undefined" ? Object : _services4.AudioSettings, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof CallControlViewOptions === "undefined" ? Object : CallControlViewOptions]), _dec7 = (0, _nextCore.computed)(function (that) {
  return [that.currentSessionId, that._webphone.sessions, that._webphone.activeSession];
}), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec0 = (0, _nextCore.computed)(function (that) {
  var _that$_contactMatcher;
  return [(_that$_contactMatcher = that._contactMatcher) === null || _that$_contactMatcher === void 0 ? void 0 : _that$_contactMatcher.dataMapping, that.currentSession.from];
}), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = (0, _nextCore.computed)(function (that) {
  var _that$_contactMatcher2;
  return [(_that$_contactMatcher2 = that._contactMatcher) === null || _that$_contactMatcher2 === void 0 ? void 0 : _that$_contactMatcher2.dataMapping, that.currentSession.to];
}), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallControlView(_webphone, _locale, _contactMatcher, _regionSettings, _brand, _contactSearch, _callingSettings, _connectivityManager, _forwardingNumber, _callMonitor, _extensionInfo, _appFeatures, _accountInfo, _audioSettings,
  // TODO: why any?
  _router, _callControlViewOptions) {
    var _this;
    _classCallCheck(this, CallControlView);
    _this = _callSuper(this, CallControlView);
    _this._webphone = _webphone;
    _this._locale = _locale;
    _this._contactMatcher = _contactMatcher;
    _this._regionSettings = _regionSettings;
    _this._brand = _brand;
    _this._contactSearch = _contactSearch;
    _this._callingSettings = _callingSettings;
    _this._connectivityManager = _connectivityManager;
    _this._forwardingNumber = _forwardingNumber;
    _this._callMonitor = _callMonitor;
    _this._extensionInfo = _extensionInfo;
    _this._appFeatures = _appFeatures;
    _this._accountInfo = _accountInfo;
    _this._audioSettings = _audioSettings;
    _this._router = _router;
    _this._callControlViewOptions = _callControlViewOptions;
    _this.params = {};
    _this.currentSessionId = null;
    _this.getInitialLayout = function (_ref) {
      var conferenceCallEquipped = _ref.conferenceCallEquipped,
        isOnConference = _ref.isOnConference,
        lastCallInfo = _ref.lastCallInfo,
        session = _ref.session;
      var layout = _callCtrlLayouts.callCtrlLayouts.normalCtrl;
      if (session === null || session === void 0 ? void 0 : session.warmTransferSessionId) {
        return _callCtrlLayouts.callCtrlLayouts.completeTransferCtrl;
      }
      if (!conferenceCallEquipped) {
        return layout;
      }
      if (isOnConference) {
        return _callCtrlLayouts.callCtrlLayouts.conferenceCtrl;
      }
      return layout;
    };
    return _this;
  }
  _inherits(CallControlView, _RcViewModule);
  return _createClass(CallControlView, [{
    key: "currentSession",
    get: function get() {
      var _this2 = this;
      return (this.currentSessionId ? (0, _ramda.find)(function (session) {
        return session.id === _this2.currentSessionId;
      }, this._webphone.sessions) : this._webphone.activeSession) || {};
    }
  }, {
    key: "fromMatches",
    get: function get() {
      var _this$_contactMatcher, _this$_contactMatcher2, _this$_contactMatcher3;
      return (_this$_contactMatcher = (_this$_contactMatcher2 = this._contactMatcher) === null || _this$_contactMatcher2 === void 0 ? void 0 : (_this$_contactMatcher3 = _this$_contactMatcher2.dataMapping) === null || _this$_contactMatcher3 === void 0 ? void 0 : _this$_contactMatcher3[this.currentSession.from]) !== null && _this$_contactMatcher !== void 0 ? _this$_contactMatcher : [];
    }
  }, {
    key: "toMatches",
    get: function get() {
      var _this$_contactMatcher4, _this$_contactMatcher5, _this$_contactMatcher6;
      return (_this$_contactMatcher4 = (_this$_contactMatcher5 = this._contactMatcher) === null || _this$_contactMatcher5 === void 0 ? void 0 : (_this$_contactMatcher6 = _this$_contactMatcher5.dataMapping) === null || _this$_contactMatcher6 === void 0 ? void 0 : _this$_contactMatcher6[this.currentSession.to]) !== null && _this$_contactMatcher4 !== void 0 ? _this$_contactMatcher4 : [];
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this$params,
        _this3 = this,
        _this$_audioSettings$,
        _this$_audioSettings;
      var _ref2$showCallQueueNa = _ref2.showCallQueueName,
        showCallQueueName = _ref2$showCallQueueNa === void 0 ? false : _ref2$showCallQueueNa,
        _ref2$showPark = _ref2.showPark,
        showPark = _ref2$showPark === void 0 ? false : _ref2$showPark,
        children = _ref2.children;
      this.currentSessionId = ((_this$params = this.params) === null || _this$params === void 0 ? void 0 : _this$params.sessionId) || null;
      var nameMatches = this.currentSession.direction === _callDirections["default"].outbound ? this.toMatches : this.fromMatches;
      var isWebRTC = this._callingSettings.callingMode === _services4.callingModes.webphone;
      var isInboundCall = this.currentSession.direction === _callDirections["default"].inbound;
      var conferenceData = undefined;
      var isOnConference = false;
      var isMerging = false;
      var conferenceCallId = null;
      var isConferenceCallOverload = false;
      var conferenceCallParties = undefined;

      // TODO: investigate whether this can simply use isMerging
      var fromSessionId = undefined;
      var hideChildren = false;
      var lastCallInfo;
      if (this.currentSession.warmTransferSessionId) {
        var warmTransferSession = this._webphone.sessions.find(function (session) {
          return session.id === _this3.currentSession.warmTransferSessionId;
        });
        lastCallInfo = getLastCallInfoFromWebphoneSession(warmTransferSession);
      }
      var disableLinks = !!(this._connectivityManager.isOfflineMode || this._connectivityManager.isVoipOnlyMode);
      var phoneNumber = this.currentSession.direction === _callDirections["default"].outbound ? this.currentSession.to : this.currentSession.from;
      if (this._appFeatures.isCDCEnabled && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, nameMatches)) {
        phoneNumber = null;
      }
      return {
        brand: this._brand.name,
        callVolume: (_this$_audioSettings$ = (_this$_audioSettings = this._audioSettings) === null || _this$_audioSettings === void 0 ? void 0 : _this$_audioSettings.callVolume) !== null && _this$_audioSettings$ !== void 0 ? _this$_audioSettings$ : 1,
        nameMatches: nameMatches,
        phoneNumber: phoneNumber,
        currentLocale: this._locale.currentLocale,
        session: this.currentSession,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        showBackButton: true,
        // callMonitor.allCalls.length > 0,
        searchContactList: this._contactSearch.sortedResult,
        showSpinner: isMerging,
        conferenceCallEquipped: false,
        hasConferenceCall: false,
        conferenceCallParties: conferenceCallParties,
        conferenceCallId: conferenceCallId,
        lastCallInfo: lastCallInfo,
        // TODO: investigate whether it's better to just
        // use isMerging and let the component decide whether to display children
        children: hideChildren ? null : children,
        isOnConference: isOnConference,
        isWebRTC: isWebRTC,
        disableLinks: disableLinks,
        isConferenceCallOverload: isConferenceCallOverload,
        disableFlip: this._forwardingNumber.flipNumbers.length === 0,
        showCallQueueName: showCallQueueName,
        showPark: showPark,
        controlBusy: this.currentSession.callStatus === _services4.sessionStatus.setup
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this4 = this;
      var getAvatarUrl = _ref3.getAvatarUrl,
        onBackButtonClick = _ref3.onBackButtonClick,
        phoneTypeRenderer = _ref3.phoneTypeRenderer,
        phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer;
      return {
        getInitialLayout: this.getInitialLayout,
        formatPhone: function formatPhone(phoneNumber) {
          var _this4$_extensionInfo, _this4$_extensionInfo2, _this4$_extensionInfo3;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this4._regionSettings.areaCode,
            countryCode: _this4._regionSettings.countryCode,
            siteCode: (_this4$_extensionInfo = (_this4$_extensionInfo2 = _this4._extensionInfo) === null || _this4$_extensionInfo2 === void 0 ? void 0 : (_this4$_extensionInfo3 = _this4$_extensionInfo2.site) === null || _this4$_extensionInfo3 === void 0 ? void 0 : _this4$_extensionInfo3.code) !== null && _this4$_extensionInfo !== void 0 ? _this4$_extensionInfo : '',
            isMultipleSiteEnabled: _this4._extensionInfo.isMultipleSiteEnabled,
            maxExtensionLength: _this4._accountInfo.maxExtensionNumberLength,
            isEDPEnabled: _this4._appFeatures.isEDPEnabled
          });
        },
        onHangup: function onHangup(sessionId, layout) {
          _this4._webphone.hangup(sessionId);
          if (layout && layout === _callCtrlLayouts.callCtrlLayouts.mergeCtrl) {
            _this4._callMonitor.mergeControlClickHangupTrack();
          }
        },
        onMute: function onMute(sessionId) {
          return _this4._webphone.mute(sessionId);
        },
        onUnmute: function onUnmute(sessionId) {
          return _this4._webphone.unmute(sessionId);
        },
        onHold: function onHold(sessionId) {
          return _this4._webphone.hold(sessionId);
        },
        onUnhold: function onUnhold(sessionId) {
          _this4._webphone.unhold(sessionId);
        },
        onRecord: function onRecord(sessionId) {
          return _this4._webphone.startRecord(sessionId);
        },
        onStopRecord: function onStopRecord(sessionId) {
          return _this4._webphone.stopRecord(sessionId);
        },
        sendDTMF: function sendDTMF() {
          var _this4$_webphone;
          return (_this4$_webphone = _this4._webphone).sendDTMF.apply(_this4$_webphone, arguments);
        },
        updateSessionMatchedContact: function updateSessionMatchedContact() {
          var _this4$_webphone2;
          return (_this4$_webphone2 = _this4._webphone).updateSessionMatchedContact.apply(_this4$_webphone2, arguments);
        },
        getAvatarUrl: getAvatarUrl,
        onBackButtonClick: onBackButtonClick,
        onFlip: function onFlip(sessionId) {
          var _this4$_router;
          (_this4$_router = _this4._router) === null || _this4$_router === void 0 ? void 0 : _this4$_router.push("/flip/".concat(sessionId));
        },
        onTransfer: function onTransfer(sessionId) {
          var _this4$_router2;
          (_this4$_router2 = _this4._router) === null || _this4$_router2 === void 0 ? void 0 : _this4$_router2.push("/transfer/".concat(sessionId, "/webphone"));
        },
        onCompleteTransfer: function onCompleteTransfer(sessionId) {
          _this4._webphone.completeWarmTransfer(sessionId);
        },
        onPark: function onPark(sessionId) {
          return _this4._webphone.park(sessionId);
        },
        searchContact: function searchContact(searchString) {
          return _this4._contactSearch.debouncedSearch({
            searchString: searchString
          });
        },
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        onAdd: function onAdd(sessionId) {
          // track user click add on call control
          _this4._callMonitor.callControlClickAddTrack();
          var session = (0, _ramda.find)(function (x) {
            return x.id === sessionId;
          }, _this4._webphone.sessions);
          if (!session) {
            return;
          }
          var fromNumber = _this4._callingSettings.fromNumber;
          if (session.direction === _callDirections["default"].outbound) {
            fromNumber = session.fromNumber; // keep the same fromNumber
          }
          var otherCalls = (0, _ramda.filter)(function (call) {
            return call.webphoneSession && call.webphoneSession.id !== session.id;
          }, _this4._callMonitor.allCalls);
          if (otherCalls.length) {
            var _this4$_router3;
            // goto 'calls on hold' page
            (_this4$_router3 = _this4._router) === null || _this4$_router3 === void 0 ? void 0 : _this4$_router3.push("/conferenceCall/callsOnhold/".concat(fromNumber, "/").concat(session.id));
          } else {
            var _this4$_router4;
            // goto dialer directly
            (_this4$_router4 = _this4._router) === null || _this4$_router4 === void 0 ? void 0 : _this4$_router4.push("/conferenceCall/dialer/".concat(fromNumber, "/").concat(sessionId));
          }
        },
        onBeforeMerge: function onBeforeMerge(sessionId) {
          var session = (0, _ramda.find)(function (x) {
            return x.id === sessionId;
          }, _this4._webphone.sessions);
          if (!session) {
            return false;
          }
          return true;
        },
        onMerge: function () {
          var _onMerge = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(sessionId) {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  return _context.a(2);
              }
            }, _callee);
          }));
          function onMerge(_x) {
            return _onMerge.apply(this, arguments);
          }
          return onMerge;
        }(),
        gotoParticipantsCtrl: function gotoParticipantsCtrl() {
          var _this4$_router5;
          (_this4$_router5 = _this4._router) === null || _this4$_router5 === void 0 ? void 0 : _this4$_router5.push('/conferenceCall/participants');
          // track user click participant area on call control
          _this4._callMonitor.callControlClickParticipantAreaTrack();
        },
        loadConference: function loadConference(conferenceId) {},
        closeMergingPair: function closeMergingPair() {},
        setMergeParty: function setMergeParty(args) {},
        // user action track functions
        afterHideMergeConfirm: function afterHideMergeConfirm() {
          return _this4._callMonitor.confirmMergeClickCloseTrack();
        },
        afterConfirmMerge: function afterConfirmMerge() {
          return _this4._callMonitor.confirmMergeClickMergeTrack();
        },
        afterOnMerge: function afterOnMerge() {
          return _this4._callMonitor.callControlClickMergeTrack();
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this5 = this,
        _this$_callControlVie;
      this.params = (0, _nextCore.useParams)();
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this5.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_callControlVie = this._callControlViewOptions) === null || _this$_callControlVie === void 0 ? void 0 : _this$_callControlVie.component) || _CallCtrlContainer.CallCtrlContainer;
      return (
        /*#__PURE__*/
        // TODO: fix type
        // @ts-ignore
        _react["default"].createElement(Component, _extends({}, _props, uiFunctions))
      );
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "currentSession", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "currentSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromMatches", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "fromMatches"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toMatches", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "toMatches"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallControl.view.js.map
