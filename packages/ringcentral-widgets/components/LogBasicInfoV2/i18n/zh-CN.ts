import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
export default {
  [callDirections.inbound]: "入站",
  [callDirections.outbound]: "呼出",
  status: "状态：",
  InboundNumber: "主叫信息显示：",
  OutboundNumber: "被叫：",
  InboundDirection: "呼入自：",
  OutboundDirection: "呼出至：",
  [telephonyStatuses.noCall]: "已断开连接",
  [telephonyStatuses.callConnected]: "已接通",
  [telephonyStatuses.ringing]: "正在振铃",
  [telephonyStatuses.onHold]: "保持",
  [telephonyStatuses.parkedCall]: "已寄存",
  [callResults.unknown]: "未知",
  [callResults.missed]: "未接",
  [callResults.callAccepted]: "已接",
  [callResults.accepted]: "已接",
  [callResults.voicemail]: "语音信箱",
  [callResults.rejected]: "已拒绝",
  [callResults.reply]: "回复",
  [callResults.received]: "已接听",
  [callResults.faxReceiptError]: "传真接收错误",
  [callResults.faxOnDemand]: "按需传真",
  [callResults.partialReceive]: "部分接听",
  [callResults.blocked]: "阻止显示主叫信息",
  [callResults.callConnected]: "呼叫已接通",
  [callResults.noAnswer]: "无人接听",
  [callResults.internationalDisabled]: "国际电话已禁用",
  [callResults.busy]: "忙碌",
  [callResults.faxSendError]: "传真发送错误",
  [callResults.sent]: "已发送",
  [callResults.callFailed]: "呼叫失败",
  [callResults.internalError]: "内部错误",
  [callResults.IPPhoneOffline]: "VoIP 离线",
  [callResults.restrictedNumber]: "限制号码",
  [callResults.wrongNumber]: "错误号码",
  [callResults.stopped]: "已停止",
  [callResults.suspendedAccount]: "已暂停帐户",
  [callResults.hangUp]: "已挂断",
  [callResults.HangUp]: "已挂断",
  [callResults.abandoned]: "已放弃",
  [callResults.declined]: "已拒绝",
  [callResults.faxReceipt]: "传真接收",
  [callResults.disconnected]: "已断开连接",
  [callResults.notAllowed]: "不允许",
  warmTransferSwitchCall: "切换呼叫"
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
// @key: @#@"[callResults.callConnected]"@#@ @source: @#@"Call connected"@#@
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
// @key: @#@"[callResults.notAllowed]"@#@ @source: @#@"Not Allowed"@#@
// @key: @#@"warmTransferSwitchCall"@#@ @source: @#@"Switch calls"@#@
