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
  scheduleFor: '代表以下對象進行排程',
  scheduleForAssistedUser: '代表 {userName} 更新會議設定。',
  scheduleForGuidance: '要為其他人排程嗎？\n1. 請確認您在他們的 Outlook 行事曆中。\n2. 從下拉選單中選取您要幫助其排程的人員。\n',
  scheduleForGuidanceMore: '瞭解詳細資訊',
  meetingSettings: '會議設定',
  meetingSettingsDescription: '更新將僅套用至此會議。'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, '我本人'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", '使用等候室'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", '參與者需要一直等待，等到您准許他們加入。非常適合面試或邀請外部與會者參加。'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", '適用於公司以外的任何人'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", '適用於任何未登入的人'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", '適用於所有參與者'), _defineProperty(_scheduleFor$schedule, "enterPassword", '輸入密碼'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", '在您加入後開始會議'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", '為了防止對話提前進行，會議將在您加入後開始。'), _defineProperty(_scheduleFor$schedule, "requirePassword", '需要密碼'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", '確保會議安全。系統不會提示使用該連結的任何人輸入密碼。'), _defineProperty(_scheduleFor$schedule, "password", '密碼：'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", '需要會議密碼'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", '您的密碼須為 1 到 10 個字母和數字，但不得包含任何符號'), _defineProperty(_scheduleFor$schedule, "passwordHintText", '您的密碼應為 1 到 10 個字母和數字，但不得包含任何符號。'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", '使用個人會議連結'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", '管理哪些人可加入'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", '收到連結的任何人'), _defineProperty(_scheduleFor$schedule, "signedInUsers", '僅限 {shortName} 帳戶'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", '僅限我的同事'), _defineProperty(_scheduleFor$schedule, "passwordLabel", '密碼'), _defineProperty(_scheduleFor$schedule, "edit", '編輯'), _defineProperty(_scheduleFor$schedule, "editSettings", '編輯設定'), _defineProperty(_scheduleFor$schedule, "lockTooltip", '此設定由公司管理員管理'), _defineProperty(_scheduleFor$schedule, "cancel", '取消'), _defineProperty(_scheduleFor$schedule, "update", '更新'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", '個人會議設定'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", '設定哪些人可以使用您的個人會議連結加入，以及如何加入。'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
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
//# sourceMappingURL=zh-TW.js.map
