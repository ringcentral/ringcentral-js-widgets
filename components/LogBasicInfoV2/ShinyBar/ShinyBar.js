"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShinyBar = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _ShinyBar = _interopRequireDefault(require("./ShinyBar.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ShinyBar = function ShinyBar(_ref) {
  var isRinging = _ref.isRinging,
    className = _ref.className,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? 'callEnd' : _ref$status;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_ShinyBar["default"].shinyBar, _ShinyBar["default"][status], isRinging && _ShinyBar["default"].ringing, className),
    "data-sign": "shinyBar-".concat(status)
  }, /*#__PURE__*/_react["default"].createElement("div", null));
};
exports.ShinyBar = ShinyBar;
ShinyBar.defaultProps = {
  isRinging: false
};
//# sourceMappingURL=ShinyBar.js.map
