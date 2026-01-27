"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistory = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _callResults = require("@ringcentral-integration/commons/enums/callResults");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _debounce = _interopRequireDefault(require("@ringcentral-integration/commons/lib/debounce"));
var _normalizeNumber = require("@ringcentral-integration/commons/lib/normalizeNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _rxjs = require("rxjs");
var _ActiveCallControl = require("../ActiveCallControl");
var _CallLog = require("../CallLog");
var _CallMonitor = require("../CallMonitor");
var _CallingSettings = require("../CallingSettings");
var _PreinsertCall = require("../PreinsertCall");
var _callHistoryHelper = require("./callHistoryHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
var DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000;
var CallHistory = exports.CallHistory = (_dec = (0, _nextCore.injectable)({
  name: 'CallHistory'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 6);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 7);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('CallHistoryOptions')(target, undefined, 9);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _services2.CompanyContacts === "undefined" ? Object : _services2.CompanyContacts, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _CallLog.CallLog === "undefined" ? Object : _CallLog.CallLog, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _CallMonitor.CallMonitor === "undefined" ? Object : _CallMonitor.CallMonitor, typeof _PreinsertCall.PreinsertCall === "undefined" ? Object : _PreinsertCall.PreinsertCall, typeof _CallingSettings.CallingSettings === "undefined" ? Object : _CallingSettings.CallingSettings, typeof _services2.ActivityMatcher === "undefined" ? Object : _services2.ActivityMatcher, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof CallHistoryOptions === "undefined" ? Object : CallHistoryOptions]), _dec8 = Reflect.metadata("design:type", Array), _dec9 = Reflect.metadata("design:type", Array), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [void 0]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [void 0]), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [Array]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [void 0]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [Number, typeof Partial === "undefined" ? Object : Partial]), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [Array, Number]), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [Array]), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = Reflect.metadata("design:type", Array), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", []), _dec30 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", [String]), _dec33 = (0, _nextCore.delegate)('server'), _dec34 = (0, _services.track)(_trackEvents.trackEvents.clickToSMSCallHistory), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", []), _dec37 = (0, _nextCore.delegate)('server'), _dec38 = (0, _services.track)(function (that) {
  var _that$_callingSetting;
  return [((_that$_callingSetting = that._callingSettings) === null || _that$_callingSetting === void 0 ? void 0 : _that$_callingSetting.callingMode) === _CallingSettings.callingModes.ringout ? _trackEvents.trackEvents.clickToDialCallHistoryWithRingOut : _trackEvents.trackEvents.clickToDialCallHistory];
}), _dec39 = Reflect.metadata("design:type", Function), _dec40 = Reflect.metadata("design:paramtypes", []), _dec41 = (0, _nextCore.delegate)('server'), _dec42 = Reflect.metadata("design:type", Function), _dec43 = Reflect.metadata("design:paramtypes", [String]), _dec44 = (0, _nextCore.computed)(function (that) {
  return [that._callLog.calls, that._accountInfo.countryCode];
}), _dec45 = Reflect.metadata("design:type", Function), _dec46 = Reflect.metadata("design:paramtypes", []), _dec47 = Reflect.metadata("design:type", Function), _dec48 = Reflect.metadata("design:paramtypes", []), _dec49 = Reflect.metadata("design:type", Function), _dec50 = Reflect.metadata("design:paramtypes", []), _dec51 = Reflect.metadata("design:type", Function), _dec52 = Reflect.metadata("design:paramtypes", []), _dec53 = Reflect.metadata("design:type", Function), _dec54 = Reflect.metadata("design:paramtypes", []), _dec55 = Reflect.metadata("design:type", Function), _dec56 = Reflect.metadata("design:paramtypes", []), _dec57 = (0, _nextCore.delegate)('server'), _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", [void 0]), _dec60 = (0, _nextCore.delegate)('server'), _dec61 = Reflect.metadata("design:type", Function), _dec62 = Reflect.metadata("design:paramtypes", []), _dec63 = Reflect.metadata("design:type", Function), _dec64 = Reflect.metadata("design:paramtypes", []), _dec65 = Reflect.metadata("design:type", Function), _dec66 = Reflect.metadata("design:paramtypes", []), _dec67 = (0, _nextCore.computed)(function (that) {
  return [that.normalizedCalls, that.endedCalls];
}), _dec68 = Reflect.metadata("design:type", Function), _dec69 = Reflect.metadata("design:paramtypes", []), _dec70 = (0, _nextCore.computed)(function (that) {
  return [that.normalizedCalls, that.endedCalls];
}), _dec71 = Reflect.metadata("design:type", Function), _dec72 = Reflect.metadata("design:paramtypes", []), _dec73 = (0, _nextCore.computed)(function (that) {
  return [that.searchInput, that.calls, that.filteredCalls];
}), _dec74 = Reflect.metadata("design:type", Function), _dec75 = Reflect.metadata("design:paramtypes", []), _dec76 = Reflect.metadata("design:type", Function), _dec77 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function CallHistory(_companyContacts, _accountInfo, _callLog, _storage, _callMonitor, _preInsertCall, _callingSettings, _activityMatcher, _contactMatcher, _callHistoryOptions) {
    var _this$_callHistoryOpt, _this$_callHistoryOpt2, _this$_callHistoryOpt3, _this$_callHistoryOpt4, _this$_activityMatche;
    var _this;
    _classCallCheck(this, CallHistory);
    _this = _callSuper(this, CallHistory);
    _this._companyContacts = _companyContacts;
    _this._accountInfo = _accountInfo;
    _this._callLog = _callLog;
    _this._storage = _storage;
    _this._callMonitor = _callMonitor;
    _this._preInsertCall = _preInsertCall;
    _this._callingSettings = _callingSettings;
    _this._activityMatcher = _activityMatcher;
    _this._contactMatcher = _contactMatcher;
    _this._callHistoryOptions = _callHistoryOptions;
    _this._debouncedSearch = (0, _debounce["default"])(_this.callsSearch, 230, false);
    _this._minSearchStringLength = 3;
    _initializerDefineProperty(_this, "lastCheckTimeStamp", _descriptor, _this);
    _initializerDefineProperty(_this, "endedCalls", _descriptor2, _this);
    _initializerDefineProperty(_this, "searchInput", _descriptor3, _this);
    _initializerDefineProperty(_this, "filteredCalls", _descriptor4, _this);
    // The call logs which has been removed from remote
    // The marked telephonySessionId should not been added to ended calls afterwards.
    _initializerDefineProperty(_this, "markedList", _descriptor5, _this);
    _initializerDefineProperty(_this, "conferenceCallMapping", _descriptor6, _this);
    var enableCache = (_this$_callHistoryOpt = (_this$_callHistoryOpt2 = _this._callHistoryOptions) === null || _this$_callHistoryOpt2 === void 0 ? void 0 : _this$_callHistoryOpt2.enableCache) !== null && _this$_callHistoryOpt !== void 0 ? _this$_callHistoryOpt : true;
    if (enableCache) {
      _this._storage.enable(_this);
    }
    var enableContactMatchInCallHistory = (_this$_callHistoryOpt3 = (_this$_callHistoryOpt4 = _this._callHistoryOptions) === null || _this$_callHistoryOpt4 === void 0 ? void 0 : _this$_callHistoryOpt4.enableContactMatchInCallHistory) !== null && _this$_callHistoryOpt3 !== void 0 ? _this$_callHistoryOpt3 : true;
    if (enableContactMatchInCallHistory && _this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._callMonitor.ready && _this._callLog.ready && _this._accountInfo.ready;
        }
      });
    }
    (_this$_activityMatche = _this._activityMatcher) === null || _this$_activityMatche === void 0 ? void 0 : _this$_activityMatche.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.sessionIds;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._callMonitor.ready && _this._callLog.ready;
      }
    });
    return _this;
  }
  _inherits(CallHistory, _RcModule);
  return _createClass(CallHistory, [{
    key: "_updateLastCheckTimeStamp",
    value: function _updateLastCheckTimeStamp() {
      var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _dayjs["default"])().valueOf();
      this.lastCheckTimeStamp = timestamp;
    }
  }, {
    key: "updateLastCheckTimeStamp",
    value: function () {
      var _updateLastCheckTimeStamp2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var timestamp,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              timestamp = _args.length > 0 && _args[0] !== undefined ? _args[0] : (0, _dayjs["default"])().valueOf();
              this._updateLastCheckTimeStamp(timestamp);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function updateLastCheckTimeStamp() {
        return _updateLastCheckTimeStamp2.apply(this, arguments);
      }
      return updateLastCheckTimeStamp;
    }()
  }, {
    key: "setFilteredCalls",
    value: function setFilteredCalls() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.filteredCalls = data;
    }
  }, {
    key: "setSearchInput",
    value: function setSearchInput() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.searchInput = input;
    }
  }, {
    key: "updateEndCall",
    value: function updateEndCall(i, endedCalls) {
      Object.assign(this.endedCalls[i], _objectSpread(_objectSpread({}, endedCalls), {}, {
        __preinsert: true
      }));
    }
  }, {
    key: "setEndedCalls",
    value: function setEndedCalls(endedCalls, timestamp) {
      var _this2 = this;
      endedCalls.forEach(function (call) {
        var callWithDuration = _objectSpread(_objectSpread({}, call), {}, {
          duration: Math.floor((timestamp - call.startTime) / 1000),
          // mark the call is ended from preinsert
          __preinsert: true
        });
        var idx = _this2.endedCalls.findIndex(function (item) {
          return item.telephonySessionId === call.telephonySessionId;
        });
        if (idx > -1) {
          // replace old one if found
          _this2.endedCalls[idx] = callWithDuration;
        } else {
          _this2.endedCalls.push(callWithDuration);
        }
      });
    }
  }, {
    key: "removeEndedCalls",
    value: function removeEndedCalls(endedCalls) {
      this.overrideEndedCalls(this.endedCalls.filter(function (call) {
        return !(endedCalls.find(function (_ref) {
          var telephonySessionId = _ref.telephonySessionId;
          return telephonySessionId === call.telephonySessionId;
        }) ||
        // clean current overdue ended call (default clean time: 1day).
        Date.now() - call.startTime > DEFAULT_CLEAN_TIME);
      }));
    }
  }, {
    key: "removeExpiredEndedCalls",
    value: function removeExpiredEndedCalls() {
      this.overrideEndedCalls(this.endedCalls.filter(function (call) {
        return !(Date.now() - call.startTime > DEFAULT_CLEAN_TIME);
      }));
    }
  }, {
    key: "overrideEndedCalls",
    value: function overrideEndedCalls(calls) {
      var _this$endedCalls;
      (_this$endedCalls = this.endedCalls).splice.apply(_this$endedCalls, [0, this.endedCalls.length].concat(_toConsumableArray(calls)));
    }
  }, {
    key: "cleanEndedCalls",
    value: function cleanEndedCalls() {
      this.endedCalls = [];
    }
  }, {
    key: "removeAllEndedCalls",
    value: function removeAllEndedCalls() {
      this.endedCalls = [];
      this.markedList = [];
      this.markRemoved();
    }
  }, {
    key: "markRemoved",
    value: function markRemoved() {
      this.markedList = this.markedList.concat(this._callMonitor.allCalls);
    }
  }, {
    key: "addConferenceCallMapping",
    value: function addConferenceCallMapping(telephonySessionId) {
      this.conferenceCallMapping[telephonySessionId] = true;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this$_contactMatcher, _this$_callHistoryOpt5, _this$_activityMatche2;
      // the watchers are setup after CallLog is ready
      // this means the initial batch of call logs are already loaded when the watchers are set
      // so we need to trigger the match manually for those to be matched
      (_this$_contactMatcher = this._contactMatcher) === null || _this$_contactMatcher === void 0 ? void 0 : _this$_contactMatcher.triggerMatch({
        ignoreCache: !!((_this$_callHistoryOpt5 = this._callHistoryOptions) === null || _this$_callHistoryOpt5 === void 0 ? void 0 : _this$_callHistoryOpt5.contactMatchIgnoreCache)
      });
      (_this$_activityMatche2 = this._activityMatcher) === null || _this$_activityMatche2 === void 0 ? void 0 : _this$_activityMatche2.triggerMatch();
      this.removeExpiredEndedCalls();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;
      if (this._contactMatcher) {
        (0, _nextCore.watch)(this, function () {
          return [_this3.uniqueNumbers, _this3.ready];
        }, function () {
          if (_this3.ready && _this3._contactMatcher.ready) {
            _this3._contactMatcher.triggerMatch();
          }
        }, {
          multiple: true
        });
      }
      if (this._activityMatcher) {
        (0, _nextCore.watch)(this, function () {
          return _this3.sessionIds;
        }, function () {
          if (_this3.ready && _this3._activityMatcher.ready) {
            _this3._activityMatcher.triggerMatch();
          }
        });
      }
      (0, _nextCore.watch)(this, function () {
        return _this3._callMonitor.allCalls;
      }, function (newMonitorCalls, oldMonitorCalls) {
        if (!_this3.ready) return;

        // for save conference call info
        newMonitorCalls.forEach(function (call) {
          if (call.isConferenceCall && !_this3.conferenceCallMapping[call.telephonySessionId]) {
            _this3.addConferenceCallMapping(call.telephonySessionId);
          }
        });
        var endedCalls = (oldMonitorCalls || []).filter(function (call) {
          return !newMonitorCalls.find(function (currentCall) {
            return call.telephonySessionId === currentCall.telephonySessionId;
          }) &&
          // if the call's callLog has been fetch, skip
          !_this3._callLog.calls.find(function (currentCall) {
            return call.telephonySessionId === currentCall.telephonySessionId;
          }) &&
          // if delete all during active call
          !_this3.markedList.find(function (currentCall) {
            var flag = call.telephonySessionId === currentCall.telephonySessionId;
            return flag;
          });
        });
        if (endedCalls.length) {
          _this3.logger.log('self add end call list', endedCalls);
          _this3._addEndedCalls(endedCalls);
        }
      });
      (0, _nextCore.watch)(this,
      // use watch multiple, because this.ready is async, can't become true in time, so need watch this.ready, too
      function () {
        return [_this3._callLog.calls, _this3._callMonitor.allCalls, _this3.ready];
      }, function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 3),
          _ref3$ = _ref3[0],
          currentCalls = _ref3$ === void 0 ? [] : _ref3$,
          _ref3$2 = _ref3[1],
          activeCalls = _ref3$2 === void 0 ? [] : _ref3$2,
          ready = _ref3[2];
        if (!ready) return;
        var ids = {};
        currentCalls.forEach(function (call) {
          ids[call.telephonySessionId] = true;
        });
        // if a callQueue call has been ignored, it will be added to endedCalls, when it comes back again, need to remove this from endedCalls
        activeCalls.forEach(function (call) {
          ids[call.telephonySessionId] = true;
        });
        var shouldRemovedCalls = _this3.endedCalls.filter(function (call) {
          return ids[call.telephonySessionId];
        });
        if (shouldRemovedCalls.length) {
          _this3.removeEndedCalls(shouldRemovedCalls);
        }
      }, {
        multiple: true
      });
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        this.listenEndedCallsAnsweredElsewhere(this._callMonitor);
      }
    }
  }, {
    key: "listenEndedCallsAnsweredElsewhere",
    value: function listenEndedCallsAnsweredElsewhere(_callMonitor) {
      var _this4 = this;
      (0, _nextCore.fromWatchValue)(this, function () {
        return _this4.endedCalls;
      }).pipe((0, _rxjs.switchMap)(function (endedCalls) {
        var obsList$ = endedCalls.map(function (call, index) {
          var telephonySessionId = call.telephonySessionId,
            callQueueName = call.callQueueName;
          if (!callQueueName || call.delegate) return _rxjs.EMPTY;
          return (0, _rxjs.merge)(_callMonitor.fromCallAnsweredElsewhere(telephonySessionId).pipe((0, _rxjs.map)(function (data) {
            _this4.logger.log('CallAnsweredElsewhere', data);
            var representedBy = data.representedBy;
            var extensionId = representedBy.extensionId;
            return {
              result: 'Answered Elsewhere',
              delegate: {
                id: extensionId,
                name: _this4.getMatchedContactName(extensionId)
              }
            };
          })), _callMonitor.fromMissedCalls(telephonySessionId).pipe((0, _rxjs.map)(function (data) {
            _this4.logger.log('MissedCalls', data);
            return {
              result: 'Missed'
            };
          }))).pipe((0, _rxjs.tap)(function (data) {
            _this4.updateEndCall(index, data);
          }));
        });
        return _rxjs.merge.apply(void 0, _toConsumableArray(obsList$));
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "getMatchedContactName",
    value: function getMatchedContactName(extensionId) {
      var matchedCompanyContact = this._companyContacts.allContactsMap[extensionId];
      return matchedCompanyContact ? "".concat(matchedCompanyContact.firstName, " ").concat(matchedCompanyContact.lastName) : '';
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.setSearchInput('');
      this.cleanEndedCalls();
    }
  }, {
    key: "_addEndedCalls",
    value: function _addEndedCalls(endedCalls) {
      var _this5 = this;
      endedCalls.forEach(function (call) {
        if (process.env.THEME_SYSTEM === 'spring-ui') {
          // when that is queue call, set as Answered Elsewhere
          if ((0, _ActiveCallControl.isQueueCall)(call) && (0, _ActiveCallControl.isProceeding)(call.telephonySession)) {
            call.result = 'Ringing Elsewhere';
            call.delegationType = 'QueueForwarding';
          } else if (_this5._preInsertCall.isPreinsertStatusIgnored(call.telephonySessionId)) {
            call.result = 'Missed';
          } else {
            call.result = 'Disconnected';
            call.isRecording = false;
            call.warmTransferInfo = undefined;
          }
        } else {
          call.result = 'Disconnected';
          call.isRecording = false;
          call.warmTransferInfo = undefined;
        }
      });
      this.setEndedCalls(endedCalls, Date.now());
      this._callLog.sync();
    }

    // TODO: move to UI module
    // for track click to sms in call history
  }, {
    key: "onClickToSMS",
    value: function () {
      var _onClickToSMS = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      function onClickToSMS() {
        return _onClickToSMS.apply(this, arguments);
      }
      return onClickToSMS;
    }() // TODO: move to UI module
    // for track click to call in call history
  }, {
    key: "onClickToCall",
    value: function () {
      var _onClickToCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      function onClickToCall() {
        return _onClickToCall.apply(this, arguments);
      }
      return onClickToCall;
    }()
  }, {
    key: "updateSearchInput",
    value: function () {
      var _updateSearchInput = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(input) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.setSearchInput(input);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function updateSearchInput(_x) {
        return _updateSearchInput.apply(this, arguments);
      }
      return updateSearchInput;
    }()
  }, {
    key: "normalizedCalls",
    get: function get() {
      var _this6 = this;
      return this._callLog.calls.map(function (call) {
        var callFrom = _objectSpread({}, call.from);
        if (callFrom.phoneNumber) {
          callFrom.phoneNumber = (0, _normalizeNumber.normalizeNumber)({
            phoneNumber: callFrom.phoneNumber,
            countryCode: _this6._accountInfo.countryCode,
            maxExtensionLength: _this6._accountInfo.maxExtensionNumberLength
          });
        }
        var callTo = _objectSpread({}, call.to);
        if (callTo.phoneNumber) {
          callTo.phoneNumber = (0, _normalizeNumber.normalizeNumber)({
            phoneNumber: callTo.phoneNumber,
            countryCode: _this6._accountInfo.countryCode,
            maxExtensionLength: _this6._accountInfo.maxExtensionNumberLength
          });
        }
        var conferenceCallProps = {};
        if (_this6.conferenceCallMapping[call.telephonySessionId]) {
          conferenceCallProps.sessionId = call.telephonySessionId;
          conferenceCallProps.isConferenceCall = true;
        }
        return _objectSpread(_objectSpread(_objectSpread({}, call), conferenceCallProps), {}, {
          from: callFrom,
          to: callTo
        });
      }).sort(_callLogHelpers.sortByStartTime);
    }
  }, {
    key: "enableFullPhoneNumberMatch",
    get: function get() {
      var _this$_callHistoryOpt6, _this$_callHistoryOpt7;
      return (_this$_callHistoryOpt6 = (_this$_callHistoryOpt7 = this._callHistoryOptions) === null || _this$_callHistoryOpt7 === void 0 ? void 0 : _this$_callHistoryOpt7.enableFullPhoneNumberMatch) !== null && _this$_callHistoryOpt6 !== void 0 ? _this$_callHistoryOpt6 : false;
    }

    /**
     * Allow sub class to have different find matches logic.
     * @param contactMapping
     * @param call
     * @returns
     */
  }, {
    key: "findMatches",
    value: function findMatches(contactMapping, call) {
      var pickNumber = this.enableFullPhoneNumberMatch ? _callHistoryHelper.pickFullPhoneNumber : _callHistoryHelper.pickPhoneOrExtensionNumber;
      var fromNumber = call.from && pickNumber(call.from.phoneNumber, call.from.extensionNumber);
      var toNumber = call.to && pickNumber(call.to.phoneNumber, call.to.extensionNumber);
      var fromMatches = fromNumber && contactMapping[fromNumber] || [];
      var toMatches = toNumber && contactMapping[toNumber] || [];
      return {
        fromMatches: fromMatches,
        toMatches: toMatches
      };
    }
  }, {
    key: "callsInfo",
    get: function get() {
      var _this$_contactMatcher2,
        _this$_contactMatcher3,
        _this$_activityMatche3,
        _this$_activityMatche4,
        _this$_callMonitor$ca,
        _this7 = this;
      var acc = {
        sessionIds: [],
        telephonySessionIds: [],
        map: {},
        telephonySessionIdCallMap: {},
        calls: []
      };
      var contactMapping = (_this$_contactMatcher2 = (_this$_contactMatcher3 = this._contactMatcher) === null || _this$_contactMatcher3 === void 0 ? void 0 : _this$_contactMatcher3.dataMapping) !== null && _this$_contactMatcher2 !== void 0 ? _this$_contactMatcher2 : {};
      var activityMapping = (_this$_activityMatche3 = (_this$_activityMatche4 = this._activityMatcher) === null || _this$_activityMatche4 === void 0 ? void 0 : _this$_activityMatche4.dataMapping) !== null && _this$_activityMatche3 !== void 0 ? _this$_activityMatche3 : {};
      var callMatched = (_this$_callMonitor$ca = this._callMonitor.callMatched) !== null && _this$_callMonitor$ca !== void 0 ? _this$_callMonitor$ca : {};
      var telephonySessionIds = {};
      var calls = this.normalizedCalls.map(function (call) {
        telephonySessionIds[call.telephonySessionId] = true;
        var fromName = call.from.name || call.from.phoneNumber;
        var toName = call.to.name || call.to.phoneNumber;
        var _this7$findMatches = _this7.findMatches(contactMapping, call),
          fromMatches = _this7$findMatches.fromMatches,
          toMatches = _this7$findMatches.toMatches;
        var activityMatches = activityMapping[call.sessionId] || [];
        var matched = callMatched[call.sessionId];
        var item = _objectSpread(_objectSpread({}, call), {}, {
          fromName: fromName,
          toName: toName,
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMatches,
          toNumberEntity: matched
        });
        acc.sessionIds.push(call.sessionId);
        acc.telephonySessionIds.push(call.telephonySessionId);
        acc.map[call.sessionId] = item;
        acc.telephonySessionIdCallMap[call.telephonySessionId] = item;
        return item;
      });
      var filteredEndedCalls = this.endedCalls.filter(function (call) {
        return !telephonySessionIds[call.telephonySessionId];
      }).map(function (call) {
        var activityMatches = activityMapping[call.sessionId] || [];
        var fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        var toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        var item = _objectSpread(_objectSpread({}, call), {}, {
          activityMatches: activityMatches,
          fromMatches: fromMatches,
          toMatches: toMatches
        });
        acc.sessionIds.push(call.sessionId);
        acc.telephonySessionIds.push(call.telephonySessionId);
        acc.map[call.sessionId] = item;
        acc.telephonySessionIdCallMap[call.telephonySessionId] = item;
        return item;
      });
      var result = [].concat(_toConsumableArray(filteredEndedCalls), _toConsumableArray(calls)).sort(_callLogHelpers.sortByStartTime);
      acc.calls = result;
      return acc;
    }
  }, {
    key: "calls",
    get: function get() {
      return this.callsInfo.calls;
    }

    /**
     * the history all calls include the calls from callMonitor and the calls from callHistory, means all the call that user ever have or processing
     */
  }, {
    key: "allCalls",
    get: function get() {
      return [].concat(_toConsumableArray(this._callMonitor.allCalls), _toConsumableArray(this.calls));
    }

    /**
     * the history all calls include the calls from callMonitor and the calls from callHistory, means all the call that user ever have or processing
     */
  }, {
    key: "allCallsMap",
    get: function get() {
      return _objectSpread(_objectSpread({}, this._callMonitor.callsInfo.map), this.callsInfo.map);
    }

    /**
     * the history all calls include the calls from callMonitor and the calls from callHistory, means all the call that user ever have or processing
     */
  }, {
    key: "allCallsTelephonySessionIdMap",
    get: function get() {
      return _objectSpread(_objectSpread({}, this._callMonitor.callsInfo.telephonySessionIdCallMap), this.callsInfo.telephonySessionIdCallMap);
    }

    /**
     * the history all calls include the calls from callMonitor and the calls from callHistory, means all the call that user ever have or processing
     */
  }, {
    key: "allCallsTelephonySessionId",
    get: function get() {
      return [].concat(_toConsumableArray(this._callMonitor.callsInfo.telephonySessionIds), _toConsumableArray(this.callsInfo.telephonySessionIds));
    }
  }, {
    key: "getHistoryCallBySessionId",
    value: function getHistoryCallBySessionId(sessionId) {
      return this.callsInfo.map[sessionId];
    }
  }, {
    key: "getCallBySessionId",
    value: function getCallBySessionId(sessionId) {
      return this.allCallsMap[sessionId];
    }
  }, {
    key: "getCallByTelephonySessionId",
    value: function getCallByTelephonySessionId(telephonySessionId) {
      return this.allCallsTelephonySessionIdMap[telephonySessionId];
    }
  }, {
    key: "debouncedSearch",
    value: function () {
      var _debouncedSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this$_debouncedSearc;
        var _len,
          args,
          _key,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              for (_len = _args5.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args5[_key];
              }
              (_this$_debouncedSearc = this._debouncedSearch).call.apply(_this$_debouncedSearc, [this].concat(args));
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function debouncedSearch() {
        return _debouncedSearch.apply(this, arguments);
      }
      return debouncedSearch;
    }()
  }, {
    key: "callsSearch",
    value: function () {
      var _callsSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var calls, searchInput, searchResult;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(this.searchInput === '')) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              calls = this.calls;
              searchInput = this.searchInput;
              searchResult = this.doSearch(calls, searchInput);
              this.setFilteredCalls(searchResult);
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function callsSearch() {
        return _callsSearch.apply(this, arguments);
      }
      return callsSearch;
    }()
  }, {
    key: "doSearch",
    value: function doSearch(calls, searchInput) {
      var effectSearchStr = searchInput.toLowerCase().trim();
      if (!effectSearchStr || effectSearchStr.length < this._minSearchStringLength) {
        return calls;
      }
      return calls.filter(function (call) {
        var _call$from, _call$to;
        var _getPhoneNumberMatche = (0, _callLogHelpers.getPhoneNumberMatches)(call),
          phoneNumber = _getPhoneNumberMatche.phoneNumber,
          matches = _getPhoneNumberMatche.matches;
        var matchesMatched = matches.some(function (entities) {
          if (!entities || !entities.id) return false;
          if (entities.name && entities.name.toLowerCase().indexOf(effectSearchStr) > -1) return true;
          if (entities.phone && entities.phone.indexOf(effectSearchStr) > -1) return true;
          return false;
        });
        if (matchesMatched) {
          return true;
        }
        if (phoneNumber && phoneNumber.indexOf(effectSearchStr) > -1) {
          return true;
        }

        // search the from/to (besides the contact match data) info shown in the list
        var callerName = call.direction === 'Inbound' ? (_call$from = call.from) === null || _call$from === void 0 ? void 0 : _call$from.name : (_call$to = call.to) === null || _call$to === void 0 ? void 0 : _call$to.name;
        if (callerName && callerName.toLowerCase().indexOf(effectSearchStr) > -1) {
          return true;
        }
        return false;
      }).sort(_callLogHelpers.sortByStartTime);
    }
  }, {
    key: "latestCalls",
    get: function get() {
      var _this$_activityMatche5,
        _this8 = this;
      if ((_this$_activityMatche5 = this._activityMatcher) === null || _this$_activityMatche5 === void 0 ? void 0 : _this$_activityMatche5.dataMapping) {
        var newCalls = this.filterCalls.map(function (call) {
          var _this8$_activityMatch;
          return _objectSpread(_objectSpread({}, call), {}, {
            activityMatches: ((_this8$_activityMatch = _this8._activityMatcher) === null || _this8$_activityMatch === void 0 ? void 0 : _this8$_activityMatch.dataMapping[call.sessionId]) || []
          });
        });
        return newCalls;
      }
      return this.filterCalls;
    }
  }, {
    key: "latestCallsInfo",
    get: function get() {
      var telephonySessionIdMap = new Map();
      var preinsertTelephonySessionIdMap = new Map();
      this.latestCalls.forEach(function (history) {
        var telephonySessionId = history.telephonySessionId;
        if (history.__preinsert) {
          preinsertTelephonySessionIdMap.set(telephonySessionId, history);
        } else {
          telephonySessionIdMap.set(telephonySessionId, history);
        }
      });
      return {
        preinsertTelephonySessionIdMap: preinsertTelephonySessionIdMap,
        telephonySessionIdMap: telephonySessionIdMap
      };
    }
  }, {
    key: "uniqueNumbers",
    get: function get() {
      var output = [];
      var numberMap = {};
      this.normalizedCalls.forEach((0, _callHistoryHelper.addNumbersFromCall)(output, numberMap, this.enableFullPhoneNumberMatch));
      this.endedCalls.forEach((0, _callHistoryHelper.addNumbersFromCall)(output, numberMap, this.enableFullPhoneNumberMatch));
      return output;
    }
  }, {
    key: "sessionIds",
    get: function get() {
      var sessionIds = {};
      return this.normalizedCalls.map(function (call) {
        sessionIds[call.sessionId] = true;
        return call.sessionId;
      }).concat(this.endedCalls.filter(function (call) {
        return !sessionIds[call.sessionId];
      }).map(function (call) {
        return call.sessionId;
      }));
    }
  }, {
    key: "filterCalls",
    get: function get() {
      if (this.searchInput === '') {
        return this.calls;
      }
      return this.filteredCalls;
    }
  }, {
    key: "missedCallsUnreadCounts",
    get: function get() {
      var _this9 = this;
      return this.calls.filter(function (call) {
        return (call.result === _callResults.callResults.missed || call.result === _callResults.callResults.voicemail) && call.startTime && call.startTime > _this9.lastCheckTimeStamp;
      }).length;
    }

    /**
     * get history by `telephonySessionId`
     *
     * when call end will preinsert the end call data into the `endedCalls`, and wait data `synced` from backend, the primary key be `telephonySessionId`, you can know the data source from the `preinsert` field, synced data will not have this field.
     */
  }, {
    key: "getHistoryByTelephonySessionId",
    value: function getHistoryByTelephonySessionId(telephonySessionId) {
      if (!telephonySessionId) return undefined;
      return this.latestCallsInfo.telephonySessionIdMap.get(telephonySessionId) || this.latestCallsInfo.preinsertTelephonySessionIdMap.get(telephonySessionId);
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "lastCheckTimeStamp", [_nextCore.storage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return (0, _dayjs["default"])().valueOf();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "endedCalls", [_nextCore.storage, _nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "searchInput", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "filteredCalls", [_nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateLastCheckTimeStamp", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateLastCheckTimeStamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateLastCheckTimeStamp", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "updateLastCheckTimeStamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFilteredCalls", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "setFilteredCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSearchInput", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateEndCall", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "updateEndCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setEndedCalls", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "setEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "overrideEndedCalls", [_nextCore.action, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "overrideEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanEndedCalls", [_nextCore.action, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanEndedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAllEndedCalls", [_nextCore.action, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAllEndedCalls"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "markedList", [_nextCore.storage, _nextCore.state, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "markRemoved", [_nextCore.action, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "markRemoved"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "conferenceCallMapping", [_nextCore.userStorage, _nextCore.state, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "addConferenceCallMapping", [_nextCore.action, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "addConferenceCallMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToSMS", [_dec33, _dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCall", [_dec37, _dec38, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSearchInput", [_dec41, _dec42, _dec43], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalizedCalls", [_dec44, _dec45, _dec46], Object.getOwnPropertyDescriptor(_class2.prototype, "normalizedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsInfo", [_nextCore.computed, _dec47, _dec48], Object.getOwnPropertyDescriptor(_class2.prototype, "callsInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCalls", [_nextCore.computed, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "allCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsMap", [_nextCore.computed, _dec51, _dec52], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsTelephonySessionIdMap", [_nextCore.computed, _dec53, _dec54], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsTelephonySessionIdMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsTelephonySessionId", [_nextCore.computed, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsTelephonySessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "debouncedSearch", [_dec57, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "debouncedSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsSearch", [_dec60, _dec61, _dec62], Object.getOwnPropertyDescriptor(_class2.prototype, "callsSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "latestCalls", [_nextCore.computed, _dec63, _dec64], Object.getOwnPropertyDescriptor(_class2.prototype, "latestCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "latestCallsInfo", [_nextCore.computed, _dec65, _dec66], Object.getOwnPropertyDescriptor(_class2.prototype, "latestCallsInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_dec67, _dec68, _dec69], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIds", [_dec70, _dec71, _dec72], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterCalls", [_dec73, _dec74, _dec75], Object.getOwnPropertyDescriptor(_class2.prototype, "filterCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "missedCallsUnreadCounts", [_nextCore.computed, _dec76, _dec77], Object.getOwnPropertyDescriptor(_class2.prototype, "missedCallsUnreadCounts"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallHistory.js.map
