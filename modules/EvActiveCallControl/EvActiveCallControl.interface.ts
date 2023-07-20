import type { EvClient } from '../../lib/EvClient';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import type { EvPresence } from '../EvPresence';
import type { EvSettings } from '../EvSettings';
import type { EvTabManager } from '../EvTabManager';

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
