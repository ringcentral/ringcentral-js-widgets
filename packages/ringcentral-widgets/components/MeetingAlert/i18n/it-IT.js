import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Specifica l'argomento della riunione.",
  [meetingStatus.noPassword]: "Fornisci la password della riunione.",
  [meetingStatus.insufficientPermissions]: "{application} non dispone dell'autorizzazione {permissionName}.",
  [meetingStatus.scheduledSuccess]: "La riunione è programmata."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
