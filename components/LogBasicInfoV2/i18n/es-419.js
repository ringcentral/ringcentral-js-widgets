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
var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "Entrante"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "Saliente"), _defineProperty(_callDirections$inbou, "status", "Estado:"), _defineProperty(_callDirections$inbou, "InboundNumber", "Identificador de llamadas:"), _defineProperty(_callDirections$inbou, "OutboundNumber", "Llamada de:"), _defineProperty(_callDirections$inbou, "InboundDirection", "Llamada entrante de:"), _defineProperty(_callDirections$inbou, "OutboundDirection", "Llamada saliente a:"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "Desconectado"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "Conectado"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "Llamando"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "En espera"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "Estacionada"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "Desconocido"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "Perdida"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "Respondida"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "Respondida"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "Buzón de voz"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "Rechazada"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "Responder"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "Recibido"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "Error de recepción de fax"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "Fax a pedido"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "Recepción parcial"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "Bloqueado"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "Llamada conectada"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "No responde"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "Internacional desactivada"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "Ocupado"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "Error de envío de fax"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "Enviado"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "Error de llamada"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "Error interno"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, " IP del teléfono sin conexión"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "Número restringido"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "Número incorrecto"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "Detenido"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "Cuenta suspendida"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "Colgar"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "Colgar"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "Abandonada"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "Rechazada"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "Fax recibido"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "Desconectado"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "No permitido"), _defineProperty(_callDirections$inbou, "warmTransferSwitchCall", "Cambiar llamadas"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
//# sourceMappingURL=es-419.js.map
