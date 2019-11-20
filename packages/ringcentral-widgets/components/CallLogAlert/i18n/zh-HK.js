import callLogMessages from 'ringcentral-integration/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "因為意外錯誤，無法載入通話記錄表格。請重新整理頁面然後再試一次。",
  // New version of log failed message
  [callLogMessages.logFailed]: "很抱歉，無法記錄您的通話。"
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
