"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCallLogPanel = void 0;
var _BasicCallInfo = require("@ringcentral-integration/widgets/components/BasicCallInfo");
var _CallLogPanel = _interopRequireDefault(require("@ringcentral-integration/widgets/components/CallLogPanel"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _enums = require("../../enums");
var _EvSmallCallControl = require("../EvSmallCallControl");
var _ActivityCallLogWrapper = require("./ActivityCallLogWrapper");
var _IvrInfo = require("./IvrInfo");
var _KeypadCollapse = require("./KeypadCollapse");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _utils = require("./utils");
var _excluded = ["currentLocale", "currentLog", "basicInfo", "isInbound", "disposeCall", "status", "saveStatus", "goToRequeueCallPage", "goToTransferCallPage", "onMute", "onUnmute", "onHangup", "onReject", "onHold", "onUnHold", "isOnMute", "isOnHold", "smallCallControlSize", "isInComingCall", "currentCallControlPermission", "disableDispose", "disableTransfer", "disableInternalTransfer", "disableHold", "disableHangup", "disableMute", "disableActive", "isOnActive", "onActive", "isWide", "showMuteButton", "ivrAlertData", "agentScriptData", "onCopySuccess", "scrollTo", "referenceFieldOptions", "showRecordCall", "recordPauseCount", "disableRecordControl", "isRecording", "onResumeRecord", "timeStamp", "onRecord", "onPauseRecord", "onRestartTimer", "onStopRecord", "disablePauseRecord", "isKeypadOpen", "keypadValue", "setKeypadIsOpen", "setKeypadValue"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ActivityCallLogPanel = exports.ActivityCallLogPanel = function ActivityCallLogPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    currentLog = _ref.currentLog,
    basicInfo = _ref.basicInfo,
    isInbound = _ref.isInbound,
    disposeCall = _ref.disposeCall,
    status = _ref.status,
    saveStatus = _ref.saveStatus,
    goToRequeueCallPage = _ref.goToRequeueCallPage,
    goToTransferCallPage = _ref.goToTransferCallPage,
    onMute = _ref.onMute,
    onUnmute = _ref.onUnmute,
    onHangup = _ref.onHangup,
    onReject = _ref.onReject,
    onHold = _ref.onHold,
    onUnHold = _ref.onUnHold,
    isOnMute = _ref.isOnMute,
    isOnHold = _ref.isOnHold,
    smallCallControlSize = _ref.smallCallControlSize,
    isInComingCall = _ref.isInComingCall,
    _ref$currentCallContr = _ref.currentCallControlPermission,
    allowTransferCall = _ref$currentCallContr.allowTransferCall,
    allowRequeueCall = _ref$currentCallContr.allowRequeueCall,
    disableDispose = _ref.disableDispose,
    disableTransfer = _ref.disableTransfer,
    disableInternalTransfer = _ref.disableInternalTransfer,
    disableHold = _ref.disableHold,
    disableHangup = _ref.disableHangup,
    disableMute = _ref.disableMute,
    disableActive = _ref.disableActive,
    isOnActive = _ref.isOnActive,
    onActive = _ref.onActive,
    isWide = _ref.isWide,
    showMuteButton = _ref.showMuteButton,
    ivrAlertData = _ref.ivrAlertData,
    agentScriptData = _ref.agentScriptData,
    onCopySuccess = _ref.onCopySuccess,
    scrollTo = _ref.scrollTo,
    referenceFieldOptions = _ref.referenceFieldOptions,
    showRecordCall = _ref.showRecordCall,
    recordPauseCount = _ref.recordPauseCount,
    disableRecordControl = _ref.disableRecordControl,
    isRecording = _ref.isRecording,
    onResumeRecord = _ref.onResumeRecord,
    timeStamp = _ref.timeStamp,
    onRecord = _ref.onRecord,
    onPauseRecord = _ref.onPauseRecord,
    onRestartTimer = _ref.onRestartTimer,
    onStopRecord = _ref.onStopRecord,
    disablePauseRecord = _ref.disablePauseRecord,
    isKeypadOpen = _ref.isKeypadOpen,
    keypadValue = _ref.keypadValue,
    setKeypadIsOpen = _ref.setKeypadIsOpen,
    setKeypadValue = _ref.setKeypadValue,
    rest = _objectWithoutProperties(_ref, _excluded);
  var transferRef = (0, _react.useRef)(null);
  var rootRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    transferEl = _useState2[0],
    setTransferRef = _useState2[1];
  var isActivity = status === 'active';
  var isCallEnd = status === 'callEnd';
  var isLoading = saveStatus === 'saving';
  var onTransfer = function onTransfer() {
    setTransferRef(transferRef.current);
  };
  var handleTransferClose = function handleTransferClose() {
    setTransferRef(null);
  };
  var callControlRef = (0, _react.useRef)(null);
  var editLogSection = (0, _react.useCallback)(function (props) {
    var _rootRef$current;
    return /*#__PURE__*/_react["default"].createElement(_utils.EditLogSection, _extends({
      isWide: isWide
    }, props, {
      scrollTo: scrollTo,
      rootRef: (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.editSectionRef,
      referenceFieldOptions: referenceFieldOptions
    }));
  }, [isWide, scrollTo, referenceFieldOptions]);
  return /*#__PURE__*/_react["default"].createElement(_CallLogPanel["default"], _extends({
    ref: rootRef
  }, rest, {
    currentLog: currentLog,
    currentLocale: currentLocale,
    classes: {
      root: _styles["default"].root,
      callLogCallControl: (0, _clsx["default"])(_styles["default"].callLogCallControl, isCallEnd ? _styles["default"].noneShadow : _styles["default"].smallCallControlRoot)
    },
    refs: {
      root: rootRef,
      callLogCallControl: callControlRef
    },
    isWide: isWide,
    header: false,
    showSpinner: false,
    isInTransferPage: false
    // TODO: that need refactor CallLogPanel and then can remove that
    ,
    currentIdentify: "123",
    renderEditLogSection: editLogSection,
    renderBasicInfo: function renderBasicInfo() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_BasicCallInfo.BasicCallInfo, {
        status: status,
        currentLocale: currentLocale,
        isInbound: isInbound,
        isRinging: isActivity,
        subject: basicInfo.subject,
        followInfos: basicInfo.followInfos,
        callInfos: basicInfo.callInfos,
        callControlRef: callControlRef,
        onCopySuccess: onCopySuccess,
        classes: {
          panel: isCallEnd && _styles["default"].noneShadow
        }
      }), (ivrAlertData === null || ivrAlertData === void 0 ? void 0 : ivrAlertData.length) > 0 && /*#__PURE__*/_react["default"].createElement(_IvrInfo.IvrInfo, {
        isCallEnd: isCallEnd,
        ivrAlertData: ivrAlertData,
        agentScriptData: agentScriptData
      }), agentScriptData && /*#__PURE__*/_react["default"].createElement(_ActivityCallLogWrapper.StyledAgentScriptIcon, {
        title: _i18n["default"].getString('engageScript', currentLocale),
        size: "medium",
        variant: "contained",
        color: "neutral.f01",
        symbol: _junoIcon.Transcription,
        onClick: agentScriptData.onClick
      }));
    },
    renderKeypadPanel: function renderKeypadPanel() {
      return !isCallEnd && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_KeypadCollapse.KeypadCollapse, {
        isKeypadOpen: isKeypadOpen,
        currentLocale: currentLocale,
        setKeypadIsOpen: setKeypadIsOpen,
        keypadValue: keypadValue,
        setKeypadValue: setKeypadValue
      }));
    },
    renderCallLogCallControl: function renderCallLogCallControl() {
      var isOnTransfer = Boolean(transferEl);
      return !isCallEnd && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcMenu, {
        classes: {
          paper: _styles["default"].paper
        },
        anchorEl: transferEl,
        open: isOnTransfer,
        onClose: handleTransferClose,
        "data-sign": "transferMenu"
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        onClick: function onClick() {
          return goToTransferCallPage(_enums.transferTypes.internal);
        },
        disabled: !allowTransferCall || disableInternalTransfer,
        "data-sign": "transferItem-internalTransfer"
      }, _i18n["default"].getString('internalTransfer', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        onClick: function onClick() {
          return goToTransferCallPage(_enums.transferTypes.phoneBook);
        },
        disabled: !allowTransferCall,
        "data-sign": "transferItem-phoneBookTransfer"
      }, _i18n["default"].getString('phoneBookTransfer', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        onClick: function onClick() {
          return goToRequeueCallPage();
        },
        disabled: !allowRequeueCall,
        "data-sign": "transferItem-queueTransfer"
      }, _i18n["default"].getString('queueTransfer', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        onClick: function onClick() {
          return goToTransferCallPage(_enums.transferTypes.manualEntry);
        },
        disabled: !allowTransferCall,
        "data-sign": "transferItem-enterANumber"
      }, _i18n["default"].getString('enterANumber', currentLocale))), /*#__PURE__*/_react["default"].createElement(_EvSmallCallControl.EvSmallCallControl, {
        onMute: onMute,
        onUnmute: onUnmute,
        onHangup: onHangup,
        onReject: onReject,
        onHold: onHold,
        onTransfer: onTransfer,
        onUnHold: onUnHold,
        onActive: onActive,
        isOnMute: isOnMute,
        currentLocale: currentLocale,
        isOnTransfer: isOnActive || isOnTransfer,
        isOnHold: isOnHold,
        transferRef: transferRef,
        size: smallCallControlSize,
        isInComingCall: isInComingCall,
        disableTransfer: disableTransfer,
        disableHold: disableHold,
        disableHangup: disableHangup,
        disableMute: disableMute,
        disableActive: disableActive,
        isOnActive: isOnActive,
        showMuteButton: showMuteButton,
        showRecordCall: showRecordCall,
        recordPauseCount: recordPauseCount,
        disableRecordControl: disableRecordControl,
        disablePauseRecord: disablePauseRecord,
        isRecording: isRecording,
        onResumeRecord: onResumeRecord,
        onRecord: onRecord,
        onPauseRecord: onPauseRecord,
        onRestartTimer: onRestartTimer,
        onStopRecord: onStopRecord,
        timeStamp: timeStamp
      }));
    }
  }), isCallEnd && /*#__PURE__*/_react["default"].createElement(_ActivityCallLogWrapper.SubmitButtonWrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "submit",
    size: "large",
    fullWidth: true,
    disabled: disableDispose,
    loading: isLoading,
    onClick: function onClick() {
      return disposeCall();
    }
  }, (0, _utils.getButtonText)(saveStatus, currentLocale))));
};
ActivityCallLogPanel.defaultProps = {
  basicInfo: {}
};
//# sourceMappingURL=ActivityCallLogPanel.js.map
