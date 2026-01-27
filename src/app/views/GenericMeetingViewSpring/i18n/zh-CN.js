"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  video: '视频',
  meetingTitle: '会议标题',
  date: '日期',
  time: '时间',
  duration: '时长',
  scheduleVideoMeeting: '安排视频会议',
  requirePassword: '需要输入密码',
  requirePasswordDescription: '确保您的会议安全。使用该链接的任何人都不会收到输入密码的提示。',
  password: '密码',
  edit: '编辑',
  noPasswordSet: '未设置密码',
  manageWhoCanJoin: '管理哪些人可以加入',
  useWaitingRoom: '使用等候室',
  useWaitingRoomDescription: '参与者需要一直等待，直到您允许他们加入。非常适合面试或邀请外部与会者参加。',
  startMeetingAfterJoin: '在您加入后开始会议',
  startMeetingAfterJoinDescription: '会议将在您加入后开始，以防止对话提前进行。',
  usePersonalMeetingLink: '使用个人会议链接',
  personalMeetingLink: '个人会议链接',
  editSettings: '编辑设置',
  scheduleMeeting: '安排会议',
  cancel: '取消',
  update: '更新',
  updating: '正在更新...',
  passwordFormatError: '密码必须包含 1 到 10 个字母和数字，但不能包含任何符号',
  passwordRequiredError: '密码为必填项',
  updatePassword: '更新密码',
  passwordRequired: '密码为必填项',
  passwordValidationHint: '输入长度为 1-10 个字符的密码（仅限字母和数字）',
  anyoneWithLink: '收到链接的任何人',
  onlyRingCentralAccounts: '仅限 {shortName} 帐户',
  onlyMyCoworkers: '仅限我的同事',
  allParticipants: '所有参与者',
  forAnyoneOutsideMyCompany: '适用于我公司以外的所有人',
  forAnyoneNotSignedIn: '适用于未登录的所有人',
  personalMeetingSettings: '个人会议设置',
  personalMeetingSettingsDescription: '设置哪些人可以使用您的个人会议链接加入以及如何加入。',
  hour: '小时',
  minute: '分钟',
  adminLockedSetting: '此设置由公司管理员管理',
  passwordPlaceholder: '输入密码'
}; // @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"meetingTitle"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleVideoMeeting"@#@ @source: @#@"Schedule video meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won’t be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"noPasswordSet"@#@ @source: @#@"No password set"@#@
// @key: @#@"manageWhoCanJoin"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"useWaitingRoom"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"useWaitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"startMeetingAfterJoin"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"startMeetingAfterJoinDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"usePersonalMeetingLink"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"personalMeetingLink"@#@ @source: @#@"Personal meeting link"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"scheduleMeeting"@#@ @source: @#@"Schedule meeting"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"updating"@#@ @source: @#@"Updating..."@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordRequiredError"@#@ @source: @#@"Password is required"@#@
// @key: @#@"updatePassword"@#@ @source: @#@"Update Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordValidationHint"@#@ @source: @#@"Enter a password 1-10 characters long (letters and numbers only)"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"onlyRingCentralAccounts"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"onlyMyCoworkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"allParticipants"@#@ @source: @#@"All participants"@#@
// @key: @#@"forAnyoneOutsideMyCompany"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"forAnyoneNotSignedIn"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"personalMeetingSettings"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"personalMeetingSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
// @key: @#@"hour"@#@ @source: @#@"hr"@#@
// @key: @#@"minute"@#@ @source: @#@"min"@#@
// @key: @#@"adminLockedSetting"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"passwordPlaceholder"@#@ @source: @#@"Enter Password"@#@
//# sourceMappingURL=zh-CN.js.map
