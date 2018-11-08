'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MeetingAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _meetingStatus = require('ringcentral-integration/modules/Meeting/meetingStatus');

var _meetingStatus2 = _interopRequireDefault(_meetingStatus);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MeetingAlert(_ref) {
  var _ref$message = _ref.message,
      message = _ref$message.message,
      payload = _ref$message.payload,
      currentLocale = _ref.currentLocale,
      application = _ref.application;

  var msg = void 0;
  switch (message) {
    case _meetingStatus2.default.insufficientPermissions:
      msg = _react2.default.createElement(_FormattedMessage2.default, {
        message: _i18n2.default.getString(message, currentLocale),
        values: {
          application: application,
          permissionName: payload.permissionName
        } });
      break;
    default:
      msg = _i18n2.default.getString(message, currentLocale);
      break;
  }
  return _react2.default.createElement(
    'span',
    null,
    msg
  );
}

MeetingAlert.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired,
  application: _propTypes2.default.string
};

MeetingAlert.defaultProps = {
  application: undefined
};

MeetingAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _meetingStatus2.default.emptyTopic || message === _meetingStatus2.default.noPassword || message === _meetingStatus2.default.insufficientPermissions || message === _meetingStatus2.default.scheduledSuccess;
};
//# sourceMappingURL=index.js.map
