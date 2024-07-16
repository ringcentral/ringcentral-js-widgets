import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: "Journal téléchargé. Le mode de suivi des erreurs est maintenant désactivé.",
  [issueTrackingMessages.downloadFail]: "Échec du téléchargement du journal d’erreurs. Veuillez réessayer."
};

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded. Error tracking mode is turned off now."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
