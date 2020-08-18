import TabManager from 'ringcentral-integration/modules/TabManager';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvPresence } from '../EvPresence';
import { EvSettings } from '../EvSettings';

interface State {
  //
}

export interface EvActiveCallControlOptions {
  //
}

export interface Deps {
  evClient: EvClient;
  presence: EvPresence;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  tabManager?: TabManager;
  evSettings: EvSettings;
  evAgentSession: EvAgentSession;
  evActiveCallControlOptions?: EvActiveCallControlOptions;
}

export interface ActiveCallControl extends State {
  hangUp(sessionId: string): void;
  hold(): void;
  unhold(): void;
  mute(): void;
  unmute(): void;
  reject(): void;
}
