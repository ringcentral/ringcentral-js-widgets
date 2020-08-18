"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warning = void 0;

var _react = _interopRequireDefault(require("react"));

var _rcui = require("@ringcentral-integration/rcui");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Warning = function Warning(_ref) {
  var children = _ref.children,
      isWide = _ref.isWide;
  return /*#__PURE__*/_react["default"].createElement(_rcui.RcTypography, {
    variant: isWide ? 'body1' : 'caption1' // TODO: Juno UI hasn't add the font color we need, it is wip by designer, so just custom in ev briefly
    // color="secondary"
    ,
    classes: {
      root: _styles["default"].warning
    }
  }, children);
};

exports.Warning = Warning;
Warning.defaultProps = {
  isWide: true
};
//# sourceMappingURL=Warning.js.map
