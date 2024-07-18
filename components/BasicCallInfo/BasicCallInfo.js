"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitButtonHeight = exports.KeyPadHeight = exports.BasicCallInfo = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _AnimationPanel = require("../AnimationPanel");
var _ShinyBar = require("../LogBasicInfoV2/ShinyBar");
var _BasicCallInfoMain = require("./BasicCallInfoMain");
var _CallInfoList = require("./CallInfoList");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
    className: (0, _clsx["default"])(_styles["default"].panelContainer, panelClass),
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
