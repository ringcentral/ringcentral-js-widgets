import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: "Loki ladattu. Virheidenseurantatila on nyt poistettu käytöstä.",
  [issueTrackingMessages.downloadFail]: "Virhelokin lataus epäonnistui. Yritä uudelleen."
};

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded. Error tracking mode is turned off now."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
