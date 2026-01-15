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
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _topic$date$startTime;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_topic$date$startTime = {
  topic: 'Meetingtitel',
  date: 'Datum',
  startTime: 'Tijd',
  duration: 'Duur',
  scheduleFor: 'Plannen namens',
  meetingSettings: 'Meetinginstellingen',
  meetingSettingsDescription: 'Als u deze instellingen bijwerkt, zijn deze alleen van toepassing op de huidige meeting.',
  here: 'hier'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Mijzelf'), "joinBeforeHost", 'Deelnemers toestaan voor de host binnen te komen'), "enableWaitingRoom", 'Wachtruimte inschakelen'), "waitingRoom", 'Wachtruimte inschakelen voor'), "waitingRoomTitle", 'Wachtruimte'), "waitingRoomDescription", 'Houd meetings privé totdat u deelnemers toelaat.'), "waitingRoomNotCoworker", 'Iedereen buiten mijn bedrijf'), "waitingRoomGuest", 'Iedereen die niet is aangemeld'), "waitingRoomAll", 'Iedereen'), "enterPassword", 'Wachtwoord invoeren'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Deelnemers kunnen pas na mij deelnemen'), "onlyJoinAfterHost", 'Deelnemers kunnen pas na de host deelnemen'), "allowJoinBeforeHostDescription", 'Zo blijft de meeting veilig en zijn er geen afleidingen totdat u deelneemt.'), "muteAudio", 'Audio dempen voor deelnemers'), "turnOffCamera", 'Camera uitschakelen voor deelnemers'), "requirePassword", 'Wachtwoord vereisen'), "useE2ee", 'End-to-end codering gebruiken'), "e2eeTooltip", 'End-to-end gecodeerde meetings zijn het meest privé, maar functies zoals inbellen, ondertitels en opnemen zijn dan niet beschikbaar.'), "setPassword", 'Wachtwoord instellen *'), "setPasswordNotSymbol", 'Wachtwoord instellen'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "passwordEmptyError", 'Wachtwoord meeting vereist'), "passwordInvalidError", 'Uw wachtwoord moet 1-10 letters en cijfers lang zijn, maar mag geen symbolen bevatten'), "passwordHintText", 'Uw wachtwoord moet 1-10 letters en cijfers lang zijn, maar mag geen symbolen bevatten'), "usePersonalMeetingId", 'Persoonlijke meeting-ID gebruiken'), "usePersonalMeetingIdInstead", 'In plaats daarvan persoonlijke meeting gebruiken'), "usePersonalMeetingName", 'Persoonlijke meeting gebruiken:'), "meetingSettingsSecurity", 'Beveiliging'), "onlyAuthUserJoin", 'Alleen geverifieerde gebruikers kunnen deelnemen'), "signedInUsers", 'Aangemelde gebruikers'), "signedInCoWorkers", "Aangemelde collega's"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "limitScreenSharing", 'Alleen hosts en moderators kunnen hun scherm delen'), "lockTooltip", 'Deze instelling wordt beheerd door uw bedrijfsbeheerder'), "pmiSettingAlert", 'Deze instellingen zijn van toepassing op alle meetings die met PMI zijn gemaakt'), "today", 'Vandaag'), "scheduleForGuidance", 'Plannen namens iemand anders?\n1. Zorg dat u toegang hebt tot zijn of haar Outlook Agenda.\n2. Selecteer in de vervolgkeuzelijst de persoon voor wie u plant.\n'), "scheduleForGuidanceMore", 'Meer informatie'), "changePmiSettings", 'Instellingen voor persoonlijke meeting wijzigen'), "allowToRecording", 'Starten en stoppen van opname toestaan'), "allowTranscribe", 'Starten en stoppen van transcriptie toestaan'), "everyone", 'Iedereen'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyHostModerators", 'Alleen host en moderators'), "advancedSettings", 'Geavanceerde instellingen'), "whoCanJoin", 'Wie kan er deelnemen?'), "requirePasswordDescription", 'Deelnemers die via de meetinglink deelnemen, hoeven het wachtwoord niet in te voeren.'), "password", 'Wachtwoord:'), "passwordLabel", 'Wachtwoord'), "edit", 'Bewerken'), "changePassword", 'Wachtwoord wijzigen'), "passwordRequired", 'Wachtwoord is verplicht'), "passwordLengthError", 'Wachtwoord moet 1-10 tekens lang zijn'), _defineProperty(_defineProperty(_topic$date$startTime, "passwordFormatError", 'Wachtwoord mag alleen letters en cijfers bevatten'), "passwordHint", 'Uw wachtwoord moet 1-10 letters en cijfers lang zijn, maar mag geen symbolen bevatten.')); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Update these settings will apply to current meeting only."@#@
// @key: @#@"here"@#@ @source: @#@"here"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Keep meetings private until you admit participants."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"Keeps the meeting secure and distraction-free until you join."@#@
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
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting instead"@#@
// @key: @#@"usePersonalMeetingName"@#@ @source: @#@"Use personal meeting:"@#@
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
// @key: @#@"allowToRecording"@#@ @source: @#@"Allow to start and stop recording"@#@
// @key: @#@"allowTranscribe"@#@ @source: @#@"Allow to start and stop transcription"@#@
// @key: @#@"everyone"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyHostModerators"@#@ @source: @#@"Only host and moderators"@#@
// @key: @#@"advancedSettings"@#@ @source: @#@"Advanced settings"@#@
// @key: @#@"whoCanJoin"@#@ @source: @#@"Who can join?"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Participants who join via the meeting link won’t need to enter the password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"changePassword"@#@ @source: @#@"Change Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordLengthError"@#@ @source: @#@"Password must be 1-10 characters long"@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Password can only contain letters and numbers"@#@
// @key: @#@"passwordHint"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
//# sourceMappingURL=nl-NL.js.map
