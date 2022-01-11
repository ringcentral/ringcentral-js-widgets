import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Block } from '@ringcentral-integration/widgets/modules/Block';
import { ModalUI } from '@ringcentral-integration/widgets/modules/ModalUI';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvSettings } from '../EvSettings';
import { EvStorage } from '../EvStorage';
import { EvTabManager } from '../EvTabManager';
import { EvWorkingState } from '../EvWorkingState';

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
