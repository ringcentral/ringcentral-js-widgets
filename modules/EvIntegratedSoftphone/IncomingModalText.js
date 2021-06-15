"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModalText = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getModalText = function getModalText(_ref) {
  var isInbound = _ref.isInbound,
      inboundTextProps = _ref.inboundTextProps,
      outboundText = _ref.outboundText;

  if (isInbound) {
    var incomingText = inboundTextProps.incomingText,
        queueNameText = inboundTextProps.queueNameText;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", {
      className: (0, _classnames["default"])(_styles["default"].text, _styles["default"].incomingText),
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
