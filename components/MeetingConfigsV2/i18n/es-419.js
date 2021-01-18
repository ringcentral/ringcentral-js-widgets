"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _date$time$duration$t;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$duration$t = {
  date: "Fecha",
  time: "Hora",
  duration: "Duración",
  topic: "Título de la reunión",
  voIPOnly: "Solo audio de internet",
  telephonyOnly: "Solo teléfono",
  both: "Audio de Internet y teléfono",
  meetingId: "Id. de la reunión",
  password: "Contraseña",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Programar en nombre de"
}, _defineProperty(_date$time$duration$t, _Meeting.ASSISTED_USERS_MYSELF, "Mí mismo"), _defineProperty(_date$time$duration$t, "meetingOptions", "Opciones de la reunión"), _defineProperty(_date$time$duration$t, "meetingSettings", "Configuración de la reunión"), _defineProperty(_date$time$duration$t, "rcMeetingSettings", "Configuración de reuniones por video"), _defineProperty(_date$time$duration$t, "audioOptions", "Opciones de audio"), _defineProperty(_date$time$duration$t, "recurringMeeting", "Reunión recurrente"), _defineProperty(_date$time$duration$t, "recurringNote", "Nota: Active esta opción cuando elija \"Recurrencia\""), _defineProperty(_date$time$duration$t, "joinBeforeHost", "Permitir que los participantes se unan antes del anfitrión"), _defineProperty(_date$time$duration$t, "turnOffCamera", "Apagar la cámara de los participantes"), _defineProperty(_date$time$duration$t, "turnOffHostCamera", "Apagar la cámara del anfitrión cuando se une a la reunión"), _defineProperty(_date$time$duration$t, "requirePassword", "Solicitar contraseña"), _defineProperty(_date$time$duration$t, "setPassword", "Configurar contraseña *"), _defineProperty(_date$time$duration$t, "passwordEmptyError", "Se requiere la contraseña de la reunión"), _defineProperty(_date$time$duration$t, "rcmPasswordInvalidError", "Su contraseña debe contener de 1 a 10 caracteres o números y no puede tener símbolos, salvo @, * o -"), _defineProperty(_date$time$duration$t, "rcmPasswordHintText", "Su contraseña debe contener de 1 a 10 caracteres o números y no puede tener símbolos, excepto @, * o -"), _defineProperty(_date$time$duration$t, "usePersonalMeetingId", "Usar el ID de reunión personal"), _defineProperty(_date$time$duration$t, "pmiChangeConfirm", "Si quiere hacer cambios en su reunión personal, "), _defineProperty(_date$time$duration$t, "changePmiSettings", "cambie la configuración del PMI"), _defineProperty(_date$time$duration$t, "pmiSettingChangeAlert", "Si cambia la configuración y programa esta reunión, todas las reuniones con el mismo Id. de reunión personal compartirán los últimos ajustes."), _defineProperty(_date$time$duration$t, "lockedTooltip", "Esta configuración es gestionada por el administrador de su empresa"), _defineProperty(_date$time$duration$t, "when", "Cuándo"), _defineProperty(_date$time$duration$t, "recurringDescribe", "Recuerde comprobar la periodicidad o repetición en la invitación de calendario enviada a los asistentes."), _date$time$duration$t); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet Audio"@#@
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
//# sourceMappingURL=es-419.js.map
