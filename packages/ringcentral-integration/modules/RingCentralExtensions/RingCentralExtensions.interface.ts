import type { DebugOptions } from '@rc-ex/debug';
import type { WebSocketOptions } from '@rc-ex/ws/lib/types';

import type { RingCentralClient } from '../../lib/RingCentralClient';
import type { Auth } from '../Auth';
import type { AvailabilityMonitor } from '../AvailabilityMonitor';
import type { SleepDetector } from '../SleepDetector';
import type { TabManager } from '../TabManager';

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
  availabilityMonitor?: AvailabilityMonitor;
  ringCentralExtensionsOptions?: RingCentralExtensionsOptions;
}
