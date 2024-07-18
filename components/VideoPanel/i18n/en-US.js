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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_topic$date$startTime = {
  topic: 'Meeting title',
  date: 'Date',
  startTime: 'Time',
  duration: 'Duration',
  scheduleFor: 'Schedule on behalf of',
  meetingSettings: 'Meeting settings'
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Myself'), _defineProperty(_topic$date$startTime, "joinBeforeHost", 'Allow participants to join before host'), _defineProperty(_topic$date$startTime, "enableWaitingRoom", 'Enable waiting room'), _defineProperty(_topic$date$startTime, "waitingRoom", 'Enable waiting room for'), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", 'Anyone outside my company'), _defineProperty(_topic$date$startTime, "waitingRoomGuest", 'Anyone not signed in'), _defineProperty(_topic$date$startTime, "waitingRoomAll", 'Everyone'), _defineProperty(_topic$date$startTime, "enterPassword", 'Enter Password'), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Participants can only join after me'), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", 'Participants can only join after host'), _defineProperty(_topic$date$startTime, "muteAudio", 'Mute audio for participants'), _defineProperty(_topic$date$startTime, "turnOffCamera", 'Turn off camera for participants'), _defineProperty(_topic$date$startTime, "requirePassword", 'Require password'), _defineProperty(_topic$date$startTime, "useE2ee", 'Use end-to-end encryption'), _defineProperty(_topic$date$startTime, "e2eeTooltip", "End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."), _defineProperty(_topic$date$startTime, "setPassword", 'Set password *'), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", 'Set password'), _defineProperty(_topic$date$startTime, "passwordEmptyError", 'Meeting password required'), _defineProperty(_topic$date$startTime, "passwordInvalidError", 'Your password must be 1-10 letters and numbers long but cannot contain symbols'), _defineProperty(_topic$date$startTime, "passwordHintText", 'Your password should be 1-10 letters and numbers long but cannot contain symbols'), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", 'Use Personal Meeting ID'), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", 'Security'), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", 'Only authenticated users can join'), _defineProperty(_topic$date$startTime, "signedInUsers", 'Signed in users'), _defineProperty(_topic$date$startTime, "signedInCoWorkers", 'Signed in co-workers'), _defineProperty(_topic$date$startTime, "limitScreenSharing", 'Only host & moderators can share screen'), _defineProperty(_topic$date$startTime, "lockTooltip", 'This setting is managed by your company admin'), _defineProperty(_topic$date$startTime, "pmiSettingAlert", 'These settings will apply to all meetings created with PMI'), _defineProperty(_topic$date$startTime, "today", 'Today'), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", 'Learn details'), _defineProperty(_topic$date$startTime, "changePmiSettings", 'Change Personal Meeting settings'), _topic$date$startTime);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
