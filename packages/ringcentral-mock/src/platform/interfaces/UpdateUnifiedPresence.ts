import type { UpdateUnifiedPresenceGlip } from './UpdateUnifiedPresenceGlip';
import type { UpdateUnifiedPresenceTelephony } from './UpdateUnifiedPresenceTelephony';

export interface UpdateUnifiedPresence {
  /**
   */
  glip: UpdateUnifiedPresenceGlip;
  /**
   */
  telephony: UpdateUnifiedPresenceTelephony;
}
