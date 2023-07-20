"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _topic$date$startTime;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_topic$date$startTime = {
  topic: "Título da reunião",
  date: "Data",
  startTime: "Hora",
  duration: "Duração",
  scheduleFor: "Agendar em nome de",
  meetingSettings: "Configurações da reunião"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "Eu mesmo"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Permitir que os participantes entrem antes do organizador"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Ativar sala de espera"), _defineProperty(_topic$date$startTime, "waitingRoom", "Ativar sala de espera para"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Pessoas de fora da empresa"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Pessoas não conectadas"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Todos"), _defineProperty(_topic$date$startTime, "enterPassword", "Inserir senha"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Os participantes só podem entrar depois de mim"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Os participantes só podem entrar depois do organizador"), _defineProperty(_topic$date$startTime, "muteAudio", "Ativar mudo para participantes"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Desativar câmera para participantes"), _defineProperty(_topic$date$startTime, "requirePassword", "Exigir senha"), _defineProperty(_topic$date$startTime, "useE2ee", "Usar criptografia de ponta a ponta"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "As reuniões com criptografia de ponta a ponta são privadas, mas recursos alguns recursos, como entrar pelo telefone, legenda oculta e gravação, não estão disponíveis."), _defineProperty(_topic$date$startTime, "setPassword", "Definir senha *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Definir senha"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Senha da reunião necessária"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Sua senha deve ter de 1 a 10 letras ou números e não pode conter símbolos"), _defineProperty(_topic$date$startTime, "passwordHintText", "Sua senha deve ter de 1 a 10 letras ou números e não pode conter símbolos"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Usar ID da reunião pessoal"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Segurança"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Somente usuários autenticados podem entrar"), _defineProperty(_topic$date$startTime, "signedInUsers", "Usuários conectados"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Colegas de trabalho conectados"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Apenas o organizador e os moderadores podem compartilhar tela"), _defineProperty(_topic$date$startTime, "lockTooltip", "Configuração gerenciada pelo administrador da empresa"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Essas configurações serão aplicadas a todas as reuniões criadas com o PMI"), _defineProperty(_topic$date$startTime, "today", "Hoje"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Agendando para outra pessoa?\n1. Certifique-se de que você está no Calendário do Outlook dela.\n2. No menu suspenso, selecione a pessoa para quem você está agendando.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Ver detalhes"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Alterar configurações da reunião pessoal"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "Observação: a partir do dia 16 de fevereiro de 2022, o {appName} não funcionará mais com o Internet Explorer 11. Recomendamos alternar para o Microsoft Edge ou atualizar para o Outlook 2016 ou superior."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
// @key: @#@"useE2ee"@#@ @source: @#@"Use end-to-end encryption"@#@
// @key: @#@"e2eeTooltip"@#@ @source: @#@"End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."@#@
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
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
