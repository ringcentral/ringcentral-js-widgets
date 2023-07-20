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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "发送成功。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "发送消息时出错。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "电话号码验证错误。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "请输入要发送的文本。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "您没有发送消息的权限。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "您必须从电话号码中选择号码进行发送"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "请输入有效的电话号码。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "请输入有效的接收方电话号码。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "文本过长，上限为 1000 个字符"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "文本过长，上限为 5000 个字符"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "请输入有效的电话号码。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "请设置{areaCodeLink}以使用 7 位本地电话号码。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "不支持向紧急/特殊服务号码发送短信。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "连接失败。请稍后再试。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "由于内部错误，无法连接。请稍后重试。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "分机号码不存在。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "由于网络问题，无法连接。请稍后重试。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "必须使用有效的电话号码，才能向您公司之外的收件人发送短信。请联系您的管理员，以向您的帐户添加直拨号码。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "无法通过主电话号码发送至分机号。如果您要发送至分机号，请仅输入分机号。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "不支持向国际电话号码发送短信。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "您没有发送消息的权限。请联系您的 {brand}帐户管理员进行升级。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "您没有向组织以外的收件人发送消息的权限。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "最多包含 10 个附件。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "附件最大不能超过 1.5M。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "不支持向分机发送彩信。"), _defineProperty(_messageSenderMessage, "areaCode", "区号"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "正在发送消息…这可能需要几分钟时间才能完成。"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "不支持向短号码发送短信。"), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
//# sourceMappingURL=zh-CN.js.map
