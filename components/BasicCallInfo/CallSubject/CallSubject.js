"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallSubject = void 0;
var _react = _interopRequireDefault(require("react"));
var _toolTipDelayTime = require("../../../lib/toolTipDelayTime");
var _Tooltip = require("../../Rcui/Tooltip");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CallSubject = function CallSubject(_ref) {
  var subject = _ref.subject;
  if (!subject) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].subject
  }, /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: subject,
    enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].matchName,
    "data-sign": "matchName"
  }, subject)));
};
exports.CallSubject = CallSubject;
//# sourceMappingURL=CallSubject.js.map
