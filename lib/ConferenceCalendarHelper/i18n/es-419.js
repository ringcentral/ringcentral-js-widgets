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
var _inviteMeetingContent;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} lo/a está invitando a una reunión de {brandName}.\n\nÚnase desde una PC, Mac, iOS o Android: {joinUri}{passwordTpl}\n\n O desde iPhone con tan solo tocar una vez:\n\t    {mobileDialingNumberTpl}\n\n    O desde un teléfono:\n\t     Marcar:\n\t    {phoneDialingNumberTpl}\n\t     ID de la reunión: {meetingId}\n\t     Números internacionales disponibles: {teleconference} ",
  conferenceLocationField: "Conferencia, número de marcado: {dialInNumber}",
  scheduleError: "Lo sentimos, cometimos un error. Vuelva a intentarlo.",
  noMeetingPermission: "Lo sentimos, no tiene permiso para utilizar {brandName} Meetings. Comuníquese con el administrador de su empresa para continuar.",
  noConferencePermission: "Lo sentimos, no tiene permiso para utilizar el servicio de conferencias {brandName}. Comuníquese con el administrador de su empresa para continuar.",
  conferenceTitle: "Reunión de conferencia de {displayName}",
  internationalNumber: "Números de marcado internacionales:",
  inviteText_att: "Únase a la conferencia de {brandName}.\n\nNúmero de marcado: {formattedDialInNumber} \n{additionalNumbersSection} \nAcceso para participantes: {participantCode} \n\n¿Necesita un número de marcado internacional? Visite {dialInNumbersLink} \n\nEsta conferencia telefónica es posible gracias a {brandName} Conferencing.",
  inviteText_bt: "Únase a la conferencia de {brandName}.\n\nNúmero de marcado: {formattedDialInNumber} \n{additionalNumbersSection} \nAcceso para participantes: {participantCode} \n\nNúmeros de marcado adicionales {dialInNumbersLink} ",
  inviteText_rc: "Únase a la conferencia de {brandName}.\n\nNúmero de marcado: {formattedDialInNumber} \n{additionalNumbersSection} \nAcceso para participantes: {participantCode} \n\n¿Necesita un número de marcado internacional? Visite {dialInNumbersLink} \n\nEsta conferencia telefónica es posible gracias a {brandName} Conferencing.",
  inviteText_telus: "Únase a la conferencia de {brandName}.\n\nNúmero de marcado: {formattedDialInNumber} \n{additionalNumbersSection} \nAcceso para participantes: {participantCode} \n\nNúmeros de marcado adicionales {dialInNumbersLink} ",
  conferenceCall: "Conferencia telefónica de {brandName}",
  videoCall: "Videollamada de {brandName}",
  addConferencingDetails: "Agregando detalles de conferencia",
  updateConferencingDetails: "Actualizando detalles de conferencia"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "Lo sentimos, cometimos un error. Vuelva a intentarlo."), _defineProperty(_inviteMeetingContent, "deleteBtn", "Eliminar"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Configuración"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "Guardar como configuración por defecto y no mostrar de nuevo"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "Guardar como configuración por defecto"), _defineProperty(_inviteMeetingContent, "done", "Listo"), _defineProperty(_inviteMeetingContent, "update", "Actualizar"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "Configuración del servicio de conferencias de {brand}"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "Configuración de {brand} Meetings"), _defineProperty(_inviteMeetingContent, "password", "Contraseña"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "Se perdió la conexión de red. Elimine esta reunión e inténtelo de nuevo más tarde."), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} Meetings - Configuración"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "Reunión recurrente"), _defineProperty(_inviteMeetingContent, "meetingOptions", "Opciones de reunión"), _defineProperty(_inviteMeetingContent, "schedule", "Programar"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Configuración"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
// @key: @#@"conferenceLocationField"@#@ @source: @#@"Conference Meeting, Dial-in Number: {dialInNumber}"@#@
// @key: @#@"scheduleError"@#@ @source: @#@"Sorry, something went wrong, please try again."@#@
// @key: @#@"noMeetingPermission"@#@ @source: @#@"Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue."@#@
// @key: @#@"noConferencePermission"@#@ @source: @#@"Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue."@#@
// @key: @#@"conferenceTitle"@#@ @source: @#@"{displayName}'s Conference Meeting"@#@
// @key: @#@"internationalNumber"@#@ @source: @#@"International Dial-in Numbers:"@#@
// @key: @#@"inviteText_att"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_bt"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} "@#@
// @key: @#@"inviteText_rc"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_telus"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} "@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"{brandName} Conference Call"@#@
// @key: @#@"videoCall"@#@ @source: @#@"{brandName} Video Call"@#@
// @key: @#@"addConferencingDetails"@#@ @source: @#@"Adding conferencing details"@#@
// @key: @#@"updateConferencingDetails"@#@ @source: @#@"Updating conferencing details"@#@
// @key: @#@"deleteBtn"@#@ @source: @#@"Delete"@#@
// @key: @#@"settingsBtn"@#@ @source: @#@"Settings"@#@
// @key: @#@"saveAsDefaultAndNotShowAgain"@#@ @source: @#@"Save as default and do not show again"@#@
// @key: @#@"saveAsDefault"@#@ @source: @#@"Save as default"@#@
// @key: @#@"done"@#@ @source: @#@"Done"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"conferenceSettingsTitle"@#@ @source: @#@"{brand} Conference Settings"@#@
// @key: @#@"videoSettingsTitle"@#@ @source: @#@"{brand} Meetings Settings"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"failedToRetrieveMeeting"@#@ @source: @#@"The network connection is lost. Delete this meeting and try again later."@#@
// @key: @#@"meetingSettingsTitle"@#@ @source: @#@"{brand} Meetings - Settings"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring Meeting"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting Options"@#@
// @key: @#@"schedule"@#@ @source: @#@"Schedule"@#@
exports["default"] = _default;
//# sourceMappingURL=es-419.js.map
