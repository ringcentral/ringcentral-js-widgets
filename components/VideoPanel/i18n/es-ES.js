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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_topic$date$startTime = {
  topic: "Nombre de la reunión",
  date: "Fecha",
  startTime: "Hora",
  duration: "Duración",
  scheduleFor: "Programar en nombre de",
  meetingSettings: "Configuración de la reunión"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "Mi nombre"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Permitir a los participantes unirse antes que el host"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Habilitar sala de espera"), _defineProperty(_topic$date$startTime, "waitingRoom", "Habilitar sala de espera para"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Cualquier usuario de fuera de mi empresa"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Cualquier usuario que no haya iniciado sesión"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "A todos"), _defineProperty(_topic$date$startTime, "enterPassword", "Introducir contraseña"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Los participantes solo pueden unirse después de mí"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Los participantes pueden unirse solo después del host"), _defineProperty(_topic$date$startTime, "muteAudio", "Silenciar el audio de los participantes"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Desactivar la cámara de los participantes"), _defineProperty(_topic$date$startTime, "requirePassword", "Solicitar contraseña"), _defineProperty(_topic$date$startTime, "useE2ee", "Usar cifrado de extremo a extremo"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "Las reuniones con cifrado de extremo a extremo son las más privadas, sin embargo, habrá características que no estén disponibles como unirse por teléfono, subtitulado y grabación."), _defineProperty(_topic$date$startTime, "setPassword", "Establecer contraseña *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Establecer contraseña"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Contraseña de la reunión obligatoria"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "La contraseña debe tener entre 1 y 10 caracteres o números y no puede incluir símbolos."), _defineProperty(_topic$date$startTime, "passwordHintText", "Su contraseña debe tener entre 1 y 10 letras y números, pero no puede contener símbolos"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Utilizar ID de reunión personal"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Seguridad"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Solo los usuarios autentificados pueden unirse"), _defineProperty(_topic$date$startTime, "signedInUsers", "Usuarios registrados"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Compañeros registrados"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Solo el organizador y los moderadores pueden compartir la pantalla"), _defineProperty(_topic$date$startTime, "lockTooltip", "El administrador de la empresa gestiona esta opción."), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Esta configuración se aplicará a todas las reuniones creadas con el PMI."), _defineProperty(_topic$date$startTime, "today", "Hoy"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "¿La está programando en nombre de otra persona?\n1. Asegúrese de que está en su calendario de Outlook.\n2. En el menú desplegable, seleccione la persona en cuyo nombre desea programar.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Más información"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Cambiar ajustes de la reunión personal"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
