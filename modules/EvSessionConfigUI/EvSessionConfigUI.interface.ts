import Locale from 'ringcentral-integration/modules/Locale';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';
import Storage from 'ringcentral-integration/modules/Storage';
import { EvAuth } from '../EvAuth';
import { EvSettings } from '../EvSettings';
import { EvWorkingState } from '../EvWorkingState';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvClient } from '../../lib/EvClient';

export interface State {
  isLoading: boolean;
}

export interface DepsModules {
  locale: Locale;
  routerInteraction: RouterInteraction;
  evAuth: EvAuth;
  evSettings: EvSettings;
  evWorkingState: EvWorkingState;
  evClient: EvClient;
  evSessionConfig: EvSessionConfig;
  storage: Storage;
}

export interface SessionConfigUI {
  //
}
