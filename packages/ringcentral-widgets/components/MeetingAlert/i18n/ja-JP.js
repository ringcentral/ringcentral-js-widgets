import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "会議のトピックを入力してください。",
  [meetingStatus.noPassword]: "会議のパスワードを入力してください。",
  [meetingStatus.insufficientPermissions]: "{application}には{permissionName}のアクセス許可がありません。",
  [meetingStatus.scheduledSuccess]: "会議の日時が設定されました。",
  [meetingStatus.updatedSuccess]: "会議が更新されています。",
  [meetingStatus.internalError]: "内部エラーです。会議のスケジュールに失敗しました。後でもう一度やり直してください。"
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting is updated."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@
