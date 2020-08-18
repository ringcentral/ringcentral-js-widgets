import ActivityMatcher from 'ringcentral-integration/modules/ActivityMatcher';
import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';

import { EvClient } from '../../lib/EvClient';
import { EvAgentScript } from '../EvAgentScript';
import { EvCallHistory } from '../EvCallHistory';
import { EvCallMonitor } from '../EvCallMonitor';

export interface EvCallDispositionItem {
  dispositionId: string;
  notes: string;
}

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
