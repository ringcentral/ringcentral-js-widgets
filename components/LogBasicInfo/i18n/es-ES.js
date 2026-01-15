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
var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, 'Entrante'), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, 'Saliente'), _defineProperty(_callDirections$inbou, "status", 'Estado:'), _defineProperty(_callDirections$inbou, "InboundNumber", 'ID de llamadas:'), _defineProperty(_callDirections$inbou, "OutboundNumber", 'Llamada de:'), _defineProperty(_callDirections$inbou, "InboundDirection", 'Llamada entrante de:'), _defineProperty(_callDirections$inbou, "OutboundDirection", 'Llamada saliente a:'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, 'Desconectado'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, 'Conectada'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, 'Llamando'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, 'En espera'), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, 'Estacionada'), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, 'Desconocido'), _defineProperty(_callDirections$inbou, _callResults["default"].missed, 'Perdida'), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, 'Respondida'), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, 'Respondida'), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, 'Buzón de voz'), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, 'Rechazada'), _defineProperty(_callDirections$inbou, _callResults["default"].reply, 'Responder'), _defineProperty(_callDirections$inbou, _callResults["default"].received, 'Recibida'), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, 'Error de recepción de fax'), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, 'Fax a petición'), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, 'Recepción parcial'), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, 'Bloqueado'), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, 'Llamada conectada'), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, 'Sin respuesta'), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, 'Internacional desactivado'), _defineProperty(_callDirections$inbou, _callResults["default"].busy, 'Ocupado'), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, 'Error de envío de fax'), _defineProperty(_callDirections$inbou, _callResults["default"].sent, 'Enviado'), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, 'Error de llamada'), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, 'Error interno'), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, 'Teléfono IP desconectado'), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, 'Número restringido'), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, 'Número incorrecto'), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, 'Detenido'), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, 'Cuenta suspendida'), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, 'Colgada'), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, 'Colgada'), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, 'Abandonado'), _defineProperty(_callDirections$inbou, _callResults["default"].declined, 'Rechazada'), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, 'Fax recibido'), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, 'Desconectado'), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, 'No permitida'), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
//# sourceMappingURL=es-ES.js.map
