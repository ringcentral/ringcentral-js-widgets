import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvPresence } from '../EvPresence';
import { EvStorage } from '../EvStorage';

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
