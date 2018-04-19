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

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MeetingAlert(_ref) {
  var message = _ref.message,
      currentLocale = _ref.currentLocale;

  return _react2.default.createElement(
    'span',
    null,
    _i18n2.default.getString(message.message, currentLocale)
  );
}

MeetingAlert.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired
};

MeetingAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _meetingStatus2.default.emptyTopic || message === _meetingStatus2.default.noPassword || message === _meetingStatus2.default.scheduledSuccess;
};
//# sourceMappingURL=index.js.map
