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
  time: "Horário",
  duration: "Duração",
  topic: "Título da reunião",
  voIPOnly: "Apenas áudio da Internet",
  telephonyOnly: "Apenas telefone",
  both: "Áudio de telefone e da Internet",
  meetingId: "ID da reunião",
  password: "Senha",
  video: "Vídeo",
  audio: "Áudio",
  scheduleFor: "Agendar em nome de"
}, _defineProperty(_date$time$duration$t, _Meeting.ASSISTED_USERS_MYSELF, "Eu mesmo"), _defineProperty(_date$time$duration$t, "meetingOptions", "Opções de reunião"), _defineProperty(_date$time$duration$t, "meetingSettings", "Configurações da reunião"), _defineProperty(_date$time$duration$t, "rcMeetingSettings", "Configurações da reunião por vídeo"), _defineProperty(_date$time$duration$t, "audioOptions", "Opções de áudio"), _defineProperty(_date$time$duration$t, "recurringMeeting", "Reunião recorrente"), _defineProperty(_date$time$duration$t, "recurringNote", "Nota: Habilite esta opção ao escolher “Recorrente”"), _defineProperty(_date$time$duration$t, "joinBeforeHost", "Permitir que os participantes entrem antes do host"), _defineProperty(_date$time$duration$t, "turnOffCamera", "Desativar a câmera dos participantes"), _defineProperty(_date$time$duration$t, "turnOffHostCamera", "Desligar a câmera do host ao entrar na reunião"), _defineProperty(_date$time$duration$t, "requirePassword", "Exigir senha"), _defineProperty(_date$time$duration$t, "enterPassword", "Insira a senha"), _defineProperty(_date$time$duration$t, "setPassword", "Definir senha *"), _defineProperty(_date$time$duration$t, "passwordEmptyError", "Necessária senha da reunião"), _defineProperty(_date$time$duration$t, "rcmPasswordInvalidError", "Sua senha deve ter de 1 a 10 caracteres ou números e não pode conter símbolos, exceto @, * ou -"), _defineProperty(_date$time$duration$t, "rcmPasswordHintText", "Sua senha deve ter de 1 a 10 caracteres ou números e não pode conter símbolos, exceto @, * ou -"), _defineProperty(_date$time$duration$t, "usePersonalMeetingId", "Usar ID de reunião pessoal"), _defineProperty(_date$time$duration$t, "pmiChangeConfirm", "Se quiser fazer alterações em sua reunião pessoal, "), _defineProperty(_date$time$duration$t, "changePmiSettings", "altere as configurações de PMI."), _defineProperty(_date$time$duration$t, "pmiSettingChangeAlert", "Se você alterar as configurações e agendar esta reunião, todas as reuniões com ID da reunião pessoal usarão essas mesmas configurações mais recentes."), _defineProperty(_date$time$duration$t, "lockedTooltip", "Configuração gerenciada pelo administrador da empresa."), _defineProperty(_date$time$duration$t, "when", "Quando"), _defineProperty(_date$time$duration$t, "recurringDescribe", "Lembre-se de verificar a recorrência ou repetir no convite de calendário para os participantes."), _date$time$duration$t); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=pt-BR.js.map
