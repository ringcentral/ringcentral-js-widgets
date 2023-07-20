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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} enviou-lhe um convite para uma reunião do {brandName}.\n\nEntre através de PC, Mac, iOS ou Android: {joinUri}{passwordTpl}\n\n Ou um toque no iPhone:\n\t    {mobileDialingNumberTpl}\n\n    Ou telefone:\n\t     Marque:\n\t    {phoneDialingNumberTpl}\n\t     ID da reunião: {meetingId}\n\t     Números internacionais disponíveis: {teleconference} ",
  conferenceLocationField: "Reunião de conferência, número de acesso: {dialInNumber}",
  scheduleError: "Lamentamos, mas ocorreu um erro. Tente novamente.",
  noMeetingPermission: "Lamentamos, mas não tem permissões para o {brandName} Meetings. Contacte o administrador da empresa para continuar.",
  noConferencePermission: "Lamentamos, mas não tem permissões o {brandName} Conference. Contacte o administrador da empresa para continuar.",
  conferenceTitle: "Reunião de conferência de {displayName}",
  internationalNumber: "Números de acesso internacionais:",
  inviteText_att: "Entre na conferência do {brandName}.\n\nNúmero de acesso: {formattedDialInNumber} \n{additionalNumbersSection} \nAcesso do participante: {participantCode} \n\nNecessita de um número de telefone de acesso internacional? Visite {dialInNumbersLink} \n\nEsta chamada de conferência é oferecida por {brandName} Conferencing.",
  inviteText_bt: "Entre na conferência do {brandName}.\n\nNúmero de acesso: {formattedDialInNumber} \n{additionalNumbersSection} \nAcesso do participante: {participantCode} \n\nNúmeros de acesso adicionais {dialInNumbersLink} ",
  inviteText_rc: "Entre na conferência do {brandName}.\n\nNúmero de acesso: {formattedDialInNumber} \n{additionalNumbersSection} \nAcesso do participante: {participantCode} \n\nNecessita de um número de telefone de acesso internacional? Visite {dialInNumbersLink} \n\nEsta chamada de conferência é oferecida por {brandName} Conferencing.",
  inviteText_telus: "Entre na conferência do {brandName}.\n\nNúmero de acesso: {formattedDialInNumber} \n{additionalNumbersSection} \nAcesso do participante: {participantCode} \n\nNúmeros de acesso adicionais {dialInNumbersLink} ",
  conferenceCall: "Chamada de conferência do {brandName}",
  videoCall: "Videochamada do {brandName}",
  addConferencingDetails: "A adicionar detalhes da conferência",
  updateConferencingDetails: "A atualizar detalhes da conferência"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "Lamentamos, mas ocorreu um erro. Tente novamente."), _defineProperty(_inviteMeetingContent, "deleteBtn", "Eliminar"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Definições"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "Guardar como predefinição e não mostrar novamente"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "Guardar como predefinição"), _defineProperty(_inviteMeetingContent, "done", "Concluído"), _defineProperty(_inviteMeetingContent, "update", "Atualizar"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "Definições do {brand} Conference"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "Definições do {brand} Meetings"), _defineProperty(_inviteMeetingContent, "password", "Palavra-passe"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "Perdeu-se a ligação de rede. Elimine esta reunião e tente novamente mais tarde."), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} Meetings – Definições"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "Reunião periódica"), _defineProperty(_inviteMeetingContent, "meetingOptions", "Opções da reunião"), _defineProperty(_inviteMeetingContent, "schedule", "Agendar"), _defineProperty(_inviteMeetingContent, "settingsBtn", "Definições"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=pt-PT.js.map
