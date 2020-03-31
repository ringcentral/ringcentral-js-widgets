import conferenceCallErrors from 'ringcentral-integration/modules/ConferenceCall/conferenceCallErrors';
export default {
  [conferenceCallErrors.bringInFailed]: "予期しないエラーにより、通話をマージできませんでした。後でもう一度やり直してください。",
  [conferenceCallErrors.makeConferenceFailed]: "予期しないエラーにより、通話をマージできませんでした。後でもう一度やり直してください。",
  [conferenceCallErrors.terminateConferenceFailed]: "予期しないエラーにより、会議を終了できませんでした。後でもう一度やり直してください。",
  [conferenceCallErrors.removeFromConferenceFailed]: "予期しないエラーにより、参加者を削除できませんでした。後でもう一度やり直してください。",
  [conferenceCallErrors.callIsRecording]: "通話を録音中です。録音を停止し、もう一度やり直してください。"
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
