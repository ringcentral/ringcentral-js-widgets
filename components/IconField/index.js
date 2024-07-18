"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var IconField = function IconField(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].wrapper, props.className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content,
    title: props.title,
    "data-sign": "iconField"
  }, props.children), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].iconHolder
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].icon
  }, props.icon)));
};
IconField.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  title: null
};
var _default = IconField;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
