import type { UnifiedPresenceGlip } from './UnifiedPresenceGlip';
import type { UnifiedPresenceMeeting } from './UnifiedPresenceMeeting';
import type { UnifiedPresenceTelephony } from './UnifiedPresenceTelephony';

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
