/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: '請輸入會議主題。',
  [meetingStatus.noPassword]: '請提供會議密碼。',
  [meetingStatus.insufficientPermissions]:
    '{application} 沒有{permissionName}權限。',
  [meetingStatus.scheduledSuccess]: '已新增會議',
  [meetingStatus.updatedSuccess]: '已更新會議',
  [meetingStatus.meetingIsDeleted]: '已刪除會議',
  [meetingStatus.internalError]: '抱歉，系統發生錯誤。請再試一次。',
  [meetingStatus.renderInviteError]:
    '抱歉，系統發生錯誤，無法新增會議邀請。請稍後再試。',
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
