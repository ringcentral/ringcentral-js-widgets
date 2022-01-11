"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");

var _date$time$hours$minu;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$hours$minu = {
  date: 'Date',
  time: 'Time',
  hours: '{howMany} hr',
  minutes: '{howMany} min',
  today: 'Today',
  duration: 'Duration',
  topic: 'Meeting title',
  voIPOnly: 'Internet audio only',
  telephonyOnly: 'Telephone only',
  both: 'Telephone and Internet audio',
  thirdParty: '3rd party audio',
  meetingId: 'Meeting ID',
  password: 'Password',
  video: 'Video',
  audio: 'Audio',
  scheduleFor: 'Schedule on behalf of'
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, 'Myself'), _defineProperty(_date$time$hours$minu, "meetingOptions", 'Meeting options'), _defineProperty(_date$time$hours$minu, "meetingSettings", 'Meeting settings'), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", 'Video Meeting settings'), _defineProperty(_date$time$hours$minu, "audioOptions", 'Audio options'), _defineProperty(_date$time$hours$minu, "recurringMeeting", 'Recurring meeting'), _defineProperty(_date$time$hours$minu, "recurringNote", 'Note: Enable this one when choosing "Recurrence"'), _defineProperty(_date$time$hours$minu, "joinBeforeHost", 'Allow participants to join before host'), _defineProperty(_date$time$hours$minu, "turnOffCamera", 'Turn off camera for participants'), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", 'Turn off camera for host when joining meeting'), _defineProperty(_date$time$hours$minu, "requirePassword", 'Require password'), _defineProperty(_date$time$hours$minu, "enterPassword", 'Enter Password'), _defineProperty(_date$time$hours$minu, "setPassword", 'Set password *'), _defineProperty(_date$time$hours$minu, "passwordEmptyError", 'Meeting password required'), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", 'Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -'), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", 'Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -'), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", 'Use Personal Meeting ID'), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", 'If you want to make changes for your Personal Meeting, '), _defineProperty(_date$time$hours$minu, "changePmiSettings", 'change PMI settings'), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", 'If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings.'), _defineProperty(_date$time$hours$minu, "lockedTooltip", 'This setting is managed by your company admin'), _defineProperty(_date$time$hours$minu, "when", 'When'), _defineProperty(_date$time$hours$minu, "recurringDescribe", 'Please remember to check recurrence or repeat in your calendar invitation to your attendees.'), _defineProperty(_date$time$hours$minu, "ieSupportAlert", "Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."), _date$time$hours$minu);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
