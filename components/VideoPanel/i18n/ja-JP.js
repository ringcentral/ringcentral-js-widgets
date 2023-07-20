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
  topic: "会議タイトル",
  date: "日付",
  startTime: "時刻",
  duration: "期間",
  scheduleFor: "次のユーザーに代わってスケジュール：",
  meetingSettings: "会議設定"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "自分"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "ホストより早く参加者が参加することを許可"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "待機ルームを有効にする"), _defineProperty(_topic$date$startTime, "waitingRoom", "有効にするユーザー"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "すべての社外ユーザー"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "すべての未サインインユーザー"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "全員"), _defineProperty(_topic$date$startTime, "enterPassword", "パスワードを入力"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "自分が入る前に参加者の入室を許可しない"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "ホストの後にのみ参加者が参加可能にする"), _defineProperty(_topic$date$startTime, "muteAudio", "参加者のオーディオをミュートにする"), _defineProperty(_topic$date$startTime, "turnOffCamera", "参加者のカメラをオフにする"), _defineProperty(_topic$date$startTime, "requirePassword", "パスワードが必要です"), _defineProperty(_topic$date$startTime, "useE2ee", "エンドツーエンド暗号化を使用"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "エンドツーエンドで暗号化された会議は最もプライベートが守られる環境ですが、電話での参加、字幕、レコーディングなどの機能は使用できません。"), _defineProperty(_topic$date$startTime, "setPassword", "パスワードを設定*"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "パスワードを設定"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "会議パスワードが必要です"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "パスワードは1～10文字で英数字を使用できます。記号は使用できません"), _defineProperty(_topic$date$startTime, "passwordHintText", "パスワードは1～10文字で英数字を使用できます。記号は使用できません"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "個人会議IDを使用"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "セキュリティ"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "認証されているユーザーしか参加できません"), _defineProperty(_topic$date$startTime, "signedInUsers", "サインイン済みユーザー"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "サインイン済みの同僚"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "ホストとモデレータのみが画面を共有可能にする"), _defineProperty(_topic$date$startTime, "lockTooltip", "この設定は会社の管理者により管理されています"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "これらの設定はPMIを使って作成された会議すべてに適用されます"), _defineProperty(_topic$date$startTime, "today", "今日"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "別の人のためにスケジュールしますか？\n1. Outlook予定表を開きます。\n2. ドロップダウンからスケジュールするメンバーを選択します。\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "詳細を確認"), _defineProperty(_topic$date$startTime, "changePmiSettings", "個人会議の設定を変更"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "2022年2月16日以降、Internet Explorer 11では{appName}が機能しないことにご注意ください。Microsoft Edgeを代わりに使用するか、Outlook 2016以降に更新することをお勧めします。"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
