import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Geben Sie das Meetingthema ein.",
  [meetingStatus.noPassword]: "Geben Sie das Meetingkennwort ein.",
  [meetingStatus.insufficientPermissions]: "{application} haben keine Berechtigung für {permissionName}.",
  [meetingStatus.scheduledSuccess]: "Meeting hinzugefügt",
  [meetingStatus.updatedSuccess]: "Meeting aktualisiert",
  [meetingStatus.meetingIsDeleted]: "Meeting wurde gelöscht",
  [meetingStatus.internalError]: "Entschuldigung, bei uns ist etwas schiefgelaufen. Versuchen Sie es erneut."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
