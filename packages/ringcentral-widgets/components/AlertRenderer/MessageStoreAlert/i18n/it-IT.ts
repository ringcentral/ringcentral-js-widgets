/* eslint-disable */
import { messageStoreErrors } from '@ringcentral-integration/commons/modules/MessageStore';
export default {
  [messageStoreErrors.deleteFailed]:
    'Errore interno del server: impossibile eliminare il messaggio vocale.',
} as const;

// @key: @#@"[messageStoreErrors.deleteFailed]"@#@ @source: @#@"Cannot delete the voicemail due to internal server error."@#@
