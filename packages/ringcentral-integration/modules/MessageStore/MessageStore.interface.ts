import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';

import {
  Message,
  MessageStoreModel,
} from '../../interfaces/MessageStore.model';
import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { Auth } from '../Auth';
import { AvailabilityMonitor } from '../AvailabilityMonitor';
import { ConnectivityMonitor } from '../ConnectivityMonitor';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { Subscription } from '../Subscription';
import { TabManager } from '../TabManager';

export interface MessageStoreOptions extends DataSourceBaseProps {
  daySpan?: number;
  conversationsLoadLength?: number;
  conversationLoadLength?: number;
  messagesFilter?: (...args: any) => any;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  alert: Alert;
  auth: Auth;
  client: any;
  subscription: Subscription;
  connectivityMonitor: ConnectivityMonitor;
  appFeatures: AppFeatures;
  tabManager?: TabManager;
  availabilityMonitor?: AvailabilityMonitor;
  messageStoreOptions?: MessageStoreOptions;
}

export type MessageHandler = (record: Message) => any;

export type DispatchedMessageIds = {
  id: number;
  lastModifiedTime: string;
}[];

export interface ProcessRawConversationListOptions {
  records: GetMessageInfoResponse[];
  conversationStore: MessageStoreModel['conversationStore'];
  isFSyncSuccess?: boolean;
}

export interface ProcessRawConversationStoreOptions {
  records: GetMessageInfoResponse[];
  isFSyncSuccess?: boolean;
}

export interface SyncFunctionOptions {
  recordCount?: number;
  conversationLoadLength?: number;
  dateFrom: Date;
  dateTo: Date;
  syncToken?: string;
  receivedRecordsLength?: number;
}

export type MessageStoreItem = Message & { unreadCounts: number };

export type MessageStoreConversations = MessageStoreItem[];
