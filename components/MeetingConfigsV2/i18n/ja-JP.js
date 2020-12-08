"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _voIPOnly$telephonyOn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_voIPOnly$telephonyOn = {
  voIPOnly: "インターネット音声のみ",
  telephonyOnly: "電話のみ",
  both: "電話およびインターネット音声",
  meetingId: "会議ID",
  password: "パスワード",
  video: "ビデオ",
  audio: "音声",
  scheduleFor: "次のユーザーに代わってスケジュールする"
}, _defineProperty(_voIPOnly$telephonyOn, _Meeting.ASSISTED_USERS_MYSELF, "自分"), _defineProperty(_voIPOnly$telephonyOn, "meetingOptions", "会議オプション"), _defineProperty(_voIPOnly$telephonyOn, "meetingSettings", "会議設定"), _defineProperty(_voIPOnly$telephonyOn, "rcMeetingSettings", "ビデオ会議の設定"), _defineProperty(_voIPOnly$telephonyOn, "audioOptions", "音声オプション"), _defineProperty(_voIPOnly$telephonyOn, "recurringMeeting", "定例会議"), _defineProperty(_voIPOnly$telephonyOn, "recurringNote", "注意：「反復」を選択する場合はこのオプションを有効にします"), _defineProperty(_voIPOnly$telephonyOn, "joinBeforeHost", "ホストより早く参加者が参加することを許可する"), _defineProperty(_voIPOnly$telephonyOn, "turnOffCamera", "参加者のカメラをオフにする"), _defineProperty(_voIPOnly$telephonyOn, "turnOffHostCamera", "会議への参加時にホストのカメラをオフにする"), _defineProperty(_voIPOnly$telephonyOn, "requirePassword", "パスワードを必須にする"), _defineProperty(_voIPOnly$telephonyOn, "setPassword", "パスワードを設定*"), _defineProperty(_voIPOnly$telephonyOn, "passwordEmptyError", "会議パスワードが必要です"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordInvalidError", "パスワードの長さは1～10文字で、文字および数字と@*-のみ使用できます"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordHintText", "パスワードの長さは1～10文字で、文字および数字と@*-のみ使用できます"), _defineProperty(_voIPOnly$telephonyOn, "usePersonalMeetingId", "個人会議IDを使用"), _defineProperty(_voIPOnly$telephonyOn, "pmiChangeConfirm", "個人会議に変更を加える場合は、 "), _defineProperty(_voIPOnly$telephonyOn, "changePmiSettings", "PMI設定を変更します"), _defineProperty(_voIPOnly$telephonyOn, "pmiSettingChangeAlert", "設定を変更してこの会議をスケジュールする場合は、個人会議IDのある会議すべてで同じ最新の設定が使用されます。"), _defineProperty(_voIPOnly$telephonyOn, "lockedTooltip", "この設定は会社の管理者により管理されています"), _voIPOnly$telephonyOn); // @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet Audio"@#@
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
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
