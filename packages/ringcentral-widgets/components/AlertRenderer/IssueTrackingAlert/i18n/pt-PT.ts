/* eslint-disable */
import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: 'Registo transferido.',
  [issueTrackingMessages.downloadFail]:
    'A transferência do registo de erros falhou. Tente novamente.',
} as const;

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
