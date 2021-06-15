import { EvTabManager } from '../EvTabManager';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvPresence } from '../EvPresence';
import { EvSettings } from '../EvSettings';
import { EvCallMonitor } from '../EvCallMonitor';

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
  tabManager?: EvTabManager;
  evSettings: EvSettings;
  evAgentSession: EvAgentSession;
  evActiveCallControlOptions?: EvActiveCallControlOptions;
  evCallMonitor: EvCallMonitor;
}

export interface ActiveCallControl extends State {
  hangUp(sessionId: string): void;
  hold(): void;
  unhold(): void;
  mute(): void;
  unmute(): void;
  reject(): void;
}
