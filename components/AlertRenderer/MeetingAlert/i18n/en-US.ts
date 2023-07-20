import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';

export default {
  [meetingStatus.emptyTopic]: 'Please enter meeting topic.',
  [meetingStatus.noPassword]: 'Please provide meeting password.',
  [meetingStatus.insufficientPermissions]:
    '{application} do not have {permissionName} permission.',
  [meetingStatus.scheduledSuccess]: 'Meeting added',
  [meetingStatus.updatedSuccess]: 'Meeting updated',
  [meetingStatus.meetingIsDeleted]: 'Meeting has been deleted',
  [meetingStatus.internalError]:
    'Sorry, something went wrong on our end. Try again.',
  [meetingStatus.renderInviteError]:
    "Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later.",
};
