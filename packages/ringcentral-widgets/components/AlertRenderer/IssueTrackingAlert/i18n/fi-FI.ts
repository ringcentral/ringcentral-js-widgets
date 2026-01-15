/* eslint-disable */
import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: 'Loki ladattu.',
  [issueTrackingMessages.downloadFail]:
    'Virhelokin lataus epäonnistui. Yritä uudelleen.',
} as const;

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
