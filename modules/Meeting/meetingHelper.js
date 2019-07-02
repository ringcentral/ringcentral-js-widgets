"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeetingSettings = getMeetingSettings;
exports.getDefaultMeetingSettings = getDefaultMeetingSettings;
exports.MeetingType = exports.UTC_TIMEZONE_ID = void 0;
var UTC_TIMEZONE_ID = '1';
exports.UTC_TIMEZONE_ID = UTC_TIMEZONE_ID;
var MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  INSTANT: 'Instant'
};
exports.MeetingType = MeetingType;

function getMeetingSettings(_ref) {
  var extensionName = _ref.extensionName,
      startTime = _ref.startTime,
      _ref$durationInMinute = _ref.durationInMinutes,
      durationInMinutes = _ref$durationInMinute === void 0 ? 60 : _ref$durationInMinute,
      _ref$topic = _ref.topic,
      topic = _ref$topic === void 0 ? '' : _ref$topic;
  return {
    topic: topic || "".concat(extensionName, "'s Meeting"),
    meetingType: MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime: startTime,
      durationInMinutes: durationInMinutes,
      timeZone: {
        id: UTC_TIMEZONE_ID
      }
    },
    host: {
      id: null
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio']
  };
} // Basic default meeting type information


function getDefaultMeetingSettings(extensionName, startTime) {
  return {
    topic: "".concat(extensionName, "'s Meeting"),
    meetingType: MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime: startTime,
      durationInMinutes: 60,
      timeZone: {
        id: UTC_TIMEZONE_ID
      }
    },
    host: {
      id: null
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
    _requireMeetingPassword: false,
    _showDate: false,
    _showTime: false,
    _saved: false
  };
}
//# sourceMappingURL=meetingHelper.js.map
