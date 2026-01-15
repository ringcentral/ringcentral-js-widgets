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
var _scheduleFor$schedule;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_scheduleFor$schedule = {
  scheduleFor: 'Agendar em nome de',
  scheduleForAssistedUser: 'Atualizar configurações de reuniões em nome de {userName}.',
  scheduleForGuidance: 'Agendando para outra pessoa?\n1. Certifique-se de que você está no Calendário do Outlook dela.\n2. No menu suspenso, selecione a pessoa para quem você está agendando.\n',
  scheduleForGuidanceMore: 'Ver detalhes',
  meetingSettings: 'Configurações da reunião',
  meetingSettingsDescription: 'As atualizações serão aplicadas somente a esta reunião.'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Eu'), "waitingRoomTitle", 'Usar sala de espera'), "waitingRoomDescription", 'Os participantes aguardam até que você os aceite. Ideal para entrevistas ou participantes externos.'), "waitingRoomNotCoworker", 'Para qualquer pessoa fora da minha empresa'), "waitingRoomGuest", 'Para pessoas não conectadas'), "waitingRoomAll", 'Para todos os participantes'), "enterPassword", 'Inserir senha'), "onlyJoinAfterMe", 'Iniciar reunião após você entrar'), "allowJoinBeforeHostDescription", 'A reunião começará depois que você entrar para evitar conversas antecipadas.'), "requirePassword", 'Exigir senha'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Mantenha sua reunião segura. Qualquer pessoa que usar o link não será solicitada a fornecer uma senha.'), "password", 'Senha:'), "passwordEmptyError", 'Senha da reunião necessária'), "passwordInvalidError", 'A senha deve ter de 1 a 10 letras ou números, mas não pode conter símbolos'), "passwordHintText", 'A senha deve ter de 1 a 10 letras e números, mas não pode conter símbolos.'), "usePersonalMeetingIdInstead", 'Usar link da reunião pessoal'), "allowMeetingAccess", 'Gerenciar quem pode entrar'), "anyoneWithLink", 'Qualquer pessoa com um link'), "signedInUsers", 'Apenas contas {shortName}'), "signedInCoWorkers", 'Somente meus colegas de trabalho'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, "passwordLabel", 'Senha'), "edit", 'Editar'), "editSettings", 'Editar configurações'), "lockTooltip", 'Esta configuração é gerenciada pelo administrador da empresa'), "cancel", 'Cancelar'), "update", 'Atualizar'), "pmiSettingsTitle", 'Configurações da reunião pessoal'), "pmiSettingsDescription", 'Defina quem pode entrar e como para o link da reunião pessoal.')); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
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
//# sourceMappingURL=pt-BR.js.map
