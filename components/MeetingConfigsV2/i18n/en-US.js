"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _date$time$duration$t;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$duration$t = {
  date: 'Date',
  time: 'Time',
  duration: 'Duration',
  topic: 'Meeting title',
  voIPOnly: 'Internet audio only',
  telephonyOnly: 'Telephone only',
  both: 'Telephone and Internet Audio',
  meetingId: 'Meeting ID',
  password: 'Password',
  video: 'Video',
  audio: 'Audio',
  scheduleFor: 'Schedule on behalf of'
}, _defineProperty(_date$time$duration$t, _Meeting.ASSISTED_USERS_MYSELF, 'Myself'), _defineProperty(_date$time$duration$t, "meetingOptions", 'Meeting options'), _defineProperty(_date$time$duration$t, "meetingSettings", 'Meeting settings'), _defineProperty(_date$time$duration$t, "rcMeetingSettings", 'Video Meeting settings'), _defineProperty(_date$time$duration$t, "audioOptions", 'Audio options'), _defineProperty(_date$time$duration$t, "recurringMeeting", 'Recurring meeting'), _defineProperty(_date$time$duration$t, "recurringNote", 'Note: Enable this one when choosing "Recurrence"'), _defineProperty(_date$time$duration$t, "joinBeforeHost", 'Allow participants to join before host'), _defineProperty(_date$time$duration$t, "turnOffCamera", 'Turn off camera for participants'), _defineProperty(_date$time$duration$t, "turnOffHostCamera", 'Turn off camera for host when joining meeting'), _defineProperty(_date$time$duration$t, "requirePassword", 'Require password'), _defineProperty(_date$time$duration$t, "setPassword", 'Set password *'), _defineProperty(_date$time$duration$t, "passwordEmptyError", 'Meeting password required'), _defineProperty(_date$time$duration$t, "rcmPasswordInvalidError", 'Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -'), _defineProperty(_date$time$duration$t, "rcmPasswordHintText", 'Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -'), _defineProperty(_date$time$duration$t, "usePersonalMeetingId", 'Use Personal Meeting ID'), _defineProperty(_date$time$duration$t, "pmiChangeConfirm", 'If you want to make changes for your Personal Meeting, '), _defineProperty(_date$time$duration$t, "changePmiSettings", 'change PMI settings'), _defineProperty(_date$time$duration$t, "pmiSettingChangeAlert", 'If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings.'), _defineProperty(_date$time$duration$t, "lockedTooltip", 'This setting is managed by your company admin'), _defineProperty(_date$time$duration$t, "when", 'When'), _defineProperty(_date$time$duration$t, "recurringDescribe", 'Please remember to check recurrence or repeat in your calendar invitation to your attendees.'), _date$time$duration$t);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
