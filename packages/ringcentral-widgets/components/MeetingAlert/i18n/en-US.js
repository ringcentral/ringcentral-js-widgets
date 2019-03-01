import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';

export default {
  [meetingStatus.emptyTopic]: 'Please enter meeting topic.',
  [meetingStatus.noPassword]: 'Please provide meeting password.',
  [meetingStatus.insufficientPermissions]: '{application} do not have {permissionName} permission.',
  [meetingStatus.scheduledSuccess]: 'Meeting is scheduled.',
  [meetingStatus.internalError]: 'Internal error, meeting schedule failed. Try again later.',
};
