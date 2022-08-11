import { conferenceCallErrors } from '@ringcentral-integration/commons/modules/ConferenceCall';
export default {
  [conferenceCallErrors.bringInFailed]: "Failed to merge the calls due to unexpected errors. Please try again later.",
  [conferenceCallErrors.makeConferenceFailed]: "Failed to merge the calls due to unexpected errors. Please try again later.",
  [conferenceCallErrors.terminateConferenceFailed]: "Failed to hang up the conference due to unexpected errors. Please try again later.",
  [conferenceCallErrors.removeFromConferenceFailed]: "Failed to remove the participant due to unexpected errors. Please try again later.",
  [conferenceCallErrors.callIsRecording]: "Call recording in progress. Please stop recording and try again."
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
