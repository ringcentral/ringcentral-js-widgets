"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.match");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogUIBase = exports.CallLogUI = void 0;
var _react = _interopRequireDefault(require("react"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _core = require("@ringcentral-integration/core");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _CallLogCallCtrlContainer = require("../../containers/CallLogCallCtrlContainer");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _class, _class2, _dec3, _class3;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
var CallLogCallControlRenderer = function CallLogCallControlRenderer(currentLocale, telephonySessionId, isWide, enableReply, isCurrentDeviceCall, warmTransferActiveTelephonySessionId) {
  return /*#__PURE__*/_react["default"].createElement(_CallLogCallCtrlContainer.CallLogCallCtrlContainer, {
    currentLocale: currentLocale,
    telephonySessionId: telephonySessionId,
    isCurrentDeviceCall: isCurrentDeviceCall,
    warmTransferActiveTelephonySessionId: warmTransferActiveTelephonySessionId,
    isWide: isWide,
    enableReply: enableReply
  });
};
var CallLogUIBase = (_dec = (0, _di.Module)({
  name: 'CallLogUI',
  deps: ['Locale', 'CallLogger', 'RateLimiter', 'RegionSettings', 'DateTimeFormat', 'CallLogSection', 'RouterInteraction', 'ActiveCallControl', 'AppFeatures', 'ConnectivityMonitor', 'CallingSettings', 'ForwardingNumber', 'AccountInfo', {
    dep: 'CallLogUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function () {
  return [_trackEvents.trackEvents.clickReplyWithMessage, {
    entry: 'Inbound call notification page'
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  _inherits(CallLogUIBase, _ref);
  var _super = _createSuper(CallLogUIBase);
  function CallLogUIBase(_ref2) {
    var deps = _ref2.deps,
      options = _objectWithoutProperties(_ref2, ["deps"]);
    _classCallCheck(this, CallLogUIBase);
    return _super.call(this, _objectSpread({
      deps: deps
    }, options));
  }
  _createClass(CallLogUIBase, [{
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$callLogSe = this._deps.callLogSection,
        currentNotificationIdentify = _this$_deps$callLogSe.currentNotificationIdentify,
        currentIdentify = _this$_deps$callLogSe.currentIdentify,
        warmTransferActiveTelephonySessionId = _this$_deps$callLogSe.warmTransferActiveTelephonySessionId;
      var isInTransferPage = this._deps.routerInteraction.currentPath.match('^/transfer/') !== null;
      return {
        currentLocale: this._deps.locale.currentLocale,
        header: true,
        showSpinner: !(this._deps.locale.ready && this._deps.regionSettings.ready && this._deps.dateTimeFormat.ready && this._deps.appFeatures.ready && (!this._deps.callLogger || this._deps.callLogger.ready)),
        isInTransferPage: isInTransferPage,
        disableLinks: !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling,
        currentIdentify: currentIdentify,
        // notification props
        currentNotificationIdentify: currentNotificationIdentify,
        // @ts-expect-error TS(2322): Type 'Partial<ActiveSession> | null' is not assign... Remove this comment to see the full error message
        currentSession: this._deps.activeCallControl.getActiveSession(this._deps.activeCallControl.sessionIdToTelephonySessionIdMapping[currentNotificationIdentify]),
        // @ts-expect-error TS(2322): Type 'Partial<ActiveSession> | null' is not assign... Remove this comment to see the full error message
        activeSession: this._deps.activeCallControl.activeSession,
        isWebRTC: this._deps.callingSettings.callWith === _CallingSettings.callingOptions.browser,
        forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
        warmTransferActiveTelephonySessionId: warmTransferActiveTelephonySessionId
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this = this;
      return {
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this._deps.regionSettings.areaCode,
            countryCode: _this._deps.regionSettings.countryCode,
            maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength
          }) || _i18n["default"].getString('unknown', _this._deps.locale.currentLocale);
        },
        goBack: function goBack() {
          _this._deps.callLogSection.closeLogSection();
          _this._deps.callLogSection.closeLogNotification();
        },
        renderCallLogCallControl: function renderCallLogCallControl(telephonySessionId, isWide, enableReply, isCurrentDeviceCall, warmTransferActiveTelephonySessionId) {
          return CallLogCallControlRenderer(_this._deps.locale.currentLocale, telephonySessionId, isWide, enableReply, isCurrentDeviceCall, warmTransferActiveTelephonySessionId);
        },
        // notification props
        onSaveNotification: function onSaveNotification() {
          return _this._deps.callLogSection.saveAndHandleNotification();
        },
        onDiscardNotification: function onDiscardNotification() {
          return _this._deps.callLogSection.discardAndHandleNotification();
        },
        onCloseNotification: function onCloseNotification() {
          return _this._deps.callLogSection.closeLogNotification();
        },
        onExpandNotification: function onExpandNotification() {
          return _this._deps.callLogSection.expandLogNotification();
        },
        onSwitchWarmTransferSession: function onSwitchWarmTransferSession() {
          var _this$_deps$callLogSe2 = _this._deps.callLogSection,
            currentCall = _this$_deps$callLogSe2.currentCall,
            currentWarmTransferCall = _this$_deps$callLogSe2.currentWarmTransferCall,
            warmTransferActiveTelephonySessionId = _this$_deps$callLogSe2.warmTransferActiveTelephonySessionId;
          if (!currentCall || !currentWarmTransferCall) return;
          var isTransferCallActive = (currentWarmTransferCall === null || currentWarmTransferCall === void 0 ? void 0 : currentWarmTransferCall.telephonySessionId) === warmTransferActiveTelephonySessionId;
          var activeCall = isTransferCallActive ? currentWarmTransferCall : currentCall;
          var subCall = isTransferCallActive ? currentCall : currentWarmTransferCall;
          var isActiveCallOnHold = (0, _callLogHelpers.isOnHold)(activeCall);
          if (isActiveCallOnHold) {
            _this._deps.callLogSection.setWarmTransferCallActiveId(subCall.telephonySessionId);
          } else {
            return _this._deps.activeCallControl.unhold(
            // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
            subCall.telephonySessionId);
          }
        },
        onReject: function onReject(sessionId) {
          var telephonySessionId = _this._deps.activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
          return _this._deps.activeCallControl.reject(telephonySessionId);
        },
        onHangup: function onHangup(sessionId) {
          var telephonySessionId = _this._deps.activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
          return _this._deps.activeCallControl.hangUp(telephonySessionId);
        },
        onIgnore: function onIgnore(telephonySessionId) {
          var _this$_deps$activeCal, _this$_deps$activeCal2;
          (_this$_deps$activeCal = (_this$_deps$activeCal2 = _this._deps.activeCallControl).ignore) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.call(_this$_deps$activeCal2, telephonySessionId);
          _this._deps.callLogSection.closeLogNotification();
        },
        onForward: function onForward(phoneNumber, telephonySessionId) {
          if (phoneNumber === 'custom') {
            _this._deps.routerInteraction.push("/forward/".concat(telephonySessionId));
          } else {
            var _this$_deps$activeCal3, _this$_deps$activeCal4;
            (_this$_deps$activeCal3 = (_this$_deps$activeCal4 = _this._deps.activeCallControl).forward) === null || _this$_deps$activeCal3 === void 0 ? void 0 : _this$_deps$activeCal3.call(_this$_deps$activeCal4, phoneNumber, telephonySessionId);
            _this._deps.callLogSection.closeLogNotification();
          }
        },
        reply: function reply(telephonySessionId) {
          _this._deps.routerInteraction.push("/replyWithMessage/".concat(telephonySessionId, "/active"));
          _this.replyWithMessageEntranceTrack();
        },
        endAndAnswer: function endAndAnswer(telephonySessionId) {
          var _this$_deps$activeCal5, _this$_deps$activeCal6;
          (_this$_deps$activeCal5 = (_this$_deps$activeCal6 = _this._deps.activeCallControl).answerAndEnd) === null || _this$_deps$activeCal5 === void 0 ? void 0 : _this$_deps$activeCal5.call(_this$_deps$activeCal6, telephonySessionId);
          _this._deps.callLogSection.discardAndHandleNotification();
        },
        holdAndAnswer: function holdAndAnswer(telephonySessionId) {
          var _this$_deps$activeCal7, _this$_deps$activeCal8;
          (_this$_deps$activeCal7 = (_this$_deps$activeCal8 = _this._deps.activeCallControl).answerAndHold) === null || _this$_deps$activeCal7 === void 0 ? void 0 : _this$_deps$activeCal7.call(_this$_deps$activeCal8, telephonySessionId);
          _this._deps.callLogSection.discardAndHandleNotification();
        },
        toVoicemail: function toVoicemail(telephonySessionId) {
          _this._deps.activeCallControl.reject(telephonySessionId);
          _this._deps.callLogSection.closeLogNotification();
        },
        answer: function answer(telephonySessionId) {
          var _this$_deps$activeCal9, _this$_deps$activeCal10;
          (_this$_deps$activeCal9 = (_this$_deps$activeCal10 = _this._deps.activeCallControl).answer) === null || _this$_deps$activeCal9 === void 0 ? void 0 : _this$_deps$activeCal9.call(_this$_deps$activeCal10, telephonySessionId);
          _this._deps.callLogSection.discardAndHandleNotification();
        },
        clickForwardTrack: function clickForwardTrack() {
          var _this$_deps$activeCal11, _this$_deps$activeCal12;
          return (_this$_deps$activeCal11 = (_this$_deps$activeCal12 = _this._deps.activeCallControl).clickForwardTrack) === null || _this$_deps$activeCal11 === void 0 ? void 0 : _this$_deps$activeCal11.call(_this$_deps$activeCal12);
        },
        openEntityDetailLinkTrack: function openEntityDetailLinkTrack(path) {
          var _this$_deps$activeCal13, _this$_deps$activeCal14;
          return (_this$_deps$activeCal13 = (_this$_deps$activeCal14 = _this._deps.activeCallControl).openEntityDetailLinkTrack) === null || _this$_deps$activeCal13 === void 0 ? void 0 : _this$_deps$activeCal13.call(_this$_deps$activeCal14, path);
        }
      };
    }
  }, {
    key: "replyWithMessageEntranceTrack",
    value: function replyWithMessageEntranceTrack() {}
  }]);
  return CallLogUIBase;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "replyWithMessageEntranceTrack", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessageEntranceTrack"), _class2.prototype)), _class2)) || _class); // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
exports.CallLogUIBase = CallLogUIBase;
var CallLogUI = (_dec3 = (0, _di.Module)(), _dec3(_class3 = /*#__PURE__*/function (_CallLogUIBase) {
  _inherits(CallLogUI, _CallLogUIBase);
  var _super2 = _createSuper(CallLogUI);
  function CallLogUI(deps) {
    _classCallCheck(this, CallLogUI);
    return _super2.call(this, {
      deps: deps
    });
  }
  return CallLogUI;
}(CallLogUIBase)) || _class3);
exports.CallLogUI = CallLogUI;
//# sourceMappingURL=CallLogUI.js.map
