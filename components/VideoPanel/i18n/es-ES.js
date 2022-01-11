"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _constants = require("@ringcentral-integration/commons/modules/RcVideo/constants");

var _topic$date$startTime;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_topic$date$startTime = {
  topic: "Nombre de la reunión",
  date: "Fecha",
  startTime: "Hora",
  duration: "Duración",
  scheduleFor: "Programar en",
  meetingSettings: "Configuración de la reunión"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Mi nombre"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Permitir a los participantes unirse antes que el organizador"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Habilitar sala de espera"), _defineProperty(_topic$date$startTime, "waitingRoom", "Habilitar sala de espera para"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Cualquier usuario de fuera de mi empresa"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Cualquier usuario que no haya iniciado sesión"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Todos"), _defineProperty(_topic$date$startTime, "enterPassword", "Introducir contraseña"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Los participantes solo pueden unirse después de mí"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Los participantes solo pueden unirse después del organizador"), _defineProperty(_topic$date$startTime, "muteAudio", "Silenciar participantes"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Desactivar cámara de participantes"), _defineProperty(_topic$date$startTime, "requirePassword", "Solicitar contraseña"), _defineProperty(_topic$date$startTime, "useE2ee", "Usar cifrado de extremo a extremo"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "Las reuniones con cifrado de extremo a extremo son las más privadas, sin embargo, habrá características que no estén disponibles como unirse por teléfono, subtitulado y grabación."), _defineProperty(_topic$date$startTime, "setPassword", "Establecer contraseña *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Establecer contraseña"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Se requiere la contraseña de la reunión"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "La contraseña debe tener entre 1 y 10 caracteres o números y no puede incluir símbolos."), _defineProperty(_topic$date$startTime, "passwordHintText", "La contraseña debe tener un máximo de 10 caracteres o números y no puede incluir símbolos"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Utilizar ID de reunión personal"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Seguridad"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Solo pueden unirse los usuarios autenticados"), _defineProperty(_topic$date$startTime, "signedInUsers", "Usuarios con sesión iniciada"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Compañeros de trabajo con la sesión iniciada"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Solo el organizador y los moderadores pueden compartir la pantalla"), _defineProperty(_topic$date$startTime, "lockTooltip", "El administrador de la empresa gestiona esta opción."), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Esta configuración se aplicará a todas las reuniones creadas con el PMI."), _defineProperty(_topic$date$startTime, "today", "Hoy"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "¿La está programando en nombre de otra persona?\n1. Asegúrese de que está en su calendario de Outlook.\n2. En el menú desplegable, seleccione la persona en cuyo nombre desea programar.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Más información"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Cambiar configuración de reunión personal"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "Tenga en cuenta que {appName} no funcionará con Internet Explorer 11 después del 16 de febrero de 2022. Le recomendamos que cambie a Microsoft Edge o actualice a Outlook 2016 o posterior."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@


exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
