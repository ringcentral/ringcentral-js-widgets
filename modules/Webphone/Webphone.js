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
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Webphone = exports.INCOMING_CALL_INVALID_STATE_ERROR_CODE = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));
var _extendedControlStatus = require("../../enums/extendedControlStatus");
var _trackEvents = require("../../enums/trackEvents");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _validateNumbers = require("../../lib/validateNumbers");
var _callErrors = require("../Call/callErrors");
var _WebphoneBase2 = require("./WebphoneBase");
var _events = require("./events");
var _numberValidError = require("./numberValidError");
var _recordStatus = require("./recordStatus");
var _sessionStatus = require("./sessionStatus");
var _webphoneErrors = require("./webphoneErrors");
var _webphoneHelper = require("./webphoneHelper");
var _webphoneMessages = require("./webphoneMessages");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var INCOMING_CALL_INVALID_STATE_ERROR_CODE = exports.INCOMING_CALL_INVALID_STATE_ERROR_CODE = 2;

/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */
var Webphone = exports.Webphone = (_dec = (0, _di.Module)({
  name: 'Webphone',
  deps: []
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.inboundWebRTCCallConnected), _dec3 = (0, _core.computed)(function (_ref) {
  var sessions = _ref.sessions;
  return [sessions];
}), _dec4 = (0, _core.computed)(function (_ref2) {
  var activeSessionId = _ref2.activeSessionId,
    sessions = _ref2.sessions;
  return [activeSessionId, sessions];
}), _dec5 = (0, _core.computed)(function (_ref3) {
  var ringSessionId = _ref3.ringSessionId,
    sessions = _ref3.sessions;
  return [ringSessionId, sessions];
}), _dec6 = (0, _core.computed)(function (_ref4) {
  var sessions = _ref4.sessions;
  return [sessions];
}), _dec7 = (0, _core.computed)(function (_ref5) {
  var sessions = _ref5.sessions;
  return [sessions];
}), _dec8 = (0, _core.computed)(function (_ref6) {
  var sessions = _ref6.sessions;
  return [sessions];
}), _dec9 = (0, _core.computed)(function (_ref7) {
  var ringSessions = _ref7.ringSessions;
  return [ringSessions];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_WebphoneBase) {
  function Webphone(deps) {
    var _this$_deps$webphoneO, _this$_deps$webphoneO2, _deps$webphoneOptions, _deps$webphoneOptions3, _deps$webphoneOptions5, _deps$webphoneOptions7, _deps$webphoneOptions9, _deps$webphoneOptions1, _deps$webphoneOptions11, _deps$webphoneOptions13, _this$_deps$webphoneO3, _this$_deps$webphoneO4;
    var _this;
    _classCallCheck(this, Webphone);
    _this = _callSuper(this, Webphone, [deps]);
    _this._activeWebphoneActiveCallKey = void 0;
    _this._permissionCheck = void 0;
    _initializerDefineProperty(_this, "activeSessionId", _descriptor, _this);
    _initializerDefineProperty(_this, "ringSessionId", _descriptor2, _this);
    _initializerDefineProperty(_this, "lastEndedSessions", _descriptor3, _this);
    _initializerDefineProperty(_this, "sessions", _descriptor4, _this);
    _this._activeWebphoneActiveCallKey = "".concat(deps.prefix, "-active-webphone-active-call-key");
    _this._permissionCheck = (_this$_deps$webphoneO = (_this$_deps$webphoneO2 = _this._deps.webphoneOptions) === null || _this$_deps$webphoneO2 === void 0 ? void 0 : _this$_deps$webphoneO2.permissionCheck) !== null && _this$_deps$webphoneO !== void 0 ? _this$_deps$webphoneO : true;
    if (typeof ((_deps$webphoneOptions = deps.webphoneOptions) === null || _deps$webphoneOptions === void 0 ? void 0 : _deps$webphoneOptions.onCallEnd) === 'function') {
      var _deps$webphoneOptions2;
      _this._eventEmitter.on(_events.EVENTS.callEnd, (_deps$webphoneOptions2 = deps.webphoneOptions) === null || _deps$webphoneOptions2 === void 0 ? void 0 : _deps$webphoneOptions2.onCallEnd);
    }
    if (typeof ((_deps$webphoneOptions3 = deps.webphoneOptions) === null || _deps$webphoneOptions3 === void 0 ? void 0 : _deps$webphoneOptions3.onCallRing) === 'function') {
      var _deps$webphoneOptions4;
      _this._eventEmitter.on(_events.EVENTS.callRing, (_deps$webphoneOptions4 = deps.webphoneOptions) === null || _deps$webphoneOptions4 === void 0 ? void 0 : _deps$webphoneOptions4.onCallRing);
    }
    if (typeof ((_deps$webphoneOptions5 = deps.webphoneOptions) === null || _deps$webphoneOptions5 === void 0 ? void 0 : _deps$webphoneOptions5.onCallStart) === 'function') {
      var _deps$webphoneOptions6;
      _this._eventEmitter.on(_events.EVENTS.callStart, (_deps$webphoneOptions6 = deps.webphoneOptions) === null || _deps$webphoneOptions6 === void 0 ? void 0 : _deps$webphoneOptions6.onCallStart);
    }
    if (typeof ((_deps$webphoneOptions7 = deps.webphoneOptions) === null || _deps$webphoneOptions7 === void 0 ? void 0 : _deps$webphoneOptions7.onCallResume) === 'function') {
      var _deps$webphoneOptions8;
      _this._eventEmitter.on(_events.EVENTS.callResume, (_deps$webphoneOptions8 = deps.webphoneOptions) === null || _deps$webphoneOptions8 === void 0 ? void 0 : _deps$webphoneOptions8.onCallResume);
    }
    if (typeof ((_deps$webphoneOptions9 = deps.webphoneOptions) === null || _deps$webphoneOptions9 === void 0 ? void 0 : _deps$webphoneOptions9.onCallHold) === 'function') {
      var _deps$webphoneOptions0;
      _this._eventEmitter.on(_events.EVENTS.callHold, (_deps$webphoneOptions0 = deps.webphoneOptions) === null || _deps$webphoneOptions0 === void 0 ? void 0 : _deps$webphoneOptions0.onCallHold);
    }
    if (typeof ((_deps$webphoneOptions1 = deps.webphoneOptions) === null || _deps$webphoneOptions1 === void 0 ? void 0 : _deps$webphoneOptions1.onCallInit) === 'function') {
      var _deps$webphoneOptions10;
      _this._eventEmitter.on(_events.EVENTS.callInit, (_deps$webphoneOptions10 = deps.webphoneOptions) === null || _deps$webphoneOptions10 === void 0 ? void 0 : _deps$webphoneOptions10.onCallInit);
    }
    if (typeof ((_deps$webphoneOptions11 = deps.webphoneOptions) === null || _deps$webphoneOptions11 === void 0 ? void 0 : _deps$webphoneOptions11.onBeforeCallResume) === 'function') {
      var _deps$webphoneOptions12;
      _this._eventEmitter.on(_events.EVENTS.beforeCallResume, (_deps$webphoneOptions12 = deps.webphoneOptions) === null || _deps$webphoneOptions12 === void 0 ? void 0 : _deps$webphoneOptions12.onBeforeCallResume);
    }
    if (typeof ((_deps$webphoneOptions13 = deps.webphoneOptions) === null || _deps$webphoneOptions13 === void 0 ? void 0 : _deps$webphoneOptions13.onBeforeCallEnd) === 'function') {
      var _deps$webphoneOptions14;
      _this._eventEmitter.on(_events.EVENTS.beforeCallEnd, (_deps$webphoneOptions14 = deps.webphoneOptions) === null || _deps$webphoneOptions14 === void 0 ? void 0 : _deps$webphoneOptions14.onBeforeCallEnd);
    }
    _this._reconnectAfterSessionEnd = null;
    _this._disconnectInactiveAfterSessionEnd = false;
    var enableContactMatchWhenNewCall = (_this$_deps$webphoneO3 = (_this$_deps$webphoneO4 = _this._deps.webphoneOptions) === null || _this$_deps$webphoneO4 === void 0 ? void 0 : _this$_deps$webphoneO4.enableContactMatchWhenNewCall) !== null && _this$_deps$webphoneO3 !== void 0 ? _this$_deps$webphoneO3 : true;
    if (enableContactMatchWhenNewCall && _this._deps.contactMatcher) {
      _this._deps.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.sessionPhoneNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this.ready;
        }
      });
    }
    if (_this._deps.availabilityMonitor && _this._deps.tabManager) {
      (0, _core.watch)(_this, function () {
        var _this$sessions;
        return (_this$sessions = _this.sessions) === null || _this$sessions === void 0 ? void 0 : _this$sessions.length;
      }, function () {
        if (!_this._sipInstanceId || !_this.sessions) {
          return;
        }
        var key = "sip-".concat(_this._deps.tabManager.id);
        _this._deps.availabilityMonitor.setSharedState(key, {
          hasCallSession: _this.sessions.length > 0
        });
      });
    }
    return _this;
  }
  _inherits(Webphone, _WebphoneBase);
  return _createClass(Webphone, [{
    key: "_updateSessionsState",
    value: function _updateSessionsState(sessions) {
      var cachedSessions = this.sessions.filter(function (x) {
        return x.cached;
      });
      cachedSessions.forEach(function (cachedSession) {
        var session = sessions.find(function (x) {
          return x.id === cachedSession.id;
        });
        if (session) {
          session.cached = true;
        } else {
          cachedSession.removed = true;
          sessions.push(cachedSession);
        }
      });
      this.sessions = sessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
    }
  }, {
    key: "_setActiveSessionId",
    value: function _setActiveSessionId(sessionId) {
      this.activeSessionId = sessionId;
    }
  }, {
    key: "_setStateOnCallRing",
    value: function _setStateOnCallRing(session) {
      this.ringSessionId = session.id;
    }
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
    key: "_setSessionCaching",
    value: function _setSessionCaching(cachingSessionIds) {
      var _this2 = this;
      cachingSessionIds.forEach(function (sessionId) {
        var session = _this2.sessions.find(function (x) {
          return x.id === sessionId;
        });
        if (session) {
          session.cached = true;
        }
      });
    }
  }, {
    key: "_clearSessionCaching",
    value: function _clearSessionCaching(sessions) {
      var needUpdate = false;
      this.sessions.forEach(function (session) {
        if (session.cached) {
          session.cached = false;
          needUpdate = true;
        }
      });
      if (needUpdate) {
        this.sessions = this.sessions.filter(function (x) {
          return !x.removed;
        });
      }
      var activeSessions = sessions.filter(function (x) {
        return !x.cached && !(0, _webphoneHelper.isRing)(x);
      });
      activeSessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
      this.activeSessionId = activeSessions[0] && activeSessions[0].id || null;
    }
  }, {
    key: "_onHoldCachedSession",
    value: function _onHoldCachedSession() {
      this.sessions.forEach(function (session) {
        if (session.cached) {
          session.callStatus = _sessionStatus.sessionStatus.onHold;
          session.isOnHold = true;
        }
      });
    }
  }, {
    key: "_onStorageChangeEvent",
    value: function _onStorageChangeEvent(e) {
      _superPropGet(Webphone, "_onStorageChangeEvent", this, 3)([e]);
      // unhold active calls in current tab
      if (e.key === this._activeWebphoneActiveCallKey) {
        this._holdOtherSession(e.newValue);
      }
    }
  }, {
    key: "_onAccepted",
    value: function _onAccepted(session) {
      this.initWebphoneSessionEvents(session);
    }
  }, {
    key: "initWebphoneSessionEvents",
    value: function initWebphoneSessionEvents(session) {
      var _this3 = this;
      session.on('accepted', function (incomingResponse) {
        if (session.__rc_callStatus === _sessionStatus.sessionStatus.finished) {
          return;
        }
        console.log('accepted');
        session.__rc_callStatus = _sessionStatus.sessionStatus.connected;
        (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);
        _this3._onCallStart(session);
        if (session.__rc_extendedControls && session.__rc_extendedControlStatus === _extendedControlStatus.extendedControlStatus.pending) {
          _this3._playExtendedControls(session);
        }
      });
      session.on('progress', function (incomingResponse) {
        console.log('progress...');
        session.__rc_callStatus = _sessionStatus.sessionStatus.connecting;
        (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);
        _this3._updateSessions();
      });
      session.on('rejected', function () {
        console.log('rejected');
        session.__rc_callStatus = _sessionStatus.sessionStatus.finished;
        _this3._onCallEnd(session);
      });
      session.on('failed', function (response, cause) {
        console.log('Event: Failed');
        console.log(cause);
        session.__rc_callStatus = _sessionStatus.sessionStatus.finished;
        _this3._onCallEnd(session);
      });
      session.on('terminated', function () {
        console.log('Event: Terminated');
        session.__rc_callStatus = _sessionStatus.sessionStatus.finished;
        _this3._onCallEnd(session);
      });
      session.on('cancel', function () {
        console.log('Event: Cancel');
        session.__rc_callStatus = _sessionStatus.sessionStatus.finished;
        _this3._onCallEnd(session);
      });
      // @ts-expect-error TS(2769): No overload matches this call.
      session.on('replaced', function (newSession) {
        console.log('Event: replaced', newSession);
        session.__rc_callStatus = _sessionStatus.sessionStatus.replaced;
        newSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
        newSession.__rc_direction = _callDirections["default"].inbound;
        _this3._updateSessions();
        _this3._onAccepted(newSession);
      });
      session.on('muted', function () {
        console.log('Event: Muted');
        session.__rc_isOnMute = true;
        session.__rc_callStatus = _sessionStatus.sessionStatus.onMute;
        _this3._updateSessions();
      });
      session.on('unmuted', function () {
        console.log('Event: Unmuted');
        session.__rc_isOnMute = false;
        session.__rc_callStatus = _sessionStatus.sessionStatus.connected;
        _this3._updateSessions();
      });
      session.on('SessionDescriptionHandler-created', function () {
        // @ts-expect-error TS(2339): Property 'on' does not exist on type 'SessionDescr... Remove this comment to see the full error message
        session.sessionDescriptionHandler.on('userMediaFailed', function () {
          _this3._deps.audioSettings.onGetUserMediaError();
        });
      });
    }
  }, {
    key: "_onInvite",
    value: function _onInvite(session) {
      var _this4 = this;
      _superPropGet(Webphone, "_onInvite", this, 3)([session]);
      session.__rc_creationTime = Date.now();
      session.__rc_lastActiveTime = Date.now();
      session.__rc_direction = _callDirections["default"].inbound;
      session.__rc_callStatus = _sessionStatus.sessionStatus.connecting;
      (0, _webphoneHelper.extractHeadersData)(session, session.request.headers);
      session.on('rejected', function () {
        console.log('Event: Rejected');
        _this4._onCallEnd(session);
      });
      session.on('terminated', function () {
        console.log('Event: Terminated');
        _this4._onCallEnd(session);
      });
      this._onCallRing(session);
    }
  }, {
    key: "_playExtendedControls",
    value: function () {
      var _playExtendedControls2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(session) {
        var controls, i, len;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.playing;
              controls = session.__rc_extendedControls.slice();
              i = 0, len = controls.length;
            case 1:
              if (!(i < len)) {
                _context.n = 7;
                break;
              }
              if (!(session.__rc_extendedControlStatus === _extendedControlStatus.extendedControlStatus.playing)) {
                _context.n = 5;
                break;
              }
              if (!(controls[i] === ',')) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return (0, _utils.sleep)(2000);
            case 2:
              _context.n = 4;
              break;
            case 3:
              _context.n = 4;
              return this._sendDTMF(controls[i], session);
            case 4:
              _context.n = 6;
              break;
            case 5:
              return _context.a(2);
            case 6:
              i += 1;
              _context.n = 1;
              break;
            case 7:
              session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.stopped;
            case 8:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _playExtendedControls(_x) {
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
      var _answer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(sessionId) {
        var sipSession, session, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              sipSession = this.originalSessions[sessionId];
              session = this.sessions.find(function (session) {
                return session.id === sessionId;
              });
              if (!(!session || !(0, _webphoneHelper.isRing)(session))) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              _context2.p = 1;
              _context2.n = 2;
              return this._holdOtherSession(sessionId);
            case 2:
              this._onAccepted(sipSession);
              _context2.n = 3;
              return sipSession.accept(this.acceptOptions);
            case 3:
              this._trackCallAnswer();
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t = _context2.v;
              console.log('Accept failed');
              console.error(_t);
              if (_t.code !== INCOMING_CALL_INVALID_STATE_ERROR_CODE) {
                // FIXME:
                // 2 means the call is answered
                this._onCallEnd(sipSession);
              }
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 4]]);
      }));
      function answer(_x2) {
        return _answer.apply(this, arguments);
      }
      return answer;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(sessionId) {
        var session, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (!(!session || session.__rc_callStatus === _sessionStatus.sessionStatus.finished)) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return session.reject();
            case 2:
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t2 = _context3.v;
              console.error(_t2);
              this._onCallEnd(session);
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function reject(_x3) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }()
  }, {
    key: "resume",
    value: function () {
      var _resume = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(sessionId) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.unhold(sessionId);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function resume(_x4) {
        return _resume.apply(this, arguments);
      }
      return resume;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(sessionId, forwardNumber) {
        var _this5 = this;
        var session, validatedResult, validPhoneNumber, _this$_deps$appFeatur, isEDPEnabled, parsedNumbers, _parsedNumbers$0$avai, _validatedResult$numb, _validatedResult$numb2, _t3, _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, false);
            case 1:
              _context5.p = 1;
              if (this._permissionCheck) {
                _context5.n = 2;
                break;
              }
              validatedResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
                areaCode: this._deps.regionSettings.areaCode,
                countryCode: this._deps.regionSettings.countryCode,
                phoneNumbers: [forwardNumber]
              });
              validPhoneNumber = validatedResult[0];
              _context5.n = 9;
              break;
            case 2:
              isEDPEnabled = (_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isEDPEnabled;
              if (!isEDPEnabled) {
                _context5.n = 3;
                break;
              }
              _t3 = this._deps.numberValidate.validate([forwardNumber]);
              _context5.n = 5;
              break;
            case 3:
              _context5.n = 4;
              return this._deps.numberValidate.validateNumbers([forwardNumber]);
            case 4:
              _t3 = _context5.v;
            case 5:
              validatedResult = _t3;
              if (validatedResult.result) {
                _context5.n = 6;
                break;
              }
              validatedResult.errors.forEach(function (error) {
                _this5._deps.alert.warning({
                  message: _callErrors.callErrors[error.type],
                  payload: {
                    phoneNumber: error.phoneNumber
                  }
                });
              });
              return _context5.a(2, false);
            case 6:
              if (!isEDPEnabled) {
                _context5.n = 8;
                break;
              }
              _context5.n = 7;
              return this._deps.numberValidate.parseNumbers([forwardNumber]);
            case 7:
              parsedNumbers = _context5.v;
              if (parsedNumbers) {
                validPhoneNumber = (_parsedNumbers$0$avai = parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai !== void 0 ? _parsedNumbers$0$avai : parsedNumbers[0].parsedNumber;
              }
              _context5.n = 9;
              break;
            case 8:
              // @ts-expect-error TS(2339): Property 'numbers' does not exist on type 'Validat... Remove this comment to see the full error message
              validPhoneNumber = (_validatedResult$numb = validatedResult.numbers) === null || _validatedResult$numb === void 0 ? void 0 : (_validatedResult$numb2 = _validatedResult$numb[0]) === null || _validatedResult$numb2 === void 0 ? void 0 : _validatedResult$numb2.e164;
            case 9:
              session.__rc_isForwarded = true;
              _context5.n = 10;
              return session.forward(validPhoneNumber, this.acceptOptions, {});
            case 10:
              console.log('Forwarded');
              this._onCallEnd(session);
              this._addTrackAfterForward();
              return _context5.a(2, true);
            case 11:
              _context5.p = 11;
              _t4 = _context5.v;
              console.error(_t4);
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.unknownError
              });
              this._addTrackAfterForward();
              return _context5.a(2, false);
          }
        }, _callee5, this, [[1, 11]]);
      }));
      function forward(_x5, _x6) {
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
      var _mute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(sessionId) {
        var _this6 = this;
        var _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              this._sessionHandleWithId(sessionId, function (session) {
                session.__rc_isOnMute = true;
                session.mute();
                _this6._updateSessions();
              });
              return _context6.a(2, true);
            case 1:
              _context6.p = 1;
              _t5 = _context6.v;
              console.error(_t5);
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.muteError
              });
              return _context6.a(2, false);
          }
        }, _callee6, this, [[0, 1]]);
      }));
      function mute(_x7) {
        return _mute.apply(this, arguments);
      }
      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(sessionId) {
        var _this7 = this;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._sessionHandleWithId(sessionId, function (session) {
                session.__rc_isOnMute = false;
                session.unmute();
                _this7._updateSessions();
              });
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function unmute(_x8) {
        return _unmute.apply(this, arguments);
      }
      return unmute;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(sessionId) {
        var session, _t6;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2, false);
            case 1:
              if (!session.localHold) {
                _context8.n = 2;
                break;
              }
              return _context8.a(2, true);
            case 2:
              _context8.p = 2;
              _context8.n = 3;
              return session.hold();
            case 3:
              session.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
              this._updateSessions();
              this._onCallHold(session);
              return _context8.a(2, true);
            case 4:
              _context8.p = 4;
              _t6 = _context8.v;
              console.error('hold error:', _t6);
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.holdError
              });
              return _context8.a(2, false);
          }
        }, _callee8, this, [[2, 4]]);
      }));
      function hold(_x9) {
        return _hold.apply(this, arguments);
      }
      return hold;
    }()
  }, {
    key: "_holdOtherSession",
    value: function () {
      var _holdOtherSession2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(currentSessionId) {
        var _this8 = this;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return Promise.all(Object.values(this.originalSessions).map(/*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(session) {
                  var _t7;
                  return _regenerator().w(function (_context9) {
                    while (1) switch (_context9.p = _context9.n) {
                      case 0:
                        if (!(currentSessionId === session.id)) {
                          _context9.n = 1;
                          break;
                        }
                        return _context9.a(2);
                      case 1:
                        if (!session.localHold) {
                          _context9.n = 2;
                          break;
                        }
                        return _context9.a(2);
                      case 2:
                        if (!(session.__rc_callStatus === _sessionStatus.sessionStatus.connecting)) {
                          _context9.n = 3;
                          break;
                        }
                        return _context9.a(2);
                      case 3:
                        _context9.p = 3;
                        _context9.n = 4;
                        return session.hold();
                      case 4:
                        _context9.n = 6;
                        break;
                      case 5:
                        _context9.p = 5;
                        _t7 = _context9.v;
                        console.error('Hold call fail');
                        throw _t7;
                      case 6:
                        session.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
                        _this8._onCallHold(session);
                      case 7:
                        return _context9.a(2);
                    }
                  }, _callee9, null, [[3, 5]]);
                }));
                return function (_x1) {
                  return _ref8.apply(this, arguments);
                };
              }()));
            case 1:
              this._updateSessions();
              // update cached sessions
              this._onHoldCachedSession();
            case 2:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function _holdOtherSession(_x0) {
        return _holdOtherSession2.apply(this, arguments);
      }
      return _holdOtherSession;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(sessionId) {
        var session, _t8;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2);
            case 1:
              _context1.p = 1;
              if (!session.localHold) {
                _context1.n = 4;
                break;
              }
              _context1.n = 2;
              return this._holdOtherSession(session.id);
            case 2:
              this._onBeforeCallResume(session);
              _context1.n = 3;
              return session.unhold();
            case 3:
              session.__rc_callStatus = _sessionStatus.sessionStatus.connected;
              this._updateSessions();
              this._onCallResume(session);
            case 4:
              _context1.n = 6;
              break;
            case 5:
              _context1.p = 5;
              _t8 = _context1.v;
              console.log(_t8);
            case 6:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 5]]);
      }));
      function unhold(_x10) {
        return _unhold.apply(this, arguments);
      }
      return unhold;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(sessionId) {
        var session, _t9;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
            case 1:
              if (!(session.__rc_callStatus === _sessionStatus.sessionStatus.connecting)) {
                _context10.n = 2;
                break;
              }
              return _context10.a(2);
            case 2:
              _context10.p = 2;
              session.__rc_recordStatus = _recordStatus.recordStatus.pending;
              this._updateSessions();
              _context10.n = 3;
              return session.startRecord();
            case 3:
              session.__rc_recordStatus = _recordStatus.recordStatus.recording;
              this._updateSessions();
              _context10.n = 6;
              break;
            case 4:
              _context10.p = 4;
              _t9 = _context10.v;
              console.error(_t9);
              session.__rc_recordStatus = _recordStatus.recordStatus.idle;
              this._updateSessions();
              // Recording has been disabled
              if (!(_t9 && _t9.code === -5)) {
                _context10.n = 5;
                break;
              }
              this._deps.alert.danger({
                message: _webphoneErrors.webphoneErrors.recordDisabled
              });
              // Disabled phone recording
              session.__rc_recordStatus = _recordStatus.recordStatus.noAccess;
              this._updateSessions();
              return _context10.a(2);
            case 5:
              this._deps.alert.danger({
                message: _webphoneErrors.webphoneErrors.recordError,
                payload: {
                  errorCode: _t9.code
                }
              });
            case 6:
              return _context10.a(2);
          }
        }, _callee10, this, [[2, 4]]);
      }));
      function startRecord(_x11) {
        return _startRecord.apply(this, arguments);
      }
      return startRecord;
    }()
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(sessionId) {
        var session, _t0;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context11.n = 1;
                break;
              }
              return _context11.a(2);
            case 1:
              _context11.p = 1;
              session.__rc_recordStatus = _recordStatus.recordStatus.pending;
              this._updateSessions();
              _context11.n = 2;
              return session.stopRecord();
            case 2:
              session.__rc_recordStatus = _recordStatus.recordStatus.idle;
              this._updateSessions();
              _context11.n = 4;
              break;
            case 3:
              _context11.p = 3;
              _t0 = _context11.v;
              console.error(_t0);
              session.__rc_recordStatus = _recordStatus.recordStatus.recording;
              this._updateSessions();
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function stopRecord(_x12) {
        return _stopRecord.apply(this, arguments);
      }
      return stopRecord;
    }()
  }, {
    key: "park",
    value: function () {
      var _park = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(sessionId) {
        var session, result, _t1;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2);
            case 1:
              _context12.p = 1;
              _context12.n = 2;
              return session.park();
            case 2:
              result = _context12.v;
              console.log('Parked');
              if (result['park extension']) {
                this._deps.alert.success({
                  message: _webphoneMessages.webphoneMessages.parked,
                  payload: {
                    parkedNumber: "*".concat(result['park extension'])
                  },
                  ttl: 0
                });
              }
              _context12.n = 4;
              break;
            case 3:
              _context12.p = 3;
              _t1 = _context12.v;
              console.error(_t1);
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function park(_x13) {
        return _park.apply(this, arguments);
      }
      return park;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(transferNumber, sessionId) {
        var _this9 = this;
        var session, numberResult, validPhoneNumber, _this$_deps$appFeatur2, isEDPEnabled, _numberResult, _parsedNumbers$0$avai2, parsedNumbers, _numberResult$numbers, _numberResult$numbers2, _t10, _t11, _t12;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2);
            case 1:
              _context13.p = 1;
              session.__rc_isOnTransfer = true;
              this._updateSessions();
              if (this._permissionCheck) {
                _context13.n = 5;
                break;
              }
              _context13.p = 2;
              numberResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
                areaCode: this._deps.regionSettings.areaCode,
                countryCode: this._deps.regionSettings.countryCode,
                phoneNumbers: [transferNumber]
              });
              _context13.n = 4;
              break;
            case 3:
              _context13.p = 3;
              _t10 = _context13.v;
              throw new _numberValidError.NumberValidError([_t10]);
            case 4:
              validPhoneNumber = numberResult && numberResult[0];
              _context13.n = 12;
              break;
            case 5:
              isEDPEnabled = (_this$_deps$appFeatur2 = this._deps.appFeatures) === null || _this$_deps$appFeatur2 === void 0 ? void 0 : _this$_deps$appFeatur2.isEDPEnabled;
              if (!isEDPEnabled) {
                _context13.n = 6;
                break;
              }
              _t11 = this._deps.numberValidate.validate([transferNumber]);
              _context13.n = 8;
              break;
            case 6:
              _context13.n = 7;
              return this._deps.numberValidate.validateNumbers([transferNumber]);
            case 7:
              _t11 = _context13.v;
            case 8:
              _numberResult = _t11;
              if (_numberResult.result) {
                _context13.n = 9;
                break;
              }
              throw new _numberValidError.NumberValidError(_numberResult.errors);
            case 9:
              if (!isEDPEnabled) {
                _context13.n = 11;
                break;
              }
              _context13.n = 10;
              return this._deps.numberValidate.parseNumbers([transferNumber]);
            case 10:
              parsedNumbers = _context13.v;
              validPhoneNumber = (_parsedNumbers$0$avai2 = parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai2 !== void 0 ? _parsedNumbers$0$avai2 : parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].parsedNumber;
              _context13.n = 12;
              break;
            case 11:
              // @ts-expect-error TS(2339): Property 'numbers' does not exist on type 'Validat... Remove this comment to see the full error message
              validPhoneNumber = (_numberResult$numbers = _numberResult.numbers) === null || _numberResult$numbers === void 0 ? void 0 : (_numberResult$numbers2 = _numberResult$numbers[0]) === null || _numberResult$numbers2 === void 0 ? void 0 : _numberResult$numbers2.e164;
            case 12:
              _context13.n = 13;
              return session.transfer(validPhoneNumber);
            case 13:
              session.__rc_isOnTransfer = false;
              this._updateSessions();
              this._onCallEnd(session);
              _context13.n = 16;
              break;
            case 14:
              _context13.p = 14;
              _t12 = _context13.v;
              session.__rc_isOnTransfer = false;
              this._updateSessions();
              if (!(_t12 instanceof _numberValidError.NumberValidError)) {
                _context13.n = 15;
                break;
              }
              _t12.errors.forEach(function (error) {
                _this9._deps.alert.warning({
                  message: _callErrors.callErrors[error.type],
                  payload: {
                    phoneNumber: error.phoneNumber
                  }
                });
              });
              return _context13.a(2);
            case 15:
              this._deps.alert.danger({
                message: _webphoneErrors.webphoneErrors.transferError
              });
            case 16:
              return _context13.a(2);
          }
        }, _callee13, this, [[2, 3], [1, 14]]);
      }));
      function transfer(_x14, _x15) {
        return _transfer.apply(this, arguments);
      }
      return transfer;
    }()
  }, {
    key: "startWarmTransfer",
    value: function () {
      var _startWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(transferNumber, sessionId) {
        var session, numberResult, validPhoneNumber, fromNumber, _t13;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2);
            case 1:
              _context14.p = 1;
              session.__rc_isOnTransfer = true;
              this._updateSessions();
              numberResult = (0, _validateNumbers.validateNumbers)({
                allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
                areaCode: this._deps.regionSettings.areaCode,
                countryCode: this._deps.regionSettings.countryCode,
                phoneNumbers: [transferNumber]
              });
              validPhoneNumber = numberResult && numberResult[0];
              fromNumber = session.__rc_direction === _callDirections["default"].outbound ? session.request.from.uri.user : session.request.to.uri.user;
              _context14.n = 2;
              return this.makeCall({
                toNumber: validPhoneNumber,
                fromNumber: fromNumber,
                homeCountryId: this._deps.regionSettings.homeCountryId,
                // TODO: should check that type issue
                // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'string[]'... Remove this comment to see the full error message
                extendedControls: '',
                transferSessionId: sessionId
              });
            case 2:
              _context14.n = 4;
              break;
            case 3:
              _context14.p = 3;
              _t13 = _context14.v;
              console.error(_t13);
              session.__rc_isOnTransfer = false;
              this._updateSessions();
              this._deps.alert.danger({
                message: _webphoneErrors.webphoneErrors.transferError
              });
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function startWarmTransfer(_x16, _x17) {
        return _startWarmTransfer.apply(this, arguments);
      }
      return startWarmTransfer;
    }()
  }, {
    key: "completeWarmTransfer",
    value: function () {
      var _completeWarmTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(newSessionId) {
        var newSession, oldSessionId, oldSession, _t14;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              newSession = this.originalSessions[newSessionId];
              if (newSession) {
                _context15.n = 1;
                break;
              }
              return _context15.a(2);
            case 1:
              oldSessionId = newSession.__rc_transferSessionId;
              oldSession = this.originalSessions[oldSessionId];
              if (oldSession) {
                _context15.n = 2;
                break;
              }
              return _context15.a(2);
            case 2:
              newSession.__rc_isOnTransfer = true;
              this._updateSessions();
              _context15.p = 3;
              _context15.n = 4;
              return oldSession.warmTransfer(newSession);
            case 4:
              _context15.n = 6;
              break;
            case 5:
              _context15.p = 5;
              _t14 = _context15.v;
              console.error(_t14);
              newSession.__rc_isOnTransfer = false;
              this._updateSessions();
              this._deps.alert.danger({
                message: _webphoneErrors.webphoneErrors.transferError
              });
            case 6:
              return _context15.a(2);
          }
        }, _callee15, this, [[3, 5]]);
      }));
      function completeWarmTransfer(_x18) {
        return _completeWarmTransfer.apply(this, arguments);
      }
      return completeWarmTransfer;
    }()
  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(flipValue, sessionId) {
        var session, _t15;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context16.n = 1;
                break;
              }
              return _context16.a(2);
            case 1:
              _context16.p = 1;
              _context16.n = 2;
              return session.flip(flipValue);
            case 2:
              // this._onCallEnd(session);
              session.__rc_isOnFlip = true;
              console.log('Flipped');
              _context16.n = 4;
              break;
            case 3:
              _context16.p = 3;
              _t15 = _context16.v;
              session.__rc_isOnFlip = false;
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.flipError
              });
              console.error(_t15);
            case 4:
              this._updateSessions();
            case 5:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 3]]);
      }));
      function flip(_x19, _x20) {
        return _flip.apply(this, arguments);
      }
      return flip;
    }()
  }, {
    key: "_sendDTMF",
    value: function () {
      var _sendDTMF2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(dtmfValue, session) {
        var _t16;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return session.dtmf(dtmfValue, 100);
            case 1:
              _context17.n = 3;
              break;
            case 2:
              _context17.p = 2;
              _t16 = _context17.v;
              console.error(_t16);
            case 3:
              return _context17.a(2);
          }
        }, _callee17, null, [[0, 2]]);
      }));
      function _sendDTMF(_x21, _x22) {
        return _sendDTMF2.apply(this, arguments);
      }
      return _sendDTMF;
    }()
  }, {
    key: "sendDTMF",
    value: function () {
      var _sendDTMF3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(dtmfValue, sessionId) {
        var session;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (!session) {
                _context18.n = 1;
                break;
              }
              _context18.n = 1;
              return this._sendDTMF(dtmfValue, session);
            case 1:
              return _context18.a(2);
          }
        }, _callee18, this);
      }));
      function sendDTMF(_x23, _x24) {
        return _sendDTMF3.apply(this, arguments);
      }
      return sendDTMF;
    }()
  }, {
    key: "hangup",
    value: function () {
      var _hangup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(sessionId) {
        var session, _t17;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context19.n = 1;
                break;
              }
              return _context19.a(2);
            case 1:
              _context19.p = 1;
              this._onBeforeCallEnd(session);
              _context19.n = 2;
              return session.terminate();
            case 2:
              _context19.n = 4;
              break;
            case 3:
              _context19.p = 3;
              _t17 = _context19.v;
              console.error(_t17);
              this._onCallEnd(session);
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 3]]);
      }));
      function hangup(_x25) {
        return _hangup.apply(this, arguments);
      }
      return hangup;
    }()
  }, {
    key: "toVoiceMail",
    value: function () {
      var _toVoiceMail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(sessionId) {
        var session, _t18;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context20.n = 1;
                break;
              }
              return _context20.a(2);
            case 1:
              _context20.p = 1;
              session.__rc_isToVoicemail = true;
              _context20.n = 2;
              return session.toVoicemail();
            case 2:
              _context20.n = 4;
              break;
            case 3:
              _context20.p = 3;
              _t18 = _context20.v;
              console.error(_t18);
              this._onCallEnd(session);
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.toVoiceMailError
              });
            case 4:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 3]]);
      }));
      function toVoiceMail(_x26) {
        return _toVoiceMail.apply(this, arguments);
      }
      return toVoiceMail;
    }()
  }, {
    key: "replyWithMessage",
    value: function () {
      var _replyWithMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(sessionId, replyOptions) {
        var session, _t19;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              session = this.originalSessions[sessionId];
              if (session) {
                _context21.n = 1;
                break;
              }
              return _context21.a(2);
            case 1:
              _context21.p = 1;
              session.__rc_isReplied = true;
              _context21.n = 2;
              return session.replyWithMessage(replyOptions);
            case 2:
              _context21.n = 4;
              break;
            case 3:
              _context21.p = 3;
              _t19 = _context21.v;
              console.error(_t19);
              this._onCallEnd(session);
            case 4:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 3]]);
      }));
      function replyWithMessage(_x27, _x28) {
        return _replyWithMessage.apply(this, arguments);
      }
      return replyWithMessage;
    }()
  }, {
    key: "_addTrack",
    value: function _addTrack(rawSession) {
      if (rawSession) {
        rawSession.addTrack(this._remoteVideo, this._localVideo);
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
      var _invite2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(toNumber, _ref9) {
        var inviteOptions, extendedControls, transferSessionId, phoneLines, session;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              inviteOptions = _ref9.inviteOptions, extendedControls = _ref9.extendedControls, transferSessionId = _ref9.transferSessionId;
              if (this._webphone) {
                _context22.n = 1;
                break;
              }
              this._deps.alert.warning({
                message: this.errorCode
              });
              return _context22.a(2, null);
            case 1:
              if (!(toNumber.length > 6 && (!this._deps.availabilityMonitor || !this._deps.availabilityMonitor.isVoIPOnlyMode))) {
                _context22.n = 3;
                break;
              }
              _context22.n = 2;
              return this._fetchDL();
            case 2:
              phoneLines = _context22.v;
              if (!(phoneLines.length === 0)) {
                _context22.n = 3;
                break;
              }
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.noOutboundCallWithoutDL
              });
              return _context22.a(2, null);
            case 3:
              _context22.n = 4;
              return this._holdOtherSession(null);
            case 4:
              session = this._webphone.userAgent.invite(toNumber, inviteOptions);
              session.__rc_direction = _callDirections["default"].outbound;
              session.__rc_callStatus = _sessionStatus.sessionStatus.setup;
              session.__rc_creationTime = Date.now();
              session.__rc_lastActiveTime = Date.now();
              session.__rc_fromNumber = inviteOptions.fromNumber;
              session.__rc_extendedControls = extendedControls;
              session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.pending;
              session.__rc_transferSessionId = transferSessionId;
              this._onAccepted(session);
              this._onCallInit(session);
              return _context22.a(2, session);
          }
        }, _callee22, this);
      }));
      function _invite(_x29, _x30) {
        return _invite2.apply(this, arguments);
      }
      return _invite;
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
      var _makeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(_ref0) {
        var toNumber, fromNumber, homeCountryId, extendedControls, transferSessionId, inviteOptions, result;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              toNumber = _ref0.toNumber, fromNumber = _ref0.fromNumber, homeCountryId = _ref0.homeCountryId, extendedControls = _ref0.extendedControls, transferSessionId = _ref0.transferSessionId;
              inviteOptions = {
                sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions,
                fromNumber: fromNumber,
                homeCountryId: homeCountryId
              };
              _context23.n = 1;
              return this._invite(toNumber, {
                inviteOptions: inviteOptions,
                extendedControls: extendedControls,
                transferSessionId: transferSessionId
              });
            case 1:
              result = _context23.v;
              return _context23.a(2, result);
          }
        }, _callee23, this);
      }));
      function makeCall(_x31) {
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
      var _switchCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(_ref1, homeCountryId) {
        var id, from, direction, to, sipData, extraHeaders, toNumber, fromNumber, inviteOptions, session;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              id = _ref1.id, from = _ref1.from, direction = _ref1.direction, to = _ref1.to, sipData = _ref1.sipData;
              extraHeaders = [];
              extraHeaders.push("Replaces: ".concat(id, ";to-tag=").concat(sipData.fromTag, ";from-tag=").concat(sipData.toTag));
              extraHeaders.push('RC-call-type: replace');
              toNumber = direction === _callDirections["default"].outbound ? to.phoneNumber : from.phoneNumber;
              fromNumber = direction === _callDirections["default"].outbound ? from.phoneNumber : to.phoneNumber;
              inviteOptions = {
                sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions,
                fromNumber: fromNumber,
                homeCountryId: homeCountryId,
                extraHeaders: extraHeaders
              };
              _context24.n = 1;
              return this._invite(toNumber, {
                inviteOptions: inviteOptions
              });
            case 1:
              session = _context24.v;
              return _context24.a(2, session);
          }
        }, _callee24, this);
      }));
      function switchCall(_x32, _x33) {
        return _switchCall.apply(this, arguments);
      }
      return switchCall;
    }())
  }, {
    key: "pickupInboundCall",
    value: function () {
      var _pickupInboundCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(_ref10) {
        var sessionId, toNumber, fromNumber, serverId, extraHeaders, inviteOptions, session;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              sessionId = _ref10.sessionId, toNumber = _ref10.toNumber, fromNumber = _ref10.fromNumber, serverId = _ref10.serverId;
              extraHeaders = ["RC-call-type: inbound-pickup; session-id: ".concat(sessionId, "; server-id: ").concat(serverId)];
              inviteOptions = {
                sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions,
                fromNumber: fromNumber,
                extraHeaders: extraHeaders
              };
              _context25.n = 1;
              return this._invite(toNumber, {
                inviteOptions: inviteOptions
              });
            case 1:
              session = _context25.v;
              return _context25.a(2, session);
          }
        }, _callee25, this);
      }));
      function pickupInboundCall(_x34) {
        return _pickupInboundCall.apply(this, arguments);
      }
      return pickupInboundCall;
    }()
  }, {
    key: "updateSessionMatchedContact",
    value: function () {
      var _updateSessionMatchedContact = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(sessionId, contact) {
        var _this0 = this;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              this._sessionHandleWithId(sessionId, function (session) {
                session.__rc_contactMatch = contact;
                _this0._updateSessions();
              });
            case 1:
              return _context26.a(2);
          }
        }, _callee26, this);
      }));
      function updateSessionMatchedContact(_x35, _x36) {
        return _updateSessionMatchedContact.apply(this, arguments);
      }
      return updateSessionMatchedContact;
    }()
  }, {
    key: "setSessionCaching",
    value: function () {
      var _setSessionCaching2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(sessionIds) {
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              this._setSessionCaching(sessionIds);
            case 1:
              return _context27.a(2);
          }
        }, _callee27, this);
      }));
      function setSessionCaching(_x37) {
        return _setSessionCaching2.apply(this, arguments);
      }
      return setSessionCaching;
    }()
  }, {
    key: "clearSessionCaching",
    value: function () {
      var _clearSessionCaching2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28() {
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              this._clearSessionCaching(
              // @ts-expect-error TS(2345): Argument of type '(NormalizedSession | undefined)[... Remove this comment to see the full error message
              _toConsumableArray(Object.values(this.originalSessions)).map(_webphoneHelper.normalizeSession));
            case 1:
              return _context28.a(2);
          }
        }, _callee28, this);
      }));
      function clearSessionCaching() {
        return _clearSessionCaching2.apply(this, arguments);
      }
      return clearSessionCaching;
    }()
  }, {
    key: "_updateSessions",
    value: function _updateSessions() {
      this._updateSessionsState(
      // @ts-expect-error TS(2345): Argument of type '(NormalizedSession | undefined)[... Remove this comment to see the full error message
      _toConsumableArray(Object.values(this.originalSessions)).map(_webphoneHelper.normalizeSession));
    }
  }, {
    key: "toggleMinimized",
    value: function () {
      var _toggleMinimized = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(sessionId) {
        var _this1 = this;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              this._sessionHandleWithId(sessionId, function (session) {
                session.__rc_minimized = !session.__rc_minimized;
                _this1._updateSessions();
              });
            case 1:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function toggleMinimized(_x38) {
        return _toggleMinimized.apply(this, arguments);
      }
      return toggleMinimized;
    }()
  }, {
    key: "_setActiveWebphoneActiveCallId",
    value: function _setActiveWebphoneActiveCallId(session) {
      if (!this._disconnectOnInactive) {
        return;
      }
      var currentId = localStorage.getItem(this._activeWebphoneActiveCallKey);
      if (currentId !== session.id) {
        localStorage.setItem(this._activeWebphoneActiveCallKey, session.id);
      }
    }
  }, {
    key: "_onCallInit",
    value: function _onCallInit(session) {
      this._updateSessions();
      var normalizedSession = this._getNormalizedSession(session);
      this._setActiveSessionId(normalizedSession.id);
      if (this._deps.contactMatcher && (!this._deps.tabManager || this._deps.tabManager.active)) {
        this._deps.contactMatcher.triggerMatch();
      }
      this._eventEmitter.emit(_events.EVENTS.callInit, normalizedSession, this.activeSession);
      this._setActiveWebphoneActiveCallId(session);
    }
  }, {
    key: "_onCallStart",
    value: function _onCallStart(session) {
      this._updateSessions();
      var normalizedSession = this._getNormalizedSession(session);
      this._setStateOnCallStart(normalizedSession);
      this._eventEmitter.emit(_events.EVENTS.callStart, normalizedSession, this.activeSession);
      this._setActiveWebphoneActiveCallId(session);
    }
  }, {
    key: "_onCallRing",
    value: function _onCallRing(session) {
      this._updateSessions();
      var normalizedSession = this._getNormalizedSession(session);
      this._setStateOnCallRing(normalizedSession);
      if (this._deps.contactMatcher && (!this._deps.tabManager || this._deps.tabManager.active)) {
        this._deps.contactMatcher.triggerMatch();
      }
      if (this.activeSession && !(0, _webphoneHelper.isOnHold)(this.activeSession)) {
        this._webphone.userAgent.audioHelper.playIncoming(false);
      }
      this._eventEmitter.emit(_events.EVENTS.callRing, normalizedSession, this.ringSession);
    }
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
        if (this._reconnectAfterSessionEnd.reason) {
          this._deps.alert.warning({
            message: this._reconnectAfterSessionEnd.reason,
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
    value: function _onCallEnd(session) {
      // should remove __rc_transferSessionId when the call is warm transfer call
      var transferSession = this.sessions.find(function (s) {
        return s.warmTransferSessionId === session.id;
      });
      if (transferSession) {
        var originalTransferSession = this.originalSessions[transferSession.id];
        if (originalTransferSession) {
          delete originalTransferSession.__rc_transferSessionId;
        }
      }
      session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.stopped;
      var normalizedSession = this._getNormalizedSession(session);
      if (!normalizedSession) {
        return;
      }
      if (session.__rc_transferSessionId) {
        var _transferSession = this.originalSessions[session.__rc_transferSessionId];
        if (_transferSession) {
          _transferSession.__rc_isOnTransfer = false;
        }
      }
      this._updateSessions();
      this._setStateOnCallEnd(normalizedSession);
      this._eventEmitter.emit(_events.EVENTS.callEnd, normalizedSession, this.activeSession, this.ringSession);
      this._releaseVideoElementsOnSessionsEmpty();
      this._reconnectWebphoneIfNecessaryOnSessionsEmpty();
      this._makeWebphoneInactiveOnSessionsEmpty();
    }
  }, {
    key: "_onBeforeCallResume",
    value: function _onBeforeCallResume(session) {
      var normalizedSession = this._getNormalizedSession(session);
      this._eventEmitter.emit(_events.EVENTS.beforeCallResume, normalizedSession, this.activeSession);
    }
  }, {
    key: "_onCallResume",
    value: function _onCallResume(session) {
      var normalizedSession = this._getNormalizedSession(session);
      this._setActiveSessionId(normalizedSession.id);
      this._eventEmitter.emit(_events.EVENTS.callResume, normalizedSession, this.activeSession);
      this._setActiveWebphoneActiveCallId(session);
    }
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
      var _this10 = this;
      this._eventEmitter.on(_events.EVENTS.webphoneRegistered, handler);
      return function () {
        _this10._eventEmitter.off(_events.EVENTS.webphoneRegistered, handler);
      };
    }
  }, {
    key: "onWebphoneUnregistered",
    value: function onWebphoneUnregistered(handler) {
      var _this11 = this;
      this._eventEmitter.on(_events.EVENTS.webphoneUnregistered, handler);
      return function () {
        _this11._eventEmitter.off(_events.EVENTS.webphoneUnregistered, handler);
      };
    }
  }, {
    key: "_disconnect",
    value: function () {
      var _disconnect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30() {
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              _context30.n = 1;
              return _superPropGet(Webphone, "_disconnect", this, 3)([]);
            case 1:
              this._updateSessions();
            case 2:
              return _context30.a(2);
          }
        }, _callee30, this);
      }));
      function _disconnect() {
        return _disconnect2.apply(this, arguments);
      }
      return _disconnect;
    }()
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
      var _this12 = this;
      if (!this.activeSessionId) {
        return null;
      }
      var activeSession = (0, _ramda.find)(function (session) {
        return session.id === _this12.activeSessionId;
      }, this.sessions);
      return activeSession;
    }

    /**
     * Current ring session(inbound)
     */
  }, {
    key: "ringSession",
    get: function get() {
      var _this13 = this;
      if (!this.ringSessionId) {
        return null;
      }
      var session = (0, _ramda.find)(function (session) {
        return session.id === _this13.ringSessionId;
      }, this.sessions);
      return session;
    }
  }, {
    key: "ringSessions",
    get: function get() {
      return (0, _ramda.filter)(function (session) {
        return (0, _webphoneHelper.isRing)(session);
      }, this.sessions);
    }
  }, {
    key: "onHoldSessions",
    get: function get() {
      return (0, _ramda.filter)(function (session) {
        return (0, _webphoneHelper.isOnHold)(session);
      }, this.sessions);
    }
  }, {
    key: "cachedSessions",
    get: function get() {
      return (0, _ramda.filter)(function (session) {
        return session.cached;
      }, this.sessions);
    }
  }, {
    key: "acceptOptions",
    get: function get() {
      return {
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: {
              deviceId: this._deps.audioSettings.inputDeviceId
            },
            video: false
          }
        }
      };
    }
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
}(_WebphoneBase2.WebphoneBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "activeSessionId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ringSessionId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lastEndedSessions", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sessions", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateSessionsState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSessionsState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setActiveSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallRing", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallRing"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallStart", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallStart"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallEnd", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSessionCaching", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearSessionCaching", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onHoldCachedSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_onHoldCachedSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackCallAnswer", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackCallAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resume", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "resume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "park", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "park"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startWarmTransfer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeWarmTransfer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "completeWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flip", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "flip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendDTMF", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendDTMF", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangup", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toVoiceMail", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toVoiceMail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyWithMessage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSessionMatchedContact", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSessionMatchedContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSessionCaching", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearSessionCaching", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "clearSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleMinimized", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleMinimized"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionPhoneNumbers", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSession", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSessions", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onHoldSessions", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "onHoldSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cachedSessions", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "cachedSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringingCallOnView", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "ringingCallOnView"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=Webphone.js.map
