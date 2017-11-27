import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';

export default {
  [meetingStatus.emptyTopic]: 'Please enter meeting topic.',
  [meetingStatus.noPassword]: 'Please provide meeting password.',
  [meetingStatus.scheduledSuccess]: 'Meeting is scheduled.',
};
