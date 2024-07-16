import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';

export default {
  [callLogMessages.logCallLogFailed]:
    'Failed to load call log form due to unexpected error. Please refresh the page and try again.',
  // New version of log failed message
  [callLogMessages.logFailed]:
    "Sorry, we've failed to log your call. Please try again later.",
  [callLogMessages.fieldRequired]: 'Mandatory fields are required.',
} as const;
