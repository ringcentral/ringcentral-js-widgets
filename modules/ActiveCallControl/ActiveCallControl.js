"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
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
exports.ActiveCallControl = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.from-entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _ringcentralCall = require("ringcentral-call");
var _Session = require("ringcentral-call-control/lib/Session");
var _Session2 = require("ringcentral-call/lib/Session");
var _uuid = require("uuid");
var _callDirections = require("../../enums/callDirections");
var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));
var _trackEvents = require("../../enums/trackEvents");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _validateNumbers = require("../../lib/validateNumbers");
var _callErrors = require("../Call/callErrors");
var _sessionStatus = require("../Webphone/sessionStatus");
var _webphoneErrors = require("../Webphone/webphoneErrors");
var _webphoneHelper = require("../Webphone/webphoneHelper");
var _callControlError = require("./callControlError");
var _helpers = require("./helpers");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6; // eslint-disable-next-line import/no-named-as-default
// TODO: should move that callErrors to enums
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var DEFAULT_BUSY_TIMEOUT = 3 * 1000;
var telephonySessionsEndPoint = /\/telephony\/sessions$/;
var subscribeEvent = _subscriptionFilters["default"].telephonySessions;
var ActiveCallControl = exports.ActiveCallControl = (_dec = (0, _di.Module)({
  name: 'ActiveCallControl',
  deps: ['Auth', 'Alert', 'Brand', 'Client', 'Presence', 'AccountInfo', 'Subscription', 'ExtensionInfo', 'NumberValidate', 'RegionSettings', 'ConnectivityMonitor', 'AppFeatures', {
    dep: 'Prefix',
    optional: true
  }, {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'AudioSettings',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'ActiveCallControlOptions',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.mute)];
}), _dec3 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.unmute)];
}), _dec4 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.record)];
}), _dec5 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.stopRecord)];
}), _dec6 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.hangup)];
}), _dec7 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.voicemail)];
}), _dec8 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.confirmSwitch)];
}), _dec9 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.hold)];
}), _dec0 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.unhold)];
}), _dec1 = (0, _core.track)(function (_, params) {
  return [_trackEvents.trackEvents.executionReplyWithMessage, {
    'message type': params.replyWithPattern ? 'Pattern' : 'Custom'
  }];
}), _dec10 = (0, _core.track)(_trackEvents.trackEvents.transfer), _dec11 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.confirmForward)];
}), _dec12 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.answer)];
}), _dec13 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.holdAndAnswer)];
}), _dec14 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.ignore)];
}), _dec15 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.endAndAnswer)];
}), _dec16 = (0, _core.computed)(function (_ref) {
  var activeSessionId = _ref.activeSessionId,
    activeSessions = _ref.activeSessions;
  return [activeSessionId, activeSessions];
}), _dec17 = (0, _core.computed)(function (_ref2) {
  var ringSessionId = _ref2.ringSessionId,
    activeSessions = _ref2.activeSessions;
  return [ringSessionId, activeSessions];
}), _dec18 = (0, _core.computed)(function (_ref3) {
  var sessions = _ref3.sessions;
  return [sessions];
}), _dec19 = (0, _core.computed)(function (that) {
  return [that.sessions, that.timestamp];
}), _dec20 = (0, _core.computed)(function (that) {
  return [that._deps.presence.calls];
}), _dec21 = (0, _core.track)(_trackEvents.trackEvents.inboundWebRTCCallConnected), _dec22 = (0, _core.track)(_trackEvents.trackEvents.dialpadOpen), _dec23 = (0, _core.track)(_trackEvents.trackEvents.dialpadClose), _dec24 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.clickTransfer)];
}), _dec25 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.forward)];
}), _dec26 = (0, _core.track)(function (that, path) {
  return function (analytics) {
    // @ts-expect-error TS(2339): Property 'getTrackTarget' does not exist on type '... Remove this comment to see the full error message
    var target = analytics.getTrackTarget();
    return [_trackEvents.trackEvents.openEntityDetailLink, {
      path: path || target.router
    }];
  };
}), _dec27 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents["switch"])];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function ActiveCallControl(deps) {
    var _deps$activeCallContr, _deps$activeCallContr2, _this$_deps$activeCal, _this$_deps$activeCal2, _this$_deps$activeCal3, _this$_deps$activeCal4, _this$_deps$activeCal5, _this$_deps$activeCal6, _this$_deps$activeCal7, _this$_deps$activeCal8, _this$_deps$activeCal9, _this$_deps$activeCal0;
    var _this;
    _classCallCheck(this, ActiveCallControl);
    _this = _callSuper(this, ActiveCallControl, [{
      deps: deps,
      enableCache: (_deps$activeCallContr = (_deps$activeCallContr2 = deps.activeCallControlOptions) === null || _deps$activeCallContr2 === void 0 ? void 0 : _deps$activeCallContr2.enableCache) !== null && _deps$activeCallContr !== void 0 ? _deps$activeCallContr : true,
      storageKey: 'activeCallControl'
    }]);
    _this._onCallEndFunc = void 0;
    _this._onCallSwitchedFunc = void 0;
    _this.onCallIgnoreFunc = void 0;
    _this._connectivity = false;
    _this._timeoutId = null;
    _this._lastSubscriptionMessage = null;
    _this._activeSession = void 0;
    _this._ttl = (_this$_deps$activeCal = (_this$_deps$activeCal2 = _this._deps.activeCallControlOptions) === null || _this$_deps$activeCal2 === void 0 ? void 0 : _this$_deps$activeCal2.ttl) !== null && _this$_deps$activeCal !== void 0 ? _this$_deps$activeCal : DEFAULT_TTL;
    _this._timeToRetry = (_this$_deps$activeCal3 = (_this$_deps$activeCal4 = _this._deps.activeCallControlOptions) === null || _this$_deps$activeCal4 === void 0 ? void 0 : _this$_deps$activeCal4.timeToRetry) !== null && _this$_deps$activeCal3 !== void 0 ? _this$_deps$activeCal3 : DEFAULT_TIME_TO_RETRY;
    _this._polling = (_this$_deps$activeCal5 = (_this$_deps$activeCal6 = _this._deps.activeCallControlOptions) === null || _this$_deps$activeCal6 === void 0 ? void 0 : _this$_deps$activeCal6.polling) !== null && _this$_deps$activeCal5 !== void 0 ? _this$_deps$activeCal5 : false;
    _this._promise = null;
    _this._rcCall = null;
    _this._permissionCheck = (_this$_deps$activeCal7 = (_this$_deps$activeCal8 = _this._deps.activeCallControlOptions) === null || _this$_deps$activeCal8 === void 0 ? void 0 : _this$_deps$activeCal8.permissionCheck) !== null && _this$_deps$activeCal7 !== void 0 ? _this$_deps$activeCal7 : true;
    _this._enableAutoSwitchFeature = (_this$_deps$activeCal9 = (_this$_deps$activeCal0 = _this._deps.activeCallControlOptions) === null || _this$_deps$activeCal0 === void 0 ? void 0 : _this$_deps$activeCal0.enableAutoSwitchFeature) !== null && _this$_deps$activeCal9 !== void 0 ? _this$_deps$activeCal9 : false;
    _this._autoMergeSignCallIdKey = "".concat(_this._deps.prefix, "-auto-merge-sign-call-id-key");
    _this._autoMergeCallsKey = "".concat(_this._deps.prefix, "-auto-merge-calls-key");
    _this._autoMergeWebphoneSessionsMap = new Map();
    _initializerDefineProperty(_this, "pickUpCallDataMap", _descriptor, _this);
    _initializerDefineProperty(_this, "transferCallMapping", _descriptor2, _this);
    _initializerDefineProperty(_this, "data", _descriptor3, _this);
    _initializerDefineProperty(_this, "currentDeviceCallsMap", _descriptor4, _this);
    _initializerDefineProperty(_this, "lastEndedSessionIds", _descriptor5, _this);
    // TODO: conference call using
    _initializerDefineProperty(_this, "cachedSessions", _descriptor6, _this);
    _this._onSessionDisconnected = function () {
      var _this$_deps$tabManage;
      _this.updateActiveSessions();
      if (!_this._deps.tabManager || ((_this$_deps$tabManage = _this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.active)) {
        _this.cleanCurrentWarmTransferData();
      }
    };
    _this._updateSessionsStatusHandler = function (_ref4) {
      var status = _ref4.status,
        telephonySessionId = _ref4.telephonySessionId;
      _this.updateActiveSessions();
      if (status === _Session.PartyStatusCode.answered && _this.activeSessionId !== telephonySessionId) {
        _this.setActiveSessionId(telephonySessionId);
      }
    };
    _this._updateSessionsHandler = function () {
      _this.updateActiveSessions();
    };
    _this._deps.subscription.register(_this, {
      filters: [subscribeEvent]
    });
    return _this;
  }
  _inherits(ActiveCallControl, _RcModuleV);
  return _createClass(ActiveCallControl, [{
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (this.ready && this.hasPermission) {
                this._subscriptionHandler();
                this._checkConnectivity();
              }
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "_initModule",
    value: function () {
      var _initModule2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._createOtherInstanceListener();
              _context2.n = 1;
              return _superPropGet(ActiveCallControl, "_initModule", this, 3)([]);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _initModule() {
        return _initModule2.apply(this, arguments);
      }
      return _initModule;
    }()
  }, {
    key: "_createOtherInstanceListener",
    value: function _createOtherInstanceListener() {
      var _this2 = this;
      if (!this._deps.tabManager || !this._enableAutoSwitchFeature) {
        return;
      }
      window.addEventListener('storage', function (e) {
        _this2._onStorageChangeEvent(e);
      });
    }
  }, {
    key: "_onStorageChangeEvent",
    value: function _onStorageChangeEvent(e) {
      switch (e.key) {
        case this._autoMergeSignCallIdKey:
          this._triggerCurrentClientAutoMerge(e);
          break;
        case this._autoMergeCallsKey:
          this._autoMergeCallsHandler(e);
          break;
        default:
          break;
      }
    }
  }, {
    key: "_triggerCurrentClientAutoMerge",
    value: function _triggerCurrentClientAutoMerge(e) {
      try {
        var _JSON$parse = JSON.parse(e.newValue),
          telephoneSessionId = _JSON$parse.telephoneSessionId;
        var ids = this.rcCallSessions.filter(function (s) {
          return !(0, _helpers.isRinging)(s) && !!s.webphoneSession && s.telephonySessionId !== telephoneSessionId;
        }).map(function (s) {
          return s.telephonySessionId;
        });
        var id = (0, _uuid.v4)();
        var data = {
          id: id,
          ids: ids
        };
        if (ids.length) {
          localStorage.setItem(this._autoMergeCallsKey, JSON.stringify(data));
        }
      } catch (err) {
        console.log('AutoMerge sign event parse error');
      }
    }
  }, {
    key: "_autoMergeCallsHandler",
    value: function () {
      var _autoMergeCallsHandler2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(e) {
        var _this$_deps$tabManage2,
          _this3 = this;
        var _JSON$parse2, ids, response, data, activeCalls, callsList, _t;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if ((_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              _context5.p = 1;
              _JSON$parse2 = JSON.parse(e.newValue), ids = _JSON$parse2.ids;
              _context5.n = 2;
              return this._deps.client.service.platform().get(_subscriptionFilters["default"].detailedPresence);
            case 2:
              response = _context5.v;
              _context5.n = 3;
              return response.json();
            case 3:
              data = _context5.v;
              activeCalls = data.activeCalls;
              callsList = ids
              // filter calls which are already in current instance.
              .filter(function (id) {
                return _this3.sessions.find(function (item) {
                  return item.telephonySessionId === id && !!item.telephonySession && !(0, _ramda.isEmpty)(item.telephonySession);
                });
              })
              // transfer id to ActiveCallInfo.
              .reduce(function (acc, telephonySessionId) {
                var activeCall = activeCalls.find(function (call) {
                  return call.telephonySessionId === telephonySessionId;
                });
                if (!activeCall) {
                  console.log("Auto Switch failed with telephonySessionId ".concat(telephonySessionId));
                  return acc;
                }
                acc.push(activeCall);
                return acc;
              }, []);
              if (!callsList.length) {
                _context5.n = 4;
                break;
              }
              _context5.n = 4;
              return Promise.all(callsList.map(/*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(activeCall) {
                  var switchSession;
                  return _regenerator().w(function (_context4) {
                    while (1) switch (_context4.n) {
                      case 0:
                        _context4.n = 1;
                        return _this3.transferUnmuteHandler(activeCall.telephonySessionId);
                      case 1:
                        switchSession = _this3._rcCall.switchCallFromActiveCall(activeCall, {
                          homeCountryId: _this3._deps.regionSettings.homeCountryId
                        });
                        _this3._autoMergeWebphoneSessionsMap.set(switchSession.webphoneSession, true);
                        switchSession.webphoneSession.mute();
                        switchSession.webphoneSession.once('accepted', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
                          return _regenerator().w(function (_context3) {
                            while (1) switch (_context3.n) {
                              case 0:
                                switchSession.webphoneSession.unmute();
                                _context3.n = 1;
                                return switchSession.webphoneSession.hold();
                              case 1:
                                _this3._addTrackToActiveSession();
                              case 2:
                                return _context3.a(2);
                            }
                          }, _callee3);
                        })));
                      case 2:
                        return _context4.a(2);
                    }
                  }, _callee4);
                }));
                return function (_x2) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 4:
              _context5.n = 6;
              break;
            case 5:
              _context5.p = 5;
              _t = _context5.v;
              console.log(_t);
              console.log('auto merge calls from other tabs failed');
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 5]]);
      }));
      function _autoMergeCallsHandler(_x) {
        return _autoMergeCallsHandler2.apply(this, arguments);
      }
      return _autoMergeCallsHandler;
    }()
  }, {
    key: "_triggerAutoMergeEvent",
    value: function _triggerAutoMergeEvent(telephoneSessionId) {
      if (!this._deps.tabManager || !this._enableAutoSwitchFeature) return;
      var id = (0, _uuid.v4)();
      var data = {
        id: id,
        telephoneSessionId: telephoneSessionId
      };
      localStorage.setItem(this._autoMergeSignCallIdKey, JSON.stringify(data));
    }
  }, {
    key: "_addTrackToActiveSession",
    value: function _addTrackToActiveSession() {
      var telephonySessionId = this.activeSessionId;
      var activeRCCallSession = this.rcCallSessions.find(function (s) {
        return s.telephonySessionId === telephonySessionId;
      }) || this._activeSession;
      if (activeRCCallSession && activeRCCallSession.webphoneSession && this._deps.webphone) {
        var _this$_deps$webphone = this._deps.webphone,
          _remoteVideo = _this$_deps$webphone._remoteVideo,
          _localVideo = _this$_deps$webphone._localVideo;
        activeRCCallSession.webphoneSession.addTrack(_remoteVideo, _localVideo);
      }
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _t2;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (this.hasPermission) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              this._rcCall = this._initRcCall();
              if (!this._shouldFetch()) {
                _context6.n = 6;
                break;
              }
              _context6.p = 2;
              _context6.n = 3;
              return this.fetchData();
            case 3:
              _context6.n = 5;
              break;
            case 4:
              _context6.p = 4;
              _t2 = _context6.v;
              this._retry();
            case 5:
              _context6.n = 7;
              break;
            case 6:
              if (this._polling) {
                this._startPolling();
              } else {
                this._retry();
              }
            case 7:
              return _context6.a(2);
          }
        }, _callee6, this, [[2, 4]]);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "_initRcCall",
    value: function _initRcCall() {
      var _this$_deps$webphone2,
        _this4 = this,
        _rcCall$_callControl;
      var rcCall = new _ringcentralCall.RingCentralCall({
        sdk: this._deps.client.service,
        subscriptions: undefined,
        enableSubscriptionHander: false,
        callControlOptions: {
          preloadDevices: false,
          preloadSessions: false,
          extensionInfo: _objectSpread(_objectSpread({}, this._deps.extensionInfo.info), {}, {
            // TODO: add info type in 'AccountInfo'
            // @ts-expect-error TS(2322): Type 'GetAccountInfoResponse' is not assignable to... Remove this comment to see the full error message
            account: this._deps.accountInfo.info
          })
        },
        webphone: (_this$_deps$webphone2 = this._deps.webphone) === null || _this$_deps$webphone2 === void 0 ? void 0 : _this$_deps$webphone2._webphone
      });
      rcCall.on(_ringcentralCall.events.NEW, function (session) {
        _this4._newSessionHandler(session);
      });
      rcCall.on(_ringcentralCall.events.WEBPHONE_INVITE, function (session) {
        return _this4._onWebphoneInvite(session);
      });
      rcCall.on(_ringcentralCall.events.WEBPHONE_INVITE_SENT, function (session) {
        return _this4._onWebphoneInvite(session);
      });
      // TODO: workaround of bug:
      // WebRTC outbound call with wrong sequences of telephony sessions then call log section will not show
      // @ts-expect-error TS(2341): Property '_callControl' is private and only access... Remove this comment to see the full error message
      (_rcCall$_callControl = rcCall._callControl) === null || _rcCall$_callControl === void 0 ? void 0 : _rcCall$_callControl.on('new', function (session) {
        return _this4._onNewCall(session);
      });
      return rcCall;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this5 = this;
      if (this._deps.availabilityMonitor && this._deps.tabManager) {
        (0, _core.watch)(this, function () {
          return _this5.currentDeviceCallsMap;
        }, function () {
          var hasCallSession = Object.values(_this5.currentDeviceCallsMap).some(function (webphoneSession) {
            return !!webphoneSession;
          });
          var key = "acc-".concat(_this5._deps.tabManager.id);
          _this5._deps.availabilityMonitor.setSharedState(key, {
            hasCallSession: hasCallSession
          });
        });
      }
      if (this._deps.webphone) {
        (0, _core.watch)(this, function () {
          var _this5$_deps$webphone;
          return (_this5$_deps$webphone = _this5._deps.webphone) === null || _this5$_deps$webphone === void 0 ? void 0 : _this5$_deps$webphone.connected;
        }, function (newValue) {
          var _this5$_deps$webphone2;
          if (newValue && ((_this5$_deps$webphone2 = _this5._deps.webphone) === null || _this5$_deps$webphone2 === void 0 ? void 0 : _this5$_deps$webphone2._webphone)) {
            var _this5$_rcCall;
            (_this5$_rcCall = _this5._rcCall) === null || _this5$_rcCall === void 0 ? void 0 : _this5$_rcCall.setWebphone(_this5._deps.webphone._webphone);
          }
        });
        (0, _core.watch)(this, function () {
          return _this5.activeSessionId;
        }, function () {
          _this5._addTrackToActiveSession();
        });
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
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
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return !this._deps.tabManager || this._deps.tabManager.active;
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!this._promise) {
                this._promise = this._fetchData();
              }
              _context7.n = 1;
              return this._promise;
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
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
    key: "_subscriptionHandler",
    value: function _subscriptionHandler() {
      var message = this._deps.subscription.message;
      if (message &&
      // FIXME: is that object compare is fine, should confirm that?
      message !== this._lastSubscriptionMessage && message.event && telephonySessionsEndPoint.test(message.event) && message.body) {
        message = this._checkRingOutCallDirection(message);
        this._lastSubscriptionMessage = message;
        if (this._rcCall) {
          this._rcCall.onNotificationEvent(message);
        }
      }
    }

    // TODO: workaround of PLA bug: https://jira_domain/browse/PLA-52742, remove these code after PLA
    // fixed this bug
  }, {
    key: "_checkRingOutCallDirection",
    value: function _checkRingOutCallDirection(message) {
      var _body$origin;
      var body = message.body;
      var originType = body === null || body === void 0 ? void 0 : (_body$origin = body.origin) === null || _body$origin === void 0 ? void 0 : _body$origin.type;
      if (body && originType === 'RingOut') {
        var parties = body.parties;
        if (Array.isArray(parties) && parties.length) {
          (0, _ramda.forEach)(function (party) {
            if (party.ringOutRole && party.ringOutRole === 'Initiator' && party.direction === 'Inbound') {
              var tempFrom = _objectSpread({}, party.from);
              party.direction = 'Outbound';
              party.from = party.to;
              party.to = tempFrom;
            }
          }, parties);
        }
      }
      return message;
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this6 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this6._timeoutId = null;
        if (!_this6.timestamp || Date.now() - _this6.timestamp > _this6.ttl) {
          if (!_this6._deps.tabManager || _this6._deps.tabManager.active) {
            _this6.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this6._retry();
          }
        }
      }, t);
    }
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _t3;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this._syncData();
            case 1:
              if (this._polling) {
                this._startPolling();
              }
              this._promise = null;
              _context8.n = 3;
              break;
            case 2:
              _context8.p = 2;
              _t3 = _context8.v;
              this._promise = null;
              if (this._polling) {
                this._startPolling(this.timeToRetry);
              } else {
                this._retry();
              }
              throw _t3;
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 2]]);
      }));
      function _fetchData() {
        return _fetchData3.apply(this, arguments);
      }
      return _fetchData;
    }()
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this7 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();
      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        var _this7$_deps$tabManag;
        _this7._timeoutId = null;
        if (!_this7._deps.tabManager || ((_this7$_deps$tabManag = _this7._deps.tabManager) === null || _this7$_deps$tabManag === void 0 ? void 0 : _this7$_deps$tabManag.active)) {
          if (!_this7.timestamp || Date.now() - _this7.timestamp > _this7.ttl) {
            _this7.fetchData();
          } else {
            _this7._startPolling();
          }
        } else if (_this7.timestamp && Date.now() - _this7.timestamp < _this7.ttl) {
          _this7._startPolling();
        } else {
          _this7._startPolling(_this7.timeToRetry);
        }
      }, t);
    }
  }, {
    key: "_syncData",
    value: function () {
      var _syncData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _this8 = this;
        var activeCalls, _t4;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              activeCalls = this._deps.presence.calls;
              _context9.n = 1;
              return this._rcCall.loadSessions(activeCalls);
            case 1:
              this.updateActiveSessions();
              this._rcCall.sessions.forEach(function (session) {
                _this8._newSessionHandler(session);
              });
              _context9.n = 3;
              break;
            case 2:
              _context9.p = 2;
              _t4 = _context9.v;
              console.log('sync data error:', _t4);
              throw _t4;
            case 3:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 2]]);
      }));
      function _syncData() {
        return _syncData2.apply(this, arguments);
      }
      return _syncData;
    }()
  }, {
    key: "_onNewCall",
    value: function () {
      var _onNewCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(session) {
        var ringSession, sessionId;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              this.updateActiveSessions();
              ringSession = (0, _ramda.find)(function (x) {
                return (0, _helpers.isRinging)(x) && x.id === session.id;
              }, this.sessions);
              sessionId = ringSession === null || ringSession === void 0 ? void 0 : ringSession.id;
              this._setRingSessionId(sessionId);
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function _onNewCall(_x3) {
        return _onNewCall2.apply(this, arguments);
      }
      return _onNewCall;
    }()
  }, {
    key: "_onCallAccepted",
    value: function _onCallAccepted(telephonySessionId) {
      if (this.ringSessionId === telephonySessionId) {
        var _this$ringSessions$;
        this.data.ringSessionId = ((_this$ringSessions$ = this.ringSessions[0]) === null || _this$ringSessions$ === void 0 ? void 0 : _this$ringSessions$.id) || null;
      }
    }
  }, {
    key: "_onCallEnd",
    value: function _onCallEnd(telephonySessionId) {
      if (this.ringSessionId === telephonySessionId) {
        var _this$ringSessions$2;
        this.data.ringSessionId = ((_this$ringSessions$2 = this.ringSessions[0]) === null || _this$ringSessions$2 === void 0 ? void 0 : _this$ringSessions$2.id) || null;
      }
    }
  }, {
    key: "updateActiveSessions",
    value: function updateActiveSessions() {
      var _this$_rcCall;
      var currentDeviceCallsMap = {};
      var callControlSessions = (((_this$_rcCall = this._rcCall) === null || _this$_rcCall === void 0 ? void 0 : _this$_rcCall.sessions) || []).filter(function (session) {
        return (0, _helpers.filterDisconnectedCalls)(session);
      }).map(function (session) {
        // @ts-expect-error TS(2322): Type 'NormalizedSession | undefined' is not assign... Remove this comment to see the full error message
        currentDeviceCallsMap[session.telephonySessionId] =
        // @ts-expect-error TS(2345): Argument of type 'WebPhoneSession' is not assignab... Remove this comment to see the full error message
        (0, _webphoneHelper.normalizeSession)(session.webphoneSession);
        return _objectSpread(_objectSpread({}, session.data), {}, {
          activeCallId: session.activeCallId,
          direction: session.direction,
          from: session.from,
          id: session.id,
          otherParties: session.otherParties,
          party: session.party || {},
          recordings: session.recordings,
          isRecording: (0, _helpers.isOnRecording)(session.recordings),
          sessionId: session.sessionId,
          startTime: session.startTime,
          status: session.status,
          telephonySessionId: session.telephonySessionId,
          telephonySession: (0, _helpers.normalizeTelephonySession)(session.telephonySession),
          to: session.to
        });
      });
      this._updateActiveSessions(currentDeviceCallsMap, callControlSessions.filter(function (x) {
        return !(0, _helpers.isGoneSession)(x);
      }));
    }
  }, {
    key: "_updateActiveSessions",
    value: function _updateActiveSessions(currentDeviceCallsMap, callControlSessions) {
      this.data.timestamp = Date.now();
      this.currentDeviceCallsMap = currentDeviceCallsMap;
      this.data.sessions = callControlSessions || [];
    }
  }, {
    key: "_newSessionHandler",
    value: function _newSessionHandler(session) {
      session.removeListener(_Session2.events.STATUS, this._updateSessionsStatusHandler);
      session.removeListener(_Session2.events.MUTED, this._updateSessionsHandler);
      session.removeListener(_Session2.events.RECORDINGS, this._updateSessionsHandler);
      session.removeListener(_Session2.events.DISCONNECTED, this._onSessionDisconnected);
      session.removeListener(_Session2.events.WEBPHONE_SESSION_CONNECTED, this._updateSessionsHandler);
      session.on(_Session2.events.STATUS, this._updateSessionsStatusHandler);
      session.on(_Session2.events.MUTED, this._updateSessionsHandler);
      session.on(_Session2.events.RECORDINGS, this._updateSessionsHandler);
      session.on(_Session2.events.DISCONNECTED, this._onSessionDisconnected);
      session.on(_Session2.events.WEBPHONE_SESSION_CONNECTED, this._updateSessionsHandler);
      // Handle the session update at the end of function to reduce the probability of empty rc call
      // sessions
      this._updateSessionsHandler();
    }
  }, {
    key: "removeActiveSession",
    value: function removeActiveSession() {
      this.data.activeSessionId = null;
    }

    // count it as load (should only call on container init step)
  }, {
    key: "setActiveSessionId",
    value: function setActiveSessionId(telephonySessionId) {
      if (!telephonySessionId) return;
      this.data.activeSessionId = telephonySessionId;
    }
  }, {
    key: "setLastEndedSessionIds",
    value: function setLastEndedSessionIds(session) {
      /**
       * don't add incoming call that isn't relied by current app
       *   to end sessions. this call can be answered by other apps
       */
      var normalizedWebphoneSession = (0, _webphoneHelper.normalizeSession)(session);
      if (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !normalizedWebphoneSession.startTime &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !normalizedWebphoneSession.isToVoicemail &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !normalizedWebphoneSession.isForwarded &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !normalizedWebphoneSession.isReplied) {
        return;
      }
      // @ts-expect-error TS(2339): Property 'partyData' does not exist on type 'Norma... Remove this comment to see the full error message
      var partyData = normalizedWebphoneSession.partyData;
      if (!partyData) return;
      if (this.lastEndedSessionIds.indexOf(partyData.sessionId) === -1) {
        this.lastEndedSessionIds = [partyData.sessionId].concat(this.lastEndedSessionIds).slice(0, 5);
      }
    }
  }, {
    key: "_checkConnectivity",
    value: function _checkConnectivity() {
      if (this._deps.connectivityMonitor && this._deps.connectivityMonitor.ready && this._connectivity !== this._deps.connectivityMonitor.connectivity) {
        this._connectivity = this._deps.connectivityMonitor.connectivity;
        if (this._connectivity) {
          this.fetchData();
        }
      }
    }
  }, {
    key: "_getTrackEventName",
    value: function _getTrackEventName(name) {
      var _this$_deps$routerInt, _callLogSection, _callLogSection2;
      // TODO: refactor to remove `this.parentModule`.
      var currentPath = (_this$_deps$routerInt = this._deps.routerInteraction) === null || _this$_deps$routerInt === void 0 ? void 0 : _this$_deps$routerInt.currentPath;
      var showCallLog = (_callLogSection = this.parentModule.callLogSection) === null || _callLogSection === void 0 ? void 0 : _callLogSection.show;
      var showNotification = (_callLogSection2 = this.parentModule.callLogSection) === null || _callLogSection2 === void 0 ? void 0 : _callLogSection2.showNotification;
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
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(telephonySessionId) {
        var session, _this$_deps$availabil, _t5;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              _context1.n = 1;
              return session.mute();
            case 1:
              this.clearCallControlBusyTimestamp();
              _context1.n = 8;
              break;
            case 2:
              _context1.p = 2;
              _t5 = _context1.v;
              if (!(_t5.response && !_t5.response._text)) {
                _context1.n = 4;
                break;
              }
              _context1.n = 3;
              return _t5.response.clone().text();
            case 3:
              _t5.response._text = _context1.v;
            case 4:
              if (!(0, _helpers.conflictError)(_t5)) {
                _context1.n = 5;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.muteConflictError
              });
              _context1.n = 7;
              break;
            case 5:
              _context1.n = 6;
              return (_this$_deps$availabil = this._deps.availabilityMonitor) === null || _this$_deps$availabil === void 0 ? void 0 : _this$_deps$availabil.checkIfHAError(_t5);
            case 6:
              if (_context1.v) {
                _context1.n = 7;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
            case 7:
              this.clearCallControlBusyTimestamp();
            case 8:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 2]]);
      }));
      function mute(_x4) {
        return _mute.apply(this, arguments);
      }
      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(telephonySessionId) {
        var session, _this$_deps$availabil2, _t6;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              _context10.n = 1;
              return session.unmute();
            case 1:
              this.clearCallControlBusyTimestamp();
              _context10.n = 8;
              break;
            case 2:
              _context10.p = 2;
              _t6 = _context10.v;
              if (!(_t6.response && !_t6.response._text)) {
                _context10.n = 4;
                break;
              }
              _context10.n = 3;
              return _t6.response.clone().text();
            case 3:
              _t6.response._text = _context10.v;
            case 4:
              if (!(0, _helpers.conflictError)(_t6)) {
                _context10.n = 5;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.unMuteConflictError
              });
              _context10.n = 7;
              break;
            case 5:
              _context10.n = 6;
              return (_this$_deps$availabil2 = this._deps.availabilityMonitor) === null || _this$_deps$availabil2 === void 0 ? void 0 : _this$_deps$availabil2.checkIfHAError(_t6);
            case 6:
              if (_context10.v) {
                _context10.n = 7;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
            case 7:
              this.clearCallControlBusyTimestamp();
            case 8:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 2]]);
      }));
      function unmute(_x5) {
        return _unmute.apply(this, arguments);
      }
      return unmute;
    }()
  }, {
    key: "transferUnmuteHandler",
    value: function () {
      var _transferUnmuteHandler = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(telephonySessionId) {
        var _session$telephonySes, _session$telephonySes2, session, _t7;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              session = this._getSessionById(telephonySessionId);
              if (!(session === null || session === void 0 ? void 0 : (_session$telephonySes = session.telephonySession) === null || _session$telephonySes === void 0 ? void 0 : (_session$telephonySes2 = _session$telephonySes.party) === null || _session$telephonySes2 === void 0 ? void 0 : _session$telephonySes2.muted)) {
                _context11.n = 1;
                break;
              }
              _context11.n = 1;
              return session.unmute();
            case 1:
              _context11.n = 3;
              break;
            case 2:
              _context11.p = 2;
              _t7 = _context11.v;
            case 3:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 2]]);
      }));
      function transferUnmuteHandler(_x6) {
        return _transferUnmuteHandler.apply(this, arguments);
      }
      return transferUnmuteHandler;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(telephonySessionId) {
        var session, recordingId, _ref7, _ref7$errors, errors, _iterator, _step, _error, _t8, _t9;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              recordingId = this.getRecordingId(session);
              _context12.n = 1;
              return session.startRecord({
                recordingId: recordingId
              });
            case 1:
              this.clearCallControlBusyTimestamp();
              return _context12.a(2, true);
            case 2:
              _context12.p = 2;
              _t8 = _context12.v;
              // TODO: fix error handling with instanceof
              this.clearCallControlBusyTimestamp();
              _context12.n = 3;
              return _t8.response.clone().json();
            case 3:
              _t9 = _context12.v;
              if (_t9) {
                _context12.n = 4;
                break;
              }
              _t9 = {};
            case 4:
              _ref7 = _t9;
              _ref7$errors = _ref7.errors;
              errors = _ref7$errors === void 0 ? [] : _ref7$errors;
              if (errors.length) {
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
                this._deps.alert.danger({
                  message: _webphoneErrors.webphoneErrors.recordError,
                  payload: {
                    errorCode: errors[0].errorCode
                  }
                });
              }
            case 5:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 2]]);
      }));
      function startRecord(_x7) {
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
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(telephonySessionId) {
        var session, recordingId, _t0;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              recordingId = this.getRecordingId(session);
              _context13.n = 1;
              return session.stopRecord({
                recordingId: recordingId
              });
            case 1:
              this.clearCallControlBusyTimestamp();
              _context13.n = 3;
              break;
            case 2:
              _context13.p = 2;
              _t0 = _context13.v;
              console.log('stop record error:', _t0);
              this._deps.alert.danger({
                message: _webphoneErrors.webphoneErrors.pauseRecordError
              });
              this.clearCallControlBusyTimestamp();
            case 3:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 2]]);
      }));
      function stopRecord(_x8) {
        return _stopRecord.apply(this, arguments);
      }
      return stopRecord;
    }()
  }, {
    key: "hangUp",
    value: function () {
      var _hangUp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(telephonySessionId) {
        var _this$_onCallEndFunc, session, _this$_deps$availabil3, _t1;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              _context14.n = 1;
              return session.hangup();
            case 1:
              (_this$_onCallEndFunc = this._onCallEndFunc) === null || _this$_onCallEndFunc === void 0 ? void 0 : _this$_onCallEndFunc.call(this);
              // TODO: find way to fix that 800ms
              // avoid hung up sync slow and user click multiple times.
              _context14.n = 2;
              return (0, _utils.sleep)(800);
            case 2:
              this.clearCallControlBusyTimestamp();
              _context14.n = 6;
              break;
            case 3:
              _context14.p = 3;
              _t1 = _context14.v;
              // TODO: fix error handling with instanceof
              console.error('hangup error', _t1);
              _context14.n = 4;
              return (_this$_deps$availabil3 = this._deps.availabilityMonitor) === null || _this$_deps$availabil3 === void 0 ? void 0 : _this$_deps$availabil3.checkIfHAError(_t1);
            case 4:
              if (_context14.v) {
                _context14.n = 5;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
            case 5:
              this.clearCallControlBusyTimestamp();
            case 6:
              return _context14.a(2);
          }
        }, _callee14, this, [[0, 3]]);
      }));
      function hangUp(_x9) {
        return _hangUp.apply(this, arguments);
      }
      return hangUp;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(telephonySessionId) {
        var session, _this$_deps$availabil4, _t10;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId); // !If is a queue call, ignore is performed
              if (!session.party.queueCall) {
                _context15.n = 2;
                break;
              }
              _context15.n = 1;
              return this.ignore(telephonySessionId);
            case 1:
              return _context15.a(2, _context15.v);
            case 2:
              _context15.n = 3;
              return session.toVoicemail();
            case 3:
              if (session && session.webphoneSession) {
                session.webphoneSession.__rc_isToVoicemail = true;
              }
              this.clearCallControlBusyTimestamp();
              _context15.n = 7;
              break;
            case 4:
              _context15.p = 4;
              _t10 = _context15.v;
              _context15.n = 5;
              return (_this$_deps$availabil4 = this._deps.availabilityMonitor) === null || _this$_deps$availabil4 === void 0 ? void 0 : _this$_deps$availabil4.checkIfHAError(_t10);
            case 5:
              if (_context15.v) {
                _context15.n = 6;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
            case 6:
              this.clearCallControlBusyTimestamp();
            case 7:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 4]]);
      }));
      function reject(_x0) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }()
  }, {
    key: "switch",
    value: function () {
      var _switch2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(telephonySessionId) {
        var _this$_onCallSwitched, switchedSession, _this$_deps$availabil5, _t11;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              this.setCallControlBusyTimestamp();
              _context16.n = 1;
              return this.transferUnmuteHandler(telephonySessionId);
            case 1:
              _context16.n = 2;
              return this._rcCall.switchCall(telephonySessionId, {
                homeCountryId: this._deps.regionSettings.homeCountryId
              });
            case 2:
              switchedSession = _context16.v;
              this._triggerAutoMergeEvent(telephonySessionId);
              _context16.n = 3;
              return this._holdOtherCalls(telephonySessionId);
            case 3:
              this.clearCallControlBusyTimestamp();
              (_this$_onCallSwitched = this._onCallSwitchedFunc) === null || _this$_onCallSwitched === void 0 ? void 0 : _this$_onCallSwitched.call(this, switchedSession.sessionId);
              _context16.n = 7;
              break;
            case 4:
              _context16.p = 4;
              _t11 = _context16.v;
              _context16.n = 5;
              return (_this$_deps$availabil5 = this._deps.availabilityMonitor) === null || _this$_deps$availabil5 === void 0 ? void 0 : _this$_deps$availabil5.checkIfHAError(_t11);
            case 5:
              if (_context16.v) {
                _context16.n = 6;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
            case 6:
              this.clearCallControlBusyTimestamp();
            case 7:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 4]]);
      }));
      function _switch(_x1) {
        return _switch2.apply(this, arguments);
      }
      return _switch;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(telephonySessionId) {
        var _otherParties$, _otherParties$$status, _otherParties$2, _otherParties$2$statu, session, webphoneSession, _session$otherParties, otherParties, _this$_deps$availabil6, _t12;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              webphoneSession = session.webphoneSession, _session$otherParties = session.otherParties, otherParties = _session$otherParties === void 0 ? [] : _session$otherParties;
              if (!(
              // when call is connecting or in voicemail then call control's Hold API will not work
              // so use webphone hold here
              session.direction === _callDirections.callDirection.outbound && (((_otherParties$ = otherParties[0]) === null || _otherParties$ === void 0 ? void 0 : (_otherParties$$status = _otherParties$.status) === null || _otherParties$$status === void 0 ? void 0 : _otherParties$$status.code) === _Session.PartyStatusCode.proceeding || ((_otherParties$2 = otherParties[0]) === null || _otherParties$2 === void 0 ? void 0 : (_otherParties$2$statu = _otherParties$2.status) === null || _otherParties$2$statu === void 0 ? void 0 : _otherParties$2$statu.code) === _Session.PartyStatusCode.voicemail) || (0, _helpers.isAtMainNumberPromptToneStage)(session))) {
                _context17.n = 2;
                break;
              }
              _context17.n = 1;
              return webphoneSession.hold();
            case 1:
              _context17.n = 3;
              break;
            case 2:
              _context17.n = 3;
              return session.hold();
            case 3:
              if (webphoneSession && webphoneSession.__rc_callStatus) {
                webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
              }
              this.clearCallControlBusyTimestamp();
              _context17.n = 10;
              break;
            case 4:
              _context17.p = 4;
              _t12 = _context17.v;
              if (!(_t12.response && !_t12.response._text)) {
                _context17.n = 6;
                break;
              }
              _context17.n = 5;
              return _t12.response.clone().text();
            case 5:
              _t12.response._text = _context17.v;
            case 6:
              if (!(0, _helpers.conflictError)(_t12)) {
                _context17.n = 7;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.holdConflictError
              });
              _context17.n = 9;
              break;
            case 7:
              _context17.n = 8;
              return (_this$_deps$availabil6 = this._deps.availabilityMonitor) === null || _this$_deps$availabil6 === void 0 ? void 0 : _this$_deps$availabil6.checkIfHAError(_t12);
            case 8:
              if (_context17.v) {
                _context17.n = 9;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
            case 9:
              this.clearCallControlBusyTimestamp();
            case 10:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 4]]);
      }));
      function hold(_x10) {
        return _hold.apply(this, arguments);
      }
      return hold;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(telephonySessionId) {
        var session, webphoneSession, _this$_deps$availabil7, _t13;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              _context18.n = 1;
              return this._holdOtherCalls(telephonySessionId);
            case 1:
              _context18.n = 2;
              return session.unhold();
            case 2:
              this._activeSession = session;
              webphoneSession = session.webphoneSession;
              if (webphoneSession && webphoneSession.__rc_callStatus) {
                webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
              }
              this.setActiveSessionId(telephonySessionId);
              this._addTrackToActiveSession();
              this.clearCallControlBusyTimestamp();
              _context18.n = 9;
              break;
            case 3:
              _context18.p = 3;
              _t13 = _context18.v;
              if (!(_t13.response && !_t13.response._text)) {
                _context18.n = 5;
                break;
              }
              _context18.n = 4;
              return _t13.response.clone().text();
            case 4:
              _t13.response._text = _context18.v;
            case 5:
              if (!(0, _helpers.conflictError)(_t13)) {
                _context18.n = 6;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.unHoldConflictError
              });
              _context18.n = 8;
              break;
            case 6:
              _context18.n = 7;
              return (_this$_deps$availabil7 = this._deps.availabilityMonitor) === null || _this$_deps$availabil7 === void 0 ? void 0 : _this$_deps$availabil7.checkIfHAError(_t13);
            case 7:
              if (_context18.v) {
                _context18.n = 8;
                break;
              }
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
            case 8:
              this.clearCallControlBusyTimestamp();
            case 9:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 3]]);
      }));
      function unhold(_x11) {
        return _unhold.apply(this, arguments);
      }
      return unhold;
    }()
  }, {
    key: "replyWithMessage",
    value: function () {
      var _replyWithMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(params, telephonySessionId) {
        var session, webphoneReplyOption, _t14;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              if (session) {
                _context19.n = 1;
                break;
              }
              return _context19.a(2, false);
            case 1:
              // await session.replyWithMessage(params);
              webphoneReplyOption = (0, _helpers.getWebphoneReplyMessageOption)(params);
              _context19.n = 2;
              return session.webphoneSession.replyWithMessage(webphoneReplyOption);
            case 2:
              this.clearCallControlBusyTimestamp();
              this._deps.alert.success({
                message: _callControlError.callControlError.replyCompleted
              });
              _context19.n = 4;
              break;
            case 3:
              _context19.p = 3;
              _t14 = _context19.v;
              console.error('replyWithMessage error', _t14);
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
              this.clearCallControlBusyTimestamp();
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 3]]);
      }));
      function replyWithMessage(_x12, _x13) {
        return _replyWithMessage.apply(this, arguments);
      }
      return replyWithMessage;
    }()
  }, {
    key: "toVoicemail",
    value: function () {
      var _toVoicemail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(voicemailId, telephonySessionId) {
        var session, _t15;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              if (session) {
                _context20.n = 1;
                break;
              }
              return _context20.a(2, false);
            case 1:
              _context20.n = 2;
              return session.transfer(voicemailId, {
                type: 'voicemail'
              });
            case 2:
              this.clearCallControlBusyTimestamp();
              this._deps.alert.success({
                message: _callControlError.callControlError.transferCompleted
              });
              _context20.n = 4;
              break;
            case 3:
              _context20.p = 3;
              _t15 = _context20.v;
              console.error('toVoicemail error', _t15);
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.toVoiceMailError
              });
              this.clearCallControlBusyTimestamp();
            case 4:
              return _context20.a(2);
          }
        }, _callee20, this, [[0, 3]]);
      }));
      function toVoicemail(_x14, _x15) {
        return _toVoicemail.apply(this, arguments);
      }
      return toVoicemail;
    }()
  }, {
    key: "completeWarmTransfer",
    value: function () {
      var _completeWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(telephonySession) {
        var _this$transferCallMap, isOriginal, relatedTelephonySessionId, session, transferSession, _t16;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              this.setCallControlBusyTimestamp();
              _this$transferCallMap = this.transferCallMapping[telephonySession], isOriginal = _this$transferCallMap.isOriginal, relatedTelephonySessionId = _this$transferCallMap.relatedTelephonySessionId;
              session = this._getSessionById(isOriginal ? telephonySession : relatedTelephonySessionId);
              transferSession = this._getSessionById(isOriginal ? relatedTelephonySessionId : telephonySession);
              if (transferSession) {
                _context21.n = 1;
                break;
              }
              return _context21.a(2, false);
            case 1:
              _context21.n = 2;
              return session.warmTransfer(transferSession);
            case 2:
              this.clearCallControlBusyTimestamp();
              this._deps.alert.success({
                message: _callControlError.callControlError.transferCompleted
              });
              _context21.n = 4;
              break;
            case 3:
              _context21.p = 3;
              _t16 = _context21.v;
              console.error('warmTransfer error', _t16);
              this._deps.alert.warning({
                message: _callControlError.callControlError.generalError
              });
              this.clearCallControlBusyTimestamp();
            case 4:
              return _context21.a(2);
          }
        }, _callee21, this, [[0, 3]]);
      }));
      function completeWarmTransfer(_x16) {
        return _completeWarmTransfer.apply(this, arguments);
      }
      return completeWarmTransfer;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(transferNumber, telephonySessionId) {
        var session, phoneNumber, _this$_deps$availabil8, _t17;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              _context22.n = 1;
              return this.getValidPhoneNumber(transferNumber, true);
            case 1:
              phoneNumber = _context22.v;
              if (!phoneNumber) {
                _context22.n = 3;
                break;
              }
              _context22.n = 2;
              return session.transfer(phoneNumber);
            case 2:
              this.clearCallControlBusyTimestamp();
              this._deps.alert.success({
                message: _callControlError.callControlError.transferCompleted
              });
            case 3:
              _context22.n = 7;
              break;
            case 4:
              _context22.p = 4;
              _t17 = _context22.v;
              _context22.n = 5;
              return (_this$_deps$availabil8 = this._deps.availabilityMonitor) === null || _this$_deps$availabil8 === void 0 ? void 0 : _this$_deps$availabil8.checkIfHAError(_t17);
            case 5:
              if (_context22.v) {
                _context22.n = 6;
                break;
              }
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.transferError
              });
            case 6:
              this.clearCallControlBusyTimestamp();
            case 7:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 4]]);
      }));
      function transfer(_x17, _x18) {
        return _transfer.apply(this, arguments);
      }
      return transfer;
    }()
  }, {
    key: "getValidPhoneNumber",
    value: function () {
      var _getValidPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(phoneNumber, withMainNumber) {
        var _this9 = this;
        var validatedResult, validPhoneNumber, _this$_deps$appFeatur, isEDPEnabled, _parsedNumbers$0$avai, parsedNumbers, _numbers, _numbers$, result, _t18;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              if (this._permissionCheck) {
                _context24.n = 1;
                break;
              }
              validatedResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
                areaCode: this._deps.regionSettings.areaCode,
                countryCode: this._deps.regionSettings.countryCode,
                phoneNumbers: [phoneNumber]
              });
              validPhoneNumber = validatedResult[0];
              _context24.n = 8;
              break;
            case 1:
              isEDPEnabled = (_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isEDPEnabled;
              if (!isEDPEnabled) {
                _context24.n = 2;
                break;
              }
              _t18 = this._deps.numberValidate.validate([phoneNumber]);
              _context24.n = 4;
              break;
            case 2:
              _context24.n = 3;
              return this._deps.numberValidate.validateNumbers([phoneNumber]);
            case 3:
              _t18 = _context24.v;
            case 4:
              validatedResult = _t18;
              if (validatedResult.result) {
                _context24.n = 5;
                break;
              }
              validatedResult.errors.forEach(/*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(error) {
                  var _this9$_deps$availabi;
                  var isHAError;
                  return _regenerator().w(function (_context23) {
                    while (1) switch (_context23.n) {
                      case 0:
                        _context23.n = 1;
                        return (_this9$_deps$availabi = _this9._deps.availabilityMonitor) === null || _this9$_deps$availabi === void 0 ? void 0 : _this9$_deps$availabi.checkIfHAError(error);
                      case 1:
                        isHAError = !!_context23.v;
                        if (!isHAError) {
                          // TODO: fix `callErrors` type
                          _this9._deps.alert.warning({
                            message: _callErrors.callErrors[error.type],
                            payload: {
                              phoneNumber: error.phoneNumber
                            }
                          });
                        }
                      case 2:
                        return _context23.a(2);
                    }
                  }, _callee23);
                }));
                return function (_x21) {
                  return _ref8.apply(this, arguments);
                };
              }());
              return _context24.a(2);
            case 5:
              if (!isEDPEnabled) {
                _context24.n = 7;
                break;
              }
              _context24.n = 6;
              return this._deps.numberValidate.parseNumbers([phoneNumber]);
            case 6:
              parsedNumbers = _context24.v;
              validPhoneNumber = (_parsedNumbers$0$avai = parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai !== void 0 ? _parsedNumbers$0$avai : parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].parsedNumber;
              _context24.n = 8;
              break;
            case 7:
              // TODO: fix `validatedResult` type in `numberValidate` module.
              validPhoneNumber = (_numbers = validatedResult.numbers) === null || _numbers === void 0 ? void 0 : (_numbers$ = _numbers[0]) === null || _numbers$ === void 0 ? void 0 : _numbers$.e164;
            case 8:
              result = validPhoneNumber;
              if (withMainNumber && validPhoneNumber.indexOf('+') === -1) {
                result = [this._deps.accountInfo.mainCompanyNumber, validPhoneNumber].join('*');
              }
              return _context24.a(2, result);
          }
        }, _callee24, this);
      }));
      function getValidPhoneNumber(_x19, _x20) {
        return _getValidPhoneNumber.apply(this, arguments);
      }
      return getValidPhoneNumber;
    }() // FIXME: Incomplete Implementation?
  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(flipValue, telephonySessionId) {
        var session, _t19;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              _context25.n = 1;
              return session.flip({
                callFlipId: flipValue
              });
            case 1:
              this.clearCallControlBusyTimestamp();
              _context25.n = 3;
              break;
            case 2:
              _context25.p = 2;
              _t19 = _context25.v;
              console.error('flip error', _t19);
              this.clearCallControlBusyTimestamp();
              throw _t19;
            case 3:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 2]]);
      }));
      function flip(_x22, _x23) {
        return _flip.apply(this, arguments);
      }
      return flip;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(forwardNumber, telephonySessionId) {
        var _this0 = this;
        var session, validatedResult, validPhoneNumber, _this$_deps$appFeatur2, isEDPEnabled, parsedNumbers, _parsedNumbers$0$avai2, _numbers2, _numbers2$, _t20, _t21;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              session = this._getSessionById(telephonySessionId);
              if (session) {
                _context26.n = 1;
                break;
              }
              return _context26.a(2, false);
            case 1:
              _context26.p = 1;
              if (this._permissionCheck) {
                _context26.n = 2;
                break;
              }
              validatedResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
                areaCode: this._deps.regionSettings.areaCode,
                countryCode: this._deps.regionSettings.countryCode,
                phoneNumbers: [forwardNumber]
              });
              validPhoneNumber = validatedResult[0];
              _context26.n = 9;
              break;
            case 2:
              isEDPEnabled = (_this$_deps$appFeatur2 = this._deps.appFeatures) === null || _this$_deps$appFeatur2 === void 0 ? void 0 : _this$_deps$appFeatur2.isEDPEnabled;
              if (!isEDPEnabled) {
                _context26.n = 3;
                break;
              }
              _t20 = this._deps.numberValidate.validate([forwardNumber]);
              _context26.n = 5;
              break;
            case 3:
              _context26.n = 4;
              return this._deps.numberValidate.validateNumbers([forwardNumber]);
            case 4:
              _t20 = _context26.v;
            case 5:
              validatedResult = _t20;
              if (validatedResult.result) {
                _context26.n = 6;
                break;
              }
              validatedResult.errors.forEach(function (error) {
                _this0._deps.alert.warning({
                  message: _callErrors.callErrors[error.type],
                  payload: {
                    phoneNumber: error.phoneNumber
                  }
                });
              });
              return _context26.a(2, false);
            case 6:
              if (!isEDPEnabled) {
                _context26.n = 8;
                break;
              }
              _context26.n = 7;
              return this._deps.numberValidate.parseNumbers([forwardNumber]);
            case 7:
              parsedNumbers = _context26.v;
              if (parsedNumbers) {
                validPhoneNumber = (_parsedNumbers$0$avai2 = parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai2 !== void 0 ? _parsedNumbers$0$avai2 : parsedNumbers[0].parsedNumber;
              }
              _context26.n = 9;
              break;
            case 8:
              validPhoneNumber = (_numbers2 = validatedResult.numbers) === null || _numbers2 === void 0 ? void 0 : (_numbers2$ = _numbers2[0]) === null || _numbers2$ === void 0 ? void 0 : _numbers2$.e164;
            case 9:
              if (session && session.webphoneSession) {
                session.webphoneSession.__rc_isForwarded = true;
              }
              _context26.n = 10;
              return session.forward(validPhoneNumber, this.acceptOptions);
            case 10:
              this._deps.alert.success({
                message: _callControlError.callControlError.forwardSuccess
              });
              if (typeof this._onCallEndFunc === 'function') {
                this._onCallEndFunc();
              }
              return _context26.a(2, true);
            case 11:
              _context26.p = 11;
              _t21 = _context26.v;
              console.error(_t21);
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.unknownError
              });
              return _context26.a(2, false);
          }
        }, _callee26, this, [[1, 11]]);
      }));
      function forward(_x24, _x25) {
        return _forward.apply(this, arguments);
      }
      return forward;
    }() // DTMF handing by webphone session temporary, due to rc call session doesn't support currently
  }, {
    key: "sendDTMF",
    value: function () {
      var _sendDTMF = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(dtmfValue, telephonySessionId) {
        var session, webphoneSession, _t22;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              _context27.p = 0;
              session = this._getSessionById(telephonySessionId); // TODO: using rc call session
              webphoneSession = session.webphoneSession;
              if (!webphoneSession) {
                _context27.n = 1;
                break;
              }
              _context27.n = 1;
              return webphoneSession.dtmf(dtmfValue, 100);
            case 1:
              _context27.n = 3;
              break;
            case 2:
              _context27.p = 2;
              _t22 = _context27.v;
              console.log('send dtmf error', _t22);
              throw _t22;
            case 3:
              return _context27.a(2);
          }
        }, _callee27, this, [[0, 2]]);
      }));
      function sendDTMF(_x26, _x27) {
        return _sendDTMF.apply(this, arguments);
      }
      return sendDTMF;
    }()
  }, {
    key: "_onWebphoneInvite",
    value: function _onWebphoneInvite(session) {
      var _this1 = this;
      var webphoneSession = session;
      if (!webphoneSession) return;
      if (!webphoneSession.__rc_creationTime) {
        webphoneSession.__rc_creationTime = Date.now();
      }
      if (!webphoneSession.__rc_lastActiveTime) {
        webphoneSession.__rc_lastActiveTime = Date.now();
      }
      webphoneSession.on('terminated', function () {
        console.log('Call Event: terminated');
        // this.setLastEndedSessionIds(webphoneSession);
        var _ref9 = _this1.rcCallSessions.find(function (s) {
            return s.webphoneSession === webphoneSession;
          }) || {},
          telephonySessionId = _ref9.telephonySessionId;
        if (!telephonySessionId) return;
        _this1._setActiveSessionIdFromOnHoldCalls(telephonySessionId);
        _this1._onCallEnd(telephonySessionId);
      });
      webphoneSession.on('accepted', function () {
        var _ref0 = _this1.rcCallSessions.find(function (s) {
            return s.webphoneSession === webphoneSession;
          }) || {},
          telephonySessionId = _ref0.telephonySessionId;
        if (!telephonySessionId) return;
        if (_this1._autoMergeWebphoneSessionsMap.get(webphoneSession)) {
          _this1._autoMergeWebphoneSessionsMap["delete"](webphoneSession);
        } else {
          _this1.setActiveSessionId(telephonySessionId);
          _this1._holdOtherCalls(telephonySessionId);
          _this1._addTrackToActiveSession();
        }
        _this1.updateActiveSessions();
        _this1._onCallAccepted(telephonySessionId);
      });
    }
  }, {
    key: "_setRingSessionId",
    value: function _setRingSessionId() {
      var sessionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.data.ringSessionId = sessionId;
    }

    /**
     *if current call is terminated, then pick the first onhold call as active current call;
     *
     * @param {Session} session
     * @memberof ActiveCallControl
     */
  }, {
    key: "_setActiveSessionIdFromOnHoldCalls",
    value: function _setActiveSessionIdFromOnHoldCalls(telephonySessionId) {
      if (!telephonySessionId) return;
      if (this.activeSessionId === telephonySessionId) {
        var onHoldSessions = (0, _ramda.filter)(function (s) {
          return (0, _helpers.isHolding)(s);
        }, this.sessions);
        if (onHoldSessions.length) {
          this.setActiveSessionId(onHoldSessions[0].telephonySessionId);
        }
      }
    }
  }, {
    key: "_holdOtherCalls",
    value: function () {
      var _holdOtherCalls2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(telephonySessionId) {
        var currSessions, otherSessions, holdOtherSessions;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              currSessions = this._rcCall.sessions;
              otherSessions = (0, _ramda.filter)(function (s) {
                return s.telephonySessionId !== telephonySessionId && (s.status === _Session.PartyStatusCode.answered || s.webphoneSession && !s.webphoneSession.localHold);
              }, currSessions);
              if (otherSessions.length) {
                _context29.n = 1;
                break;
              }
              return _context29.a(2);
            case 1:
              holdOtherSessions = otherSessions.map(/*#__PURE__*/function () {
                var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(session) {
                  var webphoneSession, _session$otherParties2, otherParties, _otherParties$3, _otherParties$3$statu, _otherParties$4, _otherParties$4$statu, _t23;
                  return _regenerator().w(function (_context28) {
                    while (1) switch (_context28.p = _context28.n) {
                      case 0:
                        webphoneSession = session.webphoneSession, _session$otherParties2 = session.otherParties, otherParties = _session$otherParties2 === void 0 ? [] : _session$otherParties2;
                        _context28.p = 1;
                        if (!(
                        // when call is connecting or in voicemail then call control's Hold API will not work
                        // so use webphone hold here
                        session.direction === _callDirections.callDirection.outbound && (((_otherParties$3 = otherParties[0]) === null || _otherParties$3 === void 0 ? void 0 : (_otherParties$3$statu = _otherParties$3.status) === null || _otherParties$3$statu === void 0 ? void 0 : _otherParties$3$statu.code) === _Session.PartyStatusCode.proceeding || ((_otherParties$4 = otherParties[0]) === null || _otherParties$4 === void 0 ? void 0 : (_otherParties$4$statu = _otherParties$4.status) === null || _otherParties$4$statu === void 0 ? void 0 : _otherParties$4$statu.code) === _Session.PartyStatusCode.voicemail) || (0, _helpers.isAtMainNumberPromptToneStage)(session))) {
                          _context28.n = 3;
                          break;
                        }
                        _context28.n = 2;
                        return webphoneSession.hold();
                      case 2:
                        _context28.n = 4;
                        break;
                      case 3:
                        _context28.n = 4;
                        return session.hold();
                      case 4:
                        if (webphoneSession && webphoneSession.__rc_callStatus) {
                          webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
                        }
                        _context28.n = 6;
                        break;
                      case 5:
                        _context28.p = 5;
                        _t23 = _context28.v;
                        console.log('Hold call fail.', _t23);
                      case 6:
                        return _context28.a(2);
                    }
                  }, _callee28, null, [[1, 5]]);
                }));
                return function (_x29) {
                  return _ref1.apply(this, arguments);
                };
              }());
              _context29.n = 2;
              return Promise.all(holdOtherSessions);
            case 2:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function _holdOtherCalls(_x28) {
        return _holdOtherCalls2.apply(this, arguments);
      }
      return _holdOtherCalls;
    }()
  }, {
    key: "setPickUpCallData",
    value: function setPickUpCallData(data) {
      this.pickUpCallDataMap = _objectSpread({}, data);
    }
  }, {
    key: "_answer",
    value: function () {
      var _answer2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(telephonySessionId) {
        var _this$_deps$webphone3, _this$_deps$webphone4, session, webphoneSession, deviceId, _this$_deps$webphone5;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              _context30.p = 0;
              this._triggerAutoMergeEvent(telephonySessionId);
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              this._activeSession = session;
              _context30.n = 1;
              return this._holdOtherCalls(telephonySessionId);
            case 1:
              webphoneSession = session.webphoneSession;
              deviceId = (_this$_deps$webphone3 = this._deps.webphone) === null || _this$_deps$webphone3 === void 0 ? void 0 : (_this$_deps$webphone4 = _this$_deps$webphone3.device) === null || _this$_deps$webphone4 === void 0 ? void 0 : _this$_deps$webphone4.id;
              if (!webphoneSession) {
                _context30.n = 3;
                break;
              }
              (_this$_deps$webphone5 = this._deps.webphone) === null || _this$_deps$webphone5 === void 0 ? void 0 : _this$_deps$webphone5.initWebphoneSessionEvents(webphoneSession);
              _context30.n = 2;
              return session.answer({
                deviceId: deviceId
              });
            case 2:
              _context30.n = 4;
              break;
            case 3:
              _context30.n = 4;
              return this.pickUpCall(_objectSpread({}, this.pickUpCallDataMap[telephonySessionId]));
            case 4:
              this._trackWebRTCCallAnswer();
              if (webphoneSession && webphoneSession.__rc_callStatus) {
                webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
              }
            case 5:
              _context30.p = 5;
              this.clearCallControlBusyTimestamp();
              return _context30.f(5);
            case 6:
              return _context30.a(2);
          }
        }, _callee30, this, [[0,, 5, 6]]);
      }));
      function _answer(_x30) {
        return _answer2.apply(this, arguments);
      }
      return _answer;
    }()
  }, {
    key: "pickUpCall",
    value: function () {
      var _pickUpCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(data) {
        var _this$_rcCall2;
        var telephonySessionId;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              telephonySessionId = data.telephonySessionId;
              _context31.n = 1;
              return (_this$_rcCall2 = this._rcCall) === null || _this$_rcCall2 === void 0 ? void 0 : _this$_rcCall2.pickupInboundCall(_objectSpread(_objectSpread(_objectSpread({}, this.pickUpCallDataMap[telephonySessionId]), data), this.acceptOptions));
            case 1:
              return _context31.a(2);
          }
        }, _callee31, this);
      }));
      function pickUpCall(_x31) {
        return _pickUpCall.apply(this, arguments);
      }
      return pickUpCall;
    }()
  }, {
    key: "answer",
    value: function () {
      var _answer3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(telephonySessionId) {
        var _t24;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.p = _context32.n) {
            case 0:
              _context32.p = 0;
              _context32.n = 1;
              return this._answer(telephonySessionId);
            case 1:
              _context32.n = 3;
              break;
            case 2:
              _context32.p = 2;
              _t24 = _context32.v;
              console.log('answer failed.');
            case 3:
              return _context32.a(2);
          }
        }, _callee32, this, [[0, 2]]);
      }));
      function answer(_x32) {
        return _answer3.apply(this, arguments);
      }
      return answer;
    }()
  }, {
    key: "answerAndHold",
    value: function () {
      var _answerAndHold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(telephonySessionId) {
        var _t25;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
            case 0:
              _context33.p = 0;
              _context33.n = 1;
              return this._answer(telephonySessionId);
            case 1:
              _context33.n = 3;
              break;
            case 2:
              _context33.p = 2;
              _t25 = _context33.v;
              console.log('answer hold failed.', _t25);
            case 3:
              return _context33.a(2);
          }
        }, _callee33, this, [[0, 2]]);
      }));
      function answerAndHold(_x33) {
        return _answerAndHold.apply(this, arguments);
      }
      return answerAndHold;
    }()
    /**
     * ignore an incoming WebRTC call, after action executed, call will be ignored at current
     * device and move to "calls on other device" section. This call still can be answered at other
     * device
     * @param {string} telephonySessionId
     * @memberof ActiveCallControl
     */
  }, {
    key: "ignore",
    value: (function () {
      var _ignore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(telephonySessionId) {
        var _this10 = this;
        var _this$onCallIgnoreFun, session, webphoneSession, _t26;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.p = _context34.n) {
            case 0:
              _context34.p = 0;
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              webphoneSession = session.webphoneSession;
              _context34.n = 1;
              return webphoneSession === null || webphoneSession === void 0 ? void 0 : webphoneSession.reject();
            case 1:
              // hack for update sessions, then incoming call log page can re-render
              setTimeout(function () {
                return _this10.updateActiveSessions();
              }, 0);
              this.clearCallControlBusyTimestamp();
              (_this$onCallIgnoreFun = this.onCallIgnoreFunc) === null || _this$onCallIgnoreFun === void 0 ? void 0 : _this$onCallIgnoreFun.call(this, session.party.id);
              _context34.n = 3;
              break;
            case 2:
              _context34.p = 2;
              _t26 = _context34.v;
              console.log('===ignore failed.', _t26);
            case 3:
              return _context34.a(2);
          }
        }, _callee34, this, [[0, 2]]);
      }));
      function ignore(_x34) {
        return _ignore.apply(this, arguments);
      }
      return ignore;
    }())
  }, {
    key: "answerAndEnd",
    value: function () {
      var _answerAndEnd = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(telephonySessionId) {
        var _this$_deps$webphone6, _this$_deps$webphone7, session, currentActiveCalls, _iterator2, _step2, s, deviceId, webphoneSession, _t27, _t28;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              _context35.p = 0;
              if (!this.busy) {
                _context35.n = 1;
                break;
              }
              return _context35.a(2);
            case 1:
              this.setCallControlBusyTimestamp();
              session = this._getSessionById(telephonySessionId);
              currentActiveCalls = this._rcCall.sessions.filter(function (s) {
                return s.id !== telephonySessionId && s.webphoneSession && (s.status === _Session.PartyStatusCode.answered || s.direction === _callDirections.callDirection.outbound && s.status === _Session.PartyStatusCode.proceeding);
              });
              _iterator2 = _createForOfIteratorHelper(currentActiveCalls);
              _context35.p = 2;
              _iterator2.s();
            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context35.n = 5;
                break;
              }
              s = _step2.value;
              _context35.n = 4;
              return s.hangup();
            case 4:
              _context35.n = 3;
              break;
            case 5:
              _context35.n = 7;
              break;
            case 6:
              _context35.p = 6;
              _t27 = _context35.v;
              _iterator2.e(_t27);
            case 7:
              _context35.p = 7;
              _iterator2.f();
              return _context35.f(7);
            case 8:
              deviceId = (_this$_deps$webphone6 = this._deps.webphone) === null || _this$_deps$webphone6 === void 0 ? void 0 : (_this$_deps$webphone7 = _this$_deps$webphone6.device) === null || _this$_deps$webphone7 === void 0 ? void 0 : _this$_deps$webphone7.id;
              if (!session.webphoneSession) {
                _context35.n = 10;
                break;
              }
              _context35.n = 9;
              return session.answer({
                deviceId: deviceId
              });
            case 9:
              _context35.n = 11;
              break;
            case 10:
              _context35.n = 11;
              return this.pickUpCall(_objectSpread({}, this.pickUpCallDataMap[telephonySessionId]));
            case 11:
              this._trackWebRTCCallAnswer();
              webphoneSession = session.webphoneSession;
              if (webphoneSession && webphoneSession.__rc_callStatus) {
                webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
              }
              this.clearCallControlBusyTimestamp();
              _context35.n = 13;
              break;
            case 12:
              _context35.p = 12;
              _t28 = _context35.v;
              console.log('answer and end fail.');
              console.error(_t28);
            case 13:
              return _context35.a(2);
          }
        }, _callee35, this, [[2, 6, 7, 8], [0, 12]]);
      }));
      function answerAndEnd(_x35) {
        return _answerAndEnd.apply(this, arguments);
      }
      return answerAndEnd;
    }()
  }, {
    key: "startWarmTransfer",
    value: function () {
      var _startWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(transferNumber, telephonySessionId) {
        var toNumber;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              _context36.n = 1;
              return this.getValidPhoneNumber(transferNumber);
            case 1:
              toNumber = _context36.v;
              return _context36.a(2, this.makeCall({
                toNumber: toNumber,
                transferSessionId: telephonySessionId
              }));
          }
        }, _callee36, this);
      }));
      function startWarmTransfer(_x36, _x37) {
        return _startWarmTransfer.apply(this, arguments);
      }
      return startWarmTransfer;
    }()
  }, {
    key: "setWarmTransferMapping",
    value: function setWarmTransferMapping(originalId, transferredId) {
      this.transferCallMapping = _objectSpread(_objectSpread({}, this.transferCallMapping), {}, _defineProperty(_defineProperty({}, originalId, {
        relatedTelephonySessionId: transferredId,
        isOriginal: true
      }), transferredId, {
        relatedTelephonySessionId: originalId,
        isOriginal: false
      }));
    }
  }, {
    key: "cleanCurrentWarmTransferData",
    value: function cleanCurrentWarmTransferData() {
      var warmTransferSessionIds = Object.keys(this.transferCallMapping);
      var currentSessionIds = this.sessions.map(function (session) {
        return session.telephonySessionId;
      });
      var needRemovedIds = warmTransferSessionIds.filter(function (telephonySessionId) {
        return !currentSessionIds.includes(telephonySessionId);
      });
      if (needRemovedIds.length > 0) {
        var removeSessionSet = new Set(needRemovedIds);
        var filteredData = Object.fromEntries(Object.entries(this.transferCallMapping).filter(function (_ref10) {
          var _ref11 = _slicedToArray(_ref10, 2),
            id = _ref11[0],
            transferInfo = _ref11[1];
          return !(removeSessionSet.has(id) || removeSessionSet.has(transferInfo.relatedTelephonySessionId));
        }));
        this.transferCallMapping = filteredData;
      }
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(params) {
        var _this11 = this;
        var _this$_deps$webphone8, phoneLines, sdkMakeCallParams, session, _t29;
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.p = _context37.n) {
            case 0:
              _context37.p = 0;
              if (!(params.toNumber.length > 6 && (!this._deps.availabilityMonitor || !this._deps.availabilityMonitor.isVoIPOnlyMode))) {
                _context37.n = 2;
                break;
              }
              _context37.n = 1;
              return this._fetchDL();
            case 1:
              phoneLines = _context37.v;
              if (!(phoneLines.length === 0)) {
                _context37.n = 2;
                break;
              }
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.noOutboundCallWithoutDL
              });
              return _context37.a(2, null);
            case 2:
              _context37.n = 3;
              return this._holdOtherCalls();
            case 3:
              sdkMakeCallParams = {
                // type 'callControl' not support webphone's sip device currently.
                type: 'webphone',
                toNumber: params.toNumber,
                fromNumber: params.fromNumber,
                homeCountryId: params.homeCountryId
              };
              _context37.n = 4;
              return this._rcCall.makeCall(sdkMakeCallParams);
            case 4:
              session = _context37.v;
              this._activeSession = session;
              (_this$_deps$webphone8 = this._deps.webphone) === null || _this$_deps$webphone8 === void 0 ? void 0 : _this$_deps$webphone8.initWebphoneSessionEvents(session.webphoneSession);
              session.webphoneSession.on('progress', function (incomingResponse) {
                if (session.telephonySessionId && _this11.activeSessionId !== session.telephonySessionId) {
                  _this11.setActiveSessionId(session.telephonySessionId);
                  var transferSessionId = params.transferSessionId;
                  if (transferSessionId) {
                    _this11.setWarmTransferMapping(transferSessionId, session.telephonySessionId);
                  }
                }
              });
              this._triggerAutoMergeEvent();
              return _context37.a(2, session);
            case 5:
              _context37.p = 5;
              _t29 = _context37.v;
              console.log('make call fail.', _t29);
            case 6:
              return _context37.a(2);
          }
        }, _callee37, this, [[0, 5]]);
      }));
      function makeCall(_x38) {
        return _makeCall.apply(this, arguments);
      }
      return makeCall;
    }()
  }, {
    key: "_fetchDL",
    value: function () {
      var _fetchDL2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38() {
        var response, devices, phoneLines;
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.n) {
            case 0:
              _context38.n = 1;
              return this._deps.client.account().extension().device().list();
            case 1:
              response = _context38.v;
              devices = response.records;
              phoneLines = [];
              devices === null || devices === void 0 ? void 0 : devices.forEach(function (device) {
                // wrong type of phoneLines, temporary treat it as any
                if (!device.phoneLines || device.phoneLines.length === 0) {
                  return;
                }
                phoneLines = phoneLines.concat(device.phoneLines);
              });
              return _context38.a(2, phoneLines);
          }
        }, _callee38, this);
      }));
      function _fetchDL() {
        return _fetchDL2.apply(this, arguments);
      }
      return _fetchDL;
    }()
  }, {
    key: "getActiveSession",
    value: function getActiveSession(telephonySessionId) {
      if (!telephonySessionId) {
        return null;
      }
      return this.activeSessions[telephonySessionId];
    }
  }, {
    key: "getSession",
    value: function getSession(telephonySessionId) {
      return this.sessions.find(function (session) {
        return session.telephonySessionId === telephonySessionId;
      });
    }
  }, {
    key: "activeSession",
    get: function get() {
      return this.getActiveSession(this.activeSessionId);
    }
  }, {
    key: "ringSession",
    get: function get() {
      return this.getActiveSession(this.ringSessionId);
    }
  }, {
    key: "ringSessions",
    get: function get() {
      if (!this.sessions) {
        return [];
      }
      return this.sessions.filter(function (session) {
        return (0, _helpers.isRinging)(session);
      });
    }
  }, {
    key: "activeSessions",
    get: function get() {
      return this.sessions.reduce(function (accumulator, session) {
        var id = session.id;
        accumulator[id] = (0, _helpers.normalizeSession)({
          session: session
        });
        return accumulator;
      }, {});
    }
  }, {
    key: "sessionIdToTelephonySessionIdMapping",
    get: function get() {
      return this._deps.presence.calls.reduce(function (accumulator, call) {
        var telephonySessionId = call.telephonySessionId,
          sessionId = call.sessionId;
        accumulator[sessionId] = telephonySessionId;
        return accumulator;
      }, {});
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
      return this._deps.appFeatures.hasCallControl;
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
    key: "acceptOptions",
    get: function get() {
      var _this$_deps$audioSett;
      return {
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: {
              deviceId: (_this$_deps$audioSett = this._deps.audioSettings) === null || _this$_deps$audioSett === void 0 ? void 0 : _this$_deps$audioSett.inputDeviceId
            },
            video: false
          }
        }
      };
    }
  }, {
    key: "hasCallInRecording",
    get: function get() {
      return this.sessions.some(function (session) {
        return (0, _helpers.isRecording)(session);
      });
    }

    // TODO:refactor, use this.sessions instead
  }, {
    key: "rcCallSessions",
    get: function get() {
      var _this$_rcCall3;
      return (0, _ramda.filter)(function (session) {
        return (0, _helpers.filterDisconnectedCalls)(session);
      }, ((_this$_rcCall3 = this._rcCall) === null || _this$_rcCall3 === void 0 ? void 0 : _this$_rcCall3.sessions) || []);
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
    key: "ringSessionId",
    get: function get() {
      return this.data.ringSessionId;
    }
  }, {
    key: "_trackWebRTCCallAnswer",
    value: function _trackWebRTCCallAnswer() {
      //
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
    value: function _getSessionById(sessionId) {
      var session = this._rcCall.sessions.find(function (s) {
        return s.id === sessionId;
      });
      return session;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "pickUpCallDataMap", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "transferCallMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      activeSessionId: null,
      busyTimestamp: 0,
      timestamp: 0,
      sessions: [],
      ringSessionId: null
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentDeviceCallsMap", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lastEndedSessionIds", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "cachedSessions", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resetState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNewCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallAccepted", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallAccepted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallEnd", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateActiveSessions", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateActiveSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeActiveSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeActiveSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setActiveSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastEndedSessionIds", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastEndedSessionIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallControlBusyTimestamp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearCallControlBusyTimestamp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_dec2, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_dec3, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_dec4, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_dec5, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangUp", [_dec6, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hangUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_dec7, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switch", [_dec8, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_dec9, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_dec0, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyWithMessage", [_dec1, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toVoicemail", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toVoicemail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeWarmTransfer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "completeWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_dec10, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flip", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "flip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_dec11, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendDTMF", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setRingSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRingSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_holdOtherCalls", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_holdOtherCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setPickUpCallData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setPickUpCallData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_answer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_dec12, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answerAndHold", [_dec13, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "answerAndHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ignore", [_dec14, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "ignore"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answerAndEnd", [_dec15, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "answerAndEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setWarmTransferMapping", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setWarmTransferMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanCurrentWarmTransferData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanCurrentWarmTransferData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSession", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSessions", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSessions", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackWebRTCCallAnswer", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackWebRTCCallAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialpadOpenTrack", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "dialpadOpenTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialpadCloseTrack", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "dialpadCloseTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickTransferTrack", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "clickTransferTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickForwardTrack", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "clickForwardTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openEntityDetailLinkTrack", [_dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "openEntityDetailLinkTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickSwitchTrack", [_dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "clickSwitchTrack"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ActiveCallControl.js.map
