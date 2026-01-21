import { syncTypes } from '@ringcentral-integration/commons/enums/syncTypes';

import type { SyncFunctionOptions } from './MessageStore.interface';

type GetSyncParamsOptions = Pick<
  SyncFunctionOptions,
  Exclude<keyof SyncFunctionOptions, 'receivedRecordsLength'>
>;

interface SyncParams {
  syncType: 'FSync' | 'ISync';
  recordCountPerConversation: GetSyncParamsOptions['conversationLoadLength'];
  recordCount?: GetSyncParamsOptions['recordCount'];
  messageType?: GetSyncParamsOptions['messageType'];
  dateFrom?: string;
  dateTo?: string;
}

export const getSyncParams = ({
  recordCount,
  conversationLoadLength,
  dateFrom,
  dateTo,
  syncToken,
  messageType,
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
  if (messageType) {
    params.messageType = messageType;
  }
  return params;
};

export const messageStoreEventRegExp = /\/message-store$/;

export const instantMessageEventRegExp = /\/message-store\/instant\?type=SMS$/;
