"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _topic$date$startTime;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = (_topic$date$startTime = {
  topic: 'Meeting title',
  date: 'Date',
  startTime: 'Time',
  duration: 'Duration',
  scheduleFor: 'Schedule on behalf of',
  meetingSettings: 'Meeting settings',
  meetingSettingsDescription: 'Update these settings will apply to current meeting only.',
  here: 'here'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Myself'), "joinBeforeHost", 'Allow participants to join before host'), "enableWaitingRoom", 'Enable waiting room'), "waitingRoom", 'Enable waiting room for'), "waitingRoomTitle", 'Waiting room'), "waitingRoomDescription", 'Keep meetings private until you admit participants.'), "waitingRoomNotCoworker", 'Anyone outside my company'), "waitingRoomGuest", 'Anyone not signed in'), "waitingRoomAll", 'Everyone'), "enterPassword", 'Enter Password'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Participants can only join after me'), "onlyJoinAfterHost", 'Participants can only join after host'), "allowJoinBeforeHostDescription", 'Keeps the meeting secure and distraction-free until you join.'), "muteAudio", 'Mute audio for participants'), "turnOffCamera", 'Turn off camera for participants'), "requirePassword", 'Require password'), "useE2ee", 'Use end-to-end encryption'), "e2eeTooltip", "End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."), "setPassword", 'Set password *'), "setPasswordNotSymbol", 'Set password'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "passwordEmptyError", 'Meeting password required'), "passwordInvalidError", 'Your password must be 1-10 letters and numbers long but cannot contain symbols'), "passwordHintText", 'Your password should be 1-10 letters and numbers long but cannot contain symbols'), "usePersonalMeetingId", 'Use Personal Meeting ID'), "usePersonalMeetingIdInstead", 'Use personal meeting instead'), "usePersonalMeetingName", 'Use personal meeting:'), "meetingSettingsSecurity", 'Security'), "onlyAuthUserJoin", 'Only authenticated users can join'), "signedInUsers", 'Signed in users'), "signedInCoWorkers", 'Signed in co-workers'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "limitScreenSharing", 'Only host & moderators can share screen'), "lockTooltip", 'This setting is managed by your company admin'), "pmiSettingAlert", 'These settings will apply to all meetings created with PMI'), "today", 'Today'), "scheduleForGuidance", "Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"), "scheduleForGuidanceMore", 'Learn details'), "changePmiSettings", 'Change Personal Meeting settings'), "allowToRecording", 'Allow to start and stop recording'), "allowTranscribe", 'Allow to start and stop transcription'), "everyone", 'Everyone'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyHostModerators", 'Only host and moderators'), "advancedSettings", 'Advanced settings'), "whoCanJoin", 'Who can join?'), "requirePasswordDescription", 'Participants who join via the meeting link won’t need to enter the password.'), "password", 'Password:'), "passwordLabel", 'Password'), "edit", 'Edit'), "changePassword", 'Change Password'), "passwordRequired", 'Password is required'), "passwordLengthError", 'Password must be 1-10 characters long'), _defineProperty(_defineProperty(_topic$date$startTime, "passwordFormatError", 'Password can only contain letters and numbers'), "passwordHint", 'Your password should be 1-10 letters and numbers long, but can not contain symbols.'));
//# sourceMappingURL=en-US.js.map
