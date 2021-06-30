"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrlUI = void 0;

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.array.filter");

var _di = require("@ringcentral-integration/commons/lib/di");

var _callingModes = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingModes"));

var _core = require("@ringcentral-integration/core");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallLogCallCtrlUI = (_dec = (0, _di.Module)({
  name: 'CallLogCallCtrlUI',
  deps: ['ActiveCallControl', 'ConnectivityMonitor', 'RateLimiter', 'RouterInteraction', 'CallingSettings', 'ForwardingNumber', 'CallMonitor']
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
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
      var _this$_deps$activeCal, _this$_deps$activeCal2, _this$_deps$activeCal3;

      var telephonySessionId = _ref.telephonySessionId;
      var isWebphone = this._deps.callingSettings.callingMode === _callingModes["default"].webphone;

      var currentSession = this._deps.activeCallControl.getActiveSession(telephonySessionId); // we can get real callee call status from telephony session


      var realOutboundCallStatus = (_this$_deps$activeCal = this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : (_this$_deps$activeCal2 = _this$_deps$activeCal.getRcCallSession(telephonySessionId)) === null || _this$_deps$activeCal2 === void 0 ? void 0 : (_this$_deps$activeCal3 = _this$_deps$activeCal2.otherParties[0]) === null || _this$_deps$activeCal3 === void 0 ? void 0 : _this$_deps$activeCal3.status.code;
      var _this$_deps$callMonit = this._deps.callMonitor,
          activeOnHoldCalls = _this$_deps$callMonit.activeOnHoldCalls,
          activeCurrentCalls = _this$_deps$callMonit.activeCurrentCalls;
      var otherActiveCalls = currentSession && !!activeOnHoldCalls.concat(activeCurrentCalls).filter(function (call) {
        return call.sessionId !== currentSession.sessionId;
      }).length;
      return {
        isWebphone: isWebphone,
        currentSession: currentSession,
        disableLinks: !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling,
        telephonySessionId: telephonySessionId,
        forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
        otherActiveCalls: otherActiveCalls,
        realOutboundCallStatus: realOutboundCallStatus
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
  }]);

  return CallLogCallCtrlUI;
}(_core.RcUIModuleV2)) || _class);
exports.CallLogCallCtrlUI = CallLogCallCtrlUI;
//# sourceMappingURL=CallLogCallCtrlUI.js.map
