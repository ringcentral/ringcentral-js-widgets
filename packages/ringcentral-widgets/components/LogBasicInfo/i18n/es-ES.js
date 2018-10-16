import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';

export default {
  [callDirections.inbound]: "Entrantes",
  [callDirections.outbound]: "Salientes",
  status: "Estado:",
  InboundNumber: "ID de llamadas:",
  OutboundNumber: "Llamada de:",
  InboundDirection: "Llamada entrante de:",
  OutboundDirection: "Llamada saliente a:",
  [telephonyStatuses.noCall]: "Desconectada",
  [telephonyStatuses.callConnected]: "Conectada",
  [telephonyStatuses.ringing]: "Llamando",
  [telephonyStatuses.onHold]: "En espera",
  [telephonyStatuses.parkedCall]: "Aparcada",
  [callResults.unknown]: "Desconocida",
  [callResults.missed]: "Perdida",
  [callResults.callAccepted]: "Atendida",
  [callResults.accepted]: "Atendida",
  [callResults.voicemail]: "Mensaje de voz",
  [callResults.rejected]: "Rechazada",
  [callResults.reply]: "Responder",
  [callResults.received]: "Recibida",
  [callResults.faxReceiptError]: "Error de recepción de fax",
  [callResults.faxOnDemand]: "Fax a petición",
  [callResults.partialReceive]: "Recepción parcial",
  [callResults.blocked]: "Bloqueada",
  [callResults.callConnected]: "Desconectada",
  [callResults.noAnswer]: "No hay respuesta",
  [callResults.internationalDisabled]: "Internacional desactivado",
  [callResults.busy]: "Ocupado",
  [callResults.faxSendError]: "Error de envío de fax",
  [callResults.sent]: "Enviado",
  [callResults.callFailed]: "Error de llamada",
  [callResults.internalError]: "Error interno",
  [callResults.IPPhoneOffline]: "Teléfono IP desconectado",
  [callResults.restrictedNumber]: "Número restringido",
  [callResults.wrongNumber]: "Número incorrecto",
  [callResults.stopped]: "Detenido",
  [callResults.suspendedAccount]: "Cuenta suspendida",
  [callResults.hangUp]: "Colgada",
  [callResults.HangUp]: "Colgada",
  [callResults.abandoned]: "Abandonada",
  [callResults.declined]: "Rechazada",
  [callResults.faxReceipt]: "Fax recibido",
  [callResults.disconnected]: "Desconectada"
};

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
