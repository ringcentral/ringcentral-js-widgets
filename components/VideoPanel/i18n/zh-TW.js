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
  topic: "會議標題",
  date: "日期",
  startTime: "時間",
  duration: "時長",
  scheduleFor: "代表以下對象安排時間",
  meetingSettings: "會議設定"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "我本人"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "允許參與者在主持人之前加入"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "啟用等候室"), _defineProperty(_topic$date$startTime, "waitingRoom", "為以下對象啟用等候室"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "公司以外任何人"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "未登入的任何人"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "所有人"), _defineProperty(_topic$date$startTime, "enterPassword", "輸入密碼"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "參加者僅能在我之後加入"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "參加者僅能在主持人之後加入"), _defineProperty(_topic$date$startTime, "muteAudio", "靜音參與者的音訊"), _defineProperty(_topic$date$startTime, "turnOffCamera", "關閉參與者的攝影機"), _defineProperty(_topic$date$startTime, "requirePassword", "需要密碼"), _defineProperty(_topic$date$startTime, "useE2ee", "使用端對端加密"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "端對端加密的會議最具私密性，但無法使用透過電話加入、隱藏式字幕和錄製等功能。"), _defineProperty(_topic$date$startTime, "setPassword", "請設定密碼 *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "請設定密碼"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "需要會議密碼"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "您的密碼須為 1 到 10 個字母和數字，但不得包含任何符號"), _defineProperty(_topic$date$startTime, "passwordHintText", "您的密碼應為 1 到 10 個字母和數字，但不得包含任何符號"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "使用個人會議 ID"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "安全性"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "僅限通過驗證的使用者可以加入"), _defineProperty(_topic$date$startTime, "signedInUsers", "已登入的使用者"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "登入的同仁"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "只有主持人和仲裁者可以分享畫面"), _defineProperty(_topic$date$startTime, "lockTooltip", "此設定由貴公司管理員管理"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "這些設定將套用至所有使用 PMI 建立的會議"), _defineProperty(_topic$date$startTime, "today", "今日"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "要為其他人排程嗎？\n1. 請確認您在他們的 Outlook 行事曆中。\n2. 從下拉選單中選取您要幫助其排程的人員。\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "瞭解詳細資訊"), _defineProperty(_topic$date$startTime, "changePmiSettings", "變更個人會議設定"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
exports["default"] = _default;
//# sourceMappingURL=zh-TW.js.map
