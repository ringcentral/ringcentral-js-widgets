"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryItem = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _callDirections = require("ringcentral-integration/enums/callDirections");

var _CallIcon = require("../CallIcon");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallHistoryItem = function CallHistoryItem(_ref) {
  var call = _ref.call;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].item
  }, /*#__PURE__*/_react["default"].createElement(_CallIcon.CallIcon, call), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].info
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].name
  }, call.direction === _callDirections.callDirection.outbound ? call.toName : call.fromName), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].time
  }, call.callTime)));
};

exports.CallHistoryItem = CallHistoryItem;
//# sourceMappingURL=CallHistoryItem.js.map
