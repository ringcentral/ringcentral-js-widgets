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
var _default = exports["default"] = (_inviteMeetingContent = {
  inviteMeetingContent: '{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} ',
  conferenceLocationField: 'Conference Meeting, Dial-in Number: {dialInNumber}',
  scheduleError: 'Unexpected error. Try again later.',
  noMeetingPermission: "Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue.",
  noConferencePermission: "Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue.",
  conferenceTitle: "{displayName}'s Conference Meeting",
  internationalNumber: 'International Dial-in Numbers:',
  inviteText_att: 'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing.',
  inviteText_bt: 'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} ',
  inviteText_rc: 'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing.',
  inviteText_telus: 'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} ',
  conferenceCall: '{brandName} Conference Call',
  videoCall: '{brandName} Video Call',
  addConferencingDetails: 'Adding conferencing details',
  updateConferencingDetails: 'Updating conferencing details'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_inviteMeetingContent, "scheduleError", 'Sorry, something went wrong, please try again.'), "deleteBtn", 'Delete'), "settingsBtn", 'Settings'), "saveAsDefaultAndNotShowAgain", 'Save as default and do not show again'), "saveAsDefault", 'Save as default'), "done", 'Done'), "update", 'Update'), "conferenceSettingsTitle", '{brand} Conference Settings'), "videoSettingsTitle", '{brand} Meetings Settings'), "password", 'Password'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", 'The network connection is lost. Delete this meeting and try again later.'), "meetingSettingsTitle", '{brand} Meetings - Settings'), "recurringMeeting", 'Recurring Meeting'), "meetingOptions", 'Meeting Options'), "schedule", 'Schedule'), "settingsBtn", 'Settings'));
//# sourceMappingURL=en-US.js.map
