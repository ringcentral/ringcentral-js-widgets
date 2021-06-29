import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import callDirections from '@ringcentral-integration/commons/enums/callDirections';
export default {
  [callDirections.inbound]: "Recebidas",
  [callDirections.outbound]: "Efetuadas",
  status: "Estado:",
  InboundNumber: "ID do autor da chamada:",
  OutboundNumber: "Marcado:",
  InboundDirection: "Recebida de:",
  OutboundDirection: "Efetuada para:",
  [telephonyStatuses.noCall]: "Desligado",
  [telephonyStatuses.callConnected]: "Ligado",
  [telephonyStatuses.ringing]: "A chamar",
  [telephonyStatuses.onHold]: "Em espera",
  [telephonyStatuses.parkedCall]: "Ponto de espera",
  [callResults.unknown]: "Desconhecido",
  [callResults.missed]: "Perdida",
  [callResults.callAccepted]: "Atendida",
  [callResults.accepted]: "Atendida",
  [callResults.voicemail]: "Correio de voz",
  [callResults.rejected]: "Recusado",
  [callResults.reply]: "Responder",
  [callResults.received]: "Recebido",
  [callResults.faxReceiptError]: "Erro de receção de fax",
  [callResults.faxOnDemand]: "Fax por subscrição",
  [callResults.partialReceive]: "Receção parcial",
  [callResults.blocked]: "Bloqueado",
  [callResults.callConnected]: "Chamada ligada",
  [callResults.noAnswer]: "Sem resposta",
  [callResults.internationalDisabled]: "Internacional desativado",
  [callResults.busy]: "Ocupado",
  [callResults.faxSendError]: "Erro de envio de fax",
  [callResults.sent]: "Enviado",
  [callResults.callFailed]: "Chamada falhada",
  [callResults.internalError]: "Erro interno",
  [callResults.IPPhoneOffline]: "Telefone IP offline",
  [callResults.restrictedNumber]: "Número restrito",
  [callResults.wrongNumber]: "Número errado",
  [callResults.stopped]: "Parado",
  [callResults.suspendedAccount]: "Conta suspensa",
  [callResults.hangUp]: "Desligada",
  [callResults.HangUp]: "Desligada",
  [callResults.abandoned]: "Abandonada",
  [callResults.declined]: "Recusada",
  [callResults.faxReceipt]: "Recibo de fax",
  [callResults.disconnected]: "Desligado",
  [callResults.notAllowed]: "Não permitido"
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
