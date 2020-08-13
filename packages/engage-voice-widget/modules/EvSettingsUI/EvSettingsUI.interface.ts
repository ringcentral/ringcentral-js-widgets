import Locale from 'ringcentral-integration/modules/Locale';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvClient } from '../../lib/EvClient';
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
}

export interface SettingsUI {
  //
}
