"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _MessagesLog = _interopRequireDefault(require("../../assets/images/MessagesLog.svg"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MessagesLogIcon = function MessagesLogIcon(_ref) {
  var disabled = _ref.disabled,
    _onClick = _ref.onClick,
    currentLocale = _ref.currentLocale;
  var tooltip = _i18n["default"].getString('log', currentLocale);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].messageLog, disabled && _styles["default"].disabledMessageLog),
    onClick: function onClick(e) {
      e.stopPropagation();
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
