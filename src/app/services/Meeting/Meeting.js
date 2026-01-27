"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Meeting = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _meetingHelper = require("@ringcentral-integration/commons/helpers/meetingHelper");
var _renameTurkey = require("@ringcentral-integration/commons/helpers/renameTurkey");
var _i18n = require("@ringcentral-integration/i18n");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
var _ramda = require("ramda");
var _VideoConfiguration = require("../VideoConfiguration");
var _constants = require("./constants");
var _helper = require("./helper");
var _i18n2 = require("./i18n");
var _meetingErrors = require("./meetingErrors");
var _excluded = ["startParticipantsVideo", "startParticipantVideo"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _dec125, _dec126, _dec127, _dec128, _dec129, _dec130, _dec131, _dec132, _dec133, _dec134, _dec135, _dec136, _dec137, _dec138, _dec139, _dec140, _dec141, _dec142, _dec143, _dec144, _dec145, _dec146, _dec147, _dec148, _dec149, _dec150, _dec151, _dec152, _dec153, _dec154, _dec155, _dec156, _dec157, _dec158, _dec159, _dec160, _dec161, _dec162, _dec163, _dec164, _dec165, _dec166, _dec167, _dec168, _dec169, _dec170, _dec171, _dec172, _dec173, _dec174, _dec175, _dec176, _dec177, _dec178, _dec179, _dec180, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
_dayjs["default"].extend(_utc["default"]);
var Meeting = exports.Meeting = (_dec = (0, _nextCore.injectable)({
  name: 'Meeting'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 7);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('MeetingOptions')(target, undefined, 9);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _VideoConfiguration.VideoConfiguration === "undefined" ? Object : _VideoConfiguration.VideoConfiguration, typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _services.AvailabilityMonitor === "undefined" ? Object : _services.AvailabilityMonitor, typeof _services.Analytics === "undefined" ? Object : _services.Analytics, typeof MeetingOptions === "undefined" ? Object : MeetingOptions]), _dec7 = Reflect.metadata("design:type", typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel), _dec8 = Reflect.metadata("design:type", typeof UpdatingStatus === "undefined" ? Object : UpdatingStatus), _dec9 = Reflect.metadata("design:type", typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel), _dec0 = Reflect.metadata("design:type", typeof SavedDefaultMeetingSetting === "undefined" ? Object : SavedDefaultMeetingSetting), _dec1 = Reflect.metadata("design:type", typeof LastMeetingSetting === "undefined" ? Object : LastMeetingSetting), _dec10 = Reflect.metadata("design:type", Array), _dec11 = Reflect.metadata("design:type", typeof Partial === "undefined" ? Object : Partial), _dec12 = Reflect.metadata("design:type", typeof Partial === "undefined" ? Object : Partial), _dec13 = Reflect.metadata("design:type", typeof Partial === "undefined" ? Object : Partial), _dec14 = (0, _nextCore.computed)(function (_ref) {
  var extensionName = _ref.extensionName,
    currentLocale = _ref.currentLocale;
  return [extensionName, currentLocale];
}), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = (0, _nextCore.computed)(function (that) {
  var _that$userSettings;
  return [(_that$userSettings = that.userSettings) === null || _that$userSettings === void 0 ? void 0 : _that$userSettings.scheduleMeeting];
}), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec20 = (0, _nextCore.computed)(function (that) {
  var _that$userSettings2;
  return [(_that$userSettings2 = that.userSettings) === null || _that$userSettings2 === void 0 ? void 0 : _that$userSettings2.telephony];
}), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec23 = (0, _nextCore.computed)(function (that) {
  return [that.enablePersonalMeeting, that.enableServiceWebSettings, that.scheduleUserSettings.usePmiForScheduledMeetings];
}), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", []), _dec26 = (0, _nextCore.computed)(function (that) {
  return [that.extensionInfo.info.id];
}), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec29 = (0, _nextCore.computed)(function (that) {
  var _that$lockedSettings;
  return [(_that$lockedSettings = that.lockedSettings) === null || _that$lockedSettings === void 0 ? void 0 : _that$lockedSettings.scheduleMeeting];
}), _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", []), _dec32 = (0, _nextCore.computed)(function (that) {
  return [that.enableServiceWebSettings, that.scheduleLockedSettings];
}), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", []), _dec35 = (0, _nextCore.computed)(function (that) {
  return [that.enableServiceWebSettings, that.scheduleUserSettings];
}), _dec36 = Reflect.metadata("design:type", Function), _dec37 = Reflect.metadata("design:paramtypes", []), _dec38 = (0, _nextCore.computed)(function (that) {
  return [that.enablePersonalMeeting, that.personalMeeting];
}), _dec39 = Reflect.metadata("design:type", Function), _dec40 = Reflect.metadata("design:paramtypes", []), _dec41 = (0, _nextCore.computed)(function (that) {
  return [that._locale.currentLocale];
}), _dec42 = Reflect.metadata("design:type", Function), _dec43 = Reflect.metadata("design:paramtypes", []), _dec44 = Reflect.metadata("design:type", Function), _dec45 = Reflect.metadata("design:paramtypes", [Array]), _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", [typeof UserSettings === "undefined" ? Object : UserSettings]), _dec48 = Reflect.metadata("design:type", Function), _dec49 = Reflect.metadata("design:paramtypes", [typeof LockedSettings === "undefined" ? Object : LockedSettings]), _dec50 = Reflect.metadata("design:type", Function), _dec51 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec52 = Reflect.metadata("design:type", Function), _dec53 = Reflect.metadata("design:paramtypes", [typeof Preferences === "undefined" ? Object : Preferences]), _dec54 = Reflect.metadata("design:type", Function), _dec55 = Reflect.metadata("design:paramtypes", [Boolean]), _dec56 = Reflect.metadata("design:type", Function), _dec57 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", [typeof UpdatingStatus === "undefined" ? Object : UpdatingStatus]), _dec60 = Reflect.metadata("design:type", Function), _dec61 = Reflect.metadata("design:paramtypes", [typeof LastMeetingSetting === "undefined" ? Object : LastMeetingSetting]), _dec62 = Reflect.metadata("design:type", Function), _dec63 = Reflect.metadata("design:paramtypes", [typeof SavedDefaultMeetingSetting === "undefined" ? Object : SavedDefaultMeetingSetting]), _dec64 = (0, _services.track)(function (that, isScheduling) {
  var _that$_analytics;
  if (!isScheduling) return;
  var target = (_that$_analytics = that._analytics) === null || _that$_analytics === void 0 ? void 0 : _that$_analytics.getTrackTarget();
  if (target) {
    return [_trackEvents.trackEvents.clickMeetingSchedulePage, {
      router: target.router,
      'Meeting Type': 'RCM'
    }];
  }
}), _dec65 = Reflect.metadata("design:type", Function), _dec66 = Reflect.metadata("design:paramtypes", [Boolean]), _dec67 = (0, _nextCore.delegate)('server'), _dec68 = Reflect.metadata("design:type", Function), _dec69 = Reflect.metadata("design:paramtypes", []), _dec70 = (0, _nextCore.delegate)('server'), _dec71 = Reflect.metadata("design:type", Function), _dec72 = Reflect.metadata("design:paramtypes", []), _dec73 = (0, _nextCore.delegate)('server'), _dec74 = Reflect.metadata("design:type", Function), _dec75 = Reflect.metadata("design:paramtypes", [String]), _dec76 = (0, _nextCore.delegate)('server'), _dec77 = Reflect.metadata("design:type", Function), _dec78 = Reflect.metadata("design:paramtypes", [typeof Preferences === "undefined" ? Object : Preferences]), _dec79 = (0, _nextCore.delegate)('server'), _dec80 = Reflect.metadata("design:type", Function), _dec81 = Reflect.metadata("design:paramtypes", [Boolean]), _dec82 = (0, _nextCore.delegate)('server'), _dec83 = Reflect.metadata("design:type", Function), _dec84 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec85 = (0, _nextCore.delegate)('server'), _dec86 = Reflect.metadata("design:type", Function), _dec87 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec88 = (0, _nextCore.delegate)('server'), _dec89 = Reflect.metadata("design:type", Function), _dec90 = Reflect.metadata("design:paramtypes", [String]), _dec91 = (0, _nextCore.delegate)('server'), _dec92 = Reflect.metadata("design:type", Function), _dec93 = Reflect.metadata("design:paramtypes", [Boolean]), _dec94 = (0, _nextCore.delegate)('server'), _dec95 = Reflect.metadata("design:type", Function), _dec96 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec97 = (0, _nextCore.delegate)('server'), _dec98 = Reflect.metadata("design:type", Function), _dec99 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel, void 0]), _dec100 = (0, _nextCore.delegate)('server'), _dec101 = Reflect.metadata("design:type", Function), _dec102 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel, void 0]), _dec103 = (0, _nextCore.delegate)('server'), _dec104 = Reflect.metadata("design:type", Function), _dec105 = Reflect.metadata("design:paramtypes", [String, typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel, void 0]), _dec106 = (0, _nextCore.delegate)('server'), _dec107 = Reflect.metadata("design:type", Function), _dec108 = Reflect.metadata("design:paramtypes", [String]), _dec109 = (0, _nextCore.delegate)('server'), _dec110 = Reflect.metadata("design:type", Function), _dec111 = Reflect.metadata("design:paramtypes", [Object]), _dec112 = (0, _nextCore.delegate)('server'), _dec113 = Reflect.metadata("design:type", Function), _dec114 = Reflect.metadata("design:paramtypes", [void 0]), _dec115 = (0, _nextCore.delegate)('server'), _dec116 = Reflect.metadata("design:type", Function), _dec117 = Reflect.metadata("design:paramtypes", [Array]), _dec118 = (0, _nextCore.delegate)('server'), _dec119 = Reflect.metadata("design:type", Function), _dec120 = Reflect.metadata("design:paramtypes", [typeof UserSettings === "undefined" ? Object : UserSettings]), _dec121 = (0, _nextCore.delegate)('server'), _dec122 = Reflect.metadata("design:type", Function), _dec123 = Reflect.metadata("design:paramtypes", [typeof LockedSettings === "undefined" ? Object : LockedSettings]), _dec124 = (0, _nextCore.delegate)('server'), _dec125 = Reflect.metadata("design:type", Function), _dec126 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec127 = (0, _nextCore.delegate)('server'), _dec128 = Reflect.metadata("design:type", Function), _dec129 = Reflect.metadata("design:paramtypes", []), _dec130 = (0, _nextCore.delegate)('server'), _dec131 = Reflect.metadata("design:type", Function), _dec132 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec133 = (0, _nextCore.delegate)('server'), _dec134 = Reflect.metadata("design:type", Function), _dec135 = Reflect.metadata("design:paramtypes", [String]), _dec136 = (0, _nextCore.delegate)('server'), _dec137 = Reflect.metadata("design:type", Function), _dec138 = Reflect.metadata("design:paramtypes", [String]), _dec139 = (0, _nextCore.delegate)('server'), _dec140 = Reflect.metadata("design:type", Function), _dec141 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec142 = (0, _nextCore.delegate)('server'), _dec143 = Reflect.metadata("design:type", Function), _dec144 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec145 = (0, _nextCore.delegate)('server'), _dec146 = Reflect.metadata("design:type", Function), _dec147 = Reflect.metadata("design:paramtypes", [Boolean]), _dec148 = (0, _nextCore.delegate)('server'), _dec149 = Reflect.metadata("design:type", Function), _dec150 = Reflect.metadata("design:paramtypes", [String]), _dec151 = (0, _nextCore.delegate)('server'), _dec152 = Reflect.metadata("design:type", Function), _dec153 = Reflect.metadata("design:paramtypes", [String]), _dec154 = (0, _nextCore.delegate)('server'), _dec155 = Reflect.metadata("design:type", Function), _dec156 = Reflect.metadata("design:paramtypes", [typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec157 = (0, _nextCore.delegate)('server'), _dec158 = Reflect.metadata("design:type", Function), _dec159 = Reflect.metadata("design:paramtypes", [String, typeof RcMMeetingModel === "undefined" ? Object : RcMMeetingModel]), _dec160 = (0, _nextCore.delegate)('server'), _dec161 = Reflect.metadata("design:type", Function), _dec162 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec163 = (0, _nextCore.delegate)('server'), _dec164 = Reflect.metadata("design:type", Function), _dec165 = Reflect.metadata("design:paramtypes", []), _dec166 = (0, _nextCore.delegate)('server'), _dec167 = Reflect.metadata("design:type", Function), _dec168 = Reflect.metadata("design:paramtypes", [void 0]), _dec169 = (0, _nextCore.delegate)('server'), _dec170 = Reflect.metadata("design:type", Function), _dec171 = Reflect.metadata("design:paramtypes", []), _dec172 = (0, _nextCore.delegate)('server'), _dec173 = Reflect.metadata("design:type", Function), _dec174 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec175 = (0, _nextCore.computed)(function (that) {
  return [that._brand.brandConfig.meetingUriReg.rcm];
}), _dec176 = Reflect.metadata("design:type", Function), _dec177 = Reflect.metadata("design:paramtypes", []), _dec178 = (0, _nextCore.computed)(function (that) {
  return [that._brand.brandConfig.meetingUriReg.rcv, that.rcvBaseWebUri];
}), _dec179 = Reflect.metadata("design:type", Function), _dec180 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Meeting(_brand, _toast, _client, _extensionInfo, _storage, _videoConfiguration, _locale, _availabilityMonitor, _analytics, _meetingOptions) {
    var _this;
    _classCallCheck(this, Meeting);
    _this = _callSuper(this, Meeting);
    _this._brand = _brand;
    _this._toast = _toast;
    _this._client = _client;
    _this._extensionInfo = _extensionInfo;
    _this._storage = _storage;
    _this._videoConfiguration = _videoConfiguration;
    _this._locale = _locale;
    _this._availabilityMonitor = _availabilityMonitor;
    _this._analytics = _analytics;
    _this._meetingOptions = _meetingOptions;
    _this._fetchDelegatorsTimeout = null;
    _this._fetchPersonMeetingTimeout = null;
    _this._createMeetingPromise = void 0;
    _initializerDefineProperty(_this, "meeting", _descriptor, _this);
    _initializerDefineProperty(_this, "isScheduling", _descriptor2, _this);
    _initializerDefineProperty(_this, "updatingStatus", _descriptor3, _this);
    _initializerDefineProperty(_this, "personalMeeting", _descriptor4, _this);
    _initializerDefineProperty(_this, "savedDefaultMeetingSetting", _descriptor5, _this);
    _initializerDefineProperty(_this, "lastMeetingSetting", _descriptor6, _this);
    _initializerDefineProperty(_this, "delegators", _descriptor7, _this);
    _initializerDefineProperty(_this, "userSettings", _descriptor8, _this);
    _initializerDefineProperty(_this, "lockedSettings", _descriptor9, _this);
    _initializerDefineProperty(_this, "preferences", _descriptor0, _this);
    _initializerDefineProperty(_this, "isPreferencesChanged", _descriptor1, _this);
    _this.rcvBaseWebUri = null;
    _this._storage.enable(_this);
    return _this;
  }
  _inherits(Meeting, _RcModule);
  return _createClass(Meeting, [{
    key: "extensionName",
    get: function get() {
      var _this$_extensionInfo$;
      return (_this$_extensionInfo$ = this._extensionInfo.info) === null || _this$_extensionInfo$ === void 0 ? void 0 : _this$_extensionInfo$.name;
    }
  }, {
    key: "defaultTopic",
    get: function get() {
      return (0, _meetingHelper.getDefaultTopic)(this.extensionName, this.currentLocale);
    }
  }, {
    key: "scheduleUserSettings",
    get: function get() {
      var _this$userSettings;
      return ((_this$userSettings = this.userSettings) === null || _this$userSettings === void 0 ? void 0 : _this$userSettings.scheduleMeeting) || {};
    }
  }, {
    key: "telephonyUserSettings",
    get: function get() {
      var _this$userSettings2;
      return ((_this$userSettings2 = this.userSettings) === null || _this$userSettings2 === void 0 ? void 0 : _this$userSettings2.telephony) || {};
    }
  }, {
    key: "usePmiDefaultFromSW",
    get: function get() {
      return this.enablePersonalMeeting && this.enableServiceWebSettings && this.scheduleUserSettings.usePmiForScheduledMeetings;
    }
  }, {
    key: "loginUser",
    get: function get() {
      return {
        id: "".concat(this.extensionInfo.info.id),
        name: _constants.ASSISTED_USERS_MYSELF,
        isLoginUser: true
      };
    }
  }, {
    key: "scheduleLockedSettings",
    get: function get() {
      var _this$lockedSettings;
      return ((_this$lockedSettings = this.lockedSettings) === null || _this$lockedSettings === void 0 ? void 0 : _this$lockedSettings.scheduleMeeting) || {};
    }
  }, {
    key: "defaultLockedSettings",
    get: function get() {
      if (!this.enableServiceWebSettings || !this.scheduleLockedSettings) {
        return {};
      }
      return (0, _ramda.pick)(_constants.COMMON_SETTINGS, this.scheduleLockedSettings);
    }
  }, {
    key: "commonUserSettings",
    get: function get() {
      if (!this.enableServiceWebSettings) {
        return {};
      }
      return (0, _ramda.pick)(_constants.COMMON_SETTINGS, this.scheduleUserSettings);
    }
  }, {
    key: "commonPersonalMeetingSettings",
    get: function get() {
      if (!this.enablePersonalMeeting) {
        return {};
      }
      return (0, _ramda.pick)([].concat(_toConsumableArray(_constants.COMMON_SETTINGS), ['password']), this.personalMeeting || {});
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return this._locale.currentLocale || _i18n.DEFAULT_LOCALE;
    }
  }, {
    key: "pmiDefaultSettings",
    get: function get() {
      if (!this.enableServiceWebSettings) {
        return this.personalMeeting;
      }
      return this.enforcePassword(_objectSpread(_objectSpread({}, this.initialMeetingSetting), {}, {
        settingLock: this.defaultLockedSettings
      }), {
        userSettings: this.commonUserSettings,
        personalMeetingSettings: this.commonPersonalMeetingSettings
      }, true);
    }
  }, {
    key: "getGeneralDefaultSettings",
    value: function getGeneralDefaultSettings() {
      if (!this.enableServiceWebSettings) {
        var savedSetting = this.showSaveAsDefault ? this.savedDefaultMeetingSetting : this.lastMeetingSetting;
        return _objectSpread(_objectSpread(_objectSpread({}, this.initialMeetingSetting), savedSetting), {}, {
          meetingType: _meetingHelper.MeetingType.SCHEDULED
        });
      }
      return this.enforcePassword(_objectSpread(_objectSpread({}, this.initialMeetingSetting), {}, {
        settingLock: this.defaultLockedSettings
      }), {
        userSettings: this.commonUserSettings,
        personalMeetingSettings: this.commonPersonalMeetingSettings
      }, false);
    }
  }, {
    key: "defaultMeetingSetting",
    get: function get() {
      var initialSetting = this.initialMeetingSetting;
      var usePmi = this.usePmiDefaultFromSW;
      var userSettings = this.userSettings;
      var savedSetting = this.showSaveAsDefault ? this.savedDefaultMeetingSetting : this.lastMeetingSetting;
      if (this.enableServiceWebSettings) {
        if (!(0, _ramda.isEmpty)(userSettings)) {
          return usePmi ? this.pmiDefaultSettings : this.getGeneralDefaultSettings();
        }
        return initialSetting;
      }
      var meeting = _objectSpread(_objectSpread(_objectSpread({}, initialSetting), savedSetting), {}, {
        meetingType: _meetingHelper.MeetingType.SCHEDULED
      });
      return meeting;
    }
  }, {
    key: "getInitialMeetingSetting",
    value: function getInitialMeetingSetting() {
      var meetingName = (0, _helper.getExtensionName)({
        extensionInfo: this.extensionInfo,
        enableScheduleOnBehalf: this.enableScheduleOnBehalf,
        meeting: this.meeting,
        delegators: this.delegators
      });
      var startTime = (0, _meetingHelper.getInitializedStartTime)();
      var hostId = (0, _helper.getHostId)({
        enableScheduleOnBehalf: this.enableScheduleOnBehalf,
        meeting: this.meeting,
        extensionInfo: this.extensionInfo
      });
      var setting = (0, _meetingHelper.getDefaultMeetingSettings)(meetingName, this.currentLocale, startTime, hostId);
      if (!this.enableServiceWebSettings) {
        return setting;
      }
      return _objectSpread(_objectSpread(_objectSpread({}, setting), _constants.DEFAULT_LOCK_SETTINGS), {}, {
        _pmiPassword: ''
      });
    }
  }, {
    key: "initialMeetingSetting",
    get: function get() {
      return this.getInitialMeetingSetting();
    }
  }, {
    key: "extensionInfo",
    get: function get() {
      return this._extensionInfo;
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      var _this$_meetingOptions, _this$_meetingOptions2;
      return (_this$_meetingOptions = (_this$_meetingOptions2 = this._meetingOptions) === null || _this$_meetingOptions2 === void 0 ? void 0 : _this$_meetingOptions2.showSaveAsDefault) !== null && _this$_meetingOptions !== void 0 ? _this$_meetingOptions : false;
    }
  }, {
    key: "enablePersonalMeeting",
    get: function get() {
      var _this$_meetingOptions3, _this$_meetingOptions4;
      return (_this$_meetingOptions3 = (_this$_meetingOptions4 = this._meetingOptions) === null || _this$_meetingOptions4 === void 0 ? void 0 : _this$_meetingOptions4.enablePersonalMeeting) !== null && _this$_meetingOptions3 !== void 0 ? _this$_meetingOptions3 : false;
    }
  }, {
    key: "enableReloadAfterSchedule",
    get: function get() {
      var _this$_meetingOptions5, _this$_meetingOptions6;
      return (_this$_meetingOptions5 = (_this$_meetingOptions6 = this._meetingOptions) === null || _this$_meetingOptions6 === void 0 ? void 0 : _this$_meetingOptions6.enableReloadAfterSchedule) !== null && _this$_meetingOptions5 !== void 0 ? _this$_meetingOptions5 : true;
    }
  }, {
    key: "enableServiceWebSettings",
    get: function get() {
      var _this$_meetingOptions7, _this$_meetingOptions8;
      return (_this$_meetingOptions7 = (_this$_meetingOptions8 = this._meetingOptions) === null || _this$_meetingOptions8 === void 0 ? void 0 : _this$_meetingOptions8.enableServiceWebSettings) !== null && _this$_meetingOptions7 !== void 0 ? _this$_meetingOptions7 : false;
    }
  }, {
    key: "enableInvitationApiFailedToast",
    get: function get() {
      var _this$_meetingOptions9, _this$_meetingOptions0;
      return (_this$_meetingOptions9 = (_this$_meetingOptions0 = this._meetingOptions) === null || _this$_meetingOptions0 === void 0 ? void 0 : _this$_meetingOptions0.enableInvitationApiFailedToast) !== null && _this$_meetingOptions9 !== void 0 ? _this$_meetingOptions9 : false;
    }

    // will follow dynamic brand config
  }, {
    key: "enableScheduleOnBehalf",
    get: function get() {
      var _this$_brand$brandCon, _this$_brand$brandCon2, _this$_meetingOptions1;
      return (_this$_brand$brandCon = (_this$_brand$brandCon2 = this._brand.brandConfig) === null || _this$_brand$brandCon2 === void 0 ? void 0 : _this$_brand$brandCon2.enableRcmScheduleOnBehalf) !== null && _this$_brand$brandCon !== void 0 ? _this$_brand$brandCon : (_this$_meetingOptions1 = this._meetingOptions) === null || _this$_meetingOptions1 === void 0 ? void 0 : _this$_meetingOptions1.enableScheduleOnBehalf;
    }
  }, {
    key: "enableCustomTimezone",
    get: function get() {
      var _this$_meetingOptions10, _this$_meetingOptions11;
      return (_this$_meetingOptions10 = (_this$_meetingOptions11 = this._meetingOptions) === null || _this$_meetingOptions11 === void 0 ? void 0 : _this$_meetingOptions11.enableCustomTimezone) !== null && _this$_meetingOptions10 !== void 0 ? _this$_meetingOptions10 : false;
    }
  }, {
    key: "_updateDelegators",
    value: function _updateDelegators(delegators) {
      this.delegators = delegators;
    }
  }, {
    key: "_updateUserSettings",
    value: function _updateUserSettings(userSettings) {
      this.userSettings = userSettings;
    }
  }, {
    key: "_updateLockedSettings",
    value: function _updateLockedSettings(lockedSettings) {
      this.lockedSettings = lockedSettings;
    }
  }, {
    key: "_updatePersonalMeeting",
    value: function _updatePersonalMeeting(personalMeeting) {
      this.personalMeeting = personalMeeting;
    }
  }, {
    key: "_updatePreferences",
    value: function _updatePreferences(preferences) {
      this.preferences = preferences;
    }
  }, {
    key: "_updateIsPreferencesChanged",
    value: function _updateIsPreferencesChanged(isPreferencesChanged) {
      this.isPreferencesChanged = isPreferencesChanged;
    }
  }, {
    key: "_updateMeetingState",
    value: function _updateMeetingState(meeting) {
      this.meeting = meeting;
    }
  }, {
    key: "_updateUpdatingStatus",
    value: function _updateUpdatingStatus(updatingStatus) {
      this.updatingStatus = updatingStatus;
    }
  }, {
    key: "_updateLastMeetingSetting",
    value: function _updateLastMeetingSetting(lastMeetingSetting) {
      this.lastMeetingSetting = lastMeetingSetting;
    }
  }, {
    key: "_updateSavedDefaultMeetingSetting",
    value: function _updateSavedDefaultMeetingSetting(savedDefaultMeetingSetting) {
      this.savedDefaultMeetingSetting = savedDefaultMeetingSetting;
    }
  }, {
    key: "_updateIsScheduling",
    value: function _updateIsScheduling(isScheduling) {
      this.isScheduling = isScheduling;
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
    key: "_shouldInit",
    value: function _shouldInit() {
      return _superPropGet(Meeting, "_shouldInit", this, 3)([]) && this._videoConfiguration.isRCM;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _superPropGet(Meeting, "_shouldReset", this, 3)([]) || this.ready && !this._videoConfiguration.isRCM;
    }
  }, {
    key: "initScheduleFor",
    value: function () {
      var _initScheduleFor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this2 = this;
        var count,
          _yield$this$getDelega,
          records,
          _args2 = arguments,
          _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              count = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 0;
              if (this.enableScheduleOnBehalf) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (this._fetchDelegatorsTimeout) {
                clearTimeout(this._fetchDelegatorsTimeout);
              }
              _context2.p = 2;
              _context2.n = 3;
              return this.getDelegators();
            case 3:
              _yield$this$getDelega = _context2.v;
              records = _yield$this$getDelega.records;
              if (!(!records || records.length === 0)) {
                _context2.n = 4;
                break;
              }
              this.updateDelegators([]);
              return _context2.a(2);
            case 4:
              this.updateDelegators([this.loginUser].concat(_toConsumableArray(records)));
              _context2.n = 7;
              break;
            case 5:
              _context2.p = 5;
              _t = _context2.v;
              console.error('fetch delegators error:', _t);
              if (!(count >= 5)) {
                _context2.n = 6;
                break;
              }
              console.warn('retry after 10s');
              this._fetchDelegatorsTimeout = setTimeout(function () {
                _this2.initScheduleFor(count + 1);
              }, 10000);
              return _context2.a(2);
            case 6:
              this.updateDelegators([]);
            case 7:
              return _context2.a(2);
          }
        }, _callee2, this, [[2, 5]]);
      }));
      function initScheduleFor() {
        return _initScheduleFor.apply(this, arguments);
      }
      return initScheduleFor;
    }()
  }, {
    key: "_initMeetingSettings",
    value: function () {
      var _initMeetingSettings2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(extensionId) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return Promise.all([this._initPersonalMeeting(extensionId), this._updateServiceWebSettings(extensionId)]);
            case 1:
              _context3.n = 2;
              return this._initMeeting(extensionId);
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _initMeetingSettings(_x) {
        return _initMeetingSettings2.apply(this, arguments);
      }
      return _initMeetingSettings;
    }()
    /**
     * Init basic meeting information
     * also load meeting setting from previous one.
     */
    // @background
  }, {
    key: "init",
    value: (function () {
      var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
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
        return _init2.apply(this, arguments);
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
    key: "_init",
    value: function () {
      var _init3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return Promise.all([this._initMeetingSettings(), this.initScheduleFor()]);
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _init() {
        return _init3.apply(this, arguments);
      }
      return _init;
    }()
  }, {
    key: "_initMeeting",
    value: function () {
      var _initMeeting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(extensionId) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this.update(_objectSpread(_objectSpread({}, this.defaultMeetingSetting), {}, {
                host: {
                  id: extensionId || this.loginUser.id
                }
              }));
              this.updatePreferences((0, _meetingHelper.prunePreferencesObject)(this.meeting));
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _initMeeting(_x2) {
        return _initMeeting2.apply(this, arguments);
      }
      return _initMeeting;
    }()
  }, {
    key: "updatePreferences",
    value: function () {
      var _updatePreferences2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(preferences) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this._updatePreferences(preferences);
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function updatePreferences(_x3) {
        return _updatePreferences2.apply(this, arguments);
      }
      return updatePreferences;
    }()
  }, {
    key: "updateIsPreferencesChanged",
    value: function () {
      var _updateIsPreferencesChanged2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(isPreferencesChanged) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this._updateIsPreferencesChanged(isPreferencesChanged);
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function updateIsPreferencesChanged(_x4) {
        return _updateIsPreferencesChanged2.apply(this, arguments);
      }
      return updateIsPreferencesChanged;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(_meeting) {
        var meeting, finalMeeting;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              meeting = _meeting;
              if (this.enableServiceWebSettings) {
                meeting = this.combineWithSettings(_meeting);
              }
              finalMeeting = _objectSpread(_objectSpread({}, meeting), {}, {
                isMeetingPasswordValid: this.validatePasswordSettings(_meeting.password, _meeting._requireMeetingPassword)
              });
              this.updateMeetingState(finalMeeting);
              this._comparePreferences(finalMeeting);
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function update(_x5) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "_comparePreferences",
    value: function _comparePreferences(meeting) {
      this.updateIsPreferencesChanged((0, _meetingHelper.comparePreferences)(this.preferences, meeting));
    }
  }, {
    key: "validatePasswordSettings",
    value: function validatePasswordSettings(password, isSecret) {
      if (!isSecret) {
        return true;
      }
      if (password && _constants.RCM_PASSWORD_REGEX.test(password)) {
        return true;
      }
      return false;
    }
  }, {
    key: "combineWithSettings",
    value: function combineWithSettings(_meeting) {
      return this._combineWithSWSettings(_meeting);
    }
  }, {
    key: "_combineWithSWSettings",
    value: function _combineWithSWSettings(meeting) {
      if (!meeting.usePersonalMeetingId) {
        return meeting;
      }
      var processedMeeting = _objectSpread({}, meeting);
      var allowJoinBeforeHost = processedMeeting.allowJoinBeforeHost;
      var requirePasswordForPmiMeetings = this.scheduleUserSettings.requirePasswordForPmiMeetings;
      var lockedRequirePasswordForPmiMeetings = this.scheduleLockedSettings.requirePasswordForPmiMeetings;
      if (lockedRequirePasswordForPmiMeetings && requirePasswordForPmiMeetings === _constants.PMIRequirePassword.JBH_ONLY) {
        if (allowJoinBeforeHost && !processedMeeting._requireMeetingPassword) {
          processedMeeting._requireMeetingPassword = true;
          processedMeeting.password = processedMeeting._pmiPassword || (0, _meetingHelper.generateRandomPassword)();
        }
        processedMeeting._lockRequireMeetingPassword = allowJoinBeforeHost;
      }
      return processedMeeting;
    }
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(extensionId) {
        var _this3 = this;
        var count,
          meetingInfoResponse,
          meeting,
          _args1 = arguments,
          _t2;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              count = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : 0;
              if (this.enablePersonalMeeting) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2);
            case 1:
              if (this._fetchPersonMeetingTimeout) {
                clearTimeout(this._fetchPersonMeetingTimeout);
              }
              _context1.p = 2;
              _context1.n = 3;
              return this.fetchPersonalMeeting(extensionId);
            case 3:
              meetingInfoResponse = _context1.v;
              meeting = this.formatPersonalMeeting(
              // TODO: fix type
              meetingInfoResponse);
              this.updatePersonalMeeting(meeting);
              _context1.n = 5;
              break;
            case 4:
              _context1.p = 4;
              _t2 = _context1.v;
              console.error('fetch personal meeting error:', _t2);
              this.resetPersonalMeeting();
              if (count < 5) {
                console.warn('retry after 10s');
                this._fetchPersonMeetingTimeout = setTimeout(function () {
                  _this3._initPersonalMeeting(extensionId, count + 1);
                }, 10000);
              }
            case 5:
              return _context1.a(2);
          }
        }, _callee1, this, [[2, 4]]);
      }));
      function _initPersonalMeeting(_x6) {
        return _initPersonalMeeting2.apply(this, arguments);
      }
      return _initPersonalMeeting;
    }()
  }, {
    key: "_updateServiceWebSettings",
    value: function () {
      var _updateServiceWebSettings2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(extensionId) {
        var _yield$Promise$all, _yield$Promise$all2, userSettings, lockedSettings, _t3;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              if (this.enableServiceWebSettings) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
            case 1:
              _context10.p = 1;
              _context10.n = 2;
              return Promise.all([this.getUserSettings(extensionId), this.getLockedSettings()]);
            case 2:
              _yield$Promise$all = _context10.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              userSettings = _yield$Promise$all2[0];
              lockedSettings = _yield$Promise$all2[1];
              this.updateUserSettings(userSettings);
              this.updateLockedSettings(lockedSettings);
              _context10.n = 4;
              break;
            case 3:
              _context10.p = 3;
              _t3 = _context10.v;
              console.error('error:', _t3);
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function _updateServiceWebSettings(_x7) {
        return _updateServiceWebSettings2.apply(this, arguments);
      }
      return _updateServiceWebSettings;
    }()
  }, {
    key: "switchUsePersonalMeetingId",
    value: function () {
      var _switchUsePersonalMeetingId = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(usePersonalMeetingId) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              this.update(usePersonalMeetingId ? this.pmiDefaultSettings : this.getGeneralDefaultSettings());
            case 1:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function switchUsePersonalMeetingId(_x8) {
        return _switchUsePersonalMeetingId.apply(this, arguments);
      }
      return switchUsePersonalMeetingId;
    }()
  }, {
    key: "saveAsDefaultSetting",
    value: function () {
      var _saveAsDefaultSetting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(meeting) {
        var formattedMeeting;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              formattedMeeting = this._format(meeting);
              this.updateSavedDefaultMeetingSetting(_objectSpread(_objectSpread({}, formattedMeeting), {}, {
                // TODO: fix type
                // @ts-ignore
                _saved: meeting.notShowAgain,
                _requireMeetingPassword: meeting._requireMeetingPassword
              }));
            case 1:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function saveAsDefaultSetting(_x9) {
        return _saveAsDefaultSetting.apply(this, arguments);
      }
      return saveAsDefaultSetting;
    }()
  }, {
    key: "scheduleDirectly",
    value: function () {
      var _scheduleDirectly2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(meeting) {
        var _this4 = this;
        var _ref2,
          _ref2$isAlertSuccess,
          isAlertSuccess,
          result,
          _args13 = arguments,
          _t4;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _ref2 = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {}, _ref2$isAlertSuccess = _ref2.isAlertSuccess, isAlertSuccess = _ref2$isAlertSuccess === void 0 ? true : _ref2$isAlertSuccess;
              _context13.p = 1;
              meeting = meeting || this.meeting;
              _context13.n = 2;
              return this._scheduleDirectly(meeting);
            case 2:
              result = _context13.v;
              // Notify user the meeting has been scheduled
              if (isAlertSuccess) {
                setTimeout(function () {
                  _this4._toast.success({
                    message: (0, _i18n2.t)('scheduledSuccess')
                  });
                }, 50);
              }
              return _context13.a(2, result);
            case 3:
              _context13.p = 3;
              _t4 = _context13.v;
              _context13.n = 4;
              return this._errorHandle(_t4);
            case 4:
              return _context13.a(2, null);
            case 5:
              _context13.p = 5;
              this.updateIsScheduling(false);
              return _context13.f(5);
            case 6:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3, 5, 6]]);
      }));
      function scheduleDirectly(_x0) {
        return _scheduleDirectly2.apply(this, arguments);
      }
      return scheduleDirectly;
    }()
  }, {
    key: "_scheduleDirectly",
    value: function () {
      var _scheduleDirectly3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(meeting) {
        var _meeting$host;
        var formattedMeeting, _yield$Promise$all3, _yield$Promise$all4, resp, serviceInfo, invitationInfo, result;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              this.updateIsScheduling(true);
              // Validate meeting
              this._validate(meeting);
              formattedMeeting = this._format(meeting);
              if (this.showSaveAsDefault && meeting.saveAsDefault) {
                this.saveAsDefaultSetting(meeting);
              }
              _context14.n = 1;
              return Promise.all([this.postMeeting(formattedMeeting), this.getMeetingServiceInfo((_meeting$host = meeting.host) === null || _meeting$host === void 0 ? void 0 : _meeting$host.id)]);
            case 1:
              _yield$Promise$all3 = _context14.v;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
              resp = _yield$Promise$all4[0];
              serviceInfo = _yield$Promise$all4[1];
              _context14.n = 2;
              return this.getMeetingInvitation(resp.id, this.currentLocale);
            case 2:
              invitationInfo = _context14.v;
              this.updateLastMeetingSetting(_objectSpread(_objectSpread({}, formattedMeeting), {}, {
                _saved: meeting._saved
              }));
              _context14.n = 3;
              return this._createDialingNumberTpl(serviceInfo, resp, invitationInfo);
            case 3:
              result = _context14.v;
              // Reload meeting info
              if (this.enableReloadAfterSchedule) {
                this._initMeeting();
              }

              // Update personal meeting setting
              // TODO: fix type
              // @ts-ignore
              if (this.enablePersonalMeeting && resp.usePersonalMeetingId) {
                this.updatePersonalMeeting(this.formatPersonalMeeting(
                // TODO: fix type
                // @ts-ignore
                resp,
                // TODO: fix type
                // @ts-ignore
                serviceInfo.externalUserInfo.personalMeetingId));
                if (this.enableServiceWebSettings) {
                  // TODO: fix type
                  // @ts-ignore
                  this.update(_objectSpread(_objectSpread({}, this.meeting), {}, {
                    _pmiPassword: resp.password
                  }));
                }
              }
              return _context14.a(2, result);
          }
        }, _callee14, this);
      }));
      function _scheduleDirectly(_x1) {
        return _scheduleDirectly3.apply(this, arguments);
      }
      return _scheduleDirectly;
    }()
  }, {
    key: "schedule",
    value: function () {
      var _schedule2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(meeting) {
        var _ref3,
          _ref3$isAlertSuccess,
          isAlertSuccess,
          result,
          _args15 = arguments;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              _ref3 = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {}, _ref3$isAlertSuccess = _ref3.isAlertSuccess, isAlertSuccess = _ref3$isAlertSuccess === void 0 ? true : _ref3$isAlertSuccess;
              if (!this.isScheduling) {
                _context15.n = 1;
                break;
              }
              return _context15.a(2, this._createMeetingPromise);
            case 1:
              this._createMeetingPromise = this.scheduleDirectly(meeting, {
                isAlertSuccess: isAlertSuccess
              });
              _context15.n = 2;
              return this._createMeetingPromise;
            case 2:
              result = _context15.v;
              this._createMeetingPromise = null;
              return _context15.a(2, result);
          }
        }, _callee15, this);
      }));
      function schedule(_x10) {
        return _schedule2.apply(this, arguments);
      }
      return schedule;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(meetingId, meeting) {
        var _this5 = this;
        var _ref4,
          _ref4$isAlertSuccess,
          isAlertSuccess,
          result,
          _args16 = arguments,
          _t5;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _ref4 = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : {}, _ref4$isAlertSuccess = _ref4.isAlertSuccess, isAlertSuccess = _ref4$isAlertSuccess === void 0 ? false : _ref4$isAlertSuccess;
              _context16.p = 1;
              if (!this._isUpdating(meetingId)) {
                _context16.n = 2;
                break;
              }
              return _context16.a(2, this.updateMeeting._promise);
            case 2:
              meeting = meeting || this.meeting;
              _context16.n = 3;
              return this._updateMeeting(meetingId, meeting);
            case 3:
              result = _context16.v;
              // Notify user the meeting has been updated
              if (isAlertSuccess) {
                setTimeout(function () {
                  _this5._toast.success({
                    message: (0, _i18n2.t)('updatedSuccess')
                  });
                }, 50);
              }
              return _context16.a(2, result);
            case 4:
              _context16.p = 4;
              _t5 = _context16.v;
              _context16.n = 5;
              return this._errorHandle(_t5);
            case 5:
              return _context16.a(2, null);
            case 6:
              _context16.p = 6;
              delete this.updateMeeting._promise;
              this.removeUpdatingStatus(meetingId);
              return _context16.f(6);
            case 7:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 4, 6, 7]]);
      }));
      function updateMeeting(_x11, _x12) {
        return _updateMeeting2.apply(this, arguments);
      }
      return updateMeeting;
    }()
  }, {
    key: "_updateMeeting",
    value: function () {
      var _updateMeeting3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(meetingId, meeting) {
        var _meeting$host2;
        var formattedMeeting, _yield$_promise, _yield$_promise2, resp, serviceInfo, invitationInfo, result;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              this.addUpdatingStatus(meetingId);
              // Validate meeting
              this._validate(meeting);
              formattedMeeting = this._format(meeting);
              if (this.showSaveAsDefault && meeting.saveAsDefault) {
                this.saveAsDefaultSetting(meeting);
              }
              this.updateMeeting._promise = Promise.all([this.putMeeting(meetingId, formattedMeeting), this.getMeetingServiceInfo((_meeting$host2 = meeting.host) === null || _meeting$host2 === void 0 ? void 0 : _meeting$host2.id)]);
              _context17.n = 1;
              return this.updateMeeting._promise;
            case 1:
              _yield$_promise = _context17.v;
              _yield$_promise2 = _slicedToArray(_yield$_promise, 2);
              resp = _yield$_promise2[0];
              serviceInfo = _yield$_promise2[1];
              _context17.n = 2;
              return this.getMeetingInvitation(meetingId, this.currentLocale);
            case 2:
              invitationInfo = _context17.v;
              _context17.n = 3;
              return this._createDialingNumberTpl(serviceInfo, resp, invitationInfo);
            case 3:
              result = _context17.v;
              // Reload meeting info
              if (this.enableReloadAfterSchedule) {
                this._initMeeting();
              }

              // Update personal meeting setting
              if (this.enablePersonalMeeting && resp.usePersonalMeetingId) {
                this.updatePersonalMeeting(this.formatPersonalMeeting(resp, serviceInfo.externalUserInfo.personalMeetingId));
                if (this.enableServiceWebSettings) {
                  // TODO: fix type
                  // @ts-ignore
                  this.update(_objectSpread(_objectSpread({}, this.meeting), {}, {
                    _pmiPassword: resp.password
                  }));
                }
              }
              return _context17.a(2, result);
          }
        }, _callee17, this);
      }));
      function _updateMeeting(_x13, _x14) {
        return _updateMeeting3.apply(this, arguments);
      }
      return _updateMeeting;
    }()
  }, {
    key: "deleteMeeting",
    value: function () {
      var _deleteMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(meetingId) {
        var _t6;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this._client.account().extension().meeting(meetingId)["delete"]();
            case 1:
              return _context18.a(2, true);
            case 2:
              _context18.p = 2;
              _t6 = _context18.v;
              _context18.n = 3;
              return this._errorHandle(_t6);
            case 3:
              return _context18.a(2, false);
          }
        }, _callee18, this, [[0, 2]]);
      }));
      function deleteMeeting(_x15) {
        return _deleteMeeting.apply(this, arguments);
      }
      return deleteMeeting;
    }()
  }, {
    key: "updateScheduleFor",
    value: function () {
      var _updateScheduleFor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
        var userExtensionId,
          hostId,
          user,
          _args19 = arguments;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              userExtensionId = _args19.length > 0 && _args19[0] !== undefined ? _args19[0] : "".concat(this.extensionId);
              if (!(!this.delegators || this.delegators.length === 0)) {
                _context19.n = 1;
                break;
              }
              return _context19.a(2);
            case 1:
              hostId = "".concat(userExtensionId);
              user = (0, _ramda.find)(function (item) {
                return item.id === hostId;
              }, this.delegators);
              if (!user) {
                _context19.n = 2;
                break;
              }
              _context19.n = 2;
              return this._initMeetingSettings(hostId);
            case 2:
              return _context19.a(2);
          }
        }, _callee19, this);
      }));
      function updateScheduleFor() {
        return _updateScheduleFor.apply(this, arguments);
      }
      return updateScheduleFor;
    }()
  }, {
    key: "getExtensionInfo",
    value: function () {
      var _getExtensionInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
        var extensionId,
          _args20 = arguments;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              extensionId = _args20.length > 0 && _args20[0] !== undefined ? _args20[0] : "".concat(this.extensionId);
              if (!(Number(extensionId) === this.extensionId)) {
                _context20.n = 1;
                break;
              }
              return _context20.a(2, this._extensionInfo.info);
            case 1:
              return _context20.a(2, this._client.account().extension(extensionId).get());
          }
        }, _callee20, this);
      }));
      function getExtensionInfo() {
        return _getExtensionInfo.apply(this, arguments);
      }
      return getExtensionInfo;
    }()
  }, {
    key: "updateDelegators",
    value: function () {
      var _updateDelegators2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(delegators) {
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              this._updateDelegators(delegators);
            case 1:
              return _context21.a(2);
          }
        }, _callee21, this);
      }));
      function updateDelegators(_x16) {
        return _updateDelegators2.apply(this, arguments);
      }
      return updateDelegators;
    }()
  }, {
    key: "updateUserSettings",
    value: function () {
      var _updateUserSettings2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(userSettings) {
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              this._updateUserSettings(userSettings);
            case 1:
              return _context22.a(2);
          }
        }, _callee22, this);
      }));
      function updateUserSettings(_x17) {
        return _updateUserSettings2.apply(this, arguments);
      }
      return updateUserSettings;
    }()
  }, {
    key: "updateLockedSettings",
    value: function () {
      var _updateLockedSettings2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(lockedSettings) {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              this._updateLockedSettings(lockedSettings);
            case 1:
              return _context23.a(2);
          }
        }, _callee23, this);
      }));
      function updateLockedSettings(_x18) {
        return _updateLockedSettings2.apply(this, arguments);
      }
      return updateLockedSettings;
    }()
  }, {
    key: "updatePersonalMeeting",
    value: function () {
      var _updatePersonalMeeting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(meeting) {
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              this._updatePersonalMeeting(meeting);
            case 1:
              return _context24.a(2);
          }
        }, _callee24, this);
      }));
      function updatePersonalMeeting(_x19) {
        return _updatePersonalMeeting2.apply(this, arguments);
      }
      return updatePersonalMeeting;
    }()
  }, {
    key: "resetPersonalMeeting",
    value: function () {
      var _resetPersonalMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25() {
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              this._updatePersonalMeeting(null);
            case 1:
              return _context25.a(2);
          }
        }, _callee25, this);
      }));
      function resetPersonalMeeting() {
        return _resetPersonalMeeting.apply(this, arguments);
      }
      return resetPersonalMeeting;
    }()
  }, {
    key: "updateMeetingState",
    value: function () {
      var _updateMeetingState2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(meeting) {
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              this._updateMeetingState(meeting);
            case 1:
              return _context26.a(2);
          }
        }, _callee26, this);
      }));
      function updateMeetingState(_x20) {
        return _updateMeetingState2.apply(this, arguments);
      }
      return updateMeetingState;
    }()
  }, {
    key: "addUpdatingStatus",
    value: function () {
      var _addUpdatingStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(meetingId) {
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              this._updateUpdatingStatus([].concat(_toConsumableArray(this.updatingStatus), [{
                meetingId: meetingId
              }]));
            case 1:
              return _context27.a(2);
          }
        }, _callee27, this);
      }));
      function addUpdatingStatus(_x21) {
        return _addUpdatingStatus.apply(this, arguments);
      }
      return addUpdatingStatus;
    }()
  }, {
    key: "removeUpdatingStatus",
    value: function () {
      var _removeUpdatingStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(meetingId) {
        var finalStatus;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              finalStatus = (0, _ramda.filter)(function (obj) {
                return obj.meetingId !== meetingId;
              }, this.updatingStatus);
              this._updateUpdatingStatus(finalStatus);
            case 1:
              return _context28.a(2);
          }
        }, _callee28, this);
      }));
      function removeUpdatingStatus(_x22) {
        return _removeUpdatingStatus.apply(this, arguments);
      }
      return removeUpdatingStatus;
    }()
  }, {
    key: "updateLastMeetingSetting",
    value: function () {
      var _updateLastMeetingSetting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(meeting) {
        var lastMeetingSetting;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              lastMeetingSetting = (0, _ramda.pick)(_constants.LAST_MEETING_SETTINGS, meeting || {});
              this._updateLastMeetingSetting(lastMeetingSetting);
            case 1:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function updateLastMeetingSetting(_x23) {
        return _updateLastMeetingSetting2.apply(this, arguments);
      }
      return updateLastMeetingSetting;
    }()
  }, {
    key: "updateSavedDefaultMeetingSetting",
    value: function () {
      var _updateSavedDefaultMeetingSetting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(meeting) {
        var savedDefaulteSetting;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              savedDefaulteSetting = (0, _ramda.pick)(_constants.SAVED_DEFAULT_MEETING_SETTINGS, meeting || {});
              this._updateSavedDefaultMeetingSetting(savedDefaulteSetting);
            case 1:
              return _context30.a(2);
          }
        }, _callee30, this);
      }));
      function updateSavedDefaultMeetingSetting(_x24) {
        return _updateSavedDefaultMeetingSetting2.apply(this, arguments);
      }
      return updateSavedDefaultMeetingSetting;
    }()
  }, {
    key: "updateIsScheduling",
    value: function () {
      var _updateIsScheduling2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(isScheduling) {
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              this._updateIsScheduling(isScheduling);
            case 1:
              return _context31.a(2);
          }
        }, _callee31, this);
      }));
      function updateIsScheduling(_x25) {
        return _updateIsScheduling2.apply(this, arguments);
      }
      return updateIsScheduling;
    }()
  }, {
    key: "fetchPersonalMeeting",
    value: function () {
      var _fetchPersonalMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(extensionId) {
        var serviceInfo, personalMeetingId, meetingInfoResponse;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              _context32.n = 1;
              return this.getMeetingServiceInfo(extensionId);
            case 1:
              serviceInfo = _context32.v;
              // TODO: fix type
              // @ts-ignore
              personalMeetingId = serviceInfo.externalUserInfo.personalMeetingId;
              _context32.n = 2;
              return this.getMeeting(personalMeetingId);
            case 2:
              meetingInfoResponse = _context32.v;
              if (meetingInfoResponse) {
                _context32.n = 3;
                break;
              }
              throw new Error("failed to get personal meeting ".concat(personalMeetingId, " info"));
            case 3:
              return _context32.a(2, meetingInfoResponse);
          }
        }, _callee32, this);
      }));
      function fetchPersonalMeeting(_x26) {
        return _fetchPersonalMeeting.apply(this, arguments);
      }
      return fetchPersonalMeeting;
    }()
  }, {
    key: "getMeetingServiceInfo",
    value: function () {
      var _getMeetingServiceInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(extensionId) {
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.n) {
            case 0:
              return _context33.a(2, this._client.account().extension(extensionId).meeting().serviceInfo().get());
          }
        }, _callee33, this);
      }));
      function getMeetingServiceInfo(_x27) {
        return _getMeetingServiceInfo.apply(this, arguments);
      }
      return getMeetingServiceInfo;
    }()
  }, {
    key: "postMeeting",
    value: function () {
      var _postMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(formattedMeeting) {
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              return _context34.a(2, this._client.account().extension().meeting().post(formattedMeeting));
          }
        }, _callee34, this);
      }));
      function postMeeting(_x28) {
        return _postMeeting.apply(this, arguments);
      }
      return postMeeting;
    }()
  }, {
    key: "putMeeting",
    value: function () {
      var _putMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(meetingId, formattedMeeting) {
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.n) {
            case 0:
              return _context35.a(2, this._client.account().extension().meeting(meetingId).put(formattedMeeting));
          }
        }, _callee35, this);
      }));
      function putMeeting(_x29, _x30) {
        return _putMeeting.apply(this, arguments);
      }
      return putMeeting;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(meetingId) {
        var _this6 = this;
        var _ref5,
          _ref5$isAlertError,
          isAlertError,
          settings,
          _yield$clone$json,
          errorCode,
          message,
          isMeetingDeleted,
          _args36 = arguments,
          _t7;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.p = _context36.n) {
            case 0:
              _ref5 = _args36.length > 1 && _args36[1] !== undefined ? _args36[1] : {}, _ref5$isAlertError = _ref5.isAlertError, isAlertError = _ref5$isAlertError === void 0 ? true : _ref5$isAlertError;
              _context36.p = 1;
              _context36.n = 2;
              return this._client.account().extension().meeting(meetingId).get();
            case 2:
              settings = _context36.v;
              return _context36.a(2, _objectSpread(_objectSpread({}, settings), {}, {
                // TODO: can we remove this?
                _requireMeetingPassword: !!settings.password
              }));
            case 3:
              _context36.p = 3;
              _t7 = _context36.v;
              _context36.n = 4;
              return _t7.response.clone().json();
            case 4:
              _yield$clone$json = _context36.v;
              errorCode = _yield$clone$json.errorCode;
              message = _yield$clone$json.message;
              console.log("failed to get meeting info: ".concat(meetingId, ", ").concat(errorCode, ", ").concat(message));
              isMeetingDeleted = errorCode === 'CMN-102' && message.indexOf('[meetingId] is not found') > -1;
              if (isAlertError && isMeetingDeleted) {
                setTimeout(function () {
                  _this6._toast.danger({
                    message: (0, _i18n2.t)('meetingIsDeleted')
                  });
                }, 50);
              }
              throw _t7;
            case 5:
              return _context36.a(2);
          }
        }, _callee36, this, [[1, 3]]);
      }));
      function getMeeting(_x31) {
        return _getMeeting.apply(this, arguments);
      }
      return getMeeting;
    }()
  }, {
    key: "getDelegators",
    value: function () {
      var _getDelegators = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37() {
        var res;
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.n) {
            case 0:
              _context37.n = 1;
              return this._client.service.platform().get('/restapi/v1.0/account/~/extension/~/meetings-configuration/assisted');
            case 1:
              res = _context37.v;
              return _context37.a(2, res.json());
          }
        }, _callee37, this);
      }));
      function getDelegators() {
        return _getDelegators.apply(this, arguments);
      }
      return getDelegators;
    }()
  }, {
    key: "getUserSettings",
    value: function () {
      var _getUserSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38() {
        var extensionId,
          platform,
          apiResponse,
          _args38 = arguments,
          _t8;
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.p = _context38.n) {
            case 0:
              extensionId = _args38.length > 0 && _args38[0] !== undefined ? _args38[0] : '~';
              _context38.p = 1;
              platform = this._client.service.platform();
              _context38.n = 2;
              return platform.send({
                method: 'GET',
                url: "/restapi/v1.0/account/~/extension/".concat(extensionId, "/meeting/user-settings")
              });
            case 2:
              apiResponse = _context38.v;
              return _context38.a(2, apiResponse.json());
            case 3:
              _context38.p = 3;
              _t8 = _context38.v;
              console.warn('failed to get user setting', _t8);
              return _context38.a(2, null);
          }
        }, _callee38, this, [[1, 3]]);
      }));
      function getUserSettings() {
        return _getUserSettings.apply(this, arguments);
      }
      return getUserSettings;
    }()
  }, {
    key: "getLockedSettings",
    value: function () {
      var _getLockedSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39() {
        var platform, apiResponse, _yield$apiResponse$js, _yield$apiResponse$js2, recording, _yield$apiResponse$js3, scheduleMeeting, startParticipantsVideo, startParticipantVideo, restScheduleOptions, processedScheduleMeeting, _t9;
        return _regenerator().w(function (_context39) {
          while (1) switch (_context39.p = _context39.n) {
            case 0:
              _context39.p = 0;
              platform = this._client.service.platform();
              _context39.n = 1;
              return platform.send({
                method: 'GET',
                url: '/restapi/v1.0/account/~/meeting/locked-settings'
              });
            case 1:
              apiResponse = _context39.v;
              _context39.n = 2;
              return apiResponse.json();
            case 2:
              _yield$apiResponse$js = _context39.v;
              _yield$apiResponse$js2 = _yield$apiResponse$js.recording;
              recording = _yield$apiResponse$js2 === void 0 ? {} : _yield$apiResponse$js2;
              _yield$apiResponse$js3 = _yield$apiResponse$js.scheduleMeeting;
              scheduleMeeting = _yield$apiResponse$js3 === void 0 ? {} : _yield$apiResponse$js3;
              startParticipantsVideo = scheduleMeeting.startParticipantsVideo, startParticipantVideo = scheduleMeeting.startParticipantVideo, restScheduleOptions = _objectWithoutProperties(scheduleMeeting, _excluded);
              processedScheduleMeeting = _objectSpread(_objectSpread({}, restScheduleOptions), {}, {
                // TODO: update this when api is stable
                startParticipantsVideo: startParticipantsVideo || startParticipantVideo || false
              });
              return _context39.a(2, {
                recording: recording,
                scheduleMeeting: processedScheduleMeeting
              });
            case 3:
              _context39.p = 3;
              _t9 = _context39.v;
              console.warn('failed to get lock settings', _t9);
              return _context39.a(2, null);
          }
        }, _callee39, this, [[0, 3]]);
      }));
      function getLockedSettings() {
        return _getLockedSettings.apply(this, arguments);
      }
      return getLockedSettings;
    }()
  }, {
    key: "getMeetingInvitation",
    value: function () {
      var _getMeetingInvitation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(meetingId) {
        var locale,
          apiResponse,
          _yield$apiResponse$js4,
          invitation,
          _args40 = arguments,
          _t0;
        return _regenerator().w(function (_context40) {
          while (1) switch (_context40.p = _context40.n) {
            case 0:
              locale = _args40.length > 1 && _args40[1] !== undefined ? _args40[1] : _i18n.DEFAULT_LOCALE;
              _context40.p = 1;
              _context40.n = 2;
              return this._client.service.platform().get("/restapi/v1.0/account/~/extension/~/meeting/".concat(meetingId, "/invitation"), {
                language: this._locale.normalizeLocale(locale)
              });
            case 2:
              apiResponse = _context40.v;
              _context40.n = 3;
              return apiResponse.json();
            case 3:
              _yield$apiResponse$js4 = _context40.v;
              invitation = _yield$apiResponse$js4.invitation;
              return _context40.a(2, {
                invitation: (0, _renameTurkey.renameTurkey)(invitation)
              });
            case 4:
              _context40.p = 4;
              _t0 = _context40.v;
              console.warn('failed to get invitation', _t0);
              if (this.enableInvitationApiFailedToast) {
                this._toast.danger({
                  message: (0, _i18n2.t)('renderInviteError')
                });
              }
              return _context40.a(2, null);
          }
        }, _callee40, this, [[1, 4]]);
      }));
      function getMeetingInvitation(_x32) {
        return _getMeetingInvitation.apply(this, arguments);
      }
      return getMeetingInvitation;
    }()
  }, {
    key: "formatPersonalMeeting",
    value: function formatPersonalMeeting(meetingInfo, shortId // TODO: do we need this param `shortId`?
    ) {
      var settings = _objectSpread(_objectSpread(_objectSpread({}, this.initialMeetingSetting), meetingInfo), {}, {
        shortId: shortId || meetingInfo.id,
        usePersonalMeetingId: true
      });
      return _objectSpread(_objectSpread({}, settings), {}, {
        _requireMeetingPassword: !!settings.password
      });
    }

    /**
     * Validate meeting information format.
     * @param {Object} meeting
     * @throws
     */
  }, {
    key: "_validate",
    value: function _validate(meeting) {
      if (!meeting) {
        throw new _meetingErrors.MeetingErrors((0, _i18n2.t)('invalidMeetingInfo'));
      }
      var topic = meeting.topic,
        password = meeting.password,
        schedule = meeting.schedule,
        _requireMeetingPassword = meeting._requireMeetingPassword;
      var errors = new _meetingErrors.MeetingErrors();
      if (topic.length <= 0) {
        errors.push((0, _i18n2.t)('emptyTopic'));
      }
      if (_requireMeetingPassword && (!password || password.length <= 0)) {
        errors.push((0, _i18n2.t)('noPassword'));
      }
      if (schedule) {
        if (schedule.durationInMinutes < 0) {
          errors.push((0, _i18n2.t)('durationIncorrect'));
        }
      }
      if (errors.length > 0) {
        throw errors;
      }
    }

    /**
     * Format meeting information.
     * @param {Object} meeting
     */
  }, {
    key: "_format",
    value: function _format(meeting) {
      var topic = meeting.topic,
        meetingType = meeting.meetingType,
        allowJoinBeforeHost = meeting.allowJoinBeforeHost,
        startHostVideo = meeting.startHostVideo,
        startParticipantsVideo = meeting.startParticipantsVideo,
        audioOptions = meeting.audioOptions,
        password = meeting.password,
        schedule = meeting.schedule,
        recurrence = meeting.recurrence,
        usePersonalMeetingId = meeting.usePersonalMeetingId,
        _requireMeetingPassword = meeting._requireMeetingPassword,
        host = meeting.host;
      var formatted = {
        host: host,
        topic: topic,
        meetingType: meetingType,
        allowJoinBeforeHost: allowJoinBeforeHost,
        startHostVideo: startHostVideo,
        startParticipantsVideo: startParticipantsVideo,
        audioOptions: audioOptions,
        password: _requireMeetingPassword ? password : '',
        recurrence: recurrence,
        usePersonalMeetingId: usePersonalMeetingId
      };
      // Recurring meetings do not have schedule info
      if (meetingType !== _meetingHelper.MeetingType.RECURRING) {
        var _schedule = {
          durationInMinutes: schedule.durationInMinutes,
          timeZone: {
            id: this.enableCustomTimezone ? schedule.timeZone.id : _meetingHelper.UTC_TIMEZONE_ID
          }
        };
        if (schedule.startTime) {
          // Format selected startTime to utc standard time
          // Timezone information is not included here
          _schedule.startTime = this.enableCustomTimezone ? schedule.startTime : _dayjs["default"].utc(schedule.startTime).format();
        }
        formatted.schedule = _schedule;
        if (recurrence && recurrence.until) {
          formatted.recurrence.until = _dayjs["default"].utc(recurrence.until).format();
        }
      }

      // For PMI
      formatted.meetingType = formatted.meetingType === _meetingHelper.MeetingType.PMI ? _meetingHelper.MeetingType.SCHEDULED : formatted.meetingType;
      return formatted;
    }
  }, {
    key: "_createDialingNumberTpl",
    value: function () {
      var _createDialingNumberTpl2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(serviceInfo, resp, invitationInfo) {
        var _resp$host;
        var extensionInfo, result;
        return _regenerator().w(function (_context41) {
          while (1) switch (_context41.n) {
            case 0:
              _context41.n = 1;
              return this.getExtensionInfo(resp === null || resp === void 0 ? void 0 : (_resp$host = resp.host) === null || _resp$host === void 0 ? void 0 : _resp$host.id);
            case 1:
              extensionInfo = _context41.v;
              result = {
                meeting: resp,
                serviceInfo: _objectSpread(_objectSpread({}, serviceInfo), {}, {
                  mobileDialingNumberTpl: (0, _meetingHelper.getMobileDialingNumberTpl)(serviceInfo.dialInNumbers, resp.id),
                  phoneDialingNumberTpl: (0, _meetingHelper.getPhoneDialingNumberTpl)(serviceInfo.dialInNumbers)
                }),
                extensionInfo: extensionInfo,
                invitationInfo: invitationInfo
              };
              return _context41.a(2, result);
          }
        }, _callee41, this);
      }));
      function _createDialingNumberTpl(_x33, _x34, _x35) {
        return _createDialingNumberTpl2.apply(this, arguments);
      }
      return _createDialingNumberTpl;
    }()
  }, {
    key: "_errorHandle",
    value: function () {
      var _errorHandle2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42(errors) {
        var _iterator, _step, error, _yield$errors$respons, message, errorCode, permissionName, _t1;
        return _regenerator().w(function (_context42) {
          while (1) switch (_context42.n) {
            case 0:
              if (!(errors instanceof _meetingErrors.MeetingErrors)) {
                _context42.n = 1;
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
              _context42.n = 9;
              break;
            case 1:
              if (!(errors && errors.response)) {
                _context42.n = 8;
                break;
              }
              _context42.n = 2;
              return errors.response.clone().json();
            case 2:
              _yield$errors$respons = _context42.v;
              message = _yield$errors$respons.message;
              errorCode = _yield$errors$respons.errorCode;
              permissionName = _yield$errors$respons.permissionName;
              if (!(errorCode === 'InsufficientPermissions' && permissionName)) {
                _context42.n = 3;
                break;
              }
              this._toast.danger({
                message: (0, _i18n2.t)('insufficientPermissions', {
                  application: this._brand.appName,
                  permissionName: permissionName
                })
              });
              _context42.n = 7;
              break;
            case 3:
              if (!(errorCode === 'CMN-102' && message.indexOf('[meetingId] is not found') > -1)) {
                _context42.n = 4;
                break;
              }
              this._toast.danger({
                message: (0, _i18n2.t)('meetingIsDeleted')
              });
              _context42.n = 7;
              break;
            case 4:
              _t1 = !this._availabilityMonitor;
              if (_t1) {
                _context42.n = 6;
                break;
              }
              _context42.n = 5;
              return this._availabilityMonitor.checkIfHAError(errors);
            case 5:
              _t1 = !_context42.v;
            case 6:
              if (!_t1) {
                _context42.n = 7;
                break;
              }
              this._toast.danger({
                message: (0, _i18n2.t)('internalError')
              });
            case 7:
              _context42.n = 9;
              break;
            case 8:
              console.log('errors:', errors);
              this._toast.danger({
                message: (0, _i18n2.t)('internalError')
              });
            case 9:
              return _context42.a(2);
          }
        }, _callee42, this);
      }));
      function _errorHandle(_x36) {
        return _errorHandle2.apply(this, arguments);
      }
      return _errorHandle;
    }()
  }, {
    key: "enforcePmiPassword",
    value: function enforcePmiPassword(processedMeeting, requirePwdForPMI, requirePwdIsLockedForPMI) {
      var allowJoinBeforeHost = processedMeeting.allowJoinBeforeHost,
        _processedMeeting$pas = processedMeeting.password,
        password = _processedMeeting$pas === void 0 ? '' : _processedMeeting$pas;
      if (password !== '') {
        // save this for design
        processedMeeting._pmiPassword = password;
      }
      var pmiRequiresPwd;
      switch (requirePwdForPMI) {
        case _constants.PMIRequirePassword.NONE:
          pmiRequiresPwd = password !== '';
          break;
        case _constants.PMIRequirePassword.ALL:
          pmiRequiresPwd = true;
          break;
        case _constants.PMIRequirePassword.JBH_ONLY:
          pmiRequiresPwd = allowJoinBeforeHost || password !== '';
          break;
        default:
          pmiRequiresPwd = processedMeeting._requireMeetingPassword;
      }
      var pmiRequiresPwdLocked = requirePwdForPMI === _constants.PMIRequirePassword.JBH_ONLY ? requirePwdIsLockedForPMI && allowJoinBeforeHost : requirePwdIsLockedForPMI;
      processedMeeting._requireMeetingPassword = pmiRequiresPwd;
      processedMeeting._lockRequireMeetingPassword = pmiRequiresPwdLocked;
    }
  }, {
    key: "enforcePassword",
    value: function enforcePassword(meeting, _ref6, usePmi) {
      var userSettings = _ref6.userSettings,
        personalMeetingSettings = _ref6.personalMeetingSettings;
      if (!this.enableServiceWebSettings) {
        return meeting;
      }
      var _this$scheduleUserSet = this.scheduleUserSettings,
        _this$scheduleUserSet2 = _this$scheduleUserSet.requirePasswordForSchedulingNewMeetings,
        requirePwdForNonPMI = _this$scheduleUserSet2 === void 0 ? false : _this$scheduleUserSet2,
        requirePwdForPMI = _this$scheduleUserSet.requirePasswordForPmiMeetings;
      var _this$scheduleLockedS = this.scheduleLockedSettings,
        requirePwdIsLockedForNonPMI = _this$scheduleLockedS.requirePasswordForSchedulingNewMeetings,
        requirePwdIsLockedForPMI = _this$scheduleLockedS.requirePasswordForPmiMeetings;
      var processedMeeting = _objectSpread(_objectSpread(_objectSpread({}, meeting), usePmi ? personalMeetingSettings : userSettings), {}, {
        usePersonalMeetingId: usePmi,
        telephonyUserSettings: this.telephonyUserSettings
      });

      // For PMI meetings
      if (usePmi) {
        this.enforcePmiPassword(processedMeeting, requirePwdForPMI, requirePwdIsLockedForPMI);
      } else {
        // For non-PMI meetings
        if (requirePwdForNonPMI) {
          processedMeeting._requireMeetingPassword = true;
        }
        if (requirePwdIsLockedForNonPMI) {
          processedMeeting._lockRequireMeetingPassword = true;
        }
      }
      return _objectSpread(_objectSpread({}, processedMeeting), {}, {
        password: processedMeeting._requireMeetingPassword && !processedMeeting.password ? (0, _meetingHelper.generateRandomPassword)() : processedMeeting.password
      });
    }

    // use to check meeting is in updating status or not
  }, {
    key: "_isUpdating",
    value: function _isUpdating(meetingId) {
      return this.updatingStatus && (0, _ramda.find)(function (obj) {
        return obj.meetingId === meetingId;
      }, this.updatingStatus);
    }
  }, {
    key: "extensionId",
    get: function get() {
      return this._extensionInfo.info.id;
    }
  }, {
    key: "enableDiscoveryApi",
    get: function get() {
      return !!this._client.service.platform().discovery();
    }
  }, {
    key: "fetchDiscoveryConfig",
    value: function () {
      var _fetchDiscoveryConfig = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43() {
        var _this$_client$service;
        var data;
        return _regenerator().w(function (_context43) {
          while (1) switch (_context43.n) {
            case 0:
              _context43.n = 1;
              return (_this$_client$service = this._client.service.platform().discovery()) === null || _this$_client$service === void 0 ? void 0 : _this$_client$service.externalData();
            case 1:
              data = _context43.v;
              if (data) {
                this.rcvBaseWebUri = data.rcv.baseWebUri;
              } else {
                // handle discovery api  error in sdk
              }
            case 2:
              return _context43.a(2);
          }
        }, _callee43, this);
      }));
      function fetchDiscoveryConfig() {
        return _fetchDiscoveryConfig.apply(this, arguments);
      }
      return fetchDiscoveryConfig;
    }()
  }, {
    key: "onReset",
    value: function onReset() {
      this.rcvBaseWebUri = null;
    }
  }, {
    key: "getMeetingUriRegExp",
    value: function () {
      var _getMeetingUriRegExp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee44() {
        return _regenerator().w(function (_context44) {
          while (1) switch (_context44.n) {
            case 0:
              if (!(this.enableDiscoveryApi && !this.rcvBaseWebUri)) {
                _context44.n = 1;
                break;
              }
              _context44.n = 1;
              return this.fetchDiscoveryConfig();
            case 1:
              return _context44.a(2, {
                rcvUriRegExp: this.rcvUriRegExp,
                rcmUriRegExp: this.rcmUriRegExp
              });
          }
        }, _callee44, this);
      }));
      function getMeetingUriRegExp() {
        return _getMeetingUriRegExp.apply(this, arguments);
      }
      return getMeetingUriRegExp;
    }()
  }, {
    key: "rcmUriRegExp",
    get: function get() {
      return (0, _helper.getRcmUriRegExp)(this._brand.brandConfig.meetingUriReg.rcm);
    }
  }, {
    key: "rcvUriRegExp",
    get: function get() {
      var _this$rcvBaseWebUri;
      var regExpText = this.enableDiscoveryApi && this.rcvBaseWebUri ? "(".concat((_this$rcvBaseWebUri = this.rcvBaseWebUri) === null || _this$rcvBaseWebUri === void 0 ? void 0 : _this$rcvBaseWebUri.replace(/^https?:\/\//, '').replace(/\./g, '\\.'), "|").concat(this._brand.brandConfig.meetingUriReg.rcv, ")") : this._brand.brandConfig.meetingUriReg.rcv;
      return (0, _helper.getRcvUriRegExp)(regExpText);
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "meeting", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isScheduling", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "updatingStatus", [_nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "personalMeeting", [_nextCore.storage, _nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "savedDefaultMeetingSetting", [_nextCore.storage, _nextCore.state, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lastMeetingSetting", [_nextCore.storage, _nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "delegators", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "userSettings", [_nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "lockedSettings", [_nextCore.state, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "preferences", [_nextCore.state, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "isPreferencesChanged", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "defaultTopic", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scheduleUserSettings", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "scheduleUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "telephonyUserSettings", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "telephonyUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "usePmiDefaultFromSW", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "usePmiDefaultFromSW"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loginUser", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scheduleLockedSettings", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "scheduleLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultLockedSettings", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "commonUserSettings", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "commonUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "commonPersonalMeetingSettings", [_dec38, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "commonPersonalMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentLocale", [_dec41, _dec42, _dec43], Object.getOwnPropertyDescriptor(_class2.prototype, "currentLocale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateDelegators", [_nextCore.action, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateDelegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateUserSettings", [_nextCore.action, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateLockedSettings", [_nextCore.action, _dec48, _dec49], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updatePersonalMeeting", [_nextCore.action, _dec50, _dec51], Object.getOwnPropertyDescriptor(_class2.prototype, "_updatePersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updatePreferences", [_nextCore.action, _dec52, _dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "_updatePreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateIsPreferencesChanged", [_nextCore.action, _dec54, _dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateIsPreferencesChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMeetingState", [_nextCore.action, _dec56, _dec57], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMeetingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateUpdatingStatus", [_nextCore.action, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateLastMeetingSetting", [_nextCore.action, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateLastMeetingSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSavedDefaultMeetingSetting", [_nextCore.action, _dec62, _dec63], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSavedDefaultMeetingSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateIsScheduling", [_dec64, _nextCore.action, _dec65, _dec66], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateIsScheduling"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_dec67, _dec68, _dec69], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_init", [_dec70, _dec71, _dec72], Object.getOwnPropertyDescriptor(_class2.prototype, "_init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initMeeting", [_dec73, _dec74, _dec75], Object.getOwnPropertyDescriptor(_class2.prototype, "_initMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePreferences", [_dec76, _dec77, _dec78], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateIsPreferencesChanged", [_dec79, _dec80, _dec81], Object.getOwnPropertyDescriptor(_class2.prototype, "updateIsPreferencesChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_dec82, _dec83, _dec84], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initPersonalMeeting", [_dec85, _dec86, _dec87], Object.getOwnPropertyDescriptor(_class2.prototype, "_initPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateServiceWebSettings", [_dec88, _dec89, _dec90], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateServiceWebSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_dec91, _dec92, _dec93], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveAsDefaultSetting", [_dec94, _dec95, _dec96], Object.getOwnPropertyDescriptor(_class2.prototype, "saveAsDefaultSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scheduleDirectly", [_dec97, _dec98, _dec99], Object.getOwnPropertyDescriptor(_class2.prototype, "scheduleDirectly"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_dec100, _dec101, _dec102], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_dec103, _dec104, _dec105], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteMeeting", [_dec106, _dec107, _dec108], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_dec109, _dec110, _dec111], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getExtensionInfo", [_dec112, _dec113, _dec114], Object.getOwnPropertyDescriptor(_class2.prototype, "getExtensionInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDelegators", [_dec115, _dec116, _dec117], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDelegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateUserSettings", [_dec118, _dec119, _dec120], Object.getOwnPropertyDescriptor(_class2.prototype, "updateUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateLockedSettings", [_dec121, _dec122, _dec123], Object.getOwnPropertyDescriptor(_class2.prototype, "updateLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePersonalMeeting", [_dec124, _dec125, _dec126], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetPersonalMeeting", [_dec127, _dec128, _dec129], Object.getOwnPropertyDescriptor(_class2.prototype, "resetPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingState", [_dec130, _dec131, _dec132], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addUpdatingStatus", [_dec133, _dec134, _dec135], Object.getOwnPropertyDescriptor(_class2.prototype, "addUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeUpdatingStatus", [_dec136, _dec137, _dec138], Object.getOwnPropertyDescriptor(_class2.prototype, "removeUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateLastMeetingSetting", [_dec139, _dec140, _dec141], Object.getOwnPropertyDescriptor(_class2.prototype, "updateLastMeetingSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSavedDefaultMeetingSetting", [_dec142, _dec143, _dec144], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSavedDefaultMeetingSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateIsScheduling", [_dec145, _dec146, _dec147], Object.getOwnPropertyDescriptor(_class2.prototype, "updateIsScheduling"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchPersonalMeeting", [_dec148, _dec149, _dec150], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingServiceInfo", [_dec151, _dec152, _dec153], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingServiceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "postMeeting", [_dec154, _dec155, _dec156], Object.getOwnPropertyDescriptor(_class2.prototype, "postMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "putMeeting", [_dec157, _dec158, _dec159], Object.getOwnPropertyDescriptor(_class2.prototype, "putMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_dec160, _dec161, _dec162], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDelegators", [_dec163, _dec164, _dec165], Object.getOwnPropertyDescriptor(_class2.prototype, "getDelegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getUserSettings", [_dec166, _dec167, _dec168], Object.getOwnPropertyDescriptor(_class2.prototype, "getUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getLockedSettings", [_dec169, _dec170, _dec171], Object.getOwnPropertyDescriptor(_class2.prototype, "getLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingInvitation", [_dec172, _dec173, _dec174], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingInvitation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rcmUriRegExp", [_dec175, _dec176, _dec177], Object.getOwnPropertyDescriptor(_class2.prototype, "rcmUriRegExp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rcvUriRegExp", [_dec178, _dec179, _dec180], Object.getOwnPropertyDescriptor(_class2.prototype, "rcvUriRegExp"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Meeting.js.map
