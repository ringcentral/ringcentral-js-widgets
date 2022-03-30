"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} ",
  conferenceLocationField: "Conference Meeting, Dial-in Number: {dialInNumber}",
  scheduleError: "Sorry, something went wrong, please try again.",
  noMeetingPermission: "Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue.",
  noConferencePermission: "Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue.",
  conferenceTitle: "{displayName}'s Conference Meeting",
  internationalNumber: "International dial-in numbers:",
  inviteText_att: "Please join the {brandName} conference.\n\nDial-in number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing.",
  inviteText_bt: "Please join the {brandName} conference.\n\nDial-in number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} ",
  inviteText_rc: "Please join the {brandName} conference.\n\nDial-in number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing.",
  inviteText_telus: "Please join the {brandName} conference.\n\nDial-in number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} ",
  conferenceCall: "{brandName} conference call",
  videoCall: "{brandName} Video call",
  addConferencingDetails: "Adding conferencing details",
  updateConferencingDetails: "Updating conferencing details"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "Sorry, something went wrong, please try again."), _defineProperty(_inviteMeetingContent, "deleteBtn", "Delete"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Settings"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "Save as default and do not show again"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "Save as default"), _defineProperty(_inviteMeetingContent, "done", "Done"), _defineProperty(_inviteMeetingContent, "update", "Update"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "{brand} Conference Settings"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "{brand} Meetings Settings"), _defineProperty(_inviteMeetingContent, "password", "Password"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "The network connection has been lost. Delete this meeting and try again later."), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} Meetings – Settings"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "Recurring Meeting"), _defineProperty(_inviteMeetingContent, "meetingOptions", "Meeting Options"), _defineProperty(_inviteMeetingContent, "schedule", "Schedule"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Settings"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=en-GB.js.map
