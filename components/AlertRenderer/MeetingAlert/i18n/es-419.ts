/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: 'Escriba el tema de la reunión.',
  [meetingStatus.noPassword]: 'Indique la contraseña de la reunión.',
  [meetingStatus.insufficientPermissions]:
    '{application} no tiene el permiso {permissionName}.',
  [meetingStatus.scheduledSuccess]: 'Reunión añadida',
  [meetingStatus.updatedSuccess]: 'Reunión actualizada',
  [meetingStatus.meetingIsDeleted]: 'La reunión ha sido eliminada.',
  [meetingStatus.internalError]:
    'Se produjo un error en nuestro sistema. Inténtelo de nuevo más tarde.',
  [meetingStatus.renderInviteError]:
    'Lo sentimos, hubo un problema de nuestra parte y no pudimos agregar la invitación a la reunión. Inténtelo de nuevo más tarde.',
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
