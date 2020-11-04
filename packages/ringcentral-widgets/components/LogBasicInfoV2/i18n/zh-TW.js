import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';
export default {
  [callDirections.inbound]: "撥入電話",
  [callDirections.outbound]: "撥出電話",
  status: "狀態：",
  InboundNumber: "來電者 ID：",
  OutboundNumber: "已撥號：",
  InboundDirection: "撥入電話自：",
  OutboundDirection: "撥出電話至：",
  [telephonyStatuses.noCall]: "中斷連接",
  [telephonyStatuses.callConnected]: "已連線",
  [telephonyStatuses.ringing]: "鈴響",
  [telephonyStatuses.onHold]: "等待接通",
  [telephonyStatuses.parkedCall]: "已寄存",
  [callResults.unknown]: "未知",
  [callResults.missed]: "未接",
  [callResults.callAccepted]: "已接聽",
  [callResults.accepted]: "已接聽",
  [callResults.voicemail]: "語音信箱",
  [callResults.rejected]: "已遭拒",
  [callResults.reply]: "回覆",
  [callResults.received]: "已接收",
  [callResults.faxReceiptError]: "傳真接收錯誤",
  [callResults.faxOnDemand]: "隨選傳真",
  [callResults.partialReceive]: "部分接收",
  [callResults.blocked]: "已封鎖",
  [callResults.callConnected]: "通話已接通",
  [callResults.noAnswer]: "無人接聽",
  [callResults.internationalDisabled]: "國際電話已停用",
  [callResults.busy]: "忙碌",
  [callResults.faxSendError]: "傳真傳送錯誤",
  [callResults.sent]: "已傳送",
  [callResults.callFailed]: "通話失敗",
  [callResults.internalError]: "內部錯誤",
  [callResults.IPPhoneOffline]: "網路電話離線",
  [callResults.restrictedNumber]: "受限制號碼",
  [callResults.wrongNumber]: "錯誤號碼",
  [callResults.stopped]: "已停止",
  [callResults.suspendedAccount]: "已暫停帳戶",
  [callResults.hangUp]: "掛斷",
  [callResults.HangUp]: "掛斷",
  [callResults.abandoned]: "已棄置",
  [callResults.declined]: "已遭拒",
  [callResults.faxReceipt]: "傳真接收",
  [callResults.disconnected]: "中斷連接"
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
