/* eslint-disable */
export default {
  to: 'A',
  from: 'De',
  ext: 'Ext.',
  myCallerId: 'Mi ID de llamadas',
  callerId: 'ID de llamadas',
  unknownNumber: 'Desconocido',
  Inbound: 'Llamada entrante',
  Outbound: 'Llamada saliente',
  activeCall: 'Llamada activa',
  otherDevice: 'En otro dispositivo',
  onHold: 'En espera',
  day: 'día',
  hr: 'h',
  min: 'min',
  sec: 's',
  yesterday: 'Ayer',
  notes: 'Notas de IA',
  logged: 'Registrado',
  unlogged: 'Sin registrar',
  answeredBy: 'Atendida por',
  conferenceCall: 'Llamada de conferencia',
  copyNumberSuccess: 'Número copiado',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: 'Abandonada',
  Accepted: 'Aceptada',
  'Answered Not Accepted': 'Respondida y no aceptada',
  Blocked: 'Bloqueada',
  Busy: 'No disponible',
  'Call Failed': 'Llamada fallida',
  'Call Failure': 'Fallo de llamada',
  'Call connected': 'Llamada conectada',
  'Carrier is not active': 'El operador no está activo',
  Declined: 'Rechazada',
  'EDGE trunk misconfigured': 'Troncal EDGE mal configurada',
  'Fax Not Sent': 'Fax no enviado',
  'Fax Partially Sent': 'Fax parcialmente enviado',
  'Fax Poor Line': 'Línea débil de fax',
  'Fax Receipt Error': 'Error de recepción de fax',
  'Fax on Demand': 'Fax a petición',
  'Hang Up': 'Colgar',
  'IP Phone Offline': 'Teléfono IP desconectado',
  'In Progress': 'En curso',
  'Internal Error': 'Error interno',
  'International Disabled': 'Internacional desactivada',
  'International Restricted': 'Internacional restringida',
  Missed: 'Perdida',
  'No Answer': 'Sin respuesta',
  'No Calling Credit': 'Sin crédito de llamadas',
  'Not Allowed': 'No permitida',
  'Partial Receive': 'Recepción parcial',
  'Phone Login': 'Inicio de sesión con teléfono',
  'Receive Error': 'Error de recepción',
  Received: 'Recibida',
  Rejected: 'Rechazada',
  Reply: 'Respuesta',
  'Restricted Number': 'Número restringido',
  'Send Error': 'Error de envío',
  Sent: 'Enviado',
  'Sent to Voicemail': 'Enviado al buzón de voz',
  Stopped: 'Detenida',
  'Suspended account': 'Cuenta suspendida',
  Unknown: 'Desconocido',
  Voicemail: 'Buzón de voz',
  'Wrong Number': 'Número incorrecto',
  // some fields are not in the platform list
  'Answered Elsewhere': 'Respondidas en otro lugar',
  'Ringing Elsewhere': 'Sonando en otro lugar',
  'Fax Send Error': 'Error de envío de fax',
  Account: 'Cuenta',
  'Call accepted': 'Llamada aceptada',
  'Hang up': 'Colgar',
  'International Restriction': 'Restricción internacional',
  'No fax machine': 'Sin máquina de fax',
  'Partially Sent': 'Enviado parcialmente',
  'Poor Line Quality': 'Mala calidad de línea',
  ResultEmpty: 'vacío',
  ResultInProgress: 'En curso',
  Suspended: 'Suspendido',
  'Fax Receipt': 'Fax recibido',
  'Suspended Account': 'Cuenta suspendida',
  Disconnected: 'Desconectada',
  multiMatchesContactName: '{name} y {count} más',
  // #endregion call status
  matches: '{numberOfMatches} coincidencias',
  maybe: 'Quizás: {contactName}',
  optedOut: 'El destinatario ha cancelado la suscripción.',
  optOutAlertTooltip:
    'El destinatario debe volver a suscribirse para recibir mensajes de texto de este número.',
} as const;

// @key: @#@"to"@#@ @source: @#@"To"@#@
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
