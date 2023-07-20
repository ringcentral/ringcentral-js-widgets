import type { Alert } from '@ringcentral-integration/commons/modules/Alert';

import type { EvClient } from '../../lib/EvClient';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import type { EvPresence } from '../EvPresence';
import type { EvSettings } from '../EvSettings';
import type { EvStorage } from '../EvStorage';
import type { EvSubscription } from '../EvSubscription';
import type { EvTabManager } from '../EvTabManager';
import type { EvWorkingState } from '../EvWorkingState';

export interface State {
  dialoutCallerId: string;
  dialoutQueueId: string;
  dialoutCountryId: string;
  dialoutRingTime: number;
  formGroup: Pick<
    State,
    | 'dialoutCallerId'
    | 'dialoutQueueId'
    | 'dialoutCountryId'
    | 'dialoutRingTime'
  >;
}

export interface EvCallOptions {
  //
}

export interface Deps {
  evWorkingState: EvWorkingState;
  evSettings: EvSettings;
  alert: Alert;
  evAuth: EvAuth;
  evSubscription: EvSubscription;
  storage: EvStorage;
  evClient: EvClient;
  evAgentSession: EvAgentSession;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  evCallMonitor: EvCallMonitor;
  presence: EvPresence;
  tabManager?: EvTabManager;
  evCallOptions?: EvCallOptions;
}

export interface Call extends State {
  //
}
