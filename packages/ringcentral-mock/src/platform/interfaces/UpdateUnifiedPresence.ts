import { UpdateUnifiedPresenceGlip } from './UpdateUnifiedPresenceGlip';
import { UpdateUnifiedPresenceTelephony } from './UpdateUnifiedPresenceTelephony';

export interface UpdateUnifiedPresence {
  /**
   */
  glip: UpdateUnifiedPresenceGlip;
  /**
   */
  telephony: UpdateUnifiedPresenceTelephony;
}
