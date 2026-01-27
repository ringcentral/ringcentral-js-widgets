"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  to: 'À',
  from: 'Du',
  ext: 'Poste',
  myCallerId: 'Mon ID de l’appelant',
  callerId: 'ID de l’appelant',
  unknownNumber: 'Inconnu',
  Inbound: 'Appel entrant',
  Outbound: 'Appel sortant',
  activeCall: 'Appel en cours',
  otherDevice: 'Sur un autre appareil',
  onHold: 'En attente',
  day: 'jour',
  hr: 'h',
  min: ' min',
  sec: 's',
  yesterday: 'Hier',
  notes: 'Notes de l’IA',
  logged: 'Enregistré',
  unlogged: 'Enregistrement supprimé',
  answeredBy: 'Répondu par',
  conferenceCall: 'Téléconférence',
  copyNumberSuccess: 'Numéro copié',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: 'Abandonné',
  Accepted: 'Accepté',
  'Answered Not Accepted': 'Appel reçu et refusé',
  Blocked: 'Bloqué',
  Busy: 'Occupé',
  'Call Failed': 'L’appel a échoué',
  'Call Failure': 'Échec de l’appel',
  'Call connected': 'Appel acheminé',
  'Carrier is not active': 'Le fournisseur n’est pas actif.',
  Declined: 'Refusé',
  'EDGE trunk misconfigured': 'Le tronc EDGE est mal configuré',
  'Fax Not Sent': 'Télécopie non envoyée',
  'Fax Partially Sent': 'Envoi partiel de la télécopie',
  'Fax Poor Line': 'Mauvaise qualité de la ligne du télécopieur',
  'Fax Receipt Error': 'Erreur de réception de télécopie',
  'Fax on Demand': 'Télécopier sur demande',
  'Hang Up': 'Raccrocher',
  'IP Phone Offline': 'Téléphone IP hors ligne',
  'In Progress': 'En cours',
  'Internal Error': 'Erreur interne',
  'International Disabled': 'Appels internationaux désactivés',
  'International Restricted': 'Restriction internationale',
  Missed: 'Manqué',
  'No Answer': 'Aucune réponse',
  'No Calling Credit': 'Aucun crédit d’appel',
  'Not Allowed': 'Non autorisé',
  'Partial Receive': 'Réception partielle',
  'Phone Login': 'Ouverture de session par téléphone',
  'Receive Error': 'Erreur de réception',
  Received: 'Reçu',
  Rejected: 'Rejeté',
  Reply: 'Répondre',
  'Restricted Number': 'Numéro restreint',
  'Send Error': 'Erreur d’envoi',
  Sent: 'Envoyé',
  'Sent to Voicemail': 'Envoyé à la messagerie vocale',
  Stopped: 'Interrompu',
  'Suspended account': 'Compte suspendu',
  Unknown: 'Inconnu',
  Voicemail: 'Messagerie vocale',
  'Wrong Number': 'Mauvais numéro',
  // some fields are not in the platform list
  'Answered Elsewhere': 'Répondu ailleurs',
  'Ringing Elsewhere': 'Sonnerie redirigée',
  'Fax Send Error': 'Erreur d’envoi de télécopie',
  Account: 'Compte',
  'Call accepted': 'Appel accepté',
  'Hang up': 'Raccrocher',
  'International Restriction': 'Restriction internationale',
  'No fax machine': 'Aucun télécopieur',
  'Partially Sent': 'Envoi partiel',
  'Poor Line Quality': 'Mauvaise qualité de la ligne',
  ResultEmpty: 'vide',
  ResultInProgress: 'En cours',
  Suspended: 'Suspendu',
  'Fax Receipt': 'Réception de télécopie',
  'Suspended Account': 'Compte suspendu',
  Disconnected: 'Déconnecté',
  multiMatchesContactName: '{name} et {count} de plus',
  // #endregion call status
  matches: '{numberOfMatches} correspondances',
  maybe: 'Peut-être : {contactName}',
  optedOut: 'Le destinataire s’est désinscrit.',
  optOutAlertTooltip: 'Le destinataire doit se réinscrire pour recevoir des textos de ce numéro.'
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
//# sourceMappingURL=fr-CA.js.map
