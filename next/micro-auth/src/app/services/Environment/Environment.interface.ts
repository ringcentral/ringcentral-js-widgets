import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';

export interface EnvironmentOptions {
  defaultRecordingHost?: string;
}

export interface SetDataOptions {
  server: SDKConfig['server'];
  aiApiUrl?: string;
  smartNotesIframe?: string;
  smartNotesEnv?: string;
  recordingHost: string;
  enabled: boolean;
  environmentChanged?: boolean;
  allowDataTracking?: boolean;
  mfeDepsInfo?: string;
}

export type MfeDeps = { name: string; entry: string }[];
