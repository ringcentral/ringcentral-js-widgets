/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: 'Introduza o tópico da reunião.',
  [meetingStatus.noPassword]: 'Introduza a palavra-passe da reunião.',
  [meetingStatus.insufficientPermissions]:
    '{application} não tem permissão {permissionName}.',
  [meetingStatus.scheduledSuccess]: 'Reunião adicionada',
  [meetingStatus.updatedSuccess]: 'Reunião atualizada',
  [meetingStatus.meetingIsDeleted]: 'A reunião foi eliminada',
  [meetingStatus.internalError]:
    'Lamentamos, mas ocorreu um erro do nosso lado. Tente novamente.',
  [meetingStatus.renderInviteError]:
    'Lamentamos, mas ocorreu um erro da nossa parte e não conseguimos adicionar o convite para a reunião. Tente novamente mais tarde.',
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
