"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitButtonHeight = exports.KeyPadHeight = exports.BasicCallInfo = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _AnimationPanel = require("../AnimationPanel");
var _ShinyBar = require("../LogBasicInfoV2/ShinyBar");
var _BasicCallInfoMain = require("./BasicCallInfoMain");
var _CallInfoList = require("./CallInfoList");
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
var KeyPadHeight = 32;
exports.KeyPadHeight = KeyPadHeight;
var SubmitButtonHeight = 60;
exports.SubmitButtonHeight = SubmitButtonHeight;
var BasicCallInfo = function BasicCallInfo(_ref) {
  var subject = _ref.subject,
    isInbound = _ref.isInbound,
    isRinging = _ref.isRinging,
    followInfos = _ref.followInfos,
    callInfos = _ref.callInfos,
    panelClass = _ref.classes.panel,
    status = _ref.status,
    callControlRef = _ref.callControlRef,
    onCopySuccess = _ref.onCopySuccess,
    currentLocale = _ref.currentLocale;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0, _react.useState)('100%'),
    _useState4 = _slicedToArray(_useState3, 2),
    panelHeight = _useState4[0],
    setPanelHeight = _useState4[1];
  var toggleOpen = function toggleOpen() {
    return setOpen(!open);
  };
  (0, _react.useEffect)(function () {
    if (callControlRef === null || callControlRef === void 0 ? void 0 : callControlRef.current) {
      setPanelHeight("calc(100% - ".concat((0, _juno.px)(callControlRef.current.clientHeight + KeyPadHeight), ")"));
    }
    if (status === 'callEnd') {
      setPanelHeight("calc(100% - ".concat((0, _juno.px)(SubmitButtonHeight), ")"));
    }
  }, [status, callControlRef]);

  // when ringing state change, close that info view
  (0, _react.useEffect)(function () {
    if (open && !isRinging) {
      toggleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRinging]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "basicCallInfo",
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement(_BasicCallInfoMain.BasicCallInfoMain, {
    subject: subject,
    isInbound: isInbound,
    followInfos: followInfos
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].rightIcon
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "round",
    size: "small",
    color: "neutral.b04",
    symbol: _junoIcon.ChevronRight,
    "data-sign": "detailButton",
    onClick: toggleOpen
  }))), /*#__PURE__*/_react["default"].createElement(_ShinyBar.ShinyBar, {
    isRinging: isRinging,
    className: _styles["default"].bottom,
    status: status
  })), /*#__PURE__*/_react["default"].createElement(_AnimationPanel.AnimationPanel, {
    open: open,
    className: (0, _classnames["default"])(_styles["default"].panelContainer, panelClass),
    style: {
      height: panelHeight
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].panel
  }, /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "round",
    size: "small",
    color: "neutral.f04",
    symbol: _junoIcon.ChevronLeft,
    "data-sign": "backButton",
    onClick: toggleOpen
  })), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_BasicCallInfoMain.BasicCallInfoMain, {
    subject: subject,
    isInbound: isInbound,
    followInfos: followInfos
    // @ts-expect-error TS(2322): Type 'string | false' is not assignable to type 's... Remove this comment to see the full error message
    ,
    className: open && _styles["default"].infoMain
  }), /*#__PURE__*/_react["default"].createElement(_CallInfoList.CallInfoList, {
    callInfos: callInfos,
    className: _styles["default"].infoList,
    onCopySuccess: onCopySuccess,
    currentLocale: currentLocale
  })))));
};
exports.BasicCallInfo = BasicCallInfo;
BasicCallInfo.defaultProps = {
  classes: {}
};
//# sourceMappingURL=BasicCallInfo.js.map
