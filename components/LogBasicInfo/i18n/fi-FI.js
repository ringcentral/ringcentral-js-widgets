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
var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "Saapuva"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "Lähtevät"), _defineProperty(_callDirections$inbou, "status", "Tila:"), _defineProperty(_callDirections$inbou, "InboundNumber", "Soittajatunnus:"), _defineProperty(_callDirections$inbou, "OutboundNumber", "Soitettiin:"), _defineProperty(_callDirections$inbou, "InboundDirection", "Saapuva puhelu kohteesta:"), _defineProperty(_callDirections$inbou, "OutboundDirection", "Lähtevä puhelu kohteeseen:"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "Yhteys katkaistu"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "Yhdistetty"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "Soitetaan"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "Pidossa"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "Siirretty säilytykseen"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "Tuntematon"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "Vastaamaton"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "Vastattu"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "Vastattu"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "Puhelinvastaaja"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "Kieltäydytty"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "Vastaa"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "Vastaanotettu"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "Faksin vastaanottovirhe"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "Faksi tarvittaessa"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "Osittainen vastaanotto"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "Estetty"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "Puhelu yhdistetty"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "Ei vastausta"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "Kansainväliset pois käytöstä"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "Varattu"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "Faksin lähetysvirhe"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "Lähetetty"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "Puhelu epäonnistui"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "Sisäinen virhe"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "IP-puhelin offline-tilassa"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "Rajoitettu numero"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "Väärä numero"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "Pysäytetty"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "Jäädytetty tili"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "Lopetettu"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "Lopetettu"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "Hylätty"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "Kieltäydytty"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "Faksin vastaanotto"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "Yhteys katkaistu"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "Ei sallittu"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
//# sourceMappingURL=fi-FI.js.map
