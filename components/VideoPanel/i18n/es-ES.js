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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_topic$date$startTime = {
  topic: 'Nombre de la reunión',
  date: 'Fecha',
  startTime: 'Hora',
  duration: 'Duración',
  scheduleFor: 'Programar en nombre de',
  meetingSettings: 'Configuración de la reunión',
  meetingSettingsDescription: 'La actualización de esta configuración se aplicará solo a la reunión actual.',
  here: 'aquí'
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Mí'), _defineProperty(_topic$date$startTime, "joinBeforeHost", 'Permitir a los participantes unirse antes que el host'), _defineProperty(_topic$date$startTime, "enableWaitingRoom", 'Habilitar sala de espera'), _defineProperty(_topic$date$startTime, "waitingRoom", 'Habilitar sala de espera para'), _defineProperty(_topic$date$startTime, "waitingRoomTitle", 'Sala de espera'), _defineProperty(_topic$date$startTime, "waitingRoomDescription", 'Mantenga las reuniones privadas hasta que admita participantes.'), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", 'Cualquiera fuera de mi empresa'), _defineProperty(_topic$date$startTime, "waitingRoomGuest", 'Cualquiera que no haya iniciado sesión'), _defineProperty(_topic$date$startTime, "waitingRoomAll", 'Todo el mundo'), _defineProperty(_topic$date$startTime, "enterPassword", 'Introducir contraseña'), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Los participantes solo pueden unirse después de mí'), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", 'Los participantes pueden unirse solo después del host'), _defineProperty(_topic$date$startTime, "allowJoinBeforeHostDescription", 'Mantiene la reunión segura y sin distracciones hasta que se una.'), _defineProperty(_topic$date$startTime, "muteAudio", 'Silenciar el audio de los participantes'), _defineProperty(_topic$date$startTime, "turnOffCamera", 'Desactivar la cámara de los participantes'), _defineProperty(_topic$date$startTime, "requirePassword", 'Solicitar contraseña'), _defineProperty(_topic$date$startTime, "useE2ee", 'Usar cifrado de extremo a extremo'), _defineProperty(_topic$date$startTime, "e2eeTooltip", 'Las reuniones con cifrado de extremo a extremo son las más privadas, sin embargo, habrá características que no estén disponibles como unirse por teléfono, subtitulado y grabación.'), _defineProperty(_topic$date$startTime, "setPassword", 'Establecer contraseña *'), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", 'Establecer contraseña'), _defineProperty(_topic$date$startTime, "passwordEmptyError", 'Contraseña de la reunión obligatoria'), _defineProperty(_topic$date$startTime, "passwordInvalidError", 'La contraseña debe tener entre 1 y 10 caracteres o números y no puede incluir símbolos.'), _defineProperty(_topic$date$startTime, "passwordHintText", 'Su contraseña debe tener entre 1 y 10 letras y números, pero no puede contener símbolos'), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", 'Utilizar ID de reunión personal'), _defineProperty(_topic$date$startTime, "usePersonalMeetingIdInstead", 'Usar reunión personal en su lugar'), _defineProperty(_topic$date$startTime, "usePersonalMeetingName", 'Usar reunión personal'), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", 'Seguridad'), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", 'Solo los usuarios autentificados pueden unirse'), _defineProperty(_topic$date$startTime, "signedInUsers", 'Usuarios registrados'), _defineProperty(_topic$date$startTime, "signedInCoWorkers", 'Compañeros registrados'), _defineProperty(_topic$date$startTime, "limitScreenSharing", 'Solo el organizador y los moderadores pueden compartir la pantalla'), _defineProperty(_topic$date$startTime, "lockTooltip", 'Esta configuración la gestiona el administrador de su empresa'), _defineProperty(_topic$date$startTime, "pmiSettingAlert", 'Esta configuración se aplicará a todas las reuniones creadas con el PMI.'), _defineProperty(_topic$date$startTime, "today", 'Hoy'), _defineProperty(_topic$date$startTime, "scheduleForGuidance", '¿La está programando en nombre de otra persona?\n1 Asegúrese de que está en su calendario de Outlook.\n2 En el menú desplegable, seleccione la persona en cuyo nombre desea programar.\n'), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", 'Más información'), _defineProperty(_topic$date$startTime, "changePmiSettings", 'Cambiar ajustes de la reunión personal'), _defineProperty(_topic$date$startTime, "allowToRecording", 'Permitir el inicio y la detención de grabaciones'), _defineProperty(_topic$date$startTime, "allowTranscribe", 'Permitir el inicio y la detención de transcripciones'), _defineProperty(_topic$date$startTime, "everyone", 'A todos'), _defineProperty(_topic$date$startTime, "onlyHostModerators", 'Solo host y moderadores'), _defineProperty(_topic$date$startTime, "advancedSettings", 'Configuración avanzada'), _defineProperty(_topic$date$startTime, "whoCanJoin", '¿Quién puede unirse?'), _defineProperty(_topic$date$startTime, "requirePasswordDescription", 'Los participantes que se unan a través del enlace de la reunión no necesitarán introducir la contraseña.'), _defineProperty(_topic$date$startTime, "password", 'Contraseña:'), _defineProperty(_topic$date$startTime, "passwordLabel", 'Contraseña'), _defineProperty(_topic$date$startTime, "edit", 'Editar'), _defineProperty(_topic$date$startTime, "changePassword", 'Cambiar contraseña'), _defineProperty(_topic$date$startTime, "passwordRequired", 'La contraseña es obligatoria'), _defineProperty(_topic$date$startTime, "passwordLengthError", 'La contraseña debe tener entre 1 y 10 caracteres'), _defineProperty(_topic$date$startTime, "passwordFormatError", 'La contraseña solo puede contener letras y números'), _defineProperty(_topic$date$startTime, "passwordHint", 'Su contraseña debe tener entre 1 y 10 letras y números, pero no puede contener símbolos'), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
