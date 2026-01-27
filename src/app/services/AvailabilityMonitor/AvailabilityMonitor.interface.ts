export interface AvailabilityMonitorOptions {
  /**
   * Enable availability monitor, default false.
   */
  enabled: boolean;
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
