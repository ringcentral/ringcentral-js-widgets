"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _date$time$hours$minu;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$hours$minu = {
  date: "Data",
  time: "Horário",
  hours: "{howMany} h",
  minutes: "{howMany} min.",
  today: "Hoje",
  duration: "Duração",
  topic: "Título da reunião",
  voIPOnly: "Apenas áudio da Internet",
  telephonyOnly: "Apenas telefone",
  both: "Áudio de telefone e da Internet",
  thirdParty: "Áudio de terceiros",
  meetingId: "ID da reunião",
  password: "Senha",
  video: "Vídeo",
  audio: "Áudio",
  scheduleFor: "Agendar em nome de"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Eu mesmo"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Opções de reunião"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Configurações da reunião"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Configurações da reunião por vídeo"), _defineProperty(_date$time$hours$minu, "audioOptions", "Opções de áudio"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Reunião recorrente"), _defineProperty(_date$time$hours$minu, "recurringNote", "Nota: Habilite esta opção ao escolher “Recorrente”"), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Permitir que os participantes entrem antes do organizador"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Desativar a câmera dos participantes"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Desativar a câmera do organizador ao entrar na reunião"), _defineProperty(_date$time$hours$minu, "requirePassword", "Exigir senha"), _defineProperty(_date$time$hours$minu, "enterPassword", "Insira a senha"), _defineProperty(_date$time$hours$minu, "setPassword", "Definir senha *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "Necessária senha da reunião"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "Sua senha deve ter de 1 a 10 caracteres ou números e não pode conter símbolos, exceto @, * ou -"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "Sua senha deve ter de 1 a 10 caracteres ou números e não pode conter símbolos, exceto @, * ou -"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Usar ID da reunião pessoal"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "Se quiser fazer alterações em sua reunião pessoal, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "altere as configurações de PMI."), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "Se você alterar as configurações e agendar esta reunião, todas as reuniões com ID da reunião pessoal usarão essas mesmas configurações mais recentes."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "Configuração gerenciada pelo administrador da empresa."), _defineProperty(_date$time$hours$minu, "when", "Quando"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "Lembre-se de verificar a recorrência ou repetir no convite de calendário para os participantes."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=pt-BR.js.map
