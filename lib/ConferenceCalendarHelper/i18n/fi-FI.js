"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} kutsuu sinut tapaamiseen täällä: {brandName}.\n\nLiity tietokoneella, Macilla, iOS:llä tai Androidilla: {joinUri}{passwordTpl}\n\n Tai iPhonella yhdellä napautuksella:\n\t    {mobileDialingNumberTpl}\n\n    Tai puhelimella:\n\t     Soita numeroon:\n\t    {phoneDialingNumberTpl}\n\t     Tapaamistunnus: {meetingId}\n\t     Kansainvälisiä numeroita käytettävissä: {teleconference} ",
  conferenceLocationField: "Neuvottelutapaaminen, soittonumero: {dialInNumber}",
  scheduleError: "Jotakin meni vikaan. Yritä uudelleen.",
  noMeetingPermission: "Sinulla ei ole {brandName} Meetings -käyttölupaa Jatka ottamalla yhteyttä yrityksen järjestelmänvalvojaan.",
  noConferencePermission: "Sinulla ei ole {brandName}-neuvottelujen käyttölupaa. Jatka ottamalla yhteyttä yrityksen järjestelmänvalvojaan.",
  conferenceTitle: "Käyttäjän {displayName} neuvottelutapaaminen",
  internationalNumber: "Kansainväliset soittonumerot:",
  inviteText_att: "Liity neuvotteluun palvelussa {brandName}.\n\nSoittonumero: {formattedDialInNumber} \n{additionalNumbersSection} \nOsallistujan käyttöoikeus: {participantCode} \n\nTarvitsetko kansainvälisen soittonumeron? Siirry kohteeseen {dialInNumbersLink} \n\nTämän neuvottelupuhelun tarjoaa {brandName} Conferencing.",
  inviteText_bt: "Liity neuvotteluun palvelussa {brandName}.\n\nSoittonumero: {formattedDialInNumber} \n{additionalNumbersSection} \nOsallistujan käyttöoikeus: {participantCode} \n\nMuita kansainvälisiä soittonumeroita{dialInNumbersLink} ",
  inviteText_rc: "Liity neuvotteluun palvelussa {brandName}.\n\nSoittonumero: {formattedDialInNumber} \n{additionalNumbersSection} \nOsallistujan käyttöoikeus: {participantCode} \n\nTarvitsetko kansainvälisen soittonumeron? Siirry kohteeseen {dialInNumbersLink} \n\nTämän neuvottelupuhelun tarjoaa {brandName} Conferencing.",
  inviteText_telus: "Liity neuvotteluun palvelussa {brandName}.\n\nSoittonumero: {formattedDialInNumber} \n{additionalNumbersSection} \nOsallistujan käyttöoikeus: {participantCode} \n\nMuita kansainvälisiä soittonumeroita{dialInNumbersLink} ",
  conferenceCall: "Sovelluksen {brandName} neuvottelupuhelu",
  videoCall: "{brandName}-videopuhelu",
  addConferencingDetails: "Lisätään neuvottelun tietoja",
  updateConferencingDetails: "Päivitetään neuvottelun tietoja"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "Jotakin meni vikaan. Yritä uudelleen."), _defineProperty(_inviteMeetingContent, "deleteBtn", "Poista"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Asetukset"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "Tallenna oletuksena äläkä näytä uudelleen"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "Tallenna oletuksena"), _defineProperty(_inviteMeetingContent, "done", "Valmis"), _defineProperty(_inviteMeetingContent, "update", "Päivitä"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "{brand}-neuvotteluasetukset"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "{brand} Meetings -asetukset"), _defineProperty(_inviteMeetingContent, "password", "Salasana"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "Verkkoyhteys menetettiin. Poista tapaaminen ja yritä myöhemmin uudelleen."), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} Meetings – asetukset"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "Toistuva tapaaminen"), _defineProperty(_inviteMeetingContent, "meetingOptions", "Tapaamisasetukset"), _defineProperty(_inviteMeetingContent, "schedule", "Aikataulu"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Asetukset"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=fi-FI.js.map
