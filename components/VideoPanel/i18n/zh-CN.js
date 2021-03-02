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
  topic: "会议标题",
  date: "日期",
  startTime: "时间",
  duration: "持续时间",
  scheduleFor: "代表以下人员安排时间：",
  meetingSettings: "会议设置"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "自己"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "允许参与者在主持人之前加入"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "启用等候室"), _defineProperty(_topic$date$startTime, "waitingRoom", "为以下人员启用等候室："), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "我公司以外的任何人员"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "任何未登录的人员"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "所有人"), _defineProperty(_topic$date$startTime, "enterPassword", "输入密码"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "参与者只能在我之后加入"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "参与者只能在主持人之后加入"), _defineProperty(_topic$date$startTime, "muteAudio", "参与者音频静音"), _defineProperty(_topic$date$startTime, "turnOffCamera", "关闭参与者的摄像头"), _defineProperty(_topic$date$startTime, "requirePassword", "需要输入密码"), _defineProperty(_topic$date$startTime, "setPassword", "设置密码 *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "设置密码"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "会议密码为必填项"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "密码必须包含 1 到 10 个字母和数字，但不能包含特殊符号"), _defineProperty(_topic$date$startTime, "passwordHintText", "密码应包含 1 到 10 个字母和数字，但不能包含特殊符号"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "使用个人会议 ID"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "安全"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "只有经过身份验证的用户才能加入"), _defineProperty(_topic$date$startTime, "signedInUsers", "已登录的用户"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "已登录的同事"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "只有主持人和管理员可以共享屏幕"), _defineProperty(_topic$date$startTime, "lockTooltip", "此设置由公司管理员管理"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "这些设置将应用到使用 PMI 创建的所有会议"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=zh-CN.js.map
