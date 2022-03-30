import { Alert } from '@ringcentral-integration/commons/modules/Alert';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvPresence } from '../EvPresence';
import { EvSettings } from '../EvSettings';
import { EvStorage } from '../EvStorage';
import { EvSubscription } from '../EvSubscription';
import { EvTabManager } from '../EvTabManager';
import { EvWorkingState } from '../EvWorkingState';

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
