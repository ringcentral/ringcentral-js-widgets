"use strict";

require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowInfo = void 0;
var _react = _interopRequireDefault(require("react"));
var _toolTipDelayTime = require("../../../lib/toolTipDelayTime");
var _Tooltip = require("../../Rcui/Tooltip");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FollowInfo = function FollowInfo(_ref) {
  var infoList = _ref.infoList,
    splitSign = _ref.splitSign;
  if (!infoList || infoList.length === 0) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].followInfo
  }, infoList.filter(function (info) {
    return !!info;
  }).map(function (info, i) {
    return info && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
      title: info,
      enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].followItem
    }, info)), /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].splitSign
    }, splitSign));
  }));
};
exports.FollowInfo = FollowInfo;
//# sourceMappingURL=FollowInfo.js.map
