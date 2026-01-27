/* eslint-disable */
export default {
  specialNumber: '不支援傳送文字簡訊給緊急/特別服務號碼。',
  textEmpty: '請輸入要傳送的文字簡訊。',
  textTooLong: '文字過長，上限為 1000',
  multipartTextTooLong: '文字過長，上限為 5000 字',
  recipientsEmpty: '請輸入有效的接收者號碼。',
  senderNumberInvalid:
    '需要有效的電話號碼，才能將簡訊傳送給您公司外的收件者。請聯絡管理員，為您的帳戶加入直撥號碼。',
  recipientNumberInvalids: '請輸入有效的電話號碼。',
  notAnExtension: '分機號碼不存在。',
  noAttachmentToExtension: '不支援傳送多媒體訊息至分機。',
  notSmsToExtension:
    '無法透過主要電話號碼傳送至分機號碼。如果要傳送至分機號碼，請只輸入分機號碼。',
  shortNumbersNotAvailable: '不支援向短號碼傳送簡訊。',
  internationalSMSNotSupported: '不支援傳送簡訊給國際電話號碼。',
  noInternalSMSPermission:
    '您沒有傳送訊息的權限。請聯絡您的 {brand} 帳戶管理員以升級。',
  sendError: '傳送訊息時發生錯誤。',
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
