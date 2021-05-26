import { GetMessageInfoResponse } from '@rc-ex/core/definitions';
import {
  Message,
  MessageStoreModel,
} from '../../interfaces/MessageStore.model';
import Alert from '../Alert';
import { Auth } from '../AuthV2';
import { AvailabilityMonitor } from '../AvailabilityMonitorV2';
import { ConnectivityMonitor } from '../ConnectivityMonitorV2';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManagerV2';

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
  extensionFeatures: ExtensionFeatures;
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
