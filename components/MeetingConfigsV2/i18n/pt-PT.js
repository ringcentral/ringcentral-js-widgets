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
  time: "Hora",
  duration: "Duração",
  topic: "Título da reunião",
  voIPOnly: "Apenas áudio da Internet",
  telephonyOnly: "Apenas telefone",
  both: "Áudio de telefone e da Internet",
  meetingId: "ID da reunião",
  password: "Palavra-passe",
  video: "Vídeo",
  audio: "Áudio",
  scheduleFor: "Agendar em nome de"
}, _defineProperty(_date$time$duration$t, _Meeting.ASSISTED_USERS_MYSELF, "Eu próprio"), _defineProperty(_date$time$duration$t, "meetingOptions", "Opções da reunião"), _defineProperty(_date$time$duration$t, "meetingSettings", "Definições da reunião"), _defineProperty(_date$time$duration$t, "rcMeetingSettings", "Definições de videoconferência"), _defineProperty(_date$time$duration$t, "audioOptions", "Opções de áudio"), _defineProperty(_date$time$duration$t, "recurringMeeting", "Reunião periódica"), _defineProperty(_date$time$duration$t, "recurringNote", "Nota: ativar este ao selecionar “Periodicidade”"), _defineProperty(_date$time$duration$t, "joinBeforeHost", "Permitir que os participantes entrem antes do anfitrião"), _defineProperty(_date$time$duration$t, "turnOffCamera", "Desligar a câmara dos participantes"), _defineProperty(_date$time$duration$t, "turnOffHostCamera", "Desligar a câmara do anfitrião ao entrar na reunião"), _defineProperty(_date$time$duration$t, "requirePassword", "Requer palavra-passe"), _defineProperty(_date$time$duration$t, "enterPassword", "Introduzir palavra-passe"), _defineProperty(_date$time$duration$t, "setPassword", "Definir palavra-passe *"), _defineProperty(_date$time$duration$t, "passwordEmptyError", "Palavra-passe da reunião obrigatória"), _defineProperty(_date$time$duration$t, "rcmPasswordInvalidError", "A palavra-passe tem de ter 1–10 carateres e números e não pode conter símbolos exceto @, * ou -"), _defineProperty(_date$time$duration$t, "rcmPasswordHintText", "A sua palavra-passe tem de ter 1–10 carateres e números e não pode conter símbolos exceto @, * ou -"), _defineProperty(_date$time$duration$t, "usePersonalMeetingId", "Utilizar ID de reunião pessoal"), _defineProperty(_date$time$duration$t, "pmiChangeConfirm", "Caso pretenda efetuar alterações na sua reunião pessoal, "), _defineProperty(_date$time$duration$t, "changePmiSettings", "altere as definições do PMI"), _defineProperty(_date$time$duration$t, "pmiSettingChangeAlert", "Se alterar as definições e agendar esta reunião, todas as reuniões com ID de reunião pessoal irão utilizar as definições mais recentes."), _defineProperty(_date$time$duration$t, "lockedTooltip", "Esta definição é gerida pelo administrador da empresa"), _defineProperty(_date$time$duration$t, "when", "Quando"), _defineProperty(_date$time$duration$t, "recurringDescribe", "Lembre-se de verificar a periodicidade ou repetição no convite para calendário enviado aos participantes."), _date$time$duration$t); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=pt-PT.js.map
