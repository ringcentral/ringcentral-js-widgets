"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.some");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.values");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.match");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallMonitor = void 0;
var _core = require("@ringcentral-integration/core");
var _events = require("events");
var _ramda = require("ramda");
var _trackEvents = require("../../enums/trackEvents");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _di = require("../../lib/di");
var _normalizeNumber = require("../../lib/normalizeNumber");
var _ActiveCallControl = require("../ActiveCallControl");
var _webphoneHelper = require("../Webphone/webphoneHelper");
var _callEvents = require("./callEvents");
var _callMonitorHelper = require("./callMonitorHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _class2, _descriptor;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var CallMonitor = (_dec = (0, _di.Module)({
  name: 'CallMonitor',
  deps: ['AccountInfo', 'Storage', 'Presence', 'ExtensionInfo', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'Call',
    optional: true
  }, {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }, {
    dep: 'CallMonitorOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.callInboundCallConnected), _dec3 = (0, _core.track)(_trackEvents.trackEvents.callOutboundRingOutCallConnected), _dec4 = (0, _core.track)(_trackEvents.trackEvents.clickCallItem), _dec5 = (0, _core.track)(_trackEvents.trackEvents.clickHoldAllCalls), _dec6 = (0, _core.track)(_trackEvents.trackEvents.clickHangupAllCalls), _dec7 = (0, _core.track)(_trackEvents.trackEvents.clickRejectAllCalls), _dec8 = (0, _core.track)(_trackEvents.trackEvents.clickAddCallControl), _dec9 = (0, _core.track)(_trackEvents.trackEvents.clickHangupMergeCallControl), _dec10 = (0, _core.track)(function (that) {
  var _that$_deps$conferenc, _that$_deps$conferenc2;
  return [
  // @ts-expect-error TS(2341): Property 'state' is private and only accessible wi... Remove this comment to see the full error message
  Object.values((_that$_deps$conferenc = (_that$_deps$conferenc2 = that._deps.conferenceCall) === null || _that$_deps$conferenc2 === void 0 ? void 0 : _that$_deps$conferenc2.state.mergingPair) !== null && _that$_deps$conferenc !== void 0 ? _that$_deps$conferenc : {}).length ? _trackEvents.trackEvents.clickMergeCallControl : _trackEvents.trackEvents.clickMergeMergeCallControl];
}), _dec11 = (0, _core.track)(_trackEvents.trackEvents.clickCloseConfirmMergeModal), _dec12 = (0, _core.track)(_trackEvents.trackEvents.clickMergeConfirmMergeModal), _dec13 = (0, _core.track)(_trackEvents.trackEvents.clickAddCallsOnHold), _dec14 = (0, _core.track)(_trackEvents.trackEvents.clickMergeCallsOnHold), _dec15 = (0, _core.track)(_trackEvents.trackEvents.clickHangupCallsOnHold), _dec16 = (0, _core.track)(_trackEvents.trackEvents.clickParticipantAreaCallControl), _dec17 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa, _that$_deps$activityM;
  return [that.normalizedCalls, (_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping, (_that$_deps$activityM = that._deps.activityMatcher) === null || _that$_deps$activityM === void 0 ? void 0 : _that$_deps$activityM.dataMapping, that.callMatched];
}), _dec18 = (0, _core.computed)(function (that) {
  return [
  // Use "null" to avoid triggering get property unnecessarily that may cause issues
  that.useTelephonySession ? null : that.normalizedCallsFromPresence, that.useTelephonySession ? that.normalizedCallsFromTelephonySessions : null, that.useTelephonySession];
}), _dec19 = (0, _core.computed)(function (that) {
  var _that$_deps$webphone, _that$_deps$webphone2;
  return [that._deps.presence.calls, that._deps.accountInfo.countryCode, (_that$_deps$webphone = that._deps.webphone) === null || _that$_deps$webphone === void 0 ? void 0 : _that$_deps$webphone.sessions, (_that$_deps$webphone2 = that._deps.webphone) === null || _that$_deps$webphone2 === void 0 ? void 0 : _that$_deps$webphone2.cachedSessions];
}), _dec20 = (0, _core.computed)(function (that) {
  var _that$_deps$activeCal, _that$_deps$activeCal2, _that$_deps$activeCal3;
  return [(_that$_deps$activeCal = that._deps.activeCallControl) === null || _that$_deps$activeCal === void 0 ? void 0 : _that$_deps$activeCal.sessions, (_that$_deps$activeCal2 = that._deps.activeCallControl) === null || _that$_deps$activeCal2 === void 0 ? void 0 : _that$_deps$activeCal2.currentDeviceCallsMap, (_that$_deps$activeCal3 = that._deps.activeCallControl) === null || _that$_deps$activeCal3 === void 0 ? void 0 : _that$_deps$activeCal3.transferCallMapping, that._deps.accountInfo.countryCode, that._deps.presence.calls];
}), _dec21 = (0, _core.computed)(function (that) {
  var _that$_deps$conferenc3;
  return [that.allCalls, (_that$_deps$conferenc3 = that._deps.conferenceCall) === null || _that$_deps$conferenc3 === void 0 ? void 0 : _that$_deps$conferenc3.isMerging];
}), _dec22 = (0, _core.computed)(function (that) {
  return [that.calls, that.useTelephonySession];
}), _dec23 = (0, _core.computed)(function (that) {
  return [that.calls, that.useTelephonySession];
}), _dec24 = (0, _core.computed)(function (that) {
  return [that.calls, that.useTelephonySession];
}), _dec25 = (0, _core.computed)(function (that) {
  return [that._activeOnHoldCalls, that._activeCurrentCalls];
}), _dec26 = (0, _core.computed)(function (that) {
  return [that._activeCurrentCalls, that._activeOnHoldCalls];
}), _dec27 = (0, _core.computed)(function (that) {
  var _that$_deps$webphone3, _that$_deps$activeCal4;
  return [that.calls, (_that$_deps$webphone3 = that._deps.webphone) === null || _that$_deps$webphone3 === void 0 ? void 0 : _that$_deps$webphone3.lastEndedSessions, that.useTelephonySession, (_that$_deps$activeCal4 = that._deps.activeCallControl) === null || _that$_deps$activeCal4 === void 0 ? void 0 : _that$_deps$activeCal4.lastEndedSessionIds];
}), _dec28 = (0, _core.computed)(function (that) {
  return [that.normalizedCalls];
}), _dec29 = (0, _core.computed)(function (that) {
  return [that.normalizedCalls];
}), _dec30 = (0, _core.computed)(function (that) {
  return [that.otherDeviceCalls];
}), _dec31 = (0, _core.computed)(function (that) {
  return [that.otherDeviceCalls];
}), _dec32 = (0, _core.computed)(function (that) {
  return [that.otherDeviceCalls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(CallMonitor, _RcModuleV);
  var _super = _createSuper(CallMonitor);
  function CallMonitor(deps) {
    var _this$_deps$callMonit, _this$_deps$callMonit2, _this$_deps$callMonit3, _this$_deps$callMonit4;
    var _this;
    _classCallCheck(this, CallMonitor);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'CallMonitor'
    });
    _this._eventEmitter = new _events.EventEmitter();
    _this._useTelephonySession = (_this$_deps$callMonit = (_this$_deps$callMonit2 = _this._deps.callMonitorOptions) === null || _this$_deps$callMonit2 === void 0 ? void 0 : _this$_deps$callMonit2.useTelephonySession) !== null && _this$_deps$callMonit !== void 0 ? _this$_deps$callMonit : false;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'NormalizedC... Remove this comment to see the full error message
    _this._normalizedCalls = null;
    _this._enableContactMatchWhenNewCall = (_this$_deps$callMonit3 = (_this$_deps$callMonit4 = _this._deps.callMonitorOptions) === null || _this$_deps$callMonit4 === void 0 ? void 0 : _this$_deps$callMonit4.enableContactMatchWhenNewCall) !== null && _this$_deps$callMonit3 !== void 0 ? _this$_deps$callMonit3 : true;
    _initializerDefineProperty(_this, "callMatched", _descriptor, _assertThisInitialized(_this));
    if (_this._deps.contactMatcher && _this._enableContactMatchWhenNewCall) {
      _this._deps.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._deps.accountInfo.ready && _this._deps.presence.ready;
        }
      });
    }
    if (_this._deps.activityMatcher) {
      _this._deps.activityMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.sessionIds;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._deps.presence.ready;
        }
      });
    }
    if (_this._useTelephonySession && !_this._deps.activeCallControl) {
      console.warn('Use telephonySession at CallMonitor module requires ActiveCallControl module');
      _this._useTelephonySession = false;
    }
    return _this;
  }
  _createClass(CallMonitor, [{
    key: "setMatchedData",
    value: function setMatchedData(_ref) {
      var sessionId = _ref.sessionId,
        toEntityId = _ref.toEntityId;
      this.callMatched[sessionId] = toEntityId;
    }
  }, {
    key: "onNewCall",
    value: function onNewCall(callback) {
      this._eventEmitter.on(_callEvents.callEvents.newCall, callback);
      return this;
    }
  }, {
    key: "onCallRinging",
    value: function onCallRinging(callback) {
      this._eventEmitter.on(_callEvents.callEvents.callRinging, callback);
      return this;
    }
  }, {
    key: "onCallEnded",
    value: function onCallEnded(callback) {
      this._eventEmitter.on(_callEvents.callEvents.callEnded, callback);
      return this;
    }
  }, {
    key: "onCallUpdated",
    value: function onCallUpdated(callback) {
      this._eventEmitter.on(_callEvents.callEvents.callUpdated, callback);
      return this;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2.uniqueNumbers;
      }, function (uniqueNumbers, lastProcessedNumbers) {
        var _this2$_deps$tabManag;
        if (!_this2.ready || !((_this2$_deps$tabManag = _this2._deps.tabManager) === null || _this2$_deps$tabManag === void 0 ? void 0 : _this2$_deps$tabManag.active)) return;
        var newNumbers = (0, _ramda.difference)(uniqueNumbers, lastProcessedNumbers || []);
        if (_this2._deps.contactMatcher && _this2._deps.contactMatcher.ready && _this2._enableContactMatchWhenNewCall) {
          _this2._deps.contactMatcher.match({
            queries: newNumbers,
            ignoreQueue: true
          });
        }
      });
      (0, _core.watch)(this, function () {
        return _this2.sessionIds;
      }, function (sessionIds, lastProcessedIds) {
        var _this2$_deps$tabManag2;
        if (!_this2.ready || !((_this2$_deps$tabManag2 = _this2._deps.tabManager) === null || _this2$_deps$tabManag2 === void 0 ? void 0 : _this2$_deps$tabManag2.active)) return;
        var newSessions = (0, _ramda.difference)(sessionIds, lastProcessedIds || []);
        if (_this2._deps.activityMatcher && _this2._deps.activityMatcher.ready) {
          _this2._deps.activityMatcher.match({
            queries: newSessions,
            ignoreQueue: true
          });
        }
      });
      (0, _core.watch)(this, function () {
        return _this2.calls;
      }, function (_, lastProcessedCalls) {
        var _lastProcessedCalls$s;
        if (!_this2.ready) return;
        _this2.handleCalls((_lastProcessedCalls$s = lastProcessedCalls === null || lastProcessedCalls === void 0 ? void 0 : lastProcessedCalls.slice()) !== null && _lastProcessedCalls$s !== void 0 ? _lastProcessedCalls$s : []);
      });
      (0, _core.watch)(this, function () {
        return _this2.ready;
      }, function () {
        if (_this2.ready) {
          // It is possible that `this.calls` may have changed before the `CallMonitor` module status becomes `true`.
          // So make sure that in this case, `this.calls` handling must be forced
          _this2.handleCalls([]);
        }
      });
    }
  }, {
    key: "handleCalls",
    value: function handleCalls(oldCalls) {
      var _this$_deps$call$toNu,
        _this3 = this;
      // no ringing calls
      if (this._deps.call && oldCalls.length && !this.calls.length && ((_this$_deps$call$toNu = this._deps.call.toNumberEntities) === null || _this$_deps$call$toNu === void 0 ? void 0 : _this$_deps$call$toNu.length)) {
        this._deps.call.cleanToNumberEntities();
      }
      var entities = this._deps.call ? (0, _ramda.sort)(_callLogHelpers.sortByStartTime, this._deps.call.toNumberEntities) : [];
      (0, _ramda.forEach)(function (call) {
        var oldCallIndex = (0, _ramda.findIndex)(function (item) {
          return item.sessionId === call.sessionId;
        }, oldCalls);
        if (oldCallIndex === -1) {
          _this3._eventEmitter.emit(_callEvents.callEvents.newCall, call);
          // loop to execute the onRinging handlers
          if ((0, _callLogHelpers.isRinging)(call)) {
            _this3._eventEmitter.emit(_callEvents.callEvents.callRinging, call);
          }
        } else {
          var oldCall = oldCalls[oldCallIndex];
          oldCalls.splice(oldCallIndex, 1);
          if (call.telephonyStatus !== oldCall.telephonyStatus || (oldCall.from && oldCall.from.phoneNumber) !== (call.from && call.from.phoneNumber)) {
            _this3._eventEmitter.emit(_callEvents.callEvents.callUpdated, call);
            if (call.telephonyStatus === 'CallConnected') {
              if ((0, _callLogHelpers.isInbound)(call)) {
                _this3.inboundCallConnectedTrack();
              } else {
                _this3.outboundCallConnectedTrack();
              }
            }
          }
        }
        (0, _ramda.forEach)(function (entity) {
          var index = entities.indexOf(entity);
          var toEntity = entity &&
          // @ts-expect-error TS(2345): Argument of type 'Entity[] | undefined' is not ass... Remove this comment to see the full error message
          (0, _ramda.find)(function (toMatch) {
            return toMatch.id === entity.entityId;
          }, call.toMatches);
          if (toEntity !== undefined) {
            _this3._removeMatched(index, entities);
            _this3.setMatchedData({
              sessionId: call.sessionId,
              toEntityId: toEntity.id
            });
          }
        }, entities);
      }, this.calls);
      (0, _ramda.forEach)(function (call) {
        _this3._eventEmitter.emit(_callEvents.callEvents.callEnded, call);
      }, oldCalls);
    }
  }, {
    key: "_removeMatched",
    value: function _removeMatched(index, entities) {
      entities.splice(index, 1);
      return entities;
    }
  }, {
    key: "inboundCallConnectedTrack",
    value: function inboundCallConnectedTrack() {}
  }, {
    key: "outboundCallConnectedTrack",
    value: function outboundCallConnectedTrack() {}
  }, {
    key: "callItemClickTrack",
    value: function callItemClickTrack() {}
  }, {
    key: "allCallsClickHoldTrack",
    value: function allCallsClickHoldTrack() {}
  }, {
    key: "allCallsClickHangupTrack",
    value: function allCallsClickHangupTrack() {}
  }, {
    key: "allCallsClickRejectTrack",
    value: function allCallsClickRejectTrack() {}
  }, {
    key: "callControlClickAddTrack",
    value: function callControlClickAddTrack() {}
  }, {
    key: "mergeControlClickHangupTrack",
    value: function mergeControlClickHangupTrack() {}
  }, {
    key: "callControlClickMergeTrack",
    value: function callControlClickMergeTrack() {}
  }, {
    key: "confirmMergeClickCloseTrack",
    value: function confirmMergeClickCloseTrack() {}
  }, {
    key: "confirmMergeClickMergeTrack",
    value: function confirmMergeClickMergeTrack() {}
  }, {
    key: "callsOnHoldClickAddTrack",
    value: function callsOnHoldClickAddTrack() {}
  }, {
    key: "callsOnHoldClickMergeTrack",
    value: function callsOnHoldClickMergeTrack() {}
  }, {
    key: "callsOnHoldClickHangupTrack",
    value: function callsOnHoldClickHangupTrack() {}
  }, {
    key: "callControlClickParticipantAreaTrack",
    value: function callControlClickParticipantAreaTrack() {}
  }, {
    key: "hasRingingCalls",
    get: function get() {
      return (0, _callLogHelpers.hasRingingCalls)(this.calls);
    }
  }, {
    key: "useTelephonySession",
    get: function get() {
      return this._useTelephonySession;
    }
  }, {
    key: "allCalls",
    get: function get() {
      var _this$_deps$contactMa,
        _this$_deps$contactMa2,
        _this$_deps$activityM,
        _this$_deps$activityM2,
        _this4 = this;
      var contactMapping = (_this$_deps$contactMa = (_this$_deps$contactMa2 = this._deps.contactMatcher) === null || _this$_deps$contactMa2 === void 0 ? void 0 : _this$_deps$contactMa2.dataMapping) !== null && _this$_deps$contactMa !== void 0 ? _this$_deps$contactMa : {};
      var activityMapping = (_this$_deps$activityM = (_this$_deps$activityM2 = this._deps.activityMatcher) === null || _this$_deps$activityM2 === void 0 ? void 0 : _this$_deps$activityM2.dataMapping) !== null && _this$_deps$activityM !== void 0 ? _this$_deps$activityM : {};
      var calls = (0, _ramda.map)(function (callItem) {
        var fromNumber = callItem.from && callItem.from.phoneNumber;
        var toNumber = callItem.to && callItem.to.phoneNumber;
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        var toNumberEntity = _this4.callMatched[callItem.sessionId];
        return _objectSpread(_objectSpread({}, callItem), {}, {
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMapping[callItem.sessionId] || [],
          toNumberEntity: toNumberEntity
        });
      }, this.normalizedCalls);
      return calls;
    }
  }, {
    key: "normalizedCalls",
    get: function get() {
      if (this.useTelephonySession) {
        return this.normalizedCallsFromTelephonySessions;
      }
      return this.normalizedCallsFromPresence;
    }
  }, {
    key: "normalizedCallsFromPresence",
    get: function get() {
      var _this$_deps$webphone,
        _this$_deps$webphone$,
        _this5 = this,
        _this$_deps$webphone$2,
        _this$_deps$webphone2;
      // match cached calls
      var cachedCalls = [];
      if (this._normalizedCalls && ((_this$_deps$webphone = this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : (_this$_deps$webphone$ = _this$_deps$webphone.cachedSessions) === null || _this$_deps$webphone$ === void 0 ? void 0 : _this$_deps$webphone$.length)) {
        cachedCalls = (0, _ramda.filter)(function (x) {
          var _this5$_deps$webphone;
          return !!(x.webphoneSession && (0, _ramda.find)(function (i) {
            var _x$webphoneSession;
            return i.id === ((_x$webphoneSession = x.webphoneSession) === null || _x$webphoneSession === void 0 ? void 0 : _x$webphoneSession.id);
          }, ((_this5$_deps$webphone = _this5._deps.webphone) === null || _this5$_deps$webphone === void 0 ? void 0 : _this5$_deps$webphone.cachedSessions) || []));
        }, this._normalizedCalls);
      }

      // combine
      var combinedCalls = _toConsumableArray(this._deps.presence.calls); // clone
      (0, _ramda.forEach)(function (cachedCall) {
        if (!(0, _ramda.find)(function (x) {
          return x.id === cachedCall.id;
        }, _this5._deps.presence.calls)) {
          combinedCalls.push(cachedCall);
        }
      }, cachedCalls);

      // mapping and sort
      var theSessions = (_this$_deps$webphone$2 = (_this$_deps$webphone2 = this._deps.webphone) === null || _this$_deps$webphone2 === void 0 ? void 0 : _this$_deps$webphone2.sessions) !== null && _this$_deps$webphone$2 !== void 0 ? _this$_deps$webphone$2 : [];
      // @ts-expect-error TS(2322): Type '({ from: { phoneNumber: string; }; to: { pho... Remove this comment to see the full error message
      this._normalizedCalls = (0, _ramda.sort)(
      // @ts-expect-error TS(2345): Argument of type 'NormalizedSession | undefined' i... Remove this comment to see the full error message
      function (l, r) {
        return (0, _webphoneHelper.sortByLastActiveTimeDesc)(l.webphoneSession, r.webphoneSession);
      },
      // @ts-expect-error TS(2345): Argument of type '({ from: { phoneNumber: string; ... Remove this comment to see the full error message
      (0, _ramda.map)(function (callItem) {
        // use account countryCode to normalize number due to API issues [RCINT-3419]
        var fromNumber = (0, _normalizeNumber.normalizeNumber)({
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          phoneNumber: callItem.from && callItem.from.phoneNumber,
          countryCode: _this5._deps.accountInfo.countryCode,
          maxExtensionLength: _this5._deps.accountInfo.maxExtensionNumberLength
        });
        var toNumber = (0, _normalizeNumber.normalizeNumber)({
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          phoneNumber: callItem.to && callItem.to.phoneNumber,
          countryCode: _this5._deps.accountInfo.countryCode,
          maxExtensionLength: _this5._deps.accountInfo.maxExtensionNumberLength
        });
        var webphoneSession = (0, _callMonitorHelper.matchWebphoneSessionWithActiveCall)(theSessions, callItem);
        theSessions = (0, _ramda.filter)(function (x) {
          return x !== webphoneSession;
        }, theSessions);
        return _objectSpread(_objectSpread({}, callItem), {}, {
          from: {
            phoneNumber: fromNumber
          },
          to: {
            phoneNumber: toNumber
          },
          startTime: webphoneSession && webphoneSession.startTime || callItem.startTime,
          webphoneSession: webphoneSession
        });
      }, combinedCalls));
      return this._normalizedCalls;
    }
  }, {
    key: "normalizedCallsFromTelephonySessions",
    get: function get() {
      var _this$_deps$activeCal,
        _this$_deps$webphone3,
        _this$_deps$webphone4,
        _this6 = this;
      if (!((_this$_deps$activeCal = this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.sessions)) {
        return [];
      }

      // Match cached calls at the very beginning
      var cachedCalls = [];
      if (this._normalizedCalls && ((_this$_deps$webphone3 = this._deps.webphone) === null || _this$_deps$webphone3 === void 0 ? void 0 : (_this$_deps$webphone4 = _this$_deps$webphone3.cachedSessions) === null || _this$_deps$webphone4 === void 0 ? void 0 : _this$_deps$webphone4.length)) {
        cachedCalls = this._normalizedCalls.filter(function (x) {
          var _this6$_deps$webphone;
          return (_this6$_deps$webphone = _this6._deps.webphone) === null || _this6$_deps$webphone === void 0 ? void 0 : _this6$_deps$webphone.cachedSessions.some(function (i) {
            var _i$partyData;
            return ((_i$partyData = i.partyData) === null || _i$partyData === void 0 ? void 0 : _i$partyData.sessionId) === x.telephonySessionId;
          });
        });
      }
      var combinedCalls = _toConsumableArray(this._deps.activeCallControl.sessions); // clone
      var _this$_deps$activeCal2 = this._deps.activeCallControl,
        currentDeviceCallsMap = _this$_deps$activeCal2.currentDeviceCallsMap,
        transferCallMapping = _this$_deps$activeCal2.transferCallMapping; // mapping and sort
      // @ts-ignore
      this._normalizedCalls = (0, _ramda.sort)(function (l, r) {
        return (0, _webphoneHelper.sortByLastActiveTimeDesc)(l.webphoneSession, r.webphoneSession);
      }, (0, _ramda.map)(function (callItem) {
        var _party$status;
        // sessionId arrives when telephony session event push and it's a required
        // reference https://github.com/ringcentral/ringcentral-call-js/blob/master/src/Session.ts
        if (!callItem || !callItem.sessionId || (0, _ActiveCallControl.isForwardedToVoiceMail)(callItem) || (0, _callLogHelpers.isInbound)(callItem) && (0, _ActiveCallControl.isOnSetupStage)(callItem) || (0, _ActiveCallControl.isFaxSession)(callItem)) {
          return null;
        }
        var to = callItem.to,
          from = callItem.from,
          direction = callItem.direction,
          party = callItem.party,
          telephonySessionId = callItem.telephonySessionId,
          sessionId = callItem.sessionId,
          startTime = callItem.startTime,
          isRecording = callItem.isRecording;
        var id = callItem.activeCallId; // find id from presence call one time, due to telephony session event not push call id back
        // with ringout call
        if (!id) {
          var presenceCall = _this6._deps.presence.calls.find(function (presenceCall) {
            return presenceCall.telephonySessionId === callItem.id;
          });
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          id = presenceCall === null || presenceCall === void 0 ? void 0 : presenceCall.id;
        }
        var fromNumber = (0, _normalizeNumber.normalizeNumber)({
          phoneNumber: from === null || from === void 0 ? void 0 : from.phoneNumber,
          countryCode: _this6._deps.accountInfo.countryCode,
          maxExtensionLength: _this6._deps.accountInfo.maxExtensionNumberLength
        });
        var toNumber = (0, _normalizeNumber.normalizeNumber)({
          phoneNumber: to === null || to === void 0 ? void 0 : to.phoneNumber,
          countryCode: _this6._deps.accountInfo.countryCode,
          maxExtensionLength: _this6._deps.accountInfo.maxExtensionNumberLength
        });
        var toName = to === null || to === void 0 ? void 0 : to.name;
        var fromName = from === null || from === void 0 ? void 0 : from.name;
        var partyId = party === null || party === void 0 ? void 0 : party.id;
        // @ts-expect-error TS(2345): Argument of type 'PartyStatusCode | undefined' is ... Remove this comment to see the full error message
        var telephonyStatus = (0, _ActiveCallControl.mapTelephonyStatus)(party === null || party === void 0 ? void 0 : (_party$status = party.status) === null || _party$status === void 0 ? void 0 : _party$status.code);

        // TODO: add sipData here
        // const sipData = {};
        return {
          id: id,
          partyId: partyId,
          direction: direction,
          telephonySession: callItem,
          telephonySessionId: telephonySessionId,
          toName: toName,
          fromName: fromName,
          from: _objectSpread(_objectSpread({}, from), {}, {
            phoneNumber: fromNumber
          }),
          to: _objectSpread(_objectSpread({}, to), {}, {
            phoneNumber: toNumber
          }),
          startTime: startTime,
          sessionId: sessionId,
          webphoneSession: currentDeviceCallsMap[telephonySessionId],
          telephonyStatus: telephonyStatus,
          warmTransferInfo: transferCallMapping[telephonySessionId],
          isRecording: isRecording
        };
      }, combinedCalls).filter(function (x) {
        return !!x;
      }));

      // Keep the cached calls in the list
      if (this._normalizedCalls) {
        cachedCalls.forEach(function (cachedCall) {
          if (!_this6._normalizedCalls.find(function (x) {
            return x.id === cachedCall.id;
          })) {
            _this6._normalizedCalls.push(cachedCall);
          }
        });
      }
      return this._normalizedCalls;
    }
  }, {
    key: "calls",
    get: function get() {
      var _this7 = this;
      return (0, _ramda.filter)(function (callItem) {
        var _this7$_deps$conferen;
        // filtering out the conference during merging
        if ((_this7$_deps$conferen = _this7._deps.conferenceCall) === null || _this7$_deps$conferen === void 0 ? void 0 : _this7$_deps$conferen.isMerging) {
          return !(0, _webphoneHelper.isConferenceSession)(callItem.webphoneSession);
        }
        return true;
      }, this.allCalls);
    }
  }, {
    key: "activeRingCalls",
    get: function get() {
      var _this8 = this;
      // @ts-expect-error TS(2769): No overload matches this call.
      return (0, _ramda.filter)(function (callItem) {
        if (_this8.useTelephonySession) {
          return callItem.webphoneSession && callItem.telephonySession &&
          // @ts-expect-error TS(2345): Argument of type '{ status: string; id: string; di... Remove this comment to see the full error message
          (0, _ActiveCallControl.isRinging)(callItem.telephonySession);
        }
        return callItem.webphoneSession && (0, _webphoneHelper.isRing)(callItem.webphoneSession);
      }, this.calls);
    }
  }, {
    key: "_activeOnHoldCalls",
    get: function get() {
      if (this.useTelephonySession) {
        return (0, _ramda.filter)(function (callItem) {
          return (
            // @ts-expect-error TS(2769): No overload matches this call.
            callItem.webphoneSession && callItem.telephonySession &&
            // @ts-expect-error TS(2345): Argument of type '{ status: string; id: string; di... Remove this comment to see the full error message
            (0, _ActiveCallControl.isHolding)(callItem.telephonySession)
          );
        }, this.calls);
      }
      return (0, _ramda.filter)(function (callItem) {
        return (
          // @ts-expect-error TS(2769): No overload matches this call.
          callItem.webphoneSession && (0, _webphoneHelper.isOnHold)(callItem.webphoneSession)
        );
      }, this.calls);
    }
  }, {
    key: "_activeCurrentCalls",
    get: function get() {
      var _this9 = this;
      // @ts-expect-error TS(2769): No overload matches this call.
      return (0, _ramda.filter)(function (callItem) {
        if (_this9.useTelephonySession) {
          return callItem.webphoneSession && callItem.telephonySession &&
          // @ts-expect-error TS(2345): Argument of type '{ status: string; id: string; di... Remove this comment to see the full error message
          !(0, _ActiveCallControl.isRinging)(callItem.telephonySession) &&
          // @ts-expect-error TS(2345): Argument of type '{ status: string; id: string; di... Remove this comment to see the full error message
          !(0, _ActiveCallControl.isHolding)(callItem.telephonySession);
        }
        return callItem.webphoneSession && !(0, _webphoneHelper.isOnHold)(callItem.webphoneSession) && !(0, _webphoneHelper.isRing)(callItem.webphoneSession);
      }, this.calls);
    }
  }, {
    key: "activeOnHoldCalls",
    get: function get() {
      if (this._activeOnHoldCalls.length && !this._activeCurrentCalls.length) {
        return this._activeOnHoldCalls.slice(1);
      }
      return this._activeOnHoldCalls;
    }
  }, {
    key: "activeCurrentCalls",
    get: function get() {
      return !this._activeCurrentCalls.length && this._activeOnHoldCalls.length ? this._activeOnHoldCalls.slice(0, 1) : this._activeCurrentCalls;
    }
  }, {
    key: "otherDeviceCalls",
    get: function get() {
      var _this10 = this,
        _this$_deps$activeCal3,
        _this$_deps$webphone5;
      return (0, _ramda.reduce)(function (_ref2, callItem) {
        var sessionsCache = _ref2.sessionsCache,
          res = _ref2.res;
        if (callItem.webphoneSession) {
          return {
            sessionsCache: sessionsCache,
            res: res
          };
        }
        if (!sessionsCache || !sessionsCache.length) {
          return {
            sessionsCache: sessionsCache,
            res: [].concat(_toConsumableArray(res), [callItem])
          };
        }
        // TODO: refactor
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'boolean | N... Remove this comment to see the full error message
        var endCall = null;
        if (_this10.useTelephonySession) {
          endCall = (0, _callMonitorHelper.isCurrentDeviceEndCall)(sessionsCache, callItem);
        } else {
          // @ts-expect-error TS(2322): Type 'NormalizedSession | undefined' is not assign... Remove this comment to see the full error message
          endCall = (0, _callMonitorHelper.matchWebphoneSessionWithActiveCall)(sessionsCache, callItem);
        }
        return {
          sessionsCache: (0, _ramda.filter)(function (x) {
            return x !== endCall;
          }, sessionsCache),
          res: endCall ? res : [].concat(_toConsumableArray(res), [callItem])
        };
      }, {
        sessionsCache: this.useTelephonySession ? (_this$_deps$activeCal3 = this._deps.activeCallControl) === null || _this$_deps$activeCal3 === void 0 ? void 0 : _this$_deps$activeCal3.lastEndedSessionIds : (_this$_deps$webphone5 = this._deps.webphone) === null || _this$_deps$webphone5 === void 0 ? void 0 : _this$_deps$webphone5.lastEndedSessions,
        res: []
      }, this.calls).res;
    }
  }, {
    key: "uniqueNumbers",
    get: function get() {
      var output = [];
      var numberMap = {};
      function addIfNotExist(number) {
        if (!numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      (0, _ramda.forEach)(function (callItem) {
        if (callItem.from && callItem.from.phoneNumber) {
          addIfNotExist(callItem.from.phoneNumber);
        }
        if (callItem.to && callItem.to.phoneNumber) {
          addIfNotExist(callItem.to.phoneNumber);
        }
      }, this.normalizedCalls);
      return output;
    }
  }, {
    key: "sessionIds",
    get: function get() {
      return (0, _ramda.map)(function (callItem) {
        return callItem.sessionId;
      }, this.normalizedCalls);
    }
  }, {
    key: "ringoutRingCalls",
    get: function get() {
      return (0, _ramda.filter)(function (callItem) {
        return (0, _callLogHelpers.isRingingInboundCall)(callItem);
      }, this.otherDeviceCalls);
    }
  }, {
    key: "ringoutCurrentCalls",
    get: function get() {
      return (0, _ramda.filter)(function (callItem) {
        return !(0, _callLogHelpers.isRingingInboundCall)(callItem) && !(0, _callLogHelpers.isOnHold)(callItem);
      }, this.otherDeviceCalls);
    }
  }, {
    key: "ringoutOnHoldCalls",
    get: function get() {
      return (0, _ramda.filter)(function (callItem) {
        return (0, _callLogHelpers.isOnHold)(callItem);
      }, this.otherDeviceCalls);
    }
  }]);
  return CallMonitor;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "callMatched", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setMatchedData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMatchedData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundCallConnectedTrack", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundCallConnectedTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "outboundCallConnectedTrack", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "outboundCallConnectedTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callItemClickTrack", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callItemClickTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsClickHoldTrack", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsClickHoldTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsClickHangupTrack", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsClickHangupTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsClickRejectTrack", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsClickRejectTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callControlClickAddTrack", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "callControlClickAddTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeControlClickHangupTrack", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeControlClickHangupTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callControlClickMergeTrack", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "callControlClickMergeTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirmMergeClickCloseTrack", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "confirmMergeClickCloseTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirmMergeClickMergeTrack", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "confirmMergeClickMergeTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsOnHoldClickAddTrack", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "callsOnHoldClickAddTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsOnHoldClickMergeTrack", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "callsOnHoldClickMergeTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsOnHoldClickHangupTrack", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "callsOnHoldClickHangupTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callControlClickParticipantAreaTrack", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "callControlClickParticipantAreaTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCalls", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "allCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalizedCalls", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "normalizedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalizedCallsFromPresence", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "normalizedCallsFromPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalizedCallsFromTelephonySessions", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "normalizedCallsFromTelephonySessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeRingCalls", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "activeRingCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_activeOnHoldCalls", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "_activeOnHoldCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_activeCurrentCalls", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_activeCurrentCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeOnHoldCalls", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "activeOnHoldCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeCurrentCalls", [_dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "activeCurrentCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherDeviceCalls", [_dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "otherDeviceCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIds", [_dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringoutRingCalls", [_dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "ringoutRingCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringoutCurrentCalls", [_dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "ringoutCurrentCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringoutOnHoldCalls", [_dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "ringoutOnHoldCalls"), _class2.prototype)), _class2)) || _class);
exports.CallMonitor = CallMonitor;
//# sourceMappingURL=CallMonitor.js.map
