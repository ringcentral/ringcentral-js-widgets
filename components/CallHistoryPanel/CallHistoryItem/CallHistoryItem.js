"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryItem = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");

var _juno = require("@ringcentral/juno");

var _CallHistoryActions = require("../CallHistoryActions");

var _CallIcon = require("../CallIcon");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 64px;\n  box-sizing: border-box;\n  padding: ", ";\n  border-bottom: 1px solid ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Item = _juno.styled.div(_templateObject(), function (_ref) {
  var isWide = _ref.isWide;
  return isWide ? (0, _juno.spacing)(3, 4) : (0, _juno.spacing)(3);
}, (0, _juno.palette2)('neutral', 'l02'));

var CallHistoryItem = function CallHistoryItem(_ref2) {
  var call = _ref2.call,
      actionMenu = _ref2.actionMenu,
      _ref2$isWide = _ref2.isWide,
      isWide = _ref2$isWide === void 0 ? true : _ref2$isWide;
  var displayName = call.direction === _callDirections.callDirection.outbound ? call.toName : call.fromName;
  return /*#__PURE__*/_react["default"].createElement(Item, {
    isWide: isWide,
    "data-sign": "callHistoryItem"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])([_styles["default"].left, !isWide && _styles["default"].classic])
  }, /*#__PURE__*/_react["default"].createElement(_CallIcon.CallIcon, call), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])([_styles["default"].info, !isWide && _styles["default"].classic])
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    variant: "body1",
    noWrap: true,
    color: "neutral.f06",
    "data-sign": "matchedName",
    className: _styles["default"].name,
    title: displayName
  }, displayName), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "caption1",
    color: "neutral.f04",
    "data-sign": "callTime"
  }, call.callTime))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].right
  }, /*#__PURE__*/_react["default"].createElement(_CallHistoryActions.CallHistoryActions, {
    actionMenu: actionMenu,
    isWide: isWide
  })));
};

exports.CallHistoryItem = CallHistoryItem;
//# sourceMappingURL=CallHistoryItem.js.map
