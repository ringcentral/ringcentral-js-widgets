/* eslint-disable */
export default {
  specialNumber: '不支持向紧急/特殊服务号码发送短信。',
  textEmpty: '请输入要发送的文本。',
  textTooLong: '文本过长，上限为 1000',
  multipartTextTooLong: '文本过长，上限为 5000 个字符',
  recipientsEmpty: '请输入有效的接收方电话号码。',
  senderNumberInvalid:
    '必须输入有效的电话号码，才能向您公司之外的收件人发送短信。请联系管理员为您的帐户添加直拨号码。',
  recipientNumberInvalids: '请输入有效的电话号码。',
  notAnExtension: '分机号码不存在。',
  noAttachmentToExtension: '不支持向分机发送彩信。',
  notSmsToExtension:
    '无法通过主电话号码发送至分机号。如果您要发送至分机号，请仅输入分机号。',
  shortNumbersNotAvailable: '不支持向短号码发送短信。',
  internationalSMSNotSupported: '不支持向国际电话号码发送短信。',
  noInternalSMSPermission:
    '您没有发送消息的权限。请联系 {brand} 帐户管理员进行升级。',
  sendError: '发送消息时出错。',
} as const;

// @key: @#@"specialNumber"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"textEmpty"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"textTooLong"@#@ @source: @#@"You can enter up to 1,000 characters."@#@
// @key: @#@"multipartTextTooLong"@#@ @source: @#@"You can enter up to 5,000 characters."@#@
// @key: @#@"recipientsEmpty"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"senderNumberInvalid"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"recipientNumberInvalids"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"notAnExtension"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"noAttachmentToExtension"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"notSmsToExtension"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"shortNumbersNotAvailable"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
// @key: @#@"internationalSMSNotSupported"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"noInternalSMSPermission"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"sendError"@#@ @source: @#@"Something wrong happened when send message."@#@
