"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _constants = require("ringcentral-integration/modules/RcVideo/constants");

var _topic$date$startTime;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_topic$date$startTime = {
  topic: "Titel des Meetings",
  date: "Datum",
  startTime: "Uhrzeit",
  duration: "Dauer",
  scheduleFor: "Ansetzen im Namen von",
  meetingSettings: "Besprechungseinstellungen"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Mir"), _defineProperty(_topic$date$startTime, "rcMeetingSettings", "Video-Besprechungseinstellungen"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Teilnehmern erlauben, vor dem Gastgeber teilzunehmen"), _defineProperty(_topic$date$startTime, "waitingRoom", "Wartezimmer aktivieren für"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Alle Personen außerhalb meines Unternehmens"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Alle nicht angemeldeten Personen"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Alle"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Teilnehmer können erst nach mir teilnehmen"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Teilnehmer können erst nach dem Gastgeber teilnehmen"), _defineProperty(_topic$date$startTime, "muteAudio", "Ton für Teilnehmer ausschalten"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Kamera für Teilnehmer ausschalten"), _defineProperty(_topic$date$startTime, "requirePassword", "Kennwort erforderlich"), _defineProperty(_topic$date$startTime, "setPassword", "Kennwort festlegen *"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Besprechungskennwort erforderlich"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Verwenden Sie 1 bis 10 Zeichen einschließlich Buchstaben und Ziffern, aber keine Symbole"), _defineProperty(_topic$date$startTime, "passwordHintText", "Ihr Kennwort muss aus 1 bis 10 Buchstaben und Ziffern bestehen und darf keine Symbole enthalten"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Persönliche Besprechungs-ID verwenden"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Sicherheit"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Nur authentifizierte Benutzer können teilnehmen"), _defineProperty(_topic$date$startTime, "signedInUsers", "Angemeldete Benutzer"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Angemeldete Kollegen"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Nur Gastgeber & Moderatoren können den Bildschirm freigeben"), _defineProperty(_topic$date$startTime, "lockTooltip", "Diese Einstellung wird vom Admin Ihres Unternehmens verwaltet"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Diese Einstellungen gelten für alle Meetings, die mit PMI erstellt werden"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Use 1 to 10 characters which include alphabets and numbers but no symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but not contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
