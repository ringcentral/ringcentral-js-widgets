"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Section = Section;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function Section(_ref) {
  var label = _ref.label,
    children = _ref.children,
    dataSign = _ref.dataSign,
    _ref$show = _ref.show,
    show = _ref$show === void 0 ? true : _ref$show;
  if (!show) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].section,
    "data-sign": dataSign
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    className: _styles["default"].sectionTitle,
    variant: "body1",
    color: "action.grayLight"
  }, label), /*#__PURE__*/_react["default"].createElement(_juno.RcCard, null, /*#__PURE__*/_react["default"].createElement(_juno.RcCardContent, {
    className: _styles["default"].sectionContent
  }, children)));
}
//# sourceMappingURL=AudioSection.js.map
