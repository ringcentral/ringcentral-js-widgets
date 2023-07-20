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
var _topic$date$startTime;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_topic$date$startTime = {
  topic: "会议标题",
  date: "日期",
  startTime: "时间",
  duration: "时长",
  scheduleFor: "代表以下人员安排：",
  meetingSettings: "会议设置"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "我自己"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "允许参与者在主持人之前加入"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "启用等候室"), _defineProperty(_topic$date$startTime, "waitingRoom", "为以下人员启用等候室"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "我公司以外的任何人员"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "任何未登录的人员"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "所有人"), _defineProperty(_topic$date$startTime, "enterPassword", "输入密码"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "参与者只能在我之后加入"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "参与者只能在主持人之后加入"), _defineProperty(_topic$date$startTime, "muteAudio", "为参与者静音"), _defineProperty(_topic$date$startTime, "turnOffCamera", "关闭参与者的摄像头"), _defineProperty(_topic$date$startTime, "requirePassword", "需要输入密码"), _defineProperty(_topic$date$startTime, "useE2ee", "使用端到端加密"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "端到端加密会议的私密性最强，但无法使用通过电话加入、隐藏式字幕和录制等功能。"), _defineProperty(_topic$date$startTime, "setPassword", "设置密码*"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "设置密码"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "会议密码为必填项"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "密码必须包含 1 到 10 个字母和数字，但不能包含特殊符号"), _defineProperty(_topic$date$startTime, "passwordHintText", "您的密码应为 1 到 10 个字母和数字，但不能包含特殊符号"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "使用个人会议 ID"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "安全性"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "只有经过身份验证的用户才能加入"), _defineProperty(_topic$date$startTime, "signedInUsers", "已登录的用户"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "已登录的同事"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "仅主持人和代理主持人可以共享屏幕"), _defineProperty(_topic$date$startTime, "lockTooltip", "此设置由公司管理员管理"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "这些设置将应用到使用 PMI 创建的所有会议"), _defineProperty(_topic$date$startTime, "today", "今天"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "要为其他人安排会议？\n1. 请确保您在他们的 Outlook 日历中。\n2. 从下拉列表中选择您要为其安排会议的人。\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "了解详情"), _defineProperty(_topic$date$startTime, "changePmiSettings", "更改个人会议设置"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "请注意，2022 年 2 月 16 日之后，{appName} 将无法再在 Internet Explorer 11 中使用。我们建议您改用 Microsoft Edge，或者更新到 Outlook 2016 或更高版本。"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
// @key: @#@"useE2ee"@#@ @source: @#@"Use end-to-end encryption"@#@
// @key: @#@"e2eeTooltip"@#@ @source: @#@"End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."@#@
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
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
