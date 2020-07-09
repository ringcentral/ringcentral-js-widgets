import Alert from 'ringcentral-integration/modules/Alert';
import Auth from 'ringcentral-integration/modules/Auth';
import Storage from 'ringcentral-integration/modules/Storage';
import TabManager from 'ringcentral-integration/modules/TabManager';

import { EvAgentState, EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvPresence } from '../EvPresence';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvSubscription } from '../EvSubscription';

export interface State {
  agentState: EvAgentState;
  time: number;
  isPendingDisposition: boolean;
}

export interface DepsModules {
  auth: Auth;
  evAuth: EvAuth;
  evSessionConfig: EvSessionConfig;
  evSubscription: EvSubscription;
  evClient: EvClient;
  presence: EvPresence;
  storage: Storage;
  alert: Alert;
  tabManager?: TabManager;
}

export interface WorkingState extends State {
  setAgentState(agentState: EvAgentState): void;
}
