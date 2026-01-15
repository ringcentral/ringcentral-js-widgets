"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicCallInfoMain = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _CallIcon = require("../CallIcon");
var _CallSubject = require("../CallSubject");
var _FollowInfo = require("../FollowInfo");
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BasicCallInfoMain = exports.BasicCallInfoMain = function BasicCallInfoMain(_ref) {
  var onClick = _ref.onClick,
    children = _ref.children,
    isInbound = _ref.isInbound,
    subject = _ref.subject,
    followInfos = _ref.followInfos,
    className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    onClick: onClick,
    className: (0, _clsx["default"])(_styles["default"].root, className)
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
//# sourceMappingURL=BasicCallInfoMain.js.map
