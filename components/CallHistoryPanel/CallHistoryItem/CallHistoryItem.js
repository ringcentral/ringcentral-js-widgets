"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryItem = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _callDirections = require("ringcentral-integration/enums/callDirections");

var _CallIcon = require("../CallIcon");

var _CallHistoryActions = require("../CallHistoryActions");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallHistoryItem = function CallHistoryItem(_ref) {
  var call = _ref.call,
      actionMenu = _ref.actionMenu,
      _ref$isWide = _ref.isWide,
      isWide = _ref$isWide === void 0 ? true : _ref$isWide;
  var displayName = call.direction === _callDirections.callDirection.outbound ? call.toName : call.fromName;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])([_styles["default"].item, !isWide && _styles["default"].classic])
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].left
  }, /*#__PURE__*/_react["default"].createElement(_CallIcon.CallIcon, call), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])([_styles["default"].info, !isWide && _styles["default"].classic])
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "matchedName",
    className: _styles["default"].name,
    title: displayName
  }, displayName), /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "callTime",
    className: _styles["default"].time
  }, call.callTime))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].right
  }, /*#__PURE__*/_react["default"].createElement(_CallHistoryActions.CallHistoryActions, {
    actionMenu: actionMenu,
    isWide: isWide
  })));
};

exports.CallHistoryItem = CallHistoryItem;
//# sourceMappingURL=CallHistoryItem.js.map
