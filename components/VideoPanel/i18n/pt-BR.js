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
  topic: "Título da reunião",
  date: "Data",
  startTime: "Horário",
  duration: "Duração",
  scheduleFor: "Agendar em nome de",
  meetingSettings: "Configurações da reunião"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Eu mesmo"), _defineProperty(_topic$date$startTime, "rcMeetingSettings", "Configurações da reunião por vídeo"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Permitir que os participantes entrem antes do host"), _defineProperty(_topic$date$startTime, "waitingRoom", "Habilitar sala de espera para"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Pessoas de fora da empresa"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Pessoas que não tenham se conectado"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Todos"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Os participantes só podem entrar depois de mim"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Os participantes só podem entrar depois do host"), _defineProperty(_topic$date$startTime, "muteAudio", "Desativar o áudio dos participantes"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Desativar a câmera dos participantes"), _defineProperty(_topic$date$startTime, "requirePassword", "Exigir senha"), _defineProperty(_topic$date$startTime, "setPassword", "Definir senha *"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Necessária senha da reunião"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Use de 1 a 10 caracteres que incluam letras e números, mas sem símbolos"), _defineProperty(_topic$date$startTime, "passwordHintText", "A senha deve ter entre 1 e 10 letras e números, mas não pode conter símbolos"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Usar ID de reunião pessoal"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Segurança"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Apenas usuários autenticados podem entrar"), _defineProperty(_topic$date$startTime, "signedInUsers", "Usuários conectados"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Colegas de trabalho conectados"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Apenas o host e os moderadores podem compartilhar tela"), _defineProperty(_topic$date$startTime, "lockTooltip", "Esta configuração é gerenciada pelo administrador da sua empresa"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Essas configurações serão aplicadas a todas as reuniões criadas com o PMI."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=pt-BR.js.map
