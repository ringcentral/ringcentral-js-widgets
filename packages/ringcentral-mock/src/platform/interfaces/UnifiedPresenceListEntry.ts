import { UnifiedPresence } from './UnifiedPresence';

export interface UnifiedPresenceListEntry {
  /**
   * Internal identifier of the resource
   */
  resourceId: string;
  /**
   * Status code of resource retrieval
   */
  status: number;
  /**
   */
  body: UnifiedPresence;
}
