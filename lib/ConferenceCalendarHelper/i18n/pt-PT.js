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
var _inviteMeetingContent;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable */
var _default = exports["default"] = (_inviteMeetingContent = {
  inviteMeetingContent: '{accountName} enviou-lhe um convite para uma reunião do {brandName}.\n\nEntre através de PC, Mac, iOS ou Android: {joinUri}{passwordTpl}\n\n Ou um toque no iPhone:\n\t    {mobileDialingNumberTpl}\n\n    Ou telefone:\n\t     Marque:\n\t    {phoneDialingNumberTpl}\n\t     ID da reunião: {meetingId}\n\t     Números internacionais disponíveis: {teleconference} ',
  conferenceLocationField: 'Reunião de conferência, número de acesso: {dialInNumber}',
  scheduleError: 'Lamentamos, mas ocorreu um erro. Tente novamente.',
  noMeetingPermission: 'Lamentamos, mas não tem permissões para o {brandName} Meetings. Contacte o administrador da empresa para continuar.',
  noConferencePermission: 'Lamentamos, mas não tem permissões o {brandName} Conference. Contacte o administrador da empresa para continuar.',
  conferenceTitle: 'Reunião de conferência de {displayName}',
  internationalNumber: 'Números de acesso internacionais:',
  inviteText_att: 'Entre na conferência do {brandName}.\n\nNúmero de acesso: {formattedDialInNumber} \n{additionalNumbersSection} \nAcesso do participante: {participantCode} \n\nNecessita de um número de telefone de acesso internacional? Visite {dialInNumbersLink} \n\nEsta chamada de conferência é oferecida por {brandName} Conferencing.',
  inviteText_bt: 'Entre na conferência do {brandName}.\n\nNúmero de acesso: {formattedDialInNumber} \n{additionalNumbersSection} \nAcesso do participante: {participantCode} \n\nNúmeros de acesso adicionais {dialInNumbersLink} ',
  inviteText_rc: 'Entre na conferência do {brandName}.\n\nNúmero de acesso: {formattedDialInNumber} \n{additionalNumbersSection} \nAcesso do participante: {participantCode} \n\nNecessita de um número de telefone de acesso internacional? Visite {dialInNumbersLink} \n\nEsta chamada de conferência é oferecida por {brandName} Conferencing.',
  inviteText_telus: 'Entre na conferência do {brandName}.\n\nNúmero de acesso: {formattedDialInNumber} \n{additionalNumbersSection} \nAcesso do participante: {participantCode} \n\nNúmeros de acesso adicionais {dialInNumbersLink} ',
  conferenceCall: 'Chamada de conferência do {brandName}',
  videoCall: 'Videochamada do {brandName}',
  addConferencingDetails: 'A adicionar detalhes da conferência',
  updateConferencingDetails: 'A atualizar detalhes da conferência'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_inviteMeetingContent, "scheduleError", 'Lamentamos, mas ocorreu um erro. Tente novamente.'), "deleteBtn", 'Eliminar'), "settingsBtn", 'Definições'), "saveAsDefaultAndNotShowAgain", 'Guardar como predefinição e não mostrar novamente'), "saveAsDefault", 'Guardar como predefinição'), "done", 'Concluído'), "update", 'Atualizar'), "conferenceSettingsTitle", 'Definições do {brand} Conference'), "videoSettingsTitle", 'Definições do {brand} Meetings'), "password", 'Palavra-passe'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", 'Perdeu-se a ligação de rede. Elimine esta reunião e tente novamente mais tarde.'), "meetingSettingsTitle", '{brand} Meetings – Definições'), "recurringMeeting", 'Reunião periódica'), "meetingOptions", 'Opções da reunião'), "schedule", 'Agendar'), "settingsBtn", 'Definições')); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=pt-PT.js.map
