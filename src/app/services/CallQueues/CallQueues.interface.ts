export interface CallQueueInfo {
  uri: string;
  id: string;
  extensionNumber: string;
  name: string;
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

export interface ExtensionGrantResponse {
  uri: string;
  records: ExtensionGrantRecord[];
  paging: Paging;
  navigation: Navigation;
}

interface Navigation {
  firstPage: FirstPage;
  lastPage: FirstPage;
}

interface FirstPage {
  uri: string;
}

interface Paging {
  page: number;
  totalPages: number;
  perPage: number;
  totalElements: number;
  pageStart: number;
  pageEnd: number;
}

export interface ExtensionGrantRecord {
  uri: string;
  extension: Extension;
  callPickup: boolean;
  callMonitoring: boolean;
  callOnBehalfOf: boolean;
  callDelegation: boolean;
  groupPaging: boolean;
  callQueueSetup: boolean;
  callQueueMembersSetup: boolean;
  callQueueMessages: boolean;
  sharedVoicemails: boolean;
  callQueueFacSetup: boolean;
  callQueueSmsRecipient: boolean;
}

interface Extension {
  uri: string;
  id: string;
  extensionNumber: string;
  type: string;
  name: string;
}
