import type { ActivityMatcher } from '@ringcentral-integration/commons/modules/ActivityMatcher';
import type { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import type { Beforeunload } from '@ringcentral-integration/widgets/modules/Beforeunload';

import type { EvClient } from '../../lib/EvClient';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvCallDataSource } from '../EvCallDataSource';
import type { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import type { EvPresence } from '../EvPresence';

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
  evCallDataSource: EvCallDataSource;
}

export interface CallMonitor extends State {
  //
}
