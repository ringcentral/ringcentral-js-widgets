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
  topic: "Título de la reunión",
  date: "Fecha",
  startTime: "Hora",
  duration: "Duración",
  scheduleFor: "Programar en nombre de",
  meetingSettings: "Configuración de la reunión"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Mí mismo"), _defineProperty(_topic$date$startTime, "rcMeetingSettings", "Configuración de reuniones por video"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Permitir que los participantes se unan antes del anfitrión"), _defineProperty(_topic$date$startTime, "waitingRoom", "Habiliar la sala de espera para"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Cualquiera fuera de mi empresa"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Cualquiera que no haya iniciado sesión"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Todos"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Los participantes solo pueden unirse después de mí"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Los participantes solo pueden unirse después del anfitrión"), _defineProperty(_topic$date$startTime, "muteAudio", "Apagar el micrófono de los participantes"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Apagar la cámara de los participantes"), _defineProperty(_topic$date$startTime, "requirePassword", "Solicitar contraseña"), _defineProperty(_topic$date$startTime, "setPassword", "Configurar contraseña *"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Se requiere la contraseña de la reunión"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Use de 1 a 10 caracteres que incluyan letras y números, pero no símbolos"), _defineProperty(_topic$date$startTime, "passwordHintText", "Su contraseña debe tener entre 1 y 10 letras y números, pero no debe incluir símbolos"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Usar el ID de reunión personal"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Seguridad"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Solo los usuarios autenticados pueden unirse"), _defineProperty(_topic$date$startTime, "signedInUsers", "Usuarios que han iniciado sesión"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Compañeros de trabajo que han iniciado sesión"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Solo el anfitrión y los moderadores pueden compartir pantalla"), _defineProperty(_topic$date$startTime, "lockTooltip", "Esta configuración es gestionada por el administrador de su empresa"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Esta configuración se aplicará para todas las reuniones creadas con el PMI"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=es-419.js.map
