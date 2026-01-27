"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallMonitor = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _events = require("events");
var _ramda = require("ramda");
var _rxjs = require("rxjs");
var _ActiveCallControl = require("../ActiveCallControl");
var _Call = require("../Call");
var _PreinsertCall = require("../PreinsertCall");
var _Webphone = require("../Webphone");
var _callEvents = require("./callEvents");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _class, _class2, _descriptor;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var CallMonitor = exports.CallMonitor = (_dec = (0, _nextCore.injectable)({
  name: 'CallMonitor'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 9);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 10);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('CallMonitorOptions')(target, undefined, 11);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services.Presence === "undefined" ? Object : _services.Presence, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services.NumberFormatter === "undefined" ? Object : _services.NumberFormatter, typeof _ActiveCallControl.ActiveCallControl === "undefined" ? Object : _ActiveCallControl.ActiveCallControl, typeof _PreinsertCall.PreinsertCall === "undefined" ? Object : _PreinsertCall.PreinsertCall, typeof _Webphone.Webphone === "undefined" ? Object : _Webphone.Webphone, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _Call.Call === "undefined" ? Object : _Call.Call, typeof _services2.ActivityMatcher === "undefined" ? Object : _services2.ActivityMatcher, typeof CallMonitorOptions === "undefined" ? Object : CallMonitorOptions]), _dec8 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [Object]), _dec1 = (0, _services.track)(_trackEvents.trackEvents.callInboundCallConnected), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec12 = (0, _services.track)(_trackEvents.trackEvents.callOutboundRingOutCallConnected), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = (0, _services.track)(_trackEvents.trackEvents.clickCallItem), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", []), _dec18 = (0, _services.track)(_trackEvents.trackEvents.clickHoldAllCalls), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec21 = (0, _services.track)(_trackEvents.trackEvents.clickHangupAllCalls), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", []), _dec24 = (0, _services.track)(_trackEvents.trackEvents.clickRejectAllCalls), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = (0, _services.track)(_trackEvents.trackEvents.clickAddCallControl), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", []), _dec30 = (0, _services.track)(_trackEvents.trackEvents.clickHangupMergeCallControl), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", []), _dec33 = (0, _services.track)(function () {
  return [_trackEvents.trackEvents.clickMergeMergeCallControl];
}), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", []), _dec36 = (0, _services.track)(_trackEvents.trackEvents.clickCloseConfirmMergeModal), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", []), _dec39 = (0, _services.track)(_trackEvents.trackEvents.clickMergeConfirmMergeModal), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", []), _dec42 = (0, _services.track)(_trackEvents.trackEvents.clickAddCallsOnHold), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", []), _dec45 = (0, _services.track)(_trackEvents.trackEvents.clickMergeCallsOnHold), _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", []), _dec48 = (0, _services.track)(_trackEvents.trackEvents.clickHangupCallsOnHold), _dec49 = Reflect.metadata("design:type", Function), _dec50 = Reflect.metadata("design:paramtypes", []), _dec51 = (0, _services.track)(_trackEvents.trackEvents.clickParticipantAreaCallControl), _dec52 = Reflect.metadata("design:type", Function), _dec53 = Reflect.metadata("design:paramtypes", []), _dec54 = Reflect.metadata("design:type", Function), _dec55 = Reflect.metadata("design:paramtypes", []), _dec56 = Reflect.metadata("design:type", Function), _dec57 = Reflect.metadata("design:paramtypes", []), _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", []), _dec60 = Reflect.metadata("design:type", Function), _dec61 = Reflect.metadata("design:paramtypes", []), _dec62 = Reflect.metadata("design:type", Function), _dec63 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function CallMonitor(_accountInfo, _storage, _presence, _extensionInfo, _numberFormatter, _activeCallControl, _preInsertCall, _webphone, _contactMatcher, _call, _activityMatcher, _callMonitorOptions) {
    var _this$_callMonitorOpt, _this$_callMonitorOpt2, _this$_activityMatche;
    var _this;
    _classCallCheck(this, CallMonitor);
    _this = _callSuper(this, CallMonitor);
    _this._accountInfo = _accountInfo;
    _this._storage = _storage;
    _this._presence = _presence;
    _this._extensionInfo = _extensionInfo;
    _this._numberFormatter = _numberFormatter;
    _this._activeCallControl = _activeCallControl;
    _this._preInsertCall = _preInsertCall;
    _this._webphone = _webphone;
    _this._contactMatcher = _contactMatcher;
    _this._call = _call;
    _this._activityMatcher = _activityMatcher;
    _this._callMonitorOptions = _callMonitorOptions;
    _this._eventEmitter = new _events.EventEmitter();
    _this._enableContactMatchWhenNewCall = (_this$_callMonitorOpt = (_this$_callMonitorOpt2 = _this._callMonitorOptions) === null || _this$_callMonitorOpt2 === void 0 ? void 0 : _this$_callMonitorOpt2.enableContactMatchWhenNewCall) !== null && _this$_callMonitorOpt !== void 0 ? _this$_callMonitorOpt : true;
    /**
     * use state to trigger event, so the event can trigger in every clients and server, alway use when you want to listen the event in component
     */
    _this.onNewCall$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.allCalls.length;
    }).pipe((0, _rxjs.pairwise)(), (0, _rxjs.map)(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        prev = _ref2[0],
        next = _ref2[1];
      return prev < next;
    }), (0, _rxjs.distinctUntilChanged)(), (0, _rxjs.filter)(Boolean), (0, _rxjs.share)());
    _initializerDefineProperty(_this, "callMatched", _descriptor, _this);
    _this.fromCallAnsweredElsewhere = _this._activeCallControl.fromCallAnsweredElsewhere;
    _this.fromMissedCalls = _this._activeCallControl.fromMissedCalls;
    _this._storage.enable(_this);
    if (_this._enableContactMatchWhenNewCall) {
      var _this$_contactMatcher;
      (_this$_contactMatcher = _this._contactMatcher) === null || _this$_contactMatcher === void 0 ? void 0 : _this$_contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._accountInfo.ready && _this._presence.ready;
        }
      });
    }
    (_this$_activityMatche = _this._activityMatcher) === null || _this$_activityMatche === void 0 ? void 0 : _this$_activityMatche.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.sessionIds;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._presence.ready;
      }
    });
    return _this;
  }
  _inherits(CallMonitor, _RcModule);
  return _createClass(CallMonitor, [{
    key: "setMatchedData",
    value: function setMatchedData(_ref3) {
      var sessionId = _ref3.sessionId,
        toEntityId = _ref3.toEntityId;
      this.callMatched[sessionId] = toEntityId;
    }

    /**
     * observable of all events
     *
     * # remember those event only trigger inside server port in worker mode
     */
  }, {
    key: "addListener",
    value: function addListener(eventName) {
      return (0, _rxjs.fromEvent)(this._eventEmitter, eventName);
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
      (0, _nextCore.watch)(this, function () {
        return _this2.uniqueNumbers;
      }, function (uniqueNumbers, lastProcessedNumbers) {
        if (!_this2.ready) return;
        var newNumbers = (0, _ramda.difference)(uniqueNumbers, lastProcessedNumbers || []);
        if (_this2._contactMatcher && _this2._contactMatcher.ready && _this2._enableContactMatchWhenNewCall) {
          _this2._contactMatcher.match({
            queries: newNumbers,
            ignoreQueue: true
          });
        }
      });
      (0, _nextCore.watch)(this, function () {
        return _this2.sessionIds;
      }, function (sessionIds, lastProcessedIds) {
        if (!_this2.ready) return;
        var newSessions = (0, _ramda.difference)(sessionIds, lastProcessedIds || []);
        if (_this2._activityMatcher && _this2._activityMatcher.ready) {
          _this2._activityMatcher.match({
            queries: newSessions,
            ignoreQueue: true
          });
        }
      });
      (0, _nextCore.watch)(this, function () {
        return _this2.allCalls;
      }, function (_, lastProcessedCalls) {
        var _lastProcessedCalls$s;
        if (!_this2.ready) return;
        _this2.handleCalls((_lastProcessedCalls$s = lastProcessedCalls === null || lastProcessedCalls === void 0 ? void 0 : lastProcessedCalls.slice()) !== null && _lastProcessedCalls$s !== void 0 ? _lastProcessedCalls$s : []);
      });
      (0, _nextCore.watch)(this, function () {
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
      var _this$_call$toNumberE,
        _this3 = this;
      // no ringing calls
      if (this._call && oldCalls.length && !this.allCalls.length && ((_this$_call$toNumberE = this._call.toNumberEntities) === null || _this$_call$toNumberE === void 0 ? void 0 : _this$_call$toNumberE.length)) {
        this._call.cleanToNumberEntities();
      }
      var entities = this._call ? (0, _ramda.sort)(_callLogHelpers.sortByStartTime, this._call.toNumberEntities) : [];
      this.allCalls.forEach(function (call) {
        var oldCallIndex = oldCalls.findIndex(function (item) {
          return item.sessionId === call.sessionId;
        });
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
        entities.forEach(function (entity) {
          var _call$toMatches;
          var index = entities.indexOf(entity);
          var toEntity = entity && ((_call$toMatches = call.toMatches) === null || _call$toMatches === void 0 ? void 0 : _call$toMatches.find(function (toMatch) {
            return toMatch.id === entity.entityId;
          }));
          if (toEntity !== undefined) {
            _this3._removeMatched(index, entities);
            _this3.setMatchedData({
              sessionId: call.sessionId,
              toEntityId: toEntity.id
            });
          }
        });
      });
      if (oldCalls.length > 0) {
        oldCalls.forEach(function (call) {
          _this3._eventEmitter.emit(_callEvents.callEvents.callEnded, call);
        });

        // in old project, never clean current warm transfer data, but should clean when some call be ended, but some bad logic base on that to test, due to we will deprecated the old project, so just use flag to control here, will be remove in the future
        if (process.env.THEME_SYSTEM === 'spring-ui') {
          this._activeCallControl.cleanCurrentWarmTransferData(oldCalls);
        }
      }
    }
  }, {
    key: "_removeMatched",
    value: function _removeMatched(index, entities) {
      entities.splice(index, 1);
      return entities;
    }
  }, {
    key: "inboundCallConnectedTrack",
    value: function inboundCallConnectedTrack() {
      //
    }
  }, {
    key: "outboundCallConnectedTrack",
    value: function outboundCallConnectedTrack() {
      //
    }
  }, {
    key: "callItemClickTrack",
    value: function callItemClickTrack() {
      //
    }
  }, {
    key: "allCallsClickHoldTrack",
    value: function allCallsClickHoldTrack() {
      //
    }
  }, {
    key: "allCallsClickHangupTrack",
    value: function allCallsClickHangupTrack() {
      //
    }
  }, {
    key: "allCallsClickRejectTrack",
    value: function allCallsClickRejectTrack() {
      //
    }
  }, {
    key: "callControlClickAddTrack",
    value: function callControlClickAddTrack() {
      //
    }
  }, {
    key: "mergeControlClickHangupTrack",
    value: function mergeControlClickHangupTrack() {
      //
    }
  }, {
    key: "callControlClickMergeTrack",
    value: function callControlClickMergeTrack() {
      //
    }
  }, {
    key: "confirmMergeClickCloseTrack",
    value: function confirmMergeClickCloseTrack() {
      //
    }
  }, {
    key: "confirmMergeClickMergeTrack",
    value: function confirmMergeClickMergeTrack() {
      //
    }
  }, {
    key: "callsOnHoldClickAddTrack",
    value: function callsOnHoldClickAddTrack() {
      //
    }
  }, {
    key: "callsOnHoldClickMergeTrack",
    value: function callsOnHoldClickMergeTrack() {
      //
    }
  }, {
    key: "callsOnHoldClickHangupTrack",
    value: function callsOnHoldClickHangupTrack() {
      //
    }
  }, {
    key: "callControlClickParticipantAreaTrack",
    value: function callControlClickParticipantAreaTrack() {
      //
    }
  }, {
    key: "callsInfo",
    get: function get() {
      var _this4 = this;
      // mapping and sort
      var result = this._activeCallControl.sessions.reduce(function (acc, curr) {
        var _party$status, _this4$_contactMatche, _this4$_contactMatche2, _this4$_activityMatch, _this4$_activityMatch2;
        // sessionId arrives when telephony session event push and it's a required
        // reference https://github.com/ringcentral/ringcentral-call-js/blob/master/src/Session.ts

        var telephonySessionId = curr.telephonySessionId;
        if (!curr || _this4._preInsertCall.isPreinsertStatusEnd(telephonySessionId) || _this4._preInsertCall.isPreinsertStatusIgnored(telephonySessionId) || !curr.isConferenceCall && !curr.sessionId || (0, _ActiveCallControl.isForwardedToVoiceMail)(curr) || (0, _callLogHelpers.isInbound)(curr) && (0, _ActiveCallControl.isOnSetupStage)(curr) || (0, _ActiveCallControl.isFaxSession)(curr)) {
          return acc;
        }
        var to = curr.to,
          from = curr.from,
          direction = curr.direction,
          party = curr.party,
          sessionId = curr.sessionId,
          startTime = curr.startTime,
          isRecording = curr.isRecording,
          isConferenceCall = curr.isConferenceCall,
          conferenceParticipants = curr.conferenceParticipants;
        var telephonyStatus = (0, _ActiveCallControl.mapTelephonyStatus)(party === null || party === void 0 ? void 0 : (_party$status = party.status) === null || _party$status === void 0 ? void 0 : _party$status.code);
        var webphoneSession = _this4._activeCallControl._findWebphoneSession(curr.telephonySessionId);
        var id = curr.activeCallId;
        // find id from presence call one time, due to telephony session event not push call id back
        // with ringout call
        if (!id) {
          var presenceCall = _this4._presence.calls.find(function (presenceCall) {
            return presenceCall.telephonySessionId === curr.id;
          });
          id = presenceCall === null || presenceCall === void 0 ? void 0 : presenceCall.id;
        }
        // normalize number for ensure the number is matcher mapping with same key
        var fromNumber = _this4._numberFormatter.normalizeNumber(from === null || from === void 0 ? void 0 : from.phoneNumber);
        var toNumber = _this4._numberFormatter.normalizeNumber(to === null || to === void 0 ? void 0 : to.phoneNumber);
        var toName = to === null || to === void 0 ? void 0 : to.name;
        var fromName = from === null || from === void 0 ? void 0 : from.name;
        var partyId = party === null || party === void 0 ? void 0 : party.id;
        var contactMapping = (_this4$_contactMatche = (_this4$_contactMatche2 = _this4._contactMatcher) === null || _this4$_contactMatche2 === void 0 ? void 0 : _this4$_contactMatche2.dataMapping) !== null && _this4$_contactMatche !== void 0 ? _this4$_contactMatche : {};
        var activityMapping = (_this4$_activityMatch = (_this4$_activityMatch2 = _this4._activityMatcher) === null || _this4$_activityMatch2 === void 0 ? void 0 : _this4$_activityMatch2.dataMapping) !== null && _this4$_activityMatch !== void 0 ? _this4$_activityMatch : {};
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        var toNumberEntity = _this4.callMatched[sessionId];
        var activityMatches = activityMapping[sessionId] || [];
        var conferenceParticipantsMatchesList = process.env.THEME_SYSTEM === 'spring-ui' ? conferenceParticipants.map(function (curr) {
          return curr.info.phoneNumber && contactMapping[
          // normalize number for ensure the number is matcher mapping with same key
          _this4._numberFormatter.normalizeNumber(curr.info.phoneNumber)] || curr.info.extensionNumber && contactMapping[curr.info.extensionNumber] || [];
        }) : [];
        var callItem = {
          id: id,
          partyId: partyId,
          direction: direction,
          telephonySession: curr,
          telephonySessionId: telephonySessionId,
          toName: toName,
          fromName: fromName,
          from: _objectSpread(_objectSpread({}, from !== null && from !== void 0 ? from : {}), {}, {
            phoneNumber: fromNumber
          }),
          to: _objectSpread(_objectSpread({}, to !== null && to !== void 0 ? to : {}), {}, {
            phoneNumber: toNumber
          }),
          startTime: startTime,
          sessionId: sessionId,
          webphoneSession: webphoneSession,
          telephonyStatus: telephonyStatus,
          warmTransferInfo: _this4._activeCallControl.transferCallMapping[telephonySessionId],
          isRecording: isRecording,
          isConferenceCall: isConferenceCall,
          conferenceParticipants: conferenceParticipants,
          conferenceParticipantsMatchesList: conferenceParticipantsMatchesList,
          callQueueName: curr.callQueueName || (webphoneSession === null || webphoneSession === void 0 ? void 0 : webphoneSession.callQueueName),
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMatches,
          toNumberEntity: toNumberEntity
        };
        acc.calls.push(callItem);
        acc.sessionIds.push(sessionId);
        acc.telephonySessionIds.push(telephonySessionId);
        acc.map[sessionId] = callItem;
        acc.telephonySessionIdCallMap[telephonySessionId] = callItem;
        return acc;
      }, {
        calls: [],
        sessionIds: [],
        telephonySessionIds: [],
        map: {},
        telephonySessionIdCallMap: {}
      });
      return result;
    }
  }, {
    key: "allCalls",
    get: function get() {
      return this.callsInfo.calls;
    }
  }, {
    key: "sessionIds",
    get: function get() {
      return this.callsInfo.sessionIds;
    }
  }, {
    key: "telephonySessionIds",
    get: function get() {
      return this.callsInfo.telephonySessionIds;
    }
  }, {
    key: "getCallBySessionId",
    value: function getCallBySessionId(sessionId) {
      return this.callsInfo.map[sessionId];
    }
  }, {
    key: "activeOnHoldCalls",
    get: function get() {
      // in spring-ui, data just data
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        return this._activeOnHoldCalls;
      }
      // TODO: remove those logic after all project migrate to spring-ui
      if (this._activeOnHoldCalls.length && !this._activeCurrentCalls.length) {
        return this._activeOnHoldCalls.slice(1);
      }
      return this._activeOnHoldCalls;
    }
  }, {
    key: "activeCurrentCalls",
    get: function get() {
      // in spring-ui, data just data
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        return this._activeCurrentCalls;
      }

      // TODO: remove those logic after all project migrate to spring-ui
      return !this._activeCurrentCalls.length && this._activeOnHoldCalls.length ? this._activeOnHoldCalls.slice(0, 1) : this._activeCurrentCalls;
    }
  }, {
    key: "currDeviceHasActiveCalls",
    get: function get() {
      return this.activeCurrentCalls.length > 0;
    }
  }, {
    key: "activeCurrentCallTelephonySessionId",
    get: function get() {
      var _this$activeCurrentCa;
      return (_this$activeCurrentCa = this.activeCurrentCalls[0]) === null || _this$activeCurrentCa === void 0 ? void 0 : _this$activeCurrentCa.telephonySessionId;
    }
  }, {
    key: "deviceCallsMap",
    get: function get() {
      return this.allCalls.reduce(function (acc, call) {
        if (!call.telephonySession) return acc;
        var otherDevice = (0, _ActiveCallControl.isOtherDeviceCall)(call);
        var targetDevice = otherDevice ? acc.otherDevice : acc.currentDevice;
        addIntoTargetDevice(targetDevice, call);
        if (process.env.THEME_SYSTEM === 'spring-ui') {
          addIntoTargetDevice(acc.allDevices, call);
        }
        return acc;
      }, {
        allDevices: {
          all: [],
          active: [],
          ringing: [],
          holding: []
        },
        currentDevice: {
          all: [],
          active: [],
          ringing: [],
          holding: []
        },
        otherDevice: {
          all: [],
          active: [],
          ringing: [],
          holding: []
        }
      });
    }
  }, {
    key: "activeRingCalls",
    get: function get() {
      return this.deviceCallsMap.currentDevice.ringing;
    }
  }, {
    key: "_activeOnHoldCalls",
    get: function get() {
      return this.deviceCallsMap.currentDevice.holding;
    }
  }, {
    key: "_activeCurrentCalls",
    get: function get() {
      return this.deviceCallsMap.currentDevice.active;
    }
  }, {
    key: "otherDeviceCalls",
    get: function get() {
      return this.deviceCallsMap.otherDevice.all;
    }
  }, {
    key: "ringoutRingCalls",
    get: function get() {
      return this.deviceCallsMap.otherDevice.ringing;
    }
  }, {
    key: "ringoutCurrentCalls",
    get: function get() {
      return this.deviceCallsMap.otherDevice.active;
    }
  }, {
    key: "ringoutOnHoldCalls",
    get: function get() {
      return this.deviceCallsMap.otherDevice.holding;
    }
  }, {
    key: "getDeviceCallsMaps",
    value: function getDeviceCallsMaps(device) {
      return this.deviceCallsMap[device];
    }
  }, {
    key: "uniqueNumbers",
    get: function get() {
      var _this5 = this;
      var uniqueNumbersSet = new Set();
      this.allCalls.forEach(function (callItem) {
        var _callItem$from, _callItem$to;
        if ((_callItem$from = callItem.from) === null || _callItem$from === void 0 ? void 0 : _callItem$from.phoneNumber) {
          uniqueNumbersSet.add(
          // normalize number for ensure the number is matcher mapping with same key
          _this5._numberFormatter.normalizeNumber(callItem.from.phoneNumber));
        }
        if ((_callItem$to = callItem.to) === null || _callItem$to === void 0 ? void 0 : _callItem$to.phoneNumber) {
          uniqueNumbersSet.add(_this5._numberFormatter.normalizeNumber(callItem.to.phoneNumber));
        }
        if (process.env.THEME_SYSTEM === 'spring-ui') {
          var _callItem$conferenceP;
          (_callItem$conferenceP = callItem.conferenceParticipants) === null || _callItem$conferenceP === void 0 ? void 0 : _callItem$conferenceP.forEach(function (curr) {
            if (curr.info.phoneNumber) {
              uniqueNumbersSet.add(_this5._numberFormatter.normalizeNumber(curr.info.phoneNumber));
            }
            if (curr.info.extensionNumber) {
              uniqueNumbersSet.add(curr.info.extensionNumber);
            }
          });
        }
      });
      return Array.from(uniqueNumbersSet);
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "callMatched", [_nextCore.storage, _nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setMatchedData", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "setMatchedData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundCallConnectedTrack", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundCallConnectedTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "outboundCallConnectedTrack", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "outboundCallConnectedTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callItemClickTrack", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "callItemClickTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsClickHoldTrack", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsClickHoldTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsClickHangupTrack", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsClickHangupTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallsClickRejectTrack", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallsClickRejectTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callControlClickAddTrack", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "callControlClickAddTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeControlClickHangupTrack", [_dec30, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeControlClickHangupTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callControlClickMergeTrack", [_dec33, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "callControlClickMergeTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirmMergeClickCloseTrack", [_dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "confirmMergeClickCloseTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirmMergeClickMergeTrack", [_dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "confirmMergeClickMergeTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsOnHoldClickAddTrack", [_dec42, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "callsOnHoldClickAddTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsOnHoldClickMergeTrack", [_dec45, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "callsOnHoldClickMergeTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsOnHoldClickHangupTrack", [_dec48, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "callsOnHoldClickHangupTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callControlClickParticipantAreaTrack", [_dec51, _dec52, _dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "callControlClickParticipantAreaTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsInfo", [_nextCore.computed, _dec54, _dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "callsInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeOnHoldCalls", [_nextCore.computed, _dec56, _dec57], Object.getOwnPropertyDescriptor(_class2.prototype, "activeOnHoldCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeCurrentCalls", [_nextCore.computed, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "activeCurrentCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deviceCallsMap", [_nextCore.computed, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class2.prototype, "deviceCallsMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_nextCore.computed, _dec62, _dec63], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var addIntoTargetDevice = function addIntoTargetDevice(targetDevice, call) {
  targetDevice.all.push(call);
  var ringing = (0, _ActiveCallControl.isRingingCall)(call);
  var holding = (0, _ActiveCallControl.isHoldingCall)(call);
  if (ringing) {
    targetDevice.ringing.push(call);
  } else if (holding) {
    targetDevice.holding.push(call);
  } else {
    targetDevice.active.push(call);
  }
};
//# sourceMappingURL=CallMonitor.js.map
