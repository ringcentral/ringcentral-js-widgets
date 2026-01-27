export interface OptOutResponse {
  from: string;
  to: string;
  status: 'OptIn' | 'OptOut';
  source: 'Recipient' | 'Account' | 'Upstream' | 'Carrier';
}

export interface OptOutListResponse {
  records: OptOutResponse[];
  paging: {
    page: number;
    perPage: number;
    totalPages?: number;
    totalElements?: number;
  };
}

export interface GetOptOutsOptions {
  from?: string;
  to?: string;
  status?: 'optout' | 'optin' | 'all';
  pageToken?: string;
  perPage?: number;
}
