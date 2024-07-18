"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrlUI = void 0;
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _di = require("@ringcentral-integration/commons/lib/di");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _dec3, _class, _class2;
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
var CallLogCallCtrlUI = (_dec = (0, _di.Module)({
  name: 'CallLogCallCtrlUI',
  deps: ['ActiveCallControl', 'ConnectivityMonitor', 'RateLimiter', 'RouterInteraction', 'CallingSettings', 'ForwardingNumber', 'CallMonitor', 'ExtensionFeatures']
}), _dec2 = (0, _core.track)(function () {
  return [_trackEvents.trackEvents.clickReplyWithMessage, {
    entry: 'Call log  page'
  }];
}), _dec3 = (0, _core.track)(_trackEvents.trackEvents.completeWarmTransfer), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(CallLogCallCtrlUI, _RcUIModuleV);
  var _super = _createSuper(CallLogCallCtrlUI);
  function CallLogCallCtrlUI(deps) {
    var _this;
    _classCallCheck(this, CallLogCallCtrlUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this._onTransfer = function (telephonySessionId) {
      _this._deps.activeCallControl.clickTransferTrack();
      return _this._deps.routerInteraction.push("/transfer/".concat(telephonySessionId, "/active"));
    };
    return _this;
  }
  _createClass(CallLogCallCtrlUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$activeCal, _this$_deps$activeCal2, _this$_deps$activeCal3, _this$_deps$activeCal4, _this$_deps$activeCal5;
      var telephonySessionId = _ref.telephonySessionId;
      var isWebphone = this._deps.callingSettings.callingMode === _CallingSettings.callingModes.webphone;
      var currentSession = this._deps.activeCallControl.getActiveSession(telephonySessionId);
      // we can get real callee call status from telephony session
      var realOutboundCallStatus = (_this$_deps$activeCal = this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : (_this$_deps$activeCal2 = _this$_deps$activeCal.getSession(telephonySessionId)) === null || _this$_deps$activeCal2 === void 0 ? void 0 : (_this$_deps$activeCal3 = _this$_deps$activeCal2.otherParties[0]) === null || _this$_deps$activeCal3 === void 0 ? void 0 : (_this$_deps$activeCal4 = _this$_deps$activeCal3.status) === null || _this$_deps$activeCal4 === void 0 ? void 0 : _this$_deps$activeCal4.code;
      var _this$_deps$callMonit = this._deps.callMonitor,
        activeOnHoldCalls = _this$_deps$callMonit.activeOnHoldCalls,
        activeCurrentCalls = _this$_deps$callMonit.activeCurrentCalls;
      var controlBusy = ((_this$_deps$activeCal5 = this._deps.activeCallControl) === null || _this$_deps$activeCal5 === void 0 ? void 0 : _this$_deps$activeCal5.busy) || false;
      var isEnablePickup = !!this._deps.activeCallControl.pickUpCallDataMap[telephonySessionId];
      var allowPickupCall = isEnablePickup && isWebphone;
      var otherActiveCalls = currentSession && !!activeOnHoldCalls.concat(activeCurrentCalls).filter(function (call) {
        return call.sessionId !== currentSession.sessionId;
      }).length;
      return {
        isWebphone: isWebphone,
        // @ts-expect-error TS(2322): Type 'Partial<ActiveSession> | null' is not assign... Remove this comment to see the full error message
        currentSession: currentSession,
        disableLinks: !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling || controlBusy,
        telephonySessionId: telephonySessionId,
        forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
        // @ts-expect-error TS(2322): Type 'boolean | null' is not assignable to type 'b... Remove this comment to see the full error message
        otherActiveCalls: otherActiveCalls,
        realOutboundCallStatus: realOutboundCallStatus,
        allowPickupCall: allowPickupCall
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        mute: this._deps.activeCallControl.mute.bind(this._deps.activeCallControl),
        unmute: this._deps.activeCallControl.unmute.bind(this._deps.activeCallControl),
        hangUp: this._deps.activeCallControl.hangUp.bind(this._deps.activeCallControl),
        reject: this._deps.activeCallControl.reject.bind(this._deps.activeCallControl),
        onHold: this._deps.activeCallControl.hold.bind(this._deps.activeCallControl),
        onUnHold: this._deps.activeCallControl.unhold.bind(this._deps.activeCallControl),
        startRecord: this._deps.activeCallControl.startRecord.bind(this._deps.activeCallControl),
        stopRecord: this._deps.activeCallControl.stopRecord.bind(this._deps.activeCallControl),
        onCompleteWarmTransfer: function onCompleteWarmTransfer(telephonySession) {
          _this2.completeWarmTransferTrack();
          return _this2._deps.activeCallControl.completeWarmTransfer(telephonySession);
        },
        onTransfer: this._onTransfer,
        sendDTMF: function sendDTMF(dtmfValue, telephonySessionId) {
          return _this2._deps.activeCallControl.sendDTMF(dtmfValue, telephonySessionId);
        },
        answer: this._deps.activeCallControl.answer.bind(this._deps.activeCallControl),
        forward: function forward(phoneNumber, telephonySessionId) {
          if (phoneNumber === 'custom') {
            _this2._deps.routerInteraction.push("/forward/".concat(telephonySessionId));
          } else {
            _this2._deps.activeCallControl.forward.call(_this2._deps.activeCallControl, phoneNumber, telephonySessionId);
          }
        },
        reply: function reply(telephonySessionId) {
          _this2._deps.routerInteraction.push("/replyWithMessage/".concat(telephonySessionId, "/active"));
          _this2.replyWithMessageEntranceTrack();
        },
        ignore: this._deps.activeCallControl.ignore.bind(this._deps.activeCallControl),
        answerAndHold: this._deps.activeCallControl.answerAndHold.bind(this._deps.activeCallControl),
        answerAndEnd: this._deps.activeCallControl.answerAndEnd.bind(this._deps.activeCallControl),
        dialpadToggleTrack: function dialpadToggleTrack(open) {
          if (open) {
            _this2._deps.activeCallControl.dialpadOpenTrack();
          } else {
            _this2._deps.activeCallControl.dialpadCloseTrack();
          }
        },
        clickForwardTrack: this._deps.activeCallControl.clickForwardTrack.bind(this._deps.activeCallControl)
      };
    }
  }, {
    key: "replyWithMessageEntranceTrack",
    value: function replyWithMessageEntranceTrack() {}
  }, {
    key: "completeWarmTransferTrack",
    value: function completeWarmTransferTrack() {}
  }]);
  return CallLogCallCtrlUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "replyWithMessageEntranceTrack", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessageEntranceTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeWarmTransferTrack", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "completeWarmTransferTrack"), _class2.prototype)), _class2)) || _class);
exports.CallLogCallCtrlUI = CallLogCallCtrlUI;
//# sourceMappingURL=CallLogCallCtrlUI.js.map
