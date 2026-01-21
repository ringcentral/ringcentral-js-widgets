import type { DebugOptions } from '@rc-ex/debug';
import type { WebSocketOptions } from '@rc-ex/ws/lib/types';

export interface RingCentralExtensionsOptions {
  debugMode?: boolean;
  debugOptions?: DebugOptions;
  webSocketOptions?: WebSocketOptions;
}
