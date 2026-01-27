"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  to: 'Para',
  from: 'De',
  ext: 'Ramal',
  myCallerId: 'Minha ID da chamada',
  callerId: 'ID da chamada',
  unknownNumber: 'Desconhecido',
  Inbound: 'Chamada recebida',
  Outbound: 'Chamada de saída',
  activeCall: 'Chamada ativa',
  otherDevice: 'Em outro dispositivo',
  onHold: 'Em espera',
  day: 'dia',
  hr: 'hora',
  min: 'min',
  sec: 's',
  yesterday: 'Ontem',
  notes: 'Anotações de IA',
  logged: 'Registrado',
  unlogged: 'Não registrado',
  answeredBy: 'Atendida por',
  conferenceCall: 'Chamada em conferência',
  copyNumberSuccess: 'Número copiado',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: 'Canceladas',
  Accepted: 'Aceita',
  'Answered Not Accepted': 'Chamadas atendidas não aceitas',
  Blocked: 'Bloqueadas',
  Busy: 'Ocupadas',
  'Call Failed': 'Falha na chamada',
  'Call Failure': 'Falha na chamada',
  'Call connected': 'Chamada conectada',
  'Carrier is not active': 'A operadora não está ativa',
  Declined: 'Recusada',
  'EDGE trunk misconfigured': 'Tronco EDGE configurado incorretamente',
  'Fax Not Sent': 'Fax não enviado',
  'Fax Partially Sent': 'Fax parcialmente enviado',
  'Fax Poor Line': 'Linha ruim de fax',
  'Fax Receipt Error': 'Erro de recebimento do fax',
  'Fax on Demand': 'Fax sob demanda',
  'Hang Up': 'Desligar',
  'IP Phone Offline': 'Telefone IP offline',
  'In Progress': 'Em andamento',
  'Internal Error': 'Erro interno',
  'International Disabled': 'Chamada internacional desativada',
  'International Restricted': 'Com restrição internacional',
  Missed: 'Perdidas',
  'No Answer': 'Sem resposta',
  'No Calling Credit': 'Sem crédito de chamadas',
  'Not Allowed': 'Não permitido',
  'Partial Receive': 'Recebimento parcial',
  'Phone Login': 'Login do telefone',
  'Receive Error': 'Erro de recebimento',
  Received: 'Recebido',
  Rejected: 'Rejeitado',
  Reply: 'Responder',
  'Restricted Number': 'Número restrito',
  'Send Error': 'Erro de envio',
  Sent: 'Enviada',
  'Sent to Voicemail': 'Enviado para a caixa postal',
  Stopped: 'Parado',
  'Suspended account': 'Conta suspensa',
  Unknown: 'Desconhecido',
  Voicemail: 'Caixa postal',
  'Wrong Number': 'Número errado',
  // some fields are not in the platform list
  'Answered Elsewhere': 'Atendida em outro lugar',
  'Ringing Elsewhere': 'Tocando em outro lugar',
  'Fax Send Error': 'Erro de envio de fax',
  Account: 'Conta',
  'Call accepted': 'Chamada aceita',
  'Hang up': 'Desligar',
  'International Restriction': 'Restrição internacional',
  'No fax machine': 'Sem aparelho de fax',
  'Partially Sent': 'Enviado parcialmente',
  'Poor Line Quality': 'Baixa qualidade da linha',
  ResultEmpty: 'vazio',
  ResultInProgress: 'Em andamento',
  Suspended: 'Suspenso',
  'Fax Receipt': 'Recebimento de fax',
  'Suspended Account': 'Conta suspensa',
  Disconnected: 'Desconectado',
  multiMatchesContactName: '{name} e mais {count}',
  // #endregion call status
  matches: '{numberOfMatches} correspondências',
  maybe: 'Talvez: {contactName}',
  optedOut: 'O destinatário recusou.',
  optOutAlertTooltip: 'O destinatário deve aceitar o recebimento novamente para receber mensagens deste número.'
}; // @key: @#@"to"@#@ @source: @#@"To"@#@
// @key: @#@"from"@#@ @source: @#@"From"@#@
// @key: @#@"ext"@#@ @source: @#@"Ext."@#@
// @key: @#@"myCallerId"@#@ @source: @#@"My caller ID"@#@
// @key: @#@"callerId"@#@ @source: @#@"Caller ID"@#@
// @key: @#@"unknownNumber"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Inbound"@#@ @source: @#@"Incoming call"@#@
// @key: @#@"Outbound"@#@ @source: @#@"Outgoing call"@#@
// @key: @#@"activeCall"@#@ @source: @#@"Active call"@#@
// @key: @#@"otherDevice"@#@ @source: @#@"On other device"@#@
// @key: @#@"onHold"@#@ @source: @#@"On hold"@#@
// @key: @#@"day"@#@ @source: @#@"day"@#@
// @key: @#@"hr"@#@ @source: @#@"hr"@#@
// @key: @#@"min"@#@ @source: @#@"min"@#@
// @key: @#@"sec"@#@ @source: @#@"sec"@#@
// @key: @#@"yesterday"@#@ @source: @#@"Yesterday"@#@
// @key: @#@"notes"@#@ @source: @#@"AI notes"@#@
// @key: @#@"logged"@#@ @source: @#@"Logged"@#@
// @key: @#@"unlogged"@#@ @source: @#@"Unlogged"@#@
// @key: @#@"answeredBy"@#@ @source: @#@"Answered by"@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"Conference Call"@#@
// @key: @#@"copyNumberSuccess"@#@ @source: @#@"Number copied"@#@
// @key: @#@"'911'"@#@ @source: @#@"911"@#@
// @key: @#@"'933'"@#@ @source: @#@"933"@#@
// @key: @#@"Abandoned"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"Accepted"@#@ @source: @#@"Accepted"@#@
// @key: @#@"'Answered Not Accepted'"@#@ @source: @#@"Answered Not Accepted"@#@
// @key: @#@"Blocked"@#@ @source: @#@"Blocked"@#@
// @key: @#@"Busy"@#@ @source: @#@"Busy"@#@
// @key: @#@"'Call Failed'"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"'Call Failure'"@#@ @source: @#@"Call Failure"@#@
// @key: @#@"'Call connected'"@#@ @source: @#@"Call connected"@#@
// @key: @#@"'Carrier is not active'"@#@ @source: @#@"Carrier is not active"@#@
// @key: @#@"Declined"@#@ @source: @#@"Declined"@#@
// @key: @#@"'EDGE trunk misconfigured'"@#@ @source: @#@"EDGE trunk misconfigured"@#@
// @key: @#@"'Fax Not Sent'"@#@ @source: @#@"Fax Not Sent"@#@
// @key: @#@"'Fax Partially Sent'"@#@ @source: @#@"Fax Partially Sent"@#@
// @key: @#@"'Fax Poor Line'"@#@ @source: @#@"Fax Poor Line"@#@
// @key: @#@"'Fax Receipt Error'"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"'Fax on Demand'"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"'Hang Up'"@#@ @source: @#@"Hang Up"@#@
// @key: @#@"'IP Phone Offline'"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"'In Progress'"@#@ @source: @#@"In Progress"@#@
// @key: @#@"'Internal Error'"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"'International Disabled'"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"'International Restricted'"@#@ @source: @#@"International Restricted"@#@
// @key: @#@"Missed"@#@ @source: @#@"Missed"@#@
// @key: @#@"'No Answer'"@#@ @source: @#@"No Answer"@#@
// @key: @#@"'No Calling Credit'"@#@ @source: @#@"No Calling Credit"@#@
// @key: @#@"'Not Allowed'"@#@ @source: @#@"Not Allowed"@#@
// @key: @#@"'Partial Receive'"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"'Phone Login'"@#@ @source: @#@"Phone Login"@#@
// @key: @#@"'Receive Error'"@#@ @source: @#@"Receive Error"@#@
// @key: @#@"Received"@#@ @source: @#@"Received"@#@
// @key: @#@"Rejected"@#@ @source: @#@"Rejected"@#@
// @key: @#@"Reply"@#@ @source: @#@"Reply"@#@
// @key: @#@"'Restricted Number'"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"'Send Error'"@#@ @source: @#@"Send Error"@#@
// @key: @#@"Sent"@#@ @source: @#@"Sent"@#@
// @key: @#@"'Sent to Voicemail'"@#@ @source: @#@"Sent to Voicemail"@#@
// @key: @#@"Stopped"@#@ @source: @#@"Stopped"@#@
// @key: @#@"'Suspended account'"@#@ @source: @#@"Suspended account"@#@
// @key: @#@"Unknown"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Voicemail"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"'Wrong Number'"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"'Answered Elsewhere'"@#@ @source: @#@"Answered elsewhere"@#@
// @key: @#@"'Ringing Elsewhere'"@#@ @source: @#@"Ringing elsewhere"@#@
// @key: @#@"'Fax Send Error'"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"Account"@#@ @source: @#@"Account"@#@
// @key: @#@"'Call accepted'"@#@ @source: @#@"Call accepted"@#@
// @key: @#@"'Hang up'"@#@ @source: @#@"Hang up"@#@
// @key: @#@"'International Restriction'"@#@ @source: @#@"International Restriction"@#@
// @key: @#@"'No fax machine'"@#@ @source: @#@"No fax machine"@#@
// @key: @#@"'Partially Sent'"@#@ @source: @#@"Partially Sent"@#@
// @key: @#@"'Poor Line Quality'"@#@ @source: @#@"Poor Line Quality"@#@
// @key: @#@"ResultEmpty"@#@ @source: @#@"empty"@#@
// @key: @#@"ResultInProgress"@#@ @source: @#@"In Progress"@#@
// @key: @#@"Suspended"@#@ @source: @#@"Suspended"@#@
// @key: @#@"'Fax Receipt'"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"'Suspended Account'"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"Disconnected"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"multiMatchesContactName"@#@ @source: @#@"{name} and {count} more"@#@
// @key: @#@"matches"@#@ @source: @#@"{numberOfMatches} matches"@#@
// @key: @#@"maybe"@#@ @source: @#@"Maybe: {contactName}"@#@
// @key: @#@"optedOut"@#@ @source: @#@"Recipient has opted out."@#@
// @key: @#@"optOutAlertTooltip"@#@ @source: @#@"The recipient must opt back in to receive texts from this number."@#@
//# sourceMappingURL=pt-BR.js.map
