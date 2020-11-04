import Locale from 'ringcentral-integration/modules/Locale';
import Storage from 'ringcentral-integration/modules/Storage';
import { Modal } from 'ringcentral-widgets/modules/Modal';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvSettings } from '../EvSettings';
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
  storage: Storage;
  evAgentSessionUIOptions?: EvAgentSessionUIOptions;
  modal: Modal;
}

export interface SessionConfigUI extends State {
  //
}
