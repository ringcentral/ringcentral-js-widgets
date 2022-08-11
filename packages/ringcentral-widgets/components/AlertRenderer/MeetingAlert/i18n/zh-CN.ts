import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: "请输入会议主题。",
  [meetingStatus.noPassword]: "请提供会议密码。",
  [meetingStatus.insufficientPermissions]: "{application}没有{permissionName}权限。",
  [meetingStatus.scheduledSuccess]: "已添加会议",
  [meetingStatus.updatedSuccess]: "已更新会议",
  [meetingStatus.meetingIsDeleted]: "已删除会议",
  [meetingStatus.internalError]: "抱歉，系统出现问题。请重试。",
  [meetingStatus.renderInviteError]: "抱歉，系统出现问题，无法添加会议邀请。请稍后重试。"
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
