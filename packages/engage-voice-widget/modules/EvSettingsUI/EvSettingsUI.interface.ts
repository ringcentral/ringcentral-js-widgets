import Locale from '@ringcentral-integration/commons/modules/Locale';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvSettings } from '../EvSettings';

export interface Deps {
  locale: Locale;
  routerInteraction: RouterInteraction;
  version: string;
  evSettings: EvSettings;
  evCallMonitor: EvCallMonitor;
  evAuth: EvAuth;
  evClient: EvClient;
  evAgentSession: EvAgentSession;
}

export interface SettingsUI {
  //
}
