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

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, 'Inbound'), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, 'Outbound'), (0, _defineProperty3.default)(_callDirections$inbou, 'status', 'Status:'), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', 'Caller Id:'), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', 'Called:'), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', 'Inbound from:'), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', 'Outbound to:'), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, 'Disconnected'), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, 'Connected'), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, 'Ringing'), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, 'On Hold'), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, 'Parked'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, 'Unknown'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, 'Missed'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, 'Answered'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, 'Answered'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, 'Voicemail'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, 'Declined'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, 'Reply'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, 'Received'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, 'Fax Receipt Error'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, 'Fax on Demand'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, 'Partial Receive'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, 'Blocked'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, 'Disconnected'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, 'No Answer'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, 'International Disabled'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, 'Busy'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, 'Fax Send Error'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, 'Sent'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, 'Call Failed'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, 'Internal Error'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, 'IP Phone Offline'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, 'Restricted Number'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, 'Wrong Number'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, 'Stopped'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, 'Suspended Account'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, 'Hung up'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, 'Abandoned'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, 'Declined'), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, 'Fax Receipt'), _callDirections$inbou);
//# sourceMappingURL=en-US.js.map
