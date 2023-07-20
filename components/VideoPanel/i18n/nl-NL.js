"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _topic$date$startTime;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_topic$date$startTime = {
  topic: "Meetingtitel",
  date: "Datum",
  startTime: "Tijd",
  duration: "Duur",
  scheduleFor: "Plannen namens",
  meetingSettings: "Meetinginstellingen"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "Mijzelf"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Deelnemers toestaan voor de host binnen te komen"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Wachtruimte inschakelen"), _defineProperty(_topic$date$startTime, "waitingRoom", "Wachtruimte inschakelen voor"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Iedereen buiten mijn bedrijf"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Iedereen die niet is aangemeld"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Iedereen"), _defineProperty(_topic$date$startTime, "enterPassword", "Wachtwoord invoeren"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Deelnemers kunnen pas na mij deelnemen"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Deelnemers kunnen pas na de host deelnemen"), _defineProperty(_topic$date$startTime, "muteAudio", "Audio dempen voor deelnemers"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Camera uitschakelen voor deelnemers"), _defineProperty(_topic$date$startTime, "requirePassword", "Wachtwoord vereisen"), _defineProperty(_topic$date$startTime, "useE2ee", "End-to-end-versleuteling gebruiken"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "Meetings die end-to-end versleuteld zijn, zijn het meest privé, maar functies als inbellen, ondertitels en opnemen zijn dan niet beschikbaar."), _defineProperty(_topic$date$startTime, "setPassword", "Wachtwoord instellen *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Wachtwoord instellen"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Wachtwoord meeting vereist"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Uw wachtwoord moet 1-10 letters en cijfers lang zijn, maar mag geen symbolen bevatten"), _defineProperty(_topic$date$startTime, "passwordHintText", "Uw wachtwoord moet 1-10 letters en cijfers lang zijn, maar mag geen symbolen bevatten"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Persoonlijke meeting-ID gebruiken"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Beveiliging"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Alleen geverifieerde gebruikers kunnen deelnemen"), _defineProperty(_topic$date$startTime, "signedInUsers", "Aangemelde gebruikers"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Aangemelde collega's"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Alleen hosts en moderators kunnen hun scherm delen"), _defineProperty(_topic$date$startTime, "lockTooltip", "Deze instelling wordt beheerd door uw bedrijfsbeheerder"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Deze instellingen zijn van toepassing op alle meetings die met PMI zijn gemaakt"), _defineProperty(_topic$date$startTime, "today", "Vandaag"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Plannen namens iemand anders?\n1. Zorg dat u toegang hebt tot zijn of haar Outlook Agenda.\n2. Selecteer in de vervolgkeuzelijst de persoon voor wie u plant.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Meer informatie"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Instellingen voor persoonlijke meeting wijzigen"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "Houd er rekening mee dat na 16 februari 2022 {appName} niet werkt met Internet Explorer 11. We raden aan over te schakelen naar Microsoft Edge of te updaten naar Outlook 2016 of hoger."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
// @key: @#@"useE2ee"@#@ @source: @#@"Use end-to-end encryption"@#@
// @key: @#@"e2eeTooltip"@#@ @source: @#@"End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."@#@
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
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
