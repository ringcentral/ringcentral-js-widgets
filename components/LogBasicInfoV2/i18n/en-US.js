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

var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, 'Inbound'), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, 'Outbound'), _defineProperty(_callDirections$inbou, "status", 'Status:'), _defineProperty(_callDirections$inbou, "InboundNumber", 'Caller Id:'), _defineProperty(_callDirections$inbou, "OutboundNumber", 'Called:'), _defineProperty(_callDirections$inbou, "InboundDirection", 'Inbound from:'), _defineProperty(_callDirections$inbou, "OutboundDirection", 'Outbound to:'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, 'Disconnected'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, 'Connected'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, 'Ringing'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, 'On Hold'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, 'Parked'), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, 'Unknown'), _defineProperty(_callDirections$inbou, _callResults["default"].missed, 'Missed'), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, 'Answered'), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, 'Answered'), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, 'Voicemail'), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, 'Declined'), _defineProperty(_callDirections$inbou, _callResults["default"].reply, 'Reply'), _defineProperty(_callDirections$inbou, _callResults["default"].received, 'Received'), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, 'Fax Receipt Error'), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, 'Fax on Demand'), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, 'Partial Receive'), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, 'Blocked'), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, 'Disconnected'), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, 'No Answer'), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, 'International Disabled'), _defineProperty(_callDirections$inbou, _callResults["default"].busy, 'Busy'), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, 'Fax Send Error'), _defineProperty(_callDirections$inbou, _callResults["default"].sent, 'Sent'), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, 'Call Failed'), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, 'Internal Error'), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, 'IP Phone Offline'), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, 'Restricted Number'), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, 'Wrong Number'), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, 'Stopped'), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, 'Suspended Account'), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, 'Hung up'), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, 'Hung up'), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, 'Abandoned'), _defineProperty(_callDirections$inbou, _callResults["default"].declined, 'Declined'), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, 'Fax Receipt'), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, 'Disconnected'), _callDirections$inbou);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
