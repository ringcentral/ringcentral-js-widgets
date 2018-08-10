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

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, "Inbound"), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, "Outbound"), (0, _defineProperty3.default)(_callDirections$inbou, 'status', "Status:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', "Caller ID:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', "Called:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', "Inbound from:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', "Outbound to:"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, "Disconnected"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, "Connected"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, "Ringing"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, "On Hold"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, "Parked"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, "Unknown"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, "Missed"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, "Answered"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, "Answered"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, "Voicemail"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, "Declined"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, "Reply"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, "Received"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, "Fax receipt error"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, "Fax on demand"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, "Partial receive"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, "Blocked"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, "Disconnected"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, "No answer"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, "International disabled"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, "Busy"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, "Fax send error"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, "Sent"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, "Call failed"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, "Internal error"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, "IP phone offline"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, "Restricted number"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, "Wrong number"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, "Stopped"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, "Suspended Account"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, "Hung up"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.HangUp, "Hung up"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, "Abandoned"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, "Declined"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, "Fax Receipt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.disconnected, "Disconnected"), _callDirections$inbou);

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
//# sourceMappingURL=en-GB.js.map
