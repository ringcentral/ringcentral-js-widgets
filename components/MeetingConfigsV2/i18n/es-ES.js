"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");

var _date$time$hours$minu;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$hours$minu = {
  date: "Fecha",
  time: "Hora",
  hours: "{howMany} h",
  minutes: "{howMany} min",
  today: "Hoy",
  duration: "Duración",
  topic: "Nombre de la reunión",
  voIPOnly: "Solo audio de internet",
  telephonyOnly: "Solo teléfono",
  both: "Teléfono y audio de internet",
  thirdParty: "Audio de terceros",
  meetingId: "ID de reunión",
  password: "Contraseña",
  video: "Vídeo",
  audio: "Audio",
  scheduleFor: "Programar en"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Mi nombre"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Opciones de reunión"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Configuración de la reunión"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Configuración de reuniones por vídeo"), _defineProperty(_date$time$hours$minu, "audioOptions", "Opciones de audio"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Reunión recurrente"), _defineProperty(_date$time$hours$minu, "recurringNote", "Nota: Habilite esta opción al elegir la recurrencia."), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Permitir a los participantes unirse antes que el organizador"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Desactivar la cámara para los participantes"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Desactivar la cámara del organizador al unirse a la reunión"), _defineProperty(_date$time$hours$minu, "requirePassword", "Solicitar contraseña"), _defineProperty(_date$time$hours$minu, "enterPassword", "Introducir contraseña"), _defineProperty(_date$time$hours$minu, "setPassword", "Establecer contraseña *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "Se requiere la contraseña de la reunión"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "La contraseña debe tener un máximo de 10 caracteres o números y no puede incluir símbolos, excepto “@”, “*” o “-”."), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "La contraseña debe tener un máximo de 10 caracteres o números y no puede incluir símbolos, excepto “@”, “*” o “-”."), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Utilizar ID de reunión personal"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "Si desea realizar cambios en su reunión personal, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "modifique la configuración del PMI."), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "Si modifica la configuración y programa esta reunión, todas las reuniones con ID de reunión personal usarán la configuración más reciente."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "El administrador de la empresa gestiona esta opción."), _defineProperty(_date$time$hours$minu, "when", "Cuándo"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "Recuerde comprobar la periodicidad o repetición en la invitación de calendario enviada a los asistentes."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"hours"@#@ @source: @#@"{howMany} hr"@#@
// @key: @#@"minutes"@#@ @source: @#@"{howMany} min"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet audio"@#@
// @key: @#@"thirdParty"@#@ @source: @#@"3rd party audio"@#@
// @key: @#@"meetingId"@#@ @source: @#@"Meeting ID"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"audio"@#@ @source: @#@"Audio"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting options"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"audioOptions"@#@ @source: @#@"Audio options"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring meeting"@#@
// @key: @#@"recurringNote"@#@ @source: @#@"Note: Enable this one when choosing \"Recurrence\""@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"turnOffHostCamera"@#@ @source: @#@"Turn off camera for host when joining meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"when"@#@ @source: @#@"When"@#@
// @key: @#@"recurringDescribe"@#@ @source: @#@"Please remember to check recurrence or repeat in your calendar invitation to your attendees."@#@


exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
