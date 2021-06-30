"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCallLogPanel = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _BasicCallInfo = require("@ringcentral-integration/widgets/components/BasicCallInfo");

var _CallLogPanel = _interopRequireDefault(require("@ringcentral-integration/widgets/components/CallLogPanel"));

var _enums = require("../../enums");

var _EvSmallCallControl = require("../EvSmallCallControl");

var _i18n = _interopRequireDefault(require("./i18n"));

var _IvrInfo = require("./IvrInfo");

var _KeypadCollapse = require("./KeypadCollapse");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ActivityCallLogPanel = function ActivityCallLogPanel(_ref) {
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
      rest = _objectWithoutProperties(_ref, ["currentLocale", "currentLog", "basicInfo", "isInbound", "disposeCall", "status", "saveStatus", "goToRequeueCallPage", "goToTransferCallPage", "onMute", "onUnmute", "onHangup", "onReject", "onHold", "onUnHold", "isOnMute", "isOnHold", "smallCallControlSize", "isInComingCall", "currentCallControlPermission", "disableDispose", "disableTransfer", "disableInternalTransfer", "disableHold", "disableHangup", "disableMute", "disableActive", "isOnActive", "onActive", "isWide", "showMuteButton", "ivrAlertData", "agentScriptData", "onCopySuccess", "scrollTo", "referenceFieldOptions", "showRecordCall", "recordPauseCount", "disableRecordControl", "isRecording", "onResumeRecord", "timeStamp", "onRecord", "onPauseRecord", "onRestartTimer", "onStopRecord", "disablePauseRecord", "isKeypadOpen", "keypadValue", "setKeypadIsOpen", "setKeypadValue"]);

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
      callLogCallControl: (0, _classnames["default"])(_styles["default"].callLogCallControl, isCallEnd ? _styles["default"].noneShadow : _styles["default"].smallCallControlRoot)
    },
    refs: {
      root: rootRef,
      callLogCallControl: callControlRef
    },
    isWide: isWide,
    header: false,
    showSpinner: false,
    isInTransferPage: false // TODO: that need refactor CallLogPanel and then can remove that
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
      }), agentScriptData && /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
        className: _styles["default"].agentScriptIcon,
        title: _i18n["default"].getString('engageScript', currentLocale),
        size: "medium",
        variant: "contained",
        color: "neutral.f01",
        symbol: _icon.Transcription,
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
  }), isCallEnd && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].submitButton)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
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

exports.ActivityCallLogPanel = ActivityCallLogPanel;
ActivityCallLogPanel.defaultProps = {
  basicInfo: {}
};
//# sourceMappingURL=ActivityCallLogPanel.js.map
