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
var _scheduleFor$schedule;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_scheduleFor$schedule = {
  scheduleFor: '다음 사람 대신 예약',
  scheduleForAssistedUser: '{userName}님을 대신하여 모임 설정을 업데이트하세요.',
  scheduleForGuidance: '다른 사람을 대신하여 예약을 하시나요?\n1. 예약할 사람의 Outlook 일정에 포함되어 있는지 확인하세요.\n2. 드롭다운에서 예약할 사람을 선택합니다.\n',
  scheduleForGuidanceMore: '자세히 알아보기',
  meetingSettings: '모임 설정',
  meetingSettingsDescription: '업데이트는 이 모임에만 적용됩니다.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, '나'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", '대기실 사용'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", '참가자는 내가 수락할 때까지 대기합니다. 인터뷰나 외부 참석자에 적합합니다.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", '회사 외부 사용자용'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", '로그인하지 않은 사용자용'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", '모든 참가자용'), _defineProperty(_scheduleFor$schedule, "enterPassword", '비밀번호 입력'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", '내가 참가한 후 모임 시작'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", '초기 대화 방지를 위해 내가 참가한 후 모임이 시작됩니다.'), _defineProperty(_scheduleFor$schedule, "requirePassword", '비밀번호 필요'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", '모임을 안전하게 보호하세요. 이 링크를 사용하는 사용자에게는 비밀번호를 입력하라는 메시지가 표시되지 않습니다.'), _defineProperty(_scheduleFor$schedule, "password", '비밀번호:'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", '모임 비밀번호 필요'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", '비밀번호는 1~10자의 문자 및 숫자여야 하며 기호를 포함하지 않아야 합니다.'), _defineProperty(_scheduleFor$schedule, "passwordHintText", '비밀번호는 1~10자의 문자 및 숫자여야 하며 기호를 포함하지 않아야 합니다.'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", '개인 모임 링크 사용'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", '참가할 수 있는 사용자 관리'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", '링크가 있는 모든 사용자'), _defineProperty(_scheduleFor$schedule, "signedInUsers", '{shortName} 계정만'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", '동료만'), _defineProperty(_scheduleFor$schedule, "passwordLabel", '비밀번호'), _defineProperty(_scheduleFor$schedule, "edit", '편집'), _defineProperty(_scheduleFor$schedule, "editSettings", '설정 편집'), _defineProperty(_scheduleFor$schedule, "lockTooltip", '이 설정은 회사 관리자가 관리합니다'), _defineProperty(_scheduleFor$schedule, "cancel", '취소'), _defineProperty(_scheduleFor$schedule, "update", '업데이트'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", '개인 모임 설정'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", '개인 모임 링크에 참가할 수 있는 사람 및 참가 방법을 설정합니다.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"scheduleForAssistedUser"@#@ @source: @#@"Update meetings settings on behalf of {userName}."@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Updates will apply to this meeting only."@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"For all participants"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won't be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"allowMeetingAccess"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"pmiSettingsTitle"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"pmiSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
