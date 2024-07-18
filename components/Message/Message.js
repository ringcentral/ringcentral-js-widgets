"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Message = function Message(_ref) {
  var message = _ref.message,
    level = _ref.level,
    onDismiss = _ref.onDismiss;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].alertHolder
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "alert",
    className: (0, _clsx["default"])(_styles["default"][level])
  }, message, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].dismiss,
    onClick: onDismiss,
    "data-sign": "dismiss"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: _DynamicsFont["default"].close
  }))));
};
var _default = Message;
exports["default"] = _default;
//# sourceMappingURL=Message.js.map
