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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_topic$date$startTime = {
  topic: "Titolo della riunione",
  date: "Data",
  startTime: "Ora",
  duration: "Durata",
  scheduleFor: "Programma per conto di",
  meetingSettings: "Impostazioni riunione"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "Me"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Consenti ai partecipanti di accedere prima dell'host"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Abilita sala d'attesa"), _defineProperty(_topic$date$startTime, "waitingRoom", "Abilita sala d'attesa per"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Chiunque al di fuori della mia azienda"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Chi non si è registrato"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Tutti"), _defineProperty(_topic$date$startTime, "enterPassword", "Immetti password"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "I partecipanti possono accedere solo dopo di me"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "I partecipanti possono accedere solo dopo l'host"), _defineProperty(_topic$date$startTime, "muteAudio", "Disattiva l'audio per i partecipanti"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Disattiva la videocamera per i partecipanti"), _defineProperty(_topic$date$startTime, "requirePassword", "Richiedi password"), _defineProperty(_topic$date$startTime, "useE2ee", "Utilizza la codifica end-to-end"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "Le riunioni con crittografia end-to-end sono le più private, ma non offrono funzionalità come la partecipazione tramite telefono, i sottotitoli e la registrazione."), _defineProperty(_topic$date$startTime, "setPassword", "Imposta password *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Imposta la password"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "La password per la riunione è obbligatoria"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "La password deve avere 1-10 lettere e numeri e non può contenere simboli"), _defineProperty(_topic$date$startTime, "passwordHintText", "La password deve contenere da 1 a 10 lettere e numeri, ma non può contenere simboli"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Usa ID riunione personale"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Sicurezza"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Solo gli utenti autenticati possono partecipare"), _defineProperty(_topic$date$startTime, "signedInUsers", "Utenti registrati"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Collaboratori connessi"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Solo host e moderatori possono condividere lo schermo"), _defineProperty(_topic$date$startTime, "lockTooltip", "L'impostazione è gestita dall'amministratore dell'azienda"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Queste impostazioni si applicheranno a tutte le riunioni create con il PMI"), _defineProperty(_topic$date$startTime, "today", "Oggi"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Stai pianificando per qualcun altro?\n1. Assicurati di essere nel loro calendario di Outlook.\n2. Dall'elenco a discesa, seleziona la persona per la quale stai pianificando.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Scopri i dettagli"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Modifica impostazioni riunione personale"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
