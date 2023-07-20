import type { Auth } from '../Auth';
import type { Environment } from '../Environment';
import type { TabManager } from '../TabManager';

export interface AvailabilityMonitorOptions {
  /**
   * Enable availability monitor, default false.
   */
  enabled: boolean;
}

export interface Deps {
  auth: Auth;
  client: any;
  prefix?: string;
  tabManager?: TabManager;
  environment?: Environment;
  availabilityMonitorOptions?: AvailabilityMonitorOptions;
}

export interface ErrorMessages {
  _json: { errorCode: string }[];
}

export interface SharedState {
  timestamp: number;
  tabId?: string;
  hasCallSession?: boolean;
  webSocketReady?: boolean;
}
