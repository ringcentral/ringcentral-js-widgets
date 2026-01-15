/* eslint-disable */
import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
export default {
  [issueTrackingMessages.downloadSuccess]: '로그가 다운로드되었습니다.',
  [issueTrackingMessages.downloadFail]:
    '오류 로그 다운로드에 실패했습니다. 다시 시도하세요.',
} as const;

// @key: @#@"[issueTrackingMessages.downloadSuccess]"@#@ @source: @#@"Log downloaded."@#@
// @key: @#@"[issueTrackingMessages.downloadFail]"@#@ @source: @#@"Error log download failed. Please try again."@#@
