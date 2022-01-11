import callControlError from '@ringcentral-integration/commons/modules/ActiveCallControl/callControlError';
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError,
  forwardSuccess
} = callControlError;
export default {
  [muteConflictError]: "此通話已在其他裝置上靜音。處理此應用程式前，請先取消通話的靜音。",
  [unHoldConflictError]: "此通話已由其他裝置保留。處理此應用程式前，請先取消保留該通話。",
  [unMuteConflictError]: "此通話已在其他裝置上取消靜音。處理此應用程式前，請先將該通話靜音。",
  [holdConflictError]: "此通話已由其他裝置取消保留。處理此應用程式前，請先保留該通話。",
  [generalError]: "伺服器發生意外錯誤。請稍後再試一次。",
  [forwardSuccess]: "已轉接電話"
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
