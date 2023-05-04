import { conferenceCallErrors } from '@ringcentral-integration/commons/modules/ConferenceCall';
export default {
  [conferenceCallErrors.bringInFailed]: "由于意外错误，合并通话失败。请稍后重试。",
  [conferenceCallErrors.makeConferenceFailed]: "由于意外错误，合并通话失败。请稍后重试。",
  [conferenceCallErrors.terminateConferenceFailed]: "由于意外错误，挂断电话会议失败。请稍后重试。",
  [conferenceCallErrors.removeFromConferenceFailed]: "由于意外错误，移除参与者失败。请稍后重试。",
  [conferenceCallErrors.callIsRecording]: "正在通话录音。请停止录音并重试。"
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
