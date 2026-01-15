"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.match");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogUIBase = exports.CallLogUI = void 0;
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _core = require("@ringcentral-integration/core");
var _react = _interopRequireDefault(require("react"));
var _CallLogCallCtrlContainer = require("../../containers/CallLogCallCtrlContainer");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _class, _dec2, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
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
}), _dec(_class = /*#__PURE__*/function (_ref) {
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
  }]);
  return CallLogUIBase;
}(_core.RcUIModuleV2)) || _class); // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
exports.CallLogUIBase = CallLogUIBase;
var CallLogUI = (_dec2 = (0, _di.Module)(), _dec2(_class2 = /*#__PURE__*/function (_CallLogUIBase) {
  _inherits(CallLogUI, _CallLogUIBase);
  var _super2 = _createSuper(CallLogUI);
  function CallLogUI(deps) {
    _classCallCheck(this, CallLogUI);
    return _super2.call(this, {
      deps: deps
    });
  }
  return CallLogUI;
}(CallLogUIBase)) || _class2);
exports.CallLogUI = CallLogUI;
//# sourceMappingURL=CallLogUI.js.map
