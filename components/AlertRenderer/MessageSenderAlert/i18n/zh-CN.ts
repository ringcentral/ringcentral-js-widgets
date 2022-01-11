import messageSenderMessages from '@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages';
import messageSenderMessagesV2 from '@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages';
export default {
  [messageSenderMessages.sendSuccess]: "发送成功。",
  [messageSenderMessages.sendError]: "发送消息时出错。",
  [messageSenderMessages.numberValidateError]: "电话号码验证错误。",
  [messageSenderMessages.textEmpty]: "请输入要发送的文本。",
  [messageSenderMessages.noPermission]: "您没有发送消息的权限。",
  [messageSenderMessages.senderEmpty]: "您必须从电话号码中选择号码进行发送",
  [messageSenderMessages.noToNumber]: "请输入有效的电话号码。",
  [messageSenderMessages.recipientsEmpty]: "请输入有效的接收方电话号码。",
  [messageSenderMessages.textTooLong]: "文本过长，上限为 1000 个字符",
  [messageSenderMessages.multipartTextTooLong]: "文本过长，上限为 5000 个字符",
  [messageSenderMessages.recipientNumberInvalids]: "请输入有效的电话号码。",
  [messageSenderMessages.noAreaCode]: "请设置{areaCodeLink}以使用 7 位本地电话号码。",
  [messageSenderMessages.specialNumber]: "不支持向紧急/特殊服务号码发送信息文本。",
  [messageSenderMessages.connectFailed]: "连接失败。请稍后再试。",
  [messageSenderMessages.internalError]: "由于内部错误，无法连接。请稍后重试。",
  [messageSenderMessages.notAnExtension]: "分机号码不存在。",
  [messageSenderMessages.networkError]: "由于网络问题，无法连接。请稍后重试。",
  [messageSenderMessages.senderNumberInvalid]: "必须使用有效的电话号码，才能向您公司之外的收件人发送短信。请联系您的管理员，以向您的帐户添加直拨号码。",
  [messageSenderMessages.notSmsToExtension]: "无法使用主要电话号码发送到分机号码。如果您想发送到分机号码，请仅输入分机号码。",
  [messageSenderMessages.internationalSMSNotSupported]: "不支持向国际电话号码发送短信。",
  [messageSenderMessages.noInternalSMSPermission]: "您没有发送消息的权限。请联系您的 {brand}帐户管理员进行升级。",
  [messageSenderMessages.noSMSPermission]: "您没有权限向贵组织以外的收件人发送消息。",
  [messageSenderMessagesV2.attachmentCountLimitation]: "最多包含 10 个附件。",
  [messageSenderMessagesV2.attachmentSizeLimitation]: "附件最大不能超过 1.5M。",
  [messageSenderMessagesV2.noAttachmentToExtension]: "不支持向分机发送彩信。",
  areaCode: "区号",
  [messageSenderMessages.sending]: "正在发送消息…可能需要几分钟时间完成。"
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
