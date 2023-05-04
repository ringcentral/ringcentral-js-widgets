import { RingCentralExtensions } from '../RingCentralExtensions';
import { TabManager } from '../TabManager';

export interface WebSocketSubscriptionOptions {}

export interface Deps {
  ringCentralExtensions: RingCentralExtensions;
  tabManager?: TabManager;
  webSocketSubscriptionOptions?: WebSocketSubscriptionOptions;
}
