"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  to: '至',
  from: '從',
  ext: '分機',
  myCallerId: '我的來電者 ID',
  callerId: '來電者 ID',
  unknownNumber: '未知',
  Inbound: '來電',
  Outbound: '外發通話',
  activeCall: '進行中的通話',
  otherDevice: '在其他裝置上',
  onHold: '暫候中',
  day: '天',
  hr: '小時',
  min: '分鐘',
  sec: '秒',
  yesterday: '昨天',
  notes: 'AI 筆記',
  logged: '已記錄',
  unlogged: '已取消記錄',
  answeredBy: '接聽者',
  conferenceCall: '電話會議',
  copyNumberSuccess: '已複製號碼',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: '已棄置',
  Accepted: '已接受',
  'Answered Not Accepted': '已應答但未接受',
  Blocked: '已封鎖',
  Busy: '忙線中',
  'Call Failed': '通話失敗',
  'Call Failure': '通話錯誤',
  'Call connected': '通話已連線',
  'Carrier is not active': '電信業者未啟用',
  Declined: '已遭拒',
  'EDGE trunk misconfigured': 'EDGE 中繼配置錯誤',
  'Fax Not Sent': '傳真未傳送',
  'Fax Partially Sent': '傳真已部分傳送',
  'Fax Poor Line': '傳真線路不佳',
  'Fax Receipt Error': '傳真接收錯誤',
  'Fax on Demand': '隨選傳真',
  'Hang Up': '掛斷',
  'IP Phone Offline': '網路電話離線',
  'In Progress': '進行中',
  'Internal Error': '內部錯誤',
  'International Disabled': '國際電話已停用',
  'International Restricted': '國際電話受限制',
  Missed: '未接',
  'No Answer': '無人接聽',
  'No Calling Credit': '無通話資費',
  'Not Allowed': '不允許',
  'Partial Receive': '部分接收',
  'Phone Login': '電話登入',
  'Receive Error': '接收錯誤',
  Received: '已接收',
  Rejected: '已拒絕',
  Reply: '回覆',
  'Restricted Number': '受限制號碼',
  'Send Error': '傳送錯誤',
  Sent: '已傳送',
  'Sent to Voicemail': '轉語音信箱',
  Stopped: '已停止',
  'Suspended account': '已暫止的帳戶',
  Unknown: '未知',
  Voicemail: '語音訊息',
  'Wrong Number': '錯誤號碼',
  // some fields are not in the platform list
  'Answered Elsewhere': '已在別處接聽',
  'Ringing Elsewhere': '在別處響鈴',
  'Fax Send Error': '傳真傳送錯誤',
  Account: '帳戶',
  'Call accepted': '已接聽通話',
  'Hang up': '掛斷',
  'International Restriction': '國際電話限制',
  'No fax machine': '無傳真機',
  'Partially Sent': '已部分傳送',
  'Poor Line Quality': '線路品質不佳',
  ResultEmpty: '空白',
  ResultInProgress: '進行中',
  Suspended: '已暫止',
  'Fax Receipt': '傳真回條',
  'Suspended Account': '已暫止帳戶',
  Disconnected: '已中斷連線',
  multiMatchesContactName: '{name} 和其他 {count} 個',
  // #endregion call status
  matches: '{numberOfMatches} 個符合項目',
  maybe: '可能符合：{contactName}',
  optedOut: '收件者已退訂。',
  optOutAlertTooltip: '收件者必須重新訂閱，才能接收此號碼傳送的簡訊。'
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
//# sourceMappingURL=zh-TW.js.map
