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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_topic$date$startTime = {
  topic: 'Meeting title',
  date: 'Date',
  startTime: 'Time',
  duration: 'Duration',
  scheduleFor: 'Schedule on behalf of',
  meetingSettings: 'Meeting settings'
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Myself'), _defineProperty(_topic$date$startTime, "joinBeforeHost", 'Allow participants to join before host'), _defineProperty(_topic$date$startTime, "enableWaitingRoom", 'Enable waiting room'), _defineProperty(_topic$date$startTime, "waitingRoom", 'Enable waiting room for'), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", 'Anyone outside my company'), _defineProperty(_topic$date$startTime, "waitingRoomGuest", 'Anyone not signed in'), _defineProperty(_topic$date$startTime, "waitingRoomAll", 'Everyone'), _defineProperty(_topic$date$startTime, "enterPassword", 'Enter Password'), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Participants can only join after me'), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", 'Participants can only join after host'), _defineProperty(_topic$date$startTime, "muteAudio", 'Mute audio for participants'), _defineProperty(_topic$date$startTime, "turnOffCamera", 'Turn off camera for participants'), _defineProperty(_topic$date$startTime, "requirePassword", 'Require password'), _defineProperty(_topic$date$startTime, "useE2ee", 'Use end-to-end encryption'), _defineProperty(_topic$date$startTime, "e2eeTooltip", "End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."), _defineProperty(_topic$date$startTime, "setPassword", 'Set password *'), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", 'Set password'), _defineProperty(_topic$date$startTime, "passwordEmptyError", 'Meeting password required'), _defineProperty(_topic$date$startTime, "passwordInvalidError", 'Your password must be 1-10 letters and numbers long but cannot contain symbols'), _defineProperty(_topic$date$startTime, "passwordHintText", 'Your password should be 1-10 letters and numbers long but cannot contain symbols'), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", 'Use Personal Meeting ID'), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", 'Security'), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", 'Only authenticated users can join'), _defineProperty(_topic$date$startTime, "signedInUsers", 'Signed in users'), _defineProperty(_topic$date$startTime, "signedInCoWorkers", 'Signed in co-workers'), _defineProperty(_topic$date$startTime, "limitScreenSharing", 'Only host & moderators can share screen'), _defineProperty(_topic$date$startTime, "lockTooltip", 'This setting is managed by your company admin'), _defineProperty(_topic$date$startTime, "pmiSettingAlert", 'These settings will apply to all meetings created with PMI'), _defineProperty(_topic$date$startTime, "today", 'Today'), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", 'Learn details'), _defineProperty(_topic$date$startTime, "changePmiSettings", 'Change Personal Meeting settings'), _defineProperty(_topic$date$startTime, "ieSupportAlert", "Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."), _topic$date$startTime);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
