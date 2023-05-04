import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
export default {
  [callDirections.inbound]: "着信",
  [callDirections.outbound]: "発信",
  status: "ステータス：",
  InboundNumber: "発信者番号：",
  OutboundNumber: "通話先：",
  InboundDirection: "発信元：",
  OutboundDirection: "発信先：",
  [telephonyStatuses.noCall]: "接続解除済み",
  [telephonyStatuses.callConnected]: "接続済み",
  [telephonyStatuses.ringing]: "呼び出し中",
  [telephonyStatuses.onHold]: "保留中",
  [telephonyStatuses.parkedCall]: "パーク済み",
  [callResults.unknown]: "不明",
  [callResults.missed]: "不在",
  [callResults.callAccepted]: "応答済み",
  [callResults.accepted]: "応答済み",
  [callResults.voicemail]: "ボイスメール",
  [callResults.rejected]: "拒否済み",
  [callResults.reply]: "返信",
  [callResults.received]: "受信済み",
  [callResults.faxReceiptError]: "FAX受信エラー",
  [callResults.faxOnDemand]: "オンデマンドFAX",
  [callResults.partialReceive]: "部分受信",
  [callResults.blocked]: "ブロック済み",
  [callResults.callConnected]: "通話を接続済み",
  [callResults.noAnswer]: "応答なし",
  [callResults.internationalDisabled]: "国際電話が無効です",
  [callResults.busy]: "取り込み中",
  [callResults.faxSendError]: "FAX送信エラー",
  [callResults.sent]: "送信済み",
  [callResults.callFailed]: "通話失敗",
  [callResults.internalError]: "内部エラー",
  [callResults.IPPhoneOffline]: "IP電話オフライン",
  [callResults.restrictedNumber]: "制限された番号",
  [callResults.wrongNumber]: "番号が間違っています",
  [callResults.stopped]: "停止済み",
  [callResults.suspendedAccount]: "利用が停止されたアカウント",
  [callResults.hangUp]: "通話終了",
  [callResults.HangUp]: "通話終了",
  [callResults.abandoned]: "放棄済み",
  [callResults.declined]: "拒否済み",
  [callResults.faxReceipt]: "FAX受信",
  [callResults.disconnected]: "接続解除済み",
  [callResults.notAllowed]: "許可されていません",
  warmTransferSwitchCall: "通話を切り替える"
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
