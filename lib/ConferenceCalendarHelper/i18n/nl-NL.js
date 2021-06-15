"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} nodigt u uit voor een {brandName}-meeting.\n\nDeelnemen vanaf pc, Mac, iOS of Android: {joinUri}{passwordTpl}\n\n Of iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Of telefoon:\n\t     Bel:\n\t    {phoneDialingNumberTpl}\n\t     Meeting-ID: {meetingId}\n\t     Beschikbare internationale nummers: {teleconference} ",
  conferenceLocationField: "Conferencemeeting, inbelnummer: {dialInNumber}",
  scheduleError: "Er is bij ons iets fout gegaan. Probeer het opnieuw.",
  noMeetingPermission: "U hebt geen {brandName}-meetingrechten. Neem contact op met uw bedrijfsbeheerder om door te gaan.",
  noConferencePermission: "U hebt geen {brandName}-meetingrechten. Neem contact op met uw bedrijfsbeheerder om door te gaan.",
  conferenceTitle: "Conferencemeeting van {displayName}",
  internationalNumber: "Internationale inbelnummers:",
  inviteText_att: "Neem deel aan de {brandName}-conference.\n\nInbelnummer: {formattedDialInNumber} \n{additionalNumbersSection} \nToegang deelnemer: {participantCode} \n\nEen internationaal inbelnummer nodig? Ga naar{dialInNumbersLinks} \n\nDeze conference wordt u aangeboden door {brandName} Conferencing.",
  inviteText_bt: "Neem deel aan de {brandName}-conference.\n\nInbelnummer: {formattedDialInNumber} \n{additionalNumbersSection} \nToegang deelnemer: {participantCode} \n\nExtra inbelnummers {dialInNumbersLinks} ",
  inviteText_rc: "Neem deel aan de {brandName}-conference.\n\nInbelnummer: {formattedDialInNumber} \n{additionalNumbersSection} \nToegang deelnemer: {participantCode} \n\nEen internationaal inbelnummer nodig? Ga naar{dialInNumbersLinks} \n\nDeze conference wordt u aangeboden door {brandName} Conferencing.",
  inviteText_telus: "Neem deel aan de {brandName}-conference.\n\nInbelnummer: {formattedDialInNumber} \n{additionalNumbersSection} \nToegang deelnemer: {participantCode} \n\nExtra inbelnummers {dialInNumbersLinks} ",
  conferenceCall: "{brandName} conferencecall",
  videoCall: "{brandName} video-oproep",
  addConferencingDetails: "Conferencegegevens toevoegen",
  updateConferencingDetails: "Conferencegegevens worden bijgewerkt"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "Er is bij ons iets fout gegaan. Probeer het opnieuw."), _defineProperty(_inviteMeetingContent, "deleteBtn", "Verwijderen"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Instellingen"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "Opslaan als standaard en niet meer weergeven"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "Opslaan als standaard"), _defineProperty(_inviteMeetingContent, "done", "Gereed"), _defineProperty(_inviteMeetingContent, "update", "Bijwerken"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "{brand} conference-instellingen"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "Instellingen {brand} Meetings"), _defineProperty(_inviteMeetingContent, "password", "Wachtwoord"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "De netwerkverbinding is verbroken. Verwijder deze meeting en probeer het later opnieuw."), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand}-meetings: instellingen"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "Terugkerende meeting"), _defineProperty(_inviteMeetingContent, "meetingOptions", "Meetingsopties"), _defineProperty(_inviteMeetingContent, "schedule", "Plannen"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Instellingen"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
// @key: @#@"conferenceLocationField"@#@ @source: @#@"Conference Meeting, Dial-in Number: {dialInNumber}"@#@
// @key: @#@"scheduleError"@#@ @source: @#@"Sorry, something went wrong, please try again."@#@
// @key: @#@"noMeetingPermission"@#@ @source: @#@"Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue."@#@
// @key: @#@"noConferencePermission"@#@ @source: @#@"Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue."@#@
// @key: @#@"conferenceTitle"@#@ @source: @#@"{displayName}'s Conference Meeting"@#@
// @key: @#@"internationalNumber"@#@ @source: @#@"International Dial-in Numbers:"@#@
// @key: @#@"inviteText_att"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLinks} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_bt"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLinks} "@#@
// @key: @#@"inviteText_rc"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLinks} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_telus"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLinks} "@#@
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
//# sourceMappingURL=nl-NL.js.map
