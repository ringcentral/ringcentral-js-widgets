/* eslint-disable */
export default {
  sending: 'メッセージを送信しています…完了するまで数分かかる場合があります。',
  noSMSPermission:
    'テキストメッセージを組織外の受信者に送信するアクセス許可がありません。',
  recipientNumberInvalids: '有効な電話番号を入力してください。',
  textTooLong: 'テキストが長すぎます(最大1000文字)',
  attachmentCountLimitation:
    '1メッセージにつき、添付できるファイルの数は最大10個です',
  attachmentSizeLimitation:
    '添付ファイル全体のサイズは、1メッセージあたり1.5 MB以下である必要があります。',
  senderNumberInvalid:
    '社外の受信者にテキストメッセージを送信するには、有効な電話番号が必要です。管理者に連絡して、アカウントにダイレクトナンバーを追加してください。',
} as const;

// @key: @#@"sending"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"noSMSPermission"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"recipientNumberInvalids"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"textTooLong"@#@ @source: @#@"You can enter up to 1,000 characters."@#@
// @key: @#@"attachmentCountLimitation"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"attachmentSizeLimitation"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@
// @key: @#@"senderNumberInvalid"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
