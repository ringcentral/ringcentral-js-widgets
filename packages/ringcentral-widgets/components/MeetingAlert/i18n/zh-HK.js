import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';

export default {
  [meetingStatus.emptyTopic]: "請輸入會議主題。",
  [meetingStatus.noPassword]: "請提供會議密碼。",
  [meetingStatus.insufficientPermissions]: "{application} 沒有 {permissionName} 權限。",
  [meetingStatus.scheduledSuccess]: "會議已排定時間。"
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
