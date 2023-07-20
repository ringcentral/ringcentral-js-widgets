"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallMonitorBar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("@ringcentral-integration/utils");
var _Button = require("../Button");
var _CarrouselBar = _interopRequireDefault(require("../CarrouselBar"));
var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));
var _CallInfoBar = require("./CallInfoBar");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var CallMonitorBar = function CallMonitorBar(props) {
  var _props$ringingCalls = props.ringingCalls,
    ringingCalls = _props$ringingCalls === void 0 ? _utils.emptyArray : _props$ringingCalls,
    _props$currentCalls = props.currentCalls,
    currentCalls = _props$currentCalls === void 0 ? _utils.emptyArray : _props$currentCalls,
    _props$onHoldCalls = props.onHoldCalls,
    onHoldCalls = _props$onHoldCalls === void 0 ? _utils.emptyArray : _props$onHoldCalls,
    _props$otherDeviceCal = props.otherDeviceCalls,
    otherDeviceCalls = _props$otherDeviceCal === void 0 ? _utils.emptyArray : _props$otherDeviceCal,
    onCurrentCallBtnClick = props.onCurrentCallBtnClick,
    onViewCallBtnClick = props.onViewCallBtnClick,
    _props$shouldDisplayC = props.shouldDisplayCurrentCallBtn,
    shouldDisplayCurrentCallBtn = _props$shouldDisplayC === void 0 ? false : _props$shouldDisplayC,
    _props$shouldDisplayV = props.shouldDisplayViewCallsBtn,
    shouldDisplayViewCallsBtn = _props$shouldDisplayV === void 0 ? false : _props$shouldDisplayV,
    _props$shouldHideRing = props.shouldHideRingingCallStatus,
    shouldHideRingingCallStatus = _props$shouldHideRing === void 0 ? false : _props$shouldHideRing,
    _props$clickHeaderTra = props.clickHeaderTrack,
    clickHeaderTrack = _props$clickHeaderTra === void 0 ? _utils.emptyFn : _props$clickHeaderTra,
    _props$useV = props.useV2,
    useV2 = _props$useV === void 0 ? false : _props$useV,
    currentLocale = props.currentLocale;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    hoverBar = _useState2[0],
    setHoverBar = _useState2[1];
  var showBtn = function showBtn() {
    if (currentCalls.length > 0) {
      setHoverBar(true);
    }
  };
  var hideBtn = function hideBtn() {
    setHoverBar(false);
  };
  var numberOfIncomingCalls = ringingCalls.length;
  var numberOfOnHoldCalls = onHoldCalls.length;
  var numberOfOtherDeviceCalls = otherDeviceCalls.length;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].bar,
    onMouseOver: showBtn,
    onMouseLeave: hideBtn,
    onClick: clickHeaderTrack
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].box
  }, /*#__PURE__*/_react["default"].createElement(_CarrouselBar["default"], {
    hoverBar: hoverBar
  }, numberOfOnHoldCalls > 0 ? /*#__PURE__*/_react["default"].createElement(_CallInfoBar.CallInfoBar, {
    label: numberOfOnHoldCalls === 1 ? (0, _utils.format)(_i18n["default"].getString('callOnHold', currentLocale), {
      numberOf: numberOfOnHoldCalls
    }) : (0, _utils.format)(_i18n["default"].getString('callsOnHold', currentLocale), {
      numberOf: numberOfOnHoldCalls
    }),
    currentLocale: currentLocale,
    onClick: onViewCallBtnClick,
    shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn,
    useV2: useV2,
    dataSign: "CallOnHold"
  }) : null, !shouldHideRingingCallStatus && numberOfIncomingCalls > 0 ? /*#__PURE__*/_react["default"].createElement(_CallInfoBar.CallInfoBar, {
    label: numberOfIncomingCalls === 1 ? (0, _utils.format)(_i18n["default"].getString('incomingCall', currentLocale), {
      numberOf: numberOfIncomingCalls
    }) : (0, _utils.format)(_i18n["default"].getString('incomingCalls', currentLocale), {
      numberOf: numberOfIncomingCalls
    }),
    currentLocale: currentLocale,
    onClick: onViewCallBtnClick,
    shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn,
    useV2: useV2,
    dataSign: "IncomingCalls"
  }) : null, numberOfOtherDeviceCalls > 0 ? /*#__PURE__*/_react["default"].createElement(_CallInfoBar.CallInfoBar, {
    label: numberOfOtherDeviceCalls === 1 ? (0, _utils.format)(_i18n["default"].getString('otherDeviceCall', currentLocale), {
      numberOf: numberOfOtherDeviceCalls
    }) : (0, _utils.format)(_i18n["default"].getString('otherDeviceCalls', currentLocale), {
      numberOf: numberOfOtherDeviceCalls
    }),
    currentLocale: currentLocale,
    onClick: onViewCallBtnClick,
    shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn,
    useV2: useV2,
    dataSign: "otherDeviceCalls"
  }) : null, currentCalls.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: useV2 ? _styles["default"].callInfoBarV2 : _styles["default"].bar
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "callDuration",
    className: _styles["default"].duration,
    onClick: onCurrentCallBtnClick
  }, /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
    startTime: currentCalls[0].startTime
  })), shouldDisplayCurrentCallBtn && onCurrentCallBtnClick ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    "data-sign": "currentCallButton",
    dataSign: "currentCallButton",
    className: _styles["default"].currentCallBtn,
    onClick: onCurrentCallBtnClick
  }, _i18n["default"].getString('currentCall', currentLocale)) : null) : null)));
};
exports.CallMonitorBar = CallMonitorBar;
//# sourceMappingURL=CallMonitorBar.js.map
