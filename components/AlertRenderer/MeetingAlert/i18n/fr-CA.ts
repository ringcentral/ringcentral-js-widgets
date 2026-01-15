/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: 'Veuillez entrer le sujet de la réunion.',
  [meetingStatus.noPassword]: 'Veuillez fournir le mot de passe de la réunion.',
  [meetingStatus.insufficientPermissions]:
    '{application} ne possède pas la permission {permissionName}.',
  [meetingStatus.scheduledSuccess]: 'Réunion ajoutée',
  [meetingStatus.updatedSuccess]: 'Réunion mise à jour',
  [meetingStatus.meetingIsDeleted]: 'La réunion a été supprimée',
  [meetingStatus.internalError]:
    'Désolés, une erreur s’est produite de notre côté. Réessayez.',
  [meetingStatus.renderInviteError]:
    'Désolés, un problème est survenu de notre côté et nous n’avons pas pu ajouter l’invitation à la réunion. Veuillez réessayer plus tard.',
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
