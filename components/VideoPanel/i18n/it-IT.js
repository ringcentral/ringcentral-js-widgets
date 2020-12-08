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
  topic: "Titolo della riunione",
  date: "Data",
  startTime: "Ora",
  duration: "Durata",
  scheduleFor: "Programma per conto di",
  meetingSettings: "Impostazioni riunione"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Me stesso"), _defineProperty(_topic$date$startTime, "rcMeetingSettings", "Impostazioni riunione video"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Consenti ai partecipanti di accedere prima dell'host"), _defineProperty(_topic$date$startTime, "waitingRoom", "Attiva la sala d'attesa per"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Chiunque al di fuori della mia azienda"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Chi non si è registrato"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Tutti"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "I partecipanti possono accedere solo dopo di me"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "I partecipanti possono accedere solo dopo l'host"), _defineProperty(_topic$date$startTime, "muteAudio", "Disatt. audio partecipanti"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Spegni la videocamera per i partecipanti"), _defineProperty(_topic$date$startTime, "requirePassword", "Richiedi password"), _defineProperty(_topic$date$startTime, "setPassword", "Imposta la password *"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "La password per la riunione è obbligatoria"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Usa da 1 a 10 caratteri che includono caratteri alfanumerici, ma senza simboli"), _defineProperty(_topic$date$startTime, "passwordHintText", "La password deve contenere da 1 a 10 lettere e numeri ma non contenere simboli"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Usa ID riunione personale"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Sicurezza"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Possono partecipare solo gli utenti autenticati"), _defineProperty(_topic$date$startTime, "signedInUsers", "Utenti che hanno effettuato l'accesso"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Collaboratori che hanno effettuato l'accesso"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Solo gli host e i moderatori possono condividere lo schermo"), _defineProperty(_topic$date$startTime, "lockTooltip", "Questa impostazione è gestita dall'amministratore della tua azienda"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Queste impostazioni si applicheranno a tutte le riunioni create con il PMI"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=it-IT.js.map
