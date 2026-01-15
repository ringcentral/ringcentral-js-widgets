"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _callDirections$inbou;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = (_callDirections$inbou = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_callDirections$inbou, _callDirections["default"].inbound, 'Inbound'), _callDirections["default"].outbound, 'Outbound'), "status", 'Status:'), "InboundNumber", 'Caller Id:'), "OutboundNumber", 'Called:'), "InboundDirection", 'Inbound from:'), "OutboundDirection", 'Outbound to:'), _telephonyStatus["default"].noCall, 'Disconnected'), _telephonyStatus["default"].callConnected, 'Connected'), _telephonyStatus["default"].ringing, 'Ringing'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, 'On Hold'), _telephonyStatus["default"].parkedCall, 'Parked'), _callResults["default"].unknown, 'Unknown'), _callResults["default"].missed, 'Missed'), _callResults["default"].callAccepted, 'Answered'), _callResults["default"].accepted, 'Answered'), _callResults["default"].voicemail, 'Voicemail'), _callResults["default"].rejected, 'Declined'), _callResults["default"].reply, 'Reply'), _callResults["default"].received, 'Received'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, 'Fax Receipt Error'), _callResults["default"].faxOnDemand, 'Fax on Demand'), _callResults["default"].partialReceive, 'Partial Receive'), _callResults["default"].blocked, 'Blocked'), _callResults["default"].callConnected, 'Call connected'), _callResults["default"].noAnswer, 'No Answer'), _callResults["default"].internationalDisabled, 'International Disabled'), _callResults["default"].busy, 'Busy'), _callResults["default"].faxSendError, 'Fax Send Error'), _callResults["default"].sent, 'Sent'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_callDirections$inbou, _callResults["default"].callFailed, 'Call Failed'), _callResults["default"].internalError, 'Internal Error'), _callResults["default"].IPPhoneOffline, 'IP Phone Offline'), _callResults["default"].restrictedNumber, 'Restricted Number'), _callResults["default"].wrongNumber, 'Wrong Number'), _callResults["default"].stopped, 'Stopped'), _callResults["default"].suspendedAccount, 'Suspended Account'), _callResults["default"].hangUp, 'Hung up'), _callResults["default"].HangUp, 'Hung up'), _callResults["default"].abandoned, 'Abandoned'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_callDirections$inbou, _callResults["default"].declined, 'Declined'), _callResults["default"].faxReceipt, 'Fax Receipt'), _callResults["default"].disconnected, 'Disconnected'), _callResults["default"].notAllowed, 'Not Allowed'), "warmTransferSwitchCall", 'Switch calls'), "conferenceCall", 'Conference Call'), "participants", 'Participants'));
//# sourceMappingURL=en-US.js.map
