import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "Failed to load call log form due to unexpected error. Please refresh the page and try again.",
  // New version of log failed message
  [callLogMessages.logFailed]: "Sorry, we were unable to log your call. Please try again later.",
  [callLogMessages.fieldRequired]: "All fields are required."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
