"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessages2 = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "Enviado com sucesso."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "Erro ao enviar a mensagem."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "Erro de validação do número de telefone."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "Digite o texto a ser enviado."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "Você não tem permissão para enviar a mensagem."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "É preciso selecionar um de seus números de telefone para enviar"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "Insira um número de telefone válido."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "Insira um número de receptor válido."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "O texto é longo demais. O limite é de 1000"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "O texto é longo demais. O limite é de 5000"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "Insira um número de telefone válido."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "Defina o {areaCodeLink} para usar números de telefone locais de sete dígitos."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "Não há suporte para enviar mensagens de texto para números de emergência/serviços especiais."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "Falha de conexão. Tente novamente mais tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "Não é possível conectar devido a erros internos. Tente novamente mais tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "O ramal não existe."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "Não foi possível conectar devido a problemas de rede. Tente novamente mais tarde."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "É necessário ter um número de telefone válido para enviar mensagens de texto a destinatários de fora da empresa. Entre em contato com o administrador para adicionar um número direto a sua conta."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "Não foi possível enviar a um ramal com o número de telefone principal. Se deseja enviar a um ramal, insira-o."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "Não é possível enviar SMS a números de telefone internacionais."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "Você não tem permissão para enviar mensagens. Entre em contato com o administrador da conta {brand} para fazer a atualização."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "Você não tem permissão para enviar mensagens para destinatários de fora da sua organização."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentCountLimitation, "Máximo de 10 anexos."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentSizeLimitation, "O tamanho dos anexos é limitado a 1,5 MB."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].noAttachmentToExtension, "Não há suporte para enviar MMS para um ramal."), _defineProperty(_messageSenderMessage, "areaCode", "código de área"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "Enviando mensagem... O processo pode levar alguns minutos para ser concluído."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessagesV2.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
