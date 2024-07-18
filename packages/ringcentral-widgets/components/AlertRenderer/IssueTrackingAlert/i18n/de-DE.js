import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: "Protokoll heruntergeladen. Der Fehlerverfolgungsmodus ist jetzt deaktiviert.",
  [issueTrackingMessages.downloadFail]: "Das Herunterladen des Fehlerprotokolls ist fehlgeschlagen. Versuchen Sie es erneut."
};

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded. Error tracking mode is turned off now."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
