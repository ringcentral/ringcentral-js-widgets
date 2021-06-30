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
  date: "Date",
  time: "Time",
  hours: "{howMany} hr",
  minutes: "{howMany} min",
  today: "Today",
  duration: "Duration",
  topic: "Meeting title",
  voIPOnly: "Internet audio only",
  telephonyOnly: "Telephone only",
  both: "Telephone and internet audio",
  thirdParty: "Third-party audio",
  meetingId: "Meeting ID",
  password: "Password",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Schedule on behalf of"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Myself"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Meeting options"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Meeting settings"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Video meeting settings"), _defineProperty(_date$time$hours$minu, "audioOptions", "Audio options"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Recurring meeting"), _defineProperty(_date$time$hours$minu, "recurringNote", "Note: Enable this one when choosing \"Recurrence\""), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Allow participants to join before host"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Turn off camera for participants"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Turn off camera for host when joining meeting"), _defineProperty(_date$time$hours$minu, "requirePassword", "Require password"), _defineProperty(_date$time$hours$minu, "enterPassword", "Enter Password"), _defineProperty(_date$time$hours$minu, "setPassword", "Set password *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "Meeting password required"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Use Personal Meeting ID"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "If you want to make changes for your Personal Meeting, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "change PMI settings"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "This setting is managed by your company admin"), _defineProperty(_date$time$hours$minu, "when", "When"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "Please remember to check for recurrences or repeats in your calendar invitations to your attendees."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"hours"@#@ @source: @#@"{howMany} hr"@#@
// @key: @#@"minutes"@#@ @source: @#@"{howMany} min"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet audio"@#@
// @key: @#@"thirdParty"@#@ @source: @#@"3rd party audio"@#@
// @key: @#@"meetingId"@#@ @source: @#@"Meeting ID"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"audio"@#@ @source: @#@"Audio"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting options"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"audioOptions"@#@ @source: @#@"Audio options"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring meeting"@#@
// @key: @#@"recurringNote"@#@ @source: @#@"Note: Enable this one when choosing \"Recurrence\""@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"turnOffHostCamera"@#@ @source: @#@"Turn off camera for host when joining meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"when"@#@ @source: @#@"When"@#@
// @key: @#@"recurringDescribe"@#@ @source: @#@"Please remember to check recurrence or repeat in your calendar invitation to your attendees."@#@


exports["default"] = _default;
//# sourceMappingURL=en-AU.js.map
