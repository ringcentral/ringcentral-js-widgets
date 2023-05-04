import { syncTypes } from '../../enums/syncTypes';
import { SyncFunctionOptions } from './MessageStore.interface';

type GetSyncParamsOptions = Pick<
  SyncFunctionOptions,
  Exclude<keyof SyncFunctionOptions, 'receivedRecordsLength'>
>;

interface SyncParams {
  syncType: string;
  recordCountPerConversation: GetSyncParamsOptions['conversationLoadLength'];
  recordCount?: GetSyncParamsOptions['recordCount'];
  dateFrom?: string;
  dateTo?: string;
}

export const getSyncParams = ({
  recordCount,
  conversationLoadLength,
  dateFrom,
  dateTo,
  syncToken,
}: GetSyncParamsOptions) => {
  if (syncToken) {
    return {
      syncToken,
      syncType: syncTypes.iSync,
    };
  }
  const params: SyncParams = {
    recordCountPerConversation: conversationLoadLength,
    syncType: syncTypes.fSync,
  };
  if (recordCount) {
    params.recordCount = recordCount;
  }
  if (dateFrom) {
    params.dateFrom = dateFrom.toISOString();
  }
  if (dateTo) {
    params.dateTo = dateTo.toISOString();
  }
  return params;
};
