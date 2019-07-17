import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
export default {
  [meetingStatus.emptyTopic]: "Insira um tópico de reunião.",
  [meetingStatus.noPassword]: "Forneça uma senha para a reunião.",
  [meetingStatus.insufficientPermissions]: "{application} não tem a permissão {permissionName}.",
  [meetingStatus.scheduledSuccess]: "A reunião está agendada.",
  [meetingStatus.updatedSuccess]: "Reunião atualizada.",
  [meetingStatus.internalError]: "Erro interno, o agendamento da reunião falhou. Tente novamente mais tarde."
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting is updated."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@
