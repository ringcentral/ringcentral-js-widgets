"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeetingScheduleButton = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _MeetingScheduleButton = _interopRequireDefault(require("../MeetingScheduleButton"));
var _RcVideoScheduleButton = require("../RcVideoScheduleButton");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var GenericMeetingScheduleButton = exports.GenericMeetingScheduleButton = function GenericMeetingScheduleButton(props) {
  var meeting = props.meeting,
    buttonLabel = props.buttonLabel,
    isRCM = props.isRCM,
    isRCV = props.isRCV;
  if (isRCM) {
    return /*#__PURE__*/_react["default"].createElement(_MeetingScheduleButton["default"], _extends({}, props, {
      meeting: meeting,
      scheduleButtonLabel: buttonLabel
    }));
  }
  if (isRCV) {
    return /*#__PURE__*/_react["default"].createElement(_RcVideoScheduleButton.RcVideoScheduleButton, _extends({}, props, {
      meeting: meeting,
      buttonLabel: buttonLabel
    }));
  }
  return null;
};
//# sourceMappingURL=GenericMeetingScheduleButton.js.map
