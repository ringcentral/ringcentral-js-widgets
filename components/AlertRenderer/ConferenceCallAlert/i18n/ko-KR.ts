import conferenceCallErrors from '@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors';
export default {
  [conferenceCallErrors.bringInFailed]: "예기치 않은 오류로 인해 통화를 병합하지 못했습니다. 나중에 다시 시도하세요.",
  [conferenceCallErrors.makeConferenceFailed]: "예기치 않은 오류로 인해 통화를 병합하지 못했습니다. 나중에 다시 시도하세요.",
  [conferenceCallErrors.terminateConferenceFailed]: "예기치 않은 오류로 인해 전화 회의를 끊지 못했습니다. 나중에 다시 시도하세요.",
  [conferenceCallErrors.removeFromConferenceFailed]: "예기치 않은 오류로 인해 참가자를 제거하지 못했습니다. 나중에 다시 시도하세요.",
  [conferenceCallErrors.callIsRecording]: "통화 녹음이 진행 중입니다. 녹음을 중지하고 다시 시도하세요."
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
