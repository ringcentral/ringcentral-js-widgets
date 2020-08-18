import ActivityMatcher from 'ringcentral-integration/modules/ActivityMatcher';
import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';
import { Beforeunload } from 'ringcentral-widgets/modules/Beforeunload';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvPresence } from '../EvPresence';

export interface State {
  //
}

export interface Deps {
  presence: EvPresence;
  evClient: EvClient;
  evAgentSession: EvAgentSession;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  beforeunload: Beforeunload;
  contactMatcher?: ContactMatcher;
  activityMatcher?: ActivityMatcher;
}

export interface CallMonitor extends State {
  //
}
