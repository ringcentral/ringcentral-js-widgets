import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';

export interface GetMessagesOptions {
  currentContact: Entity;
  sessionId?: string | null;
  fromLocal?: boolean;
  forceUpdate?: boolean;
}

export interface CleanUpMessagesOptions {
  contact: Entity;
  sessionId?: string | null;
}

export interface FetchMessageListOptions {
  dateTo: string;
  dateFrom: string;
  messageType: string[];
  perPage: number;
  phoneNumber: string;
}

export interface LoadSuccessOptions {
  contact: Entity;
  messages: (Message | RecentMessage)[];
  sessionId: string | null;
}

export interface LoadResetOptions {
  contact: Entity;
  sessionId: string | null;
}

export interface RecentMessage extends GetMessageInfoResponse {
  fromRemote: boolean;
}
