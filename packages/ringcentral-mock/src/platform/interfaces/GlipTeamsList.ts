import type { GlipNavigationInfo } from './GlipNavigationInfo';
import type { GlipTeamInfo } from './GlipTeamInfo';

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
