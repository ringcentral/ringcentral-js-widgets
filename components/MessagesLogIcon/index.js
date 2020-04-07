"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MessagesLogIcon;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _MessagesLog = _interopRequireDefault(require("../../assets/images/MessagesLog.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MessagesLogIcon(_ref) {
  var disabled = _ref.disabled,
      _onClick = _ref.onClick,
      currentLocale = _ref.currentLocale;

  var tooltip = _i18n["default"].getString('log', currentLocale);

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].messageLog, disabled && _styles["default"].disabledMessageLog),
    onClick: function onClick(e) {
      e.stopPropagation();
      if (!disabled) _onClick();
    },
    "data-sign": "smsLog",
    title: tooltip
  }, _react["default"].createElement(_MessagesLog["default"], {
    className: _styles["default"].logIcon
  }));
}

MessagesLogIcon.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  disabled: _propTypes["default"].bool,
  onClick: _propTypes["default"].func
};
MessagesLogIcon.defaultProps = {
  disabled: false,
  onClick: function onClick() {}
};
//# sourceMappingURL=index.js.map
