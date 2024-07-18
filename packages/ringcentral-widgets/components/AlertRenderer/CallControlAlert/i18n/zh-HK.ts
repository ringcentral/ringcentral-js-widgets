import { callControlAlerts, callControlError } from '@ringcentral-integration/commons/modules/ActiveCallControl';
const {
  callsMerged,
  somethingWentWrong,
  tooManyParticipants
} = callControlAlerts;
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError,
  forwardSuccess,
  transferCompleted,
  replyCompleted
} = callControlError;
export default {
  [callsMerged]: "通話已合併",
  [somethingWentWrong]: "發生錯誤。請再試一次。",
  [tooManyParticipants]: "已達到參與者的人數上限。",
  [muteConflictError]: "此通話已在另一台裝置上靜音。處理此應用程式前，請先取消通話的靜音。",
  [unHoldConflictError]: "此通話已由其他裝置保留。處理此應用程式前，請先取消保留該通話。",
  [unMuteConflictError]: "此通話已在其他裝置上取消靜音。處理此應用程式前，請先將該通話靜音。",
  [holdConflictError]: "此通話已由其他裝置取消保留。處理此應用程式前，請先保留該通話。",
  [generalError]: "伺服器發生意外錯誤。請稍後再試。",
  [forwardSuccess]: "已轉接通話",
  [transferCompleted]: "通話已轉接",
  [replyCompleted]: "語音訊息已傳送。"
};

// @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
