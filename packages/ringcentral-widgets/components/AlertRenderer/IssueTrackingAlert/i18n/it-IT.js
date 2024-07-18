import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: "Registro scaricato. La modalità di rilevamento errori è disattivata.",
  [issueTrackingMessages.downloadFail]: "Download registro errori non riuscito. Riprova."
};

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded. Error tracking mode is turned off now."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
