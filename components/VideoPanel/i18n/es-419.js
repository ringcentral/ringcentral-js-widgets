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
  topic: "Título de la reunión",
  date: "Fecha",
  startTime: "Hora",
  duration: "Duración",
  scheduleFor: "Programar en nombre de",
  meetingSettings: "Configuración de la reunión"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "Mí mismo"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Permitir que los participantes se unan antes del anfitrión"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Habilitar la sala de espera"), _defineProperty(_topic$date$startTime, "waitingRoom", "Habilitar la sala de espera para"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Cualquiera fuera de mi empresa"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Cualquiera que no haya iniciado sesión"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Todos"), _defineProperty(_topic$date$startTime, "enterPassword", "Ingrese la contraseña"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Los participantes solo pueden unirse después de mí"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Los participantes solo pueden unirse después del anfitrión"), _defineProperty(_topic$date$startTime, "muteAudio", "Silenciar el audio de los participantes"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Desactivar cámara de participantes"), _defineProperty(_topic$date$startTime, "requirePassword", "Solicitar contraseña"), _defineProperty(_topic$date$startTime, "useE2ee", "Usar cifrado de extremo a extremo"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "Las reuniones cifradas de extremo a extremo son las más privadas, pero las funciones como unirse por teléfono, los subtítulos (CC) y grabar no están disponibles."), _defineProperty(_topic$date$startTime, "setPassword", "Configurar contraseña *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Configurar contraseña"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Se requiere la contraseña de la reunión"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Su contraseña debe contener de 1 a 10 letras y números, pero no puede tener símbolos"), _defineProperty(_topic$date$startTime, "passwordHintText", "Su contraseña debe contener de 1 a 10 letras y números y no puede incluir símbolos"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Usar el ID de reunión personal"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Seguridad"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Solo los usuarios autenticados pueden unirse"), _defineProperty(_topic$date$startTime, "signedInUsers", "Usuarios que han iniciado sesión"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Compañeros que han iniciado sesión"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Solo el host y los moderadores pueden compartir pantalla"), _defineProperty(_topic$date$startTime, "lockTooltip", "Esta configuración la gestiona el administrador de su empresa"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Esta configuración se aplicará para todas las reuniones creadas con el PMI"), _defineProperty(_topic$date$startTime, "today", "Hoy"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "¿Está programando para alguien más?\n1. Asegúrese de que está en su calendario de Outlook.\n2. En el menú desplegable, seleccione la persona para la cual está programando.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Más información"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Cambiar la configuración de la reunión personal"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "Tenga en cuenta que {appName} no funcionará con Internet Explorer 11 después del 16 de febrero de 2022. Recomendamos cambiar a Microsoft Edge o actualizar a Outlook 2016 o superior."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=es-419.js.map
