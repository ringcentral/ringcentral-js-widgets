export type EvOffhookState =
  | 'connected'
  | 'disconnected'
  | 'connecting'
  | 'disconnecting';

interface SessionInfoItem {
  label: string;
  value: string;
}

export type SessionInfo = SessionInfoItem[];

export interface EvSettingsUIProps {
  currentLocale: string;
  version: string;
  agentName: string;
  userName: string;
  sessionInfo: SessionInfo;
  disableEditSessionButton: boolean;
  showEditSessionButton: boolean;
}

export interface EvSettingsUIFunctions {
  onLogout(): Promise<any>;
  goToSessionUpdatePage(): void;
}
