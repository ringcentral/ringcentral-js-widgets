import meetingStatus from '@ringcentral-integration/commons/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Anna tapaamisen otsikko.",
  [meetingStatus.noPassword]: "Anna tapaamisen salasana.",
  [meetingStatus.insufficientPermissions]: "Seuraavilla sovelluksilla ei ole käyttölupaa {permissionName}: {application}.",
  [meetingStatus.scheduledSuccess]: "Tapaaminen lisätty",
  [meetingStatus.updatedSuccess]: "Tapaaminen päivitetty",
  [meetingStatus.meetingIsDeleted]: "Tapaaminen on poistettu",
  [meetingStatus.internalError]: "Jotakin meni vikaan palvelimellamme. Yritä uudelleen."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
