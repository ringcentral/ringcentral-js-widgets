import { DebugOptions } from '@rc-ex/debug';
import { WebSocketOptions } from '@rc-ex/ws/lib/types';
import { SleepDetector } from '../SleepDetectorV2';
import { RingCentralClient } from '../../lib/RingCentralClient';

export interface RingCentralExtensionsOptions {
  debugMode?: boolean;
  debugOptions?: DebugOptions;
  webSocketOptions?: WebSocketOptions;
}

export interface Deps {
  client: RingCentralClient;
  sleepDetector?: SleepDetector;
  ringCentralExtensionsOptions?: RingCentralExtensionsOptions;
}
