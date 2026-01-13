import type { SubscriptionFilter } from '../../enums/subscriptionFilters';
import type { RingCentralExtensions } from '../RingCentralExtensions';
import type { TabManager } from '../TabManager';

export interface WebSocketSubscriptionOptions {}

export interface Deps {
  client: any;
  ringCentralExtensions: RingCentralExtensions;
  tabManager?: TabManager;
  webSocketSubscriptionOptions?: WebSocketSubscriptionOptions;
}

export interface SubscriptionMetadata {
  filters: SubscriptionFilter[];
  handler?: (message: any) => void;
}

export interface SubscriberInfo {
  metadata: SubscriptionMetadata;
  unwatch?: () => void;
}
