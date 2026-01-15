/* eslint-disable */
import { messageStoreErrors } from '@ringcentral-integration/commons/modules/MessageStore';
export default {
  [messageStoreErrors.deleteFailed]:
    '내부 서버 오류로 인해 음성 메일을 삭제할 수 없습니다.',
} as const;

// @key: @#@"[messageStoreErrors.deleteFailed]"@#@ @source: @#@"Cannot delete the voicemail due to internal server error."@#@
