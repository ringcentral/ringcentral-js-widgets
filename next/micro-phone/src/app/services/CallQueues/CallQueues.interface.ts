export interface CallQueueInfo {
  uri: string;
  id: string;
  extensionNumber: string;
  name: string;
  extensionType?: string;
  status?: string;
  subType?: 'Emergency' | 'Unknown';
  site?: {
    id: string;
    name: string;
  };
}

export interface SmsRecipient {
  id: string;
  extensionNumber: string;
  name: string;
  assignable: boolean;
}

export interface SmsRecipientsCacheEntry {
  data: SmsRecipient[];
  timestamp: number;
  loading: boolean;
}

export interface CallQueueListResponse {
  uri: string;
  records: CallQueueInfo[];
  navigation: {
    firstPage?: {
      uri: string;
    };
    nextPage?: {
      uri: string;
    };
    previousPage?: {
      uri: string;
    };
    lastPage?: {
      uri: string;
    };
  };
  paging: {
    page: number;
    perPage: number;
    totalPages?: number;
    totalElements?: number;
  };
}

export interface ListCallQueuesOptions {
  page?: number;
  perPage?: number;
  memberExtensionId?: string;
}
