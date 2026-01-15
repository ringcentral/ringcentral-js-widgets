"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BackButton = function BackButton(_ref) {
  var label = _ref.label,
    showIcon = _ref.showIcon;
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].backButton
  }, showIcon ? /*#__PURE__*/_react["default"].createElement("i", {
    "data-sign": "backButton",
    className: (0, _clsx["default"])(_DynamicsFont["default"].arrow, _styles["default"].backIcon)
  }) : null, label ? /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "backButtonLabel",
    className: _styles["default"].backLabel
  }, label) : null);
};
BackButton.defaultProps = {
  label: undefined,
  showIcon: true
};
var _default = exports["default"] = BackButton;
//# sourceMappingURL=index.js.map
