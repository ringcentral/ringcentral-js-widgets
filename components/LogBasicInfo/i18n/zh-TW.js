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

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, "來電"), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, "撥出電話"), (0, _defineProperty3.default)(_callDirections$inbou, 'status', "狀態："), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', "來電者 ID："), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', "已撥號："), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', "來電來自："), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', "撥出電話至："), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, "中斷連接"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, "已接通"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, "鈴響"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, "等待接通"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, "已寄存"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, "未知"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, "未接"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, "已接聽"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, "已接聽"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, "語音訊息"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, "已遭拒"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, "回覆"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, "已接收"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, "傳真接收錯誤"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, "隨選傳真"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, "部分接收"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, "已封鎖"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, "中斷連接"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, "無人接聽"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, "國際電話已停用"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, "忙碌"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, "傳真傳送錯誤"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, "已傳送"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, "通話失敗"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, "內部錯誤"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, "網路電話離線"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, "受限制號碼"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, "錯誤號碼"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, "已停止"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, "已暫停帳戶"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, "掛斷"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.HangUp, "掛斷"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, "已棄置"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, "已遭拒"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, "傳真接收"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.disconnected, "中斷連接"), _callDirections$inbou);

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
//# sourceMappingURL=zh-TW.js.map
