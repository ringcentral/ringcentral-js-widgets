import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Escriba el tema de la reunión.",
  [meetingStatus.noPassword]: "Indique la contraseña de la reunión.",
  [meetingStatus.insufficientPermissions]: "{application} no tiene el permiso {permissionName}.",
  [meetingStatus.scheduledSuccess]: "La reunión se ha programado.",
  [meetingStatus.updatedSuccess]: "La reunión está actualizada.",
  [meetingStatus.internalError]: "Error interno, no se pudo programar la reunión. Vuelva a intentarlo más tarde."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting is updated."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@
