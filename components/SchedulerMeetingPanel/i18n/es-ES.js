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
  scheduleFor: 'Programar en nombre de',
  scheduleForAssistedUser: 'Actualizar la configuración de las reuniones en nombre de{userName}.',
  scheduleForGuidance: '¿La está programando en nombre de otra persona?\n1 Asegúrese de que está en su calendario de Outlook.\n2 En el menú desplegable, seleccione la persona en cuyo nombre desea programar.\n',
  scheduleForGuidanceMore: 'Más información',
  meetingSettings: 'Configuración de la reunión',
  meetingSettingsDescription: 'Las actualizaciones se aplicarán solo a esta reunión.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Mí'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", 'Ver sala de espera'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", 'Los participantes esperan hasta que los admita. Ideal para entrevistas o asistentes externos.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", 'Cualquiera que no sea parte de mi empresa'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", 'Para cualquiera que no haya iniciado sesión'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", 'Para todos los participantes'), _defineProperty(_scheduleFor$schedule, "enterPassword", 'Introducir contraseña'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", 'Iniciar reunión después de unirse'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", 'La reunión comenzará después de que se una para evitar conversaciones antes de unirse.'), _defineProperty(_scheduleFor$schedule, "requirePassword", 'Solicitar contraseña'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Mantenga su reunión segura. A cualquier persona que use el enlace no se le pedirá una contraseña.'), _defineProperty(_scheduleFor$schedule, "password", 'Contraseña:'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", 'Contraseña de la reunión obligatoria'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", 'La contraseña debe tener entre 1 y 10 caracteres o números y no puede incluir símbolos.'), _defineProperty(_scheduleFor$schedule, "passwordHintText", 'Su contraseña debe tener entre 1 y 10 letras y números, pero no puede contener símbolos'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", 'Usar enlace de reunión personal'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", 'Gestionar quién puede unirse'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", 'Cualquier persona con un enlace'), _defineProperty(_scheduleFor$schedule, "signedInUsers", 'Solo {shortName} cuentas'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", 'Solo compañeros'), _defineProperty(_scheduleFor$schedule, "passwordLabel", 'Contraseña'), _defineProperty(_scheduleFor$schedule, "edit", 'Editar'), _defineProperty(_scheduleFor$schedule, "editSettings", 'Editar configuración'), _defineProperty(_scheduleFor$schedule, "lockTooltip", 'Esta configuración la gestiona el administrador de su empresa'), _defineProperty(_scheduleFor$schedule, "cancel", 'Cancelar'), _defineProperty(_scheduleFor$schedule, "update", 'Actualizar'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", 'Ajustes de la reunión personal'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", 'Establezca quién puede unirse y cómo para el enlace de su reunión personal.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
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
//# sourceMappingURL=es-ES.js.map
