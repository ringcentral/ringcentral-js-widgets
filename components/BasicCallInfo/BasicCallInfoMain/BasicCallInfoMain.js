"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicCallInfoMain = void 0;

var _react = _interopRequireDefault(require("react"));

var _CallIcon = require("../CallIcon");

var _CallSubject = require("../CallSubject");

var _FollowInfo = require("../FollowInfo");

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BasicCallInfoMain = function BasicCallInfoMain(_ref) {
  var onClick = _ref.onClick,
      children = _ref.children,
      isInbound = _ref.isInbound,
      subject = _ref.subject,
      followInfos = _ref.followInfos;
  return /*#__PURE__*/_react["default"].createElement("div", {
    onClick: onClick,
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_CallIcon.CallIcon, {
    isInbound: isInbound
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].mainInfo
  }, /*#__PURE__*/_react["default"].createElement(_CallSubject.CallSubject, {
    subject: subject
  }), /*#__PURE__*/_react["default"].createElement(_FollowInfo.FollowInfo, {
    infoList: followInfos,
    splitSign: "|"
  })), children);
};

exports.BasicCallInfoMain = BasicCallInfoMain;
//# sourceMappingURL=BasicCallInfoMain.js.map
