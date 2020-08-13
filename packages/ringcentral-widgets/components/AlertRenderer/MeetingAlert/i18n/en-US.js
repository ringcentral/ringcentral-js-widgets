import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';

export default {
  [meetingStatus.emptyTopic]: 'Please enter meeting topic.',
  [meetingStatus.noPassword]: 'Please provide meeting password.',
  [meetingStatus.insufficientPermissions]:
    '{application} do not have {permissionName} permission.',
  [meetingStatus.scheduledSuccess]: 'Meeting is scheduled.',
  [meetingStatus.updatedSuccess]: 'Meeting is updated.',
  [meetingStatus.meetingIsDeleted]: 'Meeting has been deleted.',
  [meetingStatus.internalError]:
    'Sorry, something went wrong on our end. Try again.',
};
