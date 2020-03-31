import callLogMessages from 'ringcentral-integration/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "予期しないエラーにより、通話ログフォームを読み込めませんでした。ページを更新してもう一度やり直してください。",
  // New version of log failed message
  [callLogMessages.logFailed]: "申し訳ございません。通話の記録に失敗しました。後でもう一度やり直してください。",
  [callLogMessages.fieldRequired]: "必須フィールドに入力してください。"
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
