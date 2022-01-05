import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "發生未預期的錯誤，無法載入通話記錄表格。請重新整理頁面然後再試一次。",
  // New version of log failed message
  [callLogMessages.logFailed]: "抱歉，我們無法記錄您的電話。請稍後再試。",
  [callLogMessages.fieldRequired]: "請填寫必要欄位。"
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
