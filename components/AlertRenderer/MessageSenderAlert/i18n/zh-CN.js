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
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _messageSenderMessage;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_messageSenderMessage = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, '发送成功。'), _MessageSender.messageSenderMessages.sendError, '发送消息时出错。'), _MessageSender.messageSenderMessages.numberValidateError, '电话号码验证错误。'), _MessageSender.messageSenderMessages.textEmpty, '请输入要发送的文本。'), _MessageSender.messageSenderMessages.noPermission, '您没有发送消息的权限。'), _MessageSender.messageSenderMessages.senderEmpty, '您必须从电话号码中选择号码进行发送'), _MessageSender.messageSenderMessages.noToNumber, '请输入有效的电话号码。'), _MessageSender.messageSenderMessages.recipientsEmpty, '请输入有效的接收方电话号码。'), _MessageSender.messageSenderMessages.textTooLong, '文本过长，上限为 1000'), _MessageSender.messageSenderMessages.multipartTextTooLong, '文本过长，上限为 5000 个字符'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, '请输入有效的电话号码。'), _MessageSender.messageSenderMessages.noAreaCode, '请设置{areaCodeLink}以使用 7 位本地电话号码。'), _MessageSender.messageSenderMessages.specialNumber, '不支持向紧急/特殊服务号码发送短信。'), _MessageSender.messageSenderMessages.connectFailed, '连接失败。请稍后再试。'), _MessageSender.messageSenderMessages.internalError, '由于内部错误，无法连接。请稍后重试。'), _MessageSender.messageSenderMessages.notAnExtension, '分机号码不存在。'), _MessageSender.messageSenderMessages.networkError, '由于网络问题，无法连接。请稍后重试。'), _MessageSender.messageSenderMessages.senderNumberInvalid, '必须输入有效的电话号码，才能向您公司之外的收件人发送短信。请联系管理员为您的帐户添加直拨号码。'), _MessageSender.messageSenderMessages.notSmsToExtension, '无法通过主电话号码发送至分机号。如果您要发送至分机号，请仅输入分机号。'), _MessageSender.messageSenderMessages.internationalSMSNotSupported, '不支持向国际电话号码发送短信。'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, '您没有发送消息的权限。请联系 {brand} 帐户管理员进行升级。'), _MessageSender.messageSenderMessages.noSMSPermission, '您没有向组织以外的收件人发送消息的权限。'), _MessageSender.messageSenderMessages.attachmentCountLimitation, '每条消息不能超过 10 个附件'), _MessageSender.messageSenderMessages.attachmentSizeLimitation, '每条消息的所有附件大小总计不得超过 1.5 MB。'), _MessageSender.messageSenderMessages.noAttachmentToExtension, '不支持向分机发送彩信。'), "areaCode", '区号'), _MessageSender.messageSenderMessages.sending, '正在发送消息…这可能需要几分钟时间才能完成。'), _MessageSender.messageSenderMessages.shortNumbersNotAvailable, '不支持向短号码发送短信。')); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"You can enter up to 1,000 characters."@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"You can enter up to 5,000 characters."@#@
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
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
//# sourceMappingURL=zh-CN.js.map
