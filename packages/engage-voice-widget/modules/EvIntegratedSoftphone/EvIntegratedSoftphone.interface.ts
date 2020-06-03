import Alert from 'ringcentral-integration/modules/Alert';
import Storage from 'ringcentral-integration/modules/Storage';
import Locale from 'ringcentral-integration/modules/Locale';
import { Modal } from 'ringcentral-widgets/modules/Modal';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvClient } from '../../lib/EvClient';
import { EvPresence } from '../EvPresence';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvSettings } from '../EvSettings';
import { EvSubscription } from '../EvSubscription';

export interface State {
  // dtmfString: string;
  muteActive: boolean;
  softphoneRegistered: boolean;
}

export interface DepsModules {
  routerInteraction: RouterInteraction;
  locale: Locale;
  evSessionConfig: EvSessionConfig;
  evSubscription: EvSubscription;
  evSettings: EvSettings;
  evClient: EvClient;
  storage: Storage;
  presence: EvPresence;
  modal: Modal;
  alert: Alert;
}

export interface IntegratedSoftphone extends State {}
