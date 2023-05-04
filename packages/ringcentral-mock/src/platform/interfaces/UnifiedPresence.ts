import { UnifiedPresenceGlip } from './UnifiedPresenceGlip';
import { UnifiedPresenceTelephony } from './UnifiedPresenceTelephony';
import { UnifiedPresenceMeeting } from './UnifiedPresenceMeeting';

export interface UnifiedPresence {
  /**
   * Aggregated presence status of the user
   */
  status: 'Available' | 'Offline' | 'DND' | 'Busy';
  /**
   */
  glip: UnifiedPresenceGlip;
  /**
   */
  telephony: UnifiedPresenceTelephony;
  /**
   */
  meeting: UnifiedPresenceMeeting;
}
