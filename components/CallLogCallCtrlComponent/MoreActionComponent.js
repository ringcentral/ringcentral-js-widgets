"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledMenuItem = exports.MoreActionComponent = void 0;
var _juno = require("@ringcentral/juno");
var _clsx3 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _CircleButton = require("../CircleButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-width: 170px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledMenuItem = (0, _juno.styled)(_juno.RcMenuItem)(_templateObject());
exports.StyledMenuItem = StyledMenuItem;
var MoreActionComponent = function MoreActionComponent(_ref) {
  var _clsx;
  var actionsList = _ref.actionsList,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    rootButtonProps = _ref.rootButtonProps,
    withSubText = _ref.withSubText,
    anchorEl = _ref.anchorEl,
    handleClick = _ref.handleClick,
    handleClose = _ref.handleClose,
    popoverClasses = _ref.popoverClasses,
    dataSign = _ref.dataSign,
    _ref$useJunoIcon = _ref.useJunoIcon,
    useJunoIcon = _ref$useJunoIcon === void 0 ? false : _ref$useJunoIcon;
  if (!Array.isArray(actionsList) || actionsList.length === 0) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
  }
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !useJunoIcon ? /*#__PURE__*/_react["default"].createElement(_CircleButton.CircleButtonWithTitle, {
    title: rootButtonProps.tooltip,
    dataSign: dataSign,
    icon: rootButtonProps.icon,
    onClick: handleClick,
    className: (0, _clsx3["default"])(rootButtonProps.className, _styles["default"].button, (_clsx = {}, _defineProperty(_clsx, _styles["default"].buttonDisabled, disabled), _defineProperty(_clsx, _styles["default"].rootButtonActive, !!anchorEl), _clsx)),
    disabled: false
  }) : /*#__PURE__*/_react["default"].createElement("span", {
    title: rootButtonProps.tooltip
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": dataSign,
    title: rootButtonProps.tooltip,
    useRcTooltip: false,
    symbol: rootButtonProps.junoIcon,
    color: "action.primary",
    variant: anchorEl ? 'inverse' : undefined,
    onClick: handleClick,
    disabled: false
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    anchorEl: anchorEl,
    open: Boolean(anchorEl),
    onClose: function onClose() {
      return handleClose();
    },
    classes: popoverClasses
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "".concat(dataSign, "List")
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, null, actionsList.map(function (_ref2) {
    var icon = _ref2.icon,
      text = _ref2.text,
      subText = _ref2.subText,
      onClick = _ref2.onClick,
      disabled = _ref2.disabled,
      iconClassName = _ref2.iconClassName,
      key = _ref2.key;
    return /*#__PURE__*/_react["default"].createElement(StyledMenuItem, {
      key: key,
      onClick: onClick,
      "data-value": key,
      disabled: disabled,
      title: text
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx3["default"])(_styles["default"].moreActionItem, _defineProperty({}, _styles["default"].withSubText, withSubText)),
      "data-sign": key
    }, icon && /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      size: "small",
      symbol: icon,
      className: iconClassName
    }), text && /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].actionText
    }, text), withSubText && subText && /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].subText
    }, subText, " ")));
  })))));
};
exports.MoreActionComponent = MoreActionComponent;
//# sourceMappingURL=MoreActionComponent.js.map
