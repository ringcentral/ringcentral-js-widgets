/* eslint-disable */
export default {
  muteConflictError:
    '此通話已在另一台裝置上靜音。處理此應用程式前，請先取消通話的靜音。',
  unMuteConflictError:
    '此通話已在其他裝置上取消靜音。處理此應用程式前，請先將該通話靜音。',
  recordError: '目前無法對通話進行錄音。錯誤代碼：{errorCode}',
  recordErrorWithoutCode: '目前無法對通話進行錄音。',
  pauseRecordError: '抱歉，我們無法停止通話錄音。請稍後再試一次。',
  holdConflictError:
    '此通話已由其他裝置取消保留。處理此應用程式前，請先保留該通話。',
  unHoldConflictError:
    '此通話已由其他裝置保留。處理此應用程式前，請先取消保留該通話。',
  generalError: '伺服器發生意外錯誤。請稍後再試。',
  replyCompleted: '語音訊息已傳送。',
  transferCompleted: '通話已轉接',
  toVoiceMailError: '因為發生內部錯誤，無法將來電轉至語音信箱',
  transferError: '無法轉接通話。請稍後再試。',
  forwardSuccess: '已轉接通話',
  somethingWentWrong: '發生錯誤。請再試一次。',
  noOutboundCallWithoutDL:
    '您的分機目前不支援使用瀏覽器向外撥出電話。請聯絡您的客戶代表進行升級。',
  tooManyParticipants: '已達到參與者人數上限。',
  callsMerged: '通話已合併',
  failWithoutStatusCode:
    '抱歉，系統發生錯誤。如果錯誤仍然存在，請向 {brandName} 支援人員回報此錯誤。',
  replyEmptyError: '抱歉，您無法傳送空白訊息。',
} as const;

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"recordError"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"recordErrorWithoutCode"@#@ @source: @#@"You cannot record the call at the moment."@#@
// @key: @#@"pauseRecordError"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"toVoiceMailError"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"transferError"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"noOutboundCallWithoutDL"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"replyEmptyError"@#@ @source: @#@"Sorry, you cannot send an empty message."@#@
