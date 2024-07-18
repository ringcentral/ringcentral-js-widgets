"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfo = void 0;
var _react = _interopRequireDefault(require("react"));
var _toolTipDelayTime = require("../../../lib/toolTipDelayTime");
var _Tooltip = require("../../Rcui/Tooltip");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallInfo = function CallInfo(_ref) {
  var name = _ref.name,
    content = _ref.content;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": content,
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].name,
    title: name
  }, name), /*#__PURE__*/_react["default"].createElement("i", {
    className: _styles["default"].flexFill
  }), /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: content,
    enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content
  }, content)));
};
exports.CallInfo = CallInfo;
//# sourceMappingURL=CallInfo.js.map
