/* eslint-disable */
import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  [meetingStatus.emptyTopic]: 'Voer het onderwerp voor de meeting in.',
  [meetingStatus.noPassword]: 'Geef het wachtwoord voor de meeting op.',
  [meetingStatus.insufficientPermissions]:
    '{application} heeft geen {permissionName}-machtiging.',
  [meetingStatus.scheduledSuccess]: 'Meeting toegevoegd',
  [meetingStatus.updatedSuccess]: 'Meeting bijgewerkt',
  [meetingStatus.meetingIsDeleted]: 'Meeting is verwijderd',
  [meetingStatus.internalError]:
    'Er is bij ons iets fout gegaan. Probeer het opnieuw.',
  [meetingStatus.renderInviteError]:
    'Er is helaas een probleem opgetreden bij ons, waardoor de uitnodiging voor de meeting niet kan worden toegevoegd. Probeer het later opnieuw.',
} as const;

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@
// @key: @#@"[meetingStatus.renderInviteError]"@#@ @source: @#@"Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."@#@
