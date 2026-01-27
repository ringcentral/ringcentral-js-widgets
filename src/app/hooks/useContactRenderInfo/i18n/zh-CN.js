"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  to: '至',
  from: '自',
  ext: '分机',
  myCallerId: '我的主叫信息',
  callerId: '主叫信息',
  unknownNumber: '未知',
  Inbound: '来电',
  Outbound: '呼出电话',
  activeCall: '通话进行中',
  otherDevice: '在其他设备上',
  onHold: '暂候中',
  day: '天',
  hr: '小时',
  min: '分钟',
  sec: '秒',
  yesterday: '昨天',
  notes: 'AI 笔记',
  logged: '已记录',
  unlogged: '已取消记录',
  answeredBy: '接听方',
  conferenceCall: '电话会议',
  copyNumberSuccess: '号码已复制',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: '已放弃',
  Accepted: '已接听',
  'Answered Not Accepted': '已应答，未接受',
  Blocked: '已屏蔽',
  Busy: '忙线中',
  'Call Failed': '呼叫失败',
  'Call Failure': '呼叫失败',
  'Call connected': '电话接通',
  'Carrier is not active': '运营商未激活',
  Declined: '已拒绝',
  'EDGE trunk misconfigured': 'EDGE 中继配置错误',
  'Fax Not Sent': '传真未发送',
  'Fax Partially Sent': '传真已部分发送',
  'Fax Poor Line': '传真线路不佳',
  'Fax Receipt Error': '传真接收错误',
  'Fax on Demand': '按需传真',
  'Hang Up': '挂断',
  'IP Phone Offline': '网络电话离线',
  'In Progress': '处理中',
  'Internal Error': '内部错误',
  'International Disabled': '国际电话已禁用',
  'International Restricted': '国际电话已限制',
  Missed: '未接',
  'No Answer': '无人接听',
  'No Calling Credit': '无话费余额',
  'Not Allowed': '不允许',
  'Partial Receive': '部分接收',
  'Phone Login': '电话登录',
  'Receive Error': '接收错误',
  Received: '已接收',
  Rejected: '已拒绝',
  Reply: '回复',
  'Restricted Number': '受限号码',
  'Send Error': '发送错误',
  Sent: '已发送',
  'Sent to Voicemail': '已发送到语音信箱',
  Stopped: '已停止',
  'Suspended account': '已暂停帐户',
  Unknown: '未知',
  Voicemail: '语音邮件',
  'Wrong Number': '错误号码',
  // some fields are not in the platform list
  'Answered Elsewhere': '已在别处接听',
  'Ringing Elsewhere': '在别处振铃',
  'Fax Send Error': '传真发送错误',
  Account: '帐户',
  'Call accepted': '电话已接通',
  'Hang up': '挂断',
  'International Restriction': '国际电话限制',
  'No fax machine': '无传真机',
  'Partially Sent': '已部分发送',
  'Poor Line Quality': '线路质量差',
  ResultEmpty: '空白',
  ResultInProgress: '进行中',
  Suspended: '已暂停',
  'Fax Receipt': '传真回执',
  'Suspended Account': '已暂停帐户',
  Disconnected: '已断开连接',
  multiMatchesContactName: '{name} 和另外 {count} 个',
  // #endregion call status
  matches: '{numberOfMatches} 个匹配项',
  maybe: '可能的匹配项：{contactName}',
  optedOut: '接收者已退订。',
  optOutAlertTooltip: '接收者必须重新订阅，才能接收来自此号码的短信。'
}; // @key: @#@"to"@#@ @source: @#@"To"@#@
// @key: @#@"from"@#@ @source: @#@"From"@#@
// @key: @#@"ext"@#@ @source: @#@"Ext."@#@
// @key: @#@"myCallerId"@#@ @source: @#@"My caller ID"@#@
// @key: @#@"callerId"@#@ @source: @#@"Caller ID"@#@
// @key: @#@"unknownNumber"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Inbound"@#@ @source: @#@"Incoming call"@#@
// @key: @#@"Outbound"@#@ @source: @#@"Outgoing call"@#@
// @key: @#@"activeCall"@#@ @source: @#@"Active call"@#@
// @key: @#@"otherDevice"@#@ @source: @#@"On other device"@#@
// @key: @#@"onHold"@#@ @source: @#@"On hold"@#@
// @key: @#@"day"@#@ @source: @#@"day"@#@
// @key: @#@"hr"@#@ @source: @#@"hr"@#@
// @key: @#@"min"@#@ @source: @#@"min"@#@
// @key: @#@"sec"@#@ @source: @#@"sec"@#@
// @key: @#@"yesterday"@#@ @source: @#@"Yesterday"@#@
// @key: @#@"notes"@#@ @source: @#@"AI notes"@#@
// @key: @#@"logged"@#@ @source: @#@"Logged"@#@
// @key: @#@"unlogged"@#@ @source: @#@"Unlogged"@#@
// @key: @#@"answeredBy"@#@ @source: @#@"Answered by"@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"Conference Call"@#@
// @key: @#@"copyNumberSuccess"@#@ @source: @#@"Number copied"@#@
// @key: @#@"'911'"@#@ @source: @#@"911"@#@
// @key: @#@"'933'"@#@ @source: @#@"933"@#@
// @key: @#@"Abandoned"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"Accepted"@#@ @source: @#@"Accepted"@#@
// @key: @#@"'Answered Not Accepted'"@#@ @source: @#@"Answered Not Accepted"@#@
// @key: @#@"Blocked"@#@ @source: @#@"Blocked"@#@
// @key: @#@"Busy"@#@ @source: @#@"Busy"@#@
// @key: @#@"'Call Failed'"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"'Call Failure'"@#@ @source: @#@"Call Failure"@#@
// @key: @#@"'Call connected'"@#@ @source: @#@"Call connected"@#@
// @key: @#@"'Carrier is not active'"@#@ @source: @#@"Carrier is not active"@#@
// @key: @#@"Declined"@#@ @source: @#@"Declined"@#@
// @key: @#@"'EDGE trunk misconfigured'"@#@ @source: @#@"EDGE trunk misconfigured"@#@
// @key: @#@"'Fax Not Sent'"@#@ @source: @#@"Fax Not Sent"@#@
// @key: @#@"'Fax Partially Sent'"@#@ @source: @#@"Fax Partially Sent"@#@
// @key: @#@"'Fax Poor Line'"@#@ @source: @#@"Fax Poor Line"@#@
// @key: @#@"'Fax Receipt Error'"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"'Fax on Demand'"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"'Hang Up'"@#@ @source: @#@"Hang Up"@#@
// @key: @#@"'IP Phone Offline'"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"'In Progress'"@#@ @source: @#@"In Progress"@#@
// @key: @#@"'Internal Error'"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"'International Disabled'"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"'International Restricted'"@#@ @source: @#@"International Restricted"@#@
// @key: @#@"Missed"@#@ @source: @#@"Missed"@#@
// @key: @#@"'No Answer'"@#@ @source: @#@"No Answer"@#@
// @key: @#@"'No Calling Credit'"@#@ @source: @#@"No Calling Credit"@#@
// @key: @#@"'Not Allowed'"@#@ @source: @#@"Not Allowed"@#@
// @key: @#@"'Partial Receive'"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"'Phone Login'"@#@ @source: @#@"Phone Login"@#@
// @key: @#@"'Receive Error'"@#@ @source: @#@"Receive Error"@#@
// @key: @#@"Received"@#@ @source: @#@"Received"@#@
// @key: @#@"Rejected"@#@ @source: @#@"Rejected"@#@
// @key: @#@"Reply"@#@ @source: @#@"Reply"@#@
// @key: @#@"'Restricted Number'"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"'Send Error'"@#@ @source: @#@"Send Error"@#@
// @key: @#@"Sent"@#@ @source: @#@"Sent"@#@
// @key: @#@"'Sent to Voicemail'"@#@ @source: @#@"Sent to Voicemail"@#@
// @key: @#@"Stopped"@#@ @source: @#@"Stopped"@#@
// @key: @#@"'Suspended account'"@#@ @source: @#@"Suspended account"@#@
// @key: @#@"Unknown"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Voicemail"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"'Wrong Number'"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"'Answered Elsewhere'"@#@ @source: @#@"Answered elsewhere"@#@
// @key: @#@"'Ringing Elsewhere'"@#@ @source: @#@"Ringing elsewhere"@#@
// @key: @#@"'Fax Send Error'"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"Account"@#@ @source: @#@"Account"@#@
// @key: @#@"'Call accepted'"@#@ @source: @#@"Call accepted"@#@
// @key: @#@"'Hang up'"@#@ @source: @#@"Hang up"@#@
// @key: @#@"'International Restriction'"@#@ @source: @#@"International Restriction"@#@
// @key: @#@"'No fax machine'"@#@ @source: @#@"No fax machine"@#@
// @key: @#@"'Partially Sent'"@#@ @source: @#@"Partially Sent"@#@
// @key: @#@"'Poor Line Quality'"@#@ @source: @#@"Poor Line Quality"@#@
// @key: @#@"ResultEmpty"@#@ @source: @#@"empty"@#@
// @key: @#@"ResultInProgress"@#@ @source: @#@"In Progress"@#@
// @key: @#@"Suspended"@#@ @source: @#@"Suspended"@#@
// @key: @#@"'Fax Receipt'"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"'Suspended Account'"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"Disconnected"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"multiMatchesContactName"@#@ @source: @#@"{name} and {count} more"@#@
// @key: @#@"matches"@#@ @source: @#@"{numberOfMatches} matches"@#@
// @key: @#@"maybe"@#@ @source: @#@"Maybe: {contactName}"@#@
// @key: @#@"optedOut"@#@ @source: @#@"Recipient has opted out."@#@
// @key: @#@"optOutAlertTooltip"@#@ @source: @#@"The recipient must opt back in to receive texts from this number."@#@
//# sourceMappingURL=zh-CN.js.map
