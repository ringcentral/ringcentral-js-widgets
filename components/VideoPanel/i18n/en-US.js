"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _constants = require("ringcentral-integration/modules/RcVideo/constants");

var _topic$date$startTime;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_topic$date$startTime = {
  topic: 'Meeting title',
  date: 'Date',
  startTime: 'Time',
  duration: 'Duration',
  scheduleFor: 'Schedule on behalf of',
  meetingSettings: 'Meeting settings'
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, 'Myself'), _defineProperty(_topic$date$startTime, "joinBeforeHost", 'Allow participants to join before host'), _defineProperty(_topic$date$startTime, "enableWaitingRoom", 'Enable waiting room'), _defineProperty(_topic$date$startTime, "waitingRoom", 'Enable waiting room for'), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", 'Anyone outside my company'), _defineProperty(_topic$date$startTime, "waitingRoomGuest", 'Anyone not signed in'), _defineProperty(_topic$date$startTime, "waitingRoomAll", 'Everyone'), _defineProperty(_topic$date$startTime, "enterPassword", 'Enter Password'), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Participants can only join after me'), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", 'Participants can only join after host'), _defineProperty(_topic$date$startTime, "muteAudio", 'Mute audio for participants'), _defineProperty(_topic$date$startTime, "turnOffCamera", 'Turn off camera for participants'), _defineProperty(_topic$date$startTime, "requirePassword", 'Require password'), _defineProperty(_topic$date$startTime, "setPassword", 'Set password *'), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", 'Set password'), _defineProperty(_topic$date$startTime, "passwordEmptyError", 'Meeting password required'), _defineProperty(_topic$date$startTime, "passwordInvalidError", 'Your password must be 1-10 letters and numbers long but cannot contain symbols'), _defineProperty(_topic$date$startTime, "passwordHintText", 'Your password should be 1-10 letters and numbers long but cannot contain symbols'), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", 'Use Personal Meeting ID'), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", 'Security'), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", 'Only authenticated users can join'), _defineProperty(_topic$date$startTime, "signedInUsers", 'Signed in users'), _defineProperty(_topic$date$startTime, "signedInCoWorkers", 'Signed in co-workers'), _defineProperty(_topic$date$startTime, "limitScreenSharing", 'Only host & moderators can share screen'), _defineProperty(_topic$date$startTime, "lockTooltip", 'This setting is managed by your company admin'), _defineProperty(_topic$date$startTime, "pmiSettingAlert", 'These settings will apply to all meetings created with PMI'), _topic$date$startTime);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
