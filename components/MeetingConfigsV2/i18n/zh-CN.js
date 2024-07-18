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
  date: "日期",
  time: "时间",
  hours: "{howMany} 小时",
  minutes: "{howMany} 分钟",
  today: "今天",
  duration: "时长",
  topic: "会议标题",
  voIPOnly: "仅网络音频",
  telephonyOnly: "仅电话",
  both: "电话和网络音频",
  thirdParty: "第三方音频",
  meetingId: "会议 ID",
  password: "密码",
  video: "视频",
  audio: "音频",
  scheduleFor: "代表以下人员安排时间："
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "我自己"), _defineProperty(_date$time$hours$minu, "meetingOptions", "会议选项"), _defineProperty(_date$time$hours$minu, "meetingSettings", "会议设置"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "视频会议设置"), _defineProperty(_date$time$hours$minu, "audioOptions", "音频选项"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "定期会议"), _defineProperty(_date$time$hours$minu, "recurringNote", "注意：选择“定期”时方可启用此项"), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "允许参与者在主持人之前加入"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "关闭参与者的摄像头"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "加入会议时关闭主持人的摄像头"), _defineProperty(_date$time$hours$minu, "requirePassword", "需要输入密码"), _defineProperty(_date$time$hours$minu, "enterPassword", "输入密码"), _defineProperty(_date$time$hours$minu, "setPassword", "设置密码 *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "会议密码为必填项"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "密码必须包含 1 到 10 个字符和数字，且不能使用除 @、* 或 - 以外的特殊符号"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "密码应包含 1 到 10 个字符和数字，且不能使用除 @、* 或 - 以外的特殊符号"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "使用个人会议 ID"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "要对个人会议进行更改， "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "更改 PMI 设置"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "您更改设置并安排会议时间后，使用个人会议 ID 的所有会议都会改为使用最新设置。"), _defineProperty(_date$time$hours$minu, "lockedTooltip", "此设置由公司管理员管理"), _defineProperty(_date$time$hours$minu, "when", "时间"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "请记得检查通过日历向参与者发送的邀请中是否存在重复。"), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=zh-CN.js.map
