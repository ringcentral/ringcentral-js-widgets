import Alert from 'ringcentral-integration/modules/Alert';
import { Auth } from 'ringcentral-integration/modules/AuthV2';
import Storage from 'ringcentral-integration/modules/Storage';
import { EvTabManager } from '../EvTabManager';

import { EvAgentState, EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvPresence } from '../EvPresence';
import { EvSubscription } from '../EvSubscription';

export interface State {
  agentState: EvAgentState;
  time: number;
  isPendingDisposition: boolean;
}

export interface EvWorkingStateOptions {
  //
}

export interface Deps {
  auth: Auth;
  evAuth: EvAuth;
  evAgentSession: EvAgentSession;
  evSubscription: EvSubscription;
  evCallMonitor: EvCallMonitor;
  evClient: EvClient;
  presence: EvPresence;
  storage: Storage;
  alert: Alert;
  tabManager?: EvTabManager;
  evWorkingStateOptions?: EvWorkingStateOptions;
}

export interface WorkingState extends State {
  setAgentState(agentState: EvAgentState): void;
}
