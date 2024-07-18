"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModalText = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var getModalText = function getModalText(_ref) {
  var isInbound = _ref.isInbound,
    inboundTextProps = _ref.inboundTextProps,
    outboundText = _ref.outboundText;
  if (isInbound) {
    var incomingText = inboundTextProps.incomingText,
      queueNameText = inboundTextProps.queueNameText;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", {
      className: (0, _clsx["default"])(_styles["default"].text, _styles["default"].incomingText),
      title: incomingText
    }, incomingText), /*#__PURE__*/_react["default"].createElement("p", {
      className: _styles["default"].text,
      title: queueNameText
    }, queueNameText));
  }
  return /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].text,
    title: outboundText
  }, outboundText);
};
exports.getModalText = getModalText;
//# sourceMappingURL=IncomingModalText.js.map
