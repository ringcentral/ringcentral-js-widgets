/* eslint-disable */
export default {
  sending: 'メッセージを送信しています…完了するまで数分かかる場合があります。',
  noSMSPermission:
    'テキストメッセージを組織外の受信者に送信するアクセス許可がありません。',
  attachmentCountLimitation:
    '1メッセージにつき、添付できるファイルの数は最大10個です',
  attachmentSizeLimitation:
    '添付ファイル全体のサイズは、1メッセージあたり1.5 MB以下である必要があります。',
} as const;

// @key: @#@"sending"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"noSMSPermission"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"attachmentCountLimitation"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"attachmentSizeLimitation"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@
