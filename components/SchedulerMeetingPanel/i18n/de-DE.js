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
var _scheduleFor$schedule;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_scheduleFor$schedule = {
  scheduleFor: 'Ansetzen im Namen von',
  scheduleForAssistedUser: 'Aktualisieren Sie die Besprechungseinstellungen im Namen von {userName}.',
  scheduleForGuidance: 'Planen Sie einen Termin für jemand anderen?\n1. Stellen Sie sicher, dass Sie in ihrem Outlook-Kalender eingetragen sind.\n2. Wählen Sie in der Dropdown-Liste die Person aus, für die Sie den Termin planen möchten.\n',
  scheduleForGuidanceMore: 'Details erfahren.',
  meetingSettings: 'Besprechungseinstellungen',
  meetingSettingsDescription: 'Die Updates werden nur auf diese Besprechung angewendet.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Ich'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", 'Wartebereich verwenden'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", 'Die Teilnehmer warten, bis Sie sie einlassen. Ideal für Vorstellungsgespräche oder externe Teilnehmer.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", 'Für jeden außerhalb meines Unternehmens'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", 'Für jeden, der nicht angemeldet ist'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", 'Für alle Teilnehmer'), _defineProperty(_scheduleFor$schedule, "enterPassword", 'Kennwort eingeben'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", 'Besprechung nach Ihrem Beitritt starten'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", 'Die Besprechung beginnt erst nach Ihrem Beitritt, um vorzeitige Konversationen zu vermeiden.'), _defineProperty(_scheduleFor$schedule, "requirePassword", 'Kennwort anfordern'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Schützen Sie Ihre Besprechung. Jeder, der den Link verwendet, wird nicht zur Eingabe eines Kennworts aufgefordert.'), _defineProperty(_scheduleFor$schedule, "password", 'Kennwort:'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", 'Besprechungskennwort erforderlich'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", 'Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten'), _defineProperty(_scheduleFor$schedule, "passwordHintText", 'Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten.'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", 'Persönlichen Besprechungslink verwenden'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", 'Verwalten, wer beitreten kann'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", 'Alle mit Link'), _defineProperty(_scheduleFor$schedule, "signedInUsers", 'Nur {shortName}-Konten'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", 'Nur meine Kollegen'), _defineProperty(_scheduleFor$schedule, "passwordLabel", 'Kennwort'), _defineProperty(_scheduleFor$schedule, "edit", 'Bearbeiten'), _defineProperty(_scheduleFor$schedule, "editSettings", 'Einstellungen bearbeiten'), _defineProperty(_scheduleFor$schedule, "lockTooltip", 'Diese Einstellung wird von Ihrem Unternehmensadministrator verwaltet.'), _defineProperty(_scheduleFor$schedule, "cancel", 'Abbrechen'), _defineProperty(_scheduleFor$schedule, "update", 'Aktualisieren'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", 'Persönliche Besprechungseinstellungen'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", 'Legen Sie für den persönlichen Besprechungslink fest, wer wie teilnehmen kann.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"scheduleForAssistedUser"@#@ @source: @#@"Update meetings settings on behalf of {userName}."@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Updates will apply to this meeting only."@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"For all participants"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won't be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"allowMeetingAccess"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"pmiSettingsTitle"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"pmiSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
