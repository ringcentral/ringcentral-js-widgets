import { ActivityMatcher } from '@ringcentral-integration/commons/modules/ActivityMatcherV2';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcherV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';

import { EvAgentSession } from '../EvAgentSession';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvSubscription } from '../EvSubscription';

export interface State {
  //
}

export interface Deps {
  evCallMonitor: EvCallMonitor;
  evSubscription: EvSubscription;
  contactMatcher?: ContactMatcher;
  activityMatcher?: ActivityMatcher;
  locale: Locale;
  evAgentSession: EvAgentSession;
}

export interface CallHistory extends State {
  //
}
