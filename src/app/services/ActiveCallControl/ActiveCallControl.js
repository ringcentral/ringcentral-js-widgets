"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAXIMUM_CONF_PARTICIPANTS = exports.ActiveCallControl = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.timers.js");
var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");
var _subscriptionFilters = require("@ringcentral-integration/commons/enums/subscriptionFilters");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _validateNumbers = require("@ringcentral-integration/commons/lib/validateNumbers");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _LeaveConferenceCall = require("@ringcentral-integration/widgets/components/CallLogCallCtrlComponent/LeaveConferenceCall");
var _react = _interopRequireDefault(require("react"));
var _ringcentralCallControl = require("ringcentral-call-control");
var _Session = require("ringcentral-call-control/lib/Session");
var _rxjs = require("rxjs");
var _CallingSettings = require("../CallingSettings");
var _PreinsertCall = require("../PreinsertCall");
var _Webphone = require("../Webphone");
var _webphoneHelper = require("../Webphone/webphoneHelper");
var _callControlEvents = require("./callControlEvents");
var _helpers = require("./helpers");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _dec125, _dec126, _dec127, _dec128, _dec129, _dec130, _dec131, _dec132, _dec133, _dec134, _dec135, _dec136, _dec137, _dec138, _dec139, _dec140, _dec141, _dec142, _dec143, _dec144, _dec145, _dec146, _dec147, _dec148, _dec149, _dec150, _dec151, _dec152, _dec153, _dec154, _dec155, _dec156, _dec157, _dec158, _dec159, _dec160, _dec161, _dec162, _dec163, _dec164, _dec165, _dec166, _dec167, _dec168, _dec169, _dec170, _dec171, _dec172, _dec173, _dec174, _dec175, _dec176, _dec177, _dec178, _dec179, _dec180, _dec181, _dec182, _dec183, _dec184, _dec185, _dec186, _dec187, _dec188, _dec189, _dec190, _dec191, _dec192, _dec193, _dec194, _dec195, _dec196, _dec197, _dec198, _dec199, _dec200, _dec201, _dec202, _dec203, _dec204, _dec205, _dec206, _dec207, _dec208, _dec209, _dec210, _dec211, _dec212, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var DEFAULT_BUSY_TIMEOUT = 3 * 1000;
var DEFAULT_CONF_ACCEPT_TIMEOUT = 5 * 1000;
var MAXIMUM_CONF_PARTICIPANTS = exports.MAXIMUM_CONF_PARTICIPANTS = 10;
var telephonySessionsEndPoint = /\/telephony\/sessions$/;
var startRingEndPoint = /start-ring$/;
var stopRingEndPoint = /stop-ring$/;
var ActiveCallControl = exports.ActiveCallControl = (_dec = (0, _nextCore.injectable)({
  name: 'ActiveCallControl'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('Subscription')(target, undefined, 8);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('Prefix')(target, undefined, 18);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 19);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 20);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)('ActiveCallControlOptions')(target, undefined, 21);
}, _dec7 = function _dec7(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 22);
}, _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof _PreinsertCall.PreinsertCall === "undefined" ? Object : _PreinsertCall.PreinsertCall, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.Presence === "undefined" ? Object : _services.Presence, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof Subscription === "undefined" ? Object : Subscription, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services2.NumberValidate === "undefined" ? Object : _services2.NumberValidate, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _Webphone.Webphone === "undefined" ? Object : _Webphone.Webphone, typeof _CallingSettings.CallingSettings === "undefined" ? Object : _CallingSettings.CallingSettings, String, typeof _services.Analytics === "undefined" ? Object : _services.Analytics, typeof _services.AvailabilityMonitor === "undefined" ? Object : _services.AvailabilityMonitor, typeof ActiveCallControlOptions === "undefined" ? Object : ActiveCallControlOptions, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin]), _dec0 = (0, _nextCore.dynamic)('RateLimiter'), _dec1 = Reflect.metadata("design:type", typeof RateLimiter === "undefined" ? Object : RateLimiter), _dec10 = Reflect.metadata("design:type", typeof IPickUpCallDataMap === "undefined" ? Object : IPickUpCallDataMap), _dec11 = Reflect.metadata("design:type", typeof ITransferCallSessionMapping === "undefined" ? Object : ITransferCallSessionMapping), _dec12 = Reflect.metadata("design:type", Object), _dec13 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [String, Object]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [String]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec20 = (0, _nextCore.delegate)('server'), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec23 = (0, _nextCore.delegate)('server'), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", []), _dec26 = (0, _nextCore.delegate)('server'), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [Array]), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", []), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", [String]), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", []), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", []), _dec39 = (0, _nextCore.delegate)('mainClient'), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", [String]), _dec42 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.mute)];
}), _dec43 = (0, _nextCore.delegate)('server'), _dec44 = Reflect.metadata("design:type", Function), _dec45 = Reflect.metadata("design:paramtypes", [String]), _dec46 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.unmute)];
}), _dec47 = (0, _nextCore.delegate)('server'), _dec48 = Reflect.metadata("design:type", Function), _dec49 = Reflect.metadata("design:paramtypes", [String]), _dec50 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.record)];
}), _dec51 = (0, _nextCore.delegate)('server'), _dec52 = Reflect.metadata("design:type", Function), _dec53 = Reflect.metadata("design:paramtypes", [String]), _dec54 = (0, _nextCore.delegate)('mainClient'), _dec55 = Reflect.metadata("design:type", Function), _dec56 = Reflect.metadata("design:paramtypes", [String]), _dec57 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.stopRecord)];
}), _dec58 = (0, _nextCore.delegate)('server'), _dec59 = Reflect.metadata("design:type", Function), _dec60 = Reflect.metadata("design:paramtypes", [String]), _dec61 = (0, _nextCore.delegate)('mainClient'), _dec62 = Reflect.metadata("design:type", Function), _dec63 = Reflect.metadata("design:paramtypes", [String]), _dec64 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.hangup)];
}), _dec65 = (0, _nextCore.delegate)('server'), _dec66 = Reflect.metadata("design:type", Function), _dec67 = Reflect.metadata("design:paramtypes", [String]), _dec68 = (0, _nextCore.delegate)('server'), _dec69 = Reflect.metadata("design:type", Function), _dec70 = Reflect.metadata("design:paramtypes", [String, Boolean]), _dec71 = (0, _nextCore.delegate)('server'), _dec72 = Reflect.metadata("design:type", Function), _dec73 = Reflect.metadata("design:paramtypes", [String, Boolean]), _dec74 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.voicemail)];
}), _dec75 = (0, _nextCore.delegate)('server'), _dec76 = Reflect.metadata("design:type", Function), _dec77 = Reflect.metadata("design:paramtypes", [String]), _dec78 = (0, _nextCore.delegate)('mainClient'), _dec79 = Reflect.metadata("design:type", Function), _dec80 = Reflect.metadata("design:paramtypes", [String]), _dec81 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.confirmSwitch)];
}), _dec82 = (0, _nextCore.delegate)('server'), _dec83 = Reflect.metadata("design:type", Function), _dec84 = Reflect.metadata("design:paramtypes", [String]), _dec85 = (0, _nextCore.delegate)('mainClient'), _dec86 = Reflect.metadata("design:type", Function), _dec87 = Reflect.metadata("design:paramtypes", [String]), _dec88 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.hold)];
}), _dec89 = (0, _nextCore.delegate)('server'), _dec90 = Reflect.metadata("design:type", Function), _dec91 = Reflect.metadata("design:paramtypes", [String]), _dec92 = (0, _nextCore.delegate)('mainClient'), _dec93 = Reflect.metadata("design:type", Function), _dec94 = Reflect.metadata("design:paramtypes", [String]), _dec95 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.unhold)];
}), _dec96 = (0, _nextCore.delegate)('server'), _dec97 = Reflect.metadata("design:type", Function), _dec98 = Reflect.metadata("design:paramtypes", [String]), _dec99 = (0, _nextCore.delegate)('mainClient'), _dec100 = Reflect.metadata("design:type", Function), _dec101 = Reflect.metadata("design:paramtypes", [typeof ReplyWithTextParams === "undefined" ? Object : ReplyWithTextParams, String]), _dec102 = (0, _services.track)(function (_, params) {
  return [_trackEvents.trackEvents.executionReplyWithMessage, {
    'message type': params.replyWithPattern ? 'Pattern' : 'Custom'
  }];
}), _dec103 = (0, _nextCore.delegate)('server'), _dec104 = Reflect.metadata("design:type", Function), _dec105 = Reflect.metadata("design:paramtypes", [typeof ReplyWithTextParams === "undefined" ? Object : ReplyWithTextParams, String]), _dec106 = (0, _nextCore.delegate)('server'), _dec107 = Reflect.metadata("design:type", Function), _dec108 = Reflect.metadata("design:paramtypes", [String, String]), _dec109 = (0, _nextCore.delegate)('server'), _dec110 = Reflect.metadata("design:type", Function), _dec111 = Reflect.metadata("design:paramtypes", [String]), _dec112 = (0, _services.track)(_trackEvents.trackEvents.transfer), _dec113 = (0, _nextCore.delegate)('server'), _dec114 = Reflect.metadata("design:type", Function), _dec115 = Reflect.metadata("design:paramtypes", [String, String]), _dec116 = (0, _nextCore.delegate)('server'), _dec117 = Reflect.metadata("design:type", Function), _dec118 = Reflect.metadata("design:paramtypes", [String, String]), _dec119 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.confirmForward)];
}), _dec120 = (0, _nextCore.delegate)('server'), _dec121 = Reflect.metadata("design:type", Function), _dec122 = Reflect.metadata("design:paramtypes", [String, String]), _dec123 = (0, _nextCore.delegate)('server'), _dec124 = Reflect.metadata("design:type", Function), _dec125 = Reflect.metadata("design:paramtypes", [String, String]), _dec126 = Reflect.metadata("design:type", Function), _dec127 = Reflect.metadata("design:paramtypes", [typeof IPickUpCallDataMap === "undefined" ? Object : IPickUpCallDataMap]), _dec128 = (0, _nextCore.delegate)('server'), _dec129 = Reflect.metadata("design:type", Function), _dec130 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec131 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.answer)];
}), _dec132 = Reflect.metadata("design:type", Function), _dec133 = Reflect.metadata("design:paramtypes", [String]), _dec134 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.holdAndAnswer)];
}), _dec135 = Reflect.metadata("design:type", Function), _dec136 = Reflect.metadata("design:paramtypes", [String]), _dec137 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.ignore)];
}), _dec138 = (0, _nextCore.delegate)('server'), _dec139 = Reflect.metadata("design:type", Function), _dec140 = Reflect.metadata("design:paramtypes", [String]), _dec141 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.endAndAnswer)];
}), _dec142 = (0, _nextCore.delegate)('server'), _dec143 = Reflect.metadata("design:type", Function), _dec144 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec145 = (0, _services.track)(_trackEvents.trackEvents.transferAskFirst, process.env.THEME_SYSTEM === 'spring-ui'), _dec146 = (0, _nextCore.delegate)('server'), _dec147 = Reflect.metadata("design:type", Function), _dec148 = Reflect.metadata("design:paramtypes", [String, String]), _dec149 = Reflect.metadata("design:type", Function), _dec150 = Reflect.metadata("design:paramtypes", [String, String]), _dec151 = Reflect.metadata("design:type", Function), _dec152 = Reflect.metadata("design:paramtypes", [Array]), _dec153 = (0, _nextCore.delegate)('server'), _dec154 = Reflect.metadata("design:type", Function), _dec155 = Reflect.metadata("design:paramtypes", [typeof ModuleMakeCallParams === "undefined" ? Object : ModuleMakeCallParams]), _dec156 = (0, _nextCore.delegate)('mainClient'), _dec157 = Reflect.metadata("design:type", Function), _dec158 = Reflect.metadata("design:paramtypes", [String, String]), _dec159 = (0, _nextCore.delegate)('server'), _dec160 = Reflect.metadata("design:type", Function), _dec161 = Reflect.metadata("design:paramtypes", [String, String]), _dec162 = (0, _nextCore.delegate)('server'), _dec163 = Reflect.metadata("design:type", Function), _dec164 = Reflect.metadata("design:paramtypes", [String]), _dec165 = (0, _nextCore.delegate)('mainClient'), _dec166 = Reflect.metadata("design:type", Function), _dec167 = Reflect.metadata("design:paramtypes", [String]), _dec168 = (0, _services.track)(_trackEvents.trackEvents.clickConfirmRemoveParticipant), _dec169 = (0, _nextCore.delegate)('server'), _dec170 = Reflect.metadata("design:type", Function), _dec171 = Reflect.metadata("design:paramtypes", [String, String]), _dec172 = (0, _nextCore.delegate)('server'), _dec173 = Reflect.metadata("design:type", Function), _dec174 = Reflect.metadata("design:paramtypes", [String, String]), _dec175 = (0, _nextCore.computed)(function (_ref) {
  var activeSessionId = _ref.activeSessionId,
    activeSessions = _ref.activeSessions;
  return [activeSessionId, activeSessions];
}), _dec176 = Reflect.metadata("design:type", Function), _dec177 = Reflect.metadata("design:paramtypes", []), _dec178 = (0, _nextCore.computed)(function (_ref2) {
  var sessions = _ref2.sessions;
  return [sessions];
}), _dec179 = Reflect.metadata("design:type", Function), _dec180 = Reflect.metadata("design:paramtypes", []), _dec181 = (0, _nextCore.computed)(function (that) {
  return [that.sessions, that.timestamp];
}), _dec182 = Reflect.metadata("design:type", Function), _dec183 = Reflect.metadata("design:paramtypes", []), _dec184 = (0, _nextCore.computed)(function (that) {
  return [that._presence.calls];
}), _dec185 = Reflect.metadata("design:type", Function), _dec186 = Reflect.metadata("design:paramtypes", []), _dec187 = (0, _nextCore.computed)(function (that) {
  return [that._webphone.sessions];
}), _dec188 = Reflect.metadata("design:type", Function), _dec189 = Reflect.metadata("design:paramtypes", []), _dec190 = Reflect.metadata("design:type", Function), _dec191 = Reflect.metadata("design:paramtypes", []), _dec192 = (0, _services.track)(_trackEvents.trackEvents.dialpadOpen), _dec193 = Reflect.metadata("design:type", Function), _dec194 = Reflect.metadata("design:paramtypes", []), _dec195 = (0, _services.track)(_trackEvents.trackEvents.dialpadClose), _dec196 = Reflect.metadata("design:type", Function), _dec197 = Reflect.metadata("design:paramtypes", []), _dec198 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.clickTransfer)];
}), _dec199 = Reflect.metadata("design:type", Function), _dec200 = Reflect.metadata("design:paramtypes", []), _dec201 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.forward)];
}), _dec202 = Reflect.metadata("design:type", Function), _dec203 = Reflect.metadata("design:paramtypes", []), _dec204 = (0, _services.track)(function (that, entry) {
  return [_trackEvents.trackEvents.phoneConferenceCallMerge, {
    entry: entry
  }];
}), _dec205 = Reflect.metadata("design:type", Function), _dec206 = Reflect.metadata("design:paramtypes", [String]), _dec207 = (0, _services.track)(function (that, path) {
  var target = that._analytics.getTrackTarget();
  return [_trackEvents.trackEvents.openEntityDetailLink, {
    path: path || target.router
  }];
}), _dec208 = Reflect.metadata("design:type", Function), _dec209 = Reflect.metadata("design:paramtypes", [String]), _dec210 = (0, _services.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents["switch"])];
}), _dec211 = Reflect.metadata("design:type", Function), _dec212 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function ActiveCallControl(_preInsertCall, _portManager, _auth, _toast, _brand, _client, _presence, _accountInfo, _subscription, _extensionInfo, _numberValidate, _regionSettings, _connectivityMonitor, _appFeatures, _modalView, _locale, _webphone, _callingSettings, _prefix, _analytics, _availabilityMonitor, _activeCallControlOptions, _router) {
    var _this$_activeCallCont, _this$_activeCallCont2, _this$_activeCallCont3, _this$_activeCallCont4, _this$_activeCallCont5, _this$_activeCallCont6, _this$_activeCallCont7, _this$_activeCallCont8;
    var _this;
    _classCallCheck(this, ActiveCallControl);
    _this = _callSuper(this, ActiveCallControl);
    _this._preInsertCall = _preInsertCall;
    _this._portManager = _portManager;
    _this._auth = _auth;
    _this._toast = _toast;
    _this._brand = _brand;
    _this._client = _client;
    _this._presence = _presence;
    _this._accountInfo = _accountInfo;
    _this._subscription = _subscription;
    _this._extensionInfo = _extensionInfo;
    _this._numberValidate = _numberValidate;
    _this._regionSettings = _regionSettings;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._appFeatures = _appFeatures;
    _this._modalView = _modalView;
    _this._locale = _locale;
    _this._webphone = _webphone;
    _this._callingSettings = _callingSettings;
    _this._prefix = _prefix;
    _this._analytics = _analytics;
    _this._availabilityMonitor = _availabilityMonitor;
    _this._activeCallControlOptions = _activeCallControlOptions;
    _this._router = _router;
    _initializerDefineProperty(_this, "_rateLimiter", _descriptor, _this);
    _this.onCallIgnoreFunc = void 0;
    _this._onCallEndFunc = void 0;
    _this._onCallSwitchedFunc = void 0;
    _this._timeoutId = null;
    _this._stopWatchingConnectivity = void 0;
    _this._stopWatchingSubscription = void 0;
    _this._ttl = (_this$_activeCallCont = (_this$_activeCallCont2 = _this._activeCallControlOptions) === null || _this$_activeCallCont2 === void 0 ? void 0 : _this$_activeCallCont2.ttl) !== null && _this$_activeCallCont !== void 0 ? _this$_activeCallCont : DEFAULT_TTL;
    _this._timeToRetry = (_this$_activeCallCont3 = (_this$_activeCallCont4 = _this._activeCallControlOptions) === null || _this$_activeCallCont4 === void 0 ? void 0 : _this$_activeCallCont4.timeToRetry) !== null && _this$_activeCallCont3 !== void 0 ? _this$_activeCallCont3 : DEFAULT_TIME_TO_RETRY;
    _this._polling = (_this$_activeCallCont5 = (_this$_activeCallCont6 = _this._activeCallControlOptions) === null || _this$_activeCallCont6 === void 0 ? void 0 : _this$_activeCallCont6.polling) !== null && _this$_activeCallCont5 !== void 0 ? _this$_activeCallCont5 : false;
    _this._promise = null;
    _this._rcCallControl = null;
    _this._permissionCheck = (_this$_activeCallCont7 = (_this$_activeCallCont8 = _this._activeCallControlOptions) === null || _this$_activeCallCont8 === void 0 ? void 0 : _this$_activeCallCont8.permissionCheck) !== null && _this$_activeCallCont7 !== void 0 ? _this$_activeCallCont7 : true;
    _initializerDefineProperty(_this, "pickUpCallDataMap", _descriptor2, _this);
    _initializerDefineProperty(_this, "transferCallMapping", _descriptor3, _this);
    _initializerDefineProperty(_this, "data", _descriptor4, _this);
    _initializerDefineProperty(_this, "ringMessages", _descriptor5, _this);
    // TODO: non spring-ui only feature, will be removed in the future
    _initializerDefineProperty(_this, "drawer", _descriptor6, _this);
    _this.fromCallAnsweredElsewhere = function (telephonySessionId) {
      return _this._subscription.fromMessage$('call-answered-elsewhere').pipe((0, _rxjs.filter)(function (data) {
        return data.telephonySessionId === telephonySessionId;
      }));
    };
    _this.fromMissedCalls = function (telephonySessionId) {
      return _this._subscription.fromMessage$('missed-calls').pipe((0, _rxjs.filter)(function (data) {
        return data.telephonySessionId === telephonySessionId;
      }));
    };
    _this._updateSessionsStatusHandler = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref3) {
        var party, telephonySession;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              party = _ref3.party;
              _context.n = 1;
              return _this.updateActiveSessions();
            case 1:
              // spring-ui not handle those logic inside the active call control
              // TODO: remove those logic after all project switch to spring-ui
              if (process.env.THEME_SYSTEM !== 'spring-ui') {
                // setActiveSessionId on call answered
                if (party.status.code === _Session.PartyStatusCode.answered) {
                  telephonySession = _this.sessions.find(function (x) {
                    return x.party.id === party.id;
                  });
                  if (telephonySession && telephonySession.telephonySessionId !== _this.activeSessionId) {
                    _this.setActiveSessionId(telephonySession.telephonySessionId);
                  }
                }
              }
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }();
    _this._updateSessionsHandler = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return _this.updateActiveSessions();
          case 1:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    _this.muteErrorHandle = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(error) {
        var _this$_availabilityMo;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(error.response && !error.response._text)) {
                _context3.n = 2;
                break;
              }
              _context3.n = 1;
              return error.response.clone().text();
            case 1:
              error.response._text = _context3.v;
            case 2:
              if (!(0, _helpers.conflictError)(error)) {
                _context3.n = 3;
                break;
              }
              _this._toast.warning({
                message: (0, _i18n.t)('muteConflictError')
              });
              _context3.n = 5;
              break;
            case 3:
              _context3.n = 4;
              return (_this$_availabilityMo = _this._availabilityMonitor) === null || _this$_availabilityMo === void 0 ? void 0 : _this$_availabilityMo.checkIfHAError(error);
            case 4:
              if (_context3.v) {
                _context3.n = 5;
                break;
              }
              _this._showGeneralError();
            case 5:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }();
    _this.activeCallTelephonyIdChange$ = (0, _nextCore.fromWatch)(_this, function () {
      var _this$activeSession;
      return (_this$activeSession = _this.activeSession) === null || _this$activeSession === void 0 ? void 0 : _this$activeSession.telephonySessionId;
    }).pipe((0, _rxjs.share)());
    _this.sessionsMap$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.sessionsMap;
    }).pipe((0, _rxjs.share)());
    _this.stopRecordErrorHandle = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(error) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              console.log('stop record error:', error);
              _this._toast.danger({
                message: (0, _i18n.t)('pauseRecordError')
              });
            case 1:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      return function (_x3) {
        return _ref7.apply(this, arguments);
      };
    }();
    _this._hangUpErrorHandle = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(error) {
        var _this$_availabilityMo2;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              // TODO: fix error handling with instanceof
              console.error('hangup error', error);
              _context5.n = 1;
              return (_this$_availabilityMo2 = _this._availabilityMonitor) === null || _this$_availabilityMo2 === void 0 ? void 0 : _this$_availabilityMo2.checkIfHAError(error);
            case 1:
              if (_context5.v) {
                _context5.n = 2;
                break;
              }
              _this._showGeneralError();
            case 2:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      return function (_x4) {
        return _ref8.apply(this, arguments);
      };
    }();
    _this.holdErrorHandle = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(error) {
        var _this$_availabilityMo3;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(error.response && !error.response._text)) {
                _context6.n = 2;
                break;
              }
              _context6.n = 1;
              return error.response.clone().text();
            case 1:
              error.response._text = _context6.v;
            case 2:
              if (!(0, _helpers.conflictError)(error)) {
                _context6.n = 3;
                break;
              }
              _this._toast.warning({
                message: (0, _i18n.t)('holdConflictError')
              });
              _context6.n = 5;
              break;
            case 3:
              _context6.n = 4;
              return (_this$_availabilityMo3 = _this._availabilityMonitor) === null || _this$_availabilityMo3 === void 0 ? void 0 : _this$_availabilityMo3.checkIfHAError(error);
            case 4:
              if (_context6.v) {
                _context6.n = 5;
                break;
              }
              _this._showGeneralError();
            case 5:
              return _context6.a(2);
          }
        }, _callee6);
      }));
      return function (_x5) {
        return _ref9.apply(this, arguments);
      };
    }();
    _this.unholdErrorHandle = /*#__PURE__*/function () {
      var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(error) {
        var _this$_availabilityMo4;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!(error.response && !error.response._text)) {
                _context7.n = 2;
                break;
              }
              _context7.n = 1;
              return error.response.clone().text();
            case 1:
              error.response._text = _context7.v;
            case 2:
              if (!(0, _helpers.conflictError)(error)) {
                _context7.n = 3;
                break;
              }
              _this._toast.warning({
                message: (0, _i18n.t)('unHoldConflictError')
              });
              _context7.n = 5;
              break;
            case 3:
              _context7.n = 4;
              return (_this$_availabilityMo4 = _this._availabilityMonitor) === null || _this$_availabilityMo4 === void 0 ? void 0 : _this$_availabilityMo4.checkIfHAError(error);
            case 4:
              if (_context7.v) {
                _context7.n = 5;
                break;
              }
              _this._showGeneralError();
            case 5:
              return _context7.a(2);
          }
        }, _callee7);
      }));
      return function (_x6) {
        return _ref0.apply(this, arguments);
      };
    }();
    _this.getTelephonySessionIdBySessionId = function (sessionId) {
      return _this.sessionIdToTelephonySessionIdMapping[sessionId];
    };
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindServerListener();
      });
    } else {
      _this.bindServerListener();
    }
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      _this._preInsertCall.listenPreinsertFromWebphone();
    }
    _this._webphone.useWebphoneMainTab();
    var filters = [_subscriptionFilters.subscriptionFilters.telephonySessions, _subscriptionFilters.subscriptionFilters.startRing, _subscriptionFilters.subscriptionFilters.stopRing];
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      filters.push(_subscriptionFilters.subscriptionFilters.callAnsweredElsewhere);
      filters.push(_subscriptionFilters.subscriptionFilters.missedCalls);
    }
    _this._subscription.register(_this, {
      filters: filters
    });
    return _this;
  }
  _inherits(ActiveCallControl, _RcModule);
  return _createClass(ActiveCallControl, [{
    key: "addRingMessage",
    value: function addRingMessage(telephonySessionId, message) {
      this.ringMessages[telephonySessionId] = message;
    }
  }, {
    key: "removeRingMessage",
    value: function removeRingMessage(telephonySessionId) {
      delete this.ringMessages[telephonySessionId];
    }
  }, {
    key: "openDrawer",
    value: function openDrawer(telephonySessionId) {
      this._modalView.open(this.drawer, {
        telephonySessionId: telephonySessionId
      });
    }
  }, {
    key: "closeDrawer",
    value: function closeDrawer() {
      this._modalView.close(this.drawer);
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _t;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              if (this.hasPermission) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              this._rcCallControl = this._initRcCallControl();
              this._iniSubscription();
              this._initConnectivity();
              _context8.p = 2;
              _context8.n = 3;
              return this.fetchData();
            case 3:
              _context8.n = 5;
              break;
            case 4:
              _context8.p = 4;
              _t = _context8.v;
              this._retry();
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[2, 4]]);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "_iniSubscription",
    value: function _iniSubscription() {
      var _this2 = this;
      this._stopWatchingSubscription = (0, _nextCore.watch)(this, function () {
        return _this2._subscription.message;
      }, function (message) {
        return _this2._handleSubscription(message);
      });
    }
  }, {
    key: "_initConnectivity",
    value: function _initConnectivity() {
      var _this3 = this;
      this._stopWatchingConnectivity = (0, _nextCore.watch)(this, function () {
        return _this3._connectivityMonitor.connectivity;
      }, function (connectivity) {
        return _this3._handleConnectivity(connectivity);
      });
    }
  }, {
    key: "_initRcCallControl",
    value: function _initRcCallControl() {
      var _this4 = this;
      var rcCallControl = new _ringcentralCallControl.RingCentralCallControl({
        sdk: this._client.service,
        preloadDevices: false,
        preloadSessions: false,
        extensionInfo: _objectSpread(_objectSpread({}, this._extensionInfo.info), {}, {
          account: this._accountInfo.info
          // TODO: add info type in 'AccountInfo'
        })
      });
      rcCallControl.on('new', function (session) {
        _this4._newSessionHandler(session);
      });

      // TODO: should fix the issue about the WebRTC outbound call with wrong sequences of telephony sessions then call log section will not show issue

      return rcCallControl;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatchingCo, _this$_stopWatchingSu;
      (_this$_stopWatchingCo = this._stopWatchingConnectivity) === null || _this$_stopWatchingCo === void 0 ? void 0 : _this$_stopWatchingCo.call(this);
      this._stopWatchingConnectivity = undefined;
      (_this$_stopWatchingSu = this._stopWatchingSubscription) === null || _this$_stopWatchingSu === void 0 ? void 0 : _this$_stopWatchingSu.call(this);
      this._stopWatchingSubscription = undefined;
      this.resetState();
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.data.activeSessionId = null;
      this.data.busyTimestamp = 0;
      this.data.timestamp = 0;
      this.data.sessions = [];
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (!this._promise) {
                this._promise = this._fetchData();
              }
              _context9.n = 1;
              return this._promise;
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function fetchData() {
        return _fetchData2.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: "_handleConnectivity",
    value: function _handleConnectivity(connectivity) {
      if (this.ready && this.hasPermission && connectivity) {
        this.fetchData();
      }
    }
  }, {
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _message, _message2, _message3, _message4;
      if (((_message = message) === null || _message === void 0 ? void 0 : _message.event) && startRingEndPoint.test(message.event)) {
        var _message$body;
        var telephonySessionId = (_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.telephonySessionId;
        if (telephonySessionId) {
          this.addRingMessage(telephonySessionId, message.body);
        }
      }
      if (((_message2 = message) === null || _message2 === void 0 ? void 0 : _message2.event) && stopRingEndPoint.test(message.event)) {
        var _message$body2;
        var _telephonySessionId = (_message$body2 = message.body) === null || _message$body2 === void 0 ? void 0 : _message$body2.telephonySessionId;
        if (_telephonySessionId) {
          this.removeRingMessage(_telephonySessionId);
        }
      }
      if (this.ready && this.hasPermission && ((_message3 = message) === null || _message3 === void 0 ? void 0 : _message3.event) && ((_message4 = message) === null || _message4 === void 0 ? void 0 : _message4.body) && telephonySessionsEndPoint.test(message.event)) {
        var _this$_rcCallControl;
        message = (0, _helpers.checkRingOutCallDirection)(message);
        var cloneMsg = JSON.parse(JSON.stringify(message));
        (_this$_rcCallControl = this._rcCallControl) === null || _this$_rcCallControl === void 0 ? void 0 : _this$_rcCallControl.onNotificationEvent(cloneMsg);
      }
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this5 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this5._timeoutId = null;
        if (!_this5.timestamp || Date.now() - _this5.timestamp > _this5.ttl) {
          _this5.fetchData();
        }
      }, t);
    }
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var _t2;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this._syncData();
            case 1:
              if (this._polling) {
                this._startPolling();
              }
              this._promise = null;
              _context0.n = 3;
              break;
            case 2:
              _context0.p = 2;
              _t2 = _context0.v;
              this._promise = null;
              if (this._polling) {
                this._startPolling(this.timeToRetry);
              } else {
                this._retry();
              }
              throw _t2;
            case 3:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 2]]);
      }));
      function _fetchData() {
        return _fetchData3.apply(this, arguments);
      }
      return _fetchData;
    }()
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this6 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this6._timeoutId = null;
        if (!_this6.timestamp || Date.now() - _this6.timestamp > _this6.ttl) {
          _this6.fetchData();
        } else {
          _this6._startPolling();
        }
      }, t);
    }
  }, {
    key: "_syncData",
    value: function () {
      var _syncData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _this7 = this;
        var _this$_rcCallControl2, _this$_rcCallControl3, activeCalls, _t3;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              activeCalls = this._presence.calls;
              _context1.n = 1;
              return (_this$_rcCallControl2 = this._rcCallControl) === null || _this$_rcCallControl2 === void 0 ? void 0 : _this$_rcCallControl2.loadSessions(activeCalls);
            case 1:
              _context1.n = 2;
              return this.updateActiveSessions();
            case 2:
              (_this$_rcCallControl3 = this._rcCallControl) === null || _this$_rcCallControl3 === void 0 ? void 0 : _this$_rcCallControl3.sessions.forEach(function (session) {
                _this7._newSessionHandler(session);
              });
              _context1.n = 4;
              break;
            case 3:
              _context1.p = 3;
              _t3 = _context1.v;
              console.log('sync data error:', _t3);
              throw _t3;
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 3]]);
      }));
      function _syncData() {
        return _syncData2.apply(this, arguments);
      }
      return _syncData;
    }()
  }, {
    key: "updateActiveSessions",
    value: function () {
      var _updateActiveSessions2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var _this$_rcCallControl4,
          _this8 = this;
        var sessions, callControlSessions;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              sessions = ((_this$_rcCallControl4 = this._rcCallControl) === null || _this$_rcCallControl4 === void 0 ? void 0 : _this$_rcCallControl4.sessions) || [];
              callControlSessions = sessions.filter(function (session) {
                return (0, _helpers.isConnectedCall)(session);
              }).map(function (session) {
                var conferenceSessions = (0, _helpers.findConferenceParticipants)(session, sessions, _this8._extensionInfo.info, process.env.THEME_SYSTEM === 'spring-ui' ? function (_, partyId) {
                  return _this8._preInsertCall.checkParticipantStillExist(session, partyId);
                } : undefined);
                return (0, _helpers.normalizeToActiveCallControlSession)(session, conferenceSessions,
                // only process data in new version app, old version keep original logic
                process.env.THEME_SYSTEM === 'spring-ui' ? _this8._numberValidate.getPartyExtensionNumber : undefined);
              }).filter(function (session) {
                return _this8.skipConferenceCall ? !session.isConferenceCall : true;
              });
              this._updateActiveSessions(JSON.parse(JSON.stringify(callControlSessions)));
            case 1:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function updateActiveSessions() {
        return _updateActiveSessions2.apply(this, arguments);
      }
      return updateActiveSessions;
    }()
  }, {
    key: "_updateActiveSessions",
    value: function _updateActiveSessions(callControlSessions) {
      this.data.timestamp = Date.now();
      this.data.sessions = callControlSessions;
    }
  }, {
    key: "_newSessionHandler",
    value: function _newSessionHandler(session) {
      session.removeListener(_callControlEvents.CallControlEvents.status, this._updateSessionsStatusHandler);
      session.removeListener(_callControlEvents.CallControlEvents.muted, this._updateSessionsHandler);
      session.removeListener(_callControlEvents.CallControlEvents.recordings, this._updateSessionsHandler);
      session.on(_callControlEvents.CallControlEvents.status, this._updateSessionsStatusHandler);
      session.on(_callControlEvents.CallControlEvents.muted, this._updateSessionsHandler);
      session.on(_callControlEvents.CallControlEvents.recordings, this._updateSessionsHandler);
      // Handle the session update at the end of function to reduce the probability of empty rc call
      // sessions
      this._updateSessionsHandler();
    }
  }, {
    key: "removeActiveSession",
    value: function removeActiveSession() {
      this.data.activeSessionId = null;
    }
  }, {
    key: "setActiveSessionId",
    value: function setActiveSessionId(telephonySessionId) {
      if (!telephonySessionId || this.data.activeSessionId === telephonySessionId) return;
      this._setActiveSessionId(telephonySessionId);
    }
  }, {
    key: "_setActiveSessionId",
    value: function _setActiveSessionId(telephonySessionId) {
      this.data.activeSessionId = telephonySessionId;
    }
  }, {
    key: "_getTrackEventName",
    value: function _getTrackEventName(name) {
      var _this$_router, _getRef$modules;
      // in spring-ui always be same name
      if (process.env.THEME_SYSTEM === 'spring-ui') return name;

      // TODO: remove those logic after all project switch to spring-ui
      var currentPath = (_this$_router = this._router) === null || _this$_router === void 0 ? void 0 : _this$_router.currentPath;
      var CallLogSection = (_getRef$modules = (0, _nextCore.getRef)(this).modules) === null || _getRef$modules === void 0 ? void 0 : _getRef$modules.CallLogSection;
      var showCallLog = CallLogSection === null || CallLogSection === void 0 ? void 0 : CallLogSection.show;
      var showNotification = CallLogSection === null || CallLogSection === void 0 ? void 0 : CallLogSection.showNotification;
      if (showNotification) {
        return "".concat(name, "/Call notification page");
      }
      if (showCallLog) {
        return "".concat(name, "/Call log page");
      }
      if (currentPath === '/calls') {
        return "".concat(name, "/All calls page");
      }
      if (currentPath.includes('/simplifycallctrl')) {
        return "".concat(name, "/Small call control");
      }
      return name;
    }
  }, {
    key: "setCallControlBusyTimestamp",
    value: function setCallControlBusyTimestamp() {
      this.data.busyTimestamp = Date.now();
    }
  }, {
    key: "clearCallControlBusyTimestamp",
    value: function clearCallControlBusyTimestamp() {
      this.data.busyTimestamp = 0;
    }
  }, {
    key: "muteWithWebphone",
    value: function () {
      var _muteWithWebphone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(currentDeviceWebphoneId) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              _context11.n = 1;
              return this._webphone.mute(currentDeviceWebphoneId, this.muteErrorHandle);
            case 1:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function muteWithWebphone(_x7) {
        return _muteWithWebphone.apply(this, arguments);
      }
      return muteWithWebphone;
    }()
  }, {
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(telephonySessionId) {
        var currentDeviceWebphoneId, session, _t4;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              this.setCallControlBusyTimestamp();
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId); // if current device call, using webphone mute directly
              if (!currentDeviceWebphoneId) {
                _context12.n = 1;
                break;
              }
              _context12.n = 1;
              return this.muteWithWebphone(currentDeviceWebphoneId);
            case 1:
              session = this._getSessionById(telephonySessionId);
              _context12.n = 2;
              return session.mute();
            case 2:
              _context12.n = 4;
              break;
            case 3:
              _context12.p = 3;
              _t4 = _context12.v;
              _context12.n = 4;
              return this.muteErrorHandle(_t4);
            case 4:
              this.clearCallControlBusyTimestamp();
            case 5:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 3]]);
      }));
      function mute(_x8) {
        return _mute.apply(this, arguments);
      }
      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(telephonySessionId) {
        var currentDeviceWebphoneId, session, _this$_availabilityMo5, _t5;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              this.setCallControlBusyTimestamp();
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId); // if current device call, using webphone mute directly
              if (!currentDeviceWebphoneId) {
                _context13.n = 1;
                break;
              }
              _context13.n = 1;
              return this._webphone.unmute(currentDeviceWebphoneId);
            case 1:
              session = this._getSessionById(telephonySessionId);
              _context13.n = 2;
              return session.unmute();
            case 2:
              this.clearCallControlBusyTimestamp();
              _context13.n = 9;
              break;
            case 3:
              _context13.p = 3;
              _t5 = _context13.v;
              if (!(_t5.response && !_t5.response._text)) {
                _context13.n = 5;
                break;
              }
              _context13.n = 4;
              return _t5.response.clone().text();
            case 4:
              _t5.response._text = _context13.v;
            case 5:
              if (!(0, _helpers.conflictError)(_t5)) {
                _context13.n = 6;
                break;
              }
              this._toast.warning({
                message: (0, _i18n.t)('unMuteConflictError')
              });
              _context13.n = 8;
              break;
            case 6:
              _context13.n = 7;
              return (_this$_availabilityMo5 = this._availabilityMonitor) === null || _this$_availabilityMo5 === void 0 ? void 0 : _this$_availabilityMo5.checkIfHAError(_t5);
            case 7:
              if (_context13.v) {
                _context13.n = 8;
                break;
              }
              this._showGeneralError();
            case 8:
              this.clearCallControlBusyTimestamp();
            case 9:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 3]]);
      }));
      function unmute(_x9) {
        return _unmute.apply(this, arguments);
      }
      return unmute;
    }()
  }, {
    key: "transferUnmuteHandler",
    value: function () {
      var _transferUnmuteHandler = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(telephonySessionId) {
        var _session$party, session, _t6;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              session = this._getSessionById(telephonySessionId);
              if (!(session === null || session === void 0 ? void 0 : (_session$party = session.party) === null || _session$party === void 0 ? void 0 : _session$party.muted)) {
                _context14.n = 1;
                break;
              }
              _context14.n = 1;
              return session.unmute();
            case 1:
              _context14.n = 3;
              break;
            case 2:
              _context14.p = 2;
              _t6 = _context14.v;
            case 3:
              return _context14.a(2);
          }
        }, _callee14, this, [[0, 2]]);
      }));
      function transferUnmuteHandler(_x0) {
        return _transferUnmuteHandler.apply(this, arguments);
      }
      return transferUnmuteHandler;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(telephonySessionId) {
        var _session$origin, session, currentDeviceWebphoneId, recordingId, _ref1, _ref1$errors, errors, _iterator, _step, _error, _t7, _t8;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId); // Call control record API failed when conference call(PLA-80490)
              // use webphone API instead
              if (!(currentDeviceWebphoneId && ((_session$origin = session.origin) === null || _session$origin === void 0 ? void 0 : _session$origin.type) === 'Conference')) {
                _context15.n = 2;
                break;
              }
              _context15.n = 1;
              return this._webphone.startRecord(currentDeviceWebphoneId);
            case 1:
              _context15.n = 5;
              break;
            case 2:
              recordingId = this.getRecordingId(session);
              if (recordingId) {
                _context15.n = 4;
                break;
              }
              _context15.n = 3;
              return session.createRecord();
            case 3:
              _context15.n = 5;
              break;
            case 4:
              _context15.n = 5;
              return session.resumeRecord(recordingId);
            case 5:
              this.clearCallControlBusyTimestamp();
              return _context15.a(2, true);
            case 6:
              _context15.p = 6;
              _t7 = _context15.v;
              // TODO: fix error handling with instanceof
              this.clearCallControlBusyTimestamp();
              _context15.n = 7;
              return _t7.response.clone().json();
            case 7:
              _t8 = _context15.v;
              if (_t8) {
                _context15.n = 8;
                break;
              }
              _t8 = {};
            case 8:
              _ref1 = _t8;
              _ref1$errors = _ref1.errors;
              errors = _ref1$errors === void 0 ? [] : _ref1$errors;
              if (!errors.length) {
                _context15.n = 10;
                break;
              }
              _iterator = _createForOfIteratorHelper(errors);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _error = _step.value;
                  console.error('record fail:', _error);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              if (!(process.env.THEME_SYSTEM === 'spring-ui')) {
                _context15.n = 9;
                break;
              }
              this._toast.danger({
                message: (0, _i18n.t)('recordErrorWithoutCode')
              });
              return _context15.a(2);
            case 9:
              this._toast.danger({
                message: (0, _i18n.t)('recordError', {
                  errorCode: errors[0].errorCode
                })
              });
            case 10:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 6]]);
      }));
      function startRecord(_x1) {
        return _startRecord.apply(this, arguments);
      }
      return startRecord;
    }()
  }, {
    key: "getRecordingId",
    value: function getRecordingId(session) {
      var recording = session.recordings[0];
      var recodingId = recording && recording.id;
      return recodingId;
    }
  }, {
    key: "bindServerListener",
    value: function bindServerListener() {
      var _this9 = this;
      // TODO: old version app, will be removed in the future
      if (process.env.THEME_SYSTEM !== 'spring-ui') {
        (0, _nextCore.fromWatch)(this, function () {
          return _this9.activeCallTelephonyIdChange$;
        }).pipe((0, _rxjs.tap)(function () {
          return _this9.closeDrawer();
        }), _nextCore.takeUntilAppDestroy).subscribe();
        return;
      }
      this._preInsertCall.listenPreinsertServerHandler(this.sessionsMap$);
    }
  }, {
    key: "stopRecordWithWebphone",
    value: function () {
      var _stopRecordWithWebphone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(currentDeviceWebphoneId) {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _context16.n = 1;
              return this._webphone.stopRecord(currentDeviceWebphoneId, this.stopRecordErrorHandle);
            case 1:
              return _context16.a(2);
          }
        }, _callee16, this);
      }));
      function stopRecordWithWebphone(_x10) {
        return _stopRecordWithWebphone.apply(this, arguments);
      }
      return stopRecordWithWebphone;
    }()
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(telephonySessionId) {
        var _session$origin2, session, currentDeviceWebphoneId, recordingId, _t9;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId); // if current device call, using webphone record directly
              if (!(currentDeviceWebphoneId && ((_session$origin2 = session.origin) === null || _session$origin2 === void 0 ? void 0 : _session$origin2.type) === 'Conference')) {
                _context17.n = 2;
                break;
              }
              _context17.n = 1;
              return this.stopRecordWithWebphone(currentDeviceWebphoneId);
            case 1:
              _context17.n = 3;
              break;
            case 2:
              recordingId = this.getRecordingId(session);
              _context17.n = 3;
              return session.pauseRecord(recordingId);
            case 3:
              _context17.n = 5;
              break;
            case 4:
              _context17.p = 4;
              _t9 = _context17.v;
              _context17.n = 5;
              return this.stopRecordErrorHandle(_t9);
            case 5:
              this.clearCallControlBusyTimestamp();
            case 6:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 4]]);
      }));
      function stopRecord(_x11) {
        return _stopRecord.apply(this, arguments);
      }
      return stopRecord;
    }()
  }, {
    key: "_hangupWithWebphone",
    value: function () {
      var _hangupWithWebphone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(currentDeviceWebphoneId) {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              _context18.n = 1;
              return this._webphone.hangup(currentDeviceWebphoneId, this._hangUpErrorHandle);
            case 1:
              return _context18.a(2);
          }
        }, _callee18, this);
      }));
      function _hangupWithWebphone(_x12) {
        return _hangupWithWebphone2.apply(this, arguments);
      }
      return _hangupWithWebphone;
    }()
  }, {
    key: "checkIfConferenceCall",
    value: function () {
      var _checkIfConferenceCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(telephonySessionId) {
        var session;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              session = this._getSessionById(telephonySessionId);
              return _context19.a(2, (0, _helpers.checkIfConferenceCall)(session));
          }
        }, _callee19, this);
      }));
      function checkIfConferenceCall(_x13) {
        return _checkIfConferenceCall2.apply(this, arguments);
      }
      return checkIfConferenceCall;
    }() //TODO refactor to move leave conf as host as separate optional module
  }, {
    key: "hangUp",
    value: function () {
      var _hangUp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(telephonySessionId, hangupOnlyHost) {
        var isConferenceCall, enableLeaveConferenceAsHost;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              if (!(process.env.THEME_SYSTEM !== 'spring-ui')) {
                _context20.n = 2;
                break;
              }
              _context20.n = 1;
              return this.checkIfConferenceCall(telephonySessionId);
            case 1:
              isConferenceCall = _context20.v;
              enableLeaveConferenceAsHost = this.enableLeaveConferenceAsHost; // isLeaveConferenceAsHostEnabled
              if (!(isConferenceCall && enableLeaveConferenceAsHost)) {
                _context20.n = 2;
                break;
              }
              this.openDrawer(telephonySessionId);
              return _context20.a(2);
            case 2:
              _context20.n = 3;
              return this.endCall(telephonySessionId, hangupOnlyHost);
            case 3:
              return _context20.a(2);
          }
        }, _callee20, this);
      }));
      function hangUp(_x14, _x15) {
        return _hangUp.apply(this, arguments);
      }
      return hangUp;
    }()
  }, {
    key: "endCall",
    value: function () {
      var _endCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(telephonySessionId, hangupOnlyHost) {
        var _this$_onCallEndFunc, currentDeviceWebphoneId, session, isConferenceCall, _t0;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              this.setCallControlBusyTimestamp();
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId);
              session = this._getSessionById(telephonySessionId);
              _context21.n = 1;
              return this.checkIfConferenceCall(telephonySessionId);
            case 1:
              isConferenceCall = _context21.v;
              if (!(isConferenceCall && hangupOnlyHost)) {
                _context21.n = 2;
                break;
              }
              session.removeParty(session.party.id, {
                keepConferenceAlive: true
              });
              return _context21.a(2);
            case 2:
              if (!currentDeviceWebphoneId) {
                _context21.n = 4;
                break;
              }
              _nextCore.logger.log("[".concat(this.identifier, "] end call with webphone"));
              _context21.n = 3;
              return this._hangupWithWebphone(currentDeviceWebphoneId);
            case 3:
              _context21.n = 5;
              break;
            case 4:
              _context21.n = 5;
              return session.drop();
            case 5:
              (_this$_onCallEndFunc = this._onCallEndFunc) === null || _this$_onCallEndFunc === void 0 ? void 0 : _this$_onCallEndFunc.call(this);
              // in spring-ui, when end call, the list will refresh, so no need to sleep here
              if (!(process.env.THEME_SYSTEM !== 'spring-ui')) {
                _context21.n = 6;
                break;
              }
              _context21.n = 6;
              return (0, _utils.sleep)(800);
            case 6:
              _context21.n = 8;
              break;
            case 7:
              _context21.p = 7;
              _t0 = _context21.v;
              _context21.n = 8;
              return this._hangUpErrorHandle(_t0);
            case 8:
              this.clearCallControlBusyTimestamp();
            case 9:
              return _context21.a(2);
          }
        }, _callee21, this, [[0, 7]]);
      }));
      function endCall(_x16, _x17) {
        return _endCall.apply(this, arguments);
      }
      return endCall;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(telephonySessionId) {
        var session, _this$_availabilityMo6, _t1;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId); // !If is a queue call, ignore is performed
              if (!session.party.queueCall) {
                _context22.n = 2;
                break;
              }
              _context22.n = 1;
              return this.ignore(telephonySessionId);
            case 1:
              return _context22.a(2, _context22.v);
            case 2:
              _nextCore.logger.log("[".concat(this.identifier, "] to voicemail with session"));
              _context22.n = 3;
              return session.toVoicemail();
            case 3:
              this.clearCallControlBusyTimestamp();
              _context22.n = 7;
              break;
            case 4:
              _context22.p = 4;
              _t1 = _context22.v;
              _context22.n = 5;
              return (_this$_availabilityMo6 = this._availabilityMonitor) === null || _this$_availabilityMo6 === void 0 ? void 0 : _this$_availabilityMo6.checkIfHAError(_t1);
            case 5:
              if (_context22.v) {
                _context22.n = 6;
                break;
              }
              this._showGeneralError();
            case 6:
              this.clearCallControlBusyTimestamp();
            case 7:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 4]]);
      }));
      function reject(_x18) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }()
  }, {
    key: "_switch",
    value: function () {
      var _switch2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(telephonySessionId) {
        var _this$getSession, activeCall, _this$_availabilityMo7, _t10;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              _context23.n = 1;
              return this.transferUnmuteHandler(telephonySessionId);
            case 1:
              activeCall = this._presence.calls.find(function (call) {
                return call.telephonySessionId === telephonySessionId;
              });
              _context23.n = 2;
              return this._webphone.switchCall(activeCall, this._regionSettings.homeCountryId);
            case 2:
              return _context23.a(2, (_this$getSession = this.getSession(telephonySessionId)) === null || _this$getSession === void 0 ? void 0 : _this$getSession.sessionId);
            case 3:
              _context23.p = 3;
              _t10 = _context23.v;
              _context23.n = 4;
              return (_this$_availabilityMo7 = this._availabilityMonitor) === null || _this$_availabilityMo7 === void 0 ? void 0 : _this$_availabilityMo7.checkIfHAError(_t10);
            case 4:
              if (_context23.v) {
                _context23.n = 5;
                break;
              }
              this._showGeneralError();
            case 5:
              return _context23.a(2);
          }
        }, _callee23, this, [[0, 3]]);
      }));
      function _switch(_x19) {
        return _switch2.apply(this, arguments);
      }
      return _switch;
    }()
  }, {
    key: "switch",
    value: function () {
      var _switch3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(telephonySessionId) {
        var switchedSessionId, _this$_onCallSwitched;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              this.setCallControlBusyTimestamp();
              _context24.n = 1;
              return this._switch(telephonySessionId);
            case 1:
              switchedSessionId = _context24.v;
              this.clearCallControlBusyTimestamp();
              if (switchedSessionId) {
                (_this$_onCallSwitched = this._onCallSwitchedFunc) === null || _this$_onCallSwitched === void 0 ? void 0 : _this$_onCallSwitched.call(this, switchedSessionId);
              }
              return _context24.a(2, switchedSessionId);
          }
        }, _callee24, this);
      }));
      function _switch(_x20) {
        return _switch3.apply(this, arguments);
      }
      return _switch;
    }()
  }, {
    key: "holdWithWebphone",
    value: function () {
      var _holdWithWebphone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(currentDeviceWebphoneId) {
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              _context25.n = 1;
              return this._webphone.hold(currentDeviceWebphoneId, this.holdErrorHandle);
            case 1:
              return _context25.a(2);
          }
        }, _callee25, this);
      }));
      function holdWithWebphone(_x21) {
        return _holdWithWebphone.apply(this, arguments);
      }
      return holdWithWebphone;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(telephonySessionId) {
        var session, currentDeviceWebphoneId, _t11;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              this.setCallControlBusyTimestamp();
              _context26.p = 1;
              session = this._getSessionById(telephonySessionId);
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId); // if current device call, using webphone directly
              if (!currentDeviceWebphoneId) {
                _context26.n = 3;
                break;
              }
              _context26.n = 2;
              return this.holdWithWebphone(currentDeviceWebphoneId);
            case 2:
              _context26.n = 4;
              break;
            case 3:
              _context26.n = 4;
              return session.hold();
            case 4:
              _context26.n = 6;
              break;
            case 5:
              _context26.p = 5;
              _t11 = _context26.v;
              this.holdErrorHandle(_t11);
            case 6:
              this.clearCallControlBusyTimestamp();
            case 7:
              return _context26.a(2);
          }
        }, _callee26, this, [[1, 5]]);
      }));
      function hold(_x22) {
        return _hold.apply(this, arguments);
      }
      return hold;
    }()
  }, {
    key: "_unholdWithWebphone",
    value: function () {
      var _unholdWithWebphone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(currentDeviceWebphoneId) {
        var _this$_webphone$origi;
        var session;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              session = (_this$_webphone$origi = this._webphone.originalSessions) === null || _this$_webphone$origi === void 0 ? void 0 : _this$_webphone$origi[currentDeviceWebphoneId];
              if (!(session === null || session === void 0 ? void 0 : session.localHold)) {
                _context27.n = 2;
                break;
              }
              _context27.n = 1;
              return this._webphone.unhold(currentDeviceWebphoneId, this.unholdErrorHandle);
            case 1:
              return _context27.a(2, true);
            case 2:
              return _context27.a(2, false);
          }
        }, _callee27, this);
      }));
      function _unholdWithWebphone(_x23) {
        return _unholdWithWebphone2.apply(this, arguments);
      }
      return _unholdWithWebphone;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(telephonySessionId) {
        var currentDeviceWebphoneId, result, session, _t12;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              this.setCallControlBusyTimestamp();
              _context28.p = 1;
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId);
              if (!currentDeviceWebphoneId) {
                _context28.n = 3;
                break;
              }
              _context28.n = 2;
              return this._unholdWithWebphone(currentDeviceWebphoneId);
            case 2:
              result = _context28.v;
            case 3:
              if (!(!currentDeviceWebphoneId || !result)) {
                _context28.n = 4;
                break;
              }
              session = this._getSessionById(telephonySessionId);
              _context28.n = 4;
              return session.unhold();
            case 4:
              // spring-ui not handle those logic inside the active call control
              // TODO: remove those logic after all project switch to spring-ui
              if (process.env.THEME_SYSTEM !== 'spring-ui') {
                this.setActiveSessionId(telephonySessionId);
              }
              _context28.n = 6;
              break;
            case 5:
              _context28.p = 5;
              _t12 = _context28.v;
              _context28.n = 6;
              return this.unholdErrorHandle(_t12);
            case 6:
              this.clearCallControlBusyTimestamp();
            case 7:
              return _context28.a(2);
          }
        }, _callee28, this, [[1, 5]]);
      }));
      function unhold(_x24) {
        return _unhold.apply(this, arguments);
      }
      return unhold;
    }()
  }, {
    key: "_replyWithMessage",
    value: function () {
      var _replyWithMessage2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(params, currentDeviceWebphoneId) {
        var _this0 = this;
        var webphoneReplyOption, result;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              if (!(params.replyWithText === '')) {
                _context29.n = 1;
                break;
              }
              this._toast.danger({
                message: (0, _i18n.t)('replyEmptyError'),
                ttl: 3000
              });
              return _context29.a(2);
            case 1:
              webphoneReplyOption = (0, _helpers.getWebphoneReplyMessageOption)(params);
              _context29.n = 2;
              return this._webphone.replyWithMessage(currentDeviceWebphoneId, webphoneReplyOption, function (error) {
                _nextCore.logger.error('replyWithMessage error', error);
                // TODO: check the logic of error handling
                _this0._showGeneralError();
              });
            case 2:
              result = _context29.v;
              if (result) {
                this._toast.success({
                  message: (0, _i18n.t)('replyCompleted')
                });
              }
            case 3:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function _replyWithMessage(_x25, _x26) {
        return _replyWithMessage2.apply(this, arguments);
      }
      return _replyWithMessage;
    }()
  }, {
    key: "replyWithMessage",
    value: function () {
      var _replyWithMessage3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(params, telephonySessionId) {
        var session, currentDeviceWebphoneId;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              if (session) {
                _context30.n = 1;
                break;
              }
              return _context30.a(2, false);
            case 1:
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId);
              _context30.n = 2;
              return this._replyWithMessage(params, currentDeviceWebphoneId);
            case 2:
              this.clearCallControlBusyTimestamp();
            case 3:
              return _context30.a(2);
          }
        }, _callee30, this);
      }));
      function replyWithMessage(_x27, _x28) {
        return _replyWithMessage3.apply(this, arguments);
      }
      return replyWithMessage;
    }()
  }, {
    key: "toVoicemail",
    value: function () {
      var _toVoicemail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(voicemailId, telephonySessionId) {
        var session, _t13;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.p = _context31.n) {
            case 0:
              _context31.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              if (session) {
                _context31.n = 1;
                break;
              }
              return _context31.a(2, false);
            case 1:
              _context31.n = 2;
              return session.transfer({
                voicemail: voicemailId
              });
            case 2:
              this.clearCallControlBusyTimestamp();
              this._toast.success({
                message: (0, _i18n.t)('transferCompleted')
              });
              _context31.n = 4;
              break;
            case 3:
              _context31.p = 3;
              _t13 = _context31.v;
              console.error('toVoicemail error', _t13);
              this._toast.warning({
                message: (0, _i18n.t)('toVoiceMailError')
              });
              this.clearCallControlBusyTimestamp();
            case 4:
              return _context31.a(2);
          }
        }, _callee31, this, [[0, 3]]);
      }));
      function toVoicemail(_x29, _x30) {
        return _toVoicemail.apply(this, arguments);
      }
      return toVoicemail;
    }()
  }, {
    key: "completeWarmTransfer",
    value: function () {
      var _completeWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(telephonySession) {
        var _this$transferCallMap, isOriginal, relatedTelephonySessionId, session, transferSession, _t14;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.p = _context32.n) {
            case 0:
              _context32.p = 0;
              this.setCallControlBusyTimestamp();
              _this$transferCallMap = this.transferCallMapping[telephonySession], isOriginal = _this$transferCallMap.isOriginal, relatedTelephonySessionId = _this$transferCallMap.relatedTelephonySessionId;
              session = this._getSessionById(isOriginal ? telephonySession : relatedTelephonySessionId);
              transferSession = this._getSessionById(isOriginal ? relatedTelephonySessionId : telephonySession);
              if (transferSession) {
                _context32.n = 1;
                break;
              }
              return _context32.a(2, false);
            case 1:
              _context32.n = 2;
              return session.bridge({
                telephonySessionId: transferSession.id,
                partyId: transferSession.party.id
              });
            case 2:
              this.clearCallControlBusyTimestamp();
              this._toast.success({
                message: (0, _i18n.t)('transferCompleted')
              });
              _context32.n = 4;
              break;
            case 3:
              _context32.p = 3;
              _t14 = _context32.v;
              console.error('warmTransfer error', _t14);
              this._showGeneralError();
              this.clearCallControlBusyTimestamp();
            case 4:
              return _context32.a(2);
          }
        }, _callee32, this, [[0, 3]]);
      }));
      function completeWarmTransfer(_x31) {
        return _completeWarmTransfer.apply(this, arguments);
      }
      return completeWarmTransfer;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(transferNumber, telephonySessionId) {
        var phoneNumber, session, params, _this$_availabilityMo8, _t15;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
            case 0:
              _context33.p = 0;
              this.setCallControlBusyTimestamp();
              _context33.n = 1;
              return this.getValidPhoneNumber(transferNumber);
            case 1:
              phoneNumber = _context33.v;
              if (!phoneNumber) {
                _context33.n = 3;
                break;
              }
              session = this._getSessionById(telephonySessionId);
              params = {};
              if (phoneNumber.startsWith('+')) {
                params.phoneNumber = phoneNumber;
              } else {
                params.extensionNumber = phoneNumber;
              }
              _context33.n = 2;
              return session.transfer(params);
            case 2:
              this.clearCallControlBusyTimestamp();
              this._toast.success({
                message: (0, _i18n.t)('transferCompleted')
              });
            case 3:
              _context33.n = 7;
              break;
            case 4:
              _context33.p = 4;
              _t15 = _context33.v;
              _context33.n = 5;
              return (_this$_availabilityMo8 = this._availabilityMonitor) === null || _this$_availabilityMo8 === void 0 ? void 0 : _this$_availabilityMo8.checkIfHAError(_t15);
            case 5:
              if (_context33.v) {
                _context33.n = 6;
                break;
              }
              this._toast.warning({
                message: (0, _i18n.t)('transferError')
              });
            case 6:
              this.clearCallControlBusyTimestamp();
            case 7:
              return _context33.a(2);
          }
        }, _callee33, this, [[0, 4]]);
      }));
      function transfer(_x32, _x33) {
        return _transfer.apply(this, arguments);
      }
      return transfer;
    }()
  }, {
    key: "getValidPhoneNumber",
    value: function () {
      var _getValidPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(phoneNumber, withMainNumber) {
        var _validPhoneNumber;
        var validPhoneNumber, validatedResult, _this$_appFeatures, isEDPEnabled, _validatedResult2, _parsedNumbers$0$avai, parsedNumbers, _numbers, _numbers$, result, _t16;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              if (this._permissionCheck) {
                _context34.n = 1;
                break;
              }
              validatedResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
                areaCode: this._regionSettings.areaCode,
                countryCode: this._regionSettings.countryCode,
                phoneNumbers: [phoneNumber]
              });
              validPhoneNumber = validatedResult[0];
              _context34.n = 8;
              break;
            case 1:
              isEDPEnabled = (_this$_appFeatures = this._appFeatures) === null || _this$_appFeatures === void 0 ? void 0 : _this$_appFeatures.isEDPEnabled;
              if (!isEDPEnabled) {
                _context34.n = 2;
                break;
              }
              _t16 = this._numberValidate.validate([phoneNumber]);
              _context34.n = 4;
              break;
            case 2:
              _context34.n = 3;
              return this._numberValidate.validateNumbers([phoneNumber]);
            case 3:
              _t16 = _context34.v;
            case 4:
              _validatedResult2 = _t16;
              if (_validatedResult2.result) {
                _context34.n = 5;
                break;
              }
              this._numberValidate.handleValidateToasts(_validatedResult2);
              return _context34.a(2);
            case 5:
              if (!isEDPEnabled) {
                _context34.n = 7;
                break;
              }
              _context34.n = 6;
              return this._numberValidate.parseNumbers([phoneNumber]);
            case 6:
              parsedNumbers = _context34.v;
              validPhoneNumber = (_parsedNumbers$0$avai = parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai !== void 0 ? _parsedNumbers$0$avai : parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].parsedNumber;
              _context34.n = 8;
              break;
            case 7:
              validPhoneNumber = (_numbers = _validatedResult2.numbers) === null || _numbers === void 0 ? void 0 : (_numbers$ = _numbers[0]) === null || _numbers$ === void 0 ? void 0 : _numbers$.e164;
            case 8:
              result = validPhoneNumber;
              if (withMainNumber && ((_validPhoneNumber = validPhoneNumber) === null || _validPhoneNumber === void 0 ? void 0 : _validPhoneNumber.indexOf('+')) === -1) {
                result = [this._accountInfo.mainCompanyNumber, validPhoneNumber].join('*');
              }
              return _context34.a(2, result);
          }
        }, _callee34, this);
      }));
      function getValidPhoneNumber(_x34, _x35) {
        return _getValidPhoneNumber.apply(this, arguments);
      }
      return getValidPhoneNumber;
    }()
  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(flipValue, telephonySessionId) {
        var session, _t17;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              _context35.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              _context35.n = 1;
              return session.flip({
                callFlipId: flipValue
              });
            case 1:
              this.clearCallControlBusyTimestamp();
              _context35.n = 3;
              break;
            case 2:
              _context35.p = 2;
              _t17 = _context35.v;
              console.error('flip error', _t17);
              this.clearCallControlBusyTimestamp();
              throw _t17;
            case 3:
              return _context35.a(2);
          }
        }, _callee35, this, [[0, 2]]);
      }));
      function flip(_x36, _x37) {
        return _flip.apply(this, arguments);
      }
      return flip;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(forwardNumber, telephonySessionId) {
        var session, validatedResult, validPhoneNumber, _this$_appFeatures2, isEDPEnabled, _validatedResult, parsedNumbers, _parsedNumbers$0$avai2, _numbers2, _numbers2$, currentDeviceWebphoneId, params, _t18, _t19;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.p = _context36.n) {
            case 0:
              session = this._getSessionById(telephonySessionId);
              if (session) {
                _context36.n = 1;
                break;
              }
              return _context36.a(2, false);
            case 1:
              _context36.p = 1;
              if (this._permissionCheck) {
                _context36.n = 2;
                break;
              }
              validatedResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: this._brand.brandConfig.allowRegionSettings,
                areaCode: this._regionSettings.areaCode,
                countryCode: this._regionSettings.countryCode,
                phoneNumbers: [forwardNumber]
              });
              validPhoneNumber = validatedResult[0];
              _context36.n = 9;
              break;
            case 2:
              isEDPEnabled = (_this$_appFeatures2 = this._appFeatures) === null || _this$_appFeatures2 === void 0 ? void 0 : _this$_appFeatures2.isEDPEnabled;
              if (!isEDPEnabled) {
                _context36.n = 3;
                break;
              }
              _t18 = this._numberValidate.validate([forwardNumber]);
              _context36.n = 5;
              break;
            case 3:
              _context36.n = 4;
              return this._numberValidate.validateNumbers([forwardNumber]);
            case 4:
              _t18 = _context36.v;
            case 5:
              _validatedResult = _t18;
              validatedResult = _validatedResult;
              if (_validatedResult.result) {
                _context36.n = 6;
                break;
              }
              this._numberValidate.handleValidateToasts(_validatedResult);
              return _context36.a(2, false);
            case 6:
              if (!isEDPEnabled) {
                _context36.n = 8;
                break;
              }
              _context36.n = 7;
              return this._numberValidate.parseNumbers([forwardNumber]);
            case 7:
              parsedNumbers = _context36.v;
              if (parsedNumbers) {
                validPhoneNumber = (_parsedNumbers$0$avai2 = parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai2 !== void 0 ? _parsedNumbers$0$avai2 : parsedNumbers[0].parsedNumber;
              }
              _context36.n = 9;
              break;
            case 8:
              validPhoneNumber = (_numbers2 = validatedResult.numbers) === null || _numbers2 === void 0 ? void 0 : (_numbers2$ = _numbers2[0]) === null || _numbers2$ === void 0 ? void 0 : _numbers2$.e164;
            case 9:
              if (validPhoneNumber) {
                _context36.n = 10;
                break;
              }
              return _context36.a(2);
            case 10:
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId); // if current device call, using webphone directly
              if (!currentDeviceWebphoneId) {
                _context36.n = 12;
                break;
              }
              _context36.n = 11;
              return this._webphone.forward(currentDeviceWebphoneId, validPhoneNumber);
            case 11:
              _context36.n = 13;
              break;
            case 12:
              params = {};
              if (forwardNumber.length > 5) {
                params.phoneNumber = forwardNumber;
              } else {
                params.extensionNumber = forwardNumber;
              }
              return _context36.a(2, session.forward(params));
            case 13:
              this._toast.success({
                message: (0, _i18n.t)('forwardSuccess')
              });
              if (typeof this._onCallEndFunc === 'function') {
                this._onCallEndFunc();
              }
              return _context36.a(2, true);
            case 14:
              _context36.p = 14;
              _t19 = _context36.v;
              console.error('transfer fail', _t19);
              this._toast.warning({
                message: (0, _i18n.t)('failWithoutStatusCode', {
                  brandName: this._brand.name
                })
              });
              return _context36.a(2, false);
          }
        }, _callee36, this, [[1, 14]]);
      }));
      function forward(_x38, _x39) {
        return _forward.apply(this, arguments);
      }
      return forward;
    }() // DTMF handing by webphone session temporary, due to rc call session doesn't support currently
  }, {
    key: "sendDTMF",
    value: function () {
      var _sendDTMF = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(dtmfValue, telephonySessionId) {
        var currentDeviceWebphoneId, _t20;
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.p = _context37.n) {
            case 0:
              _context37.p = 0;
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId); // if current device call, using webphone directly
              if (!currentDeviceWebphoneId) {
                _context37.n = 1;
                break;
              }
              _context37.n = 1;
              return this._webphone.sendDTMF(dtmfValue, currentDeviceWebphoneId);
            case 1:
              _context37.n = 3;
              break;
            case 2:
              _context37.p = 2;
              _t20 = _context37.v;
              console.log('send dtmf error', _t20);
              throw _t20;
            case 3:
              return _context37.a(2);
          }
        }, _callee37, this, [[0, 2]]);
      }));
      function sendDTMF(_x40, _x41) {
        return _sendDTMF.apply(this, arguments);
      }
      return sendDTMF;
    }()
  }, {
    key: "setPickUpCallData",
    value: function setPickUpCallData(data) {
      this.pickUpCallDataMap = _objectSpread({}, data);
    }
  }, {
    key: "_answer",
    value: function () {
      var _answer2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(telephonySessionId) {
        var needPickupCall,
          currentDeviceWebphoneId,
          data,
          _args38 = arguments;
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.p = _context38.n) {
            case 0:
              needPickupCall = _args38.length > 1 && _args38[1] !== undefined ? _args38[1] : false;
              _context38.p = 1;
              this.setCallControlBusyTimestamp();
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId); // if current device call, using webphone directly
              if (!(currentDeviceWebphoneId && !needPickupCall)) {
                _context38.n = 3;
                break;
              }
              _context38.n = 2;
              return this._webphone.answer(currentDeviceWebphoneId);
            case 2:
              _context38.n = 4;
              break;
            case 3:
              data = this.pickUpCallDataMap[telephonySessionId];
              _context38.n = 4;
              return this.pickUpCall(telephonySessionId, data);
            case 4:
              _context38.p = 4;
              this.clearCallControlBusyTimestamp();
              return _context38.f(4);
            case 5:
              return _context38.a(2);
          }
        }, _callee38, this, [[1,, 4, 5]]);
      }));
      function _answer(_x42) {
        return _answer2.apply(this, arguments);
      }
      return _answer;
    }()
  }, {
    key: "pickUpCall",
    value: function () {
      var _pickUpCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(telephonySessionId, data) {
        var _this$ringMessages$te;
        var session;
        return _regenerator().w(function (_context39) {
          while (1) switch (_context39.n) {
            case 0:
              session = (_this$ringMessages$te = this.ringMessages[telephonySessionId]) !== null && _this$ringMessages$te !== void 0 ? _this$ringMessages$te : {};
              _context39.n = 1;
              return this._webphone.pickupInboundCall(data !== null && data !== void 0 ? data : {
                serverId: session.serverId,
                sessionId: session.sessionId,
                telephonySessionId: session.telephonySessionId,
                // @ts-ignore
                toNumber: session.to,
                // @ts-ignore
                fromNumber: session.from
              });
            case 1:
              return _context39.a(2);
          }
        }, _callee39, this);
      }));
      function pickUpCall(_x43, _x44) {
        return _pickUpCall.apply(this, arguments);
      }
      return pickUpCall;
    }()
  }, {
    key: "answer",
    value: function () {
      var _answer3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(telephonySessionId) {
        var currentDeviceWebphoneId, needPickupCall, _t21;
        return _regenerator().w(function (_context40) {
          while (1) switch (_context40.p = _context40.n) {
            case 0:
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId);
              needPickupCall = false;
              if (!currentDeviceWebphoneId) {
                _context40.n = 2;
                break;
              }
              _context40.n = 1;
              return this._webphone.switchWebphoneInstance();
            case 1:
              needPickupCall = _context40.v;
            case 2:
              _context40.p = 2;
              _context40.n = 3;
              return this._answer(telephonySessionId, needPickupCall);
            case 3:
              _context40.n = 5;
              break;
            case 4:
              _context40.p = 4;
              _t21 = _context40.v;
              this.logger.log('answer failed.', _t21);
            case 5:
              return _context40.a(2);
          }
        }, _callee40, this, [[2, 4]]);
      }));
      function answer(_x45) {
        return _answer3.apply(this, arguments);
      }
      return answer;
    }()
  }, {
    key: "answerAndHold",
    value: function () {
      var _answerAndHold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(telephonySessionId) {
        var currentDeviceWebphoneId, needPickupCall, _t22;
        return _regenerator().w(function (_context41) {
          while (1) switch (_context41.p = _context41.n) {
            case 0:
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId);
              needPickupCall = false;
              if (!currentDeviceWebphoneId) {
                _context41.n = 2;
                break;
              }
              _context41.n = 1;
              return this._webphone.switchWebphoneInstance();
            case 1:
              needPickupCall = _context41.v;
            case 2:
              _context41.p = 2;
              _context41.n = 3;
              return this._answer(telephonySessionId, needPickupCall);
            case 3:
              _context41.n = 5;
              break;
            case 4:
              _context41.p = 4;
              _t22 = _context41.v;
              console.log('answer hold failed.', _t22);
            case 5:
              return _context41.a(2);
          }
        }, _callee41, this, [[2, 4]]);
      }));
      function answerAndHold(_x46) {
        return _answerAndHold.apply(this, arguments);
      }
      return answerAndHold;
    }()
  }, {
    key: "ignore",
    value: function () {
      var _ignore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43(telephonySessionId) {
        var _this1 = this;
        var currentDeviceWebphoneId, _this$onCallIgnoreFun, session, _t23;
        return _regenerator().w(function (_context43) {
          while (1) switch (_context43.p = _context43.n) {
            case 0:
              currentDeviceWebphoneId = this._getCurrentDeviceCallsBySessionId(telephonySessionId);
              if (currentDeviceWebphoneId) {
                _context43.n = 1;
                break;
              }
              _nextCore.logger.log('[ActiveCallControl] not in current device, not able to ignore.');
              return _context43.a(2);
            case 1:
              this.setCallControlBusyTimestamp();
              _context43.p = 2;
              session = this._getSessionById(telephonySessionId);
              _context43.n = 3;
              return this._webphone.reject(currentDeviceWebphoneId);
            case 3:
              (_this$onCallIgnoreFun = this.onCallIgnoreFunc) === null || _this$onCallIgnoreFun === void 0 ? void 0 : _this$onCallIgnoreFun.call(this, session.party.id);
              // hack for update sessions, then incoming call log page can re-render
              setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42() {
                return _regenerator().w(function (_context42) {
                  while (1) switch (_context42.n) {
                    case 0:
                      _context42.n = 1;
                      return _this1.updateActiveSessions();
                    case 1:
                      return _context42.a(2, _context42.v);
                  }
                }, _callee42);
              })), 0);
              _context43.n = 5;
              break;
            case 4:
              _context43.p = 4;
              _t23 = _context43.v;
              _nextCore.logger.log('[ActiveCallControl] ignore failed.', _t23);
            case 5:
              this.clearCallControlBusyTimestamp();
            case 6:
              return _context43.a(2);
          }
        }, _callee43, this, [[2, 4]]);
      }));
      function ignore(_x47) {
        return _ignore.apply(this, arguments);
      }
      return ignore;
    }()
  }, {
    key: "answerAndEnd",
    value: function () {
      var _answerAndEnd = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee44(telephonySessionId) {
        var _this10 = this;
        var needPickupCall,
          currentActiveCalls,
          _iterator2,
          _step2,
          s,
          _args44 = arguments,
          _t24,
          _t25;
        return _regenerator().w(function (_context44) {
          while (1) switch (_context44.p = _context44.n) {
            case 0:
              needPickupCall = _args44.length > 1 && _args44[1] !== undefined ? _args44[1] : false;
              _context44.p = 1;
              if (!this.busy) {
                _context44.n = 2;
                break;
              }
              return _context44.a(2);
            case 2:
              currentActiveCalls = this._rcCallControl.sessions.filter(function (s) {
                var _s$party, _s$party$status, _s$party2, _s$party3, _s$party3$status;
                var currentDeviceWebphoneId = _this10._getCurrentDeviceCallsBySessionId(s.id);
                return s.id !== telephonySessionId && currentDeviceWebphoneId && (((_s$party = s.party) === null || _s$party === void 0 ? void 0 : (_s$party$status = _s$party.status) === null || _s$party$status === void 0 ? void 0 : _s$party$status.code) === _Session.PartyStatusCode.answered || ((_s$party2 = s.party) === null || _s$party2 === void 0 ? void 0 : _s$party2.direction) === _callDirections.callDirection.outbound && ((_s$party3 = s.party) === null || _s$party3 === void 0 ? void 0 : (_s$party3$status = _s$party3.status) === null || _s$party3$status === void 0 ? void 0 : _s$party3$status.code) === _Session.PartyStatusCode.proceeding);
              });
              _iterator2 = _createForOfIteratorHelper(currentActiveCalls);
              _context44.p = 3;
              _iterator2.s();
            case 4:
              if ((_step2 = _iterator2.n()).done) {
                _context44.n = 6;
                break;
              }
              s = _step2.value;
              _context44.n = 5;
              return this.hangUp(s.id);
            case 5:
              _context44.n = 4;
              break;
            case 6:
              _context44.n = 8;
              break;
            case 7:
              _context44.p = 7;
              _t24 = _context44.v;
              _iterator2.e(_t24);
            case 8:
              _context44.p = 8;
              _iterator2.f();
              return _context44.f(8);
            case 9:
              _context44.n = 10;
              return this._answer(telephonySessionId, needPickupCall);
            case 10:
              _context44.n = 12;
              break;
            case 11:
              _context44.p = 11;
              _t25 = _context44.v;
              console.log('answer and end fail.');
              console.error(_t25);
            case 12:
              return _context44.a(2);
          }
        }, _callee44, this, [[3, 7, 8, 9], [1, 11]]);
      }));
      function answerAndEnd(_x48) {
        return _answerAndEnd.apply(this, arguments);
      }
      return answerAndEnd;
    }() // TODO: after full migrate to spring-ui, can remove the condition
    // only spring-ui track at root, others track from view
  }, {
    key: "startWarmTransfer",
    value: function () {
      var _startWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee45(transferNumber, telephonySessionId) {
        var toNumber, _t26;
        return _regenerator().w(function (_context45) {
          while (1) switch (_context45.p = _context45.n) {
            case 0:
              _context45.p = 0;
              this.setCallControlBusyTimestamp();
              _context45.n = 1;
              return this.getValidPhoneNumber(transferNumber);
            case 1:
              toNumber = _context45.v;
              if (toNumber) {
                _context45.n = 2;
                break;
              }
              throw new Error('Invalid phone number');
            case 2:
              return _context45.a(2, this.makeCall({
                toNumber: toNumber,
                transferSessionId: telephonySessionId
              }));
            case 3:
              _context45.p = 3;
              _t26 = _context45.v;
              this._toast.danger({
                message: (0, _i18n.t)('somethingWentWrong')
              });
            case 4:
              _context45.p = 4;
              this.clearCallControlBusyTimestamp();
              return _context45.f(4);
            case 5:
              return _context45.a(2);
          }
        }, _callee45, this, [[0, 3, 4, 5]]);
      }));
      function startWarmTransfer(_x49, _x50) {
        return _startWarmTransfer.apply(this, arguments);
      }
      return startWarmTransfer;
    }()
  }, {
    key: "setWarmTransferMapping",
    value: function setWarmTransferMapping(originalId, transferredId) {
      this.transferCallMapping[originalId] = {
        relatedTelephonySessionId: transferredId,
        isOriginal: true
      };
      this.transferCallMapping[transferredId] = {
        relatedTelephonySessionId: originalId,
        isOriginal: false
      };
    }
  }, {
    key: "cleanCurrentWarmTransferData",
    value: function cleanCurrentWarmTransferData(cleanCalls) {
      var _this11 = this;
      cleanCalls.forEach(function (call) {
        var telephonySessionId = call.telephonySessionId;
        var transferringData = _this11.transferCallMapping[telephonySessionId];
        if (transferringData) {
          _nextCore.logger.log("[".concat(_this11.identifier, "] clean not exist warm transfer call"), _objectSpread({
            telephonySessionId: telephonySessionId
          }, transferringData));
          delete _this11.transferCallMapping[call.telephonySessionId];
          delete _this11.transferCallMapping[transferringData.relatedTelephonySessionId];
        }
      });
    }

    // TODO: similar logic in apps/micro-phone/src/app/services/Call/Call.ts:475 should unify
  }, {
    key: "getDefaultFromNumber",
    value: function () {
      var _getDefaultFromNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee46() {
        var isWebphone, theFromNumber, _ref11, _ref12, formatted, _t27;
        return _regenerator().w(function (_context46) {
          while (1) switch (_context46.n) {
            case 0:
              isWebphone = this._callingSettings.isWebphoneMode;
              if (!isWebphone) {
                _context46.n = 1;
                break;
              }
              return _context46.a(2, this._callingSettings.fromNumber);
            case 1:
              theFromNumber = this._callingSettings.myLocation;
              if (!(theFromNumber && theFromNumber.length > 0)) {
                _context46.n = 4;
                break;
              }
              _context46.n = 2;
              return this._numberValidate.parseNumbers([theFromNumber]);
            case 2:
              _t27 = _context46.v;
              if (_t27) {
                _context46.n = 3;
                break;
              }
              _t27 = [];
            case 3:
              _ref11 = _t27;
              _ref12 = _slicedToArray(_ref11, 1);
              formatted = _ref12[0];
              return _context46.a(2, formatted === null || formatted === void 0 ? void 0 : formatted.parsedNumber);
            case 4:
              return _context46.a(2, undefined);
          }
        }, _callee46, this);
      }));
      function getDefaultFromNumber() {
        return _getDefaultFromNumber.apply(this, arguments);
      }
      return getDefaultFromNumber;
    }()
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee47(params) {
        var result, _t28, _t29, _t30, _t31, _t32, _t33, _t34;
        return _regenerator().w(function (_context47) {
          while (1) switch (_context47.p = _context47.n) {
            case 0:
              _context47.p = 0;
              _t28 = this._webphone;
              _t30 = params.fromNumber;
              if (_t30) {
                _context47.n = 2;
                break;
              }
              _context47.n = 1;
              return this.getDefaultFromNumber();
            case 1:
              _t30 = _context47.v;
            case 2:
              _t29 = _t30;
              if (_t29) {
                _context47.n = 3;
                break;
              }
              _t29 = undefined;
            case 3:
              _t31 = _t29;
              _t32 = params.homeCountryId;
              _t33 = params.toNumber;
              _context47.n = 4;
              return _t28.makeCall.call(_t28, {
                fromNumber: _t31,
                homeCountryId: _t32,
                toNumber: _t33
              });
            case 4:
              result = _context47.v;
              if (result && result.id && params.transferSessionId) {
                this._initWebphoneSessionEvents(result.id, params.transferSessionId);
              }
              return _context47.a(2, result);
            case 5:
              _context47.p = 5;
              _t34 = _context47.v;
              console.log('make call fail.', _t34);
              return _context47.a(2, null);
          }
        }, _callee47, this, [[0, 5]]);
      }));
      function makeCall(_x51) {
        return _makeCall.apply(this, arguments);
      }
      return makeCall;
    }()
  }, {
    key: "_initWebphoneSessionEvents",
    value: function () {
      var _initWebphoneSessionEvents2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee49(webphoneSessionId, transferSessionId) {
        var _this12 = this;
        var webphoneOriginalSession;
        return _regenerator().w(function (_context49) {
          while (1) switch (_context49.n) {
            case 0:
              webphoneOriginalSession = this._webphone.originalSessions[webphoneSessionId]; // TODO: should fix the memory leak issue, should remove the event listener when the session is destroyed or done
              webphoneOriginalSession.on('progress', /*#__PURE__*/function () {
                var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee48(request) {
                  var partyData;
                  return _regenerator().w(function (_context48) {
                    while (1) switch (_context48.n) {
                      case 0:
                        // Event "progress" is triggered 3 times for establishing webphone session
                        // The first two triggers are missing party data in the request headers
                        partyData = (0, _webphoneHelper.readPartyDataFromHeaders)(request.headers);
                        if (!partyData) {
                          _context48.n = 1;
                          break;
                        }
                        _context48.n = 1;
                        return _this12._onWebphoneSessionProgress(partyData.sessionId, transferSessionId);
                      case 1:
                        return _context48.a(2);
                    }
                  }, _callee48);
                }));
                return function (_x54) {
                  return _ref13.apply(this, arguments);
                };
              }());
            case 1:
              return _context49.a(2);
          }
        }, _callee49, this);
      }));
      function _initWebphoneSessionEvents(_x52, _x53) {
        return _initWebphoneSessionEvents2.apply(this, arguments);
      }
      return _initWebphoneSessionEvents;
    }()
    /**
     * merge two calls into a conference
     *
     * @returns the conference telephonySessionId
     */
  }, {
    key: "mergeCalls",
    value: (function () {
      var _mergeCalls = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee50(telephonySessionId, telephonySessionIdToMergeWith) {
        var session, mergeWithSession, sourceSession, mergeWithSessionData, conferenceSession, conferenceSessionId, _t35, _t36;
        return _regenerator().w(function (_context50) {
          while (1) switch (_context50.p = _context50.n) {
            case 0:
              session = this._getSessionById(telephonySessionId);
              mergeWithSession = this._getSessionById(telephonySessionIdToMergeWith);
              if (!(!session || !mergeWithSession)) {
                _context50.n = 1;
                break;
              }
              _nextCore.logger.log('mergeCalls: session not found', !session, !mergeWithSession);
              return _context50.a(2);
            case 1:
              sourceSession = this.getSession(telephonySessionId);
              mergeWithSessionData = this.getSession(telephonySessionIdToMergeWith);
              if (!(sourceSession && sourceSession.conferenceParticipants.length >= MAXIMUM_CONF_PARTICIPANTS || mergeWithSessionData && mergeWithSessionData.conferenceParticipants.length >= MAXIMUM_CONF_PARTICIPANTS)) {
                _context50.n = 2;
                break;
              }
              this._toast.danger({
                message: (0, _i18n.t)('tooManyParticipants')
              });
              return _context50.a(2);
            case 2:
              if (!(session.origin.type !== _helpers.CONFERENCE_ORIGIN_TYPE && mergeWithSession.origin.type !== _helpers.CONFERENCE_ORIGIN_TYPE)) {
                _context50.n = 10;
                break;
              }
              _context50.p = 3;
              this.setCallControlBusyTimestamp();
              _context50.n = 4;
              return this._createConferenceSession();
            case 4:
              conferenceSession = _context50.v;
              _context50.n = 5;
              return conferenceSession.bringInParty({
                partyId: session.party.id,
                sessionId: session.sessionId
              });
            case 5:
              _nextCore.logger.log("[".concat(this.identifier, "] bringInParty"), session);
              // pre inset the session to avoid the that show in end call
              if (process.env.THEME_SYSTEM === 'spring-ui') {
                this._preInsertCall.setPreinsert(session.id, 'bringInParty');
              }
              _context50.n = 6;
              return conferenceSession.bringInParty({
                partyId: mergeWithSession.party.id,
                sessionId: mergeWithSession.sessionId
              });
            case 6:
              _nextCore.logger.log("[".concat(this.identifier, "] bringInParty"), mergeWithSession);
              if (process.env.THEME_SYSTEM === 'spring-ui') {
                this._preInsertCall.setPreinsert(mergeWithSession.id, 'bringInParty');
              }
              this._toast.success({
                message: (0, _i18n.t)('callsMerged')
              });
              return _context50.a(2, conferenceSession.id);
            case 7:
              _context50.p = 7;
              _t35 = _context50.v;
              console.log('error in mergeCalls', _t35);
              this._toast.danger({
                message: (0, _i18n.t)('somethingWentWrong')
              });
            case 8:
              _context50.p = 8;
              this.clearCallControlBusyTimestamp();
              return _context50.f(8);
            case 9:
              return _context50.a(2);
            case 10:
              _context50.p = 10;
              this.setCallControlBusyTimestamp();
              _context50.n = 11;
              return this.addPartyToSession(session, mergeWithSession);
            case 11:
              conferenceSessionId = _context50.v;
              this._toast.success({
                message: (0, _i18n.t)('callsMerged')
              });
              return _context50.a(2, conferenceSessionId);
            case 12:
              _context50.p = 12;
              _t36 = _context50.v;
              console.log('error in mergeCalls one', _t36);
              this._toast.danger({
                message: (0, _i18n.t)('somethingWentWrong')
              });
            case 13:
              _context50.p = 13;
              this.clearCallControlBusyTimestamp();
              return _context50.f(13);
            case 14:
              return _context50.a(2);
          }
        }, _callee50, this, [[10, 12, 13, 14], [3, 7, 8, 9]]);
      }));
      function mergeCalls(_x55, _x56) {
        return _mergeCalls.apply(this, arguments);
      }
      return mergeCalls;
    }())
  }, {
    key: "addPartyToSession",
    value: function () {
      var _addPartyToSession = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee51(session, mergeWithSession) {
        return _regenerator().w(function (_context51) {
          while (1) switch (_context51.n) {
            case 0:
              if (!(session.origin.type === _helpers.CONFERENCE_ORIGIN_TYPE)) {
                _context51.n = 2;
                break;
              }
              _context51.n = 1;
              return session.bringInParty({
                partyId: mergeWithSession.party.id,
                sessionId: mergeWithSession.id
              });
            case 1:
              if (process.env.THEME_SYSTEM === 'spring-ui') {
                this._preInsertCall.setPreinsert(mergeWithSession.id, 'bringInParty');
              }
              return _context51.a(2, session.id);
            case 2:
              if (!(mergeWithSession.origin.type === _helpers.CONFERENCE_ORIGIN_TYPE)) {
                _context51.n = 4;
                break;
              }
              _context51.n = 3;
              return mergeWithSession.bringInParty({
                partyId: session.party.id,
                sessionId: session.id
              });
            case 3:
              if (process.env.THEME_SYSTEM === 'spring-ui') {
                this._preInsertCall.setPreinsert(session.id, 'bringInParty');
              }
              return _context51.a(2, mergeWithSession.id);
            case 4:
              return _context51.a(2);
          }
        }, _callee51, this);
      }));
      function addPartyToSession(_x57, _x58) {
        return _addPartyToSession.apply(this, arguments);
      }
      return addPartyToSession;
    }()
  }, {
    key: "_createConferenceSession",
    value: function () {
      var _createConferenceSession2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee52() {
        var conferenceSession, voiceCallToken;
        return _regenerator().w(function (_context52) {
          while (1) switch (_context52.n) {
            case 0:
              _context52.n = 1;
              return this._rcCallControl.createConference();
            case 1:
              conferenceSession = _context52.v;
              voiceCallToken = conferenceSession.data.voiceCallToken;
              _context52.n = 2;
              return this._initConferenceVoiceCall(voiceCallToken);
            case 2:
              return _context52.a(2, conferenceSession);
          }
        }, _callee52, this);
      }));
      function _createConferenceSession() {
        return _createConferenceSession2.apply(this, arguments);
      }
      return _createConferenceSession;
    }()
  }, {
    key: "_initConferenceVoiceCall",
    value: function () {
      var _initConferenceVoiceCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee53(voiceCallToken) {
        var webphoneSession;
        return _regenerator().w(function (_context53) {
          while (1) switch (_context53.n) {
            case 0:
              _context53.n = 1;
              return this.makeCall({
                toNumber: voiceCallToken,
                homeCountryId: this._regionSettings.homeCountryId
              });
            case 1:
              webphoneSession = _context53.v;
              if (!webphoneSession) {
                _context53.n = 2;
                break;
              }
              _context53.n = 2;
              return this._waitForWebphoneSessionAccepted(webphoneSession.id);
            case 2:
              return _context53.a(2, webphoneSession);
          }
        }, _callee53, this);
      }));
      function _initConferenceVoiceCall(_x59) {
        return _initConferenceVoiceCall2.apply(this, arguments);
      }
      return _initConferenceVoiceCall;
    }()
  }, {
    key: "_waitForWebphoneSessionAccepted",
    value: function () {
      var _waitForWebphoneSessionAccepted2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee54(webphoneSessionId) {
        var sipSession, reject$, resolve$, timeout$;
        return _regenerator().w(function (_context54) {
          while (1) switch (_context54.n) {
            case 0:
              sipSession = this._webphone.originalSessions[webphoneSessionId];
              if (sipSession) {
                _context54.n = 1;
                break;
              }
              throw new Error('conferencing session not found');
            case 1:
              reject$ = (0, _rxjs.merge)((0, _rxjs.fromEvent)(sipSession, 'cancel'), (0, _rxjs.fromEvent)(sipSession, 'failed'), (0, _rxjs.fromEvent)(sipSession, 'rejected'), (0, _rxjs.fromEvent)(sipSession, 'terminated')).pipe((0, _rxjs.tap)(function (e) {
                _nextCore.logger.log('[waitForWebphoneSessionAccepted] error', e);
                throw new Error('conferencing failed');
              }));
              resolve$ = (0, _rxjs.fromEvent)(sipSession, 'accepted').pipe((0, _rxjs.map)(function () {
                return sipSession.id;
              }));
              timeout$ = (0, _rxjs.timer)(DEFAULT_CONF_ACCEPT_TIMEOUT).pipe((0, _rxjs.tap)(function () {
                throw new Error('conferencing timeout');
              }));
              _context54.n = 2;
              return (0, _rxjs.firstValueFrom)((0, _rxjs.merge)(reject$, resolve$, timeout$));
            case 2:
              return _context54.a(2, _context54.v);
          }
        }, _callee54, this);
      }));
      function _waitForWebphoneSessionAccepted(_x60) {
        return _waitForWebphoneSessionAccepted2.apply(this, arguments);
      }
      return _waitForWebphoneSessionAccepted;
    }()
  }, {
    key: "removeConferenceParticipant",
    value: function () {
      var _removeConferenceParticipant = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee55(telephonySessionId, removedPartyId) {
        var confSession, _t37;
        return _regenerator().w(function (_context55) {
          while (1) switch (_context55.p = _context55.n) {
            case 0:
              _context55.p = 0;
              this.setCallControlBusyTimestamp();
              confSession = this._getSessionById(telephonySessionId);
              _context55.n = 1;
              return confSession.removeParty(removedPartyId);
            case 1:
              if (!(process.env.THEME_SYSTEM === 'spring-ui')) {
                _context55.n = 3;
                break;
              }
              _context55.n = 2;
              return this._preInsertCall.setPreinsert((0, _PreinsertCall.createConferenceParticipantRemovalId)(telephonySessionId, removedPartyId), 'partyRemoved');
            case 2:
              _context55.n = 3;
              return this.updateActiveSessions();
            case 3:
              _context55.n = 5;
              break;
            case 4:
              _context55.p = 4;
              _t37 = _context55.v;
              console.log('removeConferenceParticipant error', _t37);
              this._toast.danger({
                message: (0, _i18n.t)('somethingWentWrong')
              });
            case 5:
              _context55.p = 5;
              this.clearCallControlBusyTimestamp();
              return _context55.f(5);
            case 6:
              return _context55.a(2);
          }
        }, _callee55, this, [[0, 4, 5, 6]]);
      }));
      function removeConferenceParticipant(_x61, _x62) {
        return _removeConferenceParticipant.apply(this, arguments);
      }
      return removeConferenceParticipant;
    }()
  }, {
    key: "_onWebphoneSessionProgress",
    value: function () {
      var _onWebphoneSessionProgress2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee56(telephonySessionId, transferSessionId) {
        return _regenerator().w(function (_context56) {
          while (1) switch (_context56.n) {
            case 0:
              // For SpringUI: Always set warm transfer mapping if transferSessionId is provided
              // Keep original logic for other projects
              if (process.env.THEME_SYSTEM === 'spring-ui') {
                if (telephonySessionId && transferSessionId) {
                  this.setWarmTransferMapping(transferSessionId, telephonySessionId);
                }
              } else {
                // spring-ui not handle those logic inside the active call control
                // TODO: remove those logic after all project switch to spring-ui
                if (this.activeSessionId !== telephonySessionId) {
                  this.setActiveSessionId(telephonySessionId);
                  if (transferSessionId) {
                    this.setWarmTransferMapping(transferSessionId, telephonySessionId);
                  }
                }
              }
            case 1:
              return _context56.a(2);
          }
        }, _callee56, this);
      }));
      function _onWebphoneSessionProgress(_x63, _x64) {
        return _onWebphoneSessionProgress2.apply(this, arguments);
      }
      return _onWebphoneSessionProgress;
    }()
    /**
     * get active session by telephonySessionId
     */
  }, {
    key: "getActiveSession",
    value: function getActiveSession(telephonySessionId) {
      if (!telephonySessionId) {
        return undefined;
      }
      return this.activeSessions[telephonySessionId];
    }
  }, {
    key: "getSession",
    value: function getSession(telephonySessionId) {
      return this.sessionsMap[telephonySessionId];
    }

    /**
     * Get the active session(accepted call)
     */
  }, {
    key: "activeSession",
    get: function get() {
      return this.getActiveSession(this.activeSessionId);
    }
  }, {
    key: "ringSessions",
    get: function get() {
      if (!this.sessions) {
        return [];
      }
      return this.sessions.filter(function (session) {
        return (0, _helpers.isProceeding)(session);
      });
    }
  }, {
    key: "activeSessions",
    get: function get() {
      var _this13 = this;
      return this.sessions.reduce(function (acc, session) {
        var webphoneSession = _this13._findWebphoneSession(session.telephonySessionId);
        acc[session.id] = (0, _helpers.normalizeSession)(session, webphoneSession);
        return acc;
      }, {});
    }
  }, {
    key: "sessionIdToTelephonySessionIdMapping",
    get: function get() {
      return this._presence.calls.reduce(function (accumulator, call) {
        var telephonySessionId = call.telephonySessionId,
          sessionId = call.sessionId;
        accumulator[sessionId] = telephonySessionId;
        return accumulator;
      }, {});
    }
  }, {
    key: "currentDeviceCallsMap",
    get: function get() {
      if (!this._webphone) {
        return {};
      }
      var currentDeviceCallsMap = {};
      this._webphone.sessions.forEach(function (session) {
        var _session$partyData;
        var telephonySessionId = (_session$partyData = session.partyData) === null || _session$partyData === void 0 ? void 0 : _session$partyData.sessionId;
        currentDeviceCallsMap[telephonySessionId] = session.id;
      });
      return currentDeviceCallsMap;
    }

    /**
     * Mitigation strategy for avoiding 404/409 on call control endpoints.
     * This should gradually move towards per session controls rather than
     * a global busy timeout.
     */
  }, {
    key: "busy",
    get: function get() {
      return Date.now() - this.busyTimestamp < DEFAULT_BUSY_TIMEOUT;
    }

    // This should reflect on the app permissions setting in DWP
  }, {
    key: "hasPermission",
    get: function get() {
      return this._appFeatures.hasCallControl;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }
  }, {
    key: "hasCallInRecording",
    get: function get() {
      return this.sessions.some(function (session) {
        return (0, _helpers.isRecording)(session);
      });
    }
  }, {
    key: "activeSessionId",
    get: function get() {
      return this.data.activeSessionId;
    }
  }, {
    key: "busyTimestamp",
    get: function get() {
      return this.data.busyTimestamp;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.data.timestamp;
    }
  }, {
    key: "sessions",
    get: function get() {
      return this.data.sessions;
    }
  }, {
    key: "sessionsMap",
    get: function get() {
      return this.sessions.reduce(function (acc, session) {
        acc[session.telephonySessionId] = session;
        return acc;
      }, {});
    }
  }, {
    key: "dialpadOpenTrack",
    value: function dialpadOpenTrack() {
      //
    }
  }, {
    key: "dialpadCloseTrack",
    value: function dialpadCloseTrack() {
      //
    }
  }, {
    key: "clickTransferTrack",
    value: function clickTransferTrack() {
      //
    }
  }, {
    key: "clickForwardTrack",
    value: function clickForwardTrack() {
      //
    }
  }, {
    key: "clickConferenceCallMerge",
    value: function clickConferenceCallMerge(entry) {
      //
    }
  }, {
    key: "openEntityDetailLinkTrack",
    value: function openEntityDetailLinkTrack(path) {
      //
    }
  }, {
    key: "clickSwitchTrack",
    value: function clickSwitchTrack() {
      //
    }
  }, {
    key: "_getSessionById",
    value: function _getSessionById(telephonySessionId) {
      return this._rcCallControl.sessions.find(function (s) {
        return s.id === telephonySessionId;
      });
    }
  }, {
    key: "_findWebphoneSession",
    value: function _findWebphoneSession(telephonySessionId) {
      return this._webphone.sessions.find(function (x) {
        var _x$partyData;
        return ((_x$partyData = x.partyData) === null || _x$partyData === void 0 ? void 0 : _x$partyData.sessionId) === telephonySessionId;
      });
    }
  }, {
    key: "_getCurrentDeviceCallsBySessionId",
    value: function _getCurrentDeviceCallsBySessionId(telephonySessionId) {
      return this.currentDeviceCallsMap[telephonySessionId];
    }
  }, {
    key: "_showGeneralError",
    value: function _showGeneralError() {
      this._toast.warning({
        message: (0, _i18n.t)('generalError')
      });
    }
  }, {
    key: "skipConferenceCall",
    get: function get() {
      var _this$_activeCallCont9;
      return Boolean((_this$_activeCallCont9 = this._activeCallControlOptions) === null || _this$_activeCallCont9 === void 0 ? void 0 : _this$_activeCallCont9.skipConferenceCall);
    }
  }, {
    key: "enableLeaveConferenceAsHost",
    get: function get() {
      var _this$_activeCallCont0, _this$_activeCallCont1;
      return Boolean((_this$_activeCallCont0 = this._activeCallControlOptions) === null || _this$_activeCallCont0 === void 0 ? void 0 : (_this$_activeCallCont1 = _this$_activeCallCont0.getEnableLeaveConferenceAsHost) === null || _this$_activeCallCont1 === void 0 ? void 0 : _this$_activeCallCont1.call(_this$_activeCallCont0));
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_rateLimiter", [_dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pickUpCallDataMap", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "transferCallMapping", [_nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "data", [_nextCore.state, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      activeSessionId: null,
      busyTimestamp: 0,
      timestamp: 0,
      sessions: []
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ringMessages", [_nextCore.state, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "addRingMessage", [_nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "addRingMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeRingMessage", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "removeRingMessage"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "drawer", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this14 = this;
    return this._modalView.create({
      view: function view() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var _useModalItemView = (0, _views.useModalItemView)(),
          props = _useModalItemView.props;
        var _ref14 = props.payload,
          telephonySessionId = _ref14.telephonySessionId;
        return /*#__PURE__*/_react["default"].createElement(_LeaveConferenceCall.LeaveConferenceCall, {
          onEndCallForEveryOne: function onEndCallForEveryOne() {
            _this14.endCall(telephonySessionId, false);
            _this14.closeDrawer();
          },
          onLeaveCall: function onLeaveCall() {
            _this14.endCall(telephonySessionId, true);
            _this14.closeDrawer();
          },
          currentLocale: _this14._locale.currentLocale
        });
      },
      props: function props() {
        return {
          type: 'drawer',
          disableBackdropClick: false
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resetState", [_nextCore.action, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "resetState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchData", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateActiveSessions", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "updateActiveSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateActiveSessions", [_nextCore.action, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateActiveSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeActiveSession", [_nextCore.action, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "removeActiveSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setActiveSessionId", [_nextCore.action, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "_setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallControlBusyTimestamp", [_nextCore.action, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearCallControlBusyTimestamp", [_nextCore.action, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "clearCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "muteWithWebphone", [_dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "muteWithWebphone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_dec42, _dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_dec46, _dec47, _dec48, _dec49], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_dec50, _dec51, _dec52, _dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecordWithWebphone", [_dec54, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecordWithWebphone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_dec57, _dec58, _dec59, _dec60], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_hangupWithWebphone", [_dec61, _dec62, _dec63], Object.getOwnPropertyDescriptor(_class2.prototype, "_hangupWithWebphone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkIfConferenceCall", [_dec64, _dec65, _dec66, _dec67], Object.getOwnPropertyDescriptor(_class2.prototype, "checkIfConferenceCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangUp", [_dec68, _dec69, _dec70], Object.getOwnPropertyDescriptor(_class2.prototype, "hangUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "endCall", [_dec71, _dec72, _dec73], Object.getOwnPropertyDescriptor(_class2.prototype, "endCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_dec74, _dec75, _dec76, _dec77], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_switch", [_dec78, _dec79, _dec80], Object.getOwnPropertyDescriptor(_class2.prototype, "_switch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switch", [_dec81, _dec82, _dec83, _dec84], Object.getOwnPropertyDescriptor(_class2.prototype, "switch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "holdWithWebphone", [_dec85, _dec86, _dec87], Object.getOwnPropertyDescriptor(_class2.prototype, "holdWithWebphone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_dec88, _dec89, _dec90, _dec91], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_unholdWithWebphone", [_dec92, _dec93, _dec94], Object.getOwnPropertyDescriptor(_class2.prototype, "_unholdWithWebphone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_dec95, _dec96, _dec97, _dec98], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_replyWithMessage", [_dec99, _dec100, _dec101], Object.getOwnPropertyDescriptor(_class2.prototype, "_replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyWithMessage", [_dec102, _dec103, _dec104, _dec105], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toVoicemail", [_dec106, _dec107, _dec108], Object.getOwnPropertyDescriptor(_class2.prototype, "toVoicemail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeWarmTransfer", [_dec109, _dec110, _dec111], Object.getOwnPropertyDescriptor(_class2.prototype, "completeWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_dec112, _dec113, _dec114, _dec115], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flip", [_dec116, _dec117, _dec118], Object.getOwnPropertyDescriptor(_class2.prototype, "flip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_dec119, _dec120, _dec121, _dec122], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendDTMF", [_dec123, _dec124, _dec125], Object.getOwnPropertyDescriptor(_class2.prototype, "sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setPickUpCallData", [_nextCore.action, _dec126, _dec127], Object.getOwnPropertyDescriptor(_class2.prototype, "setPickUpCallData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_answer", [_dec128, _dec129, _dec130], Object.getOwnPropertyDescriptor(_class2.prototype, "_answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_dec131, _dec132, _dec133], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answerAndHold", [_dec134, _dec135, _dec136], Object.getOwnPropertyDescriptor(_class2.prototype, "answerAndHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ignore", [_dec137, _dec138, _dec139, _dec140], Object.getOwnPropertyDescriptor(_class2.prototype, "ignore"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answerAndEnd", [_dec141, _dec142, _dec143, _dec144], Object.getOwnPropertyDescriptor(_class2.prototype, "answerAndEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startWarmTransfer", [_dec145, _dec146, _dec147, _dec148], Object.getOwnPropertyDescriptor(_class2.prototype, "startWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setWarmTransferMapping", [_nextCore.action, _dec149, _dec150], Object.getOwnPropertyDescriptor(_class2.prototype, "setWarmTransferMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanCurrentWarmTransferData", [_nextCore.action, _dec151, _dec152], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanCurrentWarmTransferData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_dec153, _dec154, _dec155], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initWebphoneSessionEvents", [_dec156, _dec157, _dec158], Object.getOwnPropertyDescriptor(_class2.prototype, "_initWebphoneSessionEvents"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeCalls", [_dec159, _dec160, _dec161], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initConferenceVoiceCall", [_dec162, _dec163, _dec164], Object.getOwnPropertyDescriptor(_class2.prototype, "_initConferenceVoiceCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_waitForWebphoneSessionAccepted", [_dec165, _dec166, _dec167], Object.getOwnPropertyDescriptor(_class2.prototype, "_waitForWebphoneSessionAccepted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeConferenceParticipant", [_dec168, _dec169, _dec170, _dec171], Object.getOwnPropertyDescriptor(_class2.prototype, "removeConferenceParticipant"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onWebphoneSessionProgress", [_dec172, _dec173, _dec174], Object.getOwnPropertyDescriptor(_class2.prototype, "_onWebphoneSessionProgress"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_dec175, _dec176, _dec177], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSessions", [_dec178, _dec179, _dec180], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSessions", [_dec181, _dec182, _dec183], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping", [_dec184, _dec185, _dec186], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentDeviceCallsMap", [_dec187, _dec188, _dec189], Object.getOwnPropertyDescriptor(_class2.prototype, "currentDeviceCallsMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionsMap", [_nextCore.computed, _dec190, _dec191], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionsMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialpadOpenTrack", [_dec192, _dec193, _dec194], Object.getOwnPropertyDescriptor(_class2.prototype, "dialpadOpenTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialpadCloseTrack", [_dec195, _dec196, _dec197], Object.getOwnPropertyDescriptor(_class2.prototype, "dialpadCloseTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickTransferTrack", [_dec198, _dec199, _dec200], Object.getOwnPropertyDescriptor(_class2.prototype, "clickTransferTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickForwardTrack", [_dec201, _dec202, _dec203], Object.getOwnPropertyDescriptor(_class2.prototype, "clickForwardTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickConferenceCallMerge", [_dec204, _dec205, _dec206], Object.getOwnPropertyDescriptor(_class2.prototype, "clickConferenceCallMerge"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openEntityDetailLinkTrack", [_dec207, _dec208, _dec209], Object.getOwnPropertyDescriptor(_class2.prototype, "openEntityDetailLinkTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickSwitchTrack", [_dec210, _dec211, _dec212], Object.getOwnPropertyDescriptor(_class2.prototype, "clickSwitchTrack"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ActiveCallControl.js.map
