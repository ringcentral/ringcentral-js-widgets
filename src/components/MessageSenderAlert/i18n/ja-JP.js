import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: '送信が成功しました\u3002',
  [messageSenderMessages.sendError]: 'メッセージの送信時に問題が発生しました\u3002',
  [messageSenderMessages.numberValidateError]: '電話番号の検証エラー\u3002',
  [messageSenderMessages.textEmpty]: '送信するテキストを入力してください\u3002',
  [messageSenderMessages.noPermission]: 'メッセージを送信するためのアクセス許可がありません\u3002',
  [messageSenderMessages.senderEmpty]: 'お使いの電話番号から送信用の電話番号を選択してください\u3002',
  [messageSenderMessages.noToNumber]: '電話番号が無効です\u3002',
  [messageSenderMessages.recipientsEmpty]: '有効な受信者番号を入力してください\u3002',
  [messageSenderMessages.textTooLong]: 'テキストが長すぎます\u3002上限は1,000文字です',
  [messageSenderMessages.recipientNumberInvalids]: '受信者番号が無効です',
  [messageSenderMessages.noAreaCode]: '7桁の国内電話番号を使用するには\u3001{areaCodeLink}を設定してください\u3002',
  [messageSenderMessages.specialNumber]: '緊急サービスまたは特別なサービスの番号へのダイヤルはサポートされていません\u3002',
  [messageSenderMessages.connectFailed]: '接続に失敗しました\u3002後でもう一度やり直してください\u3002',
  [messageSenderMessages.internalError]: '内部エラーにより\u3001接続できません\u3002後でもう一度やり直してください\u3002',
  [messageSenderMessages.notAnExtension]: 'この内線番号は存在しません\u3002',
  [messageSenderMessages.networkError]: 'ネットワークの問題により\u3001接続できません\u3002後でもう一度やり直してください\u3002',
  [messageSenderMessages.senderNumberInvalid]: '社外の受信者にテキストメッセージを送信するには\u3001有効な電話番号が必要です\u3002管理者に連絡して\u3001ダイレクトナンバーをアカウントに追加してください\u3002',
  [messageSenderMessages.notSmsToExtension]: '代表電話番号が付いた内線番号に送信することはできません\u3002内線番号に送信する場合は\u3001内線番号だけを入力してください\u3002',
  [messageSenderMessages.internationalSMSNotSupported]: '国際電話番号へのSMS送信はサポートされていません\u3002',
  areaCode: '市外局番',
};
