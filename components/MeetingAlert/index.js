"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MeetingAlert;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _meetingStatus = _interopRequireDefault(require("ringcentral-integration/modules/Meeting/meetingStatus"));

var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MeetingAlert(_ref) {
  var _ref$message = _ref.message,
      message = _ref$message.message,
      payload = _ref$message.payload,
      currentLocale = _ref.currentLocale,
      application = _ref.application;
  var msg;

  switch (message) {
    case _meetingStatus["default"].insufficientPermissions:
      msg = _react["default"].createElement(_FormattedMessage["default"], {
        message: _i18n["default"].getString(message, currentLocale),
        values: {
          application: application,
          permissionName: payload.permissionName
        }
      });
      break;

    default:
      msg = _i18n["default"].getString(message, currentLocale);
      break;
  }

  return _react["default"].createElement("span", null, msg);
}

MeetingAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  application: _propTypes["default"].string
};
MeetingAlert.defaultProps = {
  application: undefined
};

MeetingAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _meetingStatus["default"].emptyTopic || message === _meetingStatus["default"].noPassword || message === _meetingStatus["default"].insufficientPermissions || message === _meetingStatus["default"].scheduledSuccess || message === _meetingStatus["default"].updatedSuccess || message === _meetingStatus["default"].internalError;
};
//# sourceMappingURL=index.js.map
