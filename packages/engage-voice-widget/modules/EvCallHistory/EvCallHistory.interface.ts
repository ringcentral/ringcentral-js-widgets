import type { ActivityMatcher } from '@ringcentral-integration/commons/modules/ActivityMatcher';
import type { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';

import type { EvAgentSession } from '../EvAgentSession';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvSubscription } from '../EvSubscription';

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
