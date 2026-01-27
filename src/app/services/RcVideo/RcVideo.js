"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.from.js");
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
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideo = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _meetingHelper = require("@ringcentral-integration/commons/helpers/meetingHelper");
var _renameTurkey = require("@ringcentral-integration/commons/helpers/renameTurkey");
var _i18n = require("@ringcentral-integration/i18n");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _Meeting = require("../Meeting");
var _VideoConfiguration = require("../VideoConfiguration");
var _constants = require("./constants");
var _i18n2 = require("./i18n");
var _videoHelper = require("./videoHelper");
var _videoStatus = require("./videoStatus");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _dec125, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var RcVideo = exports.RcVideo = (_dec = (0, _nextCore.injectable)({
  name: 'RcVideo'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 9);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 10);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('RcVideoOptions')(target, undefined, 11);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _VideoConfiguration.VideoConfiguration === "undefined" ? Object : _VideoConfiguration.VideoConfiguration, typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.Analytics === "undefined" ? Object : _services.Analytics, typeof _services.AvailabilityMonitor === "undefined" ? Object : _services.AvailabilityMonitor, typeof RcVideoOptions === "undefined" ? Object : RcVideoOptions]), _dec7 = Reflect.metadata("design:type", typeof Partial === "undefined" ? Object : Partial), _dec8 = Reflect.metadata("design:type", typeof Partial === "undefined" ? Object : Partial), _dec9 = Reflect.metadata("design:type", typeof Partial === "undefined" ? Object : Partial), _dec0 = Reflect.metadata("design:type", typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue), _dec1 = Reflect.metadata("design:type", typeof RcVPreferencesGET === "undefined" ? Object : RcVPreferencesGET), _dec10 = Reflect.metadata("design:type", typeof RcVSettingLocksGET === "undefined" ? Object : RcVSettingLocksGET), _dec11 = Reflect.metadata("design:type", typeof RcvDelegator === "undefined" ? Object : RcvDelegator), _dec12 = Reflect.metadata("design:type", Array), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof Partial === "undefined" ? Object : Partial]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof Partial === "undefined" ? Object : Partial]), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [typeof Partial === "undefined" ? Object : Partial, void 0]), _dec21 = (0, _services.track)(function (that, status) {
  if (status !== _videoStatus.videoStatus.creating) return;
  var target = that._analytics.getTrackTarget();
  if (target) {
    return [_trackEvents.trackEvents.clickMeetingSchedulePage, {
      router: target.router,
      'Meeting Type': 'RCV'
    }];
  }
}), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue]), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", [typeof RcVPreferencesGET === "undefined" ? Object : RcVPreferencesGET]), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [Boolean]), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", [typeof RcVSettingLocksGET === "undefined" ? Object : RcVSettingLocksGET]), _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", [typeof RcvDelegator === "undefined" ? Object : RcvDelegator]), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", [Array]), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", [Boolean]), _dec36 = (0, _nextCore.delegate)('server'), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", []), _dec39 = (0, _nextCore.delegate)('server'), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", [typeof Partial === "undefined" ? Object : Partial]), _dec42 = (0, _nextCore.delegate)('server'), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", []), _dec45 = (0, _nextCore.delegate)('server'), _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", []), _dec48 = (0, _nextCore.delegate)('server'), _dec49 = Reflect.metadata("design:type", Function), _dec50 = Reflect.metadata("design:paramtypes", [Boolean]), _dec51 = (0, _nextCore.delegate)('server'), _dec52 = Reflect.metadata("design:type", Function), _dec53 = Reflect.metadata("design:paramtypes", [typeof RcvDelegator === "undefined" ? Object : RcvDelegator]), _dec54 = (0, _nextCore.delegate)('server'), _dec55 = Reflect.metadata("design:type", Function), _dec56 = Reflect.metadata("design:paramtypes", [Object]), _dec57 = (0, _nextCore.delegate)('server'), _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", [typeof RcVMeetingModel === "undefined" ? Object : RcVMeetingModel, void 0]), _dec60 = (0, _nextCore.delegate)('server'), _dec61 = Reflect.metadata("design:type", Function), _dec62 = Reflect.metadata("design:paramtypes", [typeof RcVMeetingModel === "undefined" ? Object : RcVMeetingModel, void 0]), _dec63 = (0, _nextCore.delegate)('server'), _dec64 = Reflect.metadata("design:type", Function), _dec65 = Reflect.metadata("design:paramtypes", [typeof RcvInvitationRequest === "undefined" ? Object : RcvInvitationRequest]), _dec66 = (0, _nextCore.delegate)('server'), _dec67 = Reflect.metadata("design:type", Function), _dec68 = Reflect.metadata("design:paramtypes", [typeof RcvInvitationRequest === "undefined" ? Object : RcvInvitationRequest]), _dec69 = (0, _nextCore.delegate)('server'), _dec70 = Reflect.metadata("design:type", Function), _dec71 = Reflect.metadata("design:paramtypes", [typeof RcVideoAPI === "undefined" ? Object : RcVideoAPI, Boolean]), _dec72 = (0, _nextCore.delegate)('server'), _dec73 = Reflect.metadata("design:type", Function), _dec74 = Reflect.metadata("design:paramtypes", [String, typeof RcVideoAPI === "undefined" ? Object : RcVideoAPI, Boolean]), _dec75 = (0, _nextCore.delegate)('server'), _dec76 = Reflect.metadata("design:type", Function), _dec77 = Reflect.metadata("design:paramtypes", []), _dec78 = (0, _nextCore.delegate)('server'), _dec79 = Reflect.metadata("design:type", Function), _dec80 = Reflect.metadata("design:paramtypes", [Number, Number]), _dec81 = (0, _nextCore.delegate)('server'), _dec82 = Reflect.metadata("design:type", Function), _dec83 = Reflect.metadata("design:paramtypes", [String]), _dec84 = (0, _nextCore.delegate)('server'), _dec85 = Reflect.metadata("design:type", Function), _dec86 = Reflect.metadata("design:paramtypes", [String, Number, Number]), _dec87 = (0, _nextCore.delegate)('server'), _dec88 = Reflect.metadata("design:type", Function), _dec89 = Reflect.metadata("design:paramtypes", [String, typeof RcVMeetingModel === "undefined" ? Object : RcVMeetingModel, void 0]), _dec90 = (0, _nextCore.delegate)('server'), _dec91 = Reflect.metadata("design:type", Function), _dec92 = Reflect.metadata("design:paramtypes", []), _dec93 = (0, _nextCore.delegate)('server'), _dec94 = Reflect.metadata("design:type", Function), _dec95 = Reflect.metadata("design:paramtypes", [typeof Partial === "undefined" ? Object : Partial, void 0]), _dec96 = (0, _nextCore.computed)(function (that) {
  return [that.currentUser];
}), _dec97 = Reflect.metadata("design:type", Function), _dec98 = Reflect.metadata("design:paramtypes", []), _dec99 = (0, _nextCore.computed)(function (that) {
  return [that._locale.currentLocale];
}), _dec100 = Reflect.metadata("design:type", Function), _dec101 = Reflect.metadata("design:paramtypes", []), _dec102 = (0, _nextCore.computed)(function (_ref) {
  var preferences = _ref.preferences,
    isInstantMeeting = _ref.isInstantMeeting;
  return [preferences, isInstantMeeting];
}), _dec103 = Reflect.metadata("design:type", Function), _dec104 = Reflect.metadata("design:paramtypes", []), _dec105 = (0, _nextCore.computed)(function (_ref2) {
  var settingLocks = _ref2.settingLocks,
    isInstantMeeting = _ref2.isInstantMeeting;
  return [settingLocks, isInstantMeeting];
}), _dec106 = Reflect.metadata("design:type", Function), _dec107 = Reflect.metadata("design:paramtypes", []), _dec108 = (0, _nextCore.computed)(function (_ref3) {
  var personalMeeting = _ref3.personalMeeting,
    personalVideo = _ref3.personalVideo,
    initialVideoSetting = _ref3.initialVideoSetting,
    transformedPreferences = _ref3.transformedPreferences,
    transformedSettingLocks = _ref3.transformedSettingLocks;
  return [personalMeeting, personalVideo, initialVideoSetting, transformedPreferences, transformedSettingLocks];
}), _dec109 = Reflect.metadata("design:type", Function), _dec110 = Reflect.metadata("design:paramtypes", []), _dec111 = (0, _nextCore.computed)(function (_ref4) {
  var initialVideoSetting = _ref4.initialVideoSetting,
    transformedPreferences = _ref4.transformedPreferences,
    transformedSettingLocks = _ref4.transformedSettingLocks;
  return [initialVideoSetting, transformedPreferences, transformedSettingLocks];
}), _dec112 = Reflect.metadata("design:type", Function), _dec113 = Reflect.metadata("design:paramtypes", []), _dec114 = (0, _nextCore.computed)(function (_ref5) {
  var currentUser = _ref5.currentUser,
    defaultTopic = _ref5.defaultTopic;
  return [currentUser, defaultTopic];
}), _dec115 = Reflect.metadata("design:type", Function), _dec116 = Reflect.metadata("design:paramtypes", []), _dec117 = (0, _nextCore.computed)(function (that) {
  return [that.currentUser, that.extensionName, that._brand.shortName, that._brand.brandConfig.rcvMeetingTopic, that._brand.brandConfig.rcvProductName];
}), _dec118 = Reflect.metadata("design:type", Function), _dec119 = Reflect.metadata("design:paramtypes", []), _dec120 = (0, _nextCore.computed)(function (_ref6) {
  var extensionId = _ref6.extensionId,
    accountId = _ref6.accountId;
  return [extensionId, accountId];
}), _dec121 = Reflect.metadata("design:type", Function), _dec122 = Reflect.metadata("design:paramtypes", []), _dec123 = (0, _nextCore.computed)(function (_ref7) {
  var delegator = _ref7.delegator,
    loginUser = _ref7.loginUser;
  return [delegator, loginUser];
}), _dec124 = Reflect.metadata("design:type", Function), _dec125 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function RcVideo(_toast, _client, _brand, _storage, _accountInfo, _extensionInfo, _videoConfiguration, _locale, _appFeatures, _analytics, _availabilityMonitor, _rcVideoOptions) {
    var _this$_rcVideoOptions, _this$_rcVideoOptions2, _this$_rcVideoOptions3, _this$_rcVideoOptions4, _this$_rcVideoOptions5, _this$_rcVideoOptions6, _this$_rcVideoOptions7, _this$_rcVideoOptions8, _this$_rcVideoOptions9, _this$_rcVideoOptions0, _this$_rcVideoOptions1, _this$_rcVideoOptions10, _this$_rcVideoOptions11, _this$_rcVideoOptions12, _this$_rcVideoOptions13, _this$_rcVideoOptions14, _this$_rcVideoOptions15, _this$_rcVideoOptions16, _this$_rcVideoOptions17, _this$_rcVideoOptions18, _this$_rcVideoOptions19, _this$_rcVideoOptions20, _this$_rcVideoOptions21, _this$_rcVideoOptions22, _this$_locale$current, _this$_locale;
    var _this;
    _classCallCheck(this, RcVideo);
    _this = _callSuper(this, RcVideo);
    _this._toast = _toast;
    _this._client = _client;
    _this._brand = _brand;
    _this._storage = _storage;
    _this._accountInfo = _accountInfo;
    _this._extensionInfo = _extensionInfo;
    _this._videoConfiguration = _videoConfiguration;
    _this._locale = _locale;
    _this._appFeatures = _appFeatures;
    _this._analytics = _analytics;
    _this._availabilityMonitor = _availabilityMonitor;
    _this._rcVideoOptions = _rcVideoOptions;
    _this._showSaveAsDefault = void 0;
    _this._isInstantMeeting = void 0;
    _this._enableE2EE = void 0;
    _this._enableInvitationBridgesApi = void 0;
    _this._enableWaitingRoom = void 0;
    _this._enablePersonalMeeting = void 0;
    _this._enableScheduleOnBehalf = void 0;
    _this._enableHostCountryDialinNumbers = void 0;
    _this._enableReloadAfterSchedule = void 0;
    _this._enableInvitationApi = void 0;
    _this._enableInvitationApiFailedToast = void 0;
    _this._enableV2Api = void 0;
    _this._currentLocale = void 0;
    _this._createMeetingPromise = null;
    _initializerDefineProperty(_this, "personalVideo", _descriptor, _this);
    // when migrate to rcv v2, computed defaultVideoSetting has conflict with storage key 'defaultVideoSetting'
    // rcv save as default toggle has not opened yet, so change the key into 'savedDefaultSetting'
    _initializerDefineProperty(_this, "savedDefaultSetting", _descriptor2, _this);
    _initializerDefineProperty(_this, "meeting", _descriptor3, _this);
    _initializerDefineProperty(_this, "videoStatus", _descriptor4, _this);
    _initializerDefineProperty(_this, "preferences", _descriptor5, _this);
    _initializerDefineProperty(_this, "isPreferencesChanged", _descriptor6, _this);
    _initializerDefineProperty(_this, "settingLocks", _descriptor7, _this);
    _initializerDefineProperty(_this, "delegator", _descriptor8, _this);
    _initializerDefineProperty(_this, "delegators", _descriptor9, _this);
    _initializerDefineProperty(_this, "hasSettingsChanged", _descriptor0, _this);
    _this._storage.enable(_this);
    _this._enableInvitationApi = (_this$_rcVideoOptions = (_this$_rcVideoOptions2 = _this._rcVideoOptions) === null || _this$_rcVideoOptions2 === void 0 ? void 0 : _this$_rcVideoOptions2.enableInvitationApi) !== null && _this$_rcVideoOptions !== void 0 ? _this$_rcVideoOptions : false;
    _this._enableInvitationApiFailedToast = (_this$_rcVideoOptions3 = (_this$_rcVideoOptions4 = _this._rcVideoOptions) === null || _this$_rcVideoOptions4 === void 0 ? void 0 : _this$_rcVideoOptions4.enableInvitationApiFailedToast) !== null && _this$_rcVideoOptions3 !== void 0 ? _this$_rcVideoOptions3 : false;
    _this._enableInvitationBridgesApi = (_this$_rcVideoOptions5 = (_this$_rcVideoOptions6 = _this._rcVideoOptions) === null || _this$_rcVideoOptions6 === void 0 ? void 0 : _this$_rcVideoOptions6.enableInvitationBridgesApi) !== null && _this$_rcVideoOptions5 !== void 0 ? _this$_rcVideoOptions5 : false;
    _this._showSaveAsDefault = (_this$_rcVideoOptions7 = (_this$_rcVideoOptions8 = _this._rcVideoOptions) === null || _this$_rcVideoOptions8 === void 0 ? void 0 : _this$_rcVideoOptions8.showSaveAsDefault) !== null && _this$_rcVideoOptions7 !== void 0 ? _this$_rcVideoOptions7 : false;
    _this._isInstantMeeting = (_this$_rcVideoOptions9 = (_this$_rcVideoOptions0 = _this._rcVideoOptions) === null || _this$_rcVideoOptions0 === void 0 ? void 0 : _this$_rcVideoOptions0.isInstantMeeting) !== null && _this$_rcVideoOptions9 !== void 0 ? _this$_rcVideoOptions9 : false;
    _this._enableE2EE = (_this$_rcVideoOptions1 = (_this$_rcVideoOptions10 = _this._rcVideoOptions) === null || _this$_rcVideoOptions10 === void 0 ? void 0 : _this$_rcVideoOptions10.enableE2EE) !== null && _this$_rcVideoOptions1 !== void 0 ? _this$_rcVideoOptions1 : false;
    _this._enableWaitingRoom = (_this$_rcVideoOptions11 = (_this$_rcVideoOptions12 = _this._rcVideoOptions) === null || _this$_rcVideoOptions12 === void 0 ? void 0 : _this$_rcVideoOptions12.enableWaitingRoom) !== null && _this$_rcVideoOptions11 !== void 0 ? _this$_rcVideoOptions11 : false;
    _this._enablePersonalMeeting = (_this$_rcVideoOptions13 = (_this$_rcVideoOptions14 = _this._rcVideoOptions) === null || _this$_rcVideoOptions14 === void 0 ? void 0 : _this$_rcVideoOptions14.enablePersonalMeeting) !== null && _this$_rcVideoOptions13 !== void 0 ? _this$_rcVideoOptions13 : false;
    _this._enableScheduleOnBehalf = (_this$_rcVideoOptions15 = (_this$_rcVideoOptions16 = _this._rcVideoOptions) === null || _this$_rcVideoOptions16 === void 0 ? void 0 : _this$_rcVideoOptions16.enableScheduleOnBehalf) !== null && _this$_rcVideoOptions15 !== void 0 ? _this$_rcVideoOptions15 : false;
    _this._enableHostCountryDialinNumbers = (_this$_rcVideoOptions17 = (_this$_rcVideoOptions18 = _this._rcVideoOptions) === null || _this$_rcVideoOptions18 === void 0 ? void 0 : _this$_rcVideoOptions18.enableHostCountryDialinNumbers) !== null && _this$_rcVideoOptions17 !== void 0 ? _this$_rcVideoOptions17 : false;
    _this._enableReloadAfterSchedule = (_this$_rcVideoOptions19 = (_this$_rcVideoOptions20 = _this._rcVideoOptions) === null || _this$_rcVideoOptions20 === void 0 ? void 0 : _this$_rcVideoOptions20.enableReloadAfterSchedule) !== null && _this$_rcVideoOptions19 !== void 0 ? _this$_rcVideoOptions19 : true;
    _this._enableV2Api = (_this$_rcVideoOptions21 = (_this$_rcVideoOptions22 = _this._rcVideoOptions) === null || _this$_rcVideoOptions22 === void 0 ? void 0 : _this$_rcVideoOptions22.enableV2Api) !== null && _this$_rcVideoOptions21 !== void 0 ? _this$_rcVideoOptions21 : false;
    _this._currentLocale = (_this$_locale$current = (_this$_locale = _this._locale) === null || _this$_locale === void 0 ? void 0 : _this$_locale.currentLocale) !== null && _this$_locale$current !== void 0 ? _this$_locale$current : _i18n.DEFAULT_LOCALE;
    return _this;
  }
  _inherits(RcVideo, _RcModule);
  return _createClass(RcVideo, [{
    key: "_savePersonalMeeting",
    value: function _savePersonalMeeting(settings) {
      this.personalVideo = _objectSpread(_objectSpread({}, this.personalVideo), settings);
    }
  }, {
    key: "_resetPersonalMeeting",
    value: function _resetPersonalMeeting() {
      this.personalVideo = {};
    }
  }, {
    key: "_saveDefaultVideoSetting",
    value: function _saveDefaultVideoSetting(settings) {
      this.savedDefaultSetting = _objectSpread(_objectSpread({}, this.savedDefaultSetting), settings);
    }
  }, {
    key: "_updateMeetingSettings",
    value: function _updateMeetingSettings(info) {
      var patch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.meeting = patch ? _objectSpread(_objectSpread({}, this.meeting), info) : info;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _superPropGet(RcVideo, "_shouldInit", this, 3)([]) && this._videoConfiguration.isRCV;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _superPropGet(RcVideo, "_shouldReset", this, 3)([]) || this.ready && !this._videoConfiguration.isRCV;
    }
  }, {
    key: "_updateVideoStatus",
    value: function _updateVideoStatus(status) {
      this.videoStatus = status;
    }
  }, {
    key: "_updateMeetingPreferences",
    value: function _updateMeetingPreferences(preferences) {
      this.preferences = preferences;
    }
  }, {
    key: "_updateIsPreferencesChanged",
    value: function _updateIsPreferencesChanged(isPreferencesChanged) {
      this.isPreferencesChanged = isPreferencesChanged;
    }
  }, {
    key: "_updateMeetingSettingLocks",
    value: function _updateMeetingSettingLocks(settingLocks) {
      this.settingLocks = settingLocks;
    }
  }, {
    key: "_updateDelegator",
    value: function _updateDelegator(delegator) {
      this.delegator = delegator;
    }
  }, {
    key: "_updateDelegatorList",
    value: function _updateDelegatorList(delegatorList) {
      this.delegators = delegatorList;
    }
  }, {
    key: "_updateHasSettingsChanged",
    value: function _updateHasSettingsChanged(isChanged) {
      this.hasSettingsChanged = isChanged;
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this._init();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "savePersonalMeeting",
    value: function () {
      var _savePersonalMeeting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(settings) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this._savePersonalMeeting(settings);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function savePersonalMeeting(_x) {
        return _savePersonalMeeting2.apply(this, arguments);
      }
      return savePersonalMeeting;
    }()
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this.updateDelegator(this.loginUser);
              _context3.n = 1;
              return Promise.all([this._initMeeting(), this.initScheduleFor()]);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
    /**
     * Init basic meeting information
     * also load meeting setting from previous one.
     */
  }, {
    key: "init",
    value: (function () {
      var _init3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._init();
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function init() {
        return _init3.apply(this, arguments);
      }
      return init;
    }())
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this._init();
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function reload() {
        return _reload.apply(this, arguments);
      }
      return reload;
    }()
  }, {
    key: "switchUsePersonalMeetingId",
    value: function () {
      var _switchUsePersonalMeetingId = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(usePersonalMeetingId) {
        var _this$meeting;
        var currentName;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              currentName = (_this$meeting = this.meeting) === null || _this$meeting === void 0 ? void 0 : _this$meeting.name;
              this._initMeetingSettings(usePersonalMeetingId);
              if (currentName !== undefined && currentName !== null) {
                this.updateMeetingSettings({
                  name: currentName
                });
              }
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function switchUsePersonalMeetingId(_x2) {
        return _switchUsePersonalMeetingId.apply(this, arguments);
      }
      return switchUsePersonalMeetingId;
    }()
  }, {
    key: "updateDelegator",
    value: function () {
      var _updateDelegator2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(delegator) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (this._enableScheduleOnBehalf) {
                this._updateDelegator(delegator);
              }
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function updateDelegator(_x3) {
        return _updateDelegator2.apply(this, arguments);
      }
      return updateDelegator;
    }()
  }, {
    key: "updateScheduleFor",
    value: function () {
      var _updateScheduleFor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var userExtensionId,
          hostId,
          delegator,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              userExtensionId = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : "".concat(this.extensionId);
              if (!(!this.delegators || this.delegators.length === 0)) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              hostId = "".concat(userExtensionId);
              delegator = (0, _ramda.find)(function (user) {
                return user.extensionId === hostId;
              }, this.delegators);
              if (delegator) {
                _context8.n = 2;
                break;
              }
              return _context8.a(2);
            case 2:
              this.updateDelegator(delegator);
              _context8.n = 3;
              return this._initMeeting(Number(delegator.extensionId));
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function updateScheduleFor() {
        return _updateScheduleFor.apply(this, arguments);
      }
      return updateScheduleFor;
    }()
  }, {
    key: "initScheduleFor",
    value: function () {
      var _initScheduleFor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (!this._enableScheduleOnBehalf) {
                _context9.n = 1;
                break;
              }
              _context9.n = 1;
              return this._initDelegators();
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function initScheduleFor() {
        return _initScheduleFor.apply(this, arguments);
      }
      return initScheduleFor;
    }()
  }, {
    key: "_initMeeting",
    value: function () {
      var _initMeeting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var extensionId,
          _args0 = arguments;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              extensionId = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : this.extensionId;
              this._updateVideoStatus(_videoStatus.videoStatus.initializing);
              _context0.n = 1;
              return Promise.all([this._initPersonalMeeting(this.accountId, extensionId), this.initPreferences()]);
            case 1:
              this._initMeetingSettings(false);
              this._updateVideoStatus(_videoStatus.videoStatus.initialized);
            case 2:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function _initMeeting() {
        return _initMeeting2.apply(this, arguments);
      }
      return _initMeeting;
    }()
  }, {
    key: "initPreferences",
    value: function () {
      var _initPreferences = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _yield$this$_getPrefe, preferences, settingLocks, _t;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return this._getPreferences(this.accountId, this.extensionId);
            case 1:
              _yield$this$_getPrefe = _context1.v;
              preferences = _yield$this$_getPrefe.preferences;
              settingLocks = _yield$this$_getPrefe.settingLocks;
              // TODO: Remove the next line after rcv implement ui to manage password_instant
              preferences.password_instant = false;
              this._updatePreference(preferences);
              this._updateMeetingSettingLocks(settingLocks);
              _context1.n = 3;
              break;
            case 2:
              _context1.p = 2;
              _t = _context1.v;
              this.logger.log('preference error:', _t);
              // this._errorHandle(errors);
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 2]]);
      }));
      function initPreferences() {
        return _initPreferences.apply(this, arguments);
      }
      return initPreferences;
    }()
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var accountId,
          extensionId,
          meetingResult,
          meeting,
          _meetingResult,
          _meeting,
          _args10 = arguments,
          _t2;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              accountId = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : this.accountId;
              extensionId = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : this.extensionId;
              if (this._enablePersonalMeeting) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
            case 1:
              _context10.p = 1;
              if (!this._enableV2Api) {
                _context10.n = 4;
                break;
              }
              _context10.n = 2;
              return this._client.service.platform().get("/rcvideo/v2/account/".concat(accountId, "/extension/").concat(extensionId, "/bridges/default"));
            case 2:
              meetingResult = _context10.v;
              _context10.n = 3;
              return meetingResult.json();
            case 3:
              meeting = _context10.v;
              this._savePersonalMeeting((0, _videoHelper.transformV2ResponseToV1)(meeting));
              _context10.n = 7;
              break;
            case 4:
              _context10.n = 5;
              return this._client.service.platform().get('/rcvideo/v1/bridges', {
                "default": true,
                accountId: accountId,
                extensionId: extensionId
              });
            case 5:
              _meetingResult = _context10.v;
              _context10.n = 6;
              return _meetingResult.json();
            case 6:
              _meeting = _context10.v;
              this._savePersonalMeeting(_meeting);
            case 7:
              _context10.n = 9;
              break;
            case 8:
              _context10.p = 8;
              _t2 = _context10.v;
              this.logger.error('fetch personal meeting error:', _t2);
              if (this.personalVideo && Object.keys(this.personalVideo).length > 0) {
                this._resetPersonalMeeting();
              }
            case 9:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 8]]);
      }));
      function _initPersonalMeeting() {
        return _initPersonalMeeting2.apply(this, arguments);
      }
      return _initPersonalMeeting;
    }()
  }, {
    key: "_initDelegators",
    value: function () {
      var _initDelegators2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var result, delegators, processedDelegators, _t3;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
              return this._client.service.platform().get('/rcvideo/v1/accounts/~/extensions/~/delegators');
            case 1:
              result = _context11.v;
              _context11.n = 2;
              return result.json();
            case 2:
              delegators = _context11.v;
              // to make sure it will equal to v1
              processedDelegators = delegators;
              if (processedDelegators.length) {
                processedDelegators.unshift(this.loginUser);
              }
              this._updateDelegatorList(processedDelegators);
              _context11.n = 4;
              break;
            case 3:
              _context11.p = 3;
              _t3 = _context11.v;
              this._errorHandle(_t3);
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 3]]);
      }));
      function _initDelegators() {
        return _initDelegators2.apply(this, arguments);
      }
      return _initDelegators;
    }()
  }, {
    key: "saveAsDefaultSetting",
    value: function saveAsDefaultSetting(meeting) {
      var allowJoinBeforeHost = meeting.allowJoinBeforeHost,
        isOnlyAuthUserJoin = meeting.isOnlyAuthUserJoin,
        isOnlyCoworkersJoin = meeting.isOnlyCoworkersJoin,
        allowScreenSharing = meeting.allowScreenSharing,
        muteAudio = meeting.muteAudio,
        muteVideo = meeting.muteVideo,
        e2ee = meeting.e2ee,
        isMeetingSecret = meeting.isMeetingSecret,
        notShowAgain = meeting.notShowAgain,
        waitingRoomMode = meeting.waitingRoomMode;
      var updateInfo = {
        allowJoinBeforeHost: allowJoinBeforeHost,
        isOnlyAuthUserJoin: isOnlyAuthUserJoin,
        isOnlyCoworkersJoin: isOnlyCoworkersJoin,
        allowScreenSharing: allowScreenSharing,
        muteAudio: muteAudio,
        muteVideo: muteVideo,
        isMeetingSecret: isMeetingSecret,
        waitingRoomMode: waitingRoomMode,
        e2ee: e2ee
      };
      if (notShowAgain) {
        updateInfo._saved = notShowAgain;
      }
      this._saveDefaultVideoSetting(updateInfo);
    }
  }, {
    key: "validatePasswordSettings",
    value: function validatePasswordSettings(password, isSecret) {
      return (0, _videoHelper.validatePasswordSettings)(password, isSecret);
    }
  }, {
    key: "pruneMeetingObject",
    value: function pruneMeetingObject(meeting) {
      return (0, _videoHelper.pruneMeetingObject)(meeting, [{
        condition: meeting.isMeetingSecret,
        key: 'meetingPassword'
      }, {
        condition: this.enableWaitingRoom || !!meeting.e2ee,
        key: _constants.RCV_WAITING_ROOM_API_KEYS
      }, {
        condition: this.enableE2EE && !meeting.usePersonalMeetingId,
        key: _constants.RCV_E2EE_API_KEYS
      }]);
    }
  }, {
    key: "createMeetingDirectly",
    value: function () {
      var _createMeetingDirectly = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(meeting) {
        var _ref8,
          _ref8$isAlertSuccess,
          isAlertSuccess,
          meetingDetail,
          _yield$Promise$all,
          _yield$Promise$all2,
          newMeeting,
          dialInNumber,
          extensionInfo,
          invitationInfo,
          meetingResponse,
          _args12 = arguments,
          _t4;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _ref8 = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {}, _ref8$isAlertSuccess = _ref8.isAlertSuccess, isAlertSuccess = _ref8$isAlertSuccess === void 0 ? true : _ref8$isAlertSuccess;
              _context12.p = 1;
              this._updateVideoStatus(_videoStatus.videoStatus.creating);
              if (this._showSaveAsDefault && meeting.saveAsDefault) {
                this.saveAsDefaultSetting(meeting);
              }
              meetingDetail = this.pruneMeetingObject(meeting); // when meeting is rcv pmi, use pmi default name
              if (meeting === null || meeting === void 0 ? void 0 : meeting.usePersonalMeetingId) {
                meetingDetail.name = (0, _i18n2.t)('rcvPmiMeetingTitle', {
                  extensionName: this.extensionName
                });
              }
              _context12.n = 2;
              return Promise.all([this._postBridges(meetingDetail, meeting.usePersonalMeetingId), this._getDialinNumbers(), this.getExtensionInfo(this.currentUser.extensionId)]);
            case 2:
              _yield$Promise$all = _context12.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
              newMeeting = _yield$Promise$all2[0];
              dialInNumber = _yield$Promise$all2[1];
              extensionInfo = _yield$Promise$all2[2];
              this.updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
                saveAsDefault: false
              }));

              // After Create
              _context12.n = 3;
              return this.getMeetingInvitation({
                hostName: extensionInfo.name,
                shortId: newMeeting.shortId,
                id: newMeeting.id,
                personalMeetingName: newMeeting.personalMeetingName,
                e2ee: newMeeting.e2ee,
                isMeetingSecret: newMeeting.isMeetingSecret,
                meetingPassword: newMeeting.meetingPassword,
                meetingPasswordPSTN: newMeeting.meetingPasswordPSTN,
                meetingPasswordMasked: newMeeting.meetingPasswordMasked,
                joinUri: newMeeting.joinUri || '',
                dialInNumbers: dialInNumber,
                currentLocale: this.currentLocale,
                brandName: this._brand.name,
                brandId: this._brand.id,
                isSIPAvailable: this._appFeatures.hasRoomConnectorBeta
              });
            case 3:
              invitationInfo = _context12.v;
              if (!meeting.saveAsDefault) {
                _context12.n = 4;
                break;
              }
              _context12.n = 4;
              return this.savePreferencesChanges(meeting);
            case 4:
              if (!this._enableReloadAfterSchedule) {
                _context12.n = 5;
                break;
              }
              _context12.n = 5;
              return this._initMeeting(Number(this.currentUser.extensionId));
            case 5:
              if (isAlertSuccess) {
                this._toast.success({
                  message: (0, _i18n2.t)('scheduledSuccess')
                });
              }
              this._updateVideoStatus(_videoStatus.videoStatus.created);
              this._updateHasSettingsChanged(false);
              meetingResponse = {
                invitationInfo: invitationInfo,
                extensionInfo: extensionInfo,
                dialInNumber: dialInNumber,
                meeting: _objectSpread(_objectSpread({}, meeting), newMeeting)
              };
              return _context12.a(2, _objectSpread(_objectSpread({}, meetingResponse), meeting));
            case 6:
              _context12.p = 6;
              _t4 = _context12.v;
              this.logger.error('failed to create rcv:', _t4);
              this._updateVideoStatus(_videoStatus.videoStatus.idle);
              this._errorHandle(_t4);
              return _context12.a(2, null);
          }
        }, _callee12, this, [[1, 6]]);
      }));
      function createMeetingDirectly(_x4) {
        return _createMeetingDirectly.apply(this, arguments);
      }
      return createMeetingDirectly;
    }()
  }, {
    key: "createMeeting",
    value: function () {
      var _createMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(meeting) {
        var _ref9,
          _ref9$isAlertSuccess,
          isAlertSuccess,
          result,
          _args13 = arguments;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              _ref9 = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {}, _ref9$isAlertSuccess = _ref9.isAlertSuccess, isAlertSuccess = _ref9$isAlertSuccess === void 0 ? true : _ref9$isAlertSuccess;
              if (!this.isScheduling) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2, this._createMeetingPromise);
            case 1:
              this._createMeetingPromise = this.createMeetingDirectly(meeting, {
                isAlertSuccess: isAlertSuccess
              });
              _context13.n = 2;
              return this._createMeetingPromise;
            case 2:
              result = _context13.v;
              this._createMeetingPromise = null;
              return _context13.a(2, result);
          }
        }, _callee13, this);
      }));
      function createMeeting(_x5) {
        return _createMeeting.apply(this, arguments);
      }
      return createMeeting;
    }()
  }, {
    key: "startMeeting",
    value: function () {
      var _startMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(meeting) {
        var isAlertSuccess,
          _args14 = arguments;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              isAlertSuccess = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : true;
              return _context14.a(2, this.createMeeting(_objectSpread(_objectSpread({}, meeting), {}, {
                expiresIn: null,
                type: _videoHelper.RcVideoTypes.meeting
              }), {
                isAlertSuccess: isAlertSuccess
              }));
          }
        }, _callee14, this);
      }));
      function startMeeting(_x6) {
        return _startMeeting.apply(this, arguments);
      }
      return startMeeting;
    }()
  }, {
    key: "getRcvInvitationRequestData",
    value: function () {
      var _getRcvInvitationRequestData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(invitationRequest) {
        var bridgeId, _invitationRequest$me, meetingPasswordMasked, response, invitationParams, _t5;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              bridgeId = invitationRequest.id, _invitationRequest$me = invitationRequest.meetingPasswordMasked, meetingPasswordMasked = _invitationRequest$me === void 0 ? '' : _invitationRequest$me;
              _context15.p = 1;
              _context15.n = 2;
              return this._client.service.platform().get("/rcvideo/v1/invitation/bridges/".concat(bridgeId, "?countryCode=").concat(this.country.isoCode).concat(meetingPasswordMasked ? "&password=".concat(meetingPasswordMasked) : ''));
            case 2:
              response = _context15.v;
              _context15.n = 3;
              return response.json();
            case 3:
              invitationParams = _context15.v;
              return _context15.a(2, (0, _videoHelper.formatRcvInvitationRequestDataV2)(_objectSpread(_objectSpread({}, invitationRequest), {}, {
                phoneNumbers: invitationParams.phoneNumbers
              })));
            case 4:
              _context15.p = 4;
              _t5 = _context15.v;
              this.logger.warn('failed to get invitation params', _t5);
              return _context15.a(2, (0, _videoHelper.formatRcvInvitationRequestData)(invitationRequest));
          }
        }, _callee15, this, [[1, 4]]);
      }));
      function getRcvInvitationRequestData(_x7) {
        return _getRcvInvitationRequestData.apply(this, arguments);
      }
      return getRcvInvitationRequestData;
    }()
  }, {
    key: "getMeetingInvitation",
    value: function () {
      var _getMeetingInvitation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(invitationRequest) {
        var data, response, blobData, invitation, _t6, _t7;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              if (this._enableInvitationApi) {
                _context16.n = 1;
                break;
              }
              return _context16.a(2, null);
            case 1:
              _context16.p = 1;
              if (!this._enableInvitationBridgesApi) {
                _context16.n = 3;
                break;
              }
              _context16.n = 2;
              return this.getRcvInvitationRequestData(invitationRequest);
            case 2:
              _t6 = _context16.v;
              _context16.n = 4;
              break;
            case 3:
              _t6 = (0, _videoHelper.formatRcvInvitationRequestData)(invitationRequest);
            case 4:
              data = _t6;
              _context16.n = 5;
              return this._client.service.platform().post('/restapi/v1.0/uns/render-document', data);
            case 5:
              response = _context16.v;
              _context16.n = 6;
              return response.text();
            case 6:
              blobData = _context16.v;
              invitation = blobData.replace(_constants.INVITATION_BOUNDARY_REGEX, '');
              return _context16.a(2, (0, _renameTurkey.renameTurkey)(invitation));
            case 7:
              _context16.p = 7;
              _t7 = _context16.v;
              this.logger.warn('failed to get invitation', _t7);
              if (this._enableInvitationApiFailedToast) {
                this._toast.danger({
                  message: (0, _i18n2.t)('renderInviteError')
                });
              }
              return _context16.a(2, null);
          }
        }, _callee16, this, [[1, 7]]);
      }));
      function getMeetingInvitation(_x8) {
        return _getMeetingInvitation.apply(this, arguments);
      }
      return getMeetingInvitation;
    }()
  }, {
    key: "_postBridges",
    value: function () {
      var _postBridges2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(meetingDetail, usePersonalMeetingId) {
        var postData, result, resp, _result;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              if (!this._enableV2Api) {
                _context17.n = 3;
                break;
              }
              postData = (0, _videoHelper.transformV1MeetingToV2)(meetingDetail, usePersonalMeetingId, {
                enableWaitingRoom: this.enableWaitingRoom,
                enableE2EE: this.enableE2EE
              });
              _context17.n = 1;
              return this._client.service.platform().post("/rcvideo/v2/account/".concat(meetingDetail.accountId, "/extension/").concat(meetingDetail.extensionId, "/bridges"), postData);
            case 1:
              result = _context17.v;
              _context17.n = 2;
              return result.json();
            case 2:
              resp = _context17.v;
              return _context17.a(2, (0, _videoHelper.transformV2ResponseToV1)(resp));
            case 3:
              _context17.n = 4;
              return this._client.service.platform().post('/rcvideo/v1/bridges', meetingDetail);
            case 4:
              _result = _context17.v;
              return _context17.a(2, _result.json());
            case 5:
              return _context17.a(2);
          }
        }, _callee17, this);
      }));
      function _postBridges(_x9, _x0) {
        return _postBridges2.apply(this, arguments);
      }
      return _postBridges;
    }()
  }, {
    key: "patchBridges",
    value: function () {
      var _patchBridges = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(meetingId, meetingDetail, usePersonalMeetingId) {
        var body, result, resp, _result2;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              if (!this._enableV2Api) {
                _context18.n = 3;
                break;
              }
              body = (0, _videoHelper.transformV1MeetingToV2)(meetingDetail, usePersonalMeetingId, {
                enableWaitingRoom: this.enableWaitingRoom,
                enableE2EE: this.enableE2EE
              });
              _context18.n = 1;
              return this._client.service.platform().send({
                method: 'PATCH',
                url: "/rcvideo/v2/bridges/".concat(meetingId),
                body: body
              });
            case 1:
              result = _context18.v;
              _context18.n = 2;
              return result.json();
            case 2:
              resp = _context18.v;
              return _context18.a(2, (0, _videoHelper.transformV2ResponseToV1)(resp));
            case 3:
              _context18.n = 4;
              return this._client.service.platform().send({
                method: 'PATCH',
                url: "/rcvideo/v1/bridges/".concat(meetingId),
                body: meetingDetail
              });
            case 4:
              _result2 = _context18.v;
              return _context18.a(2, _result2.json());
            case 5:
              return _context18.a(2);
          }
        }, _callee18, this);
      }));
      function patchBridges(_x1, _x10, _x11) {
        return _patchBridges.apply(this, arguments);
      }
      return patchBridges;
    }()
  }, {
    key: "_getDialinNumbers",
    value: function () {
      var _getDialinNumbers2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
        var _this2 = this;
        var result, data, phoneNumbers, defaultPhoneNumber, countryDialinNumbers;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              _context19.n = 1;
              return this._client.service.platform().get('/rcvideo/v1/dial-in-numbers');
            case 1:
              result = _context19.v;
              _context19.n = 2;
              return result.json();
            case 2:
              data = _context19.v;
              phoneNumbers = data === null || data === void 0 ? void 0 : data.phoneNumbers;
              if (!Array.isArray(phoneNumbers)) {
                _context19.n = 5;
                break;
              }
              phoneNumbers.forEach(function (item) {
                (0, _renameTurkey.renameTurkeyCountry)(item.country);
              });
              defaultPhoneNumber = (0, _ramda.find)(function (obj) {
                return obj["default"];
              }, phoneNumbers);
              if (!this._enableHostCountryDialinNumbers) {
                _context19.n = 4;
                break;
              }
              countryDialinNumbers = (0, _ramda.filter)(function (obj) {
                var _obj$country;
                return (obj === null || obj === void 0 ? void 0 : (_obj$country = obj.country) === null || _obj$country === void 0 ? void 0 : _obj$country.isoCode) === _this2.country.isoCode;
              }, phoneNumbers);
              if (!(countryDialinNumbers.length > 0)) {
                _context19.n = 3;
                break;
              }
              return _context19.a(2, countryDialinNumbers);
            case 3:
              return _context19.a(2, [defaultPhoneNumber]);
            case 4:
              return _context19.a(2, defaultPhoneNumber.phoneNumber);
            case 5:
              return _context19.a(2, []);
          }
        }, _callee19, this);
      }));
      function _getDialinNumbers() {
        return _getDialinNumbers2.apply(this, arguments);
      }
      return _getDialinNumbers;
    }() // TODO: should fix that route if still need
  }, {
    key: "_getPreferences",
    value: function () {
      var _getPreferences2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
        var accountId,
          extensionId,
          res,
          list,
          preferences,
          settingLocks,
          _args20 = arguments;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              accountId = _args20.length > 0 && _args20[0] !== undefined ? _args20[0] : this.accountId;
              extensionId = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : this.extensionId;
              _context20.n = 1;
              return this._client.service.platform().get("/rcvideo/v1/account/".concat(accountId, "/extension/").concat(extensionId, "/preferences"), {
                id: _videoHelper.RCV_PREFERENCES_IDS
              });
            case 1:
              res = _context20.v;
              _context20.n = 2;
              return res.json();
            case 2:
              list = _context20.v;
              preferences = {};
              settingLocks = {};
              list.forEach(function (_ref0) {
                var id = _ref0.id,
                  value = _ref0.value,
                  readOnly = _ref0.readOnly;
                (0, _videoHelper.assignObject)(preferences, value, id);
                (0, _videoHelper.assignObject)(settingLocks, readOnly, id);
              });
              return _context20.a(2, {
                preferences: preferences,
                settingLocks: settingLocks
              });
          }
        }, _callee20, this);
      }));
      function _getPreferences() {
        return _getPreferences2.apply(this, arguments);
      }
      return _getPreferences;
    }()
  }, {
    key: "getExtensionInfo",
    value: function () {
      var _getExtensionInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(extensionId) {
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              if (!(Number(extensionId) === this.extensionId)) {
                _context21.n = 1;
                break;
              }
              return _context21.a(2, this._extensionInfo.info);
            case 1:
              return _context21.a(2, this._client.account().extension(extensionId).get());
          }
        }, _callee21, this);
      }));
      function getExtensionInfo(_x12) {
        return _getExtensionInfo.apply(this, arguments);
      }
      return getExtensionInfo;
    }()
  }, {
    key: "_updatePreference",
    value: function _updatePreference(preferences) {
      this._updateMeetingPreferences(preferences);
    }
  }, {
    key: "_saveSinglePreference",
    value: function () {
      var _saveSinglePreference2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(preferenceId, value) {
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              return _context22.a(2, this._client.service.platform().send({
                method: 'PATCH',
                url: "/rcvideo/v1/account/~/extension/~/preferences/".concat(preferenceId),
                body: {
                  value: value
                }
              }));
          }
        }, _callee22, this);
      }));
      function _saveSinglePreference(_x13, _x14) {
        return _saveSinglePreference2.apply(this, arguments);
      }
      return _saveSinglePreference;
    }()
    /**
     * Save preference changes to server and optionally update local state
     * @param meeting meeting object containing preference fields
     * @param isOverwrite if true, update local preferences after successful save
     * @returns Promise<boolean> true if successful, false if failed
     */
  }, {
    key: "savePreferencesChanges",
    value: (function () {
      var _savePreferencesChanges = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(meeting) {
        var isOverwrite,
          preferencesPayload,
          dirtyPreferences,
          savedPreferences,
          _args23 = arguments,
          _t8;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              isOverwrite = _args23.length > 1 && _args23[1] !== undefined ? _args23[1] : false;
              _context23.p = 1;
              preferencesPayload = (0, _videoHelper.reversePreferences)(meeting, this._isInstantMeeting);
              dirtyPreferences = (0, _videoHelper.getDirtyPreferences)(preferencesPayload, this.preferences, this.settingLocks);
              _context23.n = 2;
              return this._savePreferencesToServer(dirtyPreferences);
            case 2:
              if (isOverwrite) {
                savedPreferences = (0, _videoHelper.updateLocalPreferences)(dirtyPreferences, this.preferences);
                this._updatePreference(savedPreferences);
              }
              return _context23.a(2, true);
            case 3:
              _context23.p = 3;
              _t8 = _context23.v;
              this.logger.error(_t8);
              return _context23.a(2, false);
          }
        }, _callee23, this, [[1, 3]]);
      }));
      function savePreferencesChanges(_x15) {
        return _savePreferencesChanges.apply(this, arguments);
      }
      return savePreferencesChanges;
    }())
  }, {
    key: "_savePreferencesToServer",
    value: function () {
      var _savePreferencesToServer2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(dirtyPreferences) {
        var _this3 = this;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              _context24.n = 1;
              return Promise.all(dirtyPreferences.map(function (_ref1) {
                var _ref10 = _slicedToArray(_ref1, 2),
                  preferenceId = _ref10[0],
                  newValue = _ref10[1];
                return _this3._saveSinglePreference(preferenceId, newValue);
              }));
            case 1:
              return _context24.a(2);
          }
        }, _callee24);
      }));
      function _savePreferencesToServer(_x16) {
        return _savePreferencesToServer2.apply(this, arguments);
      }
      return _savePreferencesToServer;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(shortId) {
        var accountId,
          extensionId,
          result,
          meeting,
          _result3,
          _meeting2,
          _args25 = arguments;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              accountId = _args25.length > 1 && _args25[1] !== undefined ? _args25[1] : this.accountId;
              extensionId = _args25.length > 2 && _args25[2] !== undefined ? _args25[2] : this.extensionId;
              if (!this._enableV2Api) {
                _context25.n = 3;
                break;
              }
              _context25.n = 1;
              return this._client.service.platform().get("/rcvideo/v2/bridges/pin/web/".concat(shortId));
            case 1:
              result = _context25.v;
              _context25.n = 2;
              return result.json();
            case 2:
              meeting = _context25.v;
              return _context25.a(2, (0, _videoHelper.transformV2ResponseToV1)(meeting));
            case 3:
              _context25.n = 4;
              return this._client.service.platform().get('/rcvideo/v1/bridges', {
                shortId: shortId,
                accountId: accountId,
                extensionId: extensionId
              });
            case 4:
              _result3 = _context25.v;
              _context25.n = 5;
              return _result3.json();
            case 5:
              _meeting2 = _context25.v;
              return _context25.a(2, _meeting2);
            case 6:
              return _context25.a(2);
          }
        }, _callee25, this);
      }));
      function getMeeting(_x17) {
        return _getMeeting.apply(this, arguments);
      }
      return getMeeting;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(meetingId, meeting) {
        var _this4 = this;
        var _ref11,
          _ref11$isAlertSuccess,
          isAlertSuccess,
          meetingDetail,
          _yield$Promise$all3,
          _yield$Promise$all4,
          newMeeting,
          dialInNumber,
          extensionInfo,
          invitationInfo,
          meetingResponse,
          _args26 = arguments,
          _t9;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              _ref11 = _args26.length > 2 && _args26[2] !== undefined ? _args26[2] : {}, _ref11$isAlertSuccess = _ref11.isAlertSuccess, isAlertSuccess = _ref11$isAlertSuccess === void 0 ? false : _ref11$isAlertSuccess;
              _context26.p = 1;
              this._updateVideoStatus(_videoStatus.videoStatus.updating);
              if (this._showSaveAsDefault && meeting.saveAsDefault) {
                this.saveAsDefaultSetting(meeting);
              }
              meetingDetail = this.pruneMeetingObject(meeting);
              _context26.n = 2;
              return Promise.all([this.patchBridges(meeting.id, meetingDetail, meeting.usePersonalMeetingId), this._getDialinNumbers(), this.getExtensionInfo(this.currentUser.extensionId)]);
            case 2:
              _yield$Promise$all3 = _context26.v;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 3);
              newMeeting = _yield$Promise$all4[0];
              dialInNumber = _yield$Promise$all4[1];
              extensionInfo = _yield$Promise$all4[2];
              _context26.n = 3;
              return this.getMeetingInvitation({
                hostName: extensionInfo.name,
                shortId: newMeeting.shortId,
                id: newMeeting.id,
                personalMeetingName: newMeeting.personalMeetingName,
                e2ee: newMeeting.e2ee,
                isMeetingSecret: newMeeting.isMeetingSecret,
                meetingPassword: newMeeting.meetingPassword,
                meetingPasswordPSTN: newMeeting.meetingPasswordPSTN,
                meetingPasswordMasked: newMeeting.meetingPasswordMasked,
                joinUri: newMeeting.joinUri || '',
                dialInNumbers: dialInNumber,
                currentLocale: this.currentLocale,
                brandName: this._brand.name,
                brandId: this._brand.id,
                isSIPAvailable: this._appFeatures.hasRoomConnectorBeta
              });
            case 3:
              invitationInfo = _context26.v;
              if (!meeting.saveAsDefault) {
                _context26.n = 4;
                break;
              }
              _context26.n = 4;
              return this.savePreferencesChanges(meeting, true);
            case 4:
              if (isAlertSuccess) {
                setTimeout(function () {
                  _this4._toast.success({
                    message: (0, _i18n2.t)('updatedSuccess')
                  });
                }, 50);
              }
              this._updateVideoStatus(_videoStatus.videoStatus.updated);
              this._updateHasSettingsChanged(false);
              if (this.personalMeeting && newMeeting.id === this.personalMeeting.id) {
                this._savePersonalMeeting(newMeeting);
              }
              meetingResponse = {
                invitationInfo: invitationInfo,
                extensionInfo: extensionInfo,
                dialInNumber: dialInNumber,
                meeting: _objectSpread(_objectSpread({}, meeting), newMeeting)
              };
              return _context26.a(2, meetingResponse);
            case 5:
              _context26.p = 5;
              _t9 = _context26.v;
              this.logger.error('updateMeeting errors:', _t9);
              this._updateVideoStatus(_videoStatus.videoStatus.idle);
              this._errorHandle(_t9);
              return _context26.a(2, null);
          }
        }, _callee26, this, [[1, 5]]);
      }));
      function updateMeeting(_x18, _x19) {
        return _updateMeeting.apply(this, arguments);
      }
      return updateMeeting;
    }()
  }, {
    key: "_initMeetingSettings",
    value: function _initMeetingSettings(usePersonalMeetingId) {
      if (usePersonalMeetingId) {
        this.updateMeetingSettings(_objectSpread({}, this.personalVideoSetting));
      } else {
        this.updateMeetingSettings(_objectSpread({}, this.defaultVideoSetting));
      }
    }
  }, {
    key: "turnOnE2ee",
    value: function () {
      var _turnOnE2ee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              this.updateMeetingSettings(_objectSpread(_objectSpread({
                e2ee: true
              }, _videoHelper.RCV_E2EE_DEFAULT_SECURITY_OPTIONS), {}, {
                // if jbh is locked, do not change its value
                allowJoinBeforeHost: this.meeting.settingLock.allowJoinBeforeHost ? this.meeting.allowJoinBeforeHost : _videoHelper.RCV_E2EE_DEFAULT_SECURITY_OPTIONS.allowJoinBeforeHost
              }));
            case 1:
              return _context27.a(2);
          }
        }, _callee27, this);
      }));
      function turnOnE2ee() {
        return _turnOnE2ee.apply(this, arguments);
      }
      return turnOnE2ee;
    }()
  }, {
    key: "updateMeetingSettings",
    value: function () {
      var _updateMeetingSettings2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(meeting) {
        var _processedMeeting$mee, _this$meeting2, _processedMeeting$isM, _this$meeting3;
        var patch,
          processedMeeting,
          _args28 = arguments;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              patch = _args28.length > 1 && _args28[1] !== undefined ? _args28[1] : true;
              processedMeeting = meeting;
              if (this.enableWaitingRoom) {
                processedMeeting = _objectSpread(_objectSpread({}, processedMeeting), (0, _videoHelper.patchWaitingRoomRelated)(_objectSpread(_objectSpread({}, this.meeting), processedMeeting), this.transformedPreferences, true));
              }
              this._updateMeetingSettings(_objectSpread(_objectSpread({}, processedMeeting), {}, {
                isMeetingPasswordValid: this.validatePasswordSettings((_processedMeeting$mee = processedMeeting.meetingPassword) !== null && _processedMeeting$mee !== void 0 ? _processedMeeting$mee : (_this$meeting2 = this.meeting) === null || _this$meeting2 === void 0 ? void 0 : _this$meeting2.meetingPassword, (_processedMeeting$isM = processedMeeting.isMeetingSecret) !== null && _processedMeeting$isM !== void 0 ? _processedMeeting$isM : (_this$meeting3 = this.meeting) === null || _this$meeting3 === void 0 ? void 0 : _this$meeting3.isMeetingSecret)
              }), patch);
              this._comparePreferences();
            case 1:
              return _context28.a(2);
          }
        }, _callee28, this);
      }));
      function updateMeetingSettings(_x20) {
        return _updateMeetingSettings2.apply(this, arguments);
      }
      return updateMeetingSettings;
    }()
  }, {
    key: "_comparePreferences",
    value: function _comparePreferences() {
      this._updateIsPreferencesChanged((0, _videoHelper.comparePreferences)(this.transformedPreferences, this.meeting));
    }
  }, {
    key: "updateHasSettingsChanged",
    value: function updateHasSettingsChanged(isChanged) {
      this._updateHasSettingsChanged(isChanged);
    }
  }, {
    key: "_errorHandle",
    value: function () {
      var _errorHandle2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(errors) {
        var _iterator, _step, error, _yield$errors$respons, errorCode, permissionName, _t0;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              if (!(errors instanceof _Meeting.MeetingErrors)) {
                _context29.n = 1;
                break;
              }
              _iterator = _createForOfIteratorHelper(errors.all);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  error = _step.value;
                  this._toast.warning(error);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              _context29.n = 8;
              break;
            case 1:
              if (!(errors && errors.response)) {
                _context29.n = 7;
                break;
              }
              _context29.n = 2;
              return errors.response.clone().json();
            case 2:
              _yield$errors$respons = _context29.v;
              errorCode = _yield$errors$respons.errorCode;
              permissionName = _yield$errors$respons.permissionName;
              if (!(errorCode === 'InsufficientPermissions' && permissionName)) {
                _context29.n = 3;
                break;
              }
              this._toast.danger({
                message: (0, _i18n2.t)('insufficientPermissions', {
                  permissionName: permissionName,
                  application: this._brand.appName
                })
              });
              _context29.n = 6;
              break;
            case 3:
              _t0 = !this._availabilityMonitor;
              if (_t0) {
                _context29.n = 5;
                break;
              }
              _context29.n = 4;
              return this._availabilityMonitor.checkIfHAError(errors);
            case 4:
              _t0 = !_context29.v;
            case 5:
              if (!_t0) {
                _context29.n = 6;
                break;
              }
              this._toast.danger({
                message: (0, _i18n2.t)('internalError')
              });
            case 6:
              _context29.n = 8;
              break;
            case 7:
              this.logger.log('errors:', errors);
              this._toast.danger({
                message: (0, _i18n2.t)('internalError')
              });
            case 8:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function _errorHandle(_x21) {
        return _errorHandle2.apply(this, arguments);
      }
      return _errorHandle;
    }()
  }, {
    key: "personalMeeting",
    get: function get() {
      return this._enablePersonalMeeting ? this.personalVideo : null;
    }
  }, {
    key: "savedDefaultVideoSetting",
    get: function get() {
      return this._showSaveAsDefault ? this.savedDefaultSetting : null;
    }
  }, {
    key: "country",
    get: function get() {
      return this._extensionInfo.country;
    }
  }, {
    key: "extensionName",
    get: function get() {
      var _this$_extensionInfo$, _this$currentUser;
      var extensionName = (_this$_extensionInfo$ = this._extensionInfo.info) === null || _this$_extensionInfo$ === void 0 ? void 0 : _this$_extensionInfo$.name;
      if (((_this$currentUser = this.currentUser) === null || _this$currentUser === void 0 ? void 0 : _this$currentUser.extensionId) !== "".concat(this.extensionId)) {
        var _this$currentUser2;
        extensionName = (_this$currentUser2 = this.currentUser) === null || _this$currentUser2 === void 0 ? void 0 : _this$currentUser2.name;
      }
      return extensionName;
    }
  }, {
    key: "extensionId",
    get: function get() {
      return this._extensionInfo.info.id;
    }
  }, {
    key: "accountId",
    get: function get() {
      return this._accountInfo.id;
    }
  }, {
    key: "brandName",
    get: function get() {
      return this._brand.name;
    }
  }, {
    key: "isInitializing",
    get: function get() {
      return this.videoStatus === _videoStatus.videoStatus.initializing;
    }
  }, {
    key: "isScheduling",
    get: function get() {
      return this.videoStatus === _videoStatus.videoStatus.creating;
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      return this._showSaveAsDefault;
    }
  }, {
    key: "enablePersonalMeeting",
    get: function get() {
      return this._enablePersonalMeeting;
    }
  }, {
    key: "enableWaitingRoom",
    get: function get() {
      return this._enableWaitingRoom;
    }

    // will follow dynamic brand config
  }, {
    key: "enableE2EE",
    get: function get() {
      var _this$_brand$brandCon, _this$_brand$brandCon2;
      // TODO: fix type
      // @ts-ignore
      return (_this$_brand$brandCon = (_this$_brand$brandCon2 = this._brand.brandConfig) === null || _this$_brand$brandCon2 === void 0 ? void 0 : _this$_brand$brandCon2.enableE2EE) !== null && _this$_brand$brandCon !== void 0 ? _this$_brand$brandCon : this._enableE2EE;
    }
  }, {
    key: "enableScheduleOnBehalf",
    get: function get() {
      return this._enableScheduleOnBehalf;
    }
  }, {
    key: "isInstantMeeting",
    get: function get() {
      return this._isInstantMeeting;
    }
  }, {
    key: "enableV2Api",
    get: function get() {
      return this._enableV2Api;
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return this._locale.currentLocale || _i18n.DEFAULT_LOCALE;
    }
  }, {
    key: "transformedPreferences",
    get: function get() {
      return (0, _videoHelper.transformPreferences)(this.preferences, this.isInstantMeeting);
    }
  }, {
    key: "transformedSettingLocks",
    get: function get() {
      return (0, _videoHelper.transformSettingLocks)(this.settingLocks, this.isInstantMeeting);
    }
  }, {
    key: "personalVideoSetting",
    get: function get() {
      if (!this.personalMeeting) {
        return null;
      }
      var processedSettings = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.initialVideoSetting), this.personalMeeting), (0, _videoHelper.getLockedPreferences)(this.transformedSettingLocks, this.transformedPreferences)), {}, {
        meetingPassword: this.personalMeeting.meetingPassword || (0, _videoHelper.generateRandomPassword)(10),
        startTime: new Date((0, _meetingHelper.getInitializedStartTime)()),
        isMeetingPasswordValid: true,
        // assume personal meeting password is valid
        id: this.personalMeeting.id,
        usePersonalMeetingId: true,
        settingLock: _objectSpread({}, this.transformedSettingLocks)
      });
      if (this.enableWaitingRoom) {
        return _objectSpread(_objectSpread({}, processedSettings), (0, _videoHelper.patchWaitingRoomRelated)(processedSettings, this.transformedPreferences));
      }
      return processedSettings;
    }
  }, {
    key: "defaultVideoSetting",
    get: function get() {
      var savedSetting = this._showSaveAsDefault ? this.savedDefaultVideoSetting : null;
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.initialVideoSetting), savedSetting), this.transformedPreferences), {}, {
        meetingPassword: (0, _videoHelper.generateRandomPassword)(10),
        startTime: new Date((0, _meetingHelper.getInitializedStartTime)()),
        isMeetingPasswordValid: true,
        // generated random password is valid
        id: null,
        usePersonalMeetingId: false,
        settingLock: _objectSpread({}, this.transformedSettingLocks)
      });
    }
  }, {
    key: "initialVideoSetting",
    get: function get() {
      return (0, _videoHelper.getDefaultVideoSettings)({
        topic: this.defaultTopic,
        accountId: this.currentUser.accountId,
        extensionId: this.currentUser.extensionId
      });
    }
  }, {
    key: "defaultTopic",
    get: function get() {
      return (0, _videoHelper.getTopic)({
        extensionName: this.extensionName,
        brandName: this.brandName,
        shortName: this._brand.shortName,
        rcvMeetingTopic: this._brand.brandConfig.rcvMeetingTopic,
        rcvProductName: this._brand.brandConfig.rcvProductName
      });
    }
  }, {
    key: "loginUser",
    get: function get() {
      return {
        name: _constants.ASSISTED_USERS_MYSELF,
        id: "".concat(this.extensionId),
        extensionId: "".concat(this.extensionId),
        accountId: "".concat(this.accountId),
        isLoginUser: true
      };
    }
  }, {
    key: "currentUser",
    get: function get() {
      return this.delegator || this.loginUser;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "personalVideo", [_nextCore.storage, _nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "savedDefaultSetting", [_nextCore.storage, _nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "meeting", [_nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "videoStatus", [_nextCore.state, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _videoStatus.videoStatus.idle;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "preferences", [_nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isPreferencesChanged", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "settingLocks", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "delegator", [_nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "delegators", [_nextCore.state, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "hasSettingsChanged", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_savePersonalMeeting", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_savePersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetPersonalMeeting", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_saveDefaultVideoSetting", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_saveDefaultVideoSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMeetingSettings", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateVideoStatus", [_dec21, _nextCore.action, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateVideoStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMeetingPreferences", [_nextCore.action, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMeetingPreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateIsPreferencesChanged", [_nextCore.action, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateIsPreferencesChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMeetingSettingLocks", [_nextCore.action, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMeetingSettingLocks"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateDelegator", [_nextCore.action, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateDelegator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateDelegatorList", [_nextCore.action, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateDelegatorList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateHasSettingsChanged", [_nextCore.action, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateHasSettingsChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onInit", [_dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "onInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "savePersonalMeeting", [_dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "savePersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_dec42, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_dec45, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_dec48, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDelegator", [_dec51, _dec52, _dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDelegator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_dec54, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createMeetingDirectly", [_dec57, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "createMeetingDirectly"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createMeeting", [_dec60, _dec61, _dec62], Object.getOwnPropertyDescriptor(_class2.prototype, "createMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRcvInvitationRequestData", [_dec63, _dec64, _dec65], Object.getOwnPropertyDescriptor(_class2.prototype, "getRcvInvitationRequestData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingInvitation", [_dec66, _dec67, _dec68], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingInvitation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_postBridges", [_dec69, _dec70, _dec71], Object.getOwnPropertyDescriptor(_class2.prototype, "_postBridges"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "patchBridges", [_dec72, _dec73, _dec74], Object.getOwnPropertyDescriptor(_class2.prototype, "patchBridges"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getDialinNumbers", [_dec75, _dec76, _dec77], Object.getOwnPropertyDescriptor(_class2.prototype, "_getDialinNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getPreferences", [_dec78, _dec79, _dec80], Object.getOwnPropertyDescriptor(_class2.prototype, "_getPreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getExtensionInfo", [_dec81, _dec82, _dec83], Object.getOwnPropertyDescriptor(_class2.prototype, "getExtensionInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_dec84, _dec85, _dec86], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_dec87, _dec88, _dec89], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "turnOnE2ee", [_dec90, _dec91, _dec92], Object.getOwnPropertyDescriptor(_class2.prototype, "turnOnE2ee"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_dec93, _dec94, _dec95], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "extensionName", [_dec96, _dec97, _dec98], Object.getOwnPropertyDescriptor(_class2.prototype, "extensionName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentLocale", [_dec99, _dec100, _dec101], Object.getOwnPropertyDescriptor(_class2.prototype, "currentLocale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transformedPreferences", [_dec102, _dec103, _dec104], Object.getOwnPropertyDescriptor(_class2.prototype, "transformedPreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transformedSettingLocks", [_dec105, _dec106, _dec107], Object.getOwnPropertyDescriptor(_class2.prototype, "transformedSettingLocks"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "personalVideoSetting", [_dec108, _dec109, _dec110], Object.getOwnPropertyDescriptor(_class2.prototype, "personalVideoSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultVideoSetting", [_dec111, _dec112, _dec113], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultVideoSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initialVideoSetting", [_dec114, _dec115, _dec116], Object.getOwnPropertyDescriptor(_class2.prototype, "initialVideoSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultTopic", [_dec117, _dec118, _dec119], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loginUser", [_dec120, _dec121, _dec122], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentUser", [_dec123, _dec124, _dec125], Object.getOwnPropertyDescriptor(_class2.prototype, "currentUser"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=RcVideo.js.map
