"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} vous invite à une réunion {brandName}.\n\nS’y joindre sur PC, Mac, iOS ou Android : {joinUri}{passwordTpl}\n\n Ou participer d’un seul toucher sur iPhone :\n\t    {mobileDialingNumberTpl}\n\n    Ou d’un téléphone :\n\t     Numéro à composer :\n\t    {phoneDialingNumberTpl}\n\t      Code de réunion : {meetingId}\n\t     Numéros internationaux disponibles :{teleconference} ",
  conferenceLocationField: "Téléconférence, numéro à composer : {dialInNumber}",
  scheduleError: "Désolé, un problème est survenu. Veuillez réessayer.",
  noMeetingPermission: "Désolé, vous n’avez pas les permissions requises pour les réunion {brandName}. Communiquez avec l’administrateur de votre entreprise pour continuer.",
  noConferencePermission: "Désolé, vous n’avez pas les permissions requises pour la téléconférence {brandName}. Communiquez avec l’administrateur de votre entreprise pour continuer.",
  conferenceTitle: "Téléconférence de {displayName}",
  internationalNumber: "Numéros internationaux à composer :",
  inviteText_att: "Veuillez joindre la téléconférence {brandName}.\n\nNuméro à composer : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nVous avez besoin d’un numéro à composer international? Veuillez visiter le {dialInNumbersLink} \n\nCette téléconférence est rendue possible grâce à {brandName} Conferencing.",
  inviteText_bt: "Veuillez joindre la téléconférence {brandName}.\n\nNuméro à composer : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nAutres numéros à composer {dialInNumbersLink} ",
  inviteText_rc: "Veuillez joindre la téléconférence {brandName}.\n\nNuméro à composer : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nVous avez besoin d’un numéro à composer international? Veuillez visiter le {dialInNumbersLink} \n\nCette téléconférence est rendue possible grâce à {brandName} Conferencing.",
  inviteText_telus: "Veuillez joindre la téléconférence {brandName}.\n\nNuméro à composer : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nAutres numéros à composer {dialInNumbersLink} ",
  conferenceCall: "Téléconférence {brandName}",
  videoCall: "Appel vidéo {brandName}",
  addConferencingDetails: "Ajout de détails du service de téléconférences",
  updateConferencingDetails: "Mise à jour des détails du service de téléconférences"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "Désolé, un problème est survenu. Veuillez réessayer."), _defineProperty(_inviteMeetingContent, "deleteBtn", "Supprimer"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Paramètres"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "Enregistrer comme valeur par défaut et ne plus demander"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "Enregistrer comme valeur par défaut"), _defineProperty(_inviteMeetingContent, "done", "Terminer"), _defineProperty(_inviteMeetingContent, "update", "Mettre à jour"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "Paramètres des téléconférences {brand}"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "Paramètres des réunions {brand}"), _defineProperty(_inviteMeetingContent, "password", "Mot de passe"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "Perte de la connexion réseau. Supprimez cette réunion et réessayez plus tard."), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "Paramètres des réunions {brand}"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "Réunion récurrente"), _defineProperty(_inviteMeetingContent, "meetingOptions", "Options de réunion"), _defineProperty(_inviteMeetingContent, "schedule", "Planifier"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Paramètres"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=fr-CA.js.map
