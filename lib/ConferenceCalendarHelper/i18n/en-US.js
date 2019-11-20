"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: '{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} ',
  conferenceLocationField: 'Conference Meeting, Dial-in Number: {dialInNumber}',
  scheduleError: 'Unexpected error. Try again later.',
  noMeetingPermission: "Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue.",
  noConferencePermission: "Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue.",
  conferenceTitle: "{displayName}'s Conference Meeting",
  internationalNumber: 'International Dial-in Numbers:',
  inviteText_att: 'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLinks} \n\nThis conference call is brought to you by {brandName} Conferencing.',
  inviteText_bt: 'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLinks} ',
  inviteText_rc: 'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLinks} \n\nThis conference call is brought to you by {brandName} Conferencing.',
  inviteText_telus: 'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLinks} ',
  conferenceCall: '{brandName} Conference Call',
  videoCall: '{brandName} Video Call',
  addConferencingDetails: 'Adding conferencing details',
  updateConferencingDetails: 'Updating conferencing details'
}, _defineProperty(_inviteMeetingContent, "scheduleError", 'Sorry, something went wrong, please try again.'), _defineProperty(_inviteMeetingContent, "deleteBtn", 'Delete'), _defineProperty(_inviteMeetingContent, "settingsBtn", 'Settings'), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", 'Save as default and do not show again'), _defineProperty(_inviteMeetingContent, "saveAsDefault", 'Save as default'), _defineProperty(_inviteMeetingContent, "done", 'Done'), _defineProperty(_inviteMeetingContent, "update", 'Update'), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", '{brand} Conference Settings'), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", '{brand} Meetings Settings'), _defineProperty(_inviteMeetingContent, "password", 'Password'), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", 'The network connection is lost. Delete this meeting and try again later.'), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", '{brand} Meetings - Settings'), _defineProperty(_inviteMeetingContent, "recurringMeeting", 'Recurring Meeting'), _defineProperty(_inviteMeetingContent, "meetingOptions", 'Meeting Options'), _defineProperty(_inviteMeetingContent, "schedule", 'Schedule'), _defineProperty(_inviteMeetingContent, "settingsBtn", 'Settings'), _inviteMeetingContent);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
