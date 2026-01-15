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
var _inviteMeetingContent;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable */
var _default = exports["default"] = (_inviteMeetingContent = {
  inviteMeetingContent: '{accountName} vous invite à une réunion {brandName}.\n\nS’y joindre sur PC, Mac, iOS ou Android : {joinUri}{passwordTpl}\n\n Ou participer d’un seul toucher sur iPhone :\n\t    {mobileDialingNumberTpl}\n\n    Ou d’un téléphone :\n\t     Numéro à composer :\n\t    {phoneDialingNumberTpl}\n\t      Code de réunion : {meetingId}\n\t     Numéros internationaux disponibles :{teleconference} ',
  conferenceLocationField: 'Téléconférence, numéro à composer : {dialInNumber}',
  scheduleError: 'Désolés, un problème est survenu. Veuillez réessayer.',
  noMeetingPermission: 'Désolés, vous n’avez pas les autorisations pour {brandName} Meetings. Communiquez avec l’administrateur de votre entreprise pour continuer.',
  noConferencePermission: 'Désolés, vous n’avez pas les autorisations pour la téléconférence {brandName}. Communiquez avec l’administrateur de votre entreprise pour continuer.',
  conferenceTitle: 'Téléconférence de {displayName}',
  internationalNumber: 'Numéros internationaux à composer :',
  inviteText_att: 'Veuillez vous joindre à la téléconférence {brandName}.\n\nNuméro à composer : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nAvez-vous besoin d’un numéro à composer international? Veuillez visiter le {dialInNumbersLink} \n\nCette téléconférence est rendue possible grâce à {brandName} Conferencing.',
  inviteText_bt: 'Veuillez vous joindre à la téléconférence {brandName}.\n\nNuméro à composer : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nAutres numéros à composer {dialInNumbersLink} ',
  inviteText_rc: 'Veuillez vous joindre à la téléconférence {brandName}.\n\nNuméro à composer : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nAvez-vous besoin d’un numéro à composer international? Veuillez visiter le {dialInNumbersLink} \n\nCette téléconférence est rendue possible grâce à {brandName} Conferencing.',
  inviteText_telus: 'Veuillez vous joindre à la téléconférence {brandName}.\n\nNuméro à composer : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nAutres numéros à composer {dialInNumbersLink} ',
  conferenceCall: 'Téléconférence {brandName}',
  videoCall: 'Appel vidéo {brandName}',
  addConferencingDetails: 'Ajout de renseignements sur la téléconférence',
  updateConferencingDetails: 'Mise à jour des renseignements sur la téléconférence'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_inviteMeetingContent, "scheduleError", 'Désolés, un problème est survenu. Veuillez réessayer.'), "deleteBtn", 'Supprimer'), "settingsBtn", 'Paramètres'), "saveAsDefaultAndNotShowAgain", 'Enregistrer comme valeur par défaut et ne plus demander'), "saveAsDefault", 'Enregistrer par défaut'), "done", 'Terminer'), "update", 'Mettre à jour'), "conferenceSettingsTitle", 'Paramètres des téléconférences {brand}'), "videoSettingsTitle", 'Paramètres des réunions {brand}'), "password", 'Mot de passe'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", 'Perte de la connexion réseau. Supprimez cette réunion et réessayez plus tard.'), "meetingSettingsTitle", 'Paramètres des réunions {brand}'), "recurringMeeting", 'Réunion récurrente'), "meetingOptions", 'Options de la réunion'), "schedule", 'Planifier'), "settingsBtn", 'Paramètres')); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
// @key: @#@"conferenceLocationField"@#@ @source: @#@"Conference Meeting, Dial-in Number: {dialInNumber}"@#@
// @key: @#@"scheduleError"@#@ @source: @#@"Sorry, something went wrong, please try again."@#@
// @key: @#@"noMeetingPermission"@#@ @source: @#@"Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue."@#@
// @key: @#@"noConferencePermission"@#@ @source: @#@"Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue."@#@
// @key: @#@"conferenceTitle"@#@ @source: @#@"{displayName}'s Conference Meeting"@#@
// @key: @#@"internationalNumber"@#@ @source: @#@"International Dial-in Numbers:"@#@
// @key: @#@"inviteText_att"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_bt"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} "@#@
// @key: @#@"inviteText_rc"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_telus"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} "@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"{brandName} Conference Call"@#@
// @key: @#@"videoCall"@#@ @source: @#@"{brandName} Video Call"@#@
// @key: @#@"addConferencingDetails"@#@ @source: @#@"Adding conferencing details"@#@
// @key: @#@"updateConferencingDetails"@#@ @source: @#@"Updating conferencing details"@#@
// @key: @#@"deleteBtn"@#@ @source: @#@"Delete"@#@
// @key: @#@"settingsBtn"@#@ @source: @#@"Settings"@#@
// @key: @#@"saveAsDefaultAndNotShowAgain"@#@ @source: @#@"Save as default and do not show again"@#@
// @key: @#@"saveAsDefault"@#@ @source: @#@"Save as default"@#@
// @key: @#@"done"@#@ @source: @#@"Done"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"conferenceSettingsTitle"@#@ @source: @#@"{brand} Conference Settings"@#@
// @key: @#@"videoSettingsTitle"@#@ @source: @#@"{brand} Meetings Settings"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"failedToRetrieveMeeting"@#@ @source: @#@"The network connection is lost. Delete this meeting and try again later."@#@
// @key: @#@"meetingSettingsTitle"@#@ @source: @#@"{brand} Meetings - Settings"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring Meeting"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting Options"@#@
// @key: @#@"schedule"@#@ @source: @#@"Schedule"@#@
//# sourceMappingURL=fr-CA.js.map
