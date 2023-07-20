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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "撥入"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "撥出"), _defineProperty(_callDirections$inbou, "status", "狀態："), _defineProperty(_callDirections$inbou, "InboundNumber", "來電者 ID："), _defineProperty(_callDirections$inbou, "OutboundNumber", "已撥號："), _defineProperty(_callDirections$inbou, "InboundDirection", "撥入電話自："), _defineProperty(_callDirections$inbou, "OutboundDirection", "撥出電話至："), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "已中斷連線"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "已連線"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "響鈴"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "保留"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "已寄存"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "未知"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "未接"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "已接聽"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "已接聽"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "語音訊息"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "已遭拒"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "回覆"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "已接收"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "傳真接收錯誤"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "隨選傳真"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "部分接收"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "已封鎖"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "通話已連線"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "無人接聽"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "國際電話已停用"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "忙碌中"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "傳真傳送錯誤"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "已傳送"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "通話失敗"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "內部錯誤"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "VoIP 離線"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "受限制號碼"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "錯誤號碼"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "已停止"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "已暫停帳戶"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "已掛斷"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "已掛斷"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "已棄置"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "已遭拒"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "傳真接收"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "已中斷連線"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "不允許"), _defineProperty(_callDirections$inbou, "warmTransferSwitchCall", "切換通話"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
exports["default"] = _default;
//# sourceMappingURL=zh-TW.js.map
