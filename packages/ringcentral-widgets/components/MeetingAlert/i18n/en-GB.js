import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Please enter meeting topic.",
  [meetingStatus.noPassword]: "Please provide meeting password.",
  [meetingStatus.insufficientPermissions]: "{application} do not have {permissionName} permission.",
  [meetingStatus.scheduledSuccess]: "Meeting is scheduled.",
  [meetingStatus.updatedSuccess]: "Meeting is updated.",
  [meetingStatus.internalError]: "Internal error, meeting schedule failed. Try again later."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting is updated."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@
