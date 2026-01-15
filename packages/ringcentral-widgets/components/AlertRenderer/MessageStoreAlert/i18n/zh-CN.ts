/* eslint-disable */
import { messageStoreErrors } from '@ringcentral-integration/commons/modules/MessageStore';
export default {
  [messageStoreErrors.deleteFailed]: '由于内部服务器错误，无法删除语音邮件。',
} as const;

// @key: @#@"[messageStoreErrors.deleteFailed]"@#@ @source: @#@"Cannot delete the voicemail due to internal server error."@#@
