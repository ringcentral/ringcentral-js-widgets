"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ActionButton = function ActionButton(_ref) {
  var icon = _ref.icon,
    label = _ref.label,
    disabled = _ref.disabled,
    action = _ref.action,
    dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    symbol: icon,
    color: "interactive.f01",
    size: "medium",
    variant: "plain",
    title: label,
    onClick: action,
    disabled: disabled,
    "data-sign": dataSign
  });
};
exports.ActionButton = ActionButton;
//# sourceMappingURL=ActionButton.js.map
