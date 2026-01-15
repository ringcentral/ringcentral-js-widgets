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
var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");
var _date$time$hours$minu;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_date$time$hours$minu = {
  date: 'Datum',
  time: 'Uhrzeit',
  hours: '{howMany} Std.',
  minutes: '{howMany} Min.',
  today: 'Heute',
  duration: 'Dauer',
  topic: 'Titel der Besprechung',
  voIPOnly: 'Nur Internet-Audio',
  telephonyOnly: 'Nur Telefon',
  both: 'Telefon und Internet-Audio',
  thirdParty: 'Drittanbieter-Audio',
  meetingId: 'Besprechungs-ID',
  password: 'Kennwort',
  video: 'Video',
  audio: 'Audio',
  scheduleFor: 'Ansetzen im Namen von'
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, 'Mir'), _defineProperty(_date$time$hours$minu, "meetingOptions", 'Besprechungsoptionen'), _defineProperty(_date$time$hours$minu, "meetingSettings", 'Besprechungseinstellungen'), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", 'Videobesprechungseinstellungen'), _defineProperty(_date$time$hours$minu, "audioOptions", 'Audio-Optionen'), _defineProperty(_date$time$hours$minu, "recurringMeeting", 'Wiederkehrende Besprechung'), _defineProperty(_date$time$hours$minu, "recurringNote", 'Hinweis: Diese Option aktivieren, wenn "Wiederholung" ausgewählt wird'), _defineProperty(_date$time$hours$minu, "joinBeforeHost", 'Teilnehmern erlauben, vor dem Gastgeber teilzunehmen'), _defineProperty(_date$time$hours$minu, "turnOffCamera", 'Kamera für Teilnehmer ausschalten'), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", 'Kamera für Gastgeber bei Teilnahme an Besprechung deaktivieren'), _defineProperty(_date$time$hours$minu, "requirePassword", 'Kennwort erforderlich'), _defineProperty(_date$time$hours$minu, "enterPassword", 'Kennwort eingeben'), _defineProperty(_date$time$hours$minu, "setPassword", 'Kennwort festlegen *'), _defineProperty(_date$time$hours$minu, "passwordEmptyError", 'Besprechungskennwort erforderlich'), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", 'Ihr Kennwort muss 1–10 Zeichen oder Ziffern lang sein und darf keine Symbole außer @, * oder - enthalten'), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", 'Ihr Kennwort muss 1–10 Zeichen oder Ziffern lang sein und darf keine Symbole außer @, * oder - enthalten'), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", 'Persönliche Besprechungs-ID verwenden'), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", 'Wenn Sie an Ihrer persönlichen Besprechung Änderungen vornehmen möchten, '), _defineProperty(_date$time$hours$minu, "changePmiSettings", 'ändern Sie die PMI-Einstellungen'), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", 'Wenn Sie die Einstellungen ändern und diese Besprechung ansetzen, verwenden alle Besprechungen mit persönlicher Besprechungs-ID dieselben aktuellen Einstellungen.'), _defineProperty(_date$time$hours$minu, "lockedTooltip", 'Ihr Unternehmens-Administrator verwaltet diese Einstellung'), _defineProperty(_date$time$hours$minu, "when", 'Wann'), _defineProperty(_date$time$hours$minu, "recurringDescribe", 'Aktivieren Sie in der Kalendereinladung für die Teilnehmer die Option für Serien oder Wiederholungen.'), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"hours"@#@ @source: @#@"{howMany} hr"@#@
// @key: @#@"minutes"@#@ @source: @#@"{howMany} min"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet audio"@#@
// @key: @#@"thirdParty"@#@ @source: @#@"3rd party audio"@#@
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
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
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
