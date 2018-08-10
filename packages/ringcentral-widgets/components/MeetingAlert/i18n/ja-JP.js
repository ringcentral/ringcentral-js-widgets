import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';

export default {
  [meetingStatus.emptyTopic]: '会議のトピックを入力してください。',
  [meetingStatus.noPassword]: '会議のパスワードを入力してください。',
  [meetingStatus.scheduledSuccess]: '会議の日時が設定されました。'
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
