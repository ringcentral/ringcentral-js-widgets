import { Storage } from '../StorageV2';
import { RingCentralExtensions } from '../RingCentralExtensions';

export interface WebSocketSubscriptionOptions {
  refreshDelay?: number;
}

export interface Deps {
  storage: Storage;
  ringCentralExtensions: RingCentralExtensions;
  webSocketSubscriptionOptions?: WebSocketSubscriptionOptions;
}
