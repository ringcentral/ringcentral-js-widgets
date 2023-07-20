"use strict";

require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomArrowButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var CustomArrowButton = function CustomArrowButton(_ref) {
  var rest = Object.assign({}, _ref);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, _extends({
    "data-sign": "arrow_icon",
    color: "neutral.f03",
    variant: "plain"
  }, rest));
};
exports.CustomArrowButton = CustomArrowButton;
CustomArrowButton.defaultProps = {
  onClick: function onClick() {},
  symbol: _junoIcon.ArrowRight1,
  size: 'large'
};
//# sourceMappingURL=CustomArrowButton.js.map
