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
  date: "日期",
  time: "時間",
  hours: "{howMany} 小時",
  minutes: "{howMany} 分",
  today: "今日",
  duration: "時長",
  topic: "會議標題",
  voIPOnly: "僅限網路音訊",
  telephonyOnly: "僅限電話",
  both: "電話和網路音訊",
  thirdParty: "第三方音訊",
  meetingId: "會議 ID",
  password: "密碼",
  video: "視訊",
  audio: "音訊",
  scheduleFor: "代表以下對象排程"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "我本人"), _defineProperty(_date$time$hours$minu, "meetingOptions", "會議選項"), _defineProperty(_date$time$hours$minu, "meetingSettings", "會議設定"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "視訊會議設定"), _defineProperty(_date$time$hours$minu, "audioOptions", "音訊選項"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "定期會議"), _defineProperty(_date$time$hours$minu, "recurringNote", "注意：選擇「定期」時請啟用此選項"), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "允許參與者在主持人之前加入"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "關閉參與者的攝影機"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "主持人加入會議時請關閉攝影機"), _defineProperty(_date$time$hours$minu, "requirePassword", "需要密碼"), _defineProperty(_date$time$hours$minu, "enterPassword", "輸入密碼"), _defineProperty(_date$time$hours$minu, "setPassword", "請設定密碼 *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "需要會議密碼"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "您的密碼必須包含 1 到 10 個字元和數字，並且不得包含任何符號 (除 @、* 或 - 以外)"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "您的密碼應包含 1 到 10 個字元和數字，並且不得包含任何符號 (除 @、* 或 - 以外)"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "使用個人會議 ID"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "如果您想變更個人會議， "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "請變更 PMI 設定"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "若您變更設定並排程此會議，相同的最新設定會套用至使用個人會議 ID 的所有會議。"), _defineProperty(_date$time$hours$minu, "lockedTooltip", "此設定由貴公司管理員管理"), _defineProperty(_date$time$hours$minu, "when", "時間"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "請記得確認傳送給列席者的行事曆邀請中的定期或重複會議。"), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=zh-TW.js.map
