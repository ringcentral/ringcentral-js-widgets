"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _MessagesLog = _interopRequireDefault(require("../../assets/images/MessagesLog.svg"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MessagesLogIcon = function MessagesLogIcon(_ref) {
  var disabled = _ref.disabled,
      _onClick = _ref.onClick,
      currentLocale = _ref.currentLocale;

  var tooltip = _i18n["default"].getString('log', currentLocale);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].messageLog, disabled && _styles["default"].disabledMessageLog),
    onClick: function onClick(e) {
      e.stopPropagation();
      if (!disabled) _onClick();
    },
    "data-sign": "smsLog",
    title: tooltip
  }, /*#__PURE__*/_react["default"].createElement(_MessagesLog["default"], {
    className: _styles["default"].logIcon
  }));
};

MessagesLogIcon.defaultProps = {
  disabled: false,
  onClick: function onClick() {}
};
var _default = MessagesLogIcon;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
