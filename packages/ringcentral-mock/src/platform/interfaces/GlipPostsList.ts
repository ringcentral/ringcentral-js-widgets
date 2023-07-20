import type { GlipPostInfo } from './GlipPostInfo';
import type { GlipNavigationInfo } from './GlipNavigationInfo';

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
