import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';

export default {
  [meetingStatus.emptyTopic]: '会議のトピックを入力してください\u3002',
  [meetingStatus.noPassword]: '会議のパスワードを入力してください\u3002',
  [meetingStatus.scheduledSuccess]: 'ミーティングの日時が設定されました\u3002',
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
