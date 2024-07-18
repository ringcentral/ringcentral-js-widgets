"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MeetingAlert = function MeetingAlert(_ref) {
  var _ref$message = _ref.message,
    message = _ref$message.message,
    payload = _ref$message.payload,
    currentLocale = _ref.currentLocale,
    application = _ref.application;
  var msg;
  switch (message) {
    case _Meeting.meetingStatus.insufficientPermissions:
      msg = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
        message: _i18n["default"].getString(message, currentLocale),
        values: {
          application: application,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          permissionName: payload.permissionName
        }
      });
      break;
    default:
      msg = _i18n["default"].getString(message, currentLocale);
      break;
  }
  return /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "meeting-alert"
  }, msg);
};
MeetingAlert.defaultProps = {
  application: undefined
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
MeetingAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _Meeting.meetingStatus.emptyTopic || message === _Meeting.meetingStatus.noPassword || message === _Meeting.meetingStatus.insufficientPermissions || message === _Meeting.meetingStatus.scheduledSuccess || message === _Meeting.meetingStatus.updatedSuccess || message === _Meeting.meetingStatus.meetingIsDeleted || message === _Meeting.meetingStatus.renderInviteError || message === _Meeting.meetingStatus.internalError;
};
var _default = MeetingAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
