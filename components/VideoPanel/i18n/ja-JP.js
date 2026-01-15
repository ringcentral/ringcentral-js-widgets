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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_topic$date$startTime = {
  topic: '会議タイトル',
  date: '日付',
  startTime: '時刻',
  duration: '期間',
  scheduleFor: '次のユーザーに代わってスケジュール：',
  meetingSettings: '会議設定',
  meetingSettingsDescription: 'これらの設定の更新は現在の会議にのみ適用されます。',
  here: 'こちら'
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, '自分'), _defineProperty(_topic$date$startTime, "joinBeforeHost", 'ホストより早く参加者が参加することを許可'), _defineProperty(_topic$date$startTime, "enableWaitingRoom", '待機ルームを有効にする'), _defineProperty(_topic$date$startTime, "waitingRoom", '有効にするユーザー'), _defineProperty(_topic$date$startTime, "waitingRoomTitle", '待機ルーム'), _defineProperty(_topic$date$startTime, "waitingRoomDescription", '参加者の入室を許可するまで会議をプライベートにします。'), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", '社外の人'), _defineProperty(_topic$date$startTime, "waitingRoomGuest", 'サインインしていないユーザー'), _defineProperty(_topic$date$startTime, "waitingRoomAll", '全員'), _defineProperty(_topic$date$startTime, "enterPassword", 'パスワードを入力'), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", '自分が入る前に参加者の入室を許可しない'), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", '参加者はホストの後にのみ参加可能'), _defineProperty(_topic$date$startTime, "allowJoinBeforeHostDescription", '自分が参加するまで、会議の安全を確保し、妨げられないようにします。'), _defineProperty(_topic$date$startTime, "muteAudio", '参加者のオーディオをミュートにする'), _defineProperty(_topic$date$startTime, "turnOffCamera", '参加者のカメラをオフにする'), _defineProperty(_topic$date$startTime, "requirePassword", 'パスワードが必要です'), _defineProperty(_topic$date$startTime, "useE2ee", 'エンドツーエンド暗号化を使用'), _defineProperty(_topic$date$startTime, "e2eeTooltip", 'エンドツーエンドで暗号化された会議は最もプライベートが守られる環境ですが、電話での参加、字幕、レコーディングなどの機能は使用できません。'), _defineProperty(_topic$date$startTime, "setPassword", 'パスワードを設定*'), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", 'パスワードを設定'), _defineProperty(_topic$date$startTime, "passwordEmptyError", '会議パスワードが必要です'), _defineProperty(_topic$date$startTime, "passwordInvalidError", 'パスワードは1～10文字で英数字を使用できます。記号は使用できません'), _defineProperty(_topic$date$startTime, "passwordHintText", 'パスワードは1～10文字で英数字を使用できます。記号は使用できません'), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", '個人会議IDを使用'), _defineProperty(_topic$date$startTime, "usePersonalMeetingIdInstead", '代わりに個人会議を使用'), _defineProperty(_topic$date$startTime, "usePersonalMeetingName", '個人会議を使用：'), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", 'セキュリティ'), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", '認証済みユーザーのみ参加可能'), _defineProperty(_topic$date$startTime, "signedInUsers", 'サインイン済みユーザー'), _defineProperty(_topic$date$startTime, "signedInCoWorkers", 'サインイン済みの同僚'), _defineProperty(_topic$date$startTime, "limitScreenSharing", 'ホストとモデレータのみが画面を共有可能にする'), _defineProperty(_topic$date$startTime, "lockTooltip", 'この設定は会社の管理者により管理されています'), _defineProperty(_topic$date$startTime, "pmiSettingAlert", 'これらの設定はPMIを使って作成された会議すべてに適用されます'), _defineProperty(_topic$date$startTime, "today", '今日'), _defineProperty(_topic$date$startTime, "scheduleForGuidance", '別の人のためにスケジュールしますか？\n1. Outlook予定表を開きます。\n2. ドロップダウンからスケジュールするメンバーを選択します。\n'), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", '詳細を確認'), _defineProperty(_topic$date$startTime, "changePmiSettings", '個人会議の設定を変更'), _defineProperty(_topic$date$startTime, "allowToRecording", 'レコーディングの開始/停止を許可'), _defineProperty(_topic$date$startTime, "allowTranscribe", 'トランスクリプトの開始/停止を許可'), _defineProperty(_topic$date$startTime, "everyone", '全員'), _defineProperty(_topic$date$startTime, "onlyHostModerators", 'ホストとモデレーターのみ'), _defineProperty(_topic$date$startTime, "advancedSettings", '詳細設定'), _defineProperty(_topic$date$startTime, "whoCanJoin", '誰が参加できますか？'), _defineProperty(_topic$date$startTime, "requirePasswordDescription", '会議リンクから参加する参加者の場合、パスワードを入力する必要はありません。'), _defineProperty(_topic$date$startTime, "password", 'パスワード：'), _defineProperty(_topic$date$startTime, "passwordLabel", 'パスワード'), _defineProperty(_topic$date$startTime, "edit", '編集'), _defineProperty(_topic$date$startTime, "changePassword", 'パスワードを変更'), _defineProperty(_topic$date$startTime, "passwordRequired", 'パスワードは必須です'), _defineProperty(_topic$date$startTime, "passwordLengthError", 'パスワードは1〜10文字である必要があります'), _defineProperty(_topic$date$startTime, "passwordFormatError", 'パスワードには英数字のみが使用できます'), _defineProperty(_topic$date$startTime, "passwordHint", 'パスワードは1～10文字で英数字を使用できます。記号は使用できません。'), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
