import { RingCentralExtensions } from '../RingCentralExtensions';

export interface WebSocketSubscriptionOptions {
  refreshDelay?: number;
}

export interface Deps {
  ringCentralExtensions: RingCentralExtensions;
  webSocketSubscriptionOptions?: WebSocketSubscriptionOptions;
}
