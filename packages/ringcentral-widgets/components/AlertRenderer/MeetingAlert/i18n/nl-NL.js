import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Voer het onderwerp voor de meeting in.",
  [meetingStatus.noPassword]: "Geef het wachtwoord voor de meeting op.",
  [meetingStatus.insufficientPermissions]: "{application} heeft geen {permissionName}-rechten.",
  [meetingStatus.scheduledSuccess]: "Meeting toegevoegd",
  [meetingStatus.updatedSuccess]: "Meeting bijgewerkt",
  [meetingStatus.meetingIsDeleted]: "Meeting is verwijderd",
  [meetingStatus.internalError]: "Er is bij ons iets fout gegaan. Probeer het later opnieuw."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
