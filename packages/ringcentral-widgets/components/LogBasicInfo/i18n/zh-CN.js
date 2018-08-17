import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';

export default {
  [callDirections.inbound]: "入站",
  [callDirections.outbound]: "出站",
  status: "状态：",
  InboundNumber: "主叫显示号码：",
  OutboundNumber: "被叫：",
  InboundDirection: "呼入自：",
  OutboundDirection: "呼出至：",
  [telephonyStatuses.noCall]: "已断开连接",
  [telephonyStatuses.callConnected]: "已连接",
  [telephonyStatuses.ringing]: "正在响铃",
  [telephonyStatuses.onHold]: "等候接听",
  [telephonyStatuses.parkedCall]: "已寄存",
  [callResults.unknown]: "未知",
  [callResults.missed]: "未接",
  [callResults.callAccepted]: "已接",
  [callResults.accepted]: "已接",
  [callResults.voicemail]: "语音邮件",
  [callResults.rejected]: "已拒绝",
  [callResults.reply]: "回复",
  [callResults.received]: "已接收",
  [callResults.faxReceiptError]: "传真接收错误",
  [callResults.faxOnDemand]: "按需传真",
  [callResults.partialReceive]: "部分接收",
  [callResults.blocked]: "已阻止",
  [callResults.callConnected]: "已断开连接",
  [callResults.noAnswer]: "无人接听",
  [callResults.internationalDisabled]: "国际功能已停用",
  [callResults.busy]: "忙碌",
  [callResults.faxSendError]: "传真发送错误",
  [callResults.sent]: "已发送",
  [callResults.callFailed]: "呼叫失败",
  [callResults.internalError]: "内部错误",
  [callResults.IPPhoneOffline]: "网络电话离线",
  [callResults.restrictedNumber]: "限制号码",
  [callResults.wrongNumber]: "错误号码",
  [callResults.stopped]: "已停止",
  [callResults.suspendedAccount]: "已暂停账户",
  [callResults.hangUp]: "已挂断",
  [callResults.HangUp]: "已挂断",
  [callResults.abandoned]: "已放弃",
  [callResults.declined]: "已拒绝",
  [callResults.faxReceipt]: "传真接收",
  [callResults.disconnected]: "已断开连接"
};

// @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
// @key: @#@"[callDirections.outbound]"@#@ @source: @#@"Outbound"@#@
// @key: @#@"status"@#@ @source: @#@"Status:"@#@
// @key: @#@"InboundNumber"@#@ @source: @#@"Caller Id:"@#@
// @key: @#@"OutboundNumber"@#@ @source: @#@"Called:"@#@
// @key: @#@"InboundDirection"@#@ @source: @#@"Inbound from:"@#@
// @key: @#@"OutboundDirection"@#@ @source: @#@"Outbound to:"@#@
// @key: @#@"[telephonyStatuses.noCall]"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"[telephonyStatuses.callConnected]"@#@ @source: @#@"Connected"@#@
// @key: @#@"[telephonyStatuses.ringing]"@#@ @source: @#@"Ringing"@#@
// @key: @#@"[telephonyStatuses.onHold]"@#@ @source: @#@"On Hold"@#@
// @key: @#@"[telephonyStatuses.parkedCall]"@#@ @source: @#@"Parked"@#@
// @key: @#@"[callResults.unknown]"@#@ @source: @#@"Unknown"@#@
// @key: @#@"[callResults.missed]"@#@ @source: @#@"Missed"@#@
// @key: @#@"[callResults.callAccepted]"@#@ @source: @#@"Answered"@#@
// @key: @#@"[callResults.accepted]"@#@ @source: @#@"Answered"@#@
// @key: @#@"[callResults.voicemail]"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"[callResults.rejected]"@#@ @source: @#@"Declined"@#@
// @key: @#@"[callResults.reply]"@#@ @source: @#@"Reply"@#@
// @key: @#@"[callResults.received]"@#@ @source: @#@"Received"@#@
// @key: @#@"[callResults.faxReceiptError]"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"[callResults.faxOnDemand]"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"[callResults.partialReceive]"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"[callResults.blocked]"@#@ @source: @#@"Blocked"@#@
// @key: @#@"[callResults.callConnected]"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"[callResults.noAnswer]"@#@ @source: @#@"No Answer"@#@
// @key: @#@"[callResults.internationalDisabled]"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"[callResults.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[callResults.faxSendError]"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"[callResults.sent]"@#@ @source: @#@"Sent"@#@
// @key: @#@"[callResults.callFailed]"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"[callResults.internalError]"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"[callResults.IPPhoneOffline]"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"[callResults.restrictedNumber]"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"[callResults.wrongNumber]"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"[callResults.stopped]"@#@ @source: @#@"Stopped"@#@
// @key: @#@"[callResults.suspendedAccount]"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"[callResults.hangUp]"@#@ @source: @#@"Hung up"@#@
// @key: @#@"[callResults.HangUp]"@#@ @source: @#@"Hung up"@#@
// @key: @#@"[callResults.abandoned]"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"[callResults.declined]"@#@ @source: @#@"Declined"@#@
// @key: @#@"[callResults.faxReceipt]"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"[callResults.disconnected]"@#@ @source: @#@"Disconnected"@#@
