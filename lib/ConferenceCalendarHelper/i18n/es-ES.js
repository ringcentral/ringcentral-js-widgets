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
/* eslint-disable */
var _default = (_inviteMeetingContent = {
  inviteMeetingContent: '{accountName}Le está invitando a una reunión de{brandName}.\n\nÚnase desde PC, Mac, iOS o Android:{joinUri}{passwordTpl}\n\n O desde iPhone con tan solo pulsar una vez:\n\t    {mobileDialingNumberTpl}\n\n    O desde un teléfono:\n\t     Marque:\n\t    {phoneDialingNumberTpl}\n\t     ID de la reunión:{meetingId}\n\t     Números internacionales disponibles:{teleconference} ',
  conferenceLocationField: 'Conferencia, número de marcación:{dialInNumber}',
  scheduleError: 'Se produjo un error; inténtelo de nuevo.',
  noMeetingPermission: 'No tiene permiso para{brandName}Meetings. Póngase en contacto con el administrador de la empresa para continuar.',
  noConferencePermission: 'No tiene permiso para el servicio de conferencias{brandName}. Póngase en contacto con el administrador de la empresa para continuar.',
  conferenceTitle: 'Reunión de conferencia de{displayName}',
  internationalNumber: 'Números de marcación internacionales:',
  inviteText_att: 'Únase a la conferencia de{brandName}.\n\nNúmero de marcación:{formattedDialInNumber} \n{additionalNumbersSection} \nAcceso de participante:{participantCode} \n\n¿Necesita un número de marcación internacional? Visite{dialInNumbersLink} \n\nEsta llamada de conferencia es posible gracias al servicio de conferencias de{brandName}.',
  inviteText_bt: 'Únase a la conferencia de{brandName}.\n\nNúmero de marcación:{formattedDialInNumber} \n{additionalNumbersSection} \nAcceso de participante:{participantCode} \n\nNúmeros de marcación adicionales{dialInNumbersLink} ',
  inviteText_rc: 'Únase a la conferencia de{brandName}.\n\nNúmero de marcación:{formattedDialInNumber} \n{additionalNumbersSection} \nAcceso de participante:{participantCode} \n\n¿Necesita un número de marcación internacional? Visite{dialInNumbersLink} \n\nEsta llamada de conferencia es posible gracias al servicio de conferencias de{brandName}.',
  inviteText_telus: 'Únase a la conferencia de{brandName}.\n\nNúmero de marcación:{formattedDialInNumber} \n{additionalNumbersSection} \nAcceso de participante:{participantCode} \n\nNúmeros de marcación adicionales{dialInNumbersLink} ',
  conferenceCall: '{brandName}Llamada de conferencia',
  videoCall: 'Videollamada de{brandName}',
  addConferencingDetails: 'Añadiendo los detalles de la conferencia',
  updateConferencingDetails: 'Actualizando los detalles de la conferencia'
}, _defineProperty(_inviteMeetingContent, "scheduleError", 'Se produjo un error; inténtelo de nuevo.'), _defineProperty(_inviteMeetingContent, "deleteBtn", 'Eliminar'), _defineProperty(_inviteMeetingContent, "settingsBtn", 'Configuración'), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", 'Guardar como predeterminado y no mostrar de nuevo'), _defineProperty(_inviteMeetingContent, "saveAsDefault", 'Guardar como predeterminado'), _defineProperty(_inviteMeetingContent, "done", 'Listo'), _defineProperty(_inviteMeetingContent, "update", 'Actualizar'), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", 'Configuración del servicio de conferencias de{brand}'), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", 'Configuración de{brand}Meetings'), _defineProperty(_inviteMeetingContent, "password", 'Contraseña'), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", 'Se ha perdido la conexión de la red. Elimine esta reunión e inténtelo de nuevo más tarde.'), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", '{brand}Meetings - Configuración'), _defineProperty(_inviteMeetingContent, "recurringMeeting", 'Reunión periódica'), _defineProperty(_inviteMeetingContent, "meetingOptions", 'Opciones de reunión'), _defineProperty(_inviteMeetingContent, "schedule", 'Programar'), _defineProperty(_inviteMeetingContent, "settingsBtn", 'Configuración'), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=es-ES.js.map
