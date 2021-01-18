"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoreActionComponent = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.is-array");

var _react = _interopRequireDefault(require("react"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MoreActionComponent = function MoreActionComponent(_ref) {
  var actionsList = _ref.actionsList,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      rootButtonProps = _ref.rootButtonProps,
      withSubText = _ref.withSubText,
      anchorEl = _ref.anchorEl,
      handleClick = _ref.handleClick,
      handleClose = _ref.handleClose,
      popoverClasses = _ref.popoverClasses,
      dataSign = _ref.dataSign;

  if (!Array.isArray(actionsList) || actionsList.length === 0) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    title: rootButtonProps.tooltip
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: dataSign,
    icon: rootButtonProps.icon,
    onClick: handleClick,
    className: (0, _classnames3["default"])(rootButtonProps.className, _styles["default"].button, _defineProperty({}, _styles["default"].buttonDisabled, disabled)),
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
      onClick: onClick,
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
