import type { GlipNavigationInfo } from './GlipNavigationInfo';
import type { GlipPostInfo } from './GlipPostInfo';

export interface GlipPostsList {
  /**
   * List of posts
   * Required
   */
  records: GlipPostInfo[];
  /**
   */
  navigation: GlipNavigationInfo;
}
