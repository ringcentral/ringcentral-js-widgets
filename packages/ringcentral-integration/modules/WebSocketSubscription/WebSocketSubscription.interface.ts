import { RingCentralExtensions } from '../RingCentralExtensions';
import { Storage } from '../StorageV2';

export interface WebSocketSubscriptionOptions {
  refreshDelay?: number;
}

export interface Deps {
  storage: Storage;
  ringCentralExtensions: RingCentralExtensions;
  webSocketSubscriptionOptions?: WebSocketSubscriptionOptions;
}
