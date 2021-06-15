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

var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "Inbound"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "Outbound"), _defineProperty(_callDirections$inbou, "status", "Status:"), _defineProperty(_callDirections$inbou, "InboundNumber", "Caller ID:"), _defineProperty(_callDirections$inbou, "OutboundNumber", "Called:"), _defineProperty(_callDirections$inbou, "InboundDirection", "Inbound from:"), _defineProperty(_callDirections$inbou, "OutboundDirection", "Outbound to:"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "Disconnected"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "Connected"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "Ringing"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "On Hold"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "Parked"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "Unknown"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "Missed"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "Answered"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "Answered"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "Voicemail"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "Declined"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "Reply"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "Received"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "Fax receipt error"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "Fax on demand"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "Partial receive"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "Blocked"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "Call connected"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "No answer"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "International disabled"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "Busy"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "Fax send error"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "Sent"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "Call failed"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "Internal error"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "IP phone offline"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "Restricted number"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "Wrong number"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "Stopped"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "Suspended account"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "Hung up"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "Hung up"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "Abandoned"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "Declined"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "Fax receipt"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "Disconnected"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "Not allowed"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
//# sourceMappingURL=en-GB.js.map
