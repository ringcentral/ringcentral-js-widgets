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
  time: "Hora",
  hours: "{howMany} horas",
  minutes: "{howMany} min.",
  today: "Hoje",
  duration: "Duração",
  topic: "Título da reunião",
  voIPOnly: "Apenas áudio da Internet",
  telephonyOnly: "Apenas telefone",
  both: "Áudio de telefone e Internet",
  thirdParty: "Áudio de terceiros",
  meetingId: "ID da reunião",
  password: "Palavra-passe",
  video: "Vídeo",
  audio: "Áudio",
  scheduleFor: "Agendar em nome de"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Eu próprio"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Opções da reunião"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Definições da reunião"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Definições de videoconferência"), _defineProperty(_date$time$hours$minu, "audioOptions", "Opções de áudio"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Reunião periódica"), _defineProperty(_date$time$hours$minu, "recurringNote", "Nota: ativar este ao selecionar “Periodicidade”"), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Permitir que os participantes entrem antes do anfitrião"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Desligar a câmara dos participantes"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Desligar a câmara do anfitrião ao entrar na reunião"), _defineProperty(_date$time$hours$minu, "requirePassword", "Exigir palavra-passe"), _defineProperty(_date$time$hours$minu, "enterPassword", "Introduzir palavra-passe"), _defineProperty(_date$time$hours$minu, "setPassword", "Definir palavra-passe *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "Palavra-passe da reunião obrigatória"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "A palavra-passe tem de ter 1–10 carateres e números e não pode conter símbolos, exceto @, * ou -"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "A palavra-passe tem de ter 1–10 carateres e números e não pode conter símbolos, exceto @, * ou -"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Utilizar ID de reunião pessoal"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "Caso pretenda efetuar alterações na sua reunião pessoal, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "altere as definições do PMI"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "Se alterar as definições e agendar esta reunião, todas as reuniões com ID de reunião pessoal irão utilizar as definições mais recentes."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "Esta definição é gerida pelo administrador da empresa"), _defineProperty(_date$time$hours$minu, "when", "Quando"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "Lembre-se de verificar a periodicidade ou repetição no convite para calendário enviado aos participantes."), _defineProperty(_date$time$hours$minu, "ieSupportAlert", "Tenha em atenção que o {appName} não irá funcionar com o Internet Explorer 11 depois de 16 de fevereiro de 2022. Recomendamos que mude para o Microsoft Edge ou atualize para o Outlook 2016 ou superior."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=pt-PT.js.map
