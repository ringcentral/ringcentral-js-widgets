import { Entity } from '../../interfaces/Entity.interface';
import { Auth } from '../AuthV2';
import { CallHistory, HistoryCall } from '../CallHistoryV2';

interface RecentCallsOptions {
  //
}

export interface Deps {
  client: any;
  auth: Auth;
  callHistory: CallHistory;
  recentCallsOptions?: RecentCallsOptions;
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
  sessionId: string;
}

export interface CleanUpCallsOptions {
  contact: Entity;
  sessionId?: string;
}

export interface GetCallsOptions {
  currentContact: Entity;
  sessionId: string;
}
