"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _topic$date$startTime;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_topic$date$startTime = {
  topic: 'Título da reunião',
  date: 'Data',
  startTime: 'Hora',
  duration: 'Duração',
  scheduleFor: 'Agendar em nome de',
  meetingSettings: 'Definições da reunião',
  meetingSettingsDescription: 'A atualização destas definições irá aplicar-se apenas à reunião atual.',
  here: 'aqui'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Eu'), "joinBeforeHost", 'Permitir que os participantes entrem antes do anfitrião'), "enableWaitingRoom", 'Ativar sala de espera'), "waitingRoom", 'Ativar sala de espera para'), "waitingRoomTitle", 'Sala de espera'), "waitingRoomDescription", 'Mantenha as reuniões privadas até admitir participantes.'), "waitingRoomNotCoworker", 'Qualquer pessoa exterior à minha empresa'), "waitingRoomGuest", 'Qualquer pessoa sem sessão iniciada'), "waitingRoomAll", 'Todos'), "enterPassword", 'Introduzir palavra-passe'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Os participantes só podem entrar depois de mim'), "onlyJoinAfterHost", 'Os participantes só podem entrar após o anfitrião'), "allowJoinBeforeHostDescription", 'Mantenha a reunião segura e sem distrações até entrar.'), "muteAudio", 'Desativar o som dos participantes'), "turnOffCamera", 'Desativar a câmara dos participantes'), "requirePassword", 'Exigir palavra-passe'), "useE2ee", 'Utilizar encriptação ponto a ponto'), "e2eeTooltip", 'As reuniões com encriptação ponto a ponto são as mais privadas, mas certas funcionalidades, como entrar através do telemóvel, as legendas e a gravação, não estão disponíveis.'), "setPassword", 'Definir palavra-passe *'), "setPasswordNotSymbol", 'Definir palavra-passe'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "passwordEmptyError", 'Palavra-passe da reunião obrigatória'), "passwordInvalidError", 'A palavra-passe deve ter 1 a 10 letras e números, mas não pode conter símbolos'), "passwordHintText", 'A palavra-passe deve ter 1 a 10 letras e números, mas não pode conter símbolos'), "usePersonalMeetingId", 'Utilizar ID da reunião pessoal'), "usePersonalMeetingIdInstead", 'Utilizar antes reunião pessoal'), "usePersonalMeetingName", 'Utilizar reunião pessoal:'), "meetingSettingsSecurity", 'Segurança'), "onlyAuthUserJoin", 'Apenas os utilizadores autenticados podem entrar'), "signedInUsers", 'Utilizadores com sessão iniciada'), "signedInCoWorkers", 'Colegas com sessão iniciada'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "limitScreenSharing", 'Apenas o anfitrião e os moderadores podem partilhar o ecrã'), "lockTooltip", 'Esta definição é gerida pelo administrador da empresa'), "pmiSettingAlert", 'Estas definições serão aplicadas a todas as reuniões criadas com o PMI'), "today", 'Hoje'), "scheduleForGuidance", 'Está a agendar para outra pessoa?\n1. Certifique-se de que se encontra no Calendário do Outlook dessa pessoa.\n2. No menu pendente, selecione a pessoa para a qual está a agendar.\n'), "scheduleForGuidanceMore", 'Obter detalhes'), "changePmiSettings", 'Alterar as definições da reunião pessoal'), "allowToRecording", 'Permitir início e paragem da gravação'), "allowTranscribe", 'Permitir início e paragem da transcrição'), "everyone", 'Todos'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyHostModerators", 'Só anfitrião e moderadores'), "advancedSettings", 'Definições avançadas'), "whoCanJoin", 'Quem pode entrar?'), "requirePasswordDescription", 'Os participantes que entrem através da ligação da reunião não necessitam de introduzir a palavra-passe.'), "password", 'Palavra-passe:'), "passwordLabel", 'Palavra-passe'), "edit", 'Editar'), "changePassword", 'Alterar palavra-passe'), "passwordRequired", 'A palavra-passe é obrigatória'), "passwordLengthError", 'A palavra-passe deve ter 1 a 10 carateres'), _defineProperty(_defineProperty(_topic$date$startTime, "passwordFormatError", 'A palavra-passe só pode conter letras e números'), "passwordHint", 'A palavra-passe deve ter 1 a 10 letras e números, mas não pode conter símbolos.')); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Update these settings will apply to current meeting only."@#@
// @key: @#@"here"@#@ @source: @#@"here"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Keep meetings private until you admit participants."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"Keeps the meeting secure and distraction-free until you join."@#@
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
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting instead"@#@
// @key: @#@"usePersonalMeetingName"@#@ @source: @#@"Use personal meeting:"@#@
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
// @key: @#@"allowToRecording"@#@ @source: @#@"Allow to start and stop recording"@#@
// @key: @#@"allowTranscribe"@#@ @source: @#@"Allow to start and stop transcription"@#@
// @key: @#@"everyone"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyHostModerators"@#@ @source: @#@"Only host and moderators"@#@
// @key: @#@"advancedSettings"@#@ @source: @#@"Advanced settings"@#@
// @key: @#@"whoCanJoin"@#@ @source: @#@"Who can join?"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Participants who join via the meeting link won’t need to enter the password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"changePassword"@#@ @source: @#@"Change Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordLengthError"@#@ @source: @#@"Password must be 1-10 characters long"@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Password can only contain letters and numbers"@#@
// @key: @#@"passwordHint"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
//# sourceMappingURL=pt-PT.js.map
