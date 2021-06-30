"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _constants = require("@ringcentral-integration/commons/modules/RcVideo/constants");

var _topic$date$startTime;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_topic$date$startTime = {
  topic: "Meetingtitel",
  date: "Datum",
  startTime: "Tijd",
  duration: "Duur",
  scheduleFor: "Plan namens",
  meetingSettings: "Meetingsinstellingen"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Ikzelf"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Deelnemers toestaan voor de host binnen te komen"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Wachtruimte inschakelen"), _defineProperty(_topic$date$startTime, "waitingRoom", "Wachtkamer inschakelen voor"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Iedereen buiten mijn bedrijf"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Iedereen die niet is aangemeld"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Iedereen"), _defineProperty(_topic$date$startTime, "enterPassword", "Wachtwoord invoeren"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Deelnemers kunnen pas na mij deelnemen"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Deelnemers kunnen pas na de host deelnemen"), _defineProperty(_topic$date$startTime, "muteAudio", "Audio dempen voor deelnemers"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Camera uitschakelen voor deelnemers"), _defineProperty(_topic$date$startTime, "requirePassword", "Wachtwoord verplichten"), _defineProperty(_topic$date$startTime, "setPassword", "Wachtwoord instellen *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Wachtwoord instellen"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Wachtwoord voor meeting verplicht"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Uw wachtwoord moet 1-10 letters en cijfers lang zijn maar mag geen symbolen bevatten"), _defineProperty(_topic$date$startTime, "passwordHintText", "Uw wachtwoord moet 1-10 letters en cijfers lang zijn en mag geen symbolen bevatten"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Persoonlijke meeting-ID gebruiken"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Beveiliging"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Alleen geverifieerde gebruikers kunnen deelnemen"), _defineProperty(_topic$date$startTime, "signedInUsers", "Aangemelde gebruikers"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Aangemelde collega's"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Alleen host en beheerders kunnen het scherm delen"), _defineProperty(_topic$date$startTime, "lockTooltip", "Deze instelling wordt beheerd door uw bedrijfsbeheerder"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Deze instellingen zijn van toepassing op alle meetings die met PMI zijn gemaakt"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"setPasswordNotSymbol"@#@ @source: @#@"Set password"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
