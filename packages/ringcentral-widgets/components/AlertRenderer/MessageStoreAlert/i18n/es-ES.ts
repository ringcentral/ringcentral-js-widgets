/* eslint-disable */
import { messageStoreErrors } from '@ringcentral-integration/commons/modules/MessageStore';
export default {
  [messageStoreErrors.deleteFailed]:
    'No se puede eliminar el mensaje de voz a causa de un error del servidor interno.',
} as const;

// @key: @#@"[messageStoreErrors.deleteFailed]"@#@ @source: @#@"Cannot delete the voicemail due to internal server error."@#@
