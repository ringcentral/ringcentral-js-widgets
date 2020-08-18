import Storage from 'ringcentral-integration/modules/Storage';
import { Beforeunload } from 'ringcentral-widgets/modules/Beforeunload';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';

export interface State {
  isOffhook: boolean;
  isOffhooking: boolean;
  isManualOffhook: boolean;
}

export interface EvSettingsOptions {
  //
}

export interface Deps {
  evClient: EvClient;
  evAuth: EvAuth;
  evAgentSession: EvAgentSession;
  storage: Storage;
  beforeunload: Beforeunload;
  evSettingsOptions?: EvSettingsOptions;
}

export interface Settings extends State {}
