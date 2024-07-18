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
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _messageSenderMessage;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "Enviado com êxito."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "Ocorreu um erro ao enviar a mensagem."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "Erro de validação do número de telefone."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "Introduza a mensagem de texto a enviar."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "Não tem permissão para enviar a mensagem."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "Tem de selecionar um número dos seus números de telefone para enviar"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "Introduza um número de telefone válido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "Introduza um número de destinatário válido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "O texto é demasiado longo; limite de 1000"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "O texto é demasiado longo; limite de 5000"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "Introduza um número de telefone válido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "Defina {areaCodeLink} para utilizar números de telefone locais de 7 dígitos."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "O envio de texto para números de emergência/serviços especiais não é suportado."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "A ligação falhou. Tente novamente mais tarde."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "Não é possível efetuar a ligação devido a erros internos. Tente novamente mais tarde."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "O número da extensão não existe."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "Não é possível estabelecer ligação devido a problemas de rede. Tente novamente mais tarde."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "É necessário um número de telefone válido para enviar a SMS para destinatários fora da empresa. Contacte o administrador para adicionar um número direto à sua conta."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "Não é possível enviar para um número de extensão com o número de telefone principal. Se pretender enviar para um número de extensão, basta introduzir o número da extensão."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "O envio de SMS para números de telefone internacionais não é suportado."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "Não tem permissão para enviar mensagens. Contacte o administrador da sua conta {brand} para atualizar."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "Não tem permissão para enviar mensagens para destinatários fora da sua organização."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "Máximo de 10 anexos."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "O tamanho dos anexos está limitado a 1,5 MB."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "Não é possível enviar MMS para uma extensão."), _defineProperty(_messageSenderMessage, "areaCode", "indicativo de zona"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "A enviar mensagem... Pode demorar alguns minutos a concluir."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "O envio de SMS para números curtos não está disponível."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
