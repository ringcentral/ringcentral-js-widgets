import meetingStatus from '@ringcentral-integration/commons/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Veuillez saisir la rubrique de la réunion.",
  [meetingStatus.noPassword]: "Veuillez fournir le mot de passe de la réunion.",
  [meetingStatus.insufficientPermissions]: "{application} ne dispose pas de la permission {permissionName}.",
  [meetingStatus.scheduledSuccess]: "Réunion ajoutée",
  [meetingStatus.updatedSuccess]: "Réunion mise à jour",
  [meetingStatus.meetingIsDeleted]: "La réunion a été supprimée",
  [meetingStatus.internalError]: "Désolé, une erreur s’est produite de notre côté. Veuillez réessayer."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
