import { SalesforceEntityType } from 'ringcentral-widgets/components/CallLogPanel';

import {
  EvAddSessionNotification,
  EvBaseCall,
  EvEndedCall,
} from '../lib/EvClient/interfaces';

export type EvCallData = EvBaseCall & {
  contactMatches?: EvContactMatchItem[];
  matchedContacts?: any;
  endedCall?: EvEndedCall;
  session?: EvAddSessionNotification;
  isHold?: boolean;
  agentName?: string;
  /** transform queueDts from time zone date to timeStamp */
  timestamp?: number;
  gate?: EvEvRequeueCallGate;
  ivrString?: string;
  id?: string;
  recordingUrl?: string;
  CALL_UNIQUE_ID__c?: string;
};

export interface EvContactMatchItem {
  id: string;
  type: SalesforceEntityType;
  name: string;
}

export interface EvEvRequeueCallGate {
  gateId: string;
  gateGroupId: string;
}
export interface EvIvrData {
  subject: string;
  body: string;
}
export interface EvAgentScriptData {
  onClick?: () => void;
}
