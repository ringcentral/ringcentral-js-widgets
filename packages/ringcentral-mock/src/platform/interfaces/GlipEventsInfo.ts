import type { GlipEventInfo } from './GlipEventInfo';
import type { GlipNavigationInfo } from './GlipNavigationInfo';

export interface GlipEventsInfo {
  /**
   * List of events created by the current user
   */
  records: GlipEventInfo[];
  /**
   */
  navigation: GlipNavigationInfo;
}
