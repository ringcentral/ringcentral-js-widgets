/* eslint-disable */
import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: '傳送成功。',
  [messageSenderMessages.sendError]: '傳送訊息時發生錯誤。',
  [messageSenderMessages.numberValidateError]: '電話號碼驗證錯誤。',
  [messageSenderMessages.textEmpty]: '請輸入要傳送的文字簡訊。',
  [messageSenderMessages.noPermission]: '您沒有傳送訊息的權限。',
  [messageSenderMessages.senderEmpty]: '您必須從電話號碼中選擇一組號碼才能傳送',
  [messageSenderMessages.noToNumber]: '請輸入有效的電話號碼。',
  [messageSenderMessages.recipientsEmpty]: '請輸入有效的接收者號碼。',
  [messageSenderMessages.textTooLong]: '文字過長，上限為 1000',
  [messageSenderMessages.multipartTextTooLong]: '文字過長，上限為 5000 字',
  [messageSenderMessages.recipientNumberInvalids]: '請輸入有效的電話號碼。',
  [messageSenderMessages.noAreaCode]:
    '請設定 {areaCodeLink} 以使用 7 位數當地電話號碼。',
  [messageSenderMessages.specialNumber]:
    '不支援傳送文字簡訊給緊急/特別服務號碼。',
  [messageSenderMessages.connectFailed]: '連線失敗。請稍後再試。',
  [messageSenderMessages.internalError]:
    '因為內部錯誤導致無法連線。請稍後再試。',
  [messageSenderMessages.notAnExtension]: '分機號碼不存在。',
  [messageSenderMessages.networkError]: '因網路問題，無法連線。請稍後再試。',
  [messageSenderMessages.senderNumberInvalid]:
    '需要有效的電話號碼，才能將文字訊息傳送給您公司外的收件者。請聯絡您的管理員，為您的帳戶加入直撥號碼。',
  [messageSenderMessages.notSmsToExtension]:
    '無法透過主要電話號碼傳送至分機號碼。如果要傳送至分機號碼，請只輸入分機號碼。',
  [messageSenderMessages.internationalSMSNotSupported]:
    '不支援傳送簡訊給國際電話號碼。',
  [messageSenderMessages.noInternalSMSPermission]:
    '您沒有傳送訊息的權限。請聯絡您的 {brand} 帳戶管理員以升級。',
  [messageSenderMessages.noSMSPermission]: '您無權向組織以外的收件者傳送訊息。',
  [messageSenderMessages.attachmentCountLimitation]:
    '每則訊息不得超過 10 個附件',
  [messageSenderMessages.attachmentSizeLimitation]:
    '每則訊息的總附件大小不可超過 1.5 MB。',
  [messageSenderMessages.noAttachmentToExtension]:
    '不支援傳送多媒體訊息至分機。',
  areaCode: '區碼',
  [messageSenderMessages.sending]: '訊息傳送中…可能需要一些時間才會完成。',
  [messageSenderMessages.shortNumbersNotAvailable]: '無法向短號碼傳送簡訊。',
} as const;

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
