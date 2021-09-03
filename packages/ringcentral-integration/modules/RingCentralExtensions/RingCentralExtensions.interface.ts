import { DebugOptions } from '@rc-ex/debug';
import { WebSocketOptions } from '@rc-ex/ws/lib/types';
import { Auth } from '../AuthV2';
import { Storage } from '../StorageV2';
import { SleepDetector } from '../SleepDetectorV2';
import { RingCentralClient } from '../../lib/RingCentralClient';

export interface RingCentralExtensionsOptions {
  debugMode?: boolean;
  debugOptions?: DebugOptions;
  webSocketOptions?: WebSocketOptions;
}

export interface Deps {
  auth: Auth;
  client: RingCentralClient;
  storage: Storage;
  sleepDetector?: SleepDetector;
  ringCentralExtensionsOptions?: RingCentralExtensionsOptions;
}
