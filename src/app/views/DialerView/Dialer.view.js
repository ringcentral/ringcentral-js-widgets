"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
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
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerView = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.trim.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _getCallingOption = require("@ringcentral-integration/commons/lib/getCallingOption");
var _normalizeNumber2 = require("@ringcentral-integration/commons/lib/normalizeNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _DialerPanel = require("@ringcentral-integration/widgets/components/DialerPanel");
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _DialerPage = require("./DialerPage");
var _i18n = _interopRequireWildcard(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var TIMEOUT = 60 * 1000;
var DialerView = exports.DialerView = (_dec = (0, _nextCore.injectable)({
  name: 'DialerView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 10);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 11);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 12);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('DialerViewOptions')(target, undefined, 13);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _services4.CallingSettings === "undefined" ? Object : _services4.CallingSettings, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services4.Call === "undefined" ? Object : _services4.Call, typeof _services.ExtensionFeatures === "undefined" ? Object : _services.ExtensionFeatures, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services4.Webphone === "undefined" ? Object : _services4.Webphone, typeof _services4.AudioSettings === "undefined" ? Object : _services4.AudioSettings, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof DialerViewOptions === "undefined" ? Object : DialerViewOptions]), _dec8 = (0, _nextCore.dynamic)('AppFeatures'), _dec9 = Reflect.metadata("design:type", typeof AppFeatures === "undefined" ? Object : AppFeatures), _dec0 = (0, _nextCore.dynamic)('CallAction'), _dec1 = Reflect.metadata("design:type", typeof _services4.CallAction === "undefined" ? Object : _services4.CallAction), _dec10 = (0, _nextCore.dynamic)('ContactSearchView'), _dec11 = Reflect.metadata("design:type", typeof ContactSearchView === "undefined" ? Object : ContactSearchView), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [String]), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Boolean]), _dec16 = Reflect.metadata("design:type", typeof Recipient === "undefined" ? Object : Recipient), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof Recipient === "undefined" ? Object : Recipient]), _dec19 = (0, _nextCore.computed)(function (that) {
  return [that.recipient];
}), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _nextCore.computed)(function (that) {
  var _that$_contactSearch;
  return [(_that$_contactSearch = that._contactSearch) === null || _that$_contactSearch === void 0 ? void 0 : _that$_contactSearch.sortedResult, that.toNumberField];
}), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [void 0]), _dec27 = (0, _nextCore.delegate)('server'), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", []), _dec30 = (0, _nextCore.delegate)('server'), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec33 = (0, _services.track)(function (that, eventName, contactType) {
  return [eventName, {
    contactType: contactType,
    location: 'Dialpad'
  }];
}), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", [String, String]), _dec36 = (0, _nextCore.delegate)('server'), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", [typeof Recipient === "undefined" ? Object : Recipient]), _dec39 = (0, _nextCore.delegate)('server'), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", []), _dec42 = (0, _services.track)(function (that, trackCallMadeFrom) {
  var callingOption = (0, _getCallingOption.getCallingOption)(that._callingSettings.callingMode);
  return [_trackEvents.trackEvents.callMade, {
    callingOption: callingOption,
    Location: trackCallMadeFrom
  }];
}), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", [String]), _dec45 = (0, _nextCore.delegate)('server'), _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", [typeof DialerViewCallParams === "undefined" ? Object : DialerViewCallParams]), _dec48 = Reflect.metadata("design:type", Function), _dec49 = Reflect.metadata("design:paramtypes", []), _dec50 = (0, _nextCore.delegate)('server'), _dec51 = Reflect.metadata("design:type", Function), _dec52 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function DialerView(_callingSettings, _connectivityManager, _locale, _rateLimiter, _regionSettings, _toast, _call, _extensionFeatures, _accountInfo, _portManager, _webphone, _audioSettings, _contactSearch, _dialerViewOptions) {
    var _this;
    _classCallCheck(this, DialerView);
    _this = _callSuper(this, DialerView);
    _this._callingSettings = _callingSettings;
    _this._connectivityManager = _connectivityManager;
    _this._locale = _locale;
    _this._rateLimiter = _rateLimiter;
    _this._regionSettings = _regionSettings;
    _this._toast = _toast;
    _this._call = _call;
    _this._extensionFeatures = _extensionFeatures;
    _this._accountInfo = _accountInfo;
    _this._portManager = _portManager;
    _this._webphone = _webphone;
    _this._audioSettings = _audioSettings;
    _this._contactSearch = _contactSearch;
    _this._dialerViewOptions = _dialerViewOptions;
    _initializerDefineProperty(_this, "_appFeatures", _descriptor, _this);
    _initializerDefineProperty(_this, "_callAction", _descriptor2, _this);
    _initializerDefineProperty(_this, "_contactSearchView", _descriptor3, _this);
    _this._latestCallTime = 0;
    _this._lastSearchInput = '';
    _this._callHooks = [];
    /**
     * verify is that call can be continue before make call
     */
    _this.callVerify = void 0;
    _initializerDefineProperty(_this, "toNumberField", _descriptor4, _this);
    _initializerDefineProperty(_this, "isLastInputFromDialpad", _descriptor5, _this);
    _initializerDefineProperty(_this, "recipient", _descriptor6, _this);
    return _this;
  }
  _inherits(DialerView, _RcViewModule);
  return _createClass(DialerView, [{
    key: "_setToNumberField",
    value: function _setToNumberField(val) {
      this.toNumberField = val;
    }
  }, {
    key: "setIsLastInputFromDialpad",
    value: function setIsLastInputFromDialpad(val) {
      this.isLastInputFromDialpad = val;
    }
  }, {
    key: "_setRecipient",
    value: function _setRecipient(val) {
      this.recipient = val;
    }
  }, {
    key: "recipients",
    get: function get() {
      if (this.recipient) {
        return [this.recipient];
      }
      return [];
    }
  }, {
    key: "searchContactList",
    get: function get() {
      if (this.toNumberField.length < 3 || !this._contactSearch) {
        return [];
      }
      return this._contactSearch.sortedResult.slice(0, 50);
    }
  }, {
    key: "isCallButtonDisabled",
    get: function get() {
      return !this._call.isIdle || this._connectivityManager.isOfflineMode || this._connectivityManager.isWebphoneUnavailableMode || this._connectivityManager.isWebphoneInitializing || this._rateLimiter.restricted;
    }
  }, {
    key: "showSpinner",
    get: function get() {
      return !(this._call.ready && this._callingSettings.ready && this._locale.ready && this._extensionFeatures.ready && this._connectivityManager.ready && (!this._audioSettings || this._audioSettings.ready) && !this._connectivityManager.isWebphoneInitializing);
    }
  }, {
    key: "disableFromField",
    get: function get() {
      var _this$_extensionFeatu, _this$_extensionFeatu2;
      return !!(this._extensionFeatures.ready && !((_this$_extensionFeatu = this._extensionFeatures.features) === null || _this$_extensionFeatu === void 0 ? void 0 : (_this$_extensionFeatu2 = _this$_extensionFeatu.EditOutboundCallerId) === null || _this$_extensionFeatu2 === void 0 ? void 0 : _this$_extensionFeatu2.available));
    }
  }, {
    key: "isShowAnonymous",
    get: function get() {
      var _this$_extensionFeatu3, _this$_extensionFeatu4;
      return !!(this._extensionFeatures.ready && ((_this$_extensionFeatu3 = this._extensionFeatures.features) === null || _this$_extensionFeatu3 === void 0 ? void 0 : (_this$_extensionFeatu4 = _this$_extensionFeatu3.BlockingCallerId) === null || _this$_extensionFeatu4 === void 0 ? void 0 : _this$_extensionFeatu4.available));
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.resetState({
        toNumberField: '',
        isLastInputFromDialpad: false,
        recipient: null
      });
      this._lastSearchInput = '';
    }
  }, {
    key: "resetState",
    value: function resetState() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          toNumberField: '',
          isLastInputFromDialpad: false,
          recipient: null
        },
        _ref$toNumberField = _ref.toNumberField,
        toNumberField = _ref$toNumberField === void 0 ? '' : _ref$toNumberField,
        _ref$isLastInputFromD = _ref.isLastInputFromDialpad,
        isLastInputFromDialpad = _ref$isLastInputFromD === void 0 ? false : _ref$isLastInputFromD,
        _ref$recipient = _ref.recipient,
        recipient = _ref$recipient === void 0 ? null : _ref$recipient;
      this.toNumberField = toNumberField;
      this.isLastInputFromDialpad = isLastInputFromDialpad;
      this.recipient = recipient;
    }
  }, {
    key: "clearToNumberField",
    value: function () {
      var _clearToNumberField = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$_contactSearch;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setToNumberField('');
              // spring-ui version already clear the search related state into ContactSearch service
              if (process.env.THEME_SYSTEM !== 'spring-ui') {
                (_this$_contactSearch = this._contactSearch) === null || _this$_contactSearch === void 0 ? void 0 : _this$_contactSearch.clearAndReset();
              }
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function clearToNumberField() {
        return _clearToNumberField.apply(this, arguments);
      }
      return clearToNumberField;
    }()
  }, {
    key: "setToNumberField",
    value: function () {
      var _setToNumberField2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(phoneNumber) {
        var fromDialPad,
          _this$_dialerViewOpti,
          hasMinimumLengthForSearch,
          contactSearch,
          showExecSearch,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              fromDialPad = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
              if (!(this.toNumberField !== phoneNumber)) {
                _context2.n = 3;
                break;
              }
              this.resetState({
                toNumberField: phoneNumber,
                isLastInputFromDialpad: fromDialPad,
                recipient: this.recipient
              });

              // TODO: those search logic should be trigger from view component after refactor
              hasMinimumLengthForSearch = (this.toNumberField || '').length >= 3;
              contactSearch = this._contactSearch;
              if (!(!hasMinimumLengthForSearch || !contactSearch)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (!(process.env.THEME_SYSTEM === 'spring-ui')) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2);
            case 2:
              showExecSearch = (_this$_dialerViewOpti = this._dialerViewOptions) === null || _this$_dialerViewOpti === void 0 ? void 0 : _this$_dialerViewOpti.useV2;
              if (showExecSearch) {
                contactSearch.setPrepareSearch();
                contactSearch.debouncedSearch({
                  searchString: this.toNumberField
                });
              }
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setToNumberField(_x) {
        return _setToNumberField2.apply(this, arguments);
      }
      return setToNumberField;
    }()
  }, {
    key: "triggerEventTracking",
    value: function () {
      var _triggerEventTracking = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(eventName, contactType) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      function triggerEventTracking(_x2, _x3) {
        return _triggerEventTracking.apply(this, arguments);
      }
      return triggerEventTracking;
    }()
  }, {
    key: "setRecipient",
    value: function () {
      var _setRecipient2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(recipient) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._lastSearchInput = this.toNumberField;
              this.resetState({
                toNumberField: '',
                isLastInputFromDialpad: false,
                recipient: recipient
              });
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function setRecipient(_x4) {
        return _setRecipient2.apply(this, arguments);
      }
      return setRecipient;
    }()
  }, {
    key: "clearRecipient",
    value: function () {
      var _clearRecipient = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this.resetState({
                toNumberField: '',
                isLastInputFromDialpad: false,
                recipient: null
              });
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function clearRecipient() {
        return _clearRecipient.apply(this, arguments);
      }
      return clearRecipient;
    }()
  }, {
    key: "triggerHook",
    value: function () {
      var _triggerHook = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(_ref2) {
        var _ref2$phoneNumber, phoneNumber, recipient, fromNumber, _iterator, _step, hook, _t;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _ref2$phoneNumber = _ref2.phoneNumber, phoneNumber = _ref2$phoneNumber === void 0 ? '' : _ref2$phoneNumber, recipient = _ref2.recipient, fromNumber = _ref2.fromNumber;
              _iterator = _createForOfIteratorHelper(this._callHooks);
              _context6.p = 1;
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context6.n = 4;
                break;
              }
              hook = _step.value;
              _context6.n = 3;
              return hook({
                phoneNumber: phoneNumber,
                recipient: recipient,
                fromNumber: fromNumber
              });
            case 3:
              _context6.n = 2;
              break;
            case 4:
              _context6.n = 6;
              break;
            case 5:
              _context6.p = 5;
              _t = _context6.v;
              _iterator.e(_t);
            case 6:
              _context6.p = 6;
              _iterator.f();
              return _context6.f(6);
            case 7:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 5, 6, 7]]);
      }));
      function triggerHook(_x5) {
        return _triggerHook.apply(this, arguments);
      }
      return triggerHook;
    }()
  }, {
    key: "trackCallMade",
    value: function trackCallMade(trackCallMadeFrom) {
      //
    }
  }, {
    key: "call",
    value: function () {
      var _call2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(_ref3) {
        var _ref3$phoneNumber, phoneNumber, recipient, fromNumber, trackCallMadeFrom, _ref3$clickDialerToCa, clickDialerToCall, _this$_callAction, _this$_callAction$che, hasReachedMaxCalls, continueCall, _parse, hasInvalidChars, isValid, isValidNumber, _t2, _t3;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _ref3$phoneNumber = _ref3.phoneNumber, phoneNumber = _ref3$phoneNumber === void 0 ? '' : _ref3$phoneNumber, recipient = _ref3.recipient, fromNumber = _ref3.fromNumber, trackCallMadeFrom = _ref3.trackCallMadeFrom, _ref3$clickDialerToCa = _ref3.clickDialerToCall, clickDialerToCall = _ref3$clickDialerToCa === void 0 ? false : _ref3$clickDialerToCa;
              if (!(process.env.THEME_SYSTEM === 'spring-ui')) {
                _context7.n = 2;
                break;
              }
              _context7.n = 1;
              return (_this$_callAction = this._callAction) === null || _this$_callAction === void 0 ? void 0 : (_this$_callAction$che = _this$_callAction.checkReachToMaxExistCalls) === null || _this$_callAction$che === void 0 ? void 0 : _this$_callAction$che.call(_this$_callAction);
            case 1:
              hasReachedMaxCalls = _context7.v;
              if (!hasReachedMaxCalls) {
                _context7.n = 2;
                break;
              }
              return _context7.a(2);
            case 2:
              if (phoneNumber) {
                phoneNumber = phoneNumber.trim();
              }
              if (recipient === null || recipient === void 0 ? void 0 : recipient.phoneNumber) {
                recipient.phoneNumber = recipient.phoneNumber.trim();
              }
              if (!(phoneNumber || recipient)) {
                _context7.n = 11;
                break;
              }
              this._latestCallTime = Date.now();
              this.resetState({
                toNumberField: phoneNumber,
                isLastInputFromDialpad: false,
                recipient: recipient || null
              });
              if (!this.callVerify) {
                _context7.n = 4;
                break;
              }
              _context7.n = 3;
              return this.callVerify({
                phoneNumber: phoneNumber,
                recipient: recipient
              });
            case 3:
              _t2 = _context7.v;
              _context7.n = 5;
              break;
            case 4:
              _t2 = true;
            case 5:
              continueCall = _t2;
              if (continueCall) {
                _context7.n = 6;
                break;
              }
              return _context7.a(2);
            case 6:
              _context7.n = 7;
              return this.triggerHook({
                phoneNumber: phoneNumber,
                recipient: recipient,
                fromNumber: fromNumber
              });
            case 7:
              // for data tracking
              _parse = (0, _phoneNumber.parse)({
                input: this._lastSearchInput || this.toNumberField
              }), hasInvalidChars = _parse.hasInvalidChars, isValid = _parse.isValid;
              isValidNumber = !hasInvalidChars && isValid;
              _context7.p = 8;
              _context7.n = 9;
              return this._call.call({
                phoneNumber: this.toNumberField,
                recipient: this.recipient,
                fromNumber: fromNumber,
                clickDialerToCall: clickDialerToCall,
                isValidNumber: isValidNumber
              });
            case 9:
              if (
              // spring-ui project have new data tracking system, not need this track anymore
              process.env.THEME_SYSTEM !== 'spring-ui' && trackCallMadeFrom) {
                this.trackCallMade(trackCallMadeFrom);
              }
              this.resetState();
              _context7.n = 11;
              break;
            case 10:
              _context7.p = 10;
              _t3 = _context7.v;
              console.log('[DialerView] make call error', _t3);
            case 11:
              return _context7.a(2);
          }
        }, _callee7, this, [[8, 10]]);
      }));
      function call(_x6) {
        return _call2.apply(this, arguments);
      }
      return call;
    }()
  }, {
    key: "_loadLastPhoneNumberAction",
    value: function _loadLastPhoneNumberAction() {
      this.resetState({
        toNumberField: this._call.lastPhoneNumber,
        recipient: this._call.lastRecipient,
        isLastInputFromDialpad: false
      });
    }
  }, {
    key: "_loadLastPhoneNumber",
    value: function () {
      var _loadLastPhoneNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(!this._call.lastRecipient && !this._call.lastPhoneNumber)) {
                _context8.n = 1;
                break;
              }
              this._toast.warning({
                message: (0, _i18n.t)('noToNumber')
              });
              return _context8.a(2);
            case 1:
              this._loadLastPhoneNumberAction();
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _loadLastPhoneNumber() {
        return _loadLastPhoneNumber2.apply(this, arguments);
      }
      return _loadLastPhoneNumber;
    }()
  }, {
    key: "onCallButtonClick",
    value: function () {
      var _onCallButtonClick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _ref4,
          fromNumber,
          fromSessionId,
          clickDialerToCall,
          _args9 = arguments;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _ref4 = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {}, fromNumber = _ref4.fromNumber, fromSessionId = _ref4.fromSessionId, clickDialerToCall = _ref4.clickDialerToCall;
              if (!("".concat(this.toNumberField).trim().length === 0 && !this.recipient)) {
                _context9.n = 1;
                break;
              }
              this._loadLastPhoneNumber();
              return _context9.a(2, false);
            case 1:
              this.trackCallingEvent('Dialer');
              this._onBeforeCall(fromSessionId);
              if (!(this._portManager.shared && !this._portManager.isWorkerMode && this._webphone && this._callingSettings.isWebphoneMode &&
              // TODO: handle `hasCallSessions:true` case
              !this._webphone.hasCallSessions)) {
                _context9.n = 2;
                break;
              }
              _context9.n = 2;
              return this._webphone.switchWebphoneInstance({
                forceDisconnect: true
              });
            case 2:
              _context9.n = 3;
              return this.call({
                phoneNumber: this.toNumberField,
                recipient: this.recipient,
                fromNumber: fromNumber,
                clickDialerToCall: clickDialerToCall,
                trackCallMadeFrom: 'Dialer'
              });
            case 3:
              return _context9.a(2, true);
          }
        }, _callee9, this);
      }));
      function onCallButtonClick() {
        return _onCallButtonClick.apply(this, arguments);
      }
      return onCallButtonClick;
    }() // * that fromSessionId send to children class
  }, {
    key: "_onBeforeCall",
    value: function _onBeforeCall(_fromSessionId) {
      //
    }

    /**
     * TODO: refactor with a better way to check if a call is placed by current device
     *
     * Check if a call is placed by current device, including call with browser, jupiter and ringcentral phone,
     * and timeout 60s is for when call with ringcentral phone or jupiter we can't make sure the call is placed immediately
     * so just in case other device make a call with same phone number when call from current device fail then we
     * should not count it as current device call
     * @deprecated
     */
  }, {
    key: "isCallFromCurrentDevice",
    value: function isCallFromCurrentDevice(phoneNumber) {
      var _this$_call$lastRecip, _normalizeNumber, _this$_call$lastRecip2;
      var originalPhoneNumber = this._call.lastPhoneNumber || ((_this$_call$lastRecip = this._call.lastRecipient) === null || _this$_call$lastRecip === void 0 ? void 0 : _this$_call$lastRecip.phoneNumber);
      var formattedPhoneNumber = (_normalizeNumber = (0, _normalizeNumber2.normalizeNumber)({
        phoneNumber: this._call.lastPhoneNumber || ((_this$_call$lastRecip2 = this._call.lastRecipient) === null || _this$_call$lastRecip2 === void 0 ? void 0 : _this$_call$lastRecip2.phoneNumber),
        countryCode: this._regionSettings.countryCode,
        areaCode: this._regionSettings.areaCode,
        maxExtensionLength: this._accountInfo.maxExtensionNumberLength
        // if call out with extension number then only match main company number
      })) === null || _normalizeNumber === void 0 ? void 0 : _normalizeNumber.split('*')[0];
      // use includes since after we introduced EDP, the number dialed at to field maybe different to server parsed number.
      if (((phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.includes(formattedPhoneNumber)) || (phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.includes(originalPhoneNumber)) || phoneNumber === this._call.lastValidatedToNumber) && Date.now() - this._latestCallTime <= TIMEOUT) {
        this._latestCallTime = 0;
        return true;
      }
      return false;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_props) {
      var _this$_audioSettings$, _this$_audioSettings, _this$_audioSettings$2, _this$_audioSettings2, _this$_dialerViewOpti2;
      return {
        currentLocale: this._locale.currentLocale,
        callingMode: this._callingSettings.callingMode,
        isWebphoneMode: this._callingSettings.isWebphoneMode,
        callButtonDisabled: this.isCallButtonDisabled,
        fromNumber: this._callingSettings.fromNumber,
        fromNumbers: this._callingSettings.fromNumbers,
        toNumber: this.toNumberField,
        recipient: this.recipient,
        recipients: this.recipients,
        searchContactList: this.searchContactList,
        showSpinner: this.showSpinner,
        callVolume: (_this$_audioSettings$ = (_this$_audioSettings = this._audioSettings) === null || _this$_audioSettings === void 0 ? void 0 : _this$_audioSettings.callVolume) !== null && _this$_audioSettings$ !== void 0 ? _this$_audioSettings$ : 1,
        outputDeviceId: (_this$_audioSettings$2 = (_this$_audioSettings2 = this._audioSettings) === null || _this$_audioSettings2 === void 0 ? void 0 : _this$_audioSettings2.outputDeviceId) !== null && _this$_audioSettings$2 !== void 0 ? _this$_audioSettings$2 : '',
        isLastInputFromDialpad: this.isLastInputFromDialpad,
        disableFromField: this.disableFromField,
        useV2: !!((_this$_dialerViewOpti2 = this._dialerViewOptions) === null || _this$_dialerViewOpti2 === void 0 ? void 0 : _this$_dialerViewOpti2.useV2),
        showAnonymous: this.isShowAnonymous,
        // do not enable this feature for now
        isSmartNoteEnabled: false
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_props) {
      var _this2 = this;
      return {
        triggerEventTracking: function triggerEventTracking(eventName, contactType) {
          return _this2.triggerEventTracking(eventName, contactType);
        },
        onToNumberChange: function onToNumberChange() {
          return _this2.setToNumberField.apply(_this2, arguments);
        },
        // TODO: check onToNumberChange be '' does trigger below this._contactSearch?.clearAndReset();
        clearToNumber: function clearToNumber() {
          return _this2.clearToNumberField();
        },
        onCallButtonClick: function onCallButtonClick(options) {
          return _this2.onCallButtonClick(options);
        },
        changeFromNumber: function changeFromNumber() {
          var _this2$_callingSettin;
          return (_this2$_callingSettin = _this2._callingSettings).updateFromNumber.apply(_this2$_callingSettin, arguments);
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            maxExtensionLength: _this2._accountInfo.maxExtensionNumberLength
          });
        },
        setRecipient: function setRecipient() {
          return _this2.setRecipient.apply(_this2, arguments);
        },
        clearRecipient: function clearRecipient() {
          return _this2.clearRecipient();
        },
        searchContact: function () {
          var _searchContact = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(searchString) {
            var _this2$_contactSearch;
            return _regenerator().w(function (_context0) {
              while (1) switch (_context0.n) {
                case 0:
                  _context0.n = 1;
                  return (_this2$_contactSearch = _this2._contactSearch) === null || _this2$_contactSearch === void 0 ? void 0 : _this2$_contactSearch.debouncedSearch({
                    searchString: searchString
                  });
                case 1:
                  return _context0.a(2);
              }
            }, _callee0);
          }));
          function searchContact(_x7) {
            return _searchContact.apply(this, arguments);
          }
          return searchContact;
        }()
      };
    }
  }, {
    key: "trackCallingEvent",
    value: function trackCallingEvent(callMadeLocation) {
      var mode = this._callingSettings.callingMode;
      (0, _services.trackEvent)('Int_Phone_callMade', {
        callingOptionSetup: (0, _services4.getTrackCallingSetup)(mode),
        callMadeLocation: callMadeLocation
      });
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_dialerViewOpti4;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale.t;
      // TODO: fix type
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        var _this$_dialerViewOpti3, _this$_contactSearchV;
        var _Component = ((_this$_dialerViewOpti3 = this._dialerViewOptions) === null || _this$_dialerViewOpti3 === void 0 ? void 0 : _this$_dialerViewOpti3.component) || _DialerPage.DialerPage;
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
          title: t('phoneTitle')
        }, null), /*#__PURE__*/_react["default"].createElement(_Component, _extends({}, _props, uiFunctions, {
          ContactSearch: (_this$_contactSearchV = this._contactSearchView) === null || _this$_contactSearchV === void 0 ? void 0 : _this$_contactSearchV.component
        })));
      }
      var Component = ((_this$_dialerViewOpti4 = this._dialerViewOptions) === null || _this$_dialerViewOpti4 === void 0 ? void 0 : _this$_dialerViewOpti4.component) || _DialerPanel.DialerPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_appFeatures", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_callAction", [_dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_contactSearchView", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "toNumberField", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setToNumberField", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "_setToNumberField"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isLastInputFromDialpad", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsLastInputFromDialpad", [_nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsLastInputFromDialpad"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "recipient", [_nextCore.state, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setRecipient", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "recipients", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "recipients"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchContactList", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "searchContactList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetState", [_nextCore.action, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "resetState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearToNumberField", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "clearToNumberField"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setToNumberField", [_dec30, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "setToNumberField"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "triggerEventTracking", [_dec33, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerEventTracking"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRecipient", [_dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "setRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearRecipient", [_dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "clearRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackCallMade", [_dec42, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "trackCallMade"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_dec45, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_loadLastPhoneNumberAction", [_nextCore.action, _dec48, _dec49], Object.getOwnPropertyDescriptor(_class2.prototype, "_loadLastPhoneNumberAction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_loadLastPhoneNumber", [_dec50, _dec51, _dec52], Object.getOwnPropertyDescriptor(_class2.prototype, "_loadLastPhoneNumber"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Dialer.view.js.map
