/* eslint-disable */
import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: '送信が成功しました。',
  [messageSenderMessages.sendError]: 'メッセージの送信時に問題が発生しました。',
  [messageSenderMessages.numberValidateError]: '電話番号の検証エラー。',
  [messageSenderMessages.textEmpty]: '送信するテキストを入力してください。',
  [messageSenderMessages.noPermission]:
    'メッセージを送信するアクセス許可がありません。',
  [messageSenderMessages.senderEmpty]:
    '登録している電話番号から送信先番号を選択する必要があります。',
  [messageSenderMessages.noToNumber]: '有効な電話番号を入力してください。',
  [messageSenderMessages.recipientsEmpty]:
    '有効な受信者の番号を入力してください。',
  [messageSenderMessages.textTooLong]: 'テキストが長すぎます(最大1000文字)',
  [messageSenderMessages.multipartTextTooLong]:
    'テキストが長すぎます(最大5000文字)',
  [messageSenderMessages.recipientNumberInvalids]:
    '有効な電話番号を入力してください。',
  [messageSenderMessages.noAreaCode]:
    '7桁の地域の電話番号を使用できるように{areaCodeLink}を設定してください。',
  [messageSenderMessages.specialNumber]:
    '緊急サービスまたは特別なサービスの番号へのテキスト送信はサポートされていません。',
  [messageSenderMessages.connectFailed]:
    '接続に失敗しました。後でもう一度やり直してください。',
  [messageSenderMessages.internalError]:
    '内部エラーにより、接続できません。後でもう一度やり直してください。',
  [messageSenderMessages.notAnExtension]: 'この内線番号は存在しません。',
  [messageSenderMessages.networkError]:
    'ネットワークの問題により、接続できません。後でもう一度やり直してください。',
  [messageSenderMessages.senderNumberInvalid]:
    '社外の受信者にテキストメッセージを送信するには、有効な電話番号が必要です。管理者に連絡して、アカウントにダイレクトナンバーを追加してください。',
  [messageSenderMessages.notSmsToExtension]:
    '代表電話番号の付いた内線番号には送信できません。内線番号に送信する場合は、内線番号だけを入力してください。',
  [messageSenderMessages.internationalSMSNotSupported]:
    '国際電話番号へのSMS送信はサポートされていません。',
  [messageSenderMessages.noInternalSMSPermission]:
    'メッセージを送信するためのアクセス許可がありません。アップグレードする場合は、{brand}のアカウント管理者に問い合わせてください。',
  [messageSenderMessages.noSMSPermission]:
    'テキストメッセージを組織外の受信者に送信するアクセス許可がありません。',
  [messageSenderMessages.attachmentCountLimitation]:
    '1メッセージにつき、添付できるファイルの数は最大10個です',
  [messageSenderMessages.attachmentSizeLimitation]:
    '添付ファイル全体のサイズは、1メッセージあたり1.5 MB以下である必要があります。',
  [messageSenderMessages.noAttachmentToExtension]:
    '内線へのMMS送信はサポートされていません。',
  areaCode: '市外局番',
  [messageSenderMessages.sending]:
    'メッセージを送信しています…完了するまで数分かかる場合があります。',
  [messageSenderMessages.shortNumbersNotAvailable]:
    '短縮番号へのSMS送信はできません。',
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
