/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: 'Escriba el tema de la reunión.',
  [meetingStatus.noPassword]: 'Indique la contraseña de la reunión.',
  [meetingStatus.insufficientPermissions]:
    '{application}no tiene el permiso{permissionName}.',
  [meetingStatus.scheduledSuccess]: 'Reunión agregada',
  [meetingStatus.updatedSuccess]: 'Se ha actualizado la reunión',
  [meetingStatus.meetingIsDeleted]: 'Se ha eliminado la reunión',
  [meetingStatus.internalError]:
    'Se ha producido un error en nuestro sistema. Inténtelo de nuevo.',
  [meetingStatus.renderInviteError]:
    'Lo sentimos, hemos tenido un problema y no hemos podido añadir la invitación a la reunión. Vuelva a intentarlo más tarde.',
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
