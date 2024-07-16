import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: "Registro descargado. El modo de registro de errores está desactivado.",
  [issueTrackingMessages.downloadFail]: "Error al descargar el registro. Vuelva a intentarlo."
};

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded. Error tracking mode is turned off now."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
