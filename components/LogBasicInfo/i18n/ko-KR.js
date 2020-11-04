"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callResults = _interopRequireDefault(require("ringcentral-integration/enums/callResults"));

var _telephonyStatus = _interopRequireDefault(require("ringcentral-integration/enums/telephonyStatus"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _callDirections$inbou;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "수신"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "발신"), _defineProperty(_callDirections$inbou, "status", "상태:"), _defineProperty(_callDirections$inbou, "InboundNumber", "발신자 ID:"), _defineProperty(_callDirections$inbou, "OutboundNumber", "통화함:"), _defineProperty(_callDirections$inbou, "InboundDirection", "다음에서 수신:"), _defineProperty(_callDirections$inbou, "OutboundDirection", "다음으로 발신:"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "연결 끊김"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "연결됨"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "벨 울림"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "대기 중"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "통화 대기됨"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "알 수 없음"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "부재중"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "응답됨"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "응답됨"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "음성 사서함"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "거부됨"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "회신"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "수신됨"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "팩스 수신 오류"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "주문형 팩스"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "일부 수신"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "차단됨"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "통화 연결됨"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "응답 없음"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "국제 전화 사용 안 함"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "통화 중"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "팩스 전송 오류"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "전송됨"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "통화 실패"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "내부 오류"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "IP 전화기 오프라인"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "제한된 번호"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "잘못된 번호"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "중지됨"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "일시 중단된 계정"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "끊음"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "끊음"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "중단됨"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "거부됨"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "팩스 수신"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "연결 끊김"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
