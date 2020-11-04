import Storage from 'ringcentral-integration/modules/Storage';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvPresence } from '../EvPresence';

export interface State {}

export interface EvSettingsOptions {
  //
}

export interface Deps {
  evClient: EvClient;
  evAuth: EvAuth;
  evAgentSession: EvAgentSession;
  storage: Storage;
  presence: EvPresence;
  evSettingsOptions?: EvSettingsOptions;
}

export interface Settings extends State {}
