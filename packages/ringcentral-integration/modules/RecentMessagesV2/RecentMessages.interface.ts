import { GetMessageInfoResponse } from '@rc-ex/core/definitions';
import { Entity } from '../../interfaces/Entity.interface';
import { Message } from '../../interfaces/MessageStore.model';
import { MessageStore } from '../MessageStoreV2';

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
