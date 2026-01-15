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
  date: 'Data',
  time: 'Ora',
  hours: '{howMany} h',
  minutes: '{howMany} min',
  today: 'Oggi',
  duration: 'Durata',
  topic: 'Titolo della riunione',
  voIPOnly: 'Solo audio di Internet',
  telephonyOnly: 'Solo telefono',
  both: 'Telefono e audio Internet',
  thirdParty: 'Audio di terze parti',
  meetingId: 'ID riunione',
  password: 'Password',
  video: 'Video',
  audio: 'Audio',
  scheduleFor: 'Programma per conto di'
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, 'Me'), _defineProperty(_date$time$hours$minu, "meetingOptions", 'Opzioni riunione'), _defineProperty(_date$time$hours$minu, "meetingSettings", 'Impostazioni riunione'), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", 'Impostazioni riunioni video'), _defineProperty(_date$time$hours$minu, "audioOptions", 'Opzioni audio'), _defineProperty(_date$time$hours$minu, "recurringMeeting", 'Riunione ricorrente'), _defineProperty(_date$time$hours$minu, "recurringNote", 'Nota: Abilita questa opzione quando scegli "Ricorrenza"'), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Consenti ai partecipanti di accedere prima dell'host"), _defineProperty(_date$time$hours$minu, "turnOffCamera", 'Disattiva la videocamera per i partecipanti'), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Disattiva la videocamera per l'host durante l'accesso alla riunione"), _defineProperty(_date$time$hours$minu, "requirePassword", 'Richiedi password'), _defineProperty(_date$time$hours$minu, "enterPassword", 'Immetti password'), _defineProperty(_date$time$hours$minu, "setPassword", 'Imposta password*'), _defineProperty(_date$time$hours$minu, "passwordEmptyError", 'La password per la riunione è obbligatoria'), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", 'La password deve avere 1-10 caratteri, deve contenere numeri e non può contenere simboli, tranne @, * o -'), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", 'La password deve avere 1-10 caratteri, deve contenere numeri e non può contenere simboli, tranne @, * o -'), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", 'Usa ID riunione personale'), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", 'Se vuoi apportare modifiche alla tua riunione personale, '), _defineProperty(_date$time$hours$minu, "changePmiSettings", 'modifica le impostazioni del PMI'), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", 'Se modifichi le impostazioni e programmi questa riunione, tutte le riunioni con ID riunione personale utilizzeranno le stesse impostazioni più recenti.'), _defineProperty(_date$time$hours$minu, "lockedTooltip", "L'impostazione è gestita dall'amministratore dell'azienda"), _defineProperty(_date$time$hours$minu, "when", 'Data/Ora'), _defineProperty(_date$time$hours$minu, "recurringDescribe", "Ricorda di verificare che l'invito sia ricorrente o ripetuto sul calendario dei partecipanti."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=it-IT.js.map
