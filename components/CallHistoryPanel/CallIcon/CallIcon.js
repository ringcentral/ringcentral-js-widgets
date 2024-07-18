"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallIcon = void 0;
var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallIcon = function CallIcon(_ref) {
  var direction = _ref.direction,
    active = _ref.active,
    missed = _ref.missed,
    title = _ref.title;
  var icon = function () {
    if (missed) {
      return _junoIcon.MissedcallBorder;
    }
    switch (direction) {
      case _callDirections.callDirection.inbound:
        return _junoIcon.IncallBorder;
      case _callDirections.callDirection.outbound:
        return _junoIcon.OutcallBorder;
      default:
        return null;
    }
  }();
  var color = function () {
    if (active) {
      return 'success.b04';
    }
    if (missed) {
      return 'danger.b04';
    }
    return 'neutral.f04';
  }();
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    "data-sign": "callIcon",
    title: title || direction
    // @ts-expect-error TS(2322): Type 'MemoExoticComponent<ForwardRefExoticComponen... Remove this comment to see the full error message
    ,
    symbol: icon,
    size: "medium",
    color: color
  });
};
exports.CallIcon = CallIcon;
//# sourceMappingURL=CallIcon.js.map
