"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Button = require("../Button");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SaveButton = function SaveButton(_ref) {
  var className = _ref.className,
    currentLocale = _ref.currentLocale,
    disabled = _ref.disabled,
    onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    dataSign: "saveButton",
    className: (0, _classnames["default"])(_styles["default"].root, disabled ? _styles["default"].disabled : null, className),
    onClick: onClick,
    disabled: disabled
  }, _i18n["default"].getString('save', currentLocale));
};
SaveButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined
};
var _default = SaveButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
