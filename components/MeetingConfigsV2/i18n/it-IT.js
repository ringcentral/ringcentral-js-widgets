"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");

var _date$time$hours$minu;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$hours$minu = {
  date: "Data",
  time: "Ora",
  hours: "{howMany} h",
  minutes: "{howMany} min",
  today: "Oggi",
  duration: "Durata",
  topic: "Titolo della riunione",
  voIPOnly: "Solo audio di Internet",
  telephonyOnly: "Solo telefono",
  both: "Telefono e audio Internet",
  thirdParty: "Audio di terze parti",
  meetingId: "ID riunione",
  password: "Password",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Programma per conto di"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Me stesso"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Opzioni riunione"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Impostazioni riunione"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Impostazioni riunioni video"), _defineProperty(_date$time$hours$minu, "audioOptions", "Opzioni audio"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Riunione ricorrente"), _defineProperty(_date$time$hours$minu, "recurringNote", "Nota: Abilita questa opzione quando scegli \"Ricorrenza\""), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Consenti ai partecipanti di accedere prima dell'host"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Spegni la videocamera per i partecipanti"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Spegni la videocamera per l'host durante l'accesso alla riunione"), _defineProperty(_date$time$hours$minu, "requirePassword", "Richiedi password"), _defineProperty(_date$time$hours$minu, "enterPassword", "Inserisci password"), _defineProperty(_date$time$hours$minu, "setPassword", "Imposta la password *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "La password per la riunione è obbligatoria"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "La password deve avere 1-10 caratteri, deve contenere numeri e non può contenere simboli, tranne @, * o -"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "La password deve avere 1-10 caratteri, deve contenere numeri e non può contenere simboli, tranne @, * o -"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Usa ID riunione personale"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "Se vuoi apportare modifiche alla tua riunione personale, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "modifica le impostazioni del PMI"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "Se modifichi le impostazioni e programmi questa riunione, tutte le riunioni con ID riunione personale utilizzeranno le stesse impostazioni più recenti."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "L'impostazione è gestita dall'amministratore dell'azienda"), _defineProperty(_date$time$hours$minu, "when", "Quando"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "Ricorda di verificare la ricorrenza o la ripetizione dell'invito sul calendario ai tuoi partecipanti."), _defineProperty(_date$time$hours$minu, "ieSupportAlert", "Tieni presente che {appName} non funzionerà con Internet Explorer 11 dopo il 16 febbraio 2022. Consigliamo di passare a Microsoft Edge o di aggiornare a Outlook 2016 o versione successiva."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@


exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
