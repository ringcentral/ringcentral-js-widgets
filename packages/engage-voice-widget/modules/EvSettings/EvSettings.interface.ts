import type { EvClient } from '../../lib/EvClient';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvPresence } from '../EvPresence';
import type { EvStorage } from '../EvStorage';

export interface State {}

export interface EvSettingsOptions {
  //
}

export interface Deps {
  evClient: EvClient;
  evAuth: EvAuth;
  evAgentSession: EvAgentSession;
  storage: EvStorage;
  presence: EvPresence;
  evSettingsOptions?: EvSettingsOptions;
}

export interface Settings extends State {}
