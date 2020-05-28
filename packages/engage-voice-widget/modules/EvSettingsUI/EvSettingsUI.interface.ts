import Locale from 'ringcentral-integration/modules/Locale';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';
import Auth from 'ringcentral-integration/modules/Auth';
import { EvSettings } from '../EvSettings';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvAuth } from '../EvAuth';

export interface DepsModules {
  locale: Locale;
  routerInteraction: RouterInteraction;
  auth: Auth;
  version: string;
  evSettings: EvSettings;
  evCallMonitor: EvCallMonitor;
  evAuth: EvAuth;
}

export interface SettingsUI {
  //
}
