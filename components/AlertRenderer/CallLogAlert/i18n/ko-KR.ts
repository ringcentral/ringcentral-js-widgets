import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "예기치 않은 오류로 인해 통화 기록을 로드하지 못했습니다. 페이지를 새로 고치고 다시 시도하세요.",
  // New version of log failed message
  [callLogMessages.logFailed]: "죄송합니다. 통화를 기록하지 못했습니다. 나중에 다시 시도하세요.",
  [callLogMessages.fieldRequired]: "필수 필드가 필요합니다."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
