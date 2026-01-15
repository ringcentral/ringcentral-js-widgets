/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: '会議のトピックを入力してください。',
  [meetingStatus.noPassword]: '会議のパスワードを入力してください。',
  [meetingStatus.insufficientPermissions]:
    '{application}には{permissionName}のアクセス許可がありません。',
  [meetingStatus.scheduledSuccess]: '会議が追加されました',
  [meetingStatus.updatedSuccess]: '会議が更新されました',
  [meetingStatus.meetingIsDeleted]: '会議が削除されました',
  [meetingStatus.internalError]:
    '申し訳ありません。こちら側で問題が発生しました。もう一度やり直してください。',
  [meetingStatus.renderInviteError]:
    '申し訳ありません。問題が発生したため、会議の招待を追加できませんでした。後でもう一度やり直してください。',
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
