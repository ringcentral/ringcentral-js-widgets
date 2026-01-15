"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warning = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Warning = exports.Warning = function Warning(_ref) {
  var children = _ref.children,
    isWide = _ref.isWide;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: isWide ? 'body1' : 'caption1',
    color: "highlight.f02",
    className: _styles["default"].warning
  }, children);
};
Warning.defaultProps = {
  isWide: true
};
//# sourceMappingURL=Warning.js.map
