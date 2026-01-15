/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: "Specifica l'argomento della riunione.",
  [meetingStatus.noPassword]: 'Fornisci la password della riunione.',
  [meetingStatus.insufficientPermissions]:
    "{application} non dispone dell'autorizzazione {permissionName}.",
  [meetingStatus.scheduledSuccess]: 'Riunione aggiunta',
  [meetingStatus.updatedSuccess]: 'Riunione aggiornata',
  [meetingStatus.meetingIsDeleted]: 'La riunione è stata cancellata',
  [meetingStatus.internalError]:
    'Si è verificato un problema nei nostri sistemi. Riprova più tardi.',
  [meetingStatus.renderInviteError]:
    "Si è verificato un problema e non è stato possibile aggiungere l'invito alla riunione. Riprova più tardi.",
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
