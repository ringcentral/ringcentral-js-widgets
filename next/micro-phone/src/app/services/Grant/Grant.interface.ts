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
  smsRecipient?: boolean;
}

interface Extension {
  uri: string;
  id: string;
  extensionNumber: string;
  type: string;
  name: string;
}
