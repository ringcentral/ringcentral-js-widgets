"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Webphone = exports.NumberValidError = exports.INCOMING_CALL_INVALID_STATE_ERROR_CODE = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _extendedControlStatus = require("@ringcentral-integration/commons/enums/extendedControlStatus");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _validateNumbers = require("@ringcentral-integration/commons/lib/validateNumbers");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _rxjs = require("rxjs");
var _AudioSettings = require("../AudioSettings");
var _WebphoneBase2 = require("./WebphoneBase");
var _events = require("./events");
var _i18n = require("./i18n");
var _recordStatus = require("./recordStatus");
var _sessionStatus = require("./sessionStatus");
var _webphoneHelper = require("./webphoneHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _dec125, _dec126, _dec127, _dec128, _dec129, _dec130, _dec131, _dec132, _dec133, _dec134, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); } /* eslint-disable no-console */
var INCOMING_CALL_INVALID_STATE_ERROR_CODE = exports.INCOMING_CALL_INVALID_STATE_ERROR_CODE = 2;
var customClientDelegateName = 'customClientDelegateName';
var switchWebphoneInstanceName = 'switchWebphoneInstanceName';
var webphoneHandleTimeoutName = 'webphoneHandleTimeoutName';
var NumberValidError = exports.NumberValidError = /*#__PURE__*/function (_Error) {
  function NumberValidError() {
    _classCallCheck(this, NumberValidError);
    return _callSuper(this, NumberValidError, ['validate phone numbers fail']);
  }
  _inherits(NumberValidError, _Error);
  return _createClass(NumberValidError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var Webphone = exports.Webphone = (_dec = (0, _nextCore.injectable)({
  name: 'Webphone'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('WebphoneOptions')(target, undefined, 14);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('Subscription')(target, undefined, 15);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 16);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 17);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)('Prefix')(target, undefined, 18);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _nextCore.Initiator === "undefined" ? Object : _nextCore.Initiator, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.NumberValidate === "undefined" ? Object : _services2.NumberValidate, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.ExtensionFeatures === "undefined" ? Object : _services.ExtensionFeatures, typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _AudioSettings.AudioSettings === "undefined" ? Object : _AudioSettings.AudioSettings, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services.ExtensionDevice === "undefined" ? Object : _services.ExtensionDevice, typeof _services.RingCentralExtensions === "undefined" ? Object : _services.RingCentralExtensions, typeof WebphoneOptions === "undefined" ? Object : WebphoneOptions, typeof _services.WebSocketSubscription === "undefined" ? Object : _services.WebSocketSubscription, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _services.AvailabilityMonitor === "undefined" ? Object : _services.AvailabilityMonitor, String]), _dec9 = Reflect.metadata("design:type", String), _dec0 = Reflect.metadata("design:type", String), _dec1 = Reflect.metadata("design:type", Array), _dec10 = Reflect.metadata("design:type", Array), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [Array]), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Array]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [String]), _dec18 = (0, _nextCore.delegate)('server'), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [String]), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [typeof NormalizedSession === "undefined" ? Object : NormalizedSession]), _dec23 = (0, _nextCore.delegate)('server'), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", [typeof NormalizedSession === "undefined" ? Object : NormalizedSession]), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [typeof NormalizedSession === "undefined" ? Object : NormalizedSession]), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [typeof NormalizedSession === "undefined" ? Object : NormalizedSession]), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", [typeof NormalizedSession === "undefined" ? Object : NormalizedSession]), _dec33 = (0, _nextCore.delegate)('server'), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", [typeof NormalizedSession === "undefined" ? Object : NormalizedSession]), _dec36 = (0, _services.track)(_trackEvents.trackEvents.inboundWebRTCCallConnected), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", []), _dec39 = (0, _nextCore.delegate)('mainClient'), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", [String]), _dec42 = (0, _nextCore.delegate)('mainClient'), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", [String]), _dec45 = (0, _nextCore.delegate)('server'), _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", [String]), _dec48 = (0, _nextCore.delegate)('mainClient'), _dec49 = Reflect.metadata("design:type", Function), _dec50 = Reflect.metadata("design:paramtypes", [String]), _dec51 = (0, _nextCore.delegate)('mainClient'), _dec52 = Reflect.metadata("design:type", Function), _dec53 = Reflect.metadata("design:paramtypes", [String, String]), _dec54 = (0, _nextCore.delegate)('mainClient'), _dec55 = Reflect.metadata("design:type", Function), _dec56 = Reflect.metadata("design:paramtypes", [String, Function]), _dec57 = (0, _nextCore.delegate)('mainClient'), _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", [String]), _dec60 = (0, _nextCore.delegate)('mainClient'), _dec61 = Reflect.metadata("design:type", Function), _dec62 = Reflect.metadata("design:paramtypes", [String, Function]), _dec63 = (0, _nextCore.delegate)('mainClient'), _dec64 = Reflect.metadata("design:type", Function), _dec65 = Reflect.metadata("design:paramtypes", [String, Function]), _dec66 = (0, _nextCore.delegate)('mainClient'), _dec67 = Reflect.metadata("design:type", Function), _dec68 = Reflect.metadata("design:paramtypes", [String]), _dec69 = (0, _nextCore.delegate)('mainClient'), _dec70 = Reflect.metadata("design:type", Function), _dec71 = Reflect.metadata("design:paramtypes", [String, Function]), _dec72 = (0, _nextCore.delegate)('mainClient'), _dec73 = Reflect.metadata("design:type", Function), _dec74 = Reflect.metadata("design:paramtypes", [String]), _dec75 = (0, _nextCore.delegate)('mainClient'), _dec76 = Reflect.metadata("design:type", Function), _dec77 = Reflect.metadata("design:paramtypes", [String, String]), _dec78 = (0, _nextCore.delegate)('mainClient'), _dec79 = Reflect.metadata("design:type", Function), _dec80 = Reflect.metadata("design:paramtypes", [String, String]), _dec81 = (0, _nextCore.delegate)('mainClient'), _dec82 = Reflect.metadata("design:type", Function), _dec83 = Reflect.metadata("design:paramtypes", [String]), _dec84 = (0, _nextCore.delegate)('mainClient'), _dec85 = Reflect.metadata("design:type", Function), _dec86 = Reflect.metadata("design:paramtypes", [String, String]), _dec87 = (0, _nextCore.delegate)('mainClient'), _dec88 = Reflect.metadata("design:type", Function), _dec89 = Reflect.metadata("design:paramtypes", [String, String]), _dec90 = (0, _nextCore.delegate)('mainClient'), _dec91 = Reflect.metadata("design:type", Function), _dec92 = Reflect.metadata("design:paramtypes", [String, Function]), _dec93 = (0, _nextCore.delegate)('mainClient'), _dec94 = Reflect.metadata("design:type", Function), _dec95 = Reflect.metadata("design:paramtypes", [String]), _dec96 = (0, _nextCore.delegate)('mainClient'), _dec97 = Reflect.metadata("design:type", Function), _dec98 = Reflect.metadata("design:paramtypes", [String, typeof SessionReplyOptions === "undefined" ? Object : SessionReplyOptions, Function]), _dec99 = (0, _nextCore.delegate)('mainClient'), _dec100 = Reflect.metadata("design:type", Function), _dec101 = Reflect.metadata("design:paramtypes", [Object]), _dec102 = (0, _nextCore.delegate)('mainClient'), _dec103 = Reflect.metadata("design:type", Function), _dec104 = Reflect.metadata("design:paramtypes", [typeof SwitchCallActiveCallParams === "undefined" ? Object : SwitchCallActiveCallParams, String]), _dec105 = (0, _nextCore.delegate)('mainClient'), _dec106 = Reflect.metadata("design:type", Function), _dec107 = Reflect.metadata("design:paramtypes", [typeof TPickupInboundCall === "undefined" ? Object : TPickupInboundCall]), _dec108 = (0, _nextCore.delegate)('mainClient'), _dec109 = Reflect.metadata("design:type", Function), _dec110 = Reflect.metadata("design:paramtypes", [String, Object]), _dec111 = (0, _nextCore.delegate)('mainClient'), _dec112 = Reflect.metadata("design:type", Function), _dec113 = Reflect.metadata("design:paramtypes", []), _dec114 = (0, _nextCore.delegate)('mainClient'), _dec115 = Reflect.metadata("design:type", Function), _dec116 = Reflect.metadata("design:paramtypes", [String]), _dec117 = (0, _nextCore.computed)(function (_ref) {
  var sessions = _ref.sessions;
  return [sessions];
}), _dec118 = Reflect.metadata("design:type", Function), _dec119 = Reflect.metadata("design:paramtypes", []), _dec120 = (0, _nextCore.computed)(function (_ref2) {
  var activeSessionId = _ref2.activeSessionId,
    sessions = _ref2.sessions;
  return [activeSessionId, sessions];
}), _dec121 = Reflect.metadata("design:type", Function), _dec122 = Reflect.metadata("design:paramtypes", []), _dec123 = (0, _nextCore.computed)(function (_ref3) {
  var ringSessionId = _ref3.ringSessionId,
    sessions = _ref3.sessions;
  return [ringSessionId, sessions];
}), _dec124 = Reflect.metadata("design:type", Function), _dec125 = Reflect.metadata("design:paramtypes", []), _dec126 = (0, _nextCore.computed)(function (_ref4) {
  var sessions = _ref4.sessions;
  return [sessions];
}), _dec127 = Reflect.metadata("design:type", Function), _dec128 = Reflect.metadata("design:paramtypes", []), _dec129 = (0, _nextCore.computed)(function (_ref5) {
  var sessions = _ref5.sessions;
  return [sessions];
}), _dec130 = Reflect.metadata("design:type", Function), _dec131 = Reflect.metadata("design:paramtypes", []), _dec132 = (0, _nextCore.computed)(function (_ref6) {
  var ringSessions = _ref6.ringSessions;
  return [ringSessions];
}), _dec133 = Reflect.metadata("design:type", Function), _dec134 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = (_class2 = /*#__PURE__*/function (_WebphoneBase) {
  function Webphone(_initiator, _regionSettings, _numberValidate, _auth, _toast, _client, _appFeatures, _extensionFeatures, _brand, _audioSettings, _storage, _portManager, _extensionDevice, _ringCentralExtensions, _webphoneOptions, _subscription, _contactMatcher, _availabilityMonitor, _prefix) {
    var _this$_webphoneOption, _this$_webphoneOption2;
    var _this;
    _classCallCheck(this, Webphone);
    _this = _callSuper(this, Webphone, [_brand, _auth, _toast, _client, _numberValidate, _appFeatures, _extensionFeatures, _extensionDevice, _audioSettings, _storage, _portManager, _ringCentralExtensions, _webphoneOptions, _subscription, _prefix]);
    _this._initiator = _initiator;
    _this._regionSettings = _regionSettings;
    _this._numberValidate = _numberValidate;
    _this._auth = _auth;
    _this._toast = _toast;
    _this._client = _client;
    _this._appFeatures = _appFeatures;
    _this._extensionFeatures = _extensionFeatures;
    _this._brand = _brand;
    _this._audioSettings = _audioSettings;
    _this._storage = _storage;
    _this._portManager = _portManager;
    _this._extensionDevice = _extensionDevice;
    _this._ringCentralExtensions = _ringCentralExtensions;
    _this._webphoneOptions = _webphoneOptions;
    _this._subscription = _subscription;
    _this._contactMatcher = _contactMatcher;
    _this._availabilityMonitor = _availabilityMonitor;
    _this._prefix = _prefix;
    _this.invite$ = new _rxjs.Subject();
    _this._end$ = new _rxjs.Subject();
    /**
     * # this event only work in main tab
     */
    _this.end$ = _this._end$.pipe(
    // when have p-rc-reason, that means that call be switch to other device, should not emit the event
    (0, _rxjs.filter)(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
        _ = _ref8[0],
        e = _ref8[1];
      return !(0, _webphoneHelper.isPickupReason)(e);
    }), (0, _rxjs.map)(function (_ref9) {
      var _ref0 = _slicedToArray(_ref9, 1),
        session = _ref0[0];
      return session;
    }), (0, _rxjs.share)());
    _this._ignore$ = new _rxjs.Subject();
    _this.checkMainTab = function () {
      return _this.isMainClient;
    };
    _initializerDefineProperty(_this, "activeSessionId", _descriptor, _this);
    _initializerDefineProperty(_this, "ringSessionId", _descriptor2, _this);
    _initializerDefineProperty(_this, "lastEndedSessions", _descriptor3, _this);
    _initializerDefineProperty(_this, "sessions", _descriptor4, _this);
    globalThis.externalClearTimeout = clearTimeout;
    globalThis.externalSetTimeout = setTimeout;
    var enableContactMatchWhenNewCall = (_this$_webphoneOption = (_this$_webphoneOption2 = _this._webphoneOptions) === null || _this$_webphoneOption2 === void 0 ? void 0 : _this$_webphoneOption2.enableContactMatchWhenNewCall) !== null && _this$_webphoneOption !== void 0 ? _this$_webphoneOption : true;
    if (enableContactMatchWhenNewCall && _this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.sessionPhoneNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this.ready;
        }
      });
    }
    if (_this._portManager.shared) {
      _this._portManager.onMainTab(function () {
        var reloadResolve = null;
        return (0, _nextCore.watch)(_this, function () {
          return _this.hasCallSessions;
        }, function () {
          if (_this.hasCallSessions) {
            _this._initiator.reloadPromise = new Promise(function (resolve) {
              reloadResolve = resolve;
            });
          } else {
            var _reloadResolve;
            (_reloadResolve = reloadResolve) === null || _reloadResolve === void 0 ? void 0 : _reloadResolve();
            reloadResolve = null;
            _this._initiator.reloadPromise = null;
          }
        });
      });
      if (!_this._portManager.isWorkerMode) {
        _this.useWebphoneMainTab();
        var handleWebphoneMainTab = /*#__PURE__*/function () {
          var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(options) {
            var module, result;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  if (_this.checkMainTab()) {
                    _context.n = 1;
                    break;
                  }
                  return _context.a(2, new Promise(function () {
                    // do not resolve and it can't response if it's not custom main tab
                  }));
                case 1:
                  module = (0, _nextCore.getRef)(_this).modules[options.module];
                  _context.n = 2;
                  return (0, _nextCore.applyMethod)(module, options);
                case 2:
                  result = _context.v;
                  return _context.a(2, result);
              }
            }, _callee);
          }));
          return function handleWebphoneMainTab(_x) {
            return _ref1.apply(this, arguments);
          };
        }();
        _this._portManager.onClient(function (transport) {
          if (!_this._portManager.isWorkerMode) {
            // main tab should be auto-connected by default.
            _this.isMainClient = false;
          }
          // TODO: fix type
          // @ts-ignore
          transport.listen(customClientDelegateName, handleWebphoneMainTab);
          window.addEventListener('pagehide', function () {
            if (_this.checkMainTab()) {
              // @ts-ignore
              transport.emit(switchWebphoneInstanceName);
            }
          });
        });
        _this._portManager.onServer(function (transport) {
          // @ts-ignore
          transport.listen(customClientDelegateName, handleWebphoneMainTab);
          // @ts-ignore
          transport.listen(switchWebphoneInstanceName, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _context2.n = 1;
                  return _this.switchWebphoneInstance();
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          })));
        });
      } else {
        _this._portManager.onClient(function (transport) {
          var timeoutId = 0;
          var timeoutMap = new Map();
          globalThis.externalSetTimeout = function (callback, timeout) {
            timeoutId += 1;
            var currentTimeoutId = timeoutId;
            timeoutMap.set(currentTimeoutId, callback);
            transport.emit({
              name: 'webphoneHandleTimeoutName',
              // The transport response timeout should be longer than the external timer duration.
              timeout: timeout + 5 * 60 * 1000
            }, timeout).then(function () {
              var callback = timeoutMap.get(currentTimeoutId);
              if (callback) {
                timeoutMap["delete"](currentTimeoutId);
                callback();
              }
            });
            return timeoutId;
          };
          globalThis.externalClearTimeout = function (timeoutId) {
            timeoutMap["delete"](timeoutId);
          };
        });
        _this._portManager.onServer(function (transport) {
          // @ts-ignore
          transport.listen(webphoneHandleTimeoutName, /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(timeout) {
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    _context3.n = 1;
                    return (0, _utils.sleep)(timeout);
                  case 1:
                    return _context3.a(2);
                }
              }, _callee3);
            }));
            return function (_x2) {
              return _ref11.apply(this, arguments);
            };
          }());
        });
      }
    }
    return _this;
  }
  _inherits(Webphone, _WebphoneBase);
  return _createClass(Webphone, [{
    key: "_permissionCheck",
    get: function get() {
      var _this$_webphoneOption3, _this$_webphoneOption4;
      return (_this$_webphoneOption3 = (_this$_webphoneOption4 = this._webphoneOptions) === null || _this$_webphoneOption4 === void 0 ? void 0 : _this$_webphoneOption4.permissionCheck) !== null && _this$_webphoneOption3 !== void 0 ? _this$_webphoneOption3 : true;
    }
  }, {
    key: "ignore$",
    get: function get() {
      if (process.env.NODE_ENV !== 'production' && this._portManager.shared && !this._portManager.isServer) {
        throw new Error("ignore$ can't be used in client, should always call in server");
      }
      return this._ignore$;
    }
  }, {
    key: "useWebphoneMainTab",
    value: function useWebphoneMainTab() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      if (this._portManager.shared && !this._portManager.isWorkerMode) {
        this._portManager.checkMainTabMapping.set(target, this.checkMainTab);
        this._portManager.customClientDelegateNameMapping.set(target, customClientDelegateName);
      }
    }
  }, {
    key: "switchWebphoneInstance",
    value: function () {
      var _switchWebphoneInstance = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var options,
          checkMainTab,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
              checkMainTab = this._portManager.checkMainTabMapping.get(this);
              if (!(checkMainTab && !checkMainTab())) {
                _context4.n = 5;
                break;
              }
              if (!options.forceDisconnect) {
                _context4.n = 2;
                break;
              }
              _context4.n = 1;
              return this.disconnect();
            case 1:
              _context4.n = 3;
              break;
            case 2:
              _context4.n = 3;
              return this.setStateOnUnregistered();
            case 3:
              // do not use `await`, it has no response
              this.disableMainClient();
              // wait for main tab to disconnect
              this.isMainClient = true;
              _context4.n = 4;
              return this.connect();
            case 4:
              return _context4.a(2, true);
            case 5:
              return _context4.a(2, false);
          }
        }, _callee4, this);
      }));
      function switchWebphoneInstance() {
        return _switchWebphoneInstance.apply(this, arguments);
      }
      return switchWebphoneInstance;
    }()
  }, {
    key: "initialize",
    value: function initialize() {
      var _this$_webphoneOption5, _this$_webphoneOption7, _this$_webphoneOption9, _this$_webphoneOption1, _this$_webphoneOption11, _this$_webphoneOption13, _this$_webphoneOption15, _this$_webphoneOption17;
      _superPropGet(Webphone, "initialize", this, 3)([]);
      if (typeof ((_this$_webphoneOption5 = this._webphoneOptions) === null || _this$_webphoneOption5 === void 0 ? void 0 : _this$_webphoneOption5.onCallEnd) === 'function') {
        var _this$_webphoneOption6;
        this._eventEmitter.on(_events.EVENTS.callEnd, (_this$_webphoneOption6 = this._webphoneOptions) === null || _this$_webphoneOption6 === void 0 ? void 0 : _this$_webphoneOption6.onCallEnd);
      }
      if (typeof ((_this$_webphoneOption7 = this._webphoneOptions) === null || _this$_webphoneOption7 === void 0 ? void 0 : _this$_webphoneOption7.onCallRing) === 'function') {
        var _this$_webphoneOption8;
        this._eventEmitter.on(_events.EVENTS.callRing, (_this$_webphoneOption8 = this._webphoneOptions) === null || _this$_webphoneOption8 === void 0 ? void 0 : _this$_webphoneOption8.onCallRing);
      }
      if (typeof ((_this$_webphoneOption9 = this._webphoneOptions) === null || _this$_webphoneOption9 === void 0 ? void 0 : _this$_webphoneOption9.onCallStart) === 'function') {
        var _this$_webphoneOption0;
        this._eventEmitter.on(_events.EVENTS.callStart, (_this$_webphoneOption0 = this._webphoneOptions) === null || _this$_webphoneOption0 === void 0 ? void 0 : _this$_webphoneOption0.onCallStart);
      }
      if (typeof ((_this$_webphoneOption1 = this._webphoneOptions) === null || _this$_webphoneOption1 === void 0 ? void 0 : _this$_webphoneOption1.onCallResume) === 'function') {
        var _this$_webphoneOption10;
        this._eventEmitter.on(_events.EVENTS.callResume, (_this$_webphoneOption10 = this._webphoneOptions) === null || _this$_webphoneOption10 === void 0 ? void 0 : _this$_webphoneOption10.onCallResume);
      }
      if (typeof ((_this$_webphoneOption11 = this._webphoneOptions) === null || _this$_webphoneOption11 === void 0 ? void 0 : _this$_webphoneOption11.onCallHold) === 'function') {
        var _this$_webphoneOption12;
        this._eventEmitter.on(_events.EVENTS.callHold, (_this$_webphoneOption12 = this._webphoneOptions) === null || _this$_webphoneOption12 === void 0 ? void 0 : _this$_webphoneOption12.onCallHold);
      }
      if (typeof ((_this$_webphoneOption13 = this._webphoneOptions) === null || _this$_webphoneOption13 === void 0 ? void 0 : _this$_webphoneOption13.onCallInit) === 'function') {
        var _this$_webphoneOption14;
        this._eventEmitter.on(_events.EVENTS.callInit, (_this$_webphoneOption14 = this._webphoneOptions) === null || _this$_webphoneOption14 === void 0 ? void 0 : _this$_webphoneOption14.onCallInit);
      }
      if (typeof ((_this$_webphoneOption15 = this._webphoneOptions) === null || _this$_webphoneOption15 === void 0 ? void 0 : _this$_webphoneOption15.onBeforeCallResume) === 'function') {
        var _this$_webphoneOption16;
        this._eventEmitter.on(_events.EVENTS.beforeCallResume, (_this$_webphoneOption16 = this._webphoneOptions) === null || _this$_webphoneOption16 === void 0 ? void 0 : _this$_webphoneOption16.onBeforeCallResume);
      }
      if (typeof ((_this$_webphoneOption17 = this._webphoneOptions) === null || _this$_webphoneOption17 === void 0 ? void 0 : _this$_webphoneOption17.onBeforeCallEnd) === 'function') {
        var _this$_webphoneOption18;
        this._eventEmitter.on(_events.EVENTS.beforeCallEnd, (_this$_webphoneOption18 = this._webphoneOptions) === null || _this$_webphoneOption18 === void 0 ? void 0 : _this$_webphoneOption18.onBeforeCallEnd);
      }
      this._reconnectAfterSessionEnd = null;
    }
  }, {
    key: "_updateSessionsState",
    value: function _updateSessionsState(sessions) {
      var _this$sessions;
      (_this$sessions = this.sessions).splice.apply(_this$sessions, [0, this.sessions.length].concat(_toConsumableArray(sessions.sort(_webphoneHelper.sortByLastActiveTimeDesc))));
    }
  }, {
    key: "updateSessionsState",
    value: function () {
      var _updateSessionsState2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(sessions) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._updateSessionsState(sessions);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function updateSessionsState(_x3) {
        return _updateSessionsState2.apply(this, arguments);
      }
      return updateSessionsState;
    }()
  }, {
    key: "_setActiveSessionId",
    value: function _setActiveSessionId(sessionId) {
      this.activeSessionId = sessionId;
    }
  }, {
    key: "setActiveSessionId",
    value: function () {
      var _setActiveSessionId2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(sessionId) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this._setActiveSessionId(sessionId);
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function setActiveSessionId(_x4) {
        return _setActiveSessionId2.apply(this, arguments);
      }
      return setActiveSessionId;
    }()
  }, {
    key: "_setStateOnCallRing",
    value: function _setStateOnCallRing(session) {
      this.ringSessionId = session.id;
    }
  }, {
    key: "setStateOnCallRing",
    value: function () {
      var _setStateOnCallRing2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(session) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._setStateOnCallRing(session);
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function setStateOnCallRing(_x5) {
        return _setStateOnCallRing2.apply(this, arguments);
      }
      return setStateOnCallRing;
    }()
  }, {
    key: "_setStateOnCallStart",
    value: function _setStateOnCallStart(session) {
      this.activeSessionId = session.id;
      if (this.ringSessionId === session.id) {
        var ringSessions = this.sessions.filter(function (x) {
          return (0, _webphoneHelper.isRing)(x);
        });
        this.ringSessionId = ringSessions[0] && ringSessions[0].id || null;
      }
    }
  }, {
    key: "setStateOnCallStart",
    value: function () {
      var _setStateOnCallStart2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(session) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this._setStateOnCallStart(session);
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function setStateOnCallStart(_x6) {
        return _setStateOnCallStart2.apply(this, arguments);
      }
      return setStateOnCallStart;
    }()
  }, {
    key: "_setStateOnCallEnd",
    value: function _setStateOnCallEnd(session) {
      if (this.activeSessionId === session.id) {
        var activeSessions = this.sessions.filter(function (x) {
          return !(0, _webphoneHelper.isRing)(x);
        });
        activeSessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
        this.activeSessionId = activeSessions[0] && activeSessions[0].id || null;
      }
      if (this.ringSessionId === session.id) {
        var ringSessions = this.sessions.filter(function (x) {
          return (0, _webphoneHelper.isRing)(x);
        });
        this.ringSessionId = ringSessions[0] && ringSessions[0].id || null;
      }
      if (
      /**
       * don't add incoming call that isn't relied by current app
       *   to end sessions. this call can be answered by other apps
       */
      !session.startTime && !session.isToVoicemail && !session.isForwarded && !session.isReplied) {
        return;
      }
      var lastSessions = [session].concat(this.lastEndedSessions.filter(function (x) {
        return x.id !== session.id;
      }));
      this.lastEndedSessions = lastSessions.slice(0, 5);
    }
  }, {
    key: "setStateOnCallEnd",
    value: function () {
      var _setStateOnCallEnd2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(session) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this._setStateOnCallEnd(session);
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function setStateOnCallEnd(_x7) {
        return _setStateOnCallEnd2.apply(this, arguments);
      }
      return setStateOnCallEnd;
    }()
    /**
     * the process when accept the call, both for inbound and outbound call
     */
  }, {
    key: "_onAccepted",
    value: function _onAccepted(session) {
      var _this2 = this;
      this.logger.log('initWebphoneSessionEvents', session);
      session.on('accepted', /*#__PURE__*/function () {
        var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(incomingResponse) {
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                if (!(session.__rc_callStatus === _sessionStatus.sessionStatus.finished)) {
                  _context0.n = 1;
                  break;
                }
                return _context0.a(2);
              case 1:
                _this2.logger.log('accepted');
                session.__rc_callStatus = _sessionStatus.sessionStatus.connected;
                (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);
                _context0.n = 2;
                return _this2._onCallStart(session);
              case 2:
                if (session.__rc_extendedControls && session.__rc_extendedControlStatus === _extendedControlStatus.extendedControlStatus.pending) {
                  _this2._playExtendedControls(session);
                }
              case 3:
                return _context0.a(2);
            }
          }, _callee0);
        }));
        return function (_x8) {
          return _ref12.apply(this, arguments);
        };
      }());
      session.on('progress', /*#__PURE__*/function () {
        var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(incomingResponse) {
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
              case 0:
                _this2.logger.log('progress...', incomingResponse);
                session.__rc_callStatus = _sessionStatus.sessionStatus.connecting;
                (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);
                _this2.invite$.next(session);
                _context1.n = 1;
                return _this2._updateSessions();
              case 1:
                return _context1.a(2);
            }
          }, _callee1);
        }));
        return function (_x9) {
          return _ref13.apply(this, arguments);
        };
      }());
      session.on('rejected', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              _this2.logger.log('rejected');
              session.__rc_callStatus = _sessionStatus.sessionStatus.finished;
              _context10.n = 1;
              return _this2._onCallEnd(session);
            case 1:
              return _context10.a(2);
          }
        }, _callee10);
      })));
      session.on('failed', /*#__PURE__*/function () {
        var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(response, cause) {
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.n) {
              case 0:
                _this2.logger.log('Failed', cause);
                session.__rc_callStatus = _sessionStatus.sessionStatus.finished;
                _context11.n = 1;
                return _this2._onCallEnd(session);
              case 1:
                return _context11.a(2);
            }
          }, _callee11);
        }));
        return function (_x0, _x1) {
          return _ref15.apply(this, arguments);
        };
      }());
      session.on('terminated', /*#__PURE__*/function () {
        var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(e) {
          return _regenerator().w(function (_context12) {
            while (1) switch (_context12.n) {
              case 0:
                _this2.logger.log('Terminated', e);
                _this2._end$.next([session, e]);
                session.__rc_callStatus = _sessionStatus.sessionStatus.finished;
                _context12.n = 1;
                return _this2._onCallEnd(session);
              case 1:
                return _context12.a(2);
            }
          }, _callee12);
        }));
        return function (_x10) {
          return _ref16.apply(this, arguments);
        };
      }());
      session.on('cancel', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              _this2.logger.log('Cancel');
              session.__rc_callStatus = _sessionStatus.sessionStatus.finished;
              _context13.n = 1;
              return _this2._onCallEnd(session);
            case 1:
              return _context13.a(2);
          }
        }, _callee13);
      })));
      // @ts-ignore
      session.on('replaced', /*#__PURE__*/function () {
        var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(newSession) {
          return _regenerator().w(function (_context14) {
            while (1) switch (_context14.n) {
              case 0:
                _this2.logger.log('replaced', newSession);
                session.__rc_callStatus = _sessionStatus.sessionStatus.replaced;
                newSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
                newSession.__rc_direction = _callDirections["default"].inbound;
                _context14.n = 1;
                return _this2._updateSessions();
              case 1:
                _this2._onAccepted(newSession);
              case 2:
                return _context14.a(2);
            }
          }, _callee14);
        }));
        return function (_x11) {
          return _ref18.apply(this, arguments);
        };
      }());
      session.on('muted', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              _this2.logger.log('Muted');
              session.__rc_isOnMute = true;
              session.__rc_callStatus = _sessionStatus.sessionStatus.onMute;
              _context15.n = 1;
              return _this2._updateSessions();
            case 1:
              return _context15.a(2);
          }
        }, _callee15);
      })));
      session.on('unmuted', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _this2.logger.log('Unmuted');
              session.__rc_isOnMute = false;
              session.__rc_callStatus = _sessionStatus.sessionStatus.connected;
              _context16.n = 1;
              return _this2._updateSessions();
            case 1:
              return _context16.a(2);
          }
        }, _callee16);
      })));
      session.on('SessionDescriptionHandler-created', function () {
        // @ts-ignore
        session.sessionDescriptionHandler.on('userMediaFailed', function () {
          _this2._audioSettings.onGetUserMediaError();
        });
      });
    }
  }, {
    key: "_onInvite",
    value: function () {
      var _onInvite2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(session) {
        var _this3 = this;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              this.invite$.next(session);
              session.__rc_creationTime = Date.now();
              session.__rc_lastActiveTime = Date.now();
              session.__rc_direction = _callDirections["default"].inbound;
              session.__rc_callStatus = _sessionStatus.sessionStatus.connecting;
              (0, _webphoneHelper.extractHeadersData)(session, session.request.headers);
              session.on('rejected', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
                return _regenerator().w(function (_context17) {
                  while (1) switch (_context17.n) {
                    case 0:
                      _this3.logger.log('Ringing Rejected');
                      _context17.n = 1;
                      return _this3._onCallEnd(session);
                    case 1:
                      return _context17.a(2);
                  }
                }, _callee17);
              })));
              session.on('terminated', /*#__PURE__*/function () {
                var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(e) {
                  return _regenerator().w(function (_context18) {
                    while (1) switch (_context18.n) {
                      case 0:
                        _this3.logger.log('Ringing Terminated', e);
                        _this3._end$.next([session, e]);
                        _context18.n = 1;
                        return _this3._onCallEnd(session);
                      case 1:
                        return _context18.a(2);
                    }
                  }, _callee18);
                }));
                return function (_x13) {
                  return _ref22.apply(this, arguments);
                };
              }());
              _context19.n = 1;
              return this._onCallRing(session);
            case 1:
              return _context19.a(2);
          }
        }, _callee19, this);
      }));
      function _onInvite(_x12) {
        return _onInvite2.apply(this, arguments);
      }
      return _onInvite;
    }()
  }, {
    key: "_playExtendedControls",
    value: function () {
      var _playExtendedControls2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(session) {
        var controls, i, len;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.playing;
              controls = session.__rc_extendedControls.slice();
              i = 0, len = controls.length;
            case 1:
              if (!(i < len)) {
                _context20.n = 7;
                break;
              }
              if (!(session.__rc_extendedControlStatus === _extendedControlStatus.extendedControlStatus.playing)) {
                _context20.n = 5;
                break;
              }
              if (!(controls[i] === ',')) {
                _context20.n = 3;
                break;
              }
              _context20.n = 2;
              return (0, _utils.sleep)(2000);
            case 2:
              _context20.n = 4;
              break;
            case 3:
              _context20.n = 4;
              return this.sendDTMF(controls[i], session.id);
            case 4:
              _context20.n = 6;
              break;
            case 5:
              return _context20.a(2);
            case 6:
              i += 1;
              _context20.n = 1;
              break;
            case 7:
              session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.stopped;
            case 8:
              return _context20.a(2);
          }
        }, _callee20, this);
      }));
      function _playExtendedControls(_x14) {
        return _playExtendedControls2.apply(this, arguments);
      }
      return _playExtendedControls;
    }()
  }, {
    key: "_trackCallAnswer",
    value: function _trackCallAnswer() {
      //
    }
  }, {
    key: "answer",
    value: function () {
      var _answer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(sessionId) {
        var sipSession, session, _t, _t2;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              sipSession = this.originalSessions[sessionId];
              session = this.sessions.find(function (session) {
                return session.id === sessionId;
              });
              if (!(!session || !(0, _webphoneHelper.isRing)(session))) {
                _context21.n = 1;
                break;
              }
              return _context21.a(2);
            case 1:
              _context21.p = 1;
              _context21.n = 2;
              return this._holdOtherSession(sessionId);
            case 2:
              this._onAccepted(sipSession);
              _t = sipSession;
              _context21.n = 3;
              return this.getAcceptOptions();
            case 3:
              _context21.n = 4;
              return _t.accept.call(_t, _context21.v);
            case 4:
              this._trackCallAnswer();
              _context21.n = 6;
              break;
            case 5:
              _context21.p = 5;
              _t2 = _context21.v;
              this.logger.log('Accept failed', _t2);
              if (!(_t2.code !== INCOMING_CALL_INVALID_STATE_ERROR_CODE)) {
                _context21.n = 6;
                break;
              }
              _context21.n = 6;
              return this._onCallEnd(sipSession);
            case 6:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 5]]);
      }));
      function answer(_x15) {
        return _answer.apply(this, arguments);
      }
      return answer;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(sessionId) {
        var session, activeSession, isCallQueueCall, _t3;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              session = this.originalSessions[sessionId];
              activeSession = this._getNormalizedSession(session);
              isCallQueueCall = activeSession === null || activeSession === void 0 ? void 0 : activeSession.callQueueName;
              if (!(!session || session.__rc_callStatus === _sessionStatus.sessionStatus.finished)) {
                _context22.n = 1;
                break;
              }
              return _context22.a(2);
            case 1:
              _context22.p = 1;
              if (!isCallQueueCall) {
                _context22.n = 3;
                break;
              }
              _context22.n = 2;
              return session.ignore();
            case 2:
              return _context22.a(2);
            case 3:
              _context22.n = 4;
              return session.reject();
            case 4:
              this.emitIgnoreEvent(sessionId);
              _context22.n = 6;
              break;
            case 5:
              _context22.p = 5;
              _t3 = _context22.v;
              this.logger.log('reject fail', _t3);
              _context22.n = 6;
              return this._onCallEnd(session);
            case 6:
              return _context22.a(2);
          }
        }, _callee22, this, [[1, 5]]);
      }));
      function reject(_x16) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }() // ignore not have socket event, because that be current device behaviors, so emit ignore event for outside know that
  }, {
    key: "emitIgnoreEvent",
    value: function () {
      var _emitIgnoreEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(sessionId) {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              this._ignore$.next(sessionId);
            case 1:
              return _context23.a(2);
          }
        }, _callee23, this);
      }));
      function emitIgnoreEvent(_x17) {
        return _emitIgnoreEvent.apply(this, arguments);
      }
      return emitIgnoreEvent;
    }()
  }, {
    key: "resume",
    value: function () {
      var _resume = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(sessionId) {
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              _context24.n = 1;
              return this.unhold(sessionId);
            case 1:
              return _context24.a(2);
          }
        }, _callee24, this);
      }));
      function resume(_x18) {
        return _resume.apply(this, arguments);
      }
      return resume;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(sessionId, forwardNumber) {
        var session, validatedResult, validPhoneNumber, isEDPEnabled, parsedNumbers, _parsedNumbers$0$avai, _validatedResult$numb, _validatedResult$numb2, _t4, _t5, _t6, _t7;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context25.n = 1;
                break;
              }
              return _context25.a(2, false);
            case 1:
              _context25.p = 1;
              if (this._permissionCheck) {
                _context25.n = 2;
                break;
              }
              validatedResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
                areaCode: this._regionSettings.areaCode,
                countryCode: this._regionSettings.countryCode,
                phoneNumbers: [forwardNumber]
              });
              validPhoneNumber = validatedResult[0];
              _context25.n = 9;
              break;
            case 2:
              isEDPEnabled = this._appFeatures.isEDPEnabled;
              if (!isEDPEnabled) {
                _context25.n = 3;
                break;
              }
              _t4 = this._numberValidate.validate([forwardNumber]);
              _context25.n = 5;
              break;
            case 3:
              _context25.n = 4;
              return this._numberValidate.validateNumbers([forwardNumber]);
            case 4:
              _t4 = _context25.v;
            case 5:
              validatedResult = _t4;
              if (validatedResult.result) {
                _context25.n = 6;
                break;
              }
              this._numberValidate.handleValidateToasts(validatedResult);
              return _context25.a(2, false);
            case 6:
              if (!isEDPEnabled) {
                _context25.n = 8;
                break;
              }
              _context25.n = 7;
              return this._numberValidate.parseNumbers([forwardNumber]);
            case 7:
              parsedNumbers = _context25.v;
              if (parsedNumbers) {
                validPhoneNumber = (_parsedNumbers$0$avai = parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai !== void 0 ? _parsedNumbers$0$avai : parsedNumbers[0].parsedNumber;
              }
              _context25.n = 9;
              break;
            case 8:
              // TODO: fix type
              // @ts-ignore
              validPhoneNumber = (_validatedResult$numb = validatedResult.numbers) === null || _validatedResult$numb === void 0 ? void 0 : (_validatedResult$numb2 = _validatedResult$numb[0]) === null || _validatedResult$numb2 === void 0 ? void 0 : _validatedResult$numb2.e164;
            case 9:
              session.__rc_isForwarded = true;
              _t5 = session;
              _t6 = validPhoneNumber;
              _context25.n = 10;
              return this.getAcceptOptions();
            case 10:
              _context25.n = 11;
              return _t5.forward.call(_t5, _t6, _context25.v, {});
            case 11:
              this.logger.log('Forwarded successfully');
              _context25.n = 12;
              return this._onCallEnd(session);
            case 12:
              this._addTrackAfterForward();
              return _context25.a(2, true);
            case 13:
              _context25.p = 13;
              _t7 = _context25.v;
              this.logger.error("forward fail", _t7);
              this._toast.warning({
                message: (0, _i18n.t)('failWithoutStatusCode', {
                  brandName: this._brand.name
                })
              });
              this._addTrackAfterForward();
              return _context25.a(2, false);
          }
        }, _callee25, this, [[1, 13]]);
      }));
      function forward(_x19, _x20) {
        return _forward.apply(this, arguments);
      }
      return forward;
    }()
  }, {
    key: "_addTrackAfterForward",
    value: function _addTrackAfterForward() {
      if (this.activeSession && !this.activeSession.isOnHold) {
        var rawActiveSession = this.originalSessions[this.activeSession.id];
        this._addTrack(rawActiveSession);
      }
    }
  }, {
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(sessionId, errorHandler) {
        var _this4 = this;
        var _t8;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              _context27.p = 0;
              this._sessionHandleWithId(sessionId, /*#__PURE__*/function () {
                var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(session) {
                  return _regenerator().w(function (_context26) {
                    while (1) switch (_context26.n) {
                      case 0:
                        session.__rc_isOnMute = true;
                        session.mute();
                        _context26.n = 1;
                        return _this4._updateSessions();
                      case 1:
                        return _context26.a(2);
                    }
                  }, _callee26);
                }));
                return function (_x23) {
                  return _ref23.apply(this, arguments);
                };
              }());
              return _context27.a(2, true);
            case 1:
              _context27.p = 1;
              _t8 = _context27.v;
              this.logger.error("mute fail", _t8);
              if (errorHandler) {
                errorHandler(_t8);
              } else {
                this._toast.warning({
                  message: (0, _i18n.t)('muteError')
                });
              }
              return _context27.a(2, false);
          }
        }, _callee27, this, [[0, 1]]);
      }));
      function mute(_x21, _x22) {
        return _mute.apply(this, arguments);
      }
      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(sessionId) {
        var _this5 = this;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              this._sessionHandleWithId(sessionId, /*#__PURE__*/function () {
                var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(session) {
                  return _regenerator().w(function (_context28) {
                    while (1) switch (_context28.n) {
                      case 0:
                        session.__rc_isOnMute = false;
                        session.unmute();
                        _context28.n = 1;
                        return _this5._updateSessions();
                      case 1:
                        return _context28.a(2);
                    }
                  }, _callee28);
                }));
                return function (_x25) {
                  return _ref24.apply(this, arguments);
                };
              }());
            case 1:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function unmute(_x24) {
        return _unmute.apply(this, arguments);
      }
      return unmute;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(sessionId, errorHandler) {
        var session, _t9;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context30.n = 1;
                break;
              }
              return _context30.a(2, false);
            case 1:
              if (!session.localHold) {
                _context30.n = 2;
                break;
              }
              return _context30.a(2, true);
            case 2:
              _context30.p = 2;
              _context30.n = 3;
              return session.hold();
            case 3:
              session.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
              _context30.n = 4;
              return this._updateSessions();
            case 4:
              this._onCallHold(session);
              return _context30.a(2, true);
            case 5:
              _context30.p = 5;
              _t9 = _context30.v;
              this.logger.error("hold error:", _t9);
              if (errorHandler) {
                errorHandler(_t9);
              } else {
                this._toast.warning({
                  message: (0, _i18n.t)('holdError')
                });
              }
              return _context30.a(2, false);
          }
        }, _callee30, this, [[2, 5]]);
      }));
      function hold(_x26, _x27) {
        return _hold.apply(this, arguments);
      }
      return hold;
    }()
  }, {
    key: "_holdOtherSession",
    value: function () {
      var _holdOtherSession2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(currentSessionId) {
        var _this6 = this;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              _context32.n = 1;
              return Promise.all(Object.values(this.originalSessions).map(/*#__PURE__*/function () {
                var _ref25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(session) {
                  return _regenerator().w(function (_context31) {
                    while (1) switch (_context31.n) {
                      case 0:
                        if (!(currentSessionId === session.id)) {
                          _context31.n = 1;
                          break;
                        }
                        return _context31.a(2);
                      case 1:
                        if (!session.localHold) {
                          _context31.n = 2;
                          break;
                        }
                        return _context31.a(2);
                      case 2:
                        if (!(session.__rc_callStatus === _sessionStatus.sessionStatus.connecting)) {
                          _context31.n = 3;
                          break;
                        }
                        return _context31.a(2);
                      case 3:
                        _context31.n = 4;
                        return session.hold();
                      case 4:
                        session.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
                        _this6._onCallHold(session);
                      case 5:
                        return _context31.a(2);
                    }
                  }, _callee31);
                }));
                return function (_x29) {
                  return _ref25.apply(this, arguments);
                };
              }()));
            case 1:
              _context32.n = 2;
              return this._updateSessions();
            case 2:
              return _context32.a(2);
          }
        }, _callee32, this);
      }));
      function _holdOtherSession(_x28) {
        return _holdOtherSession2.apply(this, arguments);
      }
      return _holdOtherSession;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(sessionId, errorHandler) {
        var session, _t0;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context33.n = 1;
                break;
              }
              return _context33.a(2);
            case 1:
              _context33.p = 1;
              if (!session.localHold) {
                _context33.n = 5;
                break;
              }
              _context33.n = 2;
              return this._holdOtherSession(session.id);
            case 2:
              this._onBeforeCallResume(session);
              _context33.n = 3;
              return session.unhold();
            case 3:
              session.__rc_callStatus = _sessionStatus.sessionStatus.connected;
              _context33.n = 4;
              return this._updateSessions();
            case 4:
              _context33.n = 5;
              return this._onCallResume(session);
            case 5:
              _context33.n = 7;
              break;
            case 6:
              _context33.p = 6;
              _t0 = _context33.v;
              this.logger.log("unhold fail", _t0);
              errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(_t0);
            case 7:
              return _context33.a(2);
          }
        }, _callee33, this, [[1, 6]]);
      }));
      function unhold(_x30, _x31) {
        return _unhold.apply(this, arguments);
      }
      return unhold;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(sessionId) {
        var session, _t1;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.p = _context34.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context34.n = 1;
                break;
              }
              return _context34.a(2);
            case 1:
              if (!(session.__rc_callStatus === _sessionStatus.sessionStatus.connecting)) {
                _context34.n = 2;
                break;
              }
              return _context34.a(2);
            case 2:
              _context34.p = 2;
              session.__rc_recordStatus = _recordStatus.recordStatus.pending;
              _context34.n = 3;
              return this._updateSessions();
            case 3:
              _context34.n = 4;
              return session.startRecord();
            case 4:
              session.__rc_recordStatus = _recordStatus.recordStatus.recording;
              _context34.n = 5;
              return this._updateSessions();
            case 5:
              _context34.n = 10;
              break;
            case 6:
              _context34.p = 6;
              _t1 = _context34.v;
              this.logger.error("start record fail", _t1);
              session.__rc_recordStatus = _recordStatus.recordStatus.idle;
              _context34.n = 7;
              return this._updateSessions();
            case 7:
              if (!(_t1 && _t1.code === -5)) {
                _context34.n = 9;
                break;
              }
              this._toast.danger({
                message: (0, _i18n.t)('recordDisabled')
              });
              // Disabled phone recording
              session.__rc_recordStatus = _recordStatus.recordStatus.noAccess;
              _context34.n = 8;
              return this._updateSessions();
            case 8:
              return _context34.a(2);
            case 9:
              this._toast.danger({
                message: (0, _i18n.t)('recordError', {
                  errorCode: _t1.code
                })
              });
            case 10:
              return _context34.a(2);
          }
        }, _callee34, this, [[2, 6]]);
      }));
      function startRecord(_x32) {
        return _startRecord.apply(this, arguments);
      }
      return startRecord;
    }()
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(sessionId, errorHandler) {
        var session, _t10;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context35.n = 1;
                break;
              }
              return _context35.a(2);
            case 1:
              _context35.p = 1;
              session.__rc_recordStatus = _recordStatus.recordStatus.pending;
              _context35.n = 2;
              return this._updateSessions();
            case 2:
              _context35.n = 3;
              return session.stopRecord();
            case 3:
              session.__rc_recordStatus = _recordStatus.recordStatus.idle;
              _context35.n = 4;
              return this._updateSessions();
            case 4:
              _context35.n = 7;
              break;
            case 5:
              _context35.p = 5;
              _t10 = _context35.v;
              this.logger.error("stop record fail", _t10);
              session.__rc_recordStatus = _recordStatus.recordStatus.recording;
              _context35.n = 6;
              return this._updateSessions();
            case 6:
              errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(_t10);
            case 7:
              return _context35.a(2);
          }
        }, _callee35, this, [[1, 5]]);
      }));
      function stopRecord(_x33, _x34) {
        return _stopRecord.apply(this, arguments);
      }
      return stopRecord;
    }()
  }, {
    key: "park",
    value: function () {
      var _park = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(sessionId) {
        var session, result, _t11;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.p = _context36.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context36.n = 1;
                break;
              }
              return _context36.a(2);
            case 1:
              _context36.p = 1;
              _context36.n = 2;
              return session.park();
            case 2:
              result = _context36.v;
              this.logger.log('Parked successfully', result);
              if (result['park extension']) {
                this._toast.success({
                  message: (0, _i18n.t)('parked', {
                    parkedNumber: "*".concat(result['park extension'])
                  }),
                  ttl: 0
                });
              }
              _context36.n = 4;
              break;
            case 3:
              _context36.p = 3;
              _t11 = _context36.v;
              this.logger.log('park fail', _t11);
            case 4:
              return _context36.a(2);
          }
        }, _callee36, this, [[1, 3]]);
      }));
      function park(_x35) {
        return _park.apply(this, arguments);
      }
      return park;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(transferNumber, sessionId) {
        var session, numberResult, validPhoneNumber, isEDPEnabled, _numberResult, _parsedNumbers$0$avai2, parsedNumbers, _numberResult$numbers, _numberResult$numbers2, _t12, _t13, _t14;
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.p = _context37.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context37.n = 1;
                break;
              }
              return _context37.a(2);
            case 1:
              _context37.p = 1;
              session.__rc_isOnTransfer = true;
              _context37.n = 2;
              return this._updateSessions();
            case 2:
              if (this._permissionCheck) {
                _context37.n = 6;
                break;
              }
              _context37.p = 3;
              numberResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
                areaCode: this._regionSettings.areaCode,
                countryCode: this._regionSettings.countryCode,
                phoneNumbers: [transferNumber]
              });
              _context37.n = 5;
              break;
            case 4:
              _context37.p = 4;
              _t12 = _context37.v;
              this._numberValidate.handleValidateToasts({
                result: false,
                errors: [_t12]
              });
              throw new NumberValidError();
            case 5:
              validPhoneNumber = numberResult && numberResult[0];
              _context37.n = 13;
              break;
            case 6:
              isEDPEnabled = this._appFeatures.isEDPEnabled;
              if (!isEDPEnabled) {
                _context37.n = 7;
                break;
              }
              _t13 = this._numberValidate.validate([transferNumber]);
              _context37.n = 9;
              break;
            case 7:
              _context37.n = 8;
              return this._numberValidate.validateNumbers([transferNumber]);
            case 8:
              _t13 = _context37.v;
            case 9:
              _numberResult = _t13;
              if (_numberResult.result) {
                _context37.n = 10;
                break;
              }
              this._numberValidate.handleValidateToasts(_numberResult);
              throw new NumberValidError();
            case 10:
              if (!isEDPEnabled) {
                _context37.n = 12;
                break;
              }
              _context37.n = 11;
              return this._numberValidate.parseNumbers([transferNumber]);
            case 11:
              parsedNumbers = _context37.v;
              validPhoneNumber = (_parsedNumbers$0$avai2 = parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai2 !== void 0 ? _parsedNumbers$0$avai2 : parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].parsedNumber;
              _context37.n = 13;
              break;
            case 12:
              // TODO: fix type
              // @ts-ignore
              validPhoneNumber = (_numberResult$numbers = _numberResult.numbers) === null || _numberResult$numbers === void 0 ? void 0 : (_numberResult$numbers2 = _numberResult$numbers[0]) === null || _numberResult$numbers2 === void 0 ? void 0 : _numberResult$numbers2.e164;
            case 13:
              _context37.n = 14;
              return session.transfer(validPhoneNumber);
            case 14:
              session.__rc_isOnTransfer = false;
              _context37.n = 15;
              return this._updateSessions();
            case 15:
              _context37.n = 16;
              return this._onCallEnd(session);
            case 16:
              _context37.n = 20;
              break;
            case 17:
              _context37.p = 17;
              _t14 = _context37.v;
              session.__rc_isOnTransfer = false;
              _context37.n = 18;
              return this._updateSessions();
            case 18:
              if (!(_t14 instanceof NumberValidError)) {
                _context37.n = 19;
                break;
              }
              return _context37.a(2);
            case 19:
              this._showTransferError();
            case 20:
              return _context37.a(2);
          }
        }, _callee37, this, [[3, 4], [1, 17]]);
      }));
      function transfer(_x36, _x37) {
        return _transfer.apply(this, arguments);
      }
      return transfer;
    }()
  }, {
    key: "_showTransferError",
    value: function _showTransferError() {
      this._toast.danger({
        message: (0, _i18n.t)('transferError')
      });
    }
  }, {
    key: "startWarmTransfer",
    value: function () {
      var _startWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(transferNumber, sessionId) {
        var session, numberResult, validPhoneNumber, fromNumber, _t15;
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.p = _context38.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context38.n = 1;
                break;
              }
              return _context38.a(2);
            case 1:
              _context38.p = 1;
              session.__rc_isOnTransfer = true;
              _context38.n = 2;
              return this._updateSessions();
            case 2:
              numberResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
                areaCode: this._regionSettings.areaCode,
                countryCode: this._regionSettings.countryCode,
                phoneNumbers: [transferNumber]
              });
              validPhoneNumber = numberResult && numberResult[0];
              fromNumber = session.__rc_direction === _callDirections["default"].outbound ? session.request.from.uri.user : session.request.to.uri.user;
              _context38.n = 3;
              return this.makeCall({
                toNumber: validPhoneNumber,
                fromNumber: fromNumber,
                homeCountryId: this._regionSettings.homeCountryId,
                // TODO: should check that type issue
                // @ts-ignore
                extendedControls: '',
                transferSessionId: sessionId
              });
            case 3:
              _context38.n = 6;
              break;
            case 4:
              _context38.p = 4;
              _t15 = _context38.v;
              this.logger.log('startWarmTransfer fail', _t15);
              session.__rc_isOnTransfer = false;
              _context38.n = 5;
              return this._updateSessions();
            case 5:
              this._showTransferError();
            case 6:
              return _context38.a(2);
          }
        }, _callee38, this, [[1, 4]]);
      }));
      function startWarmTransfer(_x38, _x39) {
        return _startWarmTransfer.apply(this, arguments);
      }
      return startWarmTransfer;
    }()
  }, {
    key: "completeWarmTransfer",
    value: function () {
      var _completeWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(newSessionId) {
        var newSession, oldSessionId, oldSession, _t16;
        return _regenerator().w(function (_context39) {
          while (1) switch (_context39.p = _context39.n) {
            case 0:
              newSession = this.originalSessions[newSessionId];
              if (newSession) {
                _context39.n = 1;
                break;
              }
              return _context39.a(2);
            case 1:
              oldSessionId = newSession.__rc_transferSessionId;
              oldSession = this.originalSessions[oldSessionId];
              if (oldSession) {
                _context39.n = 2;
                break;
              }
              return _context39.a(2);
            case 2:
              newSession.__rc_isOnTransfer = true;
              _context39.n = 3;
              return this._updateSessions();
            case 3:
              _context39.p = 3;
              _context39.n = 4;
              return oldSession.warmTransfer(newSession);
            case 4:
              _context39.n = 7;
              break;
            case 5:
              _context39.p = 5;
              _t16 = _context39.v;
              this.logger.log('completeWarmTransfer fail', _t16);
              newSession.__rc_isOnTransfer = false;
              _context39.n = 6;
              return this._updateSessions();
            case 6:
              this._showTransferError();
            case 7:
              return _context39.a(2);
          }
        }, _callee39, this, [[3, 5]]);
      }));
      function completeWarmTransfer(_x40) {
        return _completeWarmTransfer.apply(this, arguments);
      }
      return completeWarmTransfer;
    }()
  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(flipValue, sessionId) {
        var session, _t17;
        return _regenerator().w(function (_context40) {
          while (1) switch (_context40.p = _context40.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context40.n = 1;
                break;
              }
              return _context40.a(2);
            case 1:
              _context40.p = 1;
              _context40.n = 2;
              return session.flip(flipValue);
            case 2:
              // await this._onCallEnd(session);
              session.__rc_isOnFlip = true;
              this.logger.log('Flipped successfully');
              _context40.n = 4;
              break;
            case 3:
              _context40.p = 3;
              _t17 = _context40.v;
              this.logger.log('flip fail', _t17);
              session.__rc_isOnFlip = false;
              this._toast.warning({
                message: (0, _i18n.t)('flipError')
              });
            case 4:
              _context40.n = 5;
              return this._updateSessions();
            case 5:
              return _context40.a(2);
          }
        }, _callee40, this, [[1, 3]]);
      }));
      function flip(_x41, _x42) {
        return _flip.apply(this, arguments);
      }
      return flip;
    }()
  }, {
    key: "_sendDTMF",
    value: function () {
      var _sendDTMF2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(dtmfValue, session) {
        var _t18;
        return _regenerator().w(function (_context41) {
          while (1) switch (_context41.p = _context41.n) {
            case 0:
              _context41.p = 0;
              _context41.n = 1;
              return session.dtmf(dtmfValue, 100);
            case 1:
              _context41.n = 3;
              break;
            case 2:
              _context41.p = 2;
              _t18 = _context41.v;
              this.logger.log('sendDTMF fail', _t18);
            case 3:
              return _context41.a(2);
          }
        }, _callee41, this, [[0, 2]]);
      }));
      function _sendDTMF(_x43, _x44) {
        return _sendDTMF2.apply(this, arguments);
      }
      return _sendDTMF;
    }()
  }, {
    key: "sendDTMF",
    value: function () {
      var _sendDTMF3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42(dtmfValue, sessionId) {
        var session;
        return _regenerator().w(function (_context42) {
          while (1) switch (_context42.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (!session) {
                _context42.n = 1;
                break;
              }
              _context42.n = 1;
              return this._sendDTMF(dtmfValue, session);
            case 1:
              return _context42.a(2);
          }
        }, _callee42, this);
      }));
      function sendDTMF(_x45, _x46) {
        return _sendDTMF3.apply(this, arguments);
      }
      return sendDTMF;
    }()
  }, {
    key: "hangup",
    value: function () {
      var _hangup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43(sessionId, errorHandler) {
        var session, _t19;
        return _regenerator().w(function (_context43) {
          while (1) switch (_context43.p = _context43.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context43.n = 1;
                break;
              }
              return _context43.a(2);
            case 1:
              _context43.p = 1;
              this._onBeforeCallEnd(session);
              _context43.n = 2;
              return session.terminate();
            case 2:
              _context43.n = 5;
              break;
            case 3:
              _context43.p = 3;
              _t19 = _context43.v;
              this.logger.log('hangup fail', _t19);
              _context43.n = 4;
              return this._onCallEnd(session);
            case 4:
              errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(_t19);
            case 5:
              return _context43.a(2);
          }
        }, _callee43, this, [[1, 3]]);
      }));
      function hangup(_x47, _x48) {
        return _hangup.apply(this, arguments);
      }
      return hangup;
    }()
  }, {
    key: "toVoiceMail",
    value: function () {
      var _toVoiceMail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee44(sessionId) {
        var session, _t20;
        return _regenerator().w(function (_context44) {
          while (1) switch (_context44.p = _context44.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context44.n = 1;
                break;
              }
              return _context44.a(2);
            case 1:
              _context44.p = 1;
              session.__rc_isToVoicemail = true;
              _context44.n = 2;
              return session.toVoicemail();
            case 2:
              _context44.n = 5;
              break;
            case 3:
              _context44.p = 3;
              _t20 = _context44.v;
              this.logger.log('toVoiceMail fail', _t20);
              _context44.n = 4;
              return this._onCallEnd(session);
            case 4:
              this._toast.warning({
                message: (0, _i18n.t)('toVoiceMailError')
              });
            case 5:
              return _context44.a(2);
          }
        }, _callee44, this, [[1, 3]]);
      }));
      function toVoiceMail(_x49) {
        return _toVoiceMail.apply(this, arguments);
      }
      return toVoiceMail;
    }()
  }, {
    key: "replyWithMessage",
    value: function () {
      var _replyWithMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee45(sessionId, replyOptions, errorHandler) {
        var session, _t21;
        return _regenerator().w(function (_context45) {
          while (1) switch (_context45.p = _context45.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context45.n = 1;
                break;
              }
              return _context45.a(2);
            case 1:
              _context45.p = 1;
              session.__rc_isReplied = true;
              _context45.n = 2;
              return session.replyWithMessage(replyOptions);
            case 2:
              return _context45.a(2, true);
            case 3:
              _context45.p = 3;
              _t21 = _context45.v;
              this.logger.log('replyWithMessage fail', _t21);
              _context45.n = 4;
              return this._onCallEnd(session);
            case 4:
              errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(_t21);
            case 5:
              return _context45.a(2);
          }
        }, _callee45, this, [[1, 3]]);
      }));
      function replyWithMessage(_x50, _x51, _x52) {
        return _replyWithMessage.apply(this, arguments);
      }
      return replyWithMessage;
    }()
  }, {
    key: "_addTrack",
    value: function _addTrack(rawSession) {
      if (rawSession && this._webphone) {
        var _ref26 = this._webphone.userAgent.media || {},
          remote = _ref26.remote,
          local = _ref26.local;
        if (remote && local) {
          rawSession.addTrack(remote, local);
        }
      }
    }
  }, {
    key: "_sessionHandleWithId",
    value: function _sessionHandleWithId(sessionId, func) {
      var session = this.originalSessions[sessionId];
      if (!session) {
        return null;
      }
      return func(session);
    }
  }, {
    key: "_invite",
    value: function () {
      var _invite2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee46(toNumber, _ref27) {
        var inviteOptions, extendedControls, transferSessionId, errorCode, pass, webphone, _this$_ringCentralExt, _this$_subscription$s, _this$_subscription, _this$_subscription$f, _this$_subscription2, session;
        return _regenerator().w(function (_context46) {
          while (1) switch (_context46.n) {
            case 0:
              inviteOptions = _ref27.inviteOptions, extendedControls = _ref27.extendedControls, transferSessionId = _ref27.transferSessionId;
              errorCode = this.errorCode;
              if (!errorCode) {
                _context46.n = 1;
                break;
              }
              this.logger.log('webphone not able to make call, errorCode or not ready or not connected more than 30s', {
                ready: this.ready,
                connected: this.connected,
                errorCode: this.errorCode
              });
              this.showErrorToast({
                errorCode: errorCode
              });
              return _context46.a(2, null);
            case 1:
              if (!(toNumber.length > 6 && (!this._availabilityMonitor || !this._availabilityMonitor.isVoIPOnlyMode))) {
                _context46.n = 3;
                break;
              }
              if (!(process.env.THEME_SYSTEM !== 'spring-ui')) {
                _context46.n = 2;
                break;
              }
              _context46.n = 2;
              return this._fetchDL();
            case 2:
              // TODO: should add some update logic for device lines, not only base on re-login
              pass = this.validateDeviceLines();
              if (pass) {
                _context46.n = 3;
                break;
              }
              return _context46.a(2, null);
            case 3:
              _context46.n = 4;
              return this.ensureAbleToMakeCall();
            case 4:
              webphone = _context46.v;
              if (webphone) {
                _context46.n = 5;
                break;
              }
              this.logger.log('webphone not able to make call, errorCode or not ready or not connected more than 30s', {
                ready: this.ready,
                connected: this.connected,
                errorCode: this.errorCode,
                webSocketReady: (_this$_ringCentralExt = this._ringCentralExtensions) === null || _this$_ringCentralExt === void 0 ? void 0 : _this$_ringCentralExt.isWebSocketReady,
                subscriptionReady: (_this$_subscription$s = (_this$_subscription = this._subscription) === null || _this$_subscription === void 0 ? void 0 : _this$_subscription.subscriptionReady) !== null && _this$_subscription$s !== void 0 ? _this$_subscription$s : false,
                subscriptionFilters: (_this$_subscription$f = (_this$_subscription2 = this._subscription) === null || _this$_subscription2 === void 0 ? void 0 : _this$_subscription2.filters.length) !== null && _this$_subscription$f !== void 0 ? _this$_subscription$f : 0
              });
              return _context46.a(2);
            case 5:
              _context46.n = 6;
              return this._holdOtherSession(null);
            case 6:
              session = webphone.userAgent.invite(toNumber, inviteOptions);
              session.__rc_direction = _callDirections["default"].outbound;
              session.__rc_callStatus = _sessionStatus.sessionStatus.setup;
              session.__rc_creationTime = Date.now();
              session.__rc_lastActiveTime = Date.now();
              session.__rc_fromNumber = inviteOptions.fromNumber;
              session.__rc_extendedControls = extendedControls;
              session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.pending;
              session.__rc_transferSessionId = transferSessionId;
              this._onAccepted(session);
              _context46.n = 7;
              return this._onCallInit(session);
            case 7:
              return _context46.a(2, session);
          }
        }, _callee46, this);
      }));
      function _invite(_x53, _x54) {
        return _invite2.apply(this, arguments);
      }
      return _invite;
    }()
  }, {
    key: "ensureWebphoneInstance",
    value: function ensureWebphoneInstance() {
      if (!this._webphone) {
        this.logger.log('webphone instance not exist, wait for it');
        return this.rcWebphoneInstance$.pipe((0, _rxjs.filter)(Boolean));
      }
      return (0, _rxjs.of)(this._webphone);
    }
  }, {
    key: "ensureAbleToMakeCall",
    value: function () {
      var _ensureAbleToMakeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee47() {
        var _this7 = this;
        var readyToMakCall$, notAble$, webphone, shouldRecover, realtimeReady;
        return _regenerator().w(function (_context47) {
          while (1) switch (_context47.n) {
            case 0:
              readyToMakCall$ = (0, _nextCore.fromWatchValue)(this, function () {
                return [_this7.ready, _this7.connected];
              }, {
                multiple: true
              }).pipe((0, _rxjs.filter)(function (_ref28) {
                var _ref29 = _slicedToArray(_ref28, 2),
                  ready = _ref29[0],
                  connected = _ref29[1];
                return ready && connected;
              }));
              notAble$ = (0, _rxjs.merge)(
              // when have error code, also means not able to make call, webphone not connected successfully
              (0, _nextCore.fromWatchValue)(this, function () {
                return _this7.errorCode;
              }).pipe((0, _rxjs.filter)(Boolean)), (0, _rxjs.timer)(30 * 1000)).pipe((0, _rxjs.map)(function () {
                return null;
              }));
              _context47.n = 1;
              return (0, _rxjs.firstValueFrom)((0, _rxjs.race)([readyToMakCall$.pipe((0, _rxjs.switchMap)(function () {
                return _this7.ensureWebphoneInstance();
              })), notAble$]));
            case 1:
              webphone = _context47.v;
              if (webphone) {
                _context47.n = 2;
                break;
              }
              return _context47.a(2, null);
            case 2:
              shouldRecover = !!this._ringCentralExtensions && !this._ringCentralExtensions.isWebSocketReady;
              _context47.n = 3;
              return this._awaitRealtimeRecovery({
                recover: shouldRecover
              });
            case 3:
              realtimeReady = _context47.v;
              if (realtimeReady) {
                _context47.n = 4;
                break;
              }
              return _context47.a(2, null);
            case 4:
              return _context47.a(2, webphone);
          }
        }, _callee47, this);
      }));
      function ensureAbleToMakeCall() {
        return _ensureAbleToMakeCall.apply(this, arguments);
      }
      return ensureAbleToMakeCall;
    }()
    /**
     * start an outbound call.
     * @param {toNumber} recipient number
     * @param {fromNumber} call Id
     * @param {homeCountryId} homeCountry Id
     */
  }, {
    key: "makeCall",
    value: (function () {
      var _makeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee48(_ref30) {
        var toNumber, fromNumber, homeCountryId, extendedControls, transferSessionId, inviteOptions, result, _t22, _t23, _t24;
        return _regenerator().w(function (_context48) {
          while (1) switch (_context48.n) {
            case 0:
              toNumber = _ref30.toNumber, fromNumber = _ref30.fromNumber, homeCountryId = _ref30.homeCountryId, extendedControls = _ref30.extendedControls, transferSessionId = _ref30.transferSessionId;
              _context48.n = 1;
              return this.getAcceptOptions();
            case 1:
              _t22 = _context48.v.sessionDescriptionHandlerOptions;
              _t23 = fromNumber;
              _t24 = homeCountryId;
              inviteOptions = {
                sessionDescriptionHandlerOptions: _t22,
                fromNumber: _t23,
                homeCountryId: _t24
              };
              _context48.n = 2;
              return this._invite(toNumber, {
                inviteOptions: inviteOptions,
                extendedControls: extendedControls,
                transferSessionId: transferSessionId
              });
            case 2:
              result = _context48.v;
              return _context48.a(2, result ? {
                id: result.id
              } : null);
          }
        }, _callee48, this);
      }));
      function makeCall(_x55) {
        return _makeCall.apply(this, arguments);
      }
      return makeCall;
    }()
    /**
     * switch a active call into web phone session.
     */
    )
  }, {
    key: "switchCall",
    value: (function () {
      var _switchCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee49(_ref31, homeCountryId) {
        var _session$data;
        var id, from, direction, to, sipData, extraHeaders, toNumber, fromNumber, inviteOptions, session, _t25, _t26, _t27, _t28;
        return _regenerator().w(function (_context49) {
          while (1) switch (_context49.n) {
            case 0:
              id = _ref31.id, from = _ref31.from, direction = _ref31.direction, to = _ref31.to, sipData = _ref31.sipData;
              extraHeaders = [];
              extraHeaders.push("Replaces: ".concat(id, ";to-tag=").concat(sipData.fromTag, ";from-tag=").concat(sipData.toTag));
              extraHeaders.push('RC-call-type: replace');
              toNumber = direction === _callDirections["default"].outbound ? to.phoneNumber : from.phoneNumber;
              fromNumber = direction === _callDirections["default"].outbound ? from.phoneNumber : to.phoneNumber;
              _context49.n = 1;
              return this.getAcceptOptions();
            case 1:
              _t25 = _context49.v.sessionDescriptionHandlerOptions;
              _t26 = fromNumber;
              _t27 = homeCountryId;
              _t28 = extraHeaders;
              inviteOptions = {
                sessionDescriptionHandlerOptions: _t25,
                fromNumber: _t26,
                homeCountryId: _t27,
                extraHeaders: _t28
              };
              _context49.n = 2;
              return this._invite(toNumber, {
                inviteOptions: inviteOptions
              });
            case 2:
              session = _context49.v;
              return _context49.a(2, session === null || session === void 0 ? void 0 : (_session$data = session.data) === null || _session$data === void 0 ? void 0 : _session$data.sessionId);
          }
        }, _callee49, this);
      }));
      function switchCall(_x56, _x57) {
        return _switchCall.apply(this, arguments);
      }
      return switchCall;
    }())
  }, {
    key: "pickupInboundCall",
    value: function () {
      var _pickupInboundCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee50(_ref32) {
        var sessionId, toNumber, fromNumber, serverId, extraHeaders, inviteOptions, session, _t29, _t30, _t31;
        return _regenerator().w(function (_context50) {
          while (1) switch (_context50.n) {
            case 0:
              sessionId = _ref32.sessionId, toNumber = _ref32.toNumber, fromNumber = _ref32.fromNumber, serverId = _ref32.serverId;
              extraHeaders = ["RC-call-type: inbound-pickup; session-id: ".concat(sessionId, "; server-id: ").concat(serverId)];
              _context50.n = 1;
              return this.getAcceptOptions();
            case 1:
              _t29 = _context50.v.sessionDescriptionHandlerOptions;
              _t30 = fromNumber;
              _t31 = extraHeaders;
              inviteOptions = {
                sessionDescriptionHandlerOptions: _t29,
                fromNumber: _t30,
                extraHeaders: _t31
              };
              _context50.n = 2;
              return this._invite(toNumber, {
                inviteOptions: inviteOptions
              });
            case 2:
              session = _context50.v;
              this._trackCallAnswer();
              return _context50.a(2, session);
          }
        }, _callee50, this);
      }));
      function pickupInboundCall(_x58) {
        return _pickupInboundCall.apply(this, arguments);
      }
      return pickupInboundCall;
    }()
  }, {
    key: "updateSessionMatchedContact",
    value: function () {
      var _updateSessionMatchedContact = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee52(sessionId, contact) {
        var _this8 = this;
        return _regenerator().w(function (_context52) {
          while (1) switch (_context52.n) {
            case 0:
              this._sessionHandleWithId(sessionId, /*#__PURE__*/function () {
                var _ref33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee51(session) {
                  return _regenerator().w(function (_context51) {
                    while (1) switch (_context51.n) {
                      case 0:
                        session.__rc_contactMatch = contact;
                        _context51.n = 1;
                        return _this8._updateSessions();
                      case 1:
                        return _context51.a(2);
                    }
                  }, _callee51);
                }));
                return function (_x61) {
                  return _ref33.apply(this, arguments);
                };
              }());
            case 1:
              return _context52.a(2);
          }
        }, _callee52, this);
      }));
      function updateSessionMatchedContact(_x59, _x60) {
        return _updateSessionMatchedContact.apply(this, arguments);
      }
      return updateSessionMatchedContact;
    }()
  }, {
    key: "_updateSessions",
    value: function () {
      var _updateSessions2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee53() {
        return _regenerator().w(function (_context53) {
          while (1) switch (_context53.n) {
            case 0:
              _context53.n = 1;
              return this.updateSessionsState(_toConsumableArray(Object.values(this.originalSessions)).map(_webphoneHelper.normalizeSession));
            case 1:
              return _context53.a(2);
          }
        }, _callee53, this);
      }));
      function _updateSessions() {
        return _updateSessions2.apply(this, arguments);
      }
      return _updateSessions;
    }()
  }, {
    key: "toggleMinimized",
    value: function () {
      var _toggleMinimized = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee55(sessionId) {
        var _this9 = this;
        return _regenerator().w(function (_context55) {
          while (1) switch (_context55.n) {
            case 0:
              this._sessionHandleWithId(sessionId, /*#__PURE__*/function () {
                var _ref34 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee54(session) {
                  return _regenerator().w(function (_context54) {
                    while (1) switch (_context54.n) {
                      case 0:
                        session.__rc_minimized = !session.__rc_minimized;
                        _context54.n = 1;
                        return _this9._updateSessions();
                      case 1:
                        return _context54.a(2);
                    }
                  }, _callee54);
                }));
                return function (_x63) {
                  return _ref34.apply(this, arguments);
                };
              }());
            case 1:
              return _context55.a(2);
          }
        }, _callee55, this);
      }));
      function toggleMinimized(_x62) {
        return _toggleMinimized.apply(this, arguments);
      }
      return toggleMinimized;
    }()
  }, {
    key: "_onCallInit",
    value: function () {
      var _onCallInit2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee56(session) {
        var _this$_contactMatcher;
        var normalizedSession;
        return _regenerator().w(function (_context56) {
          while (1) switch (_context56.n) {
            case 0:
              _context56.n = 1;
              return this._updateSessions();
            case 1:
              normalizedSession = this._getNormalizedSession(session);
              _context56.n = 2;
              return this.setActiveSessionId(normalizedSession.id);
            case 2:
              (_this$_contactMatcher = this._contactMatcher) === null || _this$_contactMatcher === void 0 ? void 0 : _this$_contactMatcher.triggerMatch();
              this._eventEmitter.emit(_events.EVENTS.callInit, normalizedSession, this.activeSession);
            case 3:
              return _context56.a(2);
          }
        }, _callee56, this);
      }));
      function _onCallInit(_x64) {
        return _onCallInit2.apply(this, arguments);
      }
      return _onCallInit;
    }()
  }, {
    key: "_onCallStart",
    value: function () {
      var _onCallStart2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee57(session) {
        var normalizedSession;
        return _regenerator().w(function (_context57) {
          while (1) switch (_context57.n) {
            case 0:
              _context57.n = 1;
              return this._updateSessions();
            case 1:
              normalizedSession = this._getNormalizedSession(session);
              _context57.n = 2;
              return this.setStateOnCallStart(normalizedSession);
            case 2:
              this._eventEmitter.emit(_events.EVENTS.callStart, normalizedSession, this.activeSession);
            case 3:
              return _context57.a(2);
          }
        }, _callee57, this);
      }));
      function _onCallStart(_x65) {
        return _onCallStart2.apply(this, arguments);
      }
      return _onCallStart;
    }()
  }, {
    key: "_onCallRing",
    value: function () {
      var _onCallRing2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee58(session) {
        var _this$_contactMatcher2;
        var normalizedSession;
        return _regenerator().w(function (_context58) {
          while (1) switch (_context58.n) {
            case 0:
              _context58.n = 1;
              return this._updateSessions();
            case 1:
              normalizedSession = this._getNormalizedSession(session);
              _context58.n = 2;
              return this.setStateOnCallRing(normalizedSession);
            case 2:
              (_this$_contactMatcher2 = this._contactMatcher) === null || _this$_contactMatcher2 === void 0 ? void 0 : _this$_contactMatcher2.triggerMatch();
              if (this.activeSession && !(0, _webphoneHelper.isOnHold)(this.activeSession)) {
                this._webphone.userAgent.audioHelper.playIncoming(false);
              }
              this._eventEmitter.emit(_events.EVENTS.callRing, normalizedSession, this.ringSession);
            case 3:
              return _context58.a(2);
          }
        }, _callee58, this);
      }));
      function _onCallRing(_x66) {
        return _onCallRing2.apply(this, arguments);
      }
      return _onCallRing;
    }()
  }, {
    key: "_onBeforeCallEnd",
    value: function _onBeforeCallEnd(session) {
      var normalizedSession = this._getNormalizedSession(session);
      this._eventEmitter.emit(_events.EVENTS.beforeCallEnd, normalizedSession, this.activeSession);
    }
  }, {
    key: "_releaseVideoElementsOnSessionsEmpty",
    value: function _releaseVideoElementsOnSessionsEmpty() {
      if (this._remoteVideo && this._localVideo && this.sessions.length === 0) {
        // Pause video elements to release system Video Wake Lock RCINT-15582
        if (!this._remoteVideo.paused) {
          this._remoteVideo.pause();
          this._remoteVideo.srcObject = null;
        }
        if (!this._localVideo.paused) {
          this._localVideo.pause();
        }
      }
    }
  }, {
    key: "_reconnectWebphoneIfNecessaryOnSessionsEmpty",
    value: function _reconnectWebphoneIfNecessaryOnSessionsEmpty() {
      if (this._reconnectAfterSessionEnd && this.sessions.length === 0) {
        var reason = this._reconnectAfterSessionEnd.reason;
        if (reason) {
          this._toast.warning({
            message: reason,
            allowDuplicates: false
          });
        }
        this._reconnectAfterSessionEnd = null;
        this.connect({
          skipConnectDelay: true,
          force: true,
          skipDLCheck: true
        });
      }
    }
  }, {
    key: "_onCallEnd",
    value: function () {
      var _onCallEnd2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee59(session) {
        var transferSession, originalTransferSession, normalizedSession, _transferSession;
        return _regenerator().w(function (_context59) {
          while (1) switch (_context59.n) {
            case 0:
              // should remove __rc_transferSessionId when the call is warm transfer call
              transferSession = this.sessions.find(function (s) {
                return s.warmTransferSessionId === session.id;
              });
              if (transferSession) {
                originalTransferSession = this.originalSessions[transferSession.id];
                if (originalTransferSession) {
                  delete originalTransferSession.__rc_transferSessionId;
                }
              }
              session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.stopped;
              normalizedSession = this._getNormalizedSession(session);
              if (normalizedSession) {
                _context59.n = 1;
                break;
              }
              return _context59.a(2);
            case 1:
              if (session.__rc_transferSessionId) {
                _transferSession = this.originalSessions[session.__rc_transferSessionId];
                if (_transferSession) {
                  _transferSession.__rc_isOnTransfer = false;
                }
              }
              _context59.n = 2;
              return this._updateSessions();
            case 2:
              _context59.n = 3;
              return this.setStateOnCallEnd(normalizedSession);
            case 3:
              this._eventEmitter.emit(_events.EVENTS.callEnd, normalizedSession, this.activeSession, this.ringSession);
              this._releaseVideoElementsOnSessionsEmpty();
              this._reconnectWebphoneIfNecessaryOnSessionsEmpty();
            case 4:
              return _context59.a(2);
          }
        }, _callee59, this);
      }));
      function _onCallEnd(_x67) {
        return _onCallEnd2.apply(this, arguments);
      }
      return _onCallEnd;
    }()
  }, {
    key: "_onBeforeCallResume",
    value: function _onBeforeCallResume(session) {
      var normalizedSession = this._getNormalizedSession(session);
      this._eventEmitter.emit(_events.EVENTS.beforeCallResume, normalizedSession, this.activeSession);
    }
  }, {
    key: "_onCallResume",
    value: function () {
      var _onCallResume2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee60(session) {
        var normalizedSession;
        return _regenerator().w(function (_context60) {
          while (1) switch (_context60.n) {
            case 0:
              normalizedSession = this._getNormalizedSession(session);
              _context60.n = 1;
              return this.setActiveSessionId(normalizedSession.id);
            case 1:
              this._eventEmitter.emit(_events.EVENTS.callResume, normalizedSession, this.activeSession);
            case 2:
              return _context60.a(2);
          }
        }, _callee60, this);
      }));
      function _onCallResume(_x68) {
        return _onCallResume2.apply(this, arguments);
      }
      return _onCallResume;
    }()
  }, {
    key: "_onCallHold",
    value: function _onCallHold(session) {
      var normalizedSession = this._getNormalizedSession(session);
      this._eventEmitter.emit(_events.EVENTS.callHold, normalizedSession, this.activeSession);
    }
  }, {
    key: "onCallStart",
    value: function onCallStart(handler) {
      this._eventEmitter.on(_events.EVENTS.callStart, handler);
    }
  }, {
    key: "onCallInit",
    value: function onCallInit(handler) {
      this._eventEmitter.on(_events.EVENTS.callInit, handler);
    }
  }, {
    key: "onCallRing",
    value: function onCallRing(handler) {
      this._eventEmitter.on(_events.EVENTS.callRing, handler);
    }
  }, {
    key: "onCallEnd",
    value: function onCallEnd(handler) {
      this._eventEmitter.on(_events.EVENTS.callEnd, handler);
    }
  }, {
    key: "onBeforeCallResume",
    value: function onBeforeCallResume(handler) {
      this._eventEmitter.on(_events.EVENTS.beforeCallResume, handler);
    }
  }, {
    key: "onCallResume",
    value: function onCallResume(handler) {
      this._eventEmitter.on(_events.EVENTS.callResume, handler);
    }
  }, {
    key: "onCallHold",
    value: function onCallHold(handler) {
      this._eventEmitter.on(_events.EVENTS.callHold, handler);
    }
  }, {
    key: "onBeforeCallEnd",
    value: function onBeforeCallEnd(handler) {
      this._eventEmitter.on(_events.EVENTS.beforeCallEnd, handler);
    }
  }, {
    key: "onWebphoneRegistered",
    value: function onWebphoneRegistered(handler) {
      var _this0 = this;
      this._eventEmitter.on(_events.EVENTS.webphoneRegistered, handler);
      return function () {
        _this0._eventEmitter.off(_events.EVENTS.webphoneRegistered, handler);
      };
    }
  }, {
    key: "onWebphoneUnregistered",
    value: function onWebphoneUnregistered(handler) {
      var _this1 = this;
      this._eventEmitter.on(_events.EVENTS.webphoneUnregistered, handler);
      return function () {
        _this1._eventEmitter.off(_events.EVENTS.webphoneUnregistered, handler);
      };
    }
  }, {
    key: "_disconnect",
    value: function () {
      var _disconnect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee61() {
        return _regenerator().w(function (_context61) {
          while (1) switch (_context61.n) {
            case 0:
              _context61.n = 1;
              return _superPropGet(Webphone, "_disconnect", this, 3)([]);
            case 1:
              _context61.n = 2;
              return this._updateSessions();
            case 2:
              return _context61.a(2);
          }
        }, _callee61, this);
      }));
      function _disconnect() {
        return _disconnect2.apply(this, arguments);
      }
      return _disconnect;
    }()
  }, {
    key: "hasCallSessions",
    get: function get() {
      return this.sessions.length > 0;
    }
  }, {
    key: "sessionPhoneNumbers",
    get: function get() {
      var outputs = [];
      this.sessions.forEach(function (session) {
        outputs.push(session.to);
        outputs.push(session.from);
      });
      return outputs;
    }

    /**
     * Current active session(Outbound and InBound that answered)
     */
  }, {
    key: "activeSession",
    get: function get() {
      var _this10 = this;
      if (!this.activeSessionId) {
        return null;
      }
      var activeSession = (0, _ramda.find)(function (session) {
        return session.id === _this10.activeSessionId;
      }, this.sessions);
      return activeSession;
    }

    /**
     * Current ring session(inbound)
     */
  }, {
    key: "ringSession",
    get: function get() {
      var _this11 = this;
      if (!this.ringSessionId) {
        return null;
      }
      var session = (0, _ramda.find)(function (session) {
        return session.id === _this11.ringSessionId;
      }, this.sessions);
      return session;
    }
  }, {
    key: "ringSessions",
    get: function get() {
      return this.sessions.filter(function (session) {
        return (0, _webphoneHelper.isRing)(session);
      });
    }
  }, {
    key: "onHoldSessions",
    get: function get() {
      return this.sessions.filter(function (session) {
        return (0, _webphoneHelper.isOnHold)(session);
      });
    }
  }, {
    key: "getAcceptOptions",
    value: function () {
      var _getAcceptOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee62() {
        var _t32, _t33, _t34;
        return _regenerator().w(function (_context62) {
          while (1) switch (_context62.n) {
            case 0:
              _context62.n = 1;
              return this._audioSettings.getInputDeviceOptions();
            case 1:
              _t32 = _context62.v;
              _t33 = {
                audio: _t32,
                video: false
              };
              _t34 = {
                constraints: _t33
              };
              return _context62.a(2, {
                sessionDescriptionHandlerOptions: _t34
              });
          }
        }, _callee62, this);
      }));
      function getAcceptOptions() {
        return _getAcceptOptions.apply(this, arguments);
      }
      return getAcceptOptions;
    }()
  }, {
    key: "isOnTransfer",
    get: function get() {
      return this.activeSession && this.activeSession.isOnTransfer;
    }
  }, {
    key: "ringingCallOnView",
    get: function get() {
      return (0, _ramda.find)(function (session) {
        return !session.minimized;
      }, this.ringSessions);
    }
  }, {
    key: "_getNormalizedSession",
    value: function _getNormalizedSession(session) {
      return (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);
    }
  }]);
}(_WebphoneBase2.WebphoneBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "activeSessionId", [_nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ringSessionId", [_nextCore.state, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lastEndedSessions", [_nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sessions", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateSessionsState", [_nextCore.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSessionsState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSessionsState", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSessionsState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setActiveSessionId", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setActiveSessionId", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallRing", [_nextCore.action, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallRing"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnCallRing", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnCallRing"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallStart", [_nextCore.action, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallStart"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnCallStart", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnCallStart"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallEnd", [_nextCore.action, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStateOnCallEnd", [_dec33, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "setStateOnCallEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackCallAnswer", [_dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackCallAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_dec42, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "emitIgnoreEvent", [_dec45, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "emitIgnoreEvent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resume", [_dec48, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "resume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_dec51, _dec52, _dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_dec54, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_dec57, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_dec60, _dec61, _dec62], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_dec63, _dec64, _dec65], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_dec66, _dec67, _dec68], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_dec69, _dec70, _dec71], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "park", [_dec72, _dec73, _dec74], Object.getOwnPropertyDescriptor(_class2.prototype, "park"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_dec75, _dec76, _dec77], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startWarmTransfer", [_dec78, _dec79, _dec80], Object.getOwnPropertyDescriptor(_class2.prototype, "startWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeWarmTransfer", [_dec81, _dec82, _dec83], Object.getOwnPropertyDescriptor(_class2.prototype, "completeWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flip", [_dec84, _dec85, _dec86], Object.getOwnPropertyDescriptor(_class2.prototype, "flip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendDTMF", [_dec87, _dec88, _dec89], Object.getOwnPropertyDescriptor(_class2.prototype, "sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangup", [_dec90, _dec91, _dec92], Object.getOwnPropertyDescriptor(_class2.prototype, "hangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toVoiceMail", [_dec93, _dec94, _dec95], Object.getOwnPropertyDescriptor(_class2.prototype, "toVoiceMail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyWithMessage", [_dec96, _dec97, _dec98], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_dec99, _dec100, _dec101], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchCall", [_dec102, _dec103, _dec104], Object.getOwnPropertyDescriptor(_class2.prototype, "switchCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pickupInboundCall", [_dec105, _dec106, _dec107], Object.getOwnPropertyDescriptor(_class2.prototype, "pickupInboundCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSessionMatchedContact", [_dec108, _dec109, _dec110], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSessionMatchedContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSessions", [_dec111, _dec112, _dec113], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleMinimized", [_dec114, _dec115, _dec116], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleMinimized"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionPhoneNumbers", [_dec117, _dec118, _dec119], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_dec120, _dec121, _dec122], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSession", [_dec123, _dec124, _dec125], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSessions", [_dec126, _dec127, _dec128], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onHoldSessions", [_dec129, _dec130, _dec131], Object.getOwnPropertyDescriptor(_class2.prototype, "onHoldSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringingCallOnView", [_dec132, _dec133, _dec134], Object.getOwnPropertyDescriptor(_class2.prototype, "ringingCallOnView"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Webphone.js.map
