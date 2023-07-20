import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Block } from '@ringcentral-integration/widgets/modules/Block';
import type { ModalUI } from '@ringcentral-integration/widgets/modules/ModalUI';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvClient } from '../../lib/EvClient';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvSettings } from '../EvSettings';
import type { EvStorage } from '../EvStorage';
import type { EvTabManager } from '../EvTabManager';
import type { EvWorkingState } from '../EvWorkingState';

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
