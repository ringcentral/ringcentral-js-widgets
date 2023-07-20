import type { OriginInfo } from './OriginInfo';
import type { TelephonySessionsEventPartyInfo } from './TelephonySessionsEventPartyInfo';

// Notification payload body
export interface TelephonySessionsEventBody {
  /**
   * Order number of a notification to state the chronology
   */
  sequence: number;
  /**
   * Legacy identifier of a call session
   */
  sessionId: string;
  /**
   * Call session identifier, required for Telephony API
   */
  telephonySessionId: string;
  /**
   * Identifier of a server
   */
  serverId: string;
  /**
   * The call start datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z*
   */
  eventTime: string;
  /**
   */
  origin: OriginInfo;
  /**
   * Call participants details
   */
  parties: TelephonySessionsEventPartyInfo[];
}
