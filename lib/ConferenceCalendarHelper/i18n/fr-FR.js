"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} vous invite à participer à une réunion {brandName}.\n\nRejoignez sur PC, Mac, iOS ou Android : {joinUri}{passwordTpl}\n\n Ou participez sur iPhone en une seule sélection :\n\t    {mobileDialingNumberTpl}\n\n    Ou via un téléphone :\n\t     Composez le :\n\t    {phoneDialingNumberTpl}\n\t     ID de réunion : {meetingId}\n\t     Numéros internationaux disponibles : {teleconference} ",
  conferenceLocationField: "Conférence réunion, numéro d’appel : {dialInNumber}",
  scheduleError: "Désolé, quelque chose s’est mal passé. Veuillez réessayer.",
  noMeetingPermission: "Désolé, vous n’avez pas les autorisations {brandName} Meetings. Contactez l’administrateur de votre entreprise pour continuer.",
  noConferencePermission: "Désolé, vous n’avez pas les autorisations {brandName} Conference. Contactez l’administrateur de votre entreprise pour continuer.",
  conferenceTitle: "Conférence de {displayName}",
  internationalNumber: "Numéros internationaux à composer :",
  inviteText_att: "Veuillez rejoindre la conférence {brandName}.\n\nNuméro d’accès : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant :{participantCode} \n\nVous avez besoin d’un numéro d’accès international ? Veuillez visiter la page {dialInNumbersLink} \n\nCette conférence téléphonique est rendue possible grâce au service de conférences {brandName}.",
  inviteText_bt: "Veuillez rejoindre la conférence {brandName}.\n\nNuméro d’accès : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nNuméros d’accès supplémentaires {dialInNumbersLink} ",
  inviteText_rc: "Veuillez rejoindre la conférence {brandName}.\n\nNuméro d’accès : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant :{participantCode} \n\nVous avez besoin d’un numéro d’accès international ? Veuillez visiter la page {dialInNumbersLink} \n\nCette conférence téléphonique est rendue possible grâce au service de conférences {brandName}.",
  inviteText_telus: "Veuillez rejoindre la conférence {brandName}.\n\nNuméro d’accès : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nNuméros d’accès supplémentaires {dialInNumbersLink} ",
  conferenceCall: "Conférence {brandName} téléphonique",
  videoCall: "Appel vidéo {brandName}",
  addConferencingDetails: "Ajout des détails de la conférence",
  updateConferencingDetails: "Mise à jour des détails de la conférence"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "Désolé, quelque chose s’est mal passé. Veuillez réessayer."), _defineProperty(_inviteMeetingContent, "deleteBtn", "Supprimer"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Paramètres"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "Enregistrer par défaut et ne plus afficher"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "Enregistrer par défaut"), _defineProperty(_inviteMeetingContent, "done", "Terminé"), _defineProperty(_inviteMeetingContent, "update", "M. à jour"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "Paramètres de la conférence {brand}"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "Paramètres de {brand} Meetings"), _defineProperty(_inviteMeetingContent, "password", "Mot de passe"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "Perte de la connexion réseau. Supprimez cette réunion et réessayez plus tard."), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} Meetings - Paramètres"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "Réunion périodique"), _defineProperty(_inviteMeetingContent, "meetingOptions", "Options de réunion"), _defineProperty(_inviteMeetingContent, "schedule", "Prendre rendez-vous"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Paramètres"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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


exports["default"] = _default;
//# sourceMappingURL=fr-FR.js.map
