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
  date: "Data",
  time: "Ora",
  duration: "Durata",
  topic: "Titolo della riunione",
  voIPOnly: "Solo audio di Internet",
  telephonyOnly: "Solo telefono",
  both: "Audio del telefono e di Internet",
  meetingId: "ID riunione",
  password: "Password",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Programma per conto di"
}, _defineProperty(_date$time$duration$t, _Meeting.ASSISTED_USERS_MYSELF, "Me stesso"), _defineProperty(_date$time$duration$t, "meetingOptions", "Opzioni riunione"), _defineProperty(_date$time$duration$t, "meetingSettings", "Impostazioni riunione"), _defineProperty(_date$time$duration$t, "rcMeetingSettings", "Impostazioni riunione video"), _defineProperty(_date$time$duration$t, "audioOptions", "Opzioni audio"), _defineProperty(_date$time$duration$t, "recurringMeeting", "Riunione ricorrente"), _defineProperty(_date$time$duration$t, "recurringNote", "Nota: Abilita questa opzione quando scegli \"Ricorrenza\""), _defineProperty(_date$time$duration$t, "joinBeforeHost", "Consenti ai partecipanti di accedere prima dell'host"), _defineProperty(_date$time$duration$t, "turnOffCamera", "Spegni la videocamera per i partecipanti"), _defineProperty(_date$time$duration$t, "turnOffHostCamera", "Spegni la videocamera per l'host durante l'accesso alla riunione"), _defineProperty(_date$time$duration$t, "requirePassword", "Richiedi password"), _defineProperty(_date$time$duration$t, "setPassword", "Imposta la password *"), _defineProperty(_date$time$duration$t, "passwordEmptyError", "La password per la riunione è obbligatoria"), _defineProperty(_date$time$duration$t, "rcmPasswordInvalidError", "La password deve avere 1-10 caratteri, deve contenere numeri e non può contenere simboli, tranne @, * o -"), _defineProperty(_date$time$duration$t, "rcmPasswordHintText", "La password deve avere 1-10 caratteri, deve contenere numeri e non può contenere simboli, tranne @, * o -"), _defineProperty(_date$time$duration$t, "usePersonalMeetingId", "Usa ID riunione personale"), _defineProperty(_date$time$duration$t, "pmiChangeConfirm", "Se vuoi apportare modifiche alla tua riunione personale, "), _defineProperty(_date$time$duration$t, "changePmiSettings", "modifica le impostazioni del PMI"), _defineProperty(_date$time$duration$t, "pmiSettingChangeAlert", "Se modifichi le impostazioni e programmi questa riunione, tutte le riunioni con ID riunione personale utilizzeranno le stesse impostazioni più recenti."), _defineProperty(_date$time$duration$t, "lockedTooltip", "Questa impostazione è gestita dall'amministratore della tua azienda"), _defineProperty(_date$time$duration$t, "when", "Quando"), _defineProperty(_date$time$duration$t, "recurringDescribe", "Ricorda di verificare la ricorrenza o la ripetizione dell'invito sul calendario ai tuoi partecipanti."), _date$time$duration$t); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=it-IT.js.map
