import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';

import type { Entity } from '../../interfaces/Entity.interface';
import type { Message } from '../../interfaces/MessageStore.model';
import type { MessageStore } from '../MessageStore';

export interface Deps {
  client: any;
  messageStore: MessageStore;
}

export interface GetMessagesOptions {
  currentContact: Entity;
  sessionId?: string;
  fromLocal?: boolean;
  forceUpdate?: boolean;
}

export interface CleanUpMessagesOptions {
  contact: Entity;
  sessionId?: string;
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
  sessionId: string;
}

export interface LoadResetOptions {
  contact: Entity;
  sessionId: string;
}

export interface RecentMessage extends GetMessageInfoResponse {
  fromRemote: boolean;
}

export type RecentMessages = RecentMessage[];
