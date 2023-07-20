"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var IconField = function IconField(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].wrapper, props.className)
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
