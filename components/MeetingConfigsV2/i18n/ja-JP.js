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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_date$time$hours$minu = {
  date: '日付',
  time: '時間',
  hours: '{howMany}時間',
  minutes: '{howMany}分',
  today: '今日',
  duration: '期間',
  topic: '会議タイトル',
  voIPOnly: 'インターネット音声のみ',
  telephonyOnly: '電話のみ',
  both: '電話とインターネットの音声',
  thirdParty: 'サードパーティー製オーディオ',
  meetingId: '会議ID',
  password: 'パスワード',
  video: 'ビデオ',
  audio: '音声',
  scheduleFor: '次のユーザーに代わってスケジュールする'
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, '自分'), _defineProperty(_date$time$hours$minu, "meetingOptions", '会議オプション'), _defineProperty(_date$time$hours$minu, "meetingSettings", '会議設定'), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", 'ビデオ会議の設定'), _defineProperty(_date$time$hours$minu, "audioOptions", '音声オプション'), _defineProperty(_date$time$hours$minu, "recurringMeeting", '定例会議'), _defineProperty(_date$time$hours$minu, "recurringNote", '注意：「反復」を選択する場合はこのオプションを有効にします'), _defineProperty(_date$time$hours$minu, "joinBeforeHost", 'ホストより早く参加者が参加することを許可する'), _defineProperty(_date$time$hours$minu, "turnOffCamera", '参加者のカメラをオフにする'), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", '会議への参加時にホストのカメラをオフにする'), _defineProperty(_date$time$hours$minu, "requirePassword", 'パスワードが必要です'), _defineProperty(_date$time$hours$minu, "enterPassword", 'パスワードを入力'), _defineProperty(_date$time$hours$minu, "setPassword", 'パスワードを設定*'), _defineProperty(_date$time$hours$minu, "passwordEmptyError", '会議パスワードが必要です'), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", 'パスワードは1～10文字で英数字と@*-のみ使用できます'), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", 'パスワードは1～10文字で英数字と@*-のみ使用できます'), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", '個人会議IDを使用'), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", '個人会議に変更を加える場合は、 '), _defineProperty(_date$time$hours$minu, "changePmiSettings", 'PMI設定を変更します'), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", '設定を変更してこの会議をスケジュールする場合は、個人会議IDのある会議すべてで同じ最新の設定が使用されます。'), _defineProperty(_date$time$hours$minu, "lockedTooltip", 'この設定は会社の管理者により管理されています'), _defineProperty(_date$time$hours$minu, "when", '日時'), _defineProperty(_date$time$hours$minu, "recurringDescribe", '出席者に対するカレンダーの招待で、会議が定期的に、または繰り返し設定されていることを確認してください。'), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=ja-JP.js.map
