import { WebSocketOptions } from '@rc-ex/ws/lib/types';
import Auth from '../Auth';
import SleepDetector from '../SleepDetector';

export interface WebSocketSubscriptionOptions extends WebSocketOptions {
  refreshDelay?: number;
}

export interface Deps {
  client: any;
  auth: Auth;
  sleepDetector?: SleepDetector;
  webSocketSubscriptionOptions?: WebSocketSubscriptionOptions;
}
