import type { RingCentralExtensions } from '../RingCentralExtensions';
import type { TabManager } from '../TabManager';

export interface WebSocketSubscriptionOptions {}

export interface Deps {
  client: any;
  ringCentralExtensions: RingCentralExtensions;
  tabManager?: TabManager;
  webSocketSubscriptionOptions?: WebSocketSubscriptionOptions;
}
