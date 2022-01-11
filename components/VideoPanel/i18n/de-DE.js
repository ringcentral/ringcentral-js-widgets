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
  topic: "Titel der Besprechung",
  date: "Datum",
  startTime: "Uhrzeit",
  duration: "Dauer",
  scheduleFor: "Ansetzen im Namen von",
  meetingSettings: "Besprechungseinstellungen"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Mir"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Teilnehmern erlauben, vor dem Gastgeber teilzunehmen"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Wartezimmer aktivieren"), _defineProperty(_topic$date$startTime, "waitingRoom", "Wartezimmer aktivieren für"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Jeder außerhalb meines Unternehmens"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Jeder, der nicht angemeldet ist"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Alle"), _defineProperty(_topic$date$startTime, "enterPassword", "Kennwort eingeben"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Teilnehmer können erst nach mir teilnehmen"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Teilnehmer können erst nach dem Gastgeber teilnehmen"), _defineProperty(_topic$date$startTime, "muteAudio", "Ton für Teilnehmer stummschalten"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Kamera für Teilnehmer deaktivieren"), _defineProperty(_topic$date$startTime, "requirePassword", "Kennwort erforderlich"), _defineProperty(_topic$date$startTime, "useE2ee", "Ende-zu-Ende-Verschlüsselung verwenden"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "Besprechungen mit End-to-End-Verschlüsselung sind am privatesten, jedoch sind Funktionen wie der Beitritt per Telefon, Untertitel und die Aufzeichnung nicht verfügbar."), _defineProperty(_topic$date$startTime, "setPassword", "Kennwort festlegen *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Kennwort festlegen"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Besprechungskennwort erforderlich"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten"), _defineProperty(_topic$date$startTime, "passwordHintText", "Ihr Passwort sollte 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Persönliche Besprechungs-ID verwenden:"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Sicherheit"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Nur authentifizierte Benutzer können teilnehmen"), _defineProperty(_topic$date$startTime, "signedInUsers", "Angemeldete Benutzer"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Angemeldete Kollegen"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Nur Gastgeber & Moderatoren können den Bildschirm freigeben"), _defineProperty(_topic$date$startTime, "lockTooltip", "Ihr Unternehmens-Admin verwaltet diese Einstellung"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Diese Einstellungen gelten für alle Meetings, die mit PMI erstellt werden"), _defineProperty(_topic$date$startTime, "today", "Heute"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Planen Sie einen Termin für jemand anderen?\n1. Stellen Sie sicher, dass Sie in ihrem Outlook-Kalender eingetragen sind.\n2. Wählen Sie in der Dropdown-Liste die Person aus, für die Sie den Termin planen möchten.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Details erfahren."), _defineProperty(_topic$date$startTime, "changePmiSettings", "Einstellungen für persönliche Besprechung ändern"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "Beachten Sie, dass {appName} nach dem 16. Februar 2022 nicht mehr mit Internet Explorer 11 funktionieren wird. Wir empfehlen einen Wechsel zu Microsoft Edge oder ein Update auf Outlook 2016 oder höher."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
