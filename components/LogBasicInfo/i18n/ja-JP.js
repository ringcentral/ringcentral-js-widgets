'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callDirections$inbou;

var _callResults = require('ringcentral-integration/enums/callResults');

var _callResults2 = _interopRequireDefault(_callResults);

var _telephonyStatus = require('ringcentral-integration/enums/telephonyStatus');

var _telephonyStatus2 = _interopRequireDefault(_telephonyStatus);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, "着信"), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, "発信"), (0, _defineProperty3.default)(_callDirections$inbou, 'status', "ステータス："), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', "発信者番号："), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', "通話先："), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', "発信元："), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', "発信先："), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, "切断済み"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, "接続済み"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, "呼び出し中"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, "保留中"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, "パーク済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, "不明"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, "不在"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, "応答済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, "応答済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, "ボイスメール"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, "拒否済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, "返信"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, "受信済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, "FAX受信エラー"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, "オンデマンドFAX"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, "部分受信"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, "ブロック済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, "切断済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, "応答なし"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, "国際電話無効"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, "取り込み中"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, "FAX送信エラー"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, "送信済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, "通話失敗"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, "内部エラー"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, "IP電話オフライン"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, "制限された番号"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, "番号が間違っています"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, "停止済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, "利用が停止されたアカウント"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, "通話終了"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.HangUp, "通話終了"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, "放棄済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, "拒否済み"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, "FAX受信"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.disconnected, "切断済み"), _callDirections$inbou);

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
//# sourceMappingURL=ja-JP.js.map
