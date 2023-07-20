"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var BackButton = function BackButton(_ref) {
  var label = _ref.label,
    showIcon = _ref.showIcon;
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].backButton
  }, showIcon ? /*#__PURE__*/_react["default"].createElement("i", {
    "data-sign": "backButton",
    className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].backIcon)
  }) : null, label ? /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "backButtonLabel",
    className: _styles["default"].backLabel
  }, label) : null);
};
BackButton.defaultProps = {
  label: undefined,
  showIcon: true
};
var _default = BackButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
