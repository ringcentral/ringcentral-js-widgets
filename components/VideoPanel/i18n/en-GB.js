"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _topic$date$startTime;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_topic$date$startTime = {
  topic: 'Meeting title',
  date: 'Date',
  startTime: 'Time',
  duration: 'Duration',
  scheduleFor: 'Schedule on behalf of',
  meetingSettings: 'Meeting settings',
  meetingSettingsDescription: 'Updates to these settings will apply to the current meeting only.',
  here: 'here'
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Myself'), _defineProperty(_topic$date$startTime, "joinBeforeHost", 'Allow participants to join before host'), _defineProperty(_topic$date$startTime, "enableWaitingRoom", 'Enable waiting room'), _defineProperty(_topic$date$startTime, "waitingRoom", 'Enable waiting room for'), _defineProperty(_topic$date$startTime, "waitingRoomTitle", 'Waiting room'), _defineProperty(_topic$date$startTime, "waitingRoomDescription", 'Keep meetings private until you admit participants.'), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", 'Anyone outside my company'), _defineProperty(_topic$date$startTime, "waitingRoomGuest", 'Anyone not signed in'), _defineProperty(_topic$date$startTime, "waitingRoomAll", 'Everyone'), _defineProperty(_topic$date$startTime, "enterPassword", 'Enter Password'), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Participants can only join after me'), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", 'Participants can only join after host'), _defineProperty(_topic$date$startTime, "allowJoinBeforeHostDescription", 'Keeps the meeting secure and distraction-free until you join.'), _defineProperty(_topic$date$startTime, "muteAudio", 'Mute audio for participants'), _defineProperty(_topic$date$startTime, "turnOffCamera", 'Turn off camera for participants'), _defineProperty(_topic$date$startTime, "requirePassword", 'Require password'), _defineProperty(_topic$date$startTime, "useE2ee", 'Use end-to-end encryption'), _defineProperty(_topic$date$startTime, "e2eeTooltip", 'End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions and recording aren’t available.'), _defineProperty(_topic$date$startTime, "setPassword", 'Set password *'), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", 'Set password'), _defineProperty(_topic$date$startTime, "passwordEmptyError", 'Meeting password required'), _defineProperty(_topic$date$startTime, "passwordInvalidError", 'Your password must be 1–10 letters and numbers long but cannot contain symbols'), _defineProperty(_topic$date$startTime, "passwordHintText", 'Your password should be 1–10 letters and numbers long but cannot contain symbols'), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", 'Use Personal Meeting ID'), _defineProperty(_topic$date$startTime, "usePersonalMeetingIdInstead", 'Use personal meeting instead'), _defineProperty(_topic$date$startTime, "usePersonalMeetingName", 'Use personal meeting:'), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", 'Security'), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", 'Only authenticated users can join'), _defineProperty(_topic$date$startTime, "signedInUsers", 'Signed-in users'), _defineProperty(_topic$date$startTime, "signedInCoWorkers", 'Signed-in colleagues'), _defineProperty(_topic$date$startTime, "limitScreenSharing", 'Only the host & moderators can share screen'), _defineProperty(_topic$date$startTime, "lockTooltip", 'This setting is managed by your company admin'), _defineProperty(_topic$date$startTime, "pmiSettingAlert", 'These settings will apply to all meetings created with PMI'), _defineProperty(_topic$date$startTime, "today", 'Today'), _defineProperty(_topic$date$startTime, "scheduleForGuidance", 'Scheduling for someone else?\n1. Make sure you’re on their Outlook calendar.\n2. From the dropdown, select the person you’re scheduling for.\n'), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", 'Learn details'), _defineProperty(_topic$date$startTime, "changePmiSettings", 'Change Personal Meeting settings'), _defineProperty(_topic$date$startTime, "allowToRecording", 'Allow to start and stop recording'), _defineProperty(_topic$date$startTime, "allowTranscribe", 'Allow to start and stop transcription'), _defineProperty(_topic$date$startTime, "everyone", 'Everyone'), _defineProperty(_topic$date$startTime, "onlyHostModerators", 'Only host and moderators'), _defineProperty(_topic$date$startTime, "advancedSettings", 'Advanced settings'), _defineProperty(_topic$date$startTime, "whoCanJoin", 'Who can join?'), _defineProperty(_topic$date$startTime, "requirePasswordDescription", 'Participants who join via the meeting link won’t need to enter the password.'), _defineProperty(_topic$date$startTime, "password", 'Password:'), _defineProperty(_topic$date$startTime, "passwordLabel", 'Password'), _defineProperty(_topic$date$startTime, "edit", 'Edit'), _defineProperty(_topic$date$startTime, "changePassword", 'Change password'), _defineProperty(_topic$date$startTime, "passwordRequired", 'Password is required'), _defineProperty(_topic$date$startTime, "passwordLengthError", 'Password must be 1–10 characters long'), _defineProperty(_topic$date$startTime, "passwordFormatError", 'Password can only contain letters and numbers'), _defineProperty(_topic$date$startTime, "passwordHint", 'Your password should be 1–10 letters and numbers long, but cannot contain symbols.'), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Update these settings will apply to current meeting only."@#@
// @key: @#@"here"@#@ @source: @#@"here"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Keep meetings private until you admit participants."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"Keeps the meeting secure and distraction-free until you join."@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"useE2ee"@#@ @source: @#@"Use end-to-end encryption"@#@
// @key: @#@"e2eeTooltip"@#@ @source: @#@"End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"setPasswordNotSymbol"@#@ @source: @#@"Set password"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting instead"@#@
// @key: @#@"usePersonalMeetingName"@#@ @source: @#@"Use personal meeting:"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
// @key: @#@"allowToRecording"@#@ @source: @#@"Allow to start and stop recording"@#@
// @key: @#@"allowTranscribe"@#@ @source: @#@"Allow to start and stop transcription"@#@
// @key: @#@"everyone"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyHostModerators"@#@ @source: @#@"Only host and moderators"@#@
// @key: @#@"advancedSettings"@#@ @source: @#@"Advanced settings"@#@
// @key: @#@"whoCanJoin"@#@ @source: @#@"Who can join?"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Participants who join via the meeting link won’t need to enter the password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"changePassword"@#@ @source: @#@"Change Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordLengthError"@#@ @source: @#@"Password must be 1-10 characters long"@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Password can only contain letters and numbers"@#@
// @key: @#@"passwordHint"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
exports["default"] = _default;
//# sourceMappingURL=en-GB.js.map
