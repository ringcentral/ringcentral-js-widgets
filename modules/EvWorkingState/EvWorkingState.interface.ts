import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { Auth } from '@ringcentral-integration/commons/modules/Auth';

import type { EvAgentState, EvClient } from '../../lib/EvClient';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvPresence } from '../EvPresence';
import type { EvStorage } from '../EvStorage';
import type { EvSubscription } from '../EvSubscription';
import type { EvTabManager } from '../EvTabManager';

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
