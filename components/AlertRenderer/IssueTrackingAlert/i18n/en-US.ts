import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';

export default {
  [issueTrackingMessages.downloadSuccess]:
    'Log downloaded. Error tracking mode is turned off now.',
  [issueTrackingMessages.downloadFail]:
    'Error log download failed. Please try again.',
} as const;
