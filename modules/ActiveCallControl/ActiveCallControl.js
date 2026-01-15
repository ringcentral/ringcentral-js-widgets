"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.some");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.map");
require("core-js/modules/es.object.entries");
require("core-js/modules/es.object.from-entries");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.object.values");
require("core-js/modules/es.promise");
require("core-js/modules/es.set");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallControl = void 0;
require("regenerator-runtime/runtime");
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
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6; // eslint-disable-next-line import/no-named-as-default
// TODO: should move that callErrors to enums
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var DEFAULT_BUSY_TIMEOUT = 3 * 1000;
var telephonySessionsEndPoint = /\/telephony\/sessions$/;
var subscribeEvent = _subscriptionFilters["default"].telephonySessions;
var ActiveCallControl = (_dec = (0, _di.Module)({
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
}), _dec10 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.unhold)];
}), _dec11 = (0, _core.track)(function (_, params) {
  return [_trackEvents.trackEvents.executionReplyWithMessage, {
    'message type': params.replyWithPattern ? 'Pattern' : 'Custom'
  }];
}), _dec12 = (0, _core.track)(_trackEvents.trackEvents.transfer), _dec13 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.confirmForward)];
}), _dec14 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.answer)];
}), _dec15 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.holdAndAnswer)];
}), _dec16 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.ignore)];
}), _dec17 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.endAndAnswer)];
}), _dec18 = (0, _core.computed)(function (_ref) {
  var activeSessionId = _ref.activeSessionId,
    activeSessions = _ref.activeSessions;
  return [activeSessionId, activeSessions];
}), _dec19 = (0, _core.computed)(function (_ref2) {
  var ringSessionId = _ref2.ringSessionId,
    activeSessions = _ref2.activeSessions;
  return [ringSessionId, activeSessions];
}), _dec20 = (0, _core.computed)(function (_ref3) {
  var sessions = _ref3.sessions;
  return [sessions];
}), _dec21 = (0, _core.computed)(function (that) {
  return [that.sessions, that.timestamp];
}), _dec22 = (0, _core.computed)(function (that) {
  return [that._deps.presence.calls];
}), _dec23 = (0, _core.track)(_trackEvents.trackEvents.inboundWebRTCCallConnected), _dec24 = (0, _core.track)(_trackEvents.trackEvents.dialpadOpen), _dec25 = (0, _core.track)(_trackEvents.trackEvents.dialpadClose), _dec26 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.clickTransfer)];
}), _dec27 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents.forward)];
}), _dec28 = (0, _core.track)(function (that, path) {
  return function (analytics) {
    // @ts-expect-error TS(2339): Property 'getTrackTarget' does not exist on type '... Remove this comment to see the full error message
    var target = analytics.getTrackTarget();
    return [_trackEvents.trackEvents.openEntityDetailLink, {
      path: path || target.router
    }];
  };
}), _dec29 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_trackEvents.trackEvents["switch"])];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ActiveCallControl, _RcModuleV);
  var _super = _createSuper(ActiveCallControl);
  function ActiveCallControl(deps) {
    var _deps$activeCallContr, _deps$activeCallContr2, _this$_deps$activeCal, _this$_deps$activeCal2, _this$_deps$activeCal3, _this$_deps$activeCal4, _this$_deps$activeCal5, _this$_deps$activeCal6, _this$_deps$activeCal7, _this$_deps$activeCal8, _this$_deps$activeCal9, _this$_deps$activeCal10;
    var _this;
    _classCallCheck(this, ActiveCallControl);
    _this = _super.call(this, {
      deps: deps,
      enableCache: (_deps$activeCallContr = (_deps$activeCallContr2 = deps.activeCallControlOptions) === null || _deps$activeCallContr2 === void 0 ? void 0 : _deps$activeCallContr2.enableCache) !== null && _deps$activeCallContr !== void 0 ? _deps$activeCallContr : true,
      storageKey: 'activeCallControl'
    });
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
    _this._enableAutoSwitchFeature = (_this$_deps$activeCal9 = (_this$_deps$activeCal10 = _this._deps.activeCallControlOptions) === null || _this$_deps$activeCal10 === void 0 ? void 0 : _this$_deps$activeCal10.enableAutoSwitchFeature) !== null && _this$_deps$activeCal9 !== void 0 ? _this$_deps$activeCal9 : false;
    _this._autoMergeSignCallIdKey = "".concat(_this._deps.prefix, "-auto-merge-sign-call-id-key");
    _this._autoMergeCallsKey = "".concat(_this._deps.prefix, "-auto-merge-calls-key");
    _this._autoMergeWebphoneSessionsMap = new Map();
    _initializerDefineProperty(_this, "pickUpCallDataMap", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "transferCallMapping", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "data", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "currentDeviceCallsMap", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "lastEndedSessionIds", _descriptor5, _assertThisInitialized(_this));
    // TODO: conference call using
    _initializerDefineProperty(_this, "cachedSessions", _descriptor6, _assertThisInitialized(_this));
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
    _this._deps.subscription.register(_assertThisInitialized(_this), {
      filters: [subscribeEvent]
    });
    return _this;
  }
  _createClass(ActiveCallControl, [{
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.ready && this.hasPermission) {
                  this._subscriptionHandler();
                  this._checkConnectivity();
                }
              case 1:
              case "end":
                return _context.stop();
            }
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
      var _initModule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._createOtherInstanceListener();
                _context2.next = 3;
                return _get(_getPrototypeOf(ActiveCallControl.prototype), "_initModule", this).call(this);
              case 3:
              case "end":
                return _context2.stop();
            }
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
      var _autoMergeCallsHandler2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        var _this$_deps$tabManage2,
          _this3 = this;
        var _JSON$parse2, ids, response, data, activeCalls, callsList;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if ((_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                _context5.prev = 2;
                _JSON$parse2 = JSON.parse(e.newValue), ids = _JSON$parse2.ids;
                _context5.next = 6;
                return this._deps.client.service.platform().get(_subscriptionFilters["default"].detailedPresence);
              case 6:
                response = _context5.sent;
                _context5.next = 9;
                return response.json();
              case 9:
                data = _context5.sent;
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
                  _context5.next = 15;
                  break;
                }
                _context5.next = 15;
                return Promise.all(callsList.map( /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(activeCall) {
                    var switchSession;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return _this3.transferUnmuteHandler(activeCall.telephonySessionId);
                          case 2:
                            switchSession = _this3._rcCall.switchCallFromActiveCall(activeCall, {
                              homeCountryId: _this3._deps.regionSettings.homeCountryId
                            });
                            _this3._autoMergeWebphoneSessionsMap.set(switchSession.webphoneSession, true);
                            switchSession.webphoneSession.mute();
                            switchSession.webphoneSession.once('accepted', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      switchSession.webphoneSession.unmute();
                                      _context3.next = 3;
                                      return switchSession.webphoneSession.hold();
                                    case 3:
                                      _this3._addTrackToActiveSession();
                                    case 4:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3);
                            })));
                          case 6:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return function (_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }()));
              case 15:
                _context5.next = 21;
                break;
              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](2);
                console.log(_context5.t0);
                console.log('auto merge calls from other tabs failed');
              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 17]]);
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
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.hasPermission) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return");
              case 2:
                this._rcCall = this._initRcCall();
                if (!this._shouldFetch()) {
                  _context6.next = 14;
                  break;
                }
                _context6.prev = 4;
                _context6.next = 7;
                return this.fetchData();
              case 7:
                _context6.next = 12;
                break;
              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](4);
                this._retry();
              case 12:
                _context6.next = 15;
                break;
              case 14:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }
              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[4, 9]]);
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
      var _fetchData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData();
                }
                _context7.next = 3;
                return this._promise;
              case 3:
              case "end":
                return _context7.stop();
            }
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
    } // TODO: workaround of PLA bug: https://jira_domain/browse/PLA-52742, remove these code after PLA
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
      var _fetchData3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this._syncData();
              case 3:
                if (this._polling) {
                  this._startPolling();
                }
                this._promise = null;
                _context8.next = 12;
                break;
              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                this._promise = null;
                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }
                throw _context8.t0;
              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
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
      var _syncData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this8 = this;
        var activeCalls;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                activeCalls = this._deps.presence.calls;
                _context9.next = 4;
                return this._rcCall.loadSessions(activeCalls);
              case 4:
                this.updateActiveSessions();
                this._rcCall.sessions.forEach(function (session) {
                  _this8._newSessionHandler(session);
                });
                _context9.next = 12;
                break;
              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                console.log('sync data error:', _context9.t0);
                throw _context9.t0;
              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 8]]);
      }));
      function _syncData() {
        return _syncData2.apply(this, arguments);
      }
      return _syncData;
    }()
  }, {
    key: "_onNewCall",
    value: function () {
      var _onNewCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(session) {
        var ringSession, sessionId;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.updateActiveSessions();
                ringSession = (0, _ramda.find)(function (x) {
                  return (0, _helpers.isRinging)(x) && x.id === session.id;
                }, this.sessions);
                sessionId = ringSession === null || ringSession === void 0 ? void 0 : ringSession.id;
                this._setRingSessionId(sessionId);
              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
    } // count it as load (should only call on container init step)
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
      var _mute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(telephonySessionId) {
        var session, _this$_deps$availabil;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                _context11.next = 5;
                return session.mute();
              case 5:
                this.clearCallControlBusyTimestamp();
                _context11.next = 23;
                break;
              case 8:
                _context11.prev = 8;
                _context11.t0 = _context11["catch"](0);
                if (!(_context11.t0.response && !_context11.t0.response._text)) {
                  _context11.next = 14;
                  break;
                }
                _context11.next = 13;
                return _context11.t0.response.clone().text();
              case 13:
                _context11.t0.response._text = _context11.sent;
              case 14:
                if (!(0, _helpers.conflictError)(_context11.t0)) {
                  _context11.next = 18;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.muteConflictError
                });
                _context11.next = 22;
                break;
              case 18:
                _context11.next = 20;
                return (_this$_deps$availabil = this._deps.availabilityMonitor) === null || _this$_deps$availabil === void 0 ? void 0 : _this$_deps$availabil.checkIfHAError(_context11.t0);
              case 20:
                if (_context11.sent) {
                  _context11.next = 22;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
              case 22:
                this.clearCallControlBusyTimestamp();
              case 23:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 8]]);
      }));
      function mute(_x4) {
        return _mute.apply(this, arguments);
      }
      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(telephonySessionId) {
        var session, _this$_deps$availabil2;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                _context12.next = 5;
                return session.unmute();
              case 5:
                this.clearCallControlBusyTimestamp();
                _context12.next = 23;
                break;
              case 8:
                _context12.prev = 8;
                _context12.t0 = _context12["catch"](0);
                if (!(_context12.t0.response && !_context12.t0.response._text)) {
                  _context12.next = 14;
                  break;
                }
                _context12.next = 13;
                return _context12.t0.response.clone().text();
              case 13:
                _context12.t0.response._text = _context12.sent;
              case 14:
                if (!(0, _helpers.conflictError)(_context12.t0)) {
                  _context12.next = 18;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.unMuteConflictError
                });
                _context12.next = 22;
                break;
              case 18:
                _context12.next = 20;
                return (_this$_deps$availabil2 = this._deps.availabilityMonitor) === null || _this$_deps$availabil2 === void 0 ? void 0 : _this$_deps$availabil2.checkIfHAError(_context12.t0);
              case 20:
                if (_context12.sent) {
                  _context12.next = 22;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
              case 22:
                this.clearCallControlBusyTimestamp();
              case 23:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 8]]);
      }));
      function unmute(_x5) {
        return _unmute.apply(this, arguments);
      }
      return unmute;
    }()
  }, {
    key: "transferUnmuteHandler",
    value: function () {
      var _transferUnmuteHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(telephonySessionId) {
        var _session$telephonySes, _session$telephonySes2, session;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                session = this._getSessionById(telephonySessionId);
                if (!(session === null || session === void 0 ? void 0 : (_session$telephonySes = session.telephonySession) === null || _session$telephonySes === void 0 ? void 0 : (_session$telephonySes2 = _session$telephonySes.party) === null || _session$telephonySes2 === void 0 ? void 0 : _session$telephonySes2.muted)) {
                  _context13.next = 5;
                  break;
                }
                _context13.next = 5;
                return session.unmute();
              case 5:
                _context13.next = 9;
                break;
              case 7:
                _context13.prev = 7;
                _context13.t0 = _context13["catch"](0);
              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 7]]);
      }));
      function transferUnmuteHandler(_x6) {
        return _transferUnmuteHandler.apply(this, arguments);
      }
      return transferUnmuteHandler;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(telephonySessionId) {
        var session, recordingId, _ref7, _ref7$errors, errors, _iterator, _step, _error;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                recordingId = this.getRecordingId(session);
                _context14.next = 6;
                return session.startRecord({
                  recordingId: recordingId
                });
              case 6:
                this.clearCallControlBusyTimestamp();
                return _context14.abrupt("return", true);
              case 10:
                _context14.prev = 10;
                _context14.t0 = _context14["catch"](0);
                // TODO: fix error handling with instanceof
                this.clearCallControlBusyTimestamp();
                _context14.next = 15;
                return _context14.t0.response.clone().json();
              case 15:
                _context14.t1 = _context14.sent;
                if (_context14.t1) {
                  _context14.next = 18;
                  break;
                }
                _context14.t1 = {};
              case 18:
                _ref7 = _context14.t1;
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
              case 22:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 10]]);
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
      var _stopRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(telephonySessionId) {
        var session, recordingId;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                recordingId = this.getRecordingId(session);
                _context15.next = 6;
                return session.stopRecord({
                  recordingId: recordingId
                });
              case 6:
                this.clearCallControlBusyTimestamp();
                _context15.next = 14;
                break;
              case 9:
                _context15.prev = 9;
                _context15.t0 = _context15["catch"](0);
                console.log('stop record error:', _context15.t0);
                this._deps.alert.danger({
                  message: _webphoneErrors.webphoneErrors.pauseRecordError
                });
                this.clearCallControlBusyTimestamp();
              case 14:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[0, 9]]);
      }));
      function stopRecord(_x8) {
        return _stopRecord.apply(this, arguments);
      }
      return stopRecord;
    }()
  }, {
    key: "hangUp",
    value: function () {
      var _hangUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(telephonySessionId) {
        var _this$_onCallEndFunc, session, _this$_deps$availabil3;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                _context16.next = 5;
                return session.hangup();
              case 5:
                (_this$_onCallEndFunc = this._onCallEndFunc) === null || _this$_onCallEndFunc === void 0 ? void 0 : _this$_onCallEndFunc.call(this);
                // TODO: find way to fix that 800ms
                // avoid hung up sync slow and user click multiple times.
                _context16.next = 8;
                return (0, _utils.sleep)(800);
              case 8:
                this.clearCallControlBusyTimestamp();
                _context16.next = 19;
                break;
              case 11:
                _context16.prev = 11;
                _context16.t0 = _context16["catch"](0);
                // TODO: fix error handling with instanceof
                console.error('hangup error', _context16.t0);
                _context16.next = 16;
                return (_this$_deps$availabil3 = this._deps.availabilityMonitor) === null || _this$_deps$availabil3 === void 0 ? void 0 : _this$_deps$availabil3.checkIfHAError(_context16.t0);
              case 16:
                if (_context16.sent) {
                  _context16.next = 18;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
              case 18:
                this.clearCallControlBusyTimestamp();
              case 19:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[0, 11]]);
      }));
      function hangUp(_x9) {
        return _hangUp.apply(this, arguments);
      }
      return hangUp;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(telephonySessionId) {
        var session, _this$_deps$availabil4;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId); // !If is a queue call, ignore is performed
                if (!session.party.queueCall) {
                  _context17.next = 7;
                  break;
                }
                _context17.next = 6;
                return this.ignore(telephonySessionId);
              case 6:
                return _context17.abrupt("return", _context17.sent);
              case 7:
                _context17.next = 9;
                return session.toVoicemail();
              case 9:
                if (session && session.webphoneSession) {
                  session.webphoneSession.__rc_isToVoicemail = true;
                }
                this.clearCallControlBusyTimestamp();
                _context17.next = 20;
                break;
              case 13:
                _context17.prev = 13;
                _context17.t0 = _context17["catch"](0);
                _context17.next = 17;
                return (_this$_deps$availabil4 = this._deps.availabilityMonitor) === null || _this$_deps$availabil4 === void 0 ? void 0 : _this$_deps$availabil4.checkIfHAError(_context17.t0);
              case 17:
                if (_context17.sent) {
                  _context17.next = 19;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
              case 19:
                this.clearCallControlBusyTimestamp();
              case 20:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[0, 13]]);
      }));
      function reject(_x10) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }()
  }, {
    key: "switch",
    value: function () {
      var _switch2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(telephonySessionId) {
        var _this$_onCallSwitched, switchedSession, _this$_deps$availabil5;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                this.setCallControlBusyTimestamp();
                _context18.next = 4;
                return this.transferUnmuteHandler(telephonySessionId);
              case 4:
                _context18.next = 6;
                return this._rcCall.switchCall(telephonySessionId, {
                  homeCountryId: this._deps.regionSettings.homeCountryId
                });
              case 6:
                switchedSession = _context18.sent;
                this._triggerAutoMergeEvent(telephonySessionId);
                _context18.next = 10;
                return this._holdOtherCalls(telephonySessionId);
              case 10:
                this.clearCallControlBusyTimestamp();
                (_this$_onCallSwitched = this._onCallSwitchedFunc) === null || _this$_onCallSwitched === void 0 ? void 0 : _this$_onCallSwitched.call(this, switchedSession.sessionId);
                _context18.next = 21;
                break;
              case 14:
                _context18.prev = 14;
                _context18.t0 = _context18["catch"](0);
                _context18.next = 18;
                return (_this$_deps$availabil5 = this._deps.availabilityMonitor) === null || _this$_deps$availabil5 === void 0 ? void 0 : _this$_deps$availabil5.checkIfHAError(_context18.t0);
              case 18:
                if (_context18.sent) {
                  _context18.next = 20;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
              case 20:
                this.clearCallControlBusyTimestamp();
              case 21:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[0, 14]]);
      }));
      function _switch(_x11) {
        return _switch2.apply(this, arguments);
      }
      return _switch;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(telephonySessionId) {
        var _otherParties$, _otherParties$$status, _otherParties$2, _otherParties$2$statu, session, webphoneSession, _session$otherParties, otherParties, _this$_deps$availabil6;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                webphoneSession = session.webphoneSession, _session$otherParties = session.otherParties, otherParties = _session$otherParties === void 0 ? [] : _session$otherParties;
                if (!(
                // when call is connecting or in voicemail then call control's Hold API will not work
                // so use webphone hold here
                session.direction === _callDirections.callDirection.outbound && (((_otherParties$ = otherParties[0]) === null || _otherParties$ === void 0 ? void 0 : (_otherParties$$status = _otherParties$.status) === null || _otherParties$$status === void 0 ? void 0 : _otherParties$$status.code) === _Session.PartyStatusCode.proceeding || ((_otherParties$2 = otherParties[0]) === null || _otherParties$2 === void 0 ? void 0 : (_otherParties$2$statu = _otherParties$2.status) === null || _otherParties$2$statu === void 0 ? void 0 : _otherParties$2$statu.code) === _Session.PartyStatusCode.voicemail) || (0, _helpers.isAtMainNumberPromptToneStage)(session))) {
                  _context19.next = 9;
                  break;
                }
                _context19.next = 7;
                return webphoneSession.hold();
              case 7:
                _context19.next = 11;
                break;
              case 9:
                _context19.next = 11;
                return session.hold();
              case 11:
                if (webphoneSession && webphoneSession.__rc_callStatus) {
                  webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
                }
                this.clearCallControlBusyTimestamp();
                _context19.next = 30;
                break;
              case 15:
                _context19.prev = 15;
                _context19.t0 = _context19["catch"](0);
                if (!(_context19.t0.response && !_context19.t0.response._text)) {
                  _context19.next = 21;
                  break;
                }
                _context19.next = 20;
                return _context19.t0.response.clone().text();
              case 20:
                _context19.t0.response._text = _context19.sent;
              case 21:
                if (!(0, _helpers.conflictError)(_context19.t0)) {
                  _context19.next = 25;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.holdConflictError
                });
                _context19.next = 29;
                break;
              case 25:
                _context19.next = 27;
                return (_this$_deps$availabil6 = this._deps.availabilityMonitor) === null || _this$_deps$availabil6 === void 0 ? void 0 : _this$_deps$availabil6.checkIfHAError(_context19.t0);
              case 27:
                if (_context19.sent) {
                  _context19.next = 29;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
              case 29:
                this.clearCallControlBusyTimestamp();
              case 30:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[0, 15]]);
      }));
      function hold(_x12) {
        return _hold.apply(this, arguments);
      }
      return hold;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(telephonySessionId) {
        var session, webphoneSession, _this$_deps$availabil7;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                _context20.next = 5;
                return this._holdOtherCalls(telephonySessionId);
              case 5:
                _context20.next = 7;
                return session.unhold();
              case 7:
                this._activeSession = session;
                webphoneSession = session.webphoneSession;
                if (webphoneSession && webphoneSession.__rc_callStatus) {
                  webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
                }
                this.setActiveSessionId(telephonySessionId);
                this._addTrackToActiveSession();
                this.clearCallControlBusyTimestamp();
                _context20.next = 30;
                break;
              case 15:
                _context20.prev = 15;
                _context20.t0 = _context20["catch"](0);
                if (!(_context20.t0.response && !_context20.t0.response._text)) {
                  _context20.next = 21;
                  break;
                }
                _context20.next = 20;
                return _context20.t0.response.clone().text();
              case 20:
                _context20.t0.response._text = _context20.sent;
              case 21:
                if (!(0, _helpers.conflictError)(_context20.t0)) {
                  _context20.next = 25;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.unHoldConflictError
                });
                _context20.next = 29;
                break;
              case 25:
                _context20.next = 27;
                return (_this$_deps$availabil7 = this._deps.availabilityMonitor) === null || _this$_deps$availabil7 === void 0 ? void 0 : _this$_deps$availabil7.checkIfHAError(_context20.t0);
              case 27:
                if (_context20.sent) {
                  _context20.next = 29;
                  break;
                }
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
              case 29:
                this.clearCallControlBusyTimestamp();
              case 30:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[0, 15]]);
      }));
      function unhold(_x13) {
        return _unhold.apply(this, arguments);
      }
      return unhold;
    }()
  }, {
    key: "replyWithMessage",
    value: function () {
      var _replyWithMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(params, telephonySessionId) {
        var session, webphoneReplyOption;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                if (session) {
                  _context21.next = 5;
                  break;
                }
                return _context21.abrupt("return", false);
              case 5:
                // await session.replyWithMessage(params);
                webphoneReplyOption = (0, _helpers.getWebphoneReplyMessageOption)(params);
                _context21.next = 8;
                return session.webphoneSession.replyWithMessage(webphoneReplyOption);
              case 8:
                this.clearCallControlBusyTimestamp();
                this._deps.alert.success({
                  message: _callControlError.callControlError.replyCompleted
                });
                _context21.next = 17;
                break;
              case 12:
                _context21.prev = 12;
                _context21.t0 = _context21["catch"](0);
                console.error('replyWithMessage error', _context21.t0);
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
                this.clearCallControlBusyTimestamp();
              case 17:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this, [[0, 12]]);
      }));
      function replyWithMessage(_x14, _x15) {
        return _replyWithMessage.apply(this, arguments);
      }
      return replyWithMessage;
    }()
  }, {
    key: "toVoicemail",
    value: function () {
      var _toVoicemail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(voicemailId, telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                if (session) {
                  _context22.next = 5;
                  break;
                }
                return _context22.abrupt("return", false);
              case 5:
                _context22.next = 7;
                return session.transfer(voicemailId, {
                  type: 'voicemail'
                });
              case 7:
                this.clearCallControlBusyTimestamp();
                this._deps.alert.success({
                  message: _callControlError.callControlError.transferCompleted
                });
                _context22.next = 16;
                break;
              case 11:
                _context22.prev = 11;
                _context22.t0 = _context22["catch"](0);
                console.error('toVoicemail error', _context22.t0);
                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.toVoiceMailError
                });
                this.clearCallControlBusyTimestamp();
              case 16:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this, [[0, 11]]);
      }));
      function toVoicemail(_x16, _x17) {
        return _toVoicemail.apply(this, arguments);
      }
      return toVoicemail;
    }()
  }, {
    key: "completeWarmTransfer",
    value: function () {
      var _completeWarmTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(telephonySession) {
        var _this$transferCallMap, isOriginal, relatedTelephonySessionId, session, transferSession;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.prev = 0;
                this.setCallControlBusyTimestamp();
                _this$transferCallMap = this.transferCallMapping[telephonySession], isOriginal = _this$transferCallMap.isOriginal, relatedTelephonySessionId = _this$transferCallMap.relatedTelephonySessionId;
                session = this._getSessionById(isOriginal ? telephonySession : relatedTelephonySessionId);
                transferSession = this._getSessionById(isOriginal ? relatedTelephonySessionId : telephonySession);
                if (transferSession) {
                  _context23.next = 7;
                  break;
                }
                return _context23.abrupt("return", false);
              case 7:
                _context23.next = 9;
                return session.warmTransfer(transferSession);
              case 9:
                this.clearCallControlBusyTimestamp();
                this._deps.alert.success({
                  message: _callControlError.callControlError.transferCompleted
                });
                _context23.next = 18;
                break;
              case 13:
                _context23.prev = 13;
                _context23.t0 = _context23["catch"](0);
                console.error('warmTransfer error', _context23.t0);
                this._deps.alert.warning({
                  message: _callControlError.callControlError.generalError
                });
                this.clearCallControlBusyTimestamp();
              case 18:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this, [[0, 13]]);
      }));
      function completeWarmTransfer(_x18) {
        return _completeWarmTransfer.apply(this, arguments);
      }
      return completeWarmTransfer;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(transferNumber, telephonySessionId) {
        var session, phoneNumber, _this$_deps$availabil8;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                _context24.next = 5;
                return this.getValidPhoneNumber(transferNumber, true);
              case 5:
                phoneNumber = _context24.sent;
                if (!phoneNumber) {
                  _context24.next = 11;
                  break;
                }
                _context24.next = 9;
                return session.transfer(phoneNumber);
              case 9:
                this.clearCallControlBusyTimestamp();
                this._deps.alert.success({
                  message: _callControlError.callControlError.transferCompleted
                });
              case 11:
                _context24.next = 20;
                break;
              case 13:
                _context24.prev = 13;
                _context24.t0 = _context24["catch"](0);
                _context24.next = 17;
                return (_this$_deps$availabil8 = this._deps.availabilityMonitor) === null || _this$_deps$availabil8 === void 0 ? void 0 : _this$_deps$availabil8.checkIfHAError(_context24.t0);
              case 17:
                if (_context24.sent) {
                  _context24.next = 19;
                  break;
                }
                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.transferError
                });
              case 19:
                this.clearCallControlBusyTimestamp();
              case 20:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this, [[0, 13]]);
      }));
      function transfer(_x19, _x20) {
        return _transfer.apply(this, arguments);
      }
      return transfer;
    }()
  }, {
    key: "getValidPhoneNumber",
    value: function () {
      var _getValidPhoneNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(phoneNumber, withMainNumber) {
        var _this9 = this;
        var validatedResult, validPhoneNumber, _this$_deps$appFeatur, isEDPEnabled, _parsedNumbers$0$avai, parsedNumbers, _numbers, _numbers$, result;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                if (this._permissionCheck) {
                  _context26.next = 5;
                  break;
                }
                validatedResult = (0, _validateNumbers.validateNumbers)({
                  allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
                  areaCode: this._deps.regionSettings.areaCode,
                  countryCode: this._deps.regionSettings.countryCode,
                  phoneNumbers: [phoneNumber]
                });
                validPhoneNumber = validatedResult[0];
                _context26.next = 25;
                break;
              case 5:
                isEDPEnabled = (_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isEDPEnabled;
                if (!isEDPEnabled) {
                  _context26.next = 10;
                  break;
                }
                _context26.t0 = this._deps.numberValidate.validate([phoneNumber]);
                _context26.next = 13;
                break;
              case 10:
                _context26.next = 12;
                return this._deps.numberValidate.validateNumbers([phoneNumber]);
              case 12:
                _context26.t0 = _context26.sent;
              case 13:
                validatedResult = _context26.t0;
                if (validatedResult.result) {
                  _context26.next = 17;
                  break;
                }
                validatedResult.errors.forEach( /*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(error) {
                    var _this9$_deps$availabi;
                    var isHAError;
                    return regeneratorRuntime.wrap(function _callee25$(_context25) {
                      while (1) {
                        switch (_context25.prev = _context25.next) {
                          case 0:
                            _context25.next = 2;
                            return (_this9$_deps$availabi = _this9._deps.availabilityMonitor) === null || _this9$_deps$availabi === void 0 ? void 0 : _this9$_deps$availabi.checkIfHAError(error);
                          case 2:
                            isHAError = !!_context25.sent;
                            if (!isHAError) {
                              // TODO: fix `callErrors` type
                              _this9._deps.alert.warning({
                                message: _callErrors.callErrors[error.type],
                                payload: {
                                  phoneNumber: error.phoneNumber
                                }
                              });
                            }
                          case 4:
                          case "end":
                            return _context25.stop();
                        }
                      }
                    }, _callee25);
                  }));
                  return function (_x23) {
                    return _ref8.apply(this, arguments);
                  };
                }());
                return _context26.abrupt("return");
              case 17:
                if (!isEDPEnabled) {
                  _context26.next = 24;
                  break;
                }
                _context26.next = 20;
                return this._deps.numberValidate.parseNumbers([phoneNumber]);
              case 20:
                parsedNumbers = _context26.sent;
                validPhoneNumber = (_parsedNumbers$0$avai = parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai !== void 0 ? _parsedNumbers$0$avai : parsedNumbers === null || parsedNumbers === void 0 ? void 0 : parsedNumbers[0].parsedNumber;
                _context26.next = 25;
                break;
              case 24:
                // TODO: fix `validatedResult` type in `numberValidate` module.
                validPhoneNumber = (_numbers = validatedResult.numbers) === null || _numbers === void 0 ? void 0 : (_numbers$ = _numbers[0]) === null || _numbers$ === void 0 ? void 0 : _numbers$.e164;
              case 25:
                result = validPhoneNumber;
                if (withMainNumber && validPhoneNumber.indexOf('+') === -1) {
                  result = [this._deps.accountInfo.mainCompanyNumber, validPhoneNumber].join('*');
                }
                return _context26.abrupt("return", result);
              case 28:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));
      function getValidPhoneNumber(_x21, _x22) {
        return _getValidPhoneNumber.apply(this, arguments);
      }
      return getValidPhoneNumber;
    }() // FIXME: Incomplete Implementation?
  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(flipValue, telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                _context27.next = 5;
                return session.flip({
                  callFlipId: flipValue
                });
              case 5:
                this.clearCallControlBusyTimestamp();
                _context27.next = 13;
                break;
              case 8:
                _context27.prev = 8;
                _context27.t0 = _context27["catch"](0);
                console.error('flip error', _context27.t0);
                this.clearCallControlBusyTimestamp();
                throw _context27.t0;
              case 13:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this, [[0, 8]]);
      }));
      function flip(_x24, _x25) {
        return _flip.apply(this, arguments);
      }
      return flip;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(forwardNumber, telephonySessionId) {
        var _this10 = this;
        var session, validatedResult, validPhoneNumber, _this$_deps$appFeatur2, isEDPEnabled, parsedNumbers, _parsedNumbers$0$avai2, _numbers2, _numbers2$;
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                session = this._getSessionById(telephonySessionId);
                if (session) {
                  _context28.next = 3;
                  break;
                }
                return _context28.abrupt("return", false);
              case 3:
                _context28.prev = 3;
                if (this._permissionCheck) {
                  _context28.next = 9;
                  break;
                }
                validatedResult = (0, _validateNumbers.validateNumbers)({
                  allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
                  areaCode: this._deps.regionSettings.areaCode,
                  countryCode: this._deps.regionSettings.countryCode,
                  phoneNumbers: [forwardNumber]
                });
                validPhoneNumber = validatedResult[0];
                _context28.next = 29;
                break;
              case 9:
                isEDPEnabled = (_this$_deps$appFeatur2 = this._deps.appFeatures) === null || _this$_deps$appFeatur2 === void 0 ? void 0 : _this$_deps$appFeatur2.isEDPEnabled;
                if (!isEDPEnabled) {
                  _context28.next = 14;
                  break;
                }
                _context28.t0 = this._deps.numberValidate.validate([forwardNumber]);
                _context28.next = 17;
                break;
              case 14:
                _context28.next = 16;
                return this._deps.numberValidate.validateNumbers([forwardNumber]);
              case 16:
                _context28.t0 = _context28.sent;
              case 17:
                validatedResult = _context28.t0;
                if (validatedResult.result) {
                  _context28.next = 21;
                  break;
                }
                validatedResult.errors.forEach(function (error) {
                  _this10._deps.alert.warning({
                    message: _callErrors.callErrors[error.type],
                    payload: {
                      phoneNumber: error.phoneNumber
                    }
                  });
                });
                return _context28.abrupt("return", false);
              case 21:
                if (!isEDPEnabled) {
                  _context28.next = 28;
                  break;
                }
                _context28.next = 24;
                return this._deps.numberValidate.parseNumbers([forwardNumber]);
              case 24:
                parsedNumbers = _context28.sent;
                if (parsedNumbers) {
                  validPhoneNumber = (_parsedNumbers$0$avai2 = parsedNumbers[0].availableExtension) !== null && _parsedNumbers$0$avai2 !== void 0 ? _parsedNumbers$0$avai2 : parsedNumbers[0].parsedNumber;
                }
                _context28.next = 29;
                break;
              case 28:
                validPhoneNumber = (_numbers2 = validatedResult.numbers) === null || _numbers2 === void 0 ? void 0 : (_numbers2$ = _numbers2[0]) === null || _numbers2$ === void 0 ? void 0 : _numbers2$.e164;
              case 29:
                if (session && session.webphoneSession) {
                  session.webphoneSession.__rc_isForwarded = true;
                }
                _context28.next = 32;
                return session.forward(validPhoneNumber, this.acceptOptions);
              case 32:
                this._deps.alert.success({
                  message: _callControlError.callControlError.forwardSuccess
                });
                if (typeof this._onCallEndFunc === 'function') {
                  this._onCallEndFunc();
                }
                return _context28.abrupt("return", true);
              case 37:
                _context28.prev = 37;
                _context28.t1 = _context28["catch"](3);
                console.error(_context28.t1);
                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.unknownError
                });
                return _context28.abrupt("return", false);
              case 42:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this, [[3, 37]]);
      }));
      function forward(_x26, _x27) {
        return _forward.apply(this, arguments);
      }
      return forward;
    }() // DTMF handing by webphone session temporary, due to rc call session doesn't support currently
  }, {
    key: "sendDTMF",
    value: function () {
      var _sendDTMF = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(dtmfValue, telephonySessionId) {
        var session, webphoneSession;
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.prev = 0;
                session = this._getSessionById(telephonySessionId); // TODO: using rc call session
                webphoneSession = session.webphoneSession;
                if (!webphoneSession) {
                  _context29.next = 6;
                  break;
                }
                _context29.next = 6;
                return webphoneSession.dtmf(dtmfValue, 100);
              case 6:
                _context29.next = 12;
                break;
              case 8:
                _context29.prev = 8;
                _context29.t0 = _context29["catch"](0);
                console.log('send dtmf error', _context29.t0);
                throw _context29.t0;
              case 12:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this, [[0, 8]]);
      }));
      function sendDTMF(_x28, _x29) {
        return _sendDTMF.apply(this, arguments);
      }
      return sendDTMF;
    }()
  }, {
    key: "_onWebphoneInvite",
    value: function _onWebphoneInvite(session) {
      var _this11 = this;
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
        var _ref9 = _this11.rcCallSessions.find(function (s) {
            return s.webphoneSession === webphoneSession;
          }) || {},
          telephonySessionId = _ref9.telephonySessionId;
        if (!telephonySessionId) return;
        _this11._setActiveSessionIdFromOnHoldCalls(telephonySessionId);
        _this11._onCallEnd(telephonySessionId);
      });
      webphoneSession.on('accepted', function () {
        var _ref10 = _this11.rcCallSessions.find(function (s) {
            return s.webphoneSession === webphoneSession;
          }) || {},
          telephonySessionId = _ref10.telephonySessionId;
        if (!telephonySessionId) return;
        if (_this11._autoMergeWebphoneSessionsMap.get(webphoneSession)) {
          _this11._autoMergeWebphoneSessionsMap["delete"](webphoneSession);
        } else {
          _this11.setActiveSessionId(telephonySessionId);
          _this11._holdOtherCalls(telephonySessionId);
          _this11._addTrackToActiveSession();
        }
        _this11.updateActiveSessions();
        _this11._onCallAccepted(telephonySessionId);
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
      var _holdOtherCalls2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(telephonySessionId) {
        var currSessions, otherSessions, holdOtherSessions;
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                currSessions = this._rcCall.sessions;
                otherSessions = (0, _ramda.filter)(function (s) {
                  return s.telephonySessionId !== telephonySessionId && (s.status === _Session.PartyStatusCode.answered || s.webphoneSession && !s.webphoneSession.localHold);
                }, currSessions);
                if (otherSessions.length) {
                  _context31.next = 4;
                  break;
                }
                return _context31.abrupt("return");
              case 4:
                holdOtherSessions = otherSessions.map( /*#__PURE__*/function () {
                  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(session) {
                    var webphoneSession, _session$otherParties2, otherParties, _otherParties$3, _otherParties$3$statu, _otherParties$4, _otherParties$4$statu;
                    return regeneratorRuntime.wrap(function _callee30$(_context30) {
                      while (1) {
                        switch (_context30.prev = _context30.next) {
                          case 0:
                            webphoneSession = session.webphoneSession, _session$otherParties2 = session.otherParties, otherParties = _session$otherParties2 === void 0 ? [] : _session$otherParties2;
                            _context30.prev = 1;
                            if (!(
                            // when call is connecting or in voicemail then call control's Hold API will not work
                            // so use webphone hold here
                            session.direction === _callDirections.callDirection.outbound && (((_otherParties$3 = otherParties[0]) === null || _otherParties$3 === void 0 ? void 0 : (_otherParties$3$statu = _otherParties$3.status) === null || _otherParties$3$statu === void 0 ? void 0 : _otherParties$3$statu.code) === _Session.PartyStatusCode.proceeding || ((_otherParties$4 = otherParties[0]) === null || _otherParties$4 === void 0 ? void 0 : (_otherParties$4$statu = _otherParties$4.status) === null || _otherParties$4$statu === void 0 ? void 0 : _otherParties$4$statu.code) === _Session.PartyStatusCode.voicemail) || (0, _helpers.isAtMainNumberPromptToneStage)(session))) {
                              _context30.next = 7;
                              break;
                            }
                            _context30.next = 5;
                            return webphoneSession.hold();
                          case 5:
                            _context30.next = 9;
                            break;
                          case 7:
                            _context30.next = 9;
                            return session.hold();
                          case 9:
                            if (webphoneSession && webphoneSession.__rc_callStatus) {
                              webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
                            }
                            _context30.next = 15;
                            break;
                          case 12:
                            _context30.prev = 12;
                            _context30.t0 = _context30["catch"](1);
                            console.log('Hold call fail.', _context30.t0);
                          case 15:
                          case "end":
                            return _context30.stop();
                        }
                      }
                    }, _callee30, null, [[1, 12]]);
                  }));
                  return function (_x31) {
                    return _ref11.apply(this, arguments);
                  };
                }());
                _context31.next = 7;
                return Promise.all(holdOtherSessions);
              case 7:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));
      function _holdOtherCalls(_x30) {
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
      var _answer2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(telephonySessionId) {
        var _this$_deps$webphone3, _this$_deps$webphone4, session, webphoneSession, deviceId, _this$_deps$webphone5;
        return regeneratorRuntime.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.prev = 0;
                this._triggerAutoMergeEvent(telephonySessionId);
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                this._activeSession = session;
                _context32.next = 7;
                return this._holdOtherCalls(telephonySessionId);
              case 7:
                webphoneSession = session.webphoneSession;
                deviceId = (_this$_deps$webphone3 = this._deps.webphone) === null || _this$_deps$webphone3 === void 0 ? void 0 : (_this$_deps$webphone4 = _this$_deps$webphone3.device) === null || _this$_deps$webphone4 === void 0 ? void 0 : _this$_deps$webphone4.id;
                if (!webphoneSession) {
                  _context32.next = 15;
                  break;
                }
                (_this$_deps$webphone5 = this._deps.webphone) === null || _this$_deps$webphone5 === void 0 ? void 0 : _this$_deps$webphone5.initWebphoneSessionEvents(webphoneSession);
                _context32.next = 13;
                return session.answer({
                  deviceId: deviceId
                });
              case 13:
                _context32.next = 17;
                break;
              case 15:
                _context32.next = 17;
                return this.pickUpCall(_objectSpread({}, this.pickUpCallDataMap[telephonySessionId]));
              case 17:
                this._trackWebRTCCallAnswer();
                if (webphoneSession && webphoneSession.__rc_callStatus) {
                  webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
                }
              case 19:
                _context32.prev = 19;
                this.clearCallControlBusyTimestamp();
                return _context32.finish(19);
              case 22:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this, [[0,, 19, 22]]);
      }));
      function _answer(_x32) {
        return _answer2.apply(this, arguments);
      }
      return _answer;
    }()
  }, {
    key: "pickUpCall",
    value: function () {
      var _pickUpCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(data) {
        var _this$_rcCall2;
        var telephonySessionId;
        return regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                telephonySessionId = data.telephonySessionId;
                _context33.next = 3;
                return (_this$_rcCall2 = this._rcCall) === null || _this$_rcCall2 === void 0 ? void 0 : _this$_rcCall2.pickupInboundCall(_objectSpread(_objectSpread(_objectSpread({}, this.pickUpCallDataMap[telephonySessionId]), data), this.acceptOptions));
              case 3:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));
      function pickUpCall(_x33) {
        return _pickUpCall.apply(this, arguments);
      }
      return pickUpCall;
    }()
  }, {
    key: "answer",
    value: function () {
      var _answer3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(telephonySessionId) {
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _context34.prev = 0;
                _context34.next = 3;
                return this._answer(telephonySessionId);
              case 3:
                _context34.next = 8;
                break;
              case 5:
                _context34.prev = 5;
                _context34.t0 = _context34["catch"](0);
                console.log('answer failed.');
              case 8:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this, [[0, 5]]);
      }));
      function answer(_x34) {
        return _answer3.apply(this, arguments);
      }
      return answer;
    }()
  }, {
    key: "answerAndHold",
    value: function () {
      var _answerAndHold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(telephonySessionId) {
        return regeneratorRuntime.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                _context35.prev = 0;
                _context35.next = 3;
                return this._answer(telephonySessionId);
              case 3:
                _context35.next = 8;
                break;
              case 5:
                _context35.prev = 5;
                _context35.t0 = _context35["catch"](0);
                console.log('answer hold failed.', _context35.t0);
              case 8:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this, [[0, 5]]);
      }));
      function answerAndHold(_x35) {
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
    value: function () {
      var _ignore = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(telephonySessionId) {
        var _this12 = this;
        var _this$onCallIgnoreFun, session, webphoneSession;
        return regeneratorRuntime.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                _context36.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                webphoneSession = session.webphoneSession;
                _context36.next = 6;
                return webphoneSession === null || webphoneSession === void 0 ? void 0 : webphoneSession.reject();
              case 6:
                // hack for update sessions, then incoming call log page can re-render
                setTimeout(function () {
                  return _this12.updateActiveSessions();
                }, 0);
                this.clearCallControlBusyTimestamp();
                (_this$onCallIgnoreFun = this.onCallIgnoreFunc) === null || _this$onCallIgnoreFun === void 0 ? void 0 : _this$onCallIgnoreFun.call(this, session.party.id);
                _context36.next = 14;
                break;
              case 11:
                _context36.prev = 11;
                _context36.t0 = _context36["catch"](0);
                console.log('===ignore failed.', _context36.t0);
              case 14:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this, [[0, 11]]);
      }));
      function ignore(_x36) {
        return _ignore.apply(this, arguments);
      }
      return ignore;
    }()
  }, {
    key: "answerAndEnd",
    value: function () {
      var _answerAndEnd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(telephonySessionId) {
        var _this$_deps$webphone6, _this$_deps$webphone7, session, currentActiveCalls, _iterator2, _step2, s, deviceId, webphoneSession;
        return regeneratorRuntime.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                _context37.prev = 0;
                if (!this.busy) {
                  _context37.next = 3;
                  break;
                }
                return _context37.abrupt("return");
              case 3:
                this.setCallControlBusyTimestamp();
                session = this._getSessionById(telephonySessionId);
                currentActiveCalls = this._rcCall.sessions.filter(function (s) {
                  return s.id !== telephonySessionId && s.webphoneSession && (s.status === _Session.PartyStatusCode.answered || s.direction === _callDirections.callDirection.outbound && s.status === _Session.PartyStatusCode.proceeding);
                });
                _iterator2 = _createForOfIteratorHelper(currentActiveCalls);
                _context37.prev = 7;
                _iterator2.s();
              case 9:
                if ((_step2 = _iterator2.n()).done) {
                  _context37.next = 15;
                  break;
                }
                s = _step2.value;
                _context37.next = 13;
                return s.hangup();
              case 13:
                _context37.next = 9;
                break;
              case 15:
                _context37.next = 20;
                break;
              case 17:
                _context37.prev = 17;
                _context37.t0 = _context37["catch"](7);
                _iterator2.e(_context37.t0);
              case 20:
                _context37.prev = 20;
                _iterator2.f();
                return _context37.finish(20);
              case 23:
                deviceId = (_this$_deps$webphone6 = this._deps.webphone) === null || _this$_deps$webphone6 === void 0 ? void 0 : (_this$_deps$webphone7 = _this$_deps$webphone6.device) === null || _this$_deps$webphone7 === void 0 ? void 0 : _this$_deps$webphone7.id;
                if (!session.webphoneSession) {
                  _context37.next = 29;
                  break;
                }
                _context37.next = 27;
                return session.answer({
                  deviceId: deviceId
                });
              case 27:
                _context37.next = 31;
                break;
              case 29:
                _context37.next = 31;
                return this.pickUpCall(_objectSpread({}, this.pickUpCallDataMap[telephonySessionId]));
              case 31:
                this._trackWebRTCCallAnswer();
                webphoneSession = session.webphoneSession;
                if (webphoneSession && webphoneSession.__rc_callStatus) {
                  webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
                }
                this.clearCallControlBusyTimestamp();
                _context37.next = 41;
                break;
              case 37:
                _context37.prev = 37;
                _context37.t1 = _context37["catch"](0);
                console.log('answer and end fail.');
                console.error(_context37.t1);
              case 41:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this, [[0, 37], [7, 17, 20, 23]]);
      }));
      function answerAndEnd(_x37) {
        return _answerAndEnd.apply(this, arguments);
      }
      return answerAndEnd;
    }()
  }, {
    key: "startWarmTransfer",
    value: function () {
      var _startWarmTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee38(transferNumber, telephonySessionId) {
        var toNumber;
        return regeneratorRuntime.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                _context38.next = 2;
                return this.getValidPhoneNumber(transferNumber);
              case 2:
                toNumber = _context38.sent;
                return _context38.abrupt("return", this.makeCall({
                  toNumber: toNumber,
                  transferSessionId: telephonySessionId
                }));
              case 4:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this);
      }));
      function startWarmTransfer(_x38, _x39) {
        return _startWarmTransfer.apply(this, arguments);
      }
      return startWarmTransfer;
    }()
  }, {
    key: "setWarmTransferMapping",
    value: function setWarmTransferMapping(originalId, transferredId) {
      var _objectSpread2;
      this.transferCallMapping = _objectSpread(_objectSpread({}, this.transferCallMapping), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, originalId, {
        relatedTelephonySessionId: transferredId,
        isOriginal: true
      }), _defineProperty(_objectSpread2, transferredId, {
        relatedTelephonySessionId: originalId,
        isOriginal: false
      }), _objectSpread2));
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
        var filteredData = Object.fromEntries(Object.entries(this.transferCallMapping).filter(function (_ref12) {
          var _ref13 = _slicedToArray(_ref12, 2),
            id = _ref13[0],
            transferInfo = _ref13[1];
          return !(removeSessionSet.has(id) || removeSessionSet.has(transferInfo.relatedTelephonySessionId));
        }));
        this.transferCallMapping = filteredData;
      }
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee39(params) {
        var _this13 = this;
        var _this$_deps$webphone8, phoneLines, sdkMakeCallParams, session;
        return regeneratorRuntime.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                _context39.prev = 0;
                if (!(params.toNumber.length > 6 && (!this._deps.availabilityMonitor || !this._deps.availabilityMonitor.isVoIPOnlyMode))) {
                  _context39.next = 8;
                  break;
                }
                _context39.next = 4;
                return this._fetchDL();
              case 4:
                phoneLines = _context39.sent;
                if (!(phoneLines.length === 0)) {
                  _context39.next = 8;
                  break;
                }
                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.noOutboundCallWithoutDL
                });
                return _context39.abrupt("return", null);
              case 8:
                _context39.next = 10;
                return this._holdOtherCalls();
              case 10:
                sdkMakeCallParams = {
                  // type 'callControl' not support webphone's sip device currently.
                  type: 'webphone',
                  toNumber: params.toNumber,
                  fromNumber: params.fromNumber,
                  homeCountryId: params.homeCountryId
                };
                _context39.next = 13;
                return this._rcCall.makeCall(sdkMakeCallParams);
              case 13:
                session = _context39.sent;
                this._activeSession = session;
                (_this$_deps$webphone8 = this._deps.webphone) === null || _this$_deps$webphone8 === void 0 ? void 0 : _this$_deps$webphone8.initWebphoneSessionEvents(session.webphoneSession);
                session.webphoneSession.on('progress', function (incomingResponse) {
                  if (session.telephonySessionId && _this13.activeSessionId !== session.telephonySessionId) {
                    _this13.setActiveSessionId(session.telephonySessionId);
                    var transferSessionId = params.transferSessionId;
                    if (transferSessionId) {
                      _this13.setWarmTransferMapping(transferSessionId, session.telephonySessionId);
                    }
                  }
                });
                this._triggerAutoMergeEvent();
                return _context39.abrupt("return", session);
              case 21:
                _context39.prev = 21;
                _context39.t0 = _context39["catch"](0);
                console.log('make call fail.', _context39.t0);
              case 24:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this, [[0, 21]]);
      }));
      function makeCall(_x40) {
        return _makeCall.apply(this, arguments);
      }
      return makeCall;
    }()
  }, {
    key: "_fetchDL",
    value: function () {
      var _fetchDL2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee40() {
        var response, devices, phoneLines;
        return regeneratorRuntime.wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                _context40.next = 2;
                return this._deps.client.account().extension().device().list();
              case 2:
                response = _context40.sent;
                devices = response.records;
                phoneLines = [];
                devices === null || devices === void 0 ? void 0 : devices.forEach(function (device) {
                  // wrong type of phoneLines, temporary treat it as any
                  if (!device.phoneLines || device.phoneLines.length === 0) {
                    return;
                  }
                  phoneLines = phoneLines.concat(device.phoneLines);
                });
                return _context40.abrupt("return", phoneLines);
              case 7:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
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
    } // This should reflect on the app permissions setting in DWP
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
    } // TODO:refactor, use this.sessions instead
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
  }]);
  return ActiveCallControl;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pickUpCallDataMap", [_core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "resetState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNewCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallAccepted", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallAccepted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallEnd", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateActiveSessions", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateActiveSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeActiveSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeActiveSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setActiveSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastEndedSessionIds", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastEndedSessionIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallControlBusyTimestamp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearCallControlBusyTimestamp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_dec2, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_dec3, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_dec4, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_dec5, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangUp", [_dec6, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hangUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_dec7, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switch", [_dec8, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_dec9, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_dec10, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyWithMessage", [_dec11, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toVoicemail", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toVoicemail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeWarmTransfer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "completeWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_dec12, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flip", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "flip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_dec13, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendDTMF", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setRingSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRingSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_holdOtherCalls", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_holdOtherCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setPickUpCallData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setPickUpCallData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_answer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_dec14, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answerAndHold", [_dec15, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "answerAndHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ignore", [_dec16, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "ignore"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answerAndEnd", [_dec17, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "answerAndEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setWarmTransferMapping", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setWarmTransferMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanCurrentWarmTransferData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanCurrentWarmTransferData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSession", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSessions", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSessions", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackWebRTCCallAnswer", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackWebRTCCallAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialpadOpenTrack", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "dialpadOpenTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialpadCloseTrack", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "dialpadCloseTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickTransferTrack", [_dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "clickTransferTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickForwardTrack", [_dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "clickForwardTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openEntityDetailLinkTrack", [_dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "openEntityDetailLinkTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickSwitchTrack", [_dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "clickSwitchTrack"), _class2.prototype)), _class2)) || _class);
exports.ActiveCallControl = ActiveCallControl;
//# sourceMappingURL=ActiveCallControl.js.map
