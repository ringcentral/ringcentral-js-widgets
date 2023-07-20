"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.values");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.match");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallMonitor = void 0;
var _events = require("events");
var _ramda = require("ramda");
var _core = require("@ringcentral-integration/core");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _di = require("../../lib/di");
var _normalizeNumber = require("../../lib/normalizeNumber");
var _ActiveCallControl = require("../ActiveCallControl");
var _trackEvents = require("../../enums/trackEvents");
var _webphoneHelper = require("../Webphone/webphoneHelper");
var _callEvents = require("./callEvents");
var _callMonitorHelper = require("./callMonitorHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _class2, _descriptor;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
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
  // @ts-expect-error
  Object.values((_that$_deps$conferenc = (_that$_deps$conferenc2 = that._deps.conferenceCall) === null || _that$_deps$conferenc2 === void 0 ? void 0 : _that$_deps$conferenc2.state.mergingPair) !== null && _that$_deps$conferenc !== void 0 ? _that$_deps$conferenc : {}).length ? _trackEvents.trackEvents.clickMergeCallControl : _trackEvents.trackEvents.clickMergeMergeCallControl];
}), _dec11 = (0, _core.track)(_trackEvents.trackEvents.clickCloseConfirmMergeModal), _dec12 = (0, _core.track)(_trackEvents.trackEvents.clickMergeConfirmMergeModal), _dec13 = (0, _core.track)(_trackEvents.trackEvents.clickAddCallsOnHold), _dec14 = (0, _core.track)(_trackEvents.trackEvents.clickMergeCallsOnHold), _dec15 = (0, _core.track)(_trackEvents.trackEvents.clickHangupCallsOnHold), _dec16 = (0, _core.track)(_trackEvents.trackEvents.clickParticipantAreaCallControl), _dec17 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa, _that$_deps$activityM;
  return [that.normalizedCalls, (_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping, (_that$_deps$activityM = that._deps.activityMatcher) === null || _that$_deps$activityM === void 0 ? void 0 : _that$_deps$activityM.dataMapping, that.callMatched];
}), _dec18 = (0, _core.computed)(function (that) {
  return [that.normalizedCallsFromPresence, that.normalizedCallsFromTelephonySessions, that.useTelephonySession];
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
    // @ts-expect-error
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
          // loop to execut the onRinging handlers
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
          // @ts-expect-error
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
      console.log('removeMatched:', index);
      entities.splice(index, 1);
      console.log('entities after splice:', entities);
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
      // @ts-expect-error
      this._normalizedCalls = (0, _ramda.sort)(
      // @ts-expect-error
      function (l, r) {
        return (0, _webphoneHelper.sortByLastActiveTimeDesc)(l.webphoneSession, r.webphoneSession);
      },
      // @ts-expect-error
      (0, _ramda.map)(function (callItem) {
        // use account countryCode to normalize number due to API issues [RCINT-3419]
        var fromNumber = (0, _normalizeNumber.normalizeNumber)({
          // @ts-expect-error
          phoneNumber: callItem.from && callItem.from.phoneNumber,
          countryCode: _this5._deps.accountInfo.countryCode,
          maxExtensionLength: _this5._deps.accountInfo.maxExtensionNumberLength
        });
        var toNumber = (0, _normalizeNumber.normalizeNumber)({
          // @ts-expect-error
          phoneNumber: callItem.to && callItem.to.phoneNumber,
          countryCode: _this5._deps.accountInfo.countryCode,
          maxExtensionLength: _this5._deps.accountInfo.maxExtensionNumberLength
        });
        var webphoneSession = (0, _callMonitorHelper.matchWephoneSessionWithAcitveCall)(theSessions, callItem);
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
        _this$_deps$activeCal2,
        _this6 = this;
      // TODO: match cached calls when there are conference merging calls, refer to `normalizedCallsFromPresence` function
      if (!((_this$_deps$activeCal = this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.sessions)) return [];
      var combinedCalls = _toConsumableArray((_this$_deps$activeCal2 = this._deps.activeCallControl) === null || _this$_deps$activeCal2 === void 0 ? void 0 : _this$_deps$activeCal2.sessions); // clone
      var _this$_deps$activeCal3 = this._deps.activeCallControl,
        currentDeviceCallsMap = _this$_deps$activeCal3.currentDeviceCallsMap,
        transferCallMapping = _this$_deps$activeCal3.transferCallMapping; // mapping and sort
      // @ts-expect-error
      this._normalizedCalls = (0, _ramda.sort)(
      // @ts-expect-error
      function (l, r) {
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
          // @ts-expect-error
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
        // @ts-expect-error
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
      return this._normalizedCalls;
    }
  }, {
    key: "calls",
    get: function get() {
      var _this7 = this;
      return (0, _ramda.filter)(function (callItem) {
        var _this7$_deps$conferen;
        // filtering out the conferece during merging
        if ((_this7$_deps$conferen = _this7._deps.conferenceCall) === null || _this7$_deps$conferen === void 0 ? void 0 : _this7$_deps$conferen.isMerging) {
          // @ts-expect-error
          return !(0, _webphoneHelper.isConferenceSession)(callItem.webphoneSession);
        }
        return true;
      }, this.allCalls);
    }
  }, {
    key: "activeRingCalls",
    get: function get() {
      var _this8 = this;
      // @ts-expect-error
      return (0, _ramda.filter)(function (callItem) {
        if (_this8.useTelephonySession) {
          return callItem.webphoneSession && callItem.telephonySession &&
          // @ts-expect-error
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
            // @ts-expect-error
            callItem.webphoneSession && callItem.telephonySession &&
            // @ts-expect-error
            (0, _ActiveCallControl.isHolding)(callItem.telephonySession)
          );
        }, this.calls);
      }
      return (0, _ramda.filter)(function (callItem) {
        return (
          // @ts-expect-error
          callItem.webphoneSession && (0, _webphoneHelper.isOnHold)(callItem.webphoneSession)
        );
      }, this.calls);
    }
  }, {
    key: "_activeCurrentCalls",
    get: function get() {
      var _this9 = this;
      // @ts-expect-error
      return (0, _ramda.filter)(function (callItem) {
        if (_this9.useTelephonySession) {
          return callItem.webphoneSession && callItem.telephonySession &&
          // @ts-expect-error
          !(0, _ActiveCallControl.isRinging)(callItem.telephonySession) &&
          // @ts-expect-error
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
        _this$_deps$activeCal4,
        _this$_deps$webphone3;
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
        // @ts-expect-error
        var endCall = null;
        if (_this10.useTelephonySession) {
          endCall = (0, _callMonitorHelper.isCurrentDeviceEndCall)(sessionsCache, callItem);
        } else {
          // @ts-expect-error
          endCall = (0, _callMonitorHelper.matchWephoneSessionWithAcitveCall)(sessionsCache, callItem);
        }
        return {
          sessionsCache: (0, _ramda.filter)(function (x) {
            return x !== endCall;
          }, sessionsCache),
          res: endCall ? res : [].concat(_toConsumableArray(res), [callItem])
        };
      }, {
        sessionsCache: this.useTelephonySession ? (_this$_deps$activeCal4 = this._deps.activeCallControl) === null || _this$_deps$activeCal4 === void 0 ? void 0 : _this$_deps$activeCal4.lastEndedSessionIds : (_this$_deps$webphone3 = this._deps.webphone) === null || _this$_deps$webphone3 === void 0 ? void 0 : _this$_deps$webphone3.lastEndedSessions,
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
