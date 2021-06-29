import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "由于意外错误，加载通话记录失败。请刷新页面并重试。",
  // New version of log failed message
  [callLogMessages.logFailed]: "抱歉，我们无法记录您的通话。请稍后再试。",
  [callLogMessages.fieldRequired]: "请填写必填字段。"
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
