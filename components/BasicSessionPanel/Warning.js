"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warning = void 0;

var _react = _interopRequireDefault(require("react"));

var _Typography = require("@ringcentral/juno/es6/components/Typography/Typography.js");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Warning = function Warning(_ref) {
  var children = _ref.children,
      isWide = _ref.isWide;
  return /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
    variant: isWide ? 'body1' : 'caption1',
    color: "highlight.f02",
    className: _styles["default"].warning
  }, children);
};

exports.Warning = Warning;
Warning.defaultProps = {
  isWide: true
};
//# sourceMappingURL=Warning.js.map
