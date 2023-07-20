import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvClient } from '../../lib/EvClient';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvSettings } from '../EvSettings';

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
