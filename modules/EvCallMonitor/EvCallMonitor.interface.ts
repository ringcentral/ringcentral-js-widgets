import { ActivityMatcher } from '@ringcentral-integration/commons/modules/ActivityMatcherV2';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcherV2';
import { Beforeunload } from '@ringcentral-integration/widgets/modules/Beforeunload';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvCallDataSource } from '../EvCallDataSource';
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
  evCallDataSource: EvCallDataSource;
}

export interface CallMonitor extends State {
  //
}
