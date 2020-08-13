import Locale from 'ringcentral-integration/modules/Locale';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvEnvironment } from '../../interfaces/Environment.interface';
import { EvAuth } from '../EvAuth';
import { EvCallMonitor } from '../EvCallMonitor/EvCallMonitor';
import { EvSettings } from '../EvSettings';
import { EvWorkingState } from '../EvWorkingState';

export interface Deps {
  environment: EvEnvironment;
  evAuth: EvAuth;
  evCallMonitor: EvCallMonitor;
  evSettings: EvSettings;
  routerInteraction: RouterInteraction;
  evWorkingState: EvWorkingState;
  locale: Locale;
}

export interface MainView {
  oldIntervalTime?: number;
}
