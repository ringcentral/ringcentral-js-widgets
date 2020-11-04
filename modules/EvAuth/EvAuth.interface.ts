import Alert from 'ringcentral-integration/modules/Alert';
import { Auth as RcAuth } from 'ringcentral-integration/modules/AuthV2';
import Locale from 'ringcentral-integration/modules/Locale';
import Storage from 'ringcentral-integration/modules/Storage';
import { Block } from 'ringcentral-widgets/modules/Block';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvAgentData, EvClient } from '../../lib/EvClient';
import { EvSubscription } from '../EvSubscription';
import { EvTabManager } from '../EvTabManager';

export interface EvAuthOptions {
  //
}

export interface Deps {
  locale: Locale;
  storage: Storage;
  alert: Alert;
  routerInteraction: RouterInteraction;
  evClient: EvClient;
  auth: RcAuth;
  block: Block;
  evSubscription: EvSubscription;
  tabManager?: EvTabManager;
  evAuthOptions?: EvAuthOptions;
}

export interface State {
  connected: boolean;
  agent: EvAgentData;
}

export interface Auth extends State {
  connecting?: boolean;
  disconnecting?: boolean;
  setConnectionData(connection: State): void;
}
