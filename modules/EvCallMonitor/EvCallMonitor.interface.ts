import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';
import ActivityMatcher from 'ringcentral-integration/modules/ActivityMatcher';
import { EvPresence } from '../EvPresence';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvClient } from '../../lib/EvClient';

export interface State {
  //
}

export interface DepsModules {
  presence: EvPresence;
  contactMatcher: ContactMatcher;
  activityMatcher: ActivityMatcher;
  evClient: EvClient;
  evSessionConfig: EvSessionConfig;
}

export interface CallMonitor extends State {
  //
}
