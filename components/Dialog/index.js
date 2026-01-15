"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _CloseIcon = _interopRequireDefault(require("../../assets/images/CloseIcon.svg"));
var _Button = require("../Button");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var FlatButton = function FlatButton(_ref) {
  var className = _ref.className,
    disabled = _ref.disabled,
    onClick = _ref.onClick,
    children = _ref.children,
    dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(className, _styles["default"].flatBtn, _styles["default"].text, disabled && _styles["default"].disabled),
    "data-sign": dataSign,
    onClick: !disabled && onClick
  }, children);
};
FlatButton.propTypes = {
  className: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  children: _propTypes["default"].node,
  dataSign: _propTypes["default"].string
};
FlatButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined,
  dataSign: ''
};
var Dialog = function Dialog(_ref2) {
  var children = _ref2.children,
    title = _ref2.title,
    onConfirm = _ref2.onConfirm,
    onCancel = _ref2.onCancel,
    textConfirm = _ref2.textConfirm,
    textCancel = _ref2.textCancel,
    currentLocale = _ref2.currentLocale,
    className = _ref2.className,
    cancelBtnClassName = _ref2.cancelBtnClassName,
    confirmBtnClassName = _ref2.confirmBtnClassName,
    showTitle = _ref2.showTitle,
    showCloseBtn = _ref2.showCloseBtn,
    headerClassName = _ref2.headerClassName,
    contentClassName = _ref2.contentClassName,
    footerClassName = _ref2.footerClassName;
  var footer = !currentLocale || !onCancel && !onConfirm ? null : /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].footer, footerClassName)
  }, onCancel ? /*#__PURE__*/_react["default"].createElement(FlatButton, {
    className: (0, _clsx["default"])(_styles["default"].btn, _styles["default"].cancelBtn, cancelBtnClassName),
    dataSign: "cancel",
    onClick: onCancel
  }, textCancel || _i18n["default"].getString('cancel', currentLocale)) : null, onConfirm ? /*#__PURE__*/_react["default"].createElement(FlatButton, {
    className: (0, _clsx["default"])(_styles["default"].btn, _styles["default"].confirmBtn, confirmBtnClassName),
    dataSign: "confirm",
    onClick: onConfirm
  }, textConfirm || _i18n["default"].getString('confirm', currentLocale)) : null);
  var headText = "".concat(title) || null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].dialog, className)
  }, showTitle ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].header, headerClassName)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].headerText,
    title: headText
  }, headText)) : null, showCloseBtn ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    dataSign: "closeButton",
    className: _styles["default"].closeBtn,
    onClick: onCancel
  }, /*#__PURE__*/_react["default"].createElement(_CloseIcon["default"], null)) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].content, contentClassName)
  }, children), footer);
};
Dialog.propTypes = {
  className: _propTypes["default"].string,
  cancelBtnClassName: _propTypes["default"].string,
  confirmBtnClassName: _propTypes["default"].string,
  children: _propTypes["default"].node,
  onConfirm: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  title: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string,
  textConfirm: _propTypes["default"].string,
  textCancel: _propTypes["default"].string,
  showCloseBtn: _propTypes["default"].bool,
  showTitle: _propTypes["default"].bool,
  headerClassName: _propTypes["default"].string,
  contentClassName: _propTypes["default"].string,
  footerClassName: _propTypes["default"].string
};
Dialog.defaultProps = {
  currentLocale: '',
  className: '',
  cancelBtnClassName: '',
  confirmBtnClassName: '',
  children: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  title: '',
  textConfirm: '',
  textCancel: '',
  showCloseBtn: true,
  showTitle: true,
  headerClassName: undefined,
  contentClassName: undefined,
  footerClassName: undefined
};
var _default = exports["default"] = Dialog;
//# sourceMappingURL=index.js.map
