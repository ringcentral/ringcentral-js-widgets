import { SDKConfig } from '../../lib/createSdkConfig';
import { RingCentralClient } from '../../lib/RingCentralClient';
import { GlobalStorage } from '../GlobalStorage';

export interface EnvironmentOptions {
  defaultRecordingHost?: string;
}

export interface Deps {
  globalStorage: GlobalStorage;
  client: RingCentralClient;
  sdkConfig: SDKConfig;
  environmentOptions?: EnvironmentOptions;
}

export interface SetDataOptions {
  server: SDKConfig['server'];
  recordingHost: string;
  enabled: boolean;
  environmentChanged?: boolean;
}
