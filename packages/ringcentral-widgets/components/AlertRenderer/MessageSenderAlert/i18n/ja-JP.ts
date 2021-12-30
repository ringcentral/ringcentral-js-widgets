import messageSenderMessages from '@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages';
import messageSenderMessagesV2 from '@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages';
export default {
  [messageSenderMessages.sendSuccess]: "送信が成功しました。",
  [messageSenderMessages.sendError]: "メッセージの送信時に問題が発生しました。",
  [messageSenderMessages.numberValidateError]: "電話番号の検証エラー。",
  [messageSenderMessages.textEmpty]: "送信するテキストを入力してください。",
  [messageSenderMessages.noPermission]: "メッセージを送信するアクセス許可がありません。",
  [messageSenderMessages.senderEmpty]: "登録している電話番号から送信先番号を選択する必要があります。",
  [messageSenderMessages.noToNumber]: "有効な電話番号を入力してください。",
  [messageSenderMessages.recipientsEmpty]: "有効な受信者の番号を入力してください。",
  [messageSenderMessages.textTooLong]: "テキストが長すぎます(最大1000文字)",
  [messageSenderMessages.multipartTextTooLong]: "テキストが長すぎます(最大5000文字)",
  [messageSenderMessages.recipientNumberInvalids]: "有効な電話番号を入力してください。",
  [messageSenderMessages.noAreaCode]: "7桁の地域の電話番号を使用できるように{areaCodeLink}を設定してください。",
  [messageSenderMessages.specialNumber]: "緊急サービスまたは特別なサービスの番号へのテキストの送信はサポートされていません。",
  [messageSenderMessages.connectFailed]: "接続に失敗しました。後でもう一度やり直してください。",
  [messageSenderMessages.internalError]: "内部エラーにより、接続できません。後でもう一度やり直してください。",
  [messageSenderMessages.notAnExtension]: "この内線番号は存在しません。",
  [messageSenderMessages.networkError]: "ネットワークの問題により、接続できません。後でもう一度やり直してください。",
  [messageSenderMessages.senderNumberInvalid]: "テキストメッセージを社外の受信者に送信するには有効な電話番号が必要です。アカウントにダイレクトナンバーを追加する場合は、管理者に問い合わせてください。",
  [messageSenderMessages.notSmsToExtension]: "代表電話番号の付いた内線番号を送信することはできません。内線番号を送信する場合は、内線番号のみを入力してください。",
  [messageSenderMessages.internationalSMSNotSupported]: "国際電話番号へのSMS送信はサポートされていません。",
  [messageSenderMessages.noInternalSMSPermission]: "メッセージを送信するためのアクセス許可がありません。アップグレードする場合は、{brand}のアカウント管理者に問い合わせてください。",
  [messageSenderMessages.noSMSPermission]: "組織外部の受信者にメッセージを送信するためのアクセス許可がありません。",
  [messageSenderMessagesV2.attachmentCountLimitation]: "添付ファイルは最大10件です。",
  [messageSenderMessagesV2.attachmentSizeLimitation]: "添付ファイルのサイズの上限は1.5メガバイトです。",
  [messageSenderMessagesV2.noAttachmentToExtension]: "MMSの内線への送信はサポートされていません。",
  areaCode: "市外局番",
  [messageSenderMessages.sending]: "メッセージを送信しています…完了するまで数分かかる場合があります。"
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
