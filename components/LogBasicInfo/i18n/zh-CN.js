"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));

var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _callDirections$inbou;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "呼入"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "呼出"), _defineProperty(_callDirections$inbou, "status", "状态："), _defineProperty(_callDirections$inbou, "InboundNumber", "主叫显示号码："), _defineProperty(_callDirections$inbou, "OutboundNumber", "被叫："), _defineProperty(_callDirections$inbou, "InboundDirection", "呼入自："), _defineProperty(_callDirections$inbou, "OutboundDirection", "呼出至："), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "已断开连接"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "已连接"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "正在振铃"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "等候接听"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "已寄存"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "未知"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "未接"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "已接"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "已接"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "语音邮件"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "已拒绝"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "回复"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "已接收"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "传真接收错误"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "按需传真"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "部分接收"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "已阻止"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "呼叫已接通"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "无人接听"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "国际功能已停用"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "忙碌"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "传真发送错误"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "已发送"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "呼叫失败"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "内部错误"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "网络电话离线"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "限制号码"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "错误号码"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "已停止"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "已暂停帐户"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "已挂断"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "已挂断"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "已放弃"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "已拒绝"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "传真接收"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "已断开连接"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "不允许"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
//# sourceMappingURL=zh-CN.js.map
