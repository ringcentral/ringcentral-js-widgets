import Alert from 'ringcentral-integration/modules/Alert';
import RcAuth from 'ringcentral-integration/modules/Auth';
import Locale from 'ringcentral-integration/modules/Locale';
import Storage from 'ringcentral-integration/modules/Storage';
import TabManager from 'ringcentral-integration/modules/TabManager';
import { Block } from 'ringcentral-widgets/modules/Block';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvAgent, EvAgentConfig, EvClient } from '../../lib/EvClient';
import { EvSubscription } from '../EvSubscription';

export interface EvAuthData {
  agentConfig?: EvAgentConfig;
  data?: {
    agents: EvAgent[];
    inboundSettings: {
      availableQueues: any[];
    };
  };
}

export interface DepsModules {
  locale: Locale;
  storage: Storage;
  alert: Alert;
  routerInteraction: RouterInteraction;
  evClient: EvClient;
  auth: RcAuth;
  block: Block;
  evSubscription: EvSubscription;
  tabManager?: TabManager;
}

export interface State {
  connected: boolean;
  agent: EvAuthData;
}

export interface Auth extends State {
  connecting?: boolean;
  disconnecting?: boolean;
  setConnectionData(connection: State): void;
}
