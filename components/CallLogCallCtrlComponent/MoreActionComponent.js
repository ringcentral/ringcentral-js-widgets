"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoreActionComponent = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames3 = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MoreActionComponent = function MoreActionComponent(_ref) {
  var _classnames;
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
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    title: rootButtonProps.tooltip
  }, !useJunoIcon ? /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: dataSign,
    icon: rootButtonProps.icon,
    onClick: handleClick,
    className: (0, _classnames3["default"])(rootButtonProps.className, _styles["default"].button, (_classnames = {}, _defineProperty(_classnames, _styles["default"].buttonDisabled, disabled), _defineProperty(_classnames, _styles["default"].rootButtonActive, !!anchorEl), _classnames)),
    disabled: false
  }) : /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": dataSign,
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
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: key,
      onClick: onClick
      // @ts-expect-error TS(2322): Type '{ children: Element; key: string; onClick: (... Remove this comment to see the full error message
      ,
      maxWidth: 170,
      "data-value": key,
      disabled: disabled
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames3["default"])(_styles["default"].moreActionItem, _defineProperty({}, _styles["default"].withSubText, withSubText)),
      "data-sign": key
    }, icon && /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      size: "small",
      symbol: icon,
      className: iconClassName
    }), text && /*#__PURE__*/_react["default"].createElement("span", {
      title: text,
      className: _styles["default"].actionText
    }, text), withSubText && subText && /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].subText
    }, subText, " ")));
  })))));
};
exports.MoreActionComponent = MoreActionComponent;
//# sourceMappingURL=MoreActionComponent.js.map
