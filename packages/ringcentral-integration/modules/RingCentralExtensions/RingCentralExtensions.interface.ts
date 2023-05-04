import { DebugOptions } from '@rc-ex/debug';
import { WebSocketOptions } from '@rc-ex/ws/lib/types';

import { RingCentralClient } from '../../lib/RingCentralClient';
import { Auth } from '../Auth';
import { SleepDetector } from '../SleepDetector';
import { TabManager } from '../TabManager';

export interface RingCentralExtensionsOptions {
  debugMode?: boolean;
  debugOptions?: DebugOptions;
  webSocketOptions?: WebSocketOptions;
  disconnectOnInactive?: boolean;
}

export interface Deps {
  auth: Auth;
  client: RingCentralClient;
  sleepDetector?: SleepDetector;
  tabManager?: TabManager;
  ringCentralExtensionsOptions?: RingCentralExtensionsOptions;
}
