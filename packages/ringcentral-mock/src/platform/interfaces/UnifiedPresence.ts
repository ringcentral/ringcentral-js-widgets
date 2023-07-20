import type { UnifiedPresenceGlip } from './UnifiedPresenceGlip';
import type { UnifiedPresenceTelephony } from './UnifiedPresenceTelephony';
import type { UnifiedPresenceMeeting } from './UnifiedPresenceMeeting';

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
