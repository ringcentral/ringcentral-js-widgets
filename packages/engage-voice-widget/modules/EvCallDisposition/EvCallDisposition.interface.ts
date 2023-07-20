import type { ActivityMatcher } from '@ringcentral-integration/commons/modules/ActivityMatcher';
import type { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';

import type { EvCallDispositionItem, EvClient } from '../../lib/EvClient';
import type { EvAgentScript } from '../EvAgentScript';
import type { EvCallHistory } from '../EvCallHistory';
import type { EvCallMonitor } from '../EvCallMonitor';

export interface EvCallDispositionMapping {
  [callId: string]: EvCallDispositionItem;
}

interface EvDispositionStateItem {
  disposed: boolean;
}

export interface EvDispositionStateMapping {
  [callId: string]: EvDispositionStateItem;
}

export interface State {
  callsMapping: EvCallDispositionMapping;
  dispositionStateMapping: EvDispositionStateMapping;
}

export interface EvCallDispositionOptions {
  //
}

export interface Deps {
  evCallMonitor: EvCallMonitor;
  evCallHistory: EvCallHistory;
  contactMatcher: ContactMatcher;
  activityMatcher: ActivityMatcher;
  evAgentScript: EvAgentScript;
  evClient: EvClient;
  evCallDispositionOptions?: EvCallDispositionOptions;
}

export interface CallDisposition extends State {
  //
}
