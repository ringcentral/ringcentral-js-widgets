import Alert from 'ringcentral-integration/modules/Alert';
import Storage from 'ringcentral-integration/modules/Storage';
import TabManager from 'ringcentral-integration/modules/TabManager';

import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvPresence } from '../EvPresence';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvSettings } from '../EvSettings';
import { EvSubscription } from '../EvSubscription';

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

export interface DepsModules {
  evSettings: EvSettings;
  alert: Alert;
  evAuth: EvAuth;
  evSubscription: EvSubscription;
  storage: Storage;
  evClient: EvClient;
  evSessionConfig: EvSessionConfig;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  tabManager?: TabManager;
  evCallMonitor: EvCallMonitor;
  presence: EvPresence;
}

export interface Call extends State {
  //
}
