import type { GlipTeamInfo } from './GlipTeamInfo';
import type { GlipNavigationInfo } from './GlipNavigationInfo';

export interface GlipTeamsList {
  /**
   * List of teams
   * Required
   */
  records: GlipTeamInfo[];
  /**
   */
  navigation: GlipNavigationInfo;
}
