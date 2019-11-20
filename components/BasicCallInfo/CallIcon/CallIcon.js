"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _InboundCall = _interopRequireDefault(require("../../../assets/images/InboundCall.svg"));

var _OutboundCall = _interopRequireDefault(require("../../../assets/images/OutboundCall.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallIcon = function CallIcon(_ref) {
  var title = _ref.title,
      isInbound = _ref.isInbound;
  return _react["default"].createElement("div", {
    className: _styles["default"].callIcon,
    title: title
  }, isInbound ? _react["default"].createElement(_InboundCall["default"], null) : _react["default"].createElement(_OutboundCall["default"], null));
};

var _default = CallIcon;
exports["default"] = _default;
//# sourceMappingURL=CallIcon.js.map
