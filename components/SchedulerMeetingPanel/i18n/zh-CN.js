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
  scheduleFor: '代表以下人员安排时间：',
  scheduleForAssistedUser: '代表 {userName} 更新会议设置。',
  scheduleForGuidance: '要为其他人安排会议？\n1. 请确保您在他们的 Outlook 日历中。\n2. 从下拉列表中选择您要为其安排会议的人。\n',
  scheduleForGuidanceMore: '了解详情',
  meetingSettings: '会议设置',
  meetingSettingsDescription: '更新将仅适用于此会议。'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, '我本人'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", '使用等候室'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", '参与者需要一直等待，直到您允许他们加入。非常适合面试或邀请外部与会者参加。'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", '适用于我公司以外的所有人'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", '适用于未登录的所有人'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", '适用于所有参会者'), _defineProperty(_scheduleFor$schedule, "enterPassword", '输入密码'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", '在您加入后开始会议'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", '会议将在您加入后开始，以防止对话提前进行。'), _defineProperty(_scheduleFor$schedule, "requirePassword", '需要输入密码'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", '确保您的会议安全。使用该链接的任何人都不会收到输入密码的提示。'), _defineProperty(_scheduleFor$schedule, "password", '密码：'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", '会议密码为必填项'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", '密码必须包含 1 到 10 个字母和数字，但不能包含特殊符号'), _defineProperty(_scheduleFor$schedule, "passwordHintText", '密码应包含 1 到 10 个字母和数字，但不能包含特殊符号'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", '使用个人会议链接'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", '管理哪些人可以加入'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", '收到链接的任何人'), _defineProperty(_scheduleFor$schedule, "signedInUsers", '仅限 {shortName} 帐户'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", '仅限我的同事'), _defineProperty(_scheduleFor$schedule, "passwordLabel", '密码'), _defineProperty(_scheduleFor$schedule, "edit", '编辑'), _defineProperty(_scheduleFor$schedule, "editSettings", '编辑设置'), _defineProperty(_scheduleFor$schedule, "lockTooltip", '此设置由公司管理员管理'), _defineProperty(_scheduleFor$schedule, "cancel", '取消'), _defineProperty(_scheduleFor$schedule, "update", '更新'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", '个人会议设置'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", '设置哪些人可以使用您的个人会议链接加入以及如何加入。'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
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
//# sourceMappingURL=zh-CN.js.map
