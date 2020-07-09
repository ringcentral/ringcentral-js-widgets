import ActivityMatcher from 'ringcentral-integration/modules/ActivityMatcher';
import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';
import { Beforeunload } from 'ringcentral-widgets/modules/Beforeunload';

import { EvClient } from '../../lib/EvClient';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvPresence } from '../EvPresence';
import { EvSessionConfig } from '../EvSessionConfig';

export interface State {
  //
}

export interface DepsModules {
  presence: EvPresence;
  contactMatcher: ContactMatcher;
  activityMatcher: ActivityMatcher;
  evClient: EvClient;
  evSessionConfig: EvSessionConfig;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  beforeunload: Beforeunload;
}

export interface CallMonitor extends State {
  //
}
