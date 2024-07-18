"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SaveButton = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _Button = require("../Button");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SaveButton = function SaveButton(_ref) {
  var className = _ref.className,
    currentLocale = _ref.currentLocale,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    dataSign: "saveButton",
    className: (0, _clsx["default"])(_styles["default"].root, disabled ? _styles["default"].disabled : null, className),
    onClick: onClick,
    disabled: disabled
  }, _i18n["default"].getString('save', currentLocale));
};
exports.SaveButton = SaveButton;
var _default = SaveButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
