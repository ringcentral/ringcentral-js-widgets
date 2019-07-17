"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("ringcentral-integration/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "发送成功。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "发送消息时出错。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "电话号码验证错误。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "请输入要发送的信息文本。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "您没有权限发送消息。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "您必须从电话号码中选择一个号码发送"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "请输入有效的电话号码。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "请输入有效的收件人号码。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "文本太长，上限为 1000"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "文本太长，上限为 5000"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "请输入有效的电话号码。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "请设置{areaCodeLink}以使用 7 位本地电话号码。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "不支持向紧急/特殊服务号码发送信息文本。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "连接失败。请稍后再试。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "由于内部错误，无法连接：请稍后再试。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "分机号不存在。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "由于网络问题，无法连接：请稍后再试。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "向公司以外的收件人发送短信需要有效的电话号码，请联系您的管理员添加直拨号码到您的帐户。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "无法通过主电话号码发送至分机号。如果您要发送至分机号，请仅输入分机号。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "不支持向国际电话号码发送短信。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "您没有权限发送消息。请联系您的 {brand} 帐户管理员进行升级。"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "您没有权限向贵组织以外的收件人发送消息。"), _defineProperty(_messageSenderMessage, "areaCode", "区号"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "正在发送消息…可能需要几分钟时间完成。"), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
