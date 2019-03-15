import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Veuillez saisir le sujet de la réunion.",
  [meetingStatus.noPassword]: "Veuillez fournir le mot de passe de la réunion.",
  [meetingStatus.insufficientPermissions]: "{application} ne possède pas la permission {permissionName}.",
  [meetingStatus.scheduledSuccess]: "La réunion est programmée.",
  [meetingStatus.internalError]: "Erreur interne, échec de la programmation de la réunion. Réessayez plus tard."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@
