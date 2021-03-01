import Locale from 'ringcentral-integration/modules/Locale';
import { ModalUI } from 'ringcentral-widgets/modules/ModalUIV2';
import { Block } from 'ringcentral-widgets/modules/Block';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';
import { EvClient } from '../../lib/EvClient';

import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvSettings } from '../EvSettings';
import { EvWorkingState } from '../EvWorkingState';
import { EvTabManager } from '../EvTabManager';
import { EvStorage } from '../EvStorage';

export interface State {
  isLoading: boolean;
}

export interface EvAgentSessionUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  routerInteraction: RouterInteraction;
  evAuth: EvAuth;
  evSettings: EvSettings;
  evWorkingState: EvWorkingState;
  evAgentSession: EvAgentSession;
  storage: EvStorage;
  evAgentSessionUIOptions?: EvAgentSessionUIOptions;
  modalUI: ModalUI;
  block: Block;
  evClient: EvClient;
  tabManager?: EvTabManager;
}

export interface SessionConfigUI extends State {
  //
}
