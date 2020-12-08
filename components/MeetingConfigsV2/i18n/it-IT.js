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
  voIPOnly: "Solo audio di Internet",
  telephonyOnly: "Solo telefono",
  both: "Audio del telefono e di Internet",
  meetingId: "ID riunione",
  password: "Password",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Programma per conto di"
}, _defineProperty(_voIPOnly$telephonyOn, _Meeting.ASSISTED_USERS_MYSELF, "Me stesso"), _defineProperty(_voIPOnly$telephonyOn, "meetingOptions", "Opzioni riunione"), _defineProperty(_voIPOnly$telephonyOn, "meetingSettings", "Impostazioni riunione"), _defineProperty(_voIPOnly$telephonyOn, "rcMeetingSettings", "Impostazioni riunione video"), _defineProperty(_voIPOnly$telephonyOn, "audioOptions", "Opzioni audio"), _defineProperty(_voIPOnly$telephonyOn, "recurringMeeting", "Riunione ricorrente"), _defineProperty(_voIPOnly$telephonyOn, "recurringNote", "Nota: Abilita questa opzione quando scegli \"Ricorrenza\""), _defineProperty(_voIPOnly$telephonyOn, "joinBeforeHost", "Consenti ai partecipanti di accedere prima dell'host"), _defineProperty(_voIPOnly$telephonyOn, "turnOffCamera", "Spegni la videocamera per i partecipanti"), _defineProperty(_voIPOnly$telephonyOn, "turnOffHostCamera", "Spegni la videocamera per l'host durante l'accesso alla riunione"), _defineProperty(_voIPOnly$telephonyOn, "requirePassword", "Richiedi password"), _defineProperty(_voIPOnly$telephonyOn, "setPassword", "Imposta la password *"), _defineProperty(_voIPOnly$telephonyOn, "passwordEmptyError", "La password per la riunione è obbligatoria"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordInvalidError", "La password deve avere 1-10 caratteri, deve contenere numeri e non può contenere simboli, tranne @, * o -"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordHintText", "La password deve avere 1-10 caratteri, deve contenere numeri e non può contenere simboli, tranne @, * o -"), _defineProperty(_voIPOnly$telephonyOn, "usePersonalMeetingId", "Usa ID riunione personale"), _defineProperty(_voIPOnly$telephonyOn, "pmiChangeConfirm", "Se vuoi apportare modifiche alla tua riunione personale, "), _defineProperty(_voIPOnly$telephonyOn, "changePmiSettings", "modifica le impostazioni del PMI"), _defineProperty(_voIPOnly$telephonyOn, "pmiSettingChangeAlert", "Se modifichi le impostazioni e programmi questa riunione, tutte le riunioni con ID riunione personale utilizzeranno le stesse impostazioni più recenti."), _defineProperty(_voIPOnly$telephonyOn, "lockedTooltip", "Questa impostazione è gestita dall'amministratore della tua azienda"), _voIPOnly$telephonyOn); // @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
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
//# sourceMappingURL=it-IT.js.map
