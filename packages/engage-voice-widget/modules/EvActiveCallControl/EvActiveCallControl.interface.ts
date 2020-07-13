import TabManager from 'ringcentral-integration/modules/TabManager';

import { EvClient } from '../../lib/EvClient';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvPresence } from '../EvPresence';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvSettings } from '../EvSettings';

interface State {
  //
}

export interface DepsModules {
  evClient: EvClient;
  presence: EvPresence;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  tabManager?: TabManager;
  evSettings: EvSettings;
  evSessionConfig: EvSessionConfig;
}

export interface ActiveCallControl extends State {
  hangUp(sessionId: string): void;
  hold(): void;
  unhold(): void;
  mute(): void;
  unmute(): void;
  reject(): void;
}
