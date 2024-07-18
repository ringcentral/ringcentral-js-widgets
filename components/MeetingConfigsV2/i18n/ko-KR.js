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
  date: "날짜",
  time: "시간",
  hours: "{howMany}시간",
  minutes: "{howMany}분",
  today: "오늘",
  duration: "지속 시간",
  topic: "모임 제목",
  voIPOnly: "인터넷 오디오만",
  telephonyOnly: "전화만",
  both: "전화 및 인터넷 오디오",
  thirdParty: "타사 오디오",
  meetingId: "모임 ID",
  password: "비밀번호",
  video: "비디오",
  audio: "오디오",
  scheduleFor: "다음 사람 대신 예약"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "나"), _defineProperty(_date$time$hours$minu, "meetingOptions", "모임 옵션"), _defineProperty(_date$time$hours$minu, "meetingSettings", "모임 설정"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Video 모임 설정"), _defineProperty(_date$time$hours$minu, "audioOptions", "오디오 옵션"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "되풀이 모임"), _defineProperty(_date$time$hours$minu, "recurringNote", "참고: '되풀이'를 선택하는 경우 이를 사용하도록 설정하세요."), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "참가자가 호스트보다 먼저 참가하도록 허용"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "참가자 카메라 끄기"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "모임에 참가할 때 호스트용 카메라 끄기"), _defineProperty(_date$time$hours$minu, "requirePassword", "비밀번호 필요"), _defineProperty(_date$time$hours$minu, "enterPassword", "비밀번호 입력"), _defineProperty(_date$time$hours$minu, "setPassword", "비밀번호 설정 *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "모임 비밀번호 필요"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "비밀번호는 1~10자 길이의 문자, 숫자여야 하며 @, * or -를 제외한 기호를 포함할 수 없습니다."), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "비밀번호는 1~10자 길이의 문자, 숫자여야 하며 @, * or -를 제외한 기호를 포함할 수 없습니다."), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "개인 모임 ID 사용"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "개인 모임을 변경하려면 "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "PMI 설정 변경"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "설정을 변경하고 이 모임을 예약하면 개인 모임 ID가 있는 모든 모임이 동일한 최신 설정을 사용합니다."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "이 설정은 회사 관리자가 관리합니다."), _defineProperty(_date$time$hours$minu, "when", "시점"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "참석자에게 보낸 일정 초대장에서 되풀이 또는 반복 일정을 확인하세요."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=ko-KR.js.map
