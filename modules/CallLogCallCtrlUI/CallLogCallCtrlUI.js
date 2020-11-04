"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.array.filter");

var _di = require("ringcentral-integration/lib/di");

var _callingModes = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingModes"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallLogCallCtrlUI = (_dec = (0, _di.Module)({
  name: 'CallLogCallCtrlUI',
  deps: ['ActiveCallControl', 'ConnectivityMonitor', 'RateLimiter', 'RouterInteraction', 'CallingSettings', 'ForwardingNumber', 'CallMonitor']
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcUIModule) {
  _inherits(CallLogCallCtrlUI, _RcUIModule);

  var _super = _createSuper(CallLogCallCtrlUI);

  function CallLogCallCtrlUI(_ref) {
    var _this;

    var activeCallControl = _ref.activeCallControl,
        connectivityMonitor = _ref.connectivityMonitor,
        rateLimiter = _ref.rateLimiter,
        routerInteraction = _ref.routerInteraction,
        callingSettings = _ref.callingSettings,
        forwardingNumber = _ref.forwardingNumber,
        callMonitor = _ref.callMonitor,
        options = _objectWithoutProperties(_ref, ["activeCallControl", "connectivityMonitor", "rateLimiter", "routerInteraction", "callingSettings", "forwardingNumber", "callMonitor"]);

    _classCallCheck(this, CallLogCallCtrlUI);

    _this = _super.call(this, _objectSpread({}, options));
    _this._activeCallControl = void 0;
    _this._connectivityMonitor = void 0;
    _this._rateLimiter = void 0;
    _this._routerInteraction = void 0;
    _this._callingSettings = void 0;
    _this._forwardingNumber = void 0;
    _this._callMonitor = void 0;

    _this.onTransfer = function (telephonySessionId) {
      return _this._routerInteraction.push("/transfer/".concat(telephonySessionId, "/active"));
    };

    _this._activeCallControl = activeCallControl;
    _this._connectivityMonitor = connectivityMonitor;
    _this._rateLimiter = rateLimiter;
    _this._routerInteraction = routerInteraction;
    _this._callingSettings = callingSettings;
    _this._forwardingNumber = forwardingNumber;
    _this._callMonitor = callMonitor;
    return _this;
  }

  _createClass(CallLogCallCtrlUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var telephonySessionId = _ref2.telephonySessionId;
      var isWebphone = this._callingSettings.callingMode === _callingModes["default"].webphone;

      var currentSession = this._activeCallControl.getActiveSession(telephonySessionId);

      var _this$_callMonitor = this._callMonitor,
          activeOnHoldCalls = _this$_callMonitor.activeOnHoldCalls,
          activeCurrentCalls = _this$_callMonitor.activeCurrentCalls;
      var otherActiveCalls = currentSession && !!activeOnHoldCalls.concat(activeCurrentCalls).filter(function (call) {
        return call.sessionId !== currentSession.sessionId;
      }).length;
      return {
        isWebphone: isWebphone,
        currentSession: currentSession,
        disableLinks: !this._connectivityMonitor.connectivity || this._rateLimiter.throttling,
        telephonySessionId: telephonySessionId,
        forwardingNumbers: this._forwardingNumber.forwardingNumbers,
        otherActiveCalls: otherActiveCalls
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        mute: this._activeCallControl.mute.bind(this._activeCallControl),
        unmute: this._activeCallControl.unmute.bind(this._activeCallControl),
        hangUp: this._activeCallControl.hangUp.bind(this._activeCallControl),
        reject: this._activeCallControl.reject.bind(this._activeCallControl),
        onHold: this._activeCallControl.hold.bind(this._activeCallControl),
        onUnHold: this._activeCallControl.unhold.bind(this._activeCallControl),
        startRecord: this._activeCallControl.startRecord.bind(this._activeCallControl),
        stopRecord: this._activeCallControl.stopRecord.bind(this._activeCallControl),
        onTransfer: this.onTransfer,
        sendDTMF: function sendDTMF(dtmfValue, telephonySessionId) {
          return _this2._activeCallControl.sendDTMF(dtmfValue, telephonySessionId);
        },
        answer: this._activeCallControl.answer.bind(this._activeCallControl),
        forward: function forward(phoneNumber, telephonySessionId) {
          if (phoneNumber === 'custom') {
            _this2._routerInteraction.push("/forward/".concat(telephonySessionId));
          } else {
            _this2._activeCallControl.forward.call(_this2._activeCallControl, phoneNumber, telephonySessionId);
          }
        },
        ignore: this._activeCallControl.ignore.bind(this._activeCallControl),
        answerAndHold: this._activeCallControl.answerAndHold.bind(this._activeCallControl),
        answerAndEnd: this._activeCallControl.answerAndEnd.bind(this._activeCallControl)
      };
    }
  }]);

  return CallLogCallCtrlUI;
}(_RcUIModule2["default"]), _temp)) || _class);
exports["default"] = CallLogCallCtrlUI;
//# sourceMappingURL=CallLogCallCtrlUI.js.map
