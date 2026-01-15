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
var _scheduleFor$schedule;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_scheduleFor$schedule = {
  scheduleFor: 'Agendar em nome de',
  scheduleForAssistedUser: 'Atualize as definições das reuniões em nome de {userName}.',
  scheduleForGuidance: 'Está a agendar para outra pessoa?\n1. Certifique-se de que se encontra no Calendário do Outlook dessa pessoa.\n2. No menu pendente, selecione a pessoa para a qual está a agendar.\n',
  scheduleForGuidanceMore: 'Obter detalhes',
  meetingSettings: 'Definições da reunião',
  meetingSettingsDescription: 'As atualizações serão aplicadas apenas a esta reunião.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Eu'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", 'Utilizar sala de espera'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", 'Os participantes aguardam até que os admita. Ideal para entrevistas ou participantes externos.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", 'Para qualquer pessoa fora da minha empresa'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", 'Para qualquer pessoa sem sessão iniciada'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", 'Para todos os participantes'), _defineProperty(_scheduleFor$schedule, "enterPassword", 'Introduzir palavra-passe'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", 'Iniciar reunião após a sua entrada'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", 'A reunião começará depois de entrar para evitar conversas antecipadas.'), _defineProperty(_scheduleFor$schedule, "requirePassword", 'Exigir palavra-passe'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Mantenha a sua reunião segura. Não será solicitada uma palavra-passe às pessoas que utilizem a ligação.'), _defineProperty(_scheduleFor$schedule, "password", 'Palavra-passe:'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", 'Palavra-passe da reunião obrigatória'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", 'A palavra-passe deve ter 1 a 10 letras e números, mas não pode conter símbolos'), _defineProperty(_scheduleFor$schedule, "passwordHintText", 'A palavra-passe deve ter 1 a 10 letras e números, mas não pode conter símbolos.'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", 'Utilizar ligação da reunião pessoal'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", 'Gerir quem pode entrar'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", 'Qualquer pessoa com a ligação'), _defineProperty(_scheduleFor$schedule, "signedInUsers", 'Apenas contas {shortName}'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", 'Apenas os meus colegas'), _defineProperty(_scheduleFor$schedule, "passwordLabel", 'Palavra-passe'), _defineProperty(_scheduleFor$schedule, "edit", 'Editar'), _defineProperty(_scheduleFor$schedule, "editSettings", 'Editar definições'), _defineProperty(_scheduleFor$schedule, "lockTooltip", 'Esta definição é gerida pelo administrador da empresa'), _defineProperty(_scheduleFor$schedule, "cancel", 'Cancelar'), _defineProperty(_scheduleFor$schedule, "update", 'Atualizar'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", 'Definições da reunião pessoal'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", 'Defina quem pode entrar e como o pode fazer para a sua ligação da reunião pessoal.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"scheduleForAssistedUser"@#@ @source: @#@"Update meetings settings on behalf of {userName}."@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Updates will apply to this meeting only."@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"For all participants"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won't be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"allowMeetingAccess"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"pmiSettingsTitle"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"pmiSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
