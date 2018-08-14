import conferenceCallErrors from 'ringcentral-integration/modules/ConferenceCall/conferenceCallErrors';

export default {
  [conferenceCallErrors.bringInFailed]: 'Failed to merge the calls due to unexpected errors. Please try again later.',
  [conferenceCallErrors.makeConferenceFailed]: 'Failed to merge the calls due to unexpected errors. Please try again later.',
  [conferenceCallErrors.terminateConferenceFailed]: 'Failed to hangup the conference due to unexpected errors. Please try again later.',
  [conferenceCallErrors.removeFromConferenceFailed]: 'Failed to remove the participant due to unexpected errors. Please try again later.',
};
