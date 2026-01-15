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
  topic: 'Nombre de la reunión',
  date: 'Fecha',
  startTime: 'Hora',
  duration: 'Duración',
  scheduleFor: 'Programar en nombre de',
  meetingSettings: 'Configuración de la reunión',
  meetingSettingsDescription: 'La actualización de esta configuración se aplicará solo a la reunión actual.',
  here: 'aquí'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Mí'), "joinBeforeHost", 'Permitir a los participantes unirse antes que el host'), "enableWaitingRoom", 'Habilitar sala de espera'), "waitingRoom", 'Habilitar sala de espera para'), "waitingRoomTitle", 'Sala de espera'), "waitingRoomDescription", 'Mantenga las reuniones privadas hasta que admita participantes.'), "waitingRoomNotCoworker", 'Cualquiera fuera de mi empresa'), "waitingRoomGuest", 'Cualquiera que no haya iniciado sesión'), "waitingRoomAll", 'Todo el mundo'), "enterPassword", 'Introducir contraseña'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Los participantes solo pueden unirse después de mí'), "onlyJoinAfterHost", 'Los participantes pueden unirse solo después del host'), "allowJoinBeforeHostDescription", 'Mantiene la reunión segura y sin distracciones hasta que se una.'), "muteAudio", 'Silenciar el audio de los participantes'), "turnOffCamera", 'Desactivar la cámara de los participantes'), "requirePassword", 'Solicitar contraseña'), "useE2ee", 'Usar cifrado de extremo a extremo'), "e2eeTooltip", 'Las reuniones con cifrado de extremo a extremo son las más privadas, sin embargo, habrá características que no estén disponibles como unirse por teléfono, subtitulado y grabación.'), "setPassword", 'Establecer contraseña *'), "setPasswordNotSymbol", 'Establecer contraseña'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "passwordEmptyError", 'Contraseña de la reunión obligatoria'), "passwordInvalidError", 'La contraseña debe tener entre 1 y 10 caracteres o números y no puede incluir símbolos.'), "passwordHintText", 'Su contraseña debe tener entre 1 y 10 letras y números, pero no puede contener símbolos'), "usePersonalMeetingId", 'Utilizar ID de reunión personal'), "usePersonalMeetingIdInstead", 'Usar reunión personal en su lugar'), "usePersonalMeetingName", 'Usar reunión personal'), "meetingSettingsSecurity", 'Seguridad'), "onlyAuthUserJoin", 'Solo los usuarios autentificados pueden unirse'), "signedInUsers", 'Usuarios registrados'), "signedInCoWorkers", 'Compañeros registrados'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "limitScreenSharing", 'Solo el organizador y los moderadores pueden compartir la pantalla'), "lockTooltip", 'Esta configuración la gestiona el administrador de su empresa'), "pmiSettingAlert", 'Esta configuración se aplicará a todas las reuniones creadas con el PMI.'), "today", 'Hoy'), "scheduleForGuidance", '¿La está programando en nombre de otra persona?\n1 Asegúrese de que está en su calendario de Outlook.\n2 En el menú desplegable, seleccione la persona en cuyo nombre desea programar.\n'), "scheduleForGuidanceMore", 'Más información'), "changePmiSettings", 'Cambiar ajustes de la reunión personal'), "allowToRecording", 'Permitir el inicio y la detención de grabaciones'), "allowTranscribe", 'Permitir el inicio y la detención de transcripciones'), "everyone", 'A todos'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyHostModerators", 'Solo host y moderadores'), "advancedSettings", 'Configuración avanzada'), "whoCanJoin", '¿Quién puede unirse?'), "requirePasswordDescription", 'Los participantes que se unan a través del enlace de la reunión no necesitarán introducir la contraseña.'), "password", 'Contraseña:'), "passwordLabel", 'Contraseña'), "edit", 'Editar'), "changePassword", 'Cambiar contraseña'), "passwordRequired", 'La contraseña es obligatoria'), "passwordLengthError", 'La contraseña debe tener entre 1 y 10 caracteres'), _defineProperty(_defineProperty(_topic$date$startTime, "passwordFormatError", 'La contraseña solo puede contener letras y números'), "passwordHint", 'Su contraseña debe tener entre 1 y 10 letras y números, pero no puede contener símbolos')); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=es-ES.js.map
