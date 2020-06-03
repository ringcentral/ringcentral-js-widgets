import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';
import ActivityMatcher from 'ringcentral-integration/modules/ActivityMatcher';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvSubscription } from '../EvSubscription';

export interface State {
  //
}

export interface DepsModules {
  evCallMonitor: EvCallMonitor;
  evSubscription: EvSubscription;
  contactMatcher: ContactMatcher;
  activityMatcher: ActivityMatcher;
}

export interface CallHistory extends State {
  //
}
