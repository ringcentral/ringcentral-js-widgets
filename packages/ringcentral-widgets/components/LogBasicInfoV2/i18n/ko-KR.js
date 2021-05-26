import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';
export default {
  [callDirections.inbound]: "수신",
  [callDirections.outbound]: "발신",
  status: "상태:",
  InboundNumber: "발신자 ID:",
  OutboundNumber: "통화함:",
  InboundDirection: "다음에서 수신:",
  OutboundDirection: "다음으로 발신:",
  [telephonyStatuses.noCall]: "연결 끊김",
  [telephonyStatuses.callConnected]: "연결됨",
  [telephonyStatuses.ringing]: "벨 울림",
  [telephonyStatuses.onHold]: "대기 중",
  [telephonyStatuses.parkedCall]: "통화 대기됨",
  [callResults.unknown]: "알 수 없음",
  [callResults.missed]: "부재중",
  [callResults.callAccepted]: "응답됨",
  [callResults.accepted]: "응답됨",
  [callResults.voicemail]: "음성 사서함",
  [callResults.rejected]: "거부됨",
  [callResults.reply]: "회신",
  [callResults.received]: "수신됨",
  [callResults.faxReceiptError]: "팩스 수신 오류",
  [callResults.faxOnDemand]: "주문형 팩스",
  [callResults.partialReceive]: "일부 수신",
  [callResults.blocked]: "차단됨",
  [callResults.callConnected]: "통화 연결됨",
  [callResults.noAnswer]: "응답 없음",
  [callResults.internationalDisabled]: "국제 전화 사용 안 함",
  [callResults.busy]: "통화 중",
  [callResults.faxSendError]: "팩스 전송 오류",
  [callResults.sent]: "전송됨",
  [callResults.callFailed]: "통화 실패",
  [callResults.internalError]: "내부 오류",
  [callResults.IPPhoneOffline]: "IP 전화기 오프라인",
  [callResults.restrictedNumber]: "제한된 번호",
  [callResults.wrongNumber]: "잘못된 번호",
  [callResults.stopped]: "중지됨",
  [callResults.suspendedAccount]: "일시 중단된 계정",
  [callResults.hangUp]: "끊음",
  [callResults.HangUp]: "끊음",
  [callResults.abandoned]: "중단됨",
  [callResults.declined]: "거부됨",
  [callResults.faxReceipt]: "팩스 수신",
  [callResults.disconnected]: "연결 끊김",
  [callResults.notAllowed]: "허용되지 않음"
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
