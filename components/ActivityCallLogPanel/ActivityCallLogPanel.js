"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCallLogPanel = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _rcui = require("@ringcentral-integration/rcui");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _BasicCallInfo = require("ringcentral-widgets/components/BasicCallInfo");

var _CallLogPanel = _interopRequireDefault(require("ringcentral-widgets/components/CallLogPanel"));

var _enums = require("../../enums");

var _EvSmallCallControl = require("../EvSmallCallControl");

var _i18n = _interopRequireDefault(require("./i18n"));

var _IvrInfo = require("./IvrInfo");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
      onCopySuccess = _ref.onCopySuccess,
      rest = _objectWithoutProperties(_ref, ["currentLocale", "currentLog", "basicInfo", "isInbound", "disposeCall", "status", "saveStatus", "goToRequeueCallPage", "goToTransferCallPage", "onMute", "onUnmute", "onHangup", "onReject", "onHold", "onUnHold", "isOnMute", "isOnHold", "smallCallControlSize", "isInComingCall", "currentCallControlPermission", "disableDispose", "disableTransfer", "disableInternalTransfer", "disableHold", "disableHangup", "disableMute", "disableActive", "isOnActive", "onActive", "isWide", "showMuteButton", "ivrAlertData", "onCopySuccess"]);

  var transferRef = (0, _react.useRef)(null);

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
  return /*#__PURE__*/_react["default"].createElement(_CallLogPanel["default"], _extends({}, rest, {
    currentLog: currentLog,
    currentLocale: currentLocale,
    classes: {
      root: _styles["default"].root,
      callLogCallControl: (0, _classnames["default"])(_styles["default"].callLogCallControl, isCallEnd ? _styles["default"].noneShadow : _styles["default"].smallCallControlRoot)
    },
    refs: {
      callLogCallControl: callControlRef
    },
    isWide: isWide,
    header: false,
    showSpinner: false,
    isInTransferPage: false // TODO: that need refactor CallLogPanel and then can remove that
    ,
    currentIdentify: "123",
    renderEditLogSection: _utils.EditLogSection,
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
        ivrAlertData: ivrAlertData
      }));
    },
    renderCallLogCallControl: function renderCallLogCallControl() {
      var isOnTransfer = Boolean(transferEl);
      return isCallEnd ? /*#__PURE__*/_react["default"].createElement(_rcui.RcButton, {
        "data-sign": "submit",
        size: "large",
        fullWidth: true,
        disabled: disableDispose,
        loading: isLoading,
        onClick: function onClick() {
          return disposeCall();
        }
      }, (0, _utils.getButtonText)(saveStatus, currentLocale)) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_rcui.RcMenu, {
        classes: {
          paper: _styles["default"].paper
        },
        anchorEl: transferEl,
        open: isOnTransfer,
        onClose: handleTransferClose,
        "data-sign": "transferMenu"
      }, /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
        onClick: function onClick() {
          return goToTransferCallPage(_enums.transferTypes.internal);
        },
        disabled: !allowTransferCall || disableInternalTransfer,
        "data-sign": "transferItem-internalTransfer"
      }, _i18n["default"].getString('internalTransfer', currentLocale)), /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
        onClick: function onClick() {
          return goToTransferCallPage(_enums.transferTypes.phoneBook);
        },
        disabled: !allowTransferCall,
        "data-sign": "transferItem-phoneBookTransfer"
      }, _i18n["default"].getString('phoneBookTransfer', currentLocale)), /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
        onClick: function onClick() {
          return goToRequeueCallPage();
        },
        disabled: !allowRequeueCall,
        "data-sign": "transferItem-queueTransfer"
      }, _i18n["default"].getString('queueTransfer', currentLocale)), /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
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
        showMuteButton: showMuteButton
      }));
    }
  }));
};

exports.ActivityCallLogPanel = ActivityCallLogPanel;
ActivityCallLogPanel.defaultProps = {
  basicInfo: {}
};
//# sourceMappingURL=ActivityCallLogPanel.js.map
