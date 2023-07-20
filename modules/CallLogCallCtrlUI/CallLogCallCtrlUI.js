"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
