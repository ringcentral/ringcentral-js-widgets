/* eslint-disable */
export default {
  sending: '메시지를 보내는 중... 완료하는 데 몇 분 정도 걸릴 수 있습니다.',
  noSMSPermission:
    '조직 외부의 수신자에게 메시지를 보낼 수 있는 권한이 없습니다.',
  attachmentCountLimitation: '메시지당 첨부 파일은 10개를 초과할 수 없습니다.',
  attachmentSizeLimitation:
    '메시지당 첨부 파일의 전체 크기는 1.5MB를 초과할 수 없습니다.',
} as const;

// @key: @#@"sending"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"noSMSPermission"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"attachmentCountLimitation"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"attachmentSizeLimitation"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@
