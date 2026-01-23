"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputField = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var InputField = exports.InputField = function InputField(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": props.dataSign,
    className: (0, _clsx["default"])(_styles["default"].root, props.className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].label
  }, props.label, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].hint
  }, props.labelHint)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].inputHolder
  }, props.children));
};
//# sourceMappingURL=InputField.js.map
