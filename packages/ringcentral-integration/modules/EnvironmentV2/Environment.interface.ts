import GlobalStorage from '../GlobalStorage';
import { RingCentralClient } from '../../lib/RingCentralClient';
import { SDKConfig } from '../../lib/createSdkConfig';

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
  environmentChanged: boolean;
}
