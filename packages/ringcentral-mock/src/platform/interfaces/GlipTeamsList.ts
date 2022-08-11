import { GlipTeamInfo } from './GlipTeamInfo';
import { GlipNavigationInfo } from './GlipNavigationInfo';

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
