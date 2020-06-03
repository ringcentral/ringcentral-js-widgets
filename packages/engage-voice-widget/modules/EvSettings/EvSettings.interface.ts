import Storage from 'ringcentral-integration/modules/Storage';
import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvSessionConfig } from '../EvSessionConfig';

type Config = any; // Todo add type

export interface State {
  config: Config;
  isOffhook: boolean;
  isOffhooking: boolean;
  isManualOffhook: boolean;
}

export interface DepsModules {
  evClient: EvClient;
  evAuth: EvAuth;
  evSessionConfig: EvSessionConfig;
  storage: Storage;
}
export interface Settings extends State {
  setConfig(config: Config): void;
}
