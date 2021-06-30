import meetingStatus from '@ringcentral-integration/commons/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "会議のトピックを入力してください。",
  [meetingStatus.noPassword]: "会議のパスワードを入力してください。",
  [meetingStatus.insufficientPermissions]: "{application}には{permissionName}のアクセス許可がありません。",
  [meetingStatus.scheduledSuccess]: "追加された会議",
  [meetingStatus.updatedSuccess]: "更新された会議",
  [meetingStatus.meetingIsDeleted]: "会議は削除されました",
  [meetingStatus.internalError]: "申し訳ありませんが、問題が発生しました。もう一度試してください。"
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
