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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_topic$date$startTime = {
  topic: '會議標題',
  date: '日期',
  startTime: '時間',
  duration: '時長',
  scheduleFor: '代表以下對象進行排程',
  meetingSettings: '會議設定',
  meetingSettingsDescription: '這些設定的更新僅會套用至目前會議。',
  here: '此處'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, '我本人'), "joinBeforeHost", '允許參與者在主持人之前加入'), "enableWaitingRoom", '啟用等候室'), "waitingRoom", '為以下對象啟用等候室'), "waitingRoomTitle", '等候室'), "waitingRoomDescription", '在您允許參與者加入之前，將會議保持為私人會議。'), "waitingRoomNotCoworker", '公司以外任何人'), "waitingRoomGuest", '未登入的任何人'), "waitingRoomAll", '所有人'), "enterPassword", '輸入密碼'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyJoinAfterMe", '參加者僅能在我之後加入'), "onlyJoinAfterHost", '參加者僅能在主持人之後加入'), "allowJoinBeforeHostDescription", '在您加入之前，確保會議安全且不受干擾。'), "muteAudio", '靜音參與者的音訊'), "turnOffCamera", '關閉參與者的攝影機'), "requirePassword", '需要密碼'), "useE2ee", '使用端對端加密'), "e2eeTooltip", '端對端加密的會議最具私密性，但無法使用透過電話加入、隱藏式字幕和錄製等功能。'), "setPassword", '請設定密碼 *'), "setPasswordNotSymbol", '請設定密碼'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "passwordEmptyError", '需要會議密碼'), "passwordInvalidError", '您的密碼須為 1 到 10 個字母和數字，但不得包含任何符號'), "passwordHintText", '您的密碼應為 1 到 10 個字母和數字，但不得包含任何符號'), "usePersonalMeetingId", '使用個人會議 ID'), "usePersonalMeetingIdInstead", '改為使用個人會議'), "usePersonalMeetingName", '使用個人會議：'), "meetingSettingsSecurity", '安全性'), "onlyAuthUserJoin", '僅限通過驗證的使用者可以加入'), "signedInUsers", '已登入的使用者'), "signedInCoWorkers", '登入的同仁'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "limitScreenSharing", '只有主持人和仲裁者可以分享畫面'), "lockTooltip", '此設定由貴公司管理員管理'), "pmiSettingAlert", '這些設定將套用至所有使用 PMI 建立的會議'), "today", '今日'), "scheduleForGuidance", '要為其他人排程嗎？\n1. 請確認您在他們的 Outlook 行事曆中。\n2. 從下拉選單中選取您要幫助其排程的人員。\n'), "scheduleForGuidanceMore", '瞭解詳細資訊'), "changePmiSettings", '變更個人會議設定'), "allowToRecording", '允許開始和停止錄製'), "allowTranscribe", '允許開始和停止轉錄'), "everyone", '所有人'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyHostModerators", '僅限主持人和代理主持人'), "advancedSettings", '進階設定'), "whoCanJoin", '哪些人可以加入？'), "requirePasswordDescription", '透過會議連結加入的參與者將不需要輸入密碼。'), "password", '密碼：'), "passwordLabel", '密碼'), "edit", '編輯'), "changePassword", '變更密碼'), "passwordRequired", '密碼為必填'), "passwordLengthError", '密碼必須包含 1 到 10 個字元'), _defineProperty(_defineProperty(_topic$date$startTime, "passwordFormatError", '密碼只能包含字母和數字'), "passwordHint", '您的密碼應為 1 到 10 個字母和數字，但不得包含任何符號。')); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=zh-HK.js.map
