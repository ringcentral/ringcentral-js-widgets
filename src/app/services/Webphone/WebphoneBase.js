"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebphoneBase = exports.DEFAULT_AUDIO = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _SipInstanceManager = require("@ringcentral-integration/commons/lib/SipInstanceManager");
var _core = require("@ringcentral-integration/core");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _events = require("events");
var _ringcentralWebPhone = _interopRequireDefault(require("ringcentral-web-phone"));
var _rxjs = require("rxjs");
var _AudioHelper = require("./AudioHelper");
var _incoming = _interopRequireDefault(require("./audio/incoming.mp3"));
var _outgoing = _interopRequireDefault(require("./audio/outgoing.mp3"));
var _connectionStatus = require("./connectionStatus");
var _events2 = require("./events");
var _i18n = require("./i18n");
var _webphoneHelper = require("./webphoneHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _dec125, _dec126, _dec127, _dec128, _dec129, _dec130, _dec131, _dec132, _dec133, _dec134, _dec135, _dec136, _dec137, _dec138, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var DEFAULT_AUDIO = exports.DEFAULT_AUDIO = 'default';
var AUTO_RETRIES_DELAY = [0, 5 * 1000, 10 * 1000, 30 * 1000, 2 * 60 * 1000, 5 * 60 * 1000, 15 * 60 * 1000, 30 * 60 * 1000];
var DEFAULT_WEBSOCKET_RECOVERY_TIMEOUT = 8 * 1000;
var REALTIME_RECOVERY_QUICK_RETRY_LIMIT = 2;
var WebphoneBase = exports.WebphoneBase = (_dec = function _dec(target, key) {
  return (0, _nextCore.optional)('WebphoneOptions')(target, undefined, 12);
}, _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Subscription')(target, undefined, 13);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('Prefix')(target, undefined, 14);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof Auth === "undefined" ? Object : Auth, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof Client === "undefined" ? Object : Client, typeof NumberValidate === "undefined" ? Object : NumberValidate, typeof AppFeatures === "undefined" ? Object : AppFeatures, typeof ExtensionFeatures === "undefined" ? Object : ExtensionFeatures, typeof ExtensionDevice === "undefined" ? Object : ExtensionDevice, typeof AudioSettings === "undefined" ? Object : AudioSettings, typeof StoragePlugin === "undefined" ? Object : StoragePlugin, typeof PortManager === "undefined" ? Object : PortManager, typeof _services.RingCentralExtensions === "undefined" ? Object : _services.RingCentralExtensions, typeof WebphoneOptions === "undefined" ? Object : WebphoneOptions, typeof _services.WebSocketSubscription === "undefined" ? Object : _services.WebSocketSubscription, String]), _dec6 = (0, _nextCore.dynamic)('BrowserLogger'), _dec7 = Reflect.metadata("design:type", typeof BrowserLogger === "undefined" ? Object : BrowserLogger), _dec8 = (0, _nextCore.delegate)('mainClient'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = Reflect.metadata("design:type", typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue), _dec10 = Reflect.metadata("design:type", typeof WebphoneError === "undefined" ? Object : WebphoneError), _dec11 = Reflect.metadata("design:type", Number), _dec12 = Reflect.metadata("design:type", typeof SipRegistrationDeviceInfo === "undefined" ? Object : SipRegistrationDeviceInfo), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [typeof WebphoneError === "undefined" ? Object : WebphoneError, Number]), _dec20 = (0, _nextCore.delegate)('server'), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [typeof WebphoneError === "undefined" ? Object : WebphoneError, Number]), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [typeof WebphoneError === "undefined" ? Object : WebphoneError, Number]), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [typeof WebphoneError === "undefined" ? Object : WebphoneError, Number]), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", []), _dec30 = (0, _nextCore.delegate)('server'), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", []), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", []), _dec35 = (0, _nextCore.delegate)('server'), _dec36 = Reflect.metadata("design:type", Function), _dec37 = Reflect.metadata("design:paramtypes", []), _dec38 = (0, _services.track)(_trackEvents.trackEvents.webRTCRegistration), _dec39 = Reflect.metadata("design:type", Function), _dec40 = Reflect.metadata("design:paramtypes", [typeof SipRegistrationDeviceInfo === "undefined" ? Object : SipRegistrationDeviceInfo]), _dec41 = (0, _nextCore.delegate)('server'), _dec42 = Reflect.metadata("design:type", Function), _dec43 = Reflect.metadata("design:paramtypes", [typeof SipRegistrationDeviceInfo === "undefined" ? Object : SipRegistrationDeviceInfo]), _dec44 = Reflect.metadata("design:type", Function), _dec45 = Reflect.metadata("design:paramtypes", []), _dec46 = (0, _nextCore.delegate)('server'), _dec47 = Reflect.metadata("design:type", Function), _dec48 = Reflect.metadata("design:paramtypes", []), _dec49 = Reflect.metadata("design:type", Function), _dec50 = Reflect.metadata("design:paramtypes", []), _dec51 = (0, _nextCore.delegate)('server'), _dec52 = Reflect.metadata("design:type", Function), _dec53 = Reflect.metadata("design:paramtypes", []), _dec54 = Reflect.metadata("design:type", Function), _dec55 = Reflect.metadata("design:paramtypes", []), _dec56 = (0, _nextCore.delegate)('server'), _dec57 = Reflect.metadata("design:type", Function), _dec58 = Reflect.metadata("design:paramtypes", []), _dec59 = Reflect.metadata("design:type", Function), _dec60 = Reflect.metadata("design:paramtypes", [Object]), _dec61 = (0, _nextCore.delegate)('server'), _dec62 = Reflect.metadata("design:type", Function), _dec63 = Reflect.metadata("design:paramtypes", [Object]), _dec64 = Reflect.metadata("design:type", Function), _dec65 = Reflect.metadata("design:paramtypes", [Number]), _dec66 = (0, _nextCore.delegate)('server'), _dec67 = Reflect.metadata("design:type", Function), _dec68 = Reflect.metadata("design:paramtypes", [Number]), _dec69 = Reflect.metadata("design:type", Function), _dec70 = Reflect.metadata("design:paramtypes", [Number]), _dec71 = (0, _nextCore.delegate)('server'), _dec72 = Reflect.metadata("design:type", Function), _dec73 = Reflect.metadata("design:paramtypes", [Number]), _dec74 = Reflect.metadata("design:type", Object), _dec75 = Reflect.metadata("design:type", Function), _dec76 = Reflect.metadata("design:paramtypes", [String, String, String, String]), _dec77 = Reflect.metadata("design:type", Function), _dec78 = Reflect.metadata("design:paramtypes", [String, String]), _dec79 = Reflect.metadata("design:type", Function), _dec80 = Reflect.metadata("design:paramtypes", []), _dec81 = Reflect.metadata("design:type", Function), _dec82 = Reflect.metadata("design:paramtypes", [String, String]), _dec83 = Reflect.metadata("design:type", Function), _dec84 = Reflect.metadata("design:paramtypes", []), _dec85 = (0, _nextCore.computed)(function (that) {
  return [that.ready, that._audioSettings.ringtoneVolume];
}), _dec86 = Reflect.metadata("design:type", Function), _dec87 = Reflect.metadata("design:paramtypes", []), _dec88 = (0, _nextCore.computed)(function (that) {
  return [that.ready, that._audioSettings.supportDevices, that._audioSettings.ringtoneDeviceId];
}), _dec89 = Reflect.metadata("design:type", Function), _dec90 = Reflect.metadata("design:paramtypes", []), _dec91 = (0, _nextCore.computed)(function (that) {
  return [that.ready, that._audioSettings.supportDevices, that._audioSettings.outputDeviceId];
}), _dec92 = Reflect.metadata("design:type", Function), _dec93 = Reflect.metadata("design:paramtypes", []), _dec94 = (0, _nextCore.delegate)('server'), _dec95 = Reflect.metadata("design:type", Function), _dec96 = Reflect.metadata("design:paramtypes", []), _dec97 = (0, _nextCore.delegate)('server'), _dec98 = Reflect.metadata("design:type", Function), _dec99 = Reflect.metadata("design:paramtypes", []), _dec100 = (0, _nextCore.delegate)('server'), _dec101 = Reflect.metadata("design:type", Function), _dec102 = Reflect.metadata("design:paramtypes", [String, String, String, String]), _dec103 = (0, _nextCore.delegate)('mainClient'), _dec104 = Reflect.metadata("design:type", Function), _dec105 = Reflect.metadata("design:paramtypes", []), _dec106 = (0, _nextCore.delegate)('mainClient'), _dec107 = Reflect.metadata("design:type", Function), _dec108 = Reflect.metadata("design:paramtypes", [void 0]), _dec109 = (0, _nextCore.delegate)('mainClient'), _dec110 = Reflect.metadata("design:type", Function), _dec111 = Reflect.metadata("design:paramtypes", [Object]), _dec112 = (0, _nextCore.delegate)('mainClient'), _dec113 = Reflect.metadata("design:type", Function), _dec114 = Reflect.metadata("design:paramtypes", []), _dec115 = (0, _nextCore.delegate)('mainClient'), _dec116 = Reflect.metadata("design:type", Function), _dec117 = Reflect.metadata("design:paramtypes", []), _dec118 = (0, _nextCore.delegate)('mainClient'), _dec119 = Reflect.metadata("design:type", Function), _dec120 = Reflect.metadata("design:paramtypes", [Object]), _dec121 = (0, _nextCore.delegate)('mainClient'), _dec122 = Reflect.metadata("design:type", Function), _dec123 = Reflect.metadata("design:paramtypes", []), _dec124 = (0, _nextCore.delegate)('mainClient'), _dec125 = Reflect.metadata("design:type", Function), _dec126 = Reflect.metadata("design:paramtypes", [Object]), _dec127 = (0, _nextCore.delegate)('server'), _dec128 = Reflect.metadata("design:type", Function), _dec129 = Reflect.metadata("design:paramtypes", [Object]), _dec130 = (0, _nextCore.delegate)('mainClient'), _dec131 = Reflect.metadata("design:type", Function), _dec132 = Reflect.metadata("design:paramtypes", []), _dec133 = (0, _nextCore.delegate)('mainClient'), _dec134 = Reflect.metadata("design:type", Function), _dec135 = Reflect.metadata("design:paramtypes", []), _dec136 = (0, _nextCore.delegate)('mainClient'), _dec137 = Reflect.metadata("design:type", Function), _dec138 = Reflect.metadata("design:paramtypes", [Object]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function WebphoneBase(_brand, _auth, _toast, _client, _numberValidate, _appFeatures, _extensionFeatures, _extensionDevice, _audioSettings, _storage, _portManager, _ringCentralExtensions, _webphoneOptions, _subscription, _prefix) {
    var _this;
    _classCallCheck(this, WebphoneBase);
    _this = _callSuper(this, WebphoneBase);
    _this._brand = _brand;
    _this._auth = _auth;
    _this._toast = _toast;
    _this._client = _client;
    _this._numberValidate = _numberValidate;
    _this._appFeatures = _appFeatures;
    _this._extensionFeatures = _extensionFeatures;
    _this._extensionDevice = _extensionDevice;
    _this._audioSettings = _audioSettings;
    _this._storage = _storage;
    _this._portManager = _portManager;
    _this._ringCentralExtensions = _ringCentralExtensions;
    _this._webphoneOptions = _webphoneOptions;
    _this._subscription = _subscription;
    _this._prefix = _prefix;
    _this._reconnectDelays = AUTO_RETRIES_DELAY;
    _this.rcWebphoneInstance$ = new _rxjs.BehaviorSubject(undefined);
    _this._remoteVideo = null;
    _this._localVideo = null;
    _this._sipInstanceManager = void 0;
    _this._sipInstanceId = void 0;
    _this._connectTimeout = null;
    _this._realtimeRecoveryRetryTimeout = null;
    _this._reconnectAfterSessionEnd = null;
    _this._eventEmitter = new _events.EventEmitter();
    _this._stopWebphoneUserAgentPromise = null;
    _this._removedWebphoneAtBeforeUnload = false;
    _initializerDefineProperty(_this, "_browserLogger", _descriptor, _this);
    _this.isMainClient = true;
    _initializerDefineProperty(_this, "connectionStatus", _descriptor2, _this);
    _initializerDefineProperty(_this, "connectRetryCounts", _descriptor3, _this);
    _initializerDefineProperty(_this, "realtimeRecoveryRetryCounts", _descriptor4, _this);
    _initializerDefineProperty(_this, "errorCode", _descriptor5, _this);
    _initializerDefineProperty(_this, "statusCode", _descriptor6, _this);
    _initializerDefineProperty(_this, "device", _descriptor7, _this);
    _initializerDefineProperty(_this, "data", _descriptor8, _this);
    _this._storage.enable(_this);
    if (_this._portManager.shared) {
      _this._portManager.onMainTab(function () {
        _this.initialize();
      });
      _this._portManager.onServer(function () {
        _this.handleLogout();
        return function () {
          // disconnect webphone when server port switch to client tab
          _this.disconnect();
        };
      });
    } else {
      _this.initialize();
      _this.handleLogout();
    }
    if (globalThis.document) {
      _this.handleListeners();
      _this._sipInstanceManager = new _SipInstanceManager.SipInstanceManager("".concat(_this._prefix, "-webphone-inactive-sip-instance"));
    }
    return _this;
  }
  _inherits(WebphoneBase, _RcModule);
  return _createClass(WebphoneBase, [{
    key: "_webphone",
    get: function get() {
      return this.rcWebphoneInstance$.value;
    }
  }, {
    key: "handleLogout",
    value: function handleLogout() {
      var _this2 = this;
      this._auth.addBeforeLogoutHandler(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return _this2._beforeLogout();
            case 1:
              return _context.a(2);
          }
        }, _callee);
      })));
    }
  }, {
    key: "_beforeLogout",
    value: function () {
      var _beforeLogout2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._sipInstanceId = null;
              _context2.n = 1;
              return this._disconnect();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _beforeLogout() {
        return _beforeLogout2.apply(this, arguments);
      }
      return _beforeLogout;
    }()
  }, {
    key: "_setConnectionStatus",
    value: function _setConnectionStatus(status) {
      this.connectionStatus = status;
    }
  }, {
    key: "setConnectionStatus",
    value: function () {
      var _setConnectionStatus2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(status) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._setConnectionStatus(status);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function setConnectionStatus(_x) {
        return _setConnectionStatus2.apply(this, arguments);
      }
      return setConnectionStatus;
    }()
  }, {
    key: "_setStateOnConnectError",
    value: function _setStateOnConnectError(errorCode, statusCode) {
      this.connectionStatus = _connectionStatus.connectionStatus.connectError;
      this.device = null;
      if (errorCode) {
        this.errorCode = errorCode;
      }
      if (statusCode) {
        this.statusCode = statusCode;
      }
    }
  }, {
    key: "setStateOnConnectError",
    value: function () {
      var _setStateOnConnectError2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(errorCode, statusCode) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._setStateOnConnectError(errorCode, statusCode);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function setStateOnConnectError(_x2, _x3) {
        return _setStateOnConnectError2.apply(this, arguments);
      }
      return setStateOnConnectError;
    }()
  }, {
    key: "_setStateOnConnectFailed",
    value: function _setStateOnConnectFailed(errorCode, statusCode) {
      this.connectionStatus = _connectionStatus.connectionStatus.connectFailed;
      this.device = null;
      if (errorCode) {
        this.errorCode = errorCode;
      }
      if (statusCode) {
        this.statusCode = statusCode;
      }
    }
  }, {
    key: "setStateOnConnectFailed",
    value: function () {
      var _setStateOnConnectFailed2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(errorCode, statusCode) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._setStateOnConnectFailed(errorCode, statusCode);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function setStateOnConnectFailed(_x4, _x5) {
        return _setStateOnConnectFailed2.apply(this, arguments);
      }
      return setStateOnConnectFailed;
    }()
  }, {
    key: "_setStateOnConnect",
    value: function _setStateOnConnect() {
      this.connectionStatus = _connectionStatus.connectionStatus.connecting;
      this.device = null;
      this.connectRetryCounts += 1;
    }
  }, {
    key: "setStateOnConnect",
    value: function () {
      var _setStateOnConnect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this._setStateOnConnect();
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function setStateOnConnect() {
        return _setStateOnConnect2.apply(this, arguments);
      }
      return setStateOnConnect;
    }()
  }, {
    key: "_setStateOnReconnect",
    value: function _setStateOnReconnect() {
      this.connectionStatus = _connectionStatus.connectionStatus.reconnecting;
      this.device = null;
      this.connectRetryCounts += 1;
    }
  }, {
    key: "setStateOnReconnect",
    value: function () {
      var _setStateOnReconnect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._setStateOnReconnect();
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function setStateOnReconnect() {
        return _setStateOnReconnect2.apply(this, arguments);
      }
      return setStateOnReconnect;
    }()
  }, {
    key: "_setStateOnRegistered",
    value: function _setStateOnRegistered(device) {
      this.connectionStatus = _connectionStatus.connectionStatus.connected;
      this.device = device;
      this.errorCode = null;
      this.statusCode = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "setStateOnRegistered",
    value: function () {
      var _setStateOnRegistered2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(device) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this._setStateOnRegistered(device);
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function setStateOnRegistered(_x6) {
        return _setStateOnRegistered2.apply(this, arguments);
      }
      return setStateOnRegistered;
    }()
  }, {
    key: "_setStateOnUnregistered",
    value: function _setStateOnUnregistered() {
      this.connectionStatus = _connectionStatus.connectionStatus.disconnected;
      this.device = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "setStateOnUnregistered",
    value: function () {
      var _setStateOnUnregistered2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this._setStateOnUnregistered();
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function setStateOnUnregistered() {
        return _setStateOnUnregistered2.apply(this, arguments);
      }
      return setStateOnUnregistered;
    }()
  }, {
    key: "_setStateWhenUnregisteredOnInactive",
    value: function _setStateWhenUnregisteredOnInactive() {
      this.connectionStatus = _connectionStatus.connectionStatus.inactive;
      this.device = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "setStateWhenUnregisteredOnInactive",
    value: function () {
      var _setStateWhenUnregisteredOnInactive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              this._setStateWhenUnregisteredOnInactive();
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function setStateWhenUnregisteredOnInactive() {
        return _setStateWhenUnregisteredOnInactive2.apply(this, arguments);
      }
      return setStateWhenUnregisteredOnInactive;
    }()
  }, {
    key: "_setStoreOnDisconnect",
    value: function _setStoreOnDisconnect() {
      if (!this.disconnected) {
        // page unload event async change state with `disconnecting`
        // ensure that the `disconnected` state is not reset to `disconnecting`
        this.connectionStatus = _connectionStatus.connectionStatus.disconnecting;
      }
      this.device = null;
    }
  }, {
    key: "setStoreOnDisconnect",
    value: function () {
      var _setStoreOnDisconnect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              this._setStoreOnDisconnect();
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function setStoreOnDisconnect() {
        return _setStoreOnDisconnect2.apply(this, arguments);
      }
      return setStoreOnDisconnect;
    }()
  }, {
    key: "_setDevice",
    value: function _setDevice(device) {
      this.device = device;
    }
  }, {
    key: "setDevice",
    value: function () {
      var _setDevice2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(device) {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              this._setDevice(device);
            case 1:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function setDevice(_x7) {
        return _setDevice2.apply(this, arguments);
      }
      return setDevice;
    }()
  }, {
    key: "_setRetryCounts",
    value: function _setRetryCounts(retryCounts) {
      this.connectRetryCounts = retryCounts;
    }
  }, {
    key: "setRetryCounts",
    value: function () {
      var _setRetryCounts2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(retryCounts) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              this._setRetryCounts(retryCounts);
            case 1:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function setRetryCounts(_x8) {
        return _setRetryCounts2.apply(this, arguments);
      }
      return setRetryCounts;
    }()
  }, {
    key: "_setRealtimeRecoveryRetryCounts",
    value: function _setRealtimeRecoveryRetryCounts(retryCounts) {
      this.realtimeRecoveryRetryCounts = retryCounts;
    }
  }, {
    key: "setRealtimeRecoveryRetryCounts",
    value: function () {
      var _setRealtimeRecoveryRetryCounts2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(retryCounts) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              this._setRealtimeRecoveryRetryCounts(retryCounts);
            case 1:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function setRealtimeRecoveryRetryCounts(_x9) {
        return _setRealtimeRecoveryRetryCounts2.apply(this, arguments);
      }
      return setRealtimeRecoveryRetryCounts;
    }()
  }, {
    key: "incomingAudioFile",
    get: function get() {
      return this.data.incomingAudioFile;
    }
  }, {
    key: "incomingAudioDataUrl",
    get: function get() {
      return this.data.incomingAudioDataUrl;
    }
  }, {
    key: "outgoingAudioFile",
    get: function get() {
      return this.data.outgoingAudioFile;
    }
  }, {
    key: "outgoingAudioDataUrl",
    get: function get() {
      return this.data.outgoingAudioDataUrl;
    }
  }, {
    key: "_setRingtoneIntoStorage",
    value: function _setRingtoneIntoStorage(incomingAudioFile, incomingAudioDataUrl, outgoingAudioFile, outgoingAudioDataUrl) {
      this.data.incomingAudioFile = incomingAudioFile;
      this.data.incomingAudioDataUrl = incomingAudioDataUrl;
      this.data.outgoingAudioFile = outgoingAudioFile;
      this.data.outgoingAudioDataUrl = outgoingAudioDataUrl;
    }
  }, {
    key: "_setIncomingAudioIntoStorage",
    value: function _setIncomingAudioIntoStorage(fileName, dataUrl) {
      this.data.incomingAudioFile = fileName;
      this.data.incomingAudioDataUrl = dataUrl;
    }
  }, {
    key: "_resetIncomingAudio",
    value: function _resetIncomingAudio() {
      this.data.incomingAudioFile = DEFAULT_AUDIO;
      this.data.incomingAudioDataUrl = null;
    }
  }, {
    key: "_setOutgoingAudioIntoStorage",
    value: function _setOutgoingAudioIntoStorage(fileName, dataUrl) {
      this.data.outgoingAudioFile = fileName;
      this.data.outgoingAudioDataUrl = dataUrl;
    }
  }, {
    key: "_resetOutgoingAudio",
    value: function _resetOutgoingAudio() {
      this.data.outgoingAudioFile = DEFAULT_AUDIO;
      this.data.outgoingAudioDataUrl = null;
    }
  }, {
    key: "_prepareVideoElement",
    value: function _prepareVideoElement() {
      this._remoteVideo = document.createElement('video');
      this._remoteVideo.id = 'remoteVideo';
      this._remoteVideo.setAttribute('hidden', 'hidden');
      this._localVideo = document.createElement('video');
      this._localVideo.id = 'localVideo';
      this._localVideo.setAttribute('hidden', 'hidden');
      this._localVideo.setAttribute('muted', 'muted');
      this._localVideo.muted = true;
      document.body.appendChild(this._remoteVideo);
      document.body.appendChild(this._localVideo);
      this._remoteVideo.volume = this._audioSettings.callVolume;
      if (this._audioSettings.supportDevices) {
        if (this._remoteVideo.setSinkId && this._audioSettings.outputDeviceId) {
          this._remoteVideo.setSinkId(this._audioSettings.outputDeviceId);
        }
      }
    }
  }, {
    key: "_destroyVideoElement",
    value: function _destroyVideoElement() {
      if (this._remoteVideo) {
        this._remoteVideo.remove();
        this._remoteVideo = null;
      }
      if (this._localVideo) {
        this._localVideo.remove();
        this._localVideo = null;
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this3 = this;
      if (!this.disconnected) {
        this.setStateOnUnregistered();
      }
      (0, _nextCore.watch)(this, function () {
        return _this3.shouldUpdateRingtoneVolume;
      }, function () {
        if (_this3.ready && _this3._webphone && _this3._webphone.userAgent) {
          _this3._webphone.userAgent.audioHelper.setVolume(_this3._audioSettings.ringtoneVolume);
        }
      });
      (0, _nextCore.watch)(this, function () {
        return _this3._audioSettings.callVolume;
      }, function () {
        if (_this3.ready && _this3._remoteVideo) {
          _this3._remoteVideo.volume = _this3._audioSettings.callVolume;
        }
      });
      (0, _nextCore.watch)(this, function () {
        return _this3.shouldSetSinkId;
      }, function () {
        if (_this3.ready && _this3._audioSettings.supportDevices && _this3._remoteVideo && _this3._remoteVideo.setSinkId) {
          _this3._remoteVideo.setSinkId(_this3._audioSettings.outputDeviceId);
        }
      });
      (0, _nextCore.watch)(this, function () {
        return _this3.shouldSetRingtoneSinkId;
      }, function () {
        if (_this3.ready && _this3._audioSettings.supportDevices && _this3._webphone && _this3._webphone.userAgent && _this3._webphone.userAgent.audioHelper &&
        // @ts-expect-error
        _this3._webphone.userAgent.audioHelper.setDeviceId) {
          // @ts-expect-error
          _this3._webphone.userAgent.audioHelper.setDeviceId(_this3._audioSettings.ringtoneDeviceId);
        }
      });
    }
  }, {
    key: "handleListeners",
    value: function handleListeners() {
      var _this4 = this;
      if (globalThis.document) {
        if (document.readyState === 'loading') {
          window.addEventListener('load', function () {
            _this4._prepareVideoElement();
          });
        } else {
          this._prepareVideoElement();
        }
        window.addEventListener('beforeunload', function () {
          if (!_this4._webphone) {
            return;
          }
          if (Object.keys(_this4.originalSessions).length > 0) {
            return;
          }
          _this4._removedWebphoneAtBeforeUnload = true;
          // disconnect webphone at beforeunload if there are not active sessions
          _this4._disconnect();
          // set timeout to reconnect web phone is before unload cancel
          setTimeout(function () {
            _this4._removedWebphoneAtBeforeUnload = false;
            _this4.connect({
              force: true,
              skipConnectDelay: true,
              skipDLCheck: true
            });
          }, 4000);
        });
        window.addEventListener('pagehide', function () {
          // mark current instance id as inactive, so app can reuse it after refresh
          if (_this4._sipInstanceId) {
            _this4._sipInstanceManager.setInstanceInactive(_this4._sipInstanceId, _this4._auth.endpointId);
            _this4._sipInstanceId = null;
          }
          // disconnect if web phone is not disconnected at beforeunload
          if (!_this4._removedWebphoneAtBeforeUnload && (!_this4._portManager.shared || _this4._portManager.shared && _this4._portManager.isMainTab)) {
            _this4._disconnect();
          }
          _this4._destroyVideoElement();
        });
      }
    }
  }, {
    key: "shouldUpdateRingtoneVolume",
    get: function get() {
      return [this.ready, this._audioSettings.ringtoneVolume];
    }
  }, {
    key: "shouldSetRingtoneSinkId",
    get: function get() {
      return [this.ready, this._audioSettings.supportDevices, this._audioSettings.ringtoneDeviceId];
    }
  }, {
    key: "shouldSetSinkId",
    get: function get() {
      return [this.ready, this._audioSettings.supportDevices, this._audioSettings.outputDeviceId];
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this._appFeatures.ready && this._extensionFeatures.ready && this._numberValidate.ready && this._audioSettings.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._appFeatures.ready || !this._extensionFeatures.ready || !this._numberValidate.ready || !this._audioSettings.ready) && this.ready;
    }
  }, {
    key: "_sipProvision",
    value: function () {
      var _sipProvision2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var response, _t;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return this._client.service.platform().post('/restapi/v1.0/client-info/sip-provision', {
                sipInfo: [{
                  transport: 'WSS'
                }]
              });
            case 1:
              response = _context13.v;
              return _context13.a(2, response.json());
            case 2:
              _context13.p = 2;
              _t = _context13.v;
              console.error(_t, this.connectRetryCounts);
              if (!(_t && _t.message && _t.message.indexOf('Feature [WebPhone] is not available') > -1)) {
                _context13.n = 3;
                break;
              }
              this._extensionFeatures.fetchData();
              return _context13.a(2);
            case 3:
              this._onConnectError({
                errorCode: 'sipProvisionError',
                statusCode: null,
                ttl: 0
              });
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 2]]);
      }));
      function _sipProvision() {
        return _sipProvision2.apply(this, arguments);
      }
      return _sipProvision;
    }()
    /**
     * Check if the user has a digital line to make outbound calls
     *
     * @returns `true` if DL check passed, false if DL check failed
     */
  }, {
    key: "validateDeviceLines",
    value: function validateDeviceLines() {
      if (!this._auth.loggedIn) return false;
      this.logger.log('validateDeviceLines', this._extensionDevice.data);

      // when DL check failed, will not have data in extensionDevice
      if (!this._extensionDevice.data) {
        this._toast.warning({
          message: (0, _i18n.t)('checkDLError', {
            brandName: this._brand.name
          }),
          group: "".concat(this.identifier, "_dl_failed"),
          allowDuplicates: false
        });
        return false;
      }
      var phoneLines = this._extensionDevice.phoneLines;
      if (phoneLines.length === 0) {
        this._toast.warning({
          message: (0, _i18n.t)('noOutboundCallWithoutDL'),
          group: "".concat(this.identifier, "_dl_failed")
        });
        return false;
      }
      return true;
    }
  }, {
    key: "_fetchDL",
    value: function () {
      var _fetchDL2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              _context14.n = 1;
              return this._extensionDevice.fetchData();
            case 1:
              return _context14.a(2);
          }
        }, _callee14, this);
      }));
      function _fetchDL() {
        return _fetchDL2.apply(this, arguments);
      }
      return _fetchDL;
    }()
  }, {
    key: "_removeWebphone",
    value: function () {
      var _removeWebphone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        var _t2;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              if (!(!this._webphone || !this._webphone.userAgent)) {
                _context15.n = 1;
                break;
              }
              return _context15.a(2);
            case 1:
              this._stopWebphoneUserAgentPromise = this._waitUnregistered(this._webphone.userAgent);
              this._webphone.userAgent.stop();
              _context15.p = 2;
              _context15.n = 3;
              return this._stopWebphoneUserAgentPromise;
            case 3:
              _context15.n = 5;
              break;
            case 4:
              _context15.p = 4;
              _t2 = _context15.v;
              console.error(_t2);
            case 5:
              this._stopWebphoneUserAgentPromise = null;
              try {
                this._webphone.userAgent.removeAllListeners();
                this._webphone.userAgent.transport.removeAllListeners();
                if (this._webphone.userAgent.transport.isConnected()) {
                  this._webphone.userAgent.transport.disconnect();
                }
                if (this._webphone.userAgent.transport.reconnectTimer) {
                  clearTimeout(this._webphone.userAgent.transport.reconnectTimer);
                  this._webphone.userAgent.transport.reconnectTimer = undefined;
                }
                if (this._webphone.userAgent.transport.__clearSwitchBackTimer) {
                  this._webphone.userAgent.transport.__clearSwitchBackTimer();
                }
              } catch (e) {
                console.error(e);
                // ignore clean listener error
              }
              this.rcWebphoneInstance$.next(undefined);
            case 6:
              return _context15.a(2);
          }
        }, _callee15, this, [[2, 4]]);
      }));
      function _removeWebphone() {
        return _removeWebphone2.apply(this, arguments);
      }
      return _removeWebphone;
    }()
  }, {
    key: "_waitUnregistered",
    value: function _waitUnregistered(userAgent) {
      return new Promise(function (resolve, reject) {
        var timeout = setTimeout(function () {
          reject(new Error('unregistered timeout'));
        }, 2000);
        userAgent.once('unregistered', function () {
          if (timeout) {
            clearTimeout(timeout);
          }
          resolve();
        });
      });
    }
  }, {
    key: "_webphoneLogConnector",
    value: function () {
      var _webphoneLogConnector2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(level, category, label, content) {
        var _this$_browserLogger;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              // TODO: filter by log level
              (_this$_browserLogger = this._browserLogger) === null || _this$_browserLogger === void 0 ? void 0 : _this$_browserLogger.log(category, label, content);
            case 1:
              return _context16.a(2);
          }
        }, _callee16, this);
      }));
      function _webphoneLogConnector(_x0, _x1, _x10, _x11) {
        return _webphoneLogConnector2.apply(this, arguments);
      }
      return _webphoneLogConnector;
    }()
  }, {
    key: "_createWebphone",
    value: function () {
      var _createWebphone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(provisionData) {
        var _this$_webphoneOption,
          _this5 = this,
          _this$_webphoneOption2;
        var webphone;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              this.logger.log("_createWebphone", provisionData);
              _context20.n = 1;
              return this._removeWebphone();
            case 1:
              if (!this._sipInstanceId) {
                this._sipInstanceId = this._sipInstanceManager.getInstanceId(this._auth.endpointId);
              }
              webphone = new _ringcentralWebPhone["default"](provisionData, _objectSpread({
                appKey: this._webphoneOptions.appKey,
                appName: (0, _core.removeNonISO8859Chars)(this._webphoneOptions.appName),
                appVersion: this._webphoneOptions.appVersion,
                uuid: this._auth.endpointId,
                logLevel: (_this$_webphoneOption = this._webphoneOptions.webphoneLogLevel) !== null && _this$_webphoneOption !== void 0 ? _this$_webphoneOption : 2,
                // error 0, warn 1, log: 2, debug: 3
                builtinEnabled: false,
                // use custom log connector to filter out time strings as it will be duplicated
                connector: function connector() {
                  return _this5._webphoneLogConnector.apply(_this5, arguments);
                },
                audioHelper: {
                  enabled: true // enables audio feedback when web phone is ringing or making a call
                },
                media: {
                  remote: this._remoteVideo,
                  local: this._localVideo
                },
                enableQos: (0, _webphoneHelper.isChrome)(),
                enableMidLinesInSDP: (0, _webphoneHelper.isEnableMidLinesInSDP)(),
                instanceId: this._sipInstanceId,
                // reuse sip instance id to avoid 603 issue at reconnection
                autoStop: false
              }, (_this$_webphoneOption2 = this._webphoneOptions.webphoneSDKOptions) !== null && _this$_webphoneOption2 !== void 0 ? _this$_webphoneOption2 : {}));
              this.rcWebphoneInstance$.next(webphone);
              // @ts-ignore
              webphone.userAgent.audioHelper = new _AudioHelper.WebphoneAudioHelper({
                enabled: true
              });
              this.loadAudio();
              webphone.userAgent.audioHelper.setVolume(this._audioSettings.ringtoneVolume);
              // Webphone userAgent registered event
              webphone.userAgent.on('registered', function () {
                if (!_this5.connected) {
                  _this5._onWebphoneRegistered(provisionData);
                }
              });
              webphone.userAgent.on('unregistered', function (e) {
                console.log('web phone unregistered event', e);
                _this5._onWebphoneUnregistered();
              });
              webphone.userAgent.on('registrationFailed', function (response, cause) {
                console.error('Webphone Register Error:', response, cause);
                // For 401
                if (!response && cause === 'Connection Error') {
                  return;
                }
                var message = response && response.data || response;
                if (message && typeof message === 'string' && webphone.userAgent.transport.isSipErrorCode(message)) {
                  // error is handled in webphone sdk;
                  return;
                }
                // don't handled in connection is disconnecting
                if (_this5.disconnected || _this5.disconnecting) {
                  return;
                }
                var errorCode;
                // limit logic:
                /*
                 * Specialties of this flow are next:
                 *   6th WebRTC in another browser receives 6th 'EndpointID' and 1st 'InstanceID',
                 *   which has been given previously to the 1st 'EndpointID'.
                 *   It successfully registers on WSX by moving 1st 'EndpointID' to a blocklist state.
                 *   When 1st WebRTC client re-registers on expiration timeout,
                 *   WSX defines that 1st 'EndpointID' is blacklisted and responds with 'SIP/2.0 403 Forbidden,
                 *   instance id is intercepted by another registration' and remove it from block list.
                 *   So if 1st WebRTC will send re-register again with the same 'InstanceID',
                 *   it will be accepted and 6th 'EndpointID' will be blacklisted.
                 *   (But the WebRTC client must logout on receiving SIP/2.0 403 Forbidden error and in case of login -
                 *   provision again via Platform API and receive new InstanceID)
                 */
                var statusCode = response ? response.statusCode || response.status_code : null;
                switch (statusCode) {
                  // Webphone account over limit
                  case 403:
                  case 603:
                    {
                      errorCode = 'webphoneCountOverLimit';
                      break;
                    }
                  // Internal server error
                  case 500:
                    {
                      errorCode = 'internalServerError';
                      break;
                    }
                  // Timeout
                  case 504:
                    {
                      errorCode = 'serverTimeout';
                      break;
                    }
                  default:
                    {
                      errorCode = 'unknownError';
                      break;
                    }
                }
                _this5._onConnectError({
                  errorCode: errorCode,
                  statusCode: statusCode
                });
              });
              webphone.userAgent.on('invite', function (session) {
                _this5.logger.log("invite", session);
                _this5._onInvite(session);
              });
              // webphone.userAgent.on('inviteSent', (session) => {
              //   console.log('UA invite');
              //   this._addSession(session as WebphoneSession);
              // });
              // sip provision expired
              // TODO: should check that type issue in ringcentral-web-phone
              // @ts-ignore
              webphone.userAgent.on('provisionUpdate', function (e) {
                _this5.logger.log("provisionUpdate", e);
                if (Object.keys(_this5.originalSessions).length === 0) {
                  _this5._toast.warning({
                    message: (0, _i18n.t)('provisionUpdate'),
                    allowDuplicates: false,
                    group: _this5.identifier
                  });
                  _this5.connect({
                    force: true,
                    skipDLCheck: true,
                    skipConnectDelay: true
                  });
                  return;
                }
                _this5._reconnectAfterSessionEnd = {
                  reason: (0, _i18n.t)('provisionUpdate')
                };
              });
              // websocket transport connecting event
              webphone.userAgent.transport.on('connecting', /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(e) {
                  return _regenerator().w(function (_context17) {
                    while (1) switch (_context17.n) {
                      case 0:
                        _this5.logger.log("connecting", e);
                        // reconnecting event
                        if (!(_this5.connected || _this5.connectError)) {
                          _context17.n = 1;
                          break;
                        }
                        _this5._toast.warning({
                          message: (0, _i18n.t)('serverConnecting'),
                          allowDuplicates: false,
                          group: _this5.identifier
                        });
                        _context17.n = 1;
                        return _this5.setStateOnReconnect();
                      case 1:
                        return _context17.a(2);
                    }
                  }, _callee17);
                }));
                return function (_x13) {
                  return _ref2.apply(this, arguments);
                };
              }());
              // Server connection closed event after 10 time retry with primary server and backup server
              webphone.userAgent.transport.on('closed', /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(e) {
                  return _regenerator().w(function (_context18) {
                    while (1) switch (_context18.n) {
                      case 0:
                        _this5.logger.log("closed", e);
                        _context18.n = 1;
                        return _this5.setRetryCounts(20);
                      case 1:
                        _this5._onConnectError({
                          errorCode: 'connectFailed',
                          ttl: 0
                        });
                      case 2:
                        return _context18.a(2);
                    }
                  }, _callee18);
                }));
                return function (_x14) {
                  return _ref3.apply(this, arguments);
                };
              }());
              webphone.userAgent.transport.on('transportError', function (e) {
                _this5.logger.log("transportError", e);
              });
              webphone.userAgent.transport.on('wsConnectionError', /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(e) {
                  return _regenerator().w(function (_context19) {
                    while (1) switch (_context19.n) {
                      case 0:
                        _this5.logger.log("wsConnectionError", e);
                        _context19.n = 1;
                        return _this5.setConnectionStatus(_connectionStatus.connectionStatus.connectError);
                      case 1:
                        return _context19.a(2);
                    }
                  }, _callee19);
                }));
                return function (_x15) {
                  return _ref4.apply(this, arguments);
                };
              }());
              // Timeout to switch back to primary server
              webphone.userAgent.transport.on('switchBackProxy', function (e) {
                _this5.logger.log("switchBackProxy", e);
                if (Object.keys(_this5.originalSessions).length === 0) {
                  _this5.connect({
                    skipConnectDelay: true,
                    force: true,
                    skipDLCheck: true
                  });
                  return;
                }
                _this5._reconnectAfterSessionEnd = {
                  reason: null
                };
              });
            case 2:
              return _context20.a(2);
          }
        }, _callee20, this);
      }));
      function _createWebphone(_x12) {
        return _createWebphone2.apply(this, arguments);
      }
      return _createWebphone;
    }()
  }, {
    key: "_waitModuleReady",
    value: function () {
      var _waitModuleReady2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(module) {
        var timeoutMs,
          _args21 = arguments,
          _t3;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              timeoutMs = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : 30000;
              if (!(!module || module.ready)) {
                _context21.n = 1;
                break;
              }
              return _context21.a(2);
            case 1:
              _context21.p = 1;
              _context21.n = 2;
              return (0, _rxjs.firstValueFrom)(module.ready$.pipe((0, _rxjs.filter)(function (ready) {
                return Boolean(ready);
              }), (0, _rxjs.timeout)({
                each: timeoutMs,
                "with": function _with() {
                  return (0, _rxjs.throwError)(function () {
                    return new Error("Module ready timeout after ".concat(timeoutMs, "ms"));
                  });
                }
              })));
            case 2:
              _context21.n = 4;
              break;
            case 3:
              _context21.p = 3;
              _t3 = _context21.v;
              if (process.env.NODE_ENV !== 'test') {
                this.logger.warn("[".concat(this.identifier, "] > waitModuleReady failed"), _t3);
              }
            case 4:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 3]]);
      }));
      function _waitModuleReady(_x16) {
        return _waitModuleReady2.apply(this, arguments);
      }
      return _waitModuleReady;
    }()
    /**
     * Check realtime channel readiness status and log warnings if not ready
     * @returns true if both websocket and subscription are ready, false otherwise
     */
  }, {
    key: "_checkRealtimeReadiness",
    value: function _checkRealtimeReadiness(_ref5) {
      var ringCentralExtensions = _ref5.ringCentralExtensions,
        subscription = _ref5.subscription,
        shouldWaitForSubscription = _ref5.shouldWaitForSubscription,
        timeoutMs = _ref5.timeoutMs;
      var websocketReady = ringCentralExtensions.isWebSocketReady;
      var subscriptionReady = !shouldWaitForSubscription || Boolean(subscription === null || subscription === void 0 ? void 0 : subscription.subscriptionReady);
      var isReady = websocketReady && subscriptionReady;
      if (!isReady && process.env.NODE_ENV !== 'test') {
        this.logger.warn("[".concat(this.identifier, "] > realtime channel not ready after ").concat(timeoutMs, "ms"), {
          websocketReady: websocketReady,
          subscriptionReady: subscriptionReady,
          shouldWaitForSubscription: shouldWaitForSubscription
        });
      }
      return isReady;
    }
  }, {
    key: "_awaitRealtimeRecovery",
    value: function () {
      var _awaitRealtimeRecovery2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
        var _this$_webphoneOption3, _this$_webphoneOption4;
        var _ref6,
          _ref6$recover,
          recover,
          _ref6$timeout,
          timeout,
          startTime,
          ringCentralExtensions,
          moduleReadyTimeout,
          subscription,
          _elapsed,
          _remainingTimeout,
          shouldWaitForSubscription,
          readinessStreams,
          elapsed,
          remainingTimeout,
          readiness$,
          isReady,
          _args22 = arguments,
          _t4;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _ref6 = _args22.length > 0 && _args22[0] !== undefined ? _args22[0] : {}, _ref6$recover = _ref6.recover, recover = _ref6$recover === void 0 ? true : _ref6$recover, _ref6$timeout = _ref6.timeout, timeout = _ref6$timeout === void 0 ? (_this$_webphoneOption3 = (_this$_webphoneOption4 = this._webphoneOptions) === null || _this$_webphoneOption4 === void 0 ? void 0 : _this$_webphoneOption4.webSocketRecoveryTimeout) !== null && _this$_webphoneOption3 !== void 0 ? _this$_webphoneOption3 : DEFAULT_WEBSOCKET_RECOVERY_TIMEOUT : _ref6$timeout;
              if (!(process.env.NODE_ENV === 'test')) {
                _context22.n = 1;
                break;
              }
              return _context22.a(2, true);
            case 1:
              startTime = Date.now();
              ringCentralExtensions = this._ringCentralExtensions;
              if (ringCentralExtensions) {
                _context22.n = 2;
                break;
              }
              return _context22.a(2, true);
            case 2:
              // Wait for module ready with a portion of the total timeout (1/4 or max 5s)
              moduleReadyTimeout = Math.min(timeout / 4, 5000);
              _context22.n = 3;
              return this._waitModuleReady(ringCentralExtensions, moduleReadyTimeout);
            case 3:
              if (!(recover && !ringCentralExtensions.isWebSocketReady)) {
                _context22.n = 7;
                break;
              }
              _context22.p = 4;
              _context22.n = 5;
              return ringCentralExtensions.recoverWebSocketConnection();
            case 5:
              _context22.n = 7;
              break;
            case 6:
              _context22.p = 6;
              _t4 = _context22.v;
              if (process.env.NODE_ENV !== 'test') {
                this.logger.warn("[".concat(this.identifier, "] > recoverWebSocketConnection failed"), _t4);
              }
            case 7:
              subscription = this._subscription;
              if (!subscription) {
                _context22.n = 8;
                break;
              }
              _elapsed = Date.now() - startTime;
              _remainingTimeout = Math.max(timeout - _elapsed, 1000);
              _context22.n = 8;
              return this._waitModuleReady(subscription, _remainingTimeout);
            case 8:
              shouldWaitForSubscription = !!subscription && (subscription.filters.length > 0 || Boolean(subscription.subscriptionInfo));
              readinessStreams = [(0, _nextCore.fromWatchValue)(ringCentralExtensions, function () {
                return ringCentralExtensions.isWebSocketReady;
              }).pipe((0, _rxjs.filter)(Boolean), (0, _rxjs.map)(function () {
                return true;
              }))];
              if (shouldWaitForSubscription && subscription) {
                readinessStreams.push((0, _nextCore.fromWatchValue)(subscription, function () {
                  return subscription.subscriptionReady;
                }).pipe((0, _rxjs.filter)(Boolean), (0, _rxjs.map)(function () {
                  return true;
                })));
              }

              // Calculate remaining timeout for the final readiness check
              elapsed = Date.now() - startTime;
              remainingTimeout = Math.max(timeout - elapsed, 0);
              if (!(remainingTimeout === 0)) {
                _context22.n = 9;
                break;
              }
              return _context22.a(2, this._checkRealtimeReadiness({
                ringCentralExtensions: ringCentralExtensions,
                subscription: subscription,
                shouldWaitForSubscription: shouldWaitForSubscription,
                timeoutMs: timeout
              }));
            case 9:
              readiness$ = (0, _rxjs.combineLatest)(readinessStreams).pipe((0, _rxjs.map)(function () {
                return true;
              }));
              _context22.n = 10;
              return (0, _rxjs.firstValueFrom)((0, _rxjs.race)([readiness$, (0, _rxjs.timer)(remainingTimeout).pipe((0, _rxjs.map)(function () {
                return false;
              }))]));
            case 10:
              isReady = _context22.v;
              if (isReady) {
                _context22.n = 11;
                break;
              }
              return _context22.a(2, this._checkRealtimeReadiness({
                ringCentralExtensions: ringCentralExtensions,
                subscription: subscription,
                shouldWaitForSubscription: shouldWaitForSubscription,
                timeoutMs: timeout
              }));
            case 11:
              return _context22.a(2, true);
          }
        }, _callee22, this, [[4, 6]]);
      }));
      function _awaitRealtimeRecovery() {
        return _awaitRealtimeRecovery2.apply(this, arguments);
      }
      return _awaitRealtimeRecovery;
    }() // eslint-disable-next-line
  }, {
    key: "_onInvite",
    value: function () {
      var _onInvite2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(session) {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              return _context23.a(2);
          }
        }, _callee23);
      }));
      function _onInvite(_x17) {
        return _onInvite2.apply(this, arguments);
      }
      return _onInvite;
    }()
  }, {
    key: "_connect",
    value: function () {
      var _connect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
        var sipProvision;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              this.logger.log('_connect');
              if (this._auth.loggedIn) {
                _context24.n = 1;
                break;
              }
              return _context24.a(2);
            case 1:
              _context24.n = 2;
              return this._sipProvision();
            case 2:
              sipProvision = _context24.v;
              if (!sipProvision) {
                _context24.n = 3;
                break;
              }
              _context24.n = 3;
              return this._createWebphone(sipProvision);
            case 3:
              return _context24.a(2);
          }
        }, _callee24, this);
      }));
      function _connect() {
        return _connect2.apply(this, arguments);
      }
      return _connect;
    }()
  }, {
    key: "_isAvailableToConnect",
    value: function _isAvailableToConnect(_ref7) {
      var force = _ref7.force;
      this.logger.log('check available to connect', {
        loggedIn: this._auth.loggedIn,
        force: force,
        enabled: this.enabled,
        connectionStatus: this.connectionStatus
      });
      if (!this.enabled || !this._auth.loggedIn) {
        return false;
      }
      // do not connect if it is connecting
      // do not reconnect when user disconnected
      if (this.connecting || this.disconnecting || this.inactiveDisconnecting || this.reconnecting) {
        return false;
      }
      // do not connect when connected unless force
      if (!force && this.connected) {
        return false;
      }
      return true;
    }

    /**
     * connect a web phone.
     */
  }, {
    key: "connect",
    value: (function () {
      var _connect3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25() {
        var _connectDelay,
          _this6 = this;
        var _ref8,
          _ref8$force,
          force,
          _ref8$skipTimeout,
          skipTimeout,
          _ref8$skipConnectDela,
          skipConnectDelay,
          _ref8$skipDLCheck,
          skipDLCheck,
          shouldRecover,
          realtimeReady,
          nextRealtimeRetryCounts,
          retryDelay,
          isAvailableToConnect,
          connectDelay,
          connectTimeoutTTL,
          _args25 = arguments;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              _ref8 = _args25.length > 0 && _args25[0] !== undefined ? _args25[0] : {}, _ref8$force = _ref8.force, force = _ref8$force === void 0 ? false : _ref8$force, _ref8$skipTimeout = _ref8.skipTimeout, skipTimeout = _ref8$skipTimeout === void 0 ? true : _ref8$skipTimeout, _ref8$skipConnectDela = _ref8.skipConnectDelay, skipConnectDelay = _ref8$skipConnectDela === void 0 ? false : _ref8$skipConnectDela, _ref8$skipDLCheck = _ref8.skipDLCheck, skipDLCheck = _ref8$skipDLCheck === void 0 ? false : _ref8$skipDLCheck;
              this.logger.log('connect', {
                force: force,
                skipTimeout: skipTimeout,
                skipConnectDelay: skipConnectDelay,
                skipDLCheck: skipDLCheck
              });
              if ((0, _webphoneHelper.isBrowserSupport)()) {
                _context25.n = 2;
                break;
              }
              _context25.n = 1;
              return this.setStateOnConnectError('browserNotSupported', null);
            case 1:
              this._toast.warning({
                message: (0, _i18n.t)('browserNotSupported'),
                group: this.identifier,
                ttl: 0
              });
              return _context25.a(2);
            case 2:
              this.logger.log('wait for loggedIn');
              _context25.n = 3;
              return (0, _rxjs.firstValueFrom)(this._auth.isLoggedIn$);
            case 3:
              _context25.n = 4;
              return (0, _rxjs.firstValueFrom)(this._extensionFeatures.dataReady$);
            case 4:
              this._clearRealtimeRecoveryRetryTimeout();
              shouldRecover = !!this._ringCentralExtensions && !this._ringCentralExtensions.isWebSocketReady;
              _context25.n = 5;
              return this._awaitRealtimeRecovery({
                recover: shouldRecover
              });
            case 5:
              realtimeReady = _context25.v;
              if (realtimeReady) {
                _context25.n = 10;
                break;
              }
              this.logger.warn('WSG WebSocket connection not ready');
              nextRealtimeRetryCounts = this.realtimeRecoveryRetryCounts + 1;
              _context25.n = 6;
              return this.setRealtimeRecoveryRetryCounts(nextRealtimeRetryCounts);
            case 6:
              if (!(nextRealtimeRetryCounts <= REALTIME_RECOVERY_QUICK_RETRY_LIMIT)) {
                _context25.n = 7;
                break;
              }
              // First few attempts: quick retry without showing error
              this.logger.log("WebSocket timeout, quick retry (attempt ".concat(nextRealtimeRetryCounts, ")"));
              this.connect({
                skipDLCheck: true,
                skipConnectDelay: true,
                skipTimeout: false
              });
              _context25.n = 9;
              break;
            case 7:
              // After multiple failures: show error and retry in background
              this.logger.warn("WebSocket timeout after ".concat(nextRealtimeRetryCounts, " attempts, showing error and retrying in background"));
              _context25.n = 8;
              return this.setStateOnConnectError('connectFailed', null);
            case 8:
              this.showErrorToast({
                errorCode: 'serverConnecting',
                isConnecting: false
              });

              // Delayed background retry
              retryDelay = this._getConnectTimeoutTtl();
              this.logger.log("Will retry in ".concat(retryDelay, "ms"));
              this._scheduleRealtimeRecoveryRetry(retryDelay);
            case 9:
              return _context25.a(2);
            case 10:
              _context25.n = 11;
              return this.setRealtimeRecoveryRetryCounts(0);
            case 11:
              isAvailableToConnect = this._isAvailableToConnect({
                force: force
              });
              this.logger.log('isAvailableToConnect', isAvailableToConnect);
              if (isAvailableToConnect) {
                _context25.n = 12;
                break;
              }
              return _context25.a(2);
            case 12:
              if (!(this.connectError || force)) {
                _context25.n = 14;
                break;
              }
              _context25.n = 13;
              return this.setStateOnReconnect();
            case 13:
              _context25.n = 15;
              break;
            case 14:
              _context25.n = 15;
              return this.setStateOnConnect();
            case 15:
              connectDelay = (_connectDelay = this._webphoneOptions.connectDelay) !== null && _connectDelay !== void 0 ? _connectDelay : 0;
              this.logger.log('connect to webphone delay', {
                skipConnectDelay: skipConnectDelay,
                connectDelay: connectDelay
              });
              if (!(!skipConnectDelay && connectDelay > 0)) {
                _context25.n = 16;
                break;
              }
              _context25.n = 16;
              return (0, _utils.sleep)(connectDelay);
            case 16:
              if (skipDLCheck) {
                _context25.n = 18;
                break;
              }
              if (!(process.env.THEME_SYSTEM !== 'spring-ui')) {
                _context25.n = 17;
                break;
              }
              _context25.n = 17;
              return this._fetchDL();
            case 17:
              this.validateDeviceLines();
            case 18:
              this.logger.log('before connect check the connect status', {
                connectionStatus: this.connectionStatus,
                loggedIn: this._auth.loggedIn
              });
              if (!(this.disconnected || this.disconnecting || !this._auth.loggedIn)) {
                _context25.n = 19;
                break;
              }
              return _context25.a(2);
            case 19:
              if (this._connectTimeout) {
                clearTimeout(this._connectTimeout);
              }
              this.logger.log('before connect check the connect status', {
                connectionStatus: this.connectionStatus,
                loggedIn: this._auth.loggedIn,
                skipTimeout: skipTimeout
              });
              if (!(force || skipTimeout)) {
                _context25.n = 21;
                break;
              }
              _context25.n = 20;
              return this._connect();
            case 20:
              return _context25.a(2);
            case 21:
              connectTimeoutTTL = this._getConnectTimeoutTtl();
              this.logger.log('before connect timeout TTL', {
                connectTimeoutTTL: connectTimeoutTTL
              });
              this._connectTimeout = setTimeout(function () {
                _this6._connectTimeout = null;
                _this6._connect();
              }, connectTimeoutTTL);
            case 22:
              return _context25.a(2);
          }
        }, _callee25, this);
      }));
      function connect() {
        return _connect3.apply(this, arguments);
      }
      return connect;
    }())
  }, {
    key: "_getConnectTimeoutTtl",
    value: function _getConnectTimeoutTtl() {
      return this._reconnectDelays[Math.min(this.connectRetryCounts, this._reconnectDelays.length - 1)];
    }
  }, {
    key: "_clearRealtimeRecoveryRetryTimeout",
    value: function _clearRealtimeRecoveryRetryTimeout() {
      if (this._realtimeRecoveryRetryTimeout) {
        clearTimeout(this._realtimeRecoveryRetryTimeout);
        this._realtimeRecoveryRetryTimeout = null;
      }
    }
  }, {
    key: "_scheduleRealtimeRecoveryRetry",
    value: function _scheduleRealtimeRecoveryRetry(delay) {
      var _this7 = this;
      this._clearRealtimeRecoveryRetryTimeout();
      this._realtimeRecoveryRetryTimeout = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26() {
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              _this7._realtimeRecoveryRetryTimeout = null;
              if (_this7.connectError && _this7._auth.loggedIn) {
                _this7.connect({
                  skipConnectDelay: true,
                  force: true,
                  skipDLCheck: true
                });
              }
            case 1:
              return _context26.a(2);
          }
        }, _callee26);
      })), delay);
    }
  }, {
    key: "showErrorToast",
    value: function showErrorToast(_ref0) {
      var _this8 = this;
      var errorCode = _ref0.errorCode,
        _ref0$statusCode = _ref0.statusCode,
        statusCode = _ref0$statusCode === void 0 ? this.statusCode : _ref0$statusCode,
        ttl = _ref0.ttl,
        _ref0$isConnecting = _ref0.isConnecting,
        isConnecting = _ref0$isConnecting === void 0 ? false : _ref0$isConnecting;
      var message = function () {
        if (errorCode === 'sipProvisionError' || errorCode === 'webphoneForbidden' || errorCode === 'requestTimeout' || errorCode === 'serverTimeout' || errorCode === 'internalServerError' || errorCode === 'unknownError') {
          if (statusCode && isConnecting) {
            return (0, _i18n.t)('registeringWithStatusCode', {
              errorCode: statusCode,
              brandName: _this8._brand.name
            });
          }
          if (statusCode) {
            return (0, _i18n.t)('failWithStatusCode', {
              errorCode: statusCode,
              brandName: _this8._brand.name
            });
          }
          if (isConnecting) {
            return (0, _i18n.t)('registeringWithoutStatusCode', {
              brandName: _this8._brand.name
            });
          }
          return (0, _i18n.t)('failWithoutStatusCode', {
            brandName: _this8._brand.name
          });
        }
        return (0, _i18n.t)(errorCode);
      }();
      return this._toast.danger({
        message: message,
        ttl: ttl,
        allowDuplicates: false,
        group: "".concat(this.identifier, "_").concat(isConnecting ? 'connecting' : 'failed')
      });
    }
  }, {
    key: "_onConnectError",
    value: function () {
      var _onConnectError2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(_ref1) {
        var errorCode, statusCode, ttl;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              errorCode = _ref1.errorCode, statusCode = _ref1.statusCode, ttl = _ref1.ttl;
              if (statusCode === 403 && this._sipInstanceId) {
                // recreate sip instance id if server send 403
                this._sipInstanceId = null;
              }
              if (!(this.connectRetryCounts > 2 || this.reconnecting || this.connected || this.connectError)) {
                _context27.n = 5;
                break;
              }
              _context27.n = 1;
              return this.setStateOnConnectError(errorCode, statusCode);
            case 1:
              this.showErrorToast({
                ttl: ttl,
                errorCode: errorCode,
                statusCode: statusCode,
                isConnecting: false
              });
              _context27.n = 2;
              return this._hideConnectingAlert();
            case 2:
              _context27.n = 3;
              return (0, _utils.sleep)(this._getConnectTimeoutTtl());
            case 3:
              if (this.connectError) {
                _context27.n = 4;
                break;
              }
              return _context27.a(2);
            case 4:
              this.connect({
                skipConnectDelay: true,
                force: true,
                skipDLCheck: true
              });
              return _context27.a(2);
            case 5:
              _context27.n = 6;
              return this.setStateOnConnectFailed(errorCode, statusCode);
            case 6:
              if (!(this.connectRetryCounts === 1)) {
                _context27.n = 7;
                break;
              }
              this.showErrorToast({
                ttl: ttl,
                errorCode: errorCode,
                statusCode: statusCode,
                isConnecting: true
              });
              _context27.n = 7;
              return this._hideConnectFailedAlert();
            case 7:
              this.connect({
                skipDLCheck: true,
                skipConnectDelay: true,
                skipTimeout: false
              });
            case 8:
              return _context27.a(2);
          }
        }, _callee27, this);
      }));
      function _onConnectError(_x18) {
        return _onConnectError2.apply(this, arguments);
      }
      return _onConnectError;
    }()
  }, {
    key: "_onWebphoneRegistered",
    value: function () {
      var _onWebphoneRegistered2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(provisionData) {
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              _context28.n = 1;
              return this.setStateOnRegistered(provisionData.device);
            case 1:
              _context28.n = 2;
              return this._hideRegisterErrorAlert();
            case 2:
              _context28.n = 3;
              return this._awaitRealtimeRecovery();
            case 3:
              this._eventEmitter.emit(_events2.EVENTS.webphoneRegistered);
            case 4:
              return _context28.a(2);
          }
        }, _callee28, this);
      }));
      function _onWebphoneRegistered(_x19) {
        return _onWebphoneRegistered2.apply(this, arguments);
      }
      return _onWebphoneRegistered;
    }()
  }, {
    key: "_onWebphoneUnregistered",
    value: function () {
      var _onWebphoneUnregistered2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29() {
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              if (!(this.disconnecting || this.inactiveDisconnecting || this.disconnected || this.inactive || !!this._stopWebphoneUserAgentPromise)) {
                _context29.n = 1;
                break;
              }
              return _context29.a(2);
            case 1:
              _context29.n = 2;
              return this.setStateOnConnectError();
            case 2:
              this._eventEmitter.emit(_events2.EVENTS.webphoneUnregistered);
            case 3:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function _onWebphoneUnregistered() {
        return _onWebphoneUnregistered2.apply(this, arguments);
      }
      return _onWebphoneUnregistered;
    }()
  }, {
    key: "_disconnectToInactive",
    value: function () {
      var _disconnectToInactive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30() {
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              _context30.n = 1;
              return this.setConnectionStatus(_connectionStatus.connectionStatus.inactiveDisconnecting);
            case 1:
              _context30.n = 2;
              return this.setDevice(null);
            case 2:
              _context30.n = 3;
              return this._removeWebphone();
            case 3:
              _context30.n = 4;
              return this.setStateWhenUnregisteredOnInactive();
            case 4:
              return _context30.a(2);
          }
        }, _callee30, this);
      }));
      function _disconnectToInactive() {
        return _disconnectToInactive2.apply(this, arguments);
      }
      return _disconnectToInactive;
    }()
  }, {
    key: "_hideConnectingAlert",
    value: function () {
      var _hideConnectingAlert2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31() {
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              _context31.n = 1;
              return this._toast.dismissByGroup(["".concat(this.identifier, "_connecting")]);
            case 1:
              return _context31.a(2);
          }
        }, _callee31, this);
      }));
      function _hideConnectingAlert() {
        return _hideConnectingAlert2.apply(this, arguments);
      }
      return _hideConnectingAlert;
    }()
  }, {
    key: "_hideConnectFailedAlert",
    value: function () {
      var _hideConnectFailedAlert2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32() {
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              _context32.n = 1;
              return this._toast.dismissByGroup(["".concat(this.identifier, "_failed")]);
            case 1:
              return _context32.a(2);
          }
        }, _callee32, this);
      }));
      function _hideConnectFailedAlert() {
        return _hideConnectFailedAlert2.apply(this, arguments);
      }
      return _hideConnectFailedAlert;
    }()
  }, {
    key: "_hideRegisterErrorAlert",
    value: function () {
      var _hideRegisterErrorAlert2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33() {
        var identifier;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.n) {
            case 0:
              identifier = this.identifier;
              _context33.n = 1;
              return this._toast.dismissByGroup([identifier, "".concat(identifier, "_failed"), "".concat(identifier, "_connecting")]);
            case 1:
              return _context33.a(2);
          }
        }, _callee33, this);
      }));
      function _hideRegisterErrorAlert() {
        return _hideRegisterErrorAlert2.apply(this, arguments);
      }
      return _hideRegisterErrorAlert;
    }()
  }, {
    key: "_disconnect",
    value: function () {
      var _disconnect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34() {
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              if (!(this.disconnected || this.disconnecting)) {
                _context34.n = 1;
                break;
              }
              return _context34.a(2);
            case 1:
              if (this._connectTimeout) {
                clearTimeout(this._connectTimeout);
              }
              // this method will send event through webphone socket to ensure the webphone is disconnected, we must ensure not await this method to avoid the `_removeWebphone` event not trigger in sync when pagehide
              this.setStoreOnDisconnect();
              if (!this._webphone) {
                _context34.n = 2;
                break;
              }
              _context34.n = 2;
              return this._removeWebphone();
            case 2:
              _context34.n = 3;
              return this.setStateOnUnregistered();
            case 3:
              return _context34.a(2);
          }
        }, _callee34, this);
      }));
      function _disconnect() {
        return _disconnect2.apply(this, arguments);
      }
      return _disconnect;
    }()
  }, {
    key: "disableMainClient",
    value: function () {
      var _disableMainClient = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35() {
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.n) {
            case 0:
              this.isMainClient = false;
            case 1:
              return _context35.a(2);
          }
        }, _callee35, this);
      }));
      function disableMainClient() {
        return _disableMainClient.apply(this, arguments);
      }
      return disableMainClient;
    }()
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36() {
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              this._sipInstanceId = null;
              _context36.n = 1;
              return this._disconnect();
            case 1:
              return _context36.a(2);
          }
        }, _callee36, this);
      }));
      function disconnect() {
        return _disconnect3.apply(this, arguments);
      }
      return disconnect;
    }()
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      if (this._webphone && this._webphone.userAgent && this._webphone.userAgent.audioHelper) {
        this._webphone.userAgent.audioHelper.loadAudio({
          incoming: this.incomingAudio,
          outgoing: this.outgoingAudio
        });
        // @ts-expect-error
        this._webphone.userAgent.audioHelper.setDeviceId(this._audioSettings.ringtoneDeviceId);
      }
    }
  }, {
    key: "setOutgoingAudio",
    value: function () {
      var _setOutgoingAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(_ref10) {
        var fileName, dataUrl;
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.n) {
            case 0:
              fileName = _ref10.fileName, dataUrl = _ref10.dataUrl;
              // TODO: validate filePath?
              this._setOutgoingAudioIntoStorage(fileName, dataUrl);
              this.loadAudio();
            case 1:
              return _context37.a(2);
          }
        }, _callee37, this);
      }));
      function setOutgoingAudio(_x20) {
        return _setOutgoingAudio.apply(this, arguments);
      }
      return setOutgoingAudio;
    }()
  }, {
    key: "resetOutgoingAudio",
    value: function () {
      var _resetOutgoingAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38() {
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.n) {
            case 0:
              this._resetOutgoingAudio();
              this.loadAudio();
            case 1:
              return _context38.a(2);
          }
        }, _callee38, this);
      }));
      function resetOutgoingAudio() {
        return _resetOutgoingAudio2.apply(this, arguments);
      }
      return resetOutgoingAudio;
    }()
  }, {
    key: "setIncomingAudio",
    value: function () {
      var _setIncomingAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(_ref11) {
        var fileName, dataUrl;
        return _regenerator().w(function (_context39) {
          while (1) switch (_context39.n) {
            case 0:
              fileName = _ref11.fileName, dataUrl = _ref11.dataUrl;
              // TODO: validate filePath?
              this._setIncomingAudioIntoStorage(fileName, dataUrl);
              this.loadAudio();
            case 1:
              return _context39.a(2);
          }
        }, _callee39, this);
      }));
      function setIncomingAudio(_x21) {
        return _setIncomingAudio.apply(this, arguments);
      }
      return setIncomingAudio;
    }()
  }, {
    key: "setIncomingAudioIntoStorage",
    value: function () {
      var _setIncomingAudioIntoStorage2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(_ref12) {
        var fileName, dataUrl;
        return _regenerator().w(function (_context40) {
          while (1) switch (_context40.n) {
            case 0:
              fileName = _ref12.fileName, dataUrl = _ref12.dataUrl;
              this._setIncomingAudioIntoStorage(fileName, dataUrl);
            case 1:
              return _context40.a(2);
          }
        }, _callee40, this);
      }));
      function setIncomingAudioIntoStorage(_x22) {
        return _setIncomingAudioIntoStorage2.apply(this, arguments);
      }
      return setIncomingAudioIntoStorage;
    }()
  }, {
    key: "loadClientAudio",
    value: function () {
      var _loadClientAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41() {
        return _regenerator().w(function (_context41) {
          while (1) switch (_context41.n) {
            case 0:
              this.loadAudio();
            case 1:
              return _context41.a(2);
          }
        }, _callee41, this);
      }));
      function loadClientAudio() {
        return _loadClientAudio.apply(this, arguments);
      }
      return loadClientAudio;
    }()
  }, {
    key: "resetIncomingAudio",
    value: function () {
      var _resetIncomingAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42() {
        return _regenerator().w(function (_context42) {
          while (1) switch (_context42.n) {
            case 0:
              this._resetIncomingAudio();
              this.loadAudio();
            case 1:
              return _context42.a(2);
          }
        }, _callee42, this);
      }));
      function resetIncomingAudio() {
        return _resetIncomingAudio2.apply(this, arguments);
      }
      return resetIncomingAudio;
    }()
  }, {
    key: "setRingtone",
    value: function () {
      var _setRingtone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43(_ref13) {
        var incomingAudio, incomingAudioFile, outgoingAudio, outgoingAudioFile, isIncomingDefault, isOutgoingDefault;
        return _regenerator().w(function (_context43) {
          while (1) switch (_context43.n) {
            case 0:
              incomingAudio = _ref13.incomingAudio, incomingAudioFile = _ref13.incomingAudioFile, outgoingAudio = _ref13.outgoingAudio, outgoingAudioFile = _ref13.outgoingAudioFile;
              isIncomingDefault = incomingAudioFile === DEFAULT_AUDIO && incomingAudio === _incoming["default"];
              isOutgoingDefault = outgoingAudioFile === DEFAULT_AUDIO && outgoingAudio === _outgoing["default"];
              this._setRingtoneIntoStorage(isIncomingDefault ? DEFAULT_AUDIO : incomingAudioFile, isIncomingDefault ? null : incomingAudio, isOutgoingDefault ? DEFAULT_AUDIO : outgoingAudioFile, isOutgoingDefault ? null : outgoingAudio);
              this.loadAudio();
            case 1:
              return _context43.a(2);
          }
        }, _callee43, this);
      }));
      function setRingtone(_x23) {
        return _setRingtone.apply(this, arguments);
      }
      return setRingtone;
    }()
    /**
     * !! It can only be called in a non-shared shared worker.
     */
  }, {
    key: "originalSessions",
    get: function get() {
      var _this$_webphone$userA, _this$_webphone;
      if (process.env.NODE_ENV === 'development' && this._portManager.isWorkerMode && this._portManager.isServer) {
        console.error("originalSessions can only be called in a non-shared shared worker.");
      }
      return (_this$_webphone$userA = (_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.userAgent.sessions) !== null && _this$_webphone$userA !== void 0 ? _this$_webphone$userA : {};
    }

    // for backward compatibility v1
  }, {
    key: "_sessions",
    get: function get() {
      return new Map(Object.entries(this.originalSessions));
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._appFeatures.isWebPhoneEnabled;
    }
  }, {
    key: "disconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.disconnecting;
    }
  }, {
    key: "inactiveDisconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.inactiveDisconnecting;
    }
  }, {
    key: "inactive",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.inactive;
    }
  }, {
    key: "connecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connecting;
    }
  }, {
    key: "reconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.reconnecting;
    }
  }, {
    key: "connected",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connected;
    }
  }, {
    key: "disconnected",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.disconnected;
    }
  }, {
    key: "connectFailed",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connectFailed;
    }
  }, {
    key: "connectError",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connectError;
    }

    /*
     * Together with `CallingSettings` module to check if webphone is
     * Unavailable.
     */
  }, {
    key: "isUnavailable",
    get: function get() {
      return this.ready && this._auth.loggedIn && (!this._audioSettings.userMedia || this.reconnecting || this.connectError || this.inactive);
    }
  }, {
    key: "incomingAudio",
    get: function get() {
      // support turn off ringtone
      if (this.incomingAudioDataUrl === '') {
        return '';
      }
      return this.incomingAudioDataUrl || this.defaultIncomingAudio;
    }
  }, {
    key: "outgoingAudio",
    get: function get() {
      return this.outgoingAudioDataUrl || this.defaultOutgoingAudio;
    }
  }, {
    key: "defaultIncomingAudio",
    get: function get() {
      return _incoming["default"];
    }
  }, {
    key: "defaultOutgoingAudio",
    get: function get() {
      return _outgoing["default"];
    }
  }, {
    key: "defaultIncomingAudioFile",
    get: function get() {
      return DEFAULT_AUDIO;
    }
  }, {
    key: "defaultOutgoingAudioFile",
    get: function get() {
      return DEFAULT_AUDIO;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_browserLogger", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "_beforeLogout", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "_beforeLogout"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "connectionStatus", [_nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _connectionStatus.connectionStatus.disconnected;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "connectRetryCounts", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "realtimeRecoveryRetryCounts", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "errorCode", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "statusCode", [_nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "device", [_nextCore.state, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setConnectionStatus", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_setConnectionStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectionStatus", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectionStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnectError", [_nextCore.action, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnConnectError", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnConnectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnectFailed", [_nextCore.action, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnectFailed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnConnectFailed", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnConnectFailed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnect", [_nextCore.action, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnConnect", [_dec30, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnReconnect", [_nextCore.action, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnReconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnReconnect", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnReconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnRegistered", [_dec38, _nextCore.action, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnRegistered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnRegistered", [_dec41, _dec42, _dec43], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnRegistered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnUnregistered", [_nextCore.action, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnUnregistered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnUnregistered", [_dec46, _dec47, _dec48], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnUnregistered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateWhenUnregisteredOnInactive", [_nextCore.action, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateWhenUnregisteredOnInactive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateWhenUnregisteredOnInactive", [_dec51, _dec52, _dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateWhenUnregisteredOnInactive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStoreOnDisconnect", [_nextCore.action, _dec54, _dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStoreOnDisconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStoreOnDisconnect", [_dec56, _dec57, _dec58], Object.getOwnPropertyDescriptor(_class2.prototype, "setStoreOnDisconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setDevice", [_nextCore.action, _dec59, _dec60], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDevice"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDevice", [_dec61, _dec62, _dec63], Object.getOwnPropertyDescriptor(_class2.prototype, "setDevice"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setRetryCounts", [_nextCore.action, _dec64, _dec65], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRetryCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRetryCounts", [_dec66, _dec67, _dec68], Object.getOwnPropertyDescriptor(_class2.prototype, "setRetryCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setRealtimeRecoveryRetryCounts", [_nextCore.action, _dec69, _dec70], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRealtimeRecoveryRetryCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRealtimeRecoveryRetryCounts", [_dec71, _dec72, _dec73], Object.getOwnPropertyDescriptor(_class2.prototype, "setRealtimeRecoveryRetryCounts"), _class2.prototype), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "data", [_nextCore.storage, _nextCore.state, _dec74], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      incomingAudioFile: DEFAULT_AUDIO,
      incomingAudioDataUrl: null,
      outgoingAudioFile: DEFAULT_AUDIO,
      outgoingAudioDataUrl: null
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setRingtoneIntoStorage", [_nextCore.action, _dec75, _dec76], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRingtoneIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setIncomingAudioIntoStorage", [_nextCore.action, _dec77, _dec78], Object.getOwnPropertyDescriptor(_class2.prototype, "_setIncomingAudioIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetIncomingAudio", [_nextCore.action, _dec79, _dec80], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setOutgoingAudioIntoStorage", [_nextCore.action, _dec81, _dec82], Object.getOwnPropertyDescriptor(_class2.prototype, "_setOutgoingAudioIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetOutgoingAudio", [_nextCore.action, _dec83, _dec84], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldUpdateRingtoneVolume", [_dec85, _dec86, _dec87], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldUpdateRingtoneVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldSetRingtoneSinkId", [_dec88, _dec89, _dec90], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldSetRingtoneSinkId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldSetSinkId", [_dec91, _dec92, _dec93], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldSetSinkId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sipProvision", [_dec94, _dec95, _dec96], Object.getOwnPropertyDescriptor(_class2.prototype, "_sipProvision"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchDL", [_dec97, _dec98, _dec99], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchDL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_webphoneLogConnector", [_dec100, _dec101, _dec102], Object.getOwnPropertyDescriptor(_class2.prototype, "_webphoneLogConnector"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_connect", [_dec103, _dec104, _dec105], Object.getOwnPropertyDescriptor(_class2.prototype, "_connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_dec106, _dec107, _dec108], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onConnectError", [_dec109, _dec110, _dec111], Object.getOwnPropertyDescriptor(_class2.prototype, "_onConnectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disableMainClient", [_dec112, _dec113, _dec114], Object.getOwnPropertyDescriptor(_class2.prototype, "disableMainClient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disconnect", [_dec115, _dec116, _dec117], Object.getOwnPropertyDescriptor(_class2.prototype, "disconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOutgoingAudio", [_dec118, _dec119, _dec120], Object.getOwnPropertyDescriptor(_class2.prototype, "setOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetOutgoingAudio", [_dec121, _dec122, _dec123], Object.getOwnPropertyDescriptor(_class2.prototype, "resetOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIncomingAudio", [_dec124, _dec125, _dec126], Object.getOwnPropertyDescriptor(_class2.prototype, "setIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIncomingAudioIntoStorage", [_dec127, _dec128, _dec129], Object.getOwnPropertyDescriptor(_class2.prototype, "setIncomingAudioIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadClientAudio", [_dec130, _dec131, _dec132], Object.getOwnPropertyDescriptor(_class2.prototype, "loadClientAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetIncomingAudio", [_dec133, _dec134, _dec135], Object.getOwnPropertyDescriptor(_class2.prototype, "resetIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRingtone", [_dec136, _dec137, _dec138], Object.getOwnPropertyDescriptor(_class2.prototype, "setRingtone"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=WebphoneBase.js.map
