import ActivityMatcher from 'ringcentral-integration/modules/ActivityMatcher';
import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';

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
}

export interface CallHistory extends State {
  //
}
