"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoreActionWithIncomingCall = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _MoreIcon = _interopRequireDefault(require("../../../assets/images/MoreIcon.svg"));
var _CircleButton = _interopRequireDefault(require("../../CircleButton"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _styles2 = _interopRequireDefault(require("./styles.scss"));
var _StyledMoreAction = require("./StyledMoreAction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var MoreActionWithIncomingCall = function MoreActionWithIncomingCall(props) {
  var _classnames;
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
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString('more', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: "more",
    icon: _MoreIcon["default"],
    onClick: handleClick,
    className: (0, _classnames2["default"])(isWebRTCNotification ? _styles2["default"].webRTCNotificationButton : _styles2["default"].button, (_classnames = {}, _defineProperty(_classnames, _styles2["default"].buttonDisabled, disabled), _defineProperty(_classnames, _styles["default"].rootButtonActive, !!anchorEl), _classnames))
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
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
