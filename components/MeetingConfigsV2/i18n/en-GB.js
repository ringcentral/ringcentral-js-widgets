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
var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");
var _date$time$hours$minu;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Myself"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Meeting options"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Meeting settings"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Video Meeting settings"), _defineProperty(_date$time$hours$minu, "audioOptions", "Audio options"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Recurring meeting"), _defineProperty(_date$time$hours$minu, "recurringNote", "Note: Enable this one when choosing \"Recurrence\""), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Allow participants to join before host"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Turn off camera for participants"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Turn off camera for host when joining meeting"), _defineProperty(_date$time$hours$minu, "requirePassword", "Require password"), _defineProperty(_date$time$hours$minu, "enterPassword", "Enter Password"), _defineProperty(_date$time$hours$minu, "setPassword", "Set password *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "Meeting password required"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "Your password must be 1–10 characters long, including letters and numbers, and cannot have symbols except for @, * or -"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "Your password should be 1–10 characters long, including letters and numbers, and cannot have symbols except for @, * or -"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Use Personal Meeting ID"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "If you want to make changes for your Personal Meeting, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "change PMI settings"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "If you change the settings and schedule this meeting, all meetings with Personal Meeting ID will use the same latest settings."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "This setting is managed by your company admin"), _defineProperty(_date$time$hours$minu, "when", "When"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "Please remember to check for recurrences or repeats in your calendar invitation to your attendees."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=en-GB.js.map
