"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _date$time$duration$t;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$duration$t = {
  date: "Datum",
  time: "Uhrzeit",
  duration: "Dauer",
  topic: "Titel der Besprechung",
  voIPOnly: "Nur Internet-Audio",
  telephonyOnly: "Nur Telefon",
  both: "Telefon und Internet-Audio",
  meetingId: "Meeting-ID",
  password: "Kennwort",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Ansetzen im Namen von"
}, _defineProperty(_date$time$duration$t, _Meeting.ASSISTED_USERS_MYSELF, "Mir"), _defineProperty(_date$time$duration$t, "meetingOptions", "Meeting-Optionen"), _defineProperty(_date$time$duration$t, "meetingSettings", "Besprechungseinstellungen"), _defineProperty(_date$time$duration$t, "rcMeetingSettings", "Video-Besprechungseinstellungen"), _defineProperty(_date$time$duration$t, "audioOptions", "Audio-Optionen"), _defineProperty(_date$time$duration$t, "recurringMeeting", "Wiederholendes Meeting"), _defineProperty(_date$time$duration$t, "recurringNote", "Hinweis: Diese Option aktivieren, wenn „Wiederholung“ ausgewählt wird"), _defineProperty(_date$time$duration$t, "joinBeforeHost", "Teilnehmern erlauben, vor dem Gastgeber teilzunehmen"), _defineProperty(_date$time$duration$t, "turnOffCamera", "Kamera für Teilnehmer ausschalten"), _defineProperty(_date$time$duration$t, "turnOffHostCamera", "Kamera für Gastgeber bei Teilnahme an Meeting deaktivieren"), _defineProperty(_date$time$duration$t, "requirePassword", "Kennwort erforderlich"), _defineProperty(_date$time$duration$t, "setPassword", "Kennwort festlegen *"), _defineProperty(_date$time$duration$t, "passwordEmptyError", "Besprechungskennwort erforderlich"), _defineProperty(_date$time$duration$t, "rcmPasswordInvalidError", "Ihr Passwort muss 1–10 Zeichen oder Ziffern lang sein und darf keine Symbole außer @, * oder - enthalten"), _defineProperty(_date$time$duration$t, "rcmPasswordHintText", "Ihr Passwort sollte 1–10 Zeichen oder Ziffern lang sein und darf keine Symbole außer @, * oder - enthalten"), _defineProperty(_date$time$duration$t, "usePersonalMeetingId", "Persönliche Besprechungs-ID verwenden"), _defineProperty(_date$time$duration$t, "pmiChangeConfirm", "Wenn Sie an Ihrem persönlichen Meeting Änderungen vornehmen möchten, "), _defineProperty(_date$time$duration$t, "changePmiSettings", "ändern Sie die PMI-Einstellungen"), _defineProperty(_date$time$duration$t, "pmiSettingChangeAlert", "Wenn Sie die Einstellungen ändern und dieses Meeting ansetzen, verwenden alle Meetings mit persönlicher Meeting-ID dieselben aktuellen Einstellungen."), _defineProperty(_date$time$duration$t, "lockedTooltip", "Diese Einstellung wird vom Admin Ihres Unternehmens verwaltet"), _defineProperty(_date$time$duration$t, "when", "Wann"), _defineProperty(_date$time$duration$t, "recurringDescribe", "Aktivieren Sie in der Kalendereinladung für die Teilnehmer die Option für Serien oder Wiederholungen."), _date$time$duration$t); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet Audio"@#@
// @key: @#@"meetingId"@#@ @source: @#@"Meeting ID"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"audio"@#@ @source: @#@"Audio"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting options"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"audioOptions"@#@ @source: @#@"Audio options"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring meeting"@#@
// @key: @#@"recurringNote"@#@ @source: @#@"Note: Enable this one when choosing \"Recurrence\""@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"turnOffHostCamera"@#@ @source: @#@"Turn off camera for host when joining meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"when"@#@ @source: @#@"When"@#@
// @key: @#@"recurringDescribe"@#@ @source: @#@"Please remember to check recurrence or repeat in your calendar invitation to your attendees."@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
