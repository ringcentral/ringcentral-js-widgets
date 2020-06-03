import ContactMatcher from 'ringcentral-integration/modules/ContactMatcher';
import ActivityMatcher from 'ringcentral-integration/modules/ActivityMatcher';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvCallHistory } from '../EvCallHistory';
import { EvClient } from '../../lib/EvClient';

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

export interface DepsModules {
  evCallMonitor: EvCallMonitor;
  evCallHistory: EvCallHistory;
  contactMatcher: ContactMatcher;
  activityMatcher: ActivityMatcher;
  evClient: EvClient;
}

export interface CallDisposition extends State {
  //
}
