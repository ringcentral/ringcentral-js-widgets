import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Geben Sie das Meetingthema ein.",
  [meetingStatus.noPassword]: "Geben Sie das Meetingkennwort ein.",
  [meetingStatus.insufficientPermissions]: "{application} haben keine Berechtigung für {permissionName}.",
  [meetingStatus.scheduledSuccess]: "Meeting ist geplant.",
  [meetingStatus.updatedSuccess]: "Besprechung wird aktualisiert.",
  [meetingStatus.internalError]: "Interner Fehler, Besprechungszeitplan fehlgeschlagen. Versuchen Sie es später erneut."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting is updated."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@
