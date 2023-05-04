import { conferenceCallErrors } from '@ringcentral-integration/commons/modules/ConferenceCall';
export default {
  [conferenceCallErrors.bringInFailed]: "因為意外發生錯誤，合併通話失敗。請稍後再試。",
  [conferenceCallErrors.makeConferenceFailed]: "因為意外發生錯誤，合併通話失敗。請稍後再試。",
  [conferenceCallErrors.terminateConferenceFailed]: "因為意外發生錯誤，掛斷電話會議失敗。請稍後再試。",
  [conferenceCallErrors.removeFromConferenceFailed]: "因為意外發生錯誤，移除參與者失敗。請稍後再試。",
  [conferenceCallErrors.callIsRecording]: "通話錄音進行中。請停止錄音並稍後再試一次。"
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
