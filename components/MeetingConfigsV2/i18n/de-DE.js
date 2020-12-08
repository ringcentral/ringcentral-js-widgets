"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _voIPOnly$telephonyOn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_voIPOnly$telephonyOn = {
  voIPOnly: "Nur Internet-Audio",
  telephonyOnly: "Nur Telefon",
  both: "Telefon und Internet-Audio",
  meetingId: "Meeting-ID",
  password: "Kennwort",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Ansetzen im Namen von"
}, _defineProperty(_voIPOnly$telephonyOn, _Meeting.ASSISTED_USERS_MYSELF, "Mir"), _defineProperty(_voIPOnly$telephonyOn, "meetingOptions", "Meeting-Optionen"), _defineProperty(_voIPOnly$telephonyOn, "meetingSettings", "Besprechungseinstellungen"), _defineProperty(_voIPOnly$telephonyOn, "rcMeetingSettings", "Video-Besprechungseinstellungen"), _defineProperty(_voIPOnly$telephonyOn, "audioOptions", "Audio-Optionen"), _defineProperty(_voIPOnly$telephonyOn, "recurringMeeting", "Wiederholendes Meeting"), _defineProperty(_voIPOnly$telephonyOn, "recurringNote", "Hinweis: Diese Option aktivieren, wenn „Wiederholung“ ausgewählt wird"), _defineProperty(_voIPOnly$telephonyOn, "joinBeforeHost", "Teilnehmern erlauben, vor dem Gastgeber teilzunehmen"), _defineProperty(_voIPOnly$telephonyOn, "turnOffCamera", "Kamera für Teilnehmer ausschalten"), _defineProperty(_voIPOnly$telephonyOn, "turnOffHostCamera", "Kamera für Gastgeber bei Teilnahme an Meeting deaktivieren"), _defineProperty(_voIPOnly$telephonyOn, "requirePassword", "Kennwort erforderlich"), _defineProperty(_voIPOnly$telephonyOn, "setPassword", "Kennwort festlegen *"), _defineProperty(_voIPOnly$telephonyOn, "passwordEmptyError", "Besprechungskennwort erforderlich"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordInvalidError", "Ihr Passwort muss 1–10 Zeichen oder Ziffern lang sein und darf keine Symbole außer @, * oder - enthalten"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordHintText", "Ihr Passwort sollte 1–10 Zeichen oder Ziffern lang sein und darf keine Symbole außer @, * oder - enthalten"), _defineProperty(_voIPOnly$telephonyOn, "usePersonalMeetingId", "Persönliche Besprechungs-ID verwenden"), _defineProperty(_voIPOnly$telephonyOn, "pmiChangeConfirm", "Wenn Sie an Ihrem persönlichen Meeting Änderungen vornehmen möchten, "), _defineProperty(_voIPOnly$telephonyOn, "changePmiSettings", "ändern Sie die PMI-Einstellungen"), _defineProperty(_voIPOnly$telephonyOn, "pmiSettingChangeAlert", "Wenn Sie die Einstellungen ändern und dieses Meeting ansetzen, verwenden alle Meetings mit persönlicher Meeting-ID dieselben aktuellen Einstellungen."), _defineProperty(_voIPOnly$telephonyOn, "lockedTooltip", "Diese Einstellung wird vom Admin Ihres Unternehmens verwaltet"), _voIPOnly$telephonyOn); // @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
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


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
