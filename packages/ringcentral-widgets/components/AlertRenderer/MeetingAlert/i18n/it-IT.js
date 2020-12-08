import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Specifica l'argomento della riunione.",
  [meetingStatus.noPassword]: "Fornisci la password della riunione.",
  [meetingStatus.insufficientPermissions]: "{application} non dispone dell'autorizzazione {permissionName}.",
  [meetingStatus.scheduledSuccess]: "Riunione aggiunta",
  [meetingStatus.updatedSuccess]: "Riunione aggiornata",
  [meetingStatus.meetingIsDeleted]: "La riunione è stata cancellata",
  [meetingStatus.internalError]: "Si è verificato un problema. Riprova."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
