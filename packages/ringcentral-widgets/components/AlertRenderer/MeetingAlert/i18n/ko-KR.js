import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "모임 주제를 입력하세요.",
  [meetingStatus.noPassword]: "모임 비밀번호를 제공하세요.",
  [meetingStatus.insufficientPermissions]: "{application}에 {permissionName} 권한이 없습니다.",
  [meetingStatus.scheduledSuccess]: "모임이 추가됨",
  [meetingStatus.updatedSuccess]: "모임이 업데이트됨",
  [meetingStatus.meetingIsDeleted]: "모임이 삭제됨",
  [meetingStatus.internalError]: "죄송합니다. RingCentral 시스템에서 문제가 발생했습니다. 다시 시도하세요."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
