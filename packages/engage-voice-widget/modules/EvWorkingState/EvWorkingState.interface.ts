import { Alert } from '@ringcentral-integration/commons/modules/AlertV2';
import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';

import { EvAgentState, EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvPresence } from '../EvPresence';
import { EvStorage } from '../EvStorage';
import { EvSubscription } from '../EvSubscription';
import { EvTabManager } from '../EvTabManager';

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
  storage: EvStorage;
  alert: Alert;
  tabManager?: EvTabManager;
  evWorkingStateOptions?: EvWorkingStateOptions;
}

export interface WorkingState extends State {
  setAgentState(agentState: EvAgentState): void;
}
