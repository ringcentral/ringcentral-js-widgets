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
  topic: "모임 제목",
  date: "날짜",
  startTime: "시간",
  duration: "지속 시간",
  scheduleFor: "다음 사람 대신 예약",
  meetingSettings: "모임 설정"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "나"), _defineProperty(_topic$date$startTime, "rcMeetingSettings", "화상 모임 설정"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "참가자가 호스트보다 먼저 참가하도록 허용"), _defineProperty(_topic$date$startTime, "waitingRoom", "다음 기간에 대기실 사용"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "회사 외부의 사람"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "로그인하지 않은 사람"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "모두"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "참가자는 내가 참가한 이후에만 참가할 수 있습니다."), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "참가자는 호스트가 참가한 이후에만 참가할 수 있습니다."), _defineProperty(_topic$date$startTime, "muteAudio", "참가자의 오디오 음소거"), _defineProperty(_topic$date$startTime, "turnOffCamera", "참가자의 카메라 끄기"), _defineProperty(_topic$date$startTime, "requirePassword", "비밀번호가 필요함"), _defineProperty(_topic$date$startTime, "setPassword", "비밀번호 설정 *"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "모임 비밀번호 필요"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "영문자와 숫자를 포함하지만 기호를 포함하지 않는 1~10자 사용"), _defineProperty(_topic$date$startTime, "passwordHintText", "비밀번호는 1~10자의 문자 및 숫자여야 하며 기호를 포함하지 않아야 합니다."), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "개인 모임 ID 사용"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "보안"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "인증된 사용자만 참가할 수 있습니다."), _defineProperty(_topic$date$startTime, "signedInUsers", "로그인한 사용자"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "로그인한 동료"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "호스트 및 중재자만 화면을 공유할 수 있습니다."), _defineProperty(_topic$date$startTime, "lockTooltip", "이 설정은 회사 관리자가 관리합니다."), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "이 설정은 PMI로 생성된 모든 모임에 적용됩니다."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Use 1 to 10 characters which include alphabets and numbers but no symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but not contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
