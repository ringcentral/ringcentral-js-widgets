'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _MeetingPanel = require('../../components/MeetingPanel');

var _MeetingPanel2 = _interopRequireDefault(_MeetingPanel);

var _phoneContext = require('../../lib/phoneContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      meeting = _ref$phone.meeting,
      locale = _ref$phone.locale,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === undefined ? false : _ref$disabled,
      showWhen = _ref.showWhen,
      showDuration = _ref.showDuration,
      showRecurringMeeting = _ref.showRecurringMeeting;

  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale,
    disabled: meeting.isScheduling || disabled,
    showWhen: showWhen,
    showDuration: showDuration,
    showRecurringMeeting: showRecurringMeeting
  };
}

function mapToFunctions(_, _ref2) {
  var schedule = _ref2.schedule,
      meeting = _ref2.phone.meeting;

  return {
    update: function update(meetingState) {
      return meeting.update(meetingState);
    },
    invite: function invite(meetingInfo, opener) {
      if (schedule) {
        schedule(meetingInfo, opener);
        return;
      }
      meeting.schedule(meetingInfo, {}, opener);
    },
    init: function init() {
      return meeting.init();
    }
  };
}

var MeetingPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_MeetingPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = MeetingPage;
//# sourceMappingURL=index.js.map
