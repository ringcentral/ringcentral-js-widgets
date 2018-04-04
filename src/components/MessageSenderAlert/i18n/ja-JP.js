import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: '送信が成功しました\u3002',
  [messageSenderMessages.sendError]: 'メッセージの送信時に問題が発生しました\u3002',
  [messageSenderMessages.numberValidateError]: '電話番号の検証エラー\u3002',
  [messageSenderMessages.textEmpty]: '送信するテキストを入力してください\u3002',
  [messageSenderMessages.noPermission]: 'メッセージを送信するためのアクセス許可がありません\u3002',
  [messageSenderMessages.senderEmpty]: 'お使いの電話番号から送信用の電話番号を選択してください\u3002',
  [messageSenderMessages.recipientsEmpty]: '有効な受信者番号を入力してください\u3002',
  [messageSenderMessages.textTooLong]: 'テキストが長すぎます\u3002上限は1,000文字です',
  [messageSenderMessages.multipartTextTooLong]: 'テキストが長すぎます\u3002上限は5,000文字です',
  [messageSenderMessages.noAreaCode]: '7桁の国内電話番号を使用するには\u3001{areaCodeLink}を設定してください\u3002',
  [messageSenderMessages.connectFailed]: '接続に失敗しました\u3002後でもう一度やり直してください\u3002',
  [messageSenderMessages.internalError]: '内部エラーにより\u3001接続できません\u3002後でもう一度やり直してください\u3002',
  [messageSenderMessages.notAnExtension]: 'この内線番号は存在しません\u3002',
  [messageSenderMessages.networkError]: 'ネットワークの問題により\u3001接続できません\u3002後でもう一度やり直してください\u3002',
  [messageSenderMessages.senderNumberInvalid]: '組織外部の受信者にメッセージを送信するためのアクセス許可がありません\u3002アップグレードについてRingCentralアカウント管理者にお問い合わせください\u3002',
  [messageSenderMessages.notSmsToExtension]: '代表電話番号が付いた内線番号に送信することはできません\u3002内線番号に送信する場合は\u3001内線番号だけを入力してください\u3002',
  [messageSenderMessages.internationalSMSNotSupported]: '国際電話番号へのSMS送信はサポートされていません\u3002',
  areaCode: '市外局番',
  [messageSenderMessages.recipientNumberInvalids]: '有効な電話番号を入力してください\u3002',
  [messageSenderMessages.noInternalSMSPermission]: 'メッセージを送信するためのアクセス許可がありません\u3002アップグレードについてRingCentralアカウント管理者にお問い合わせください\u3002',
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Invalid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization. Please contact your RingCentral account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your RingCentral account administrator for upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
