/* eslint-disable */
import { messageStoreErrors } from '@ringcentral-integration/commons/modules/MessageStore';
export default {
  [messageStoreErrors.deleteFailed]:
    'Vastaajaviestiä ei voi poistaa sisäisen palvelinvirheen vuoksi.',
} as const;

// @key: @#@"[messageStoreErrors.deleteFailed]"@#@ @source: @#@"Cannot delete the voicemail due to internal server error."@#@
