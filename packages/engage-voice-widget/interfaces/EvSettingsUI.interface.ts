export type EvOffhookState =
  | 'connected'
  | 'disconnected'
  | 'connecting'
  | 'disconnecting';

export interface EvSettingsUIProps {
  currentLocale: string;
  version: string;
}

export interface EvSettingsUIFunctions {
  onLogout(): Promise<any>;
}
