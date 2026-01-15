/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: 'Geben Sie das Besprechungsthema ein.',
  [meetingStatus.noPassword]: 'Geben Sie das Besprechungskennwort ein.',
  [meetingStatus.insufficientPermissions]:
    '{application} haben keine Berechtigung für {permissionName}.',
  [meetingStatus.scheduledSuccess]: 'Besprechung hinzugefügt',
  [meetingStatus.updatedSuccess]: 'Besprechung aktualisiert',
  [meetingStatus.meetingIsDeleted]: 'Besprechung wurde gelöscht',
  [meetingStatus.internalError]:
    'Leider ist auf unserer Seite ein Fehler aufgetreten. Versuchen Sie es erneut.',
  [meetingStatus.renderInviteError]:
    'Leider bestand unsererseits ein Problem. Wir konnten daher die Besprechungseinladung nicht hinzufügen. Versuchen Sie es später noch einmal.',
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
