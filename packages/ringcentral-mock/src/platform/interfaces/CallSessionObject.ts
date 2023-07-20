import type { OriginInfo } from './OriginInfo';
import type { CallParty } from './CallParty';

// Call session information
export interface CallSessionObject {
  /**
   * Internal identifier of a call session
   */
  id: string;
  /**
   */
  origin: OriginInfo;
  /**
   * For calls of 'Conference' type only
   */
  voiceCallToken: string;
  /**
   */
  parties: CallParty[];
  /**
   * Date and time of the latest session update represented in Unix time format
   */
  creationTime: string;
}
