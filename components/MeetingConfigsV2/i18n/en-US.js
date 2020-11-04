"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _voIPOnly$telephonyOn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_voIPOnly$telephonyOn = {
  voIPOnly: 'Internet audio only',
  telephonyOnly: 'Telephone only',
  both: 'Telephone and Internet Audio',
  meetingId: 'Meeting ID',
  password: 'Password',
  video: 'Video',
  audio: 'Audio',
  scheduleFor: 'Schedule on behalf of'
}, _defineProperty(_voIPOnly$telephonyOn, _Meeting.ASSISTED_USERS_MYSELF, 'Myself'), _defineProperty(_voIPOnly$telephonyOn, "meetingOptions", 'Meeting options'), _defineProperty(_voIPOnly$telephonyOn, "meetingSettings", 'Meeting settings'), _defineProperty(_voIPOnly$telephonyOn, "rcMeetingSettings", 'Video Meeting settings'), _defineProperty(_voIPOnly$telephonyOn, "audioOptions", 'Audio options'), _defineProperty(_voIPOnly$telephonyOn, "recurringMeeting", 'Recurring meeting'), _defineProperty(_voIPOnly$telephonyOn, "recurringNote", 'Note: Enable this one when choosing "Recurrence"'), _defineProperty(_voIPOnly$telephonyOn, "joinBeforeHost", 'Allow participants to join before host'), _defineProperty(_voIPOnly$telephonyOn, "turnOffCamera", 'Turn off camera for participants'), _defineProperty(_voIPOnly$telephonyOn, "turnOffHostCamera", 'Turn off camera for host when joining meeting'), _defineProperty(_voIPOnly$telephonyOn, "requirePassword", 'Require password'), _defineProperty(_voIPOnly$telephonyOn, "setPassword", 'Set password *'), _defineProperty(_voIPOnly$telephonyOn, "passwordEmptyError", 'Meeting password required'), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordInvalidError", 'Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -'), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordHintText", 'Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -'), _defineProperty(_voIPOnly$telephonyOn, "usePersonalMeetingId", 'Use Personal Meeting ID'), _defineProperty(_voIPOnly$telephonyOn, "pmiChangeConfirm", 'If you want to make changes for your Personal Meeting, '), _defineProperty(_voIPOnly$telephonyOn, "changePmiSettings", 'change PMI settings'), _defineProperty(_voIPOnly$telephonyOn, "pmiSettingChangeAlert", 'If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings.'), _defineProperty(_voIPOnly$telephonyOn, "lockedTooltip", 'This setting is managed by your company admin'), _voIPOnly$telephonyOn);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
