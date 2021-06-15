"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _constants = require("ringcentral-integration/modules/RcVideo/constants");

var _topic$date$startTime;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_topic$date$startTime = {
  topic: "会議タイトル",
  date: "日付",
  startTime: "時間",
  duration: "通話時間",
  scheduleFor: "次のユーザーに代わってスケジュール：",
  meetingSettings: "会議設定"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "自分"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "ホストより早く参加者が参加することを許可"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "待機ルームを有効にする"), _defineProperty(_topic$date$startTime, "waitingRoom", "次のユーザーのために待機ルームを有効にする"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "すべての社外ユーザー"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "すべての未サインインユーザー"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "全員"), _defineProperty(_topic$date$startTime, "enterPassword", "パスワードを入力"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "自分の後にのみ参加者が参加可能にする"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "ホストの後にのみ参加者が参加可能にする"), _defineProperty(_topic$date$startTime, "muteAudio", "参加者のオーディオをミュートする"), _defineProperty(_topic$date$startTime, "turnOffCamera", "参加者のカメラをオフにする"), _defineProperty(_topic$date$startTime, "requirePassword", "パスワードを必須にする"), _defineProperty(_topic$date$startTime, "setPassword", "パスワードを設定*"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "パスワードを設定"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "会議パスワードが必要です"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "パスワードは1～10文字で英数字を使用できます。記号は使用できません"), _defineProperty(_topic$date$startTime, "passwordHintText", "パスワードは1～10文字で英数字を使用できます。記号は使用できません"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "個人会議IDを使用"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "セキュリティ"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "認証済みユーザーのみ参加可能にする"), _defineProperty(_topic$date$startTime, "signedInUsers", "サインイン済みのユーザー"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "サインイン済みの同僚"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "ホストとモデレータのみが画面を共有可能にする"), _defineProperty(_topic$date$startTime, "lockTooltip", "この設定は会社の管理者により管理されています"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "これらの設定はPMIを使って作成された会議すべてに適用されます"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
