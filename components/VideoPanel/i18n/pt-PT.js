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
  startTime: "Hora",
  duration: "Duração",
  scheduleFor: "Agendar em nome de",
  meetingSettings: "Definições da reunião"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Eu próprio"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Permitir que os participantes entrem antes do anfitrião"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Ativar sala de espera"), _defineProperty(_topic$date$startTime, "waitingRoom", "Ativar sala de espera para"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Qq pessoa ext. à empresa"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Qq pessoa s/ ses. iniciada"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Todos"), _defineProperty(_topic$date$startTime, "enterPassword", "Introduzir palavra-passe"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Os participantes apenas podem entrar depois de mim"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Os participantes só podem entrar depois do anfitrião"), _defineProperty(_topic$date$startTime, "muteAudio", "Desativar som dos participantes"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Desligar a câmara dos participantes"), _defineProperty(_topic$date$startTime, "requirePassword", "Exigir palavra-passe"), _defineProperty(_topic$date$startTime, "setPassword", "Definir palavra-passe *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Definir palavra-passe"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Palavra-passe da reunião obrigatória"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "A palavra-passe deve ter 1 a 10 letras e números e não pode conter símbolos"), _defineProperty(_topic$date$startTime, "passwordHintText", "A palavra-passe deve ter 1 a 10 letras e números, mas não pode conter símbolos"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Utilizar ID de reunião pessoal"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Segurança"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Apenas utilizadores autenticados podem participar"), _defineProperty(_topic$date$startTime, "signedInUsers", "Utilizadores com sessão iniciada"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Colegas com sessão iniciada"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Apenas o anfitrião e os moderadores podem partilhar o ecrã"), _defineProperty(_topic$date$startTime, "lockTooltip", "Esta definição é gerida pelo administrador da empresa"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Estas definições serão aplicadas a todas as reuniões criadas com o PMI"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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


exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
