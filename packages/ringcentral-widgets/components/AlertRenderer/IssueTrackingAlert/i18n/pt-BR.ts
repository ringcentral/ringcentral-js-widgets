/* eslint-disable */
import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: 'Registro baixado.',
  [issueTrackingMessages.downloadFail]:
    'Falha no download do registro de erros. Tente novamente.',
} as const;

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
