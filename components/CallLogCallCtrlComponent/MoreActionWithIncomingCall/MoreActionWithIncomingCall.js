"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoreActionWithIncomingCall = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _MoreIcon = _interopRequireDefault(require("../../../assets/images/MoreIcon.svg"));
var _CircleButton = require("../../CircleButton");
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _StyledMoreAction = require("./StyledMoreAction");
var _styles2 = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MoreActionWithIncomingCall = function MoreActionWithIncomingCall(props) {
  var _clsx;
  var disabled = props.disabled,
    currentLocale = props.currentLocale,
    forwardingNumbers = props.forwardingNumbers,
    forward = props.forward,
    ignore = props.ignore,
    reply = props.reply,
    clickForwardTrack = props.clickForwardTrack,
    enableReply = props.enableReply,
    _props$isWebRTCNotifi = props.isWebRTCNotification,
    isWebRTCNotification = _props$isWebRTCNotifi === void 0 ? false : _props$isWebRTCNotifi,
    disableIgnore = props.disableIgnore;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    forwardListEl = _useState4[0],
    setForwardListEl = _useState4[1];
  var handleClick = function handleClick(event) {
    // @ts-expect-error TS(2345): Argument of type 'EventTarget & HTMLButtonElement'... Remove this comment to see the full error message
    setAnchorEl(event.currentTarget);
  };
  var handleClose = function handleClose() {
    setAnchorEl(null);
  };
  var handleForwardListClick = function handleForwardListClick(event) {
    var _event$currentTarget$;
    clickForwardTrack();
    // @ts-expect-error TS(2345): Argument of type 'Element' is not assignable to pa... Remove this comment to see the full error message
    setForwardListEl((_event$currentTarget$ = event.currentTarget.children) === null || _event$currentTarget$ === void 0 ? void 0 : _event$currentTarget$[0]);
  };
  var handleForwardListClose = function handleForwardListClose() {
    setForwardListEl(null);
  };
  var onForward = function onForward(event) {
    // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
    var selectedValue = event.currentTarget.attributes['data-value'].value;
    if (selectedValue === 'custom') {
      setForwardListEl(null);
      setAnchorEl(null);
    }
    forward(selectedValue);
  };
  var title = _i18n["default"].getString('more', currentLocale);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
    title: title,
    dataSign: "more",
    icon: _MoreIcon["default"],
    onClick: handleClick,
    className: (0, _clsx2["default"])(isWebRTCNotification ? _styles2["default"].webRTCNotificationButton : _styles2["default"].button, (_clsx = {}, _defineProperty(_clsx, _styles2["default"].buttonDisabled, disabled), _defineProperty(_clsx, _styles["default"].rootButtonActive, !!anchorEl), _clsx))
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
    open: !!anchorEl,
    onClose: handleClose,
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    }
  }, /*#__PURE__*/_react["default"].createElement(_StyledMoreAction.StyledMenuList, {
    "data-sign": "moreList"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem
  // @ts-expect-error TS(2322): Type '(event: React.MouseEvent<HTMLButtonElement>)... Remove this comment to see the full error message
  , {
    onClick: handleForwardListClick,
    "data-sign": "forward"
  }, /*#__PURE__*/_react["default"].createElement(_StyledMoreAction.StyledActionIcon, {
    symbol: _junoIcon.Forwardcall,
    color: "neutral.l04",
    size: "xsmall"
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.f06",
    variant: "body1"
  }, _i18n["default"].getString('forward', currentLocale)), /*#__PURE__*/_react["default"].createElement(_StyledMoreAction.StyledArrowIcon, {
    color: "neutral.l04",
    size: "medium",
    symbol: _junoIcon.ArrowRight,
    variant: "plain"
  })), enableReply && /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    onClick: function onClick() {
      handleClose();
      reply === null || reply === void 0 ? void 0 : reply();
    },
    "data-sign": "reply"
  }, /*#__PURE__*/_react["default"].createElement(_StyledMoreAction.StyledReplyIcon, {
    symbol: _junoIcon.Forwarding,
    color: "neutral.l04",
    size: "xsmall"
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.f06",
    variant: "body1"
  }, _i18n["default"].getString('reply', currentLocale)), /*#__PURE__*/_react["default"].createElement(_StyledMoreAction.StyledArrowIcon, {
    color: "neutral.l04",
    size: "medium",
    symbol: _junoIcon.ArrowRight,
    variant: "plain"
  })), ignore && /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    disabled: disableIgnore,
    onClick: ignore,
    "data-sign": "ignore"
  }, /*#__PURE__*/_react["default"].createElement(_StyledMoreAction.StyledActionIcon, {
    symbol: _junoIcon.Ignore,
    color: "neutral.l04",
    size: "xsmall"
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.f06",
    variant: "body1"
  }, _i18n["default"].getString('ignore', currentLocale))))), /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
    open: !!forwardListEl,
    onClose: handleForwardListClose,
    anchorEl: forwardListEl,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    }
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, {
    classes: {
      root: _styles2["default"].forwardMenuList
    }
  }, [].concat(_toConsumableArray(forwardingNumbers), [{
    phoneNumber: 'custom',
    label: _i18n["default"].getString('custom', currentLocale)
  }]).map(function (item) {
    var isCustomOption = item.phoneNumber === 'custom';
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem
    // @ts-expect-error TS(2322): Type '(event: React.MouseEvent<HTMLButtonElement>)... Remove this comment to see the full error message
    , {
      onClick: onForward,
      key: item.phoneNumber,
      "data-value": item.phoneNumber,
      "data-sign": item.phoneNumber
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles2["default"].forwardNumberItem
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles2["default"].actionText
    }, item.label), isCustomOption ? /*#__PURE__*/_react["default"].createElement(_StyledMoreAction.StyledArrowIcon, {
      color: "neutral.l04",
      size: "medium",
      symbol: _junoIcon.ArrowRight,
      variant: "plain"
    }) : /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles2["default"].subText
    }, item.phoneNumber)));
  }))));
};
exports.MoreActionWithIncomingCall = MoreActionWithIncomingCall;
//# sourceMappingURL=MoreActionWithIncomingCall.js.map
