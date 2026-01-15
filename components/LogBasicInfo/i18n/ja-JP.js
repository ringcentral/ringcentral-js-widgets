"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _callDirections$inbou;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, '着信'), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, '発信'), _defineProperty(_callDirections$inbou, "status", 'ステータス：'), _defineProperty(_callDirections$inbou, "InboundNumber", '発信者番号：'), _defineProperty(_callDirections$inbou, "OutboundNumber", '通話先：'), _defineProperty(_callDirections$inbou, "InboundDirection", '発信元：'), _defineProperty(_callDirections$inbou, "OutboundDirection", '発信先：'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, '接続解除済み'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, '接続済み'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, '呼び出し中'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, '保留中'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, 'パーク済み'), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, '不明'), _defineProperty(_callDirections$inbou, _callResults["default"].missed, '不在'), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, '応答済み'), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, '応答済み'), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, 'ボイスメール'), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, '拒否済み'), _defineProperty(_callDirections$inbou, _callResults["default"].reply, '返信'), _defineProperty(_callDirections$inbou, _callResults["default"].received, '受信済み'), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, 'FAX受信エラー'), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, 'オンデマンドFAX'), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, '部分受信'), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, 'ブロック済み'), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, '通話を接続済み'), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, '応答なし'), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, '国際電話が無効です'), _defineProperty(_callDirections$inbou, _callResults["default"].busy, '取り込み中'), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, 'FAX送信エラー'), _defineProperty(_callDirections$inbou, _callResults["default"].sent, '送信済み'), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, '通話失敗'), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, '内部エラー'), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, 'IP電話オフライン'), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, '制限された番号'), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, '番号が間違っています'), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, '停止済み'), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, '利用が停止されたアカウント'), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, '通話終了'), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, '通話終了'), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, '放棄済み'), _defineProperty(_callDirections$inbou, _callResults["default"].declined, '拒否済み'), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, 'FAX受信'), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, '接続解除済み'), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, '許可されていません'), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
