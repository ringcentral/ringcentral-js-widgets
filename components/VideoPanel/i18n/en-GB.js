"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _constants = require("@ringcentral-integration/commons/modules/RcVideo/constants");

var _topic$date$startTime;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_topic$date$startTime = {
  topic: "Meeting title",
  date: "Date",
  startTime: "Time",
  duration: "Duration",
  scheduleFor: "Schedule on behalf of",
  meetingSettings: "Meeting settings"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Myself"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Allow participants to join before host"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Enable waiting room"), _defineProperty(_topic$date$startTime, "waitingRoom", "Enable waiting room for"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Anyone outside my company"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Anyone not signed in"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Everyone"), _defineProperty(_topic$date$startTime, "enterPassword", "Enter Password"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Participants can only join after me"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Participants can only join after the host"), _defineProperty(_topic$date$startTime, "muteAudio", "Mute audio for participants"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Turn off camera for participants"), _defineProperty(_topic$date$startTime, "requirePassword", "Require password"), _defineProperty(_topic$date$startTime, "useE2ee", "Use end-to-end encryption"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions and recording aren't available."), _defineProperty(_topic$date$startTime, "setPassword", "Set password *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Set password"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Meeting password required"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Your password must be 1–10 letters and numbers long but cannot contain symbols"), _defineProperty(_topic$date$startTime, "passwordHintText", "Your password should be 1–10 letters and numbers long but cannot contain symbols"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Use Personal Meeting ID"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Security"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Only authenticated users can join"), _defineProperty(_topic$date$startTime, "signedInUsers", "Signed-in users"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Signed-in co-workers"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Only the host & moderators can share screen"), _defineProperty(_topic$date$startTime, "lockTooltip", "This setting is managed by your company admin"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "These settings will apply to all meetings created with PMI"), _defineProperty(_topic$date$startTime, "today", "Today"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Scheduling for someone else?\n1. Make sure you’re on their Outlook calendar.\n2. From the dropdown, select the person you’re scheduling for.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Learn details"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Change personal meeting settings"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "Please note that {appName} won’t work with Internet Explorer 11 after 16th Feb 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@


exports["default"] = _default;
//# sourceMappingURL=en-GB.js.map
