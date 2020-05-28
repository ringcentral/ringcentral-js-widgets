import { EvClient } from '../../lib/EvClient';
import { EvPresence } from '../EvPresence';
import { EvSettings } from '../EvSettings';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';

interface State {
  //
}

export interface DepsModules {
  evClient: EvClient;
  presence: EvPresence;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  evSettings: EvSettings;
}

export interface ActiveCallControl extends State {
  hangUp(sessionId: string): void;
  hold(): void;
  unhold(): void;
  mute(): void;
  unmute(): void;
  reject(): void;
}
