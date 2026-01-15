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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_topic$date$startTime = {
  topic: 'Titel der Besprechung',
  date: 'Datum',
  startTime: 'Uhrzeit',
  duration: 'Dauer',
  scheduleFor: 'Ansetzen im Namen von',
  meetingSettings: 'Besprechungseinstellungen',
  meetingSettingsDescription: 'Das Aktualisieren dieser Einstellungen gilt nur für die aktuelle Besprechung.',
  here: 'hier'
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Ich'), _defineProperty(_topic$date$startTime, "joinBeforeHost", 'Teilnehmern erlauben, vor dem Gastgeber teilzunehmen'), _defineProperty(_topic$date$startTime, "enableWaitingRoom", 'Wartezimmer aktivieren'), _defineProperty(_topic$date$startTime, "waitingRoom", 'Wartebereich aktivieren für'), _defineProperty(_topic$date$startTime, "waitingRoomTitle", 'Wartebereich'), _defineProperty(_topic$date$startTime, "waitingRoomDescription", 'Halten Sie Besprechungen privat, bis Sie Teilnehmer zugelassen haben.'), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", 'Jeder außerhalb meines Unternehmens'), _defineProperty(_topic$date$startTime, "waitingRoomGuest", 'Jeder, der nicht angemeldet ist'), _defineProperty(_topic$date$startTime, "waitingRoomAll", 'Jeden'), _defineProperty(_topic$date$startTime, "enterPassword", 'Kennwort eingeben'), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Teilnehmer können erst nach mir teilnehmen'), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", 'Teilnehmer können erst nach dem Host beitreten'), _defineProperty(_topic$date$startTime, "allowJoinBeforeHostDescription", 'Sorgt für Sicherheit und Ablenkungsfreiheit während der Besprechung, bis Sie beitreten.'), _defineProperty(_topic$date$startTime, "muteAudio", 'Ton für Teilnehmer stummschalten'), _defineProperty(_topic$date$startTime, "turnOffCamera", 'Kamera für Teilnehmer ausschalten'), _defineProperty(_topic$date$startTime, "requirePassword", 'Kennwort anfordern'), _defineProperty(_topic$date$startTime, "useE2ee", 'End-to-End-Verschlüsselung verwenden'), _defineProperty(_topic$date$startTime, "e2eeTooltip", 'Besprechungen mit End-to-End-Verschlüsselung sind am privatesten, jedoch sind Funktionen wie der Beitritt per Telefon und die Aufzeichnung nicht verfügbar.'), _defineProperty(_topic$date$startTime, "setPassword", 'Kennwort festlegen*'), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", 'Kennwort festlegen'), _defineProperty(_topic$date$startTime, "passwordEmptyError", 'Besprechungskennwort erforderlich'), _defineProperty(_topic$date$startTime, "passwordInvalidError", 'Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten'), _defineProperty(_topic$date$startTime, "passwordHintText", 'Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten'), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", 'Persönliche Besprechungs-ID verwenden:'), _defineProperty(_topic$date$startTime, "usePersonalMeetingIdInstead", 'Stattdessen persönliche Besprechung verwenden'), _defineProperty(_topic$date$startTime, "usePersonalMeetingName", 'Persönliche Besprechung verwenden:'), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", 'Sicherheit'), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", 'Nur authentifizierte Benutzer können teilnehmen'), _defineProperty(_topic$date$startTime, "signedInUsers", 'Angemeldete Benutzer'), _defineProperty(_topic$date$startTime, "signedInCoWorkers", 'Angemeldete Kollegen'), _defineProperty(_topic$date$startTime, "limitScreenSharing", 'Nur Gastgeber & Moderatoren können den Bildschirm freigeben'), _defineProperty(_topic$date$startTime, "lockTooltip", 'Diese Einstellung wird von Ihrem Unternehmensadministrator verwaltet.'), _defineProperty(_topic$date$startTime, "pmiSettingAlert", 'Diese Einstellungen gelten für alle Meetings, die mit PMI erstellt werden'), _defineProperty(_topic$date$startTime, "today", 'Heute'), _defineProperty(_topic$date$startTime, "scheduleForGuidance", 'Planen Sie einen Termin für jemand anderen?\n1. Stellen Sie sicher, dass Sie in ihrem Outlook-Kalender eingetragen sind.\n2. Wählen Sie in der Dropdown-Liste die Person aus, für die Sie den Termin planen möchten.\n'), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", 'Details erfahren.'), _defineProperty(_topic$date$startTime, "changePmiSettings", 'Einstellungen für persönliche Besprechung ändern'), _defineProperty(_topic$date$startTime, "allowToRecording", 'Start/Beenden der Aufzeichnung zulassen'), _defineProperty(_topic$date$startTime, "allowTranscribe", 'Start/Beenden der Transkription zulassen'), _defineProperty(_topic$date$startTime, "everyone", 'Alle'), _defineProperty(_topic$date$startTime, "onlyHostModerators", 'Nur Gastgeber und Moderatoren'), _defineProperty(_topic$date$startTime, "advancedSettings", 'Erweiterte Einstellungen'), _defineProperty(_topic$date$startTime, "whoCanJoin", 'Wer kann beitreten?'), _defineProperty(_topic$date$startTime, "requirePasswordDescription", 'Teilnehmer, die über den Besprechungslink beitreten, müssen kein Kennwort eingeben.'), _defineProperty(_topic$date$startTime, "password", 'Kennwort:'), _defineProperty(_topic$date$startTime, "passwordLabel", 'Kennwort'), _defineProperty(_topic$date$startTime, "edit", 'Bearbeiten'), _defineProperty(_topic$date$startTime, "changePassword", 'Kennwort ändern'), _defineProperty(_topic$date$startTime, "passwordRequired", 'Kennwort ist erforderlich'), _defineProperty(_topic$date$startTime, "passwordLengthError", 'Das Kennwort muss 1–10 Zeichen lang sein'), _defineProperty(_topic$date$startTime, "passwordFormatError", 'Das Kennwort darf nur Buchstaben und Zahlen enthalten'), _defineProperty(_topic$date$startTime, "passwordHint", 'Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten.'), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
