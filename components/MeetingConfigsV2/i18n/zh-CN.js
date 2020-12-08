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
  voIPOnly: "仅网络音频",
  telephonyOnly: "仅电话",
  both: "电话和网络音频",
  meetingId: "会议 ID",
  password: "密码",
  video: "视频",
  audio: "音频",
  scheduleFor: "代表以下人员安排时间："
}, _defineProperty(_voIPOnly$telephonyOn, _Meeting.ASSISTED_USERS_MYSELF, "自己"), _defineProperty(_voIPOnly$telephonyOn, "meetingOptions", "会议选项"), _defineProperty(_voIPOnly$telephonyOn, "meetingSettings", "会议设置"), _defineProperty(_voIPOnly$telephonyOn, "rcMeetingSettings", "视频会议设置"), _defineProperty(_voIPOnly$telephonyOn, "audioOptions", "音频选项"), _defineProperty(_voIPOnly$telephonyOn, "recurringMeeting", "定期会议"), _defineProperty(_voIPOnly$telephonyOn, "recurringNote", "注意：选择“定期”时方可启用此项"), _defineProperty(_voIPOnly$telephonyOn, "joinBeforeHost", "允许参与者在主持人之前加入"), _defineProperty(_voIPOnly$telephonyOn, "turnOffCamera", "关闭参与者的摄像头"), _defineProperty(_voIPOnly$telephonyOn, "turnOffHostCamera", "加入会议时关闭主持人的摄像头"), _defineProperty(_voIPOnly$telephonyOn, "requirePassword", "需要输入密码"), _defineProperty(_voIPOnly$telephonyOn, "setPassword", "设置密码 *"), _defineProperty(_voIPOnly$telephonyOn, "passwordEmptyError", "会议密码为必填项"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordInvalidError", "密码必须包含 1 到 10 个字符和数字，且不能使用除 @、* 或 - 以外的特殊符号"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordHintText", "密码应包含 1 到 10 个字符和数字，且不能使用除 @、* 或 - 以外的特殊符号"), _defineProperty(_voIPOnly$telephonyOn, "usePersonalMeetingId", "使用个人会议 ID"), _defineProperty(_voIPOnly$telephonyOn, "pmiChangeConfirm", "要对个人会议进行更改， "), _defineProperty(_voIPOnly$telephonyOn, "changePmiSettings", "更改 PMI 设置"), _defineProperty(_voIPOnly$telephonyOn, "pmiSettingChangeAlert", "您更改设置并安排会议时间后，使用个人会议 ID 的所有会议都会改为使用最新设置。"), _defineProperty(_voIPOnly$telephonyOn, "lockedTooltip", "此设置由公司管理员管理"), _voIPOnly$telephonyOn); // @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
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
//# sourceMappingURL=zh-CN.js.map
