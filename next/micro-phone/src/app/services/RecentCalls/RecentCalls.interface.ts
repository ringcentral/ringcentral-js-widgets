import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';

import type { HistoryCall } from '../CallHistory';

export interface RecentCallsOptions {
  //
}

export type FetchCallLogListOptions =
  | {
      dateFrom: string;
      perPage: number;
      type: string;
      extensionNumber: string;
    }
  | {
      dateFrom: string;
      perPage: number;
      type: string;
      phoneNumber: string;
    };

export interface LoadSuccessOptions {
  contact: Entity;
  calls: HistoryCall[];
  sessionId: string | null;
}

export interface CleanUpCallsOptions {
  contact: Entity;
  sessionId: string | null;
}

export interface GetCallsOptions {
  currentContact: Entity;
  sessionId: string | null;
}
