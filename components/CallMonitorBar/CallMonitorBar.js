"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallMonitorBar = void 0;
var _utils = require("@ringcentral-integration/utils");
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _CarrouselBar = _interopRequireDefault(require("../CarrouselBar"));
var _DurationCounter = require("../DurationCounter");
var _CallInfoBar = require("./CallInfoBar");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
  }, /*#__PURE__*/_react["default"].createElement(_DurationCounter.DurationCounter, {
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
