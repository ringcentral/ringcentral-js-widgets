import { GlipPostInfo } from './GlipPostInfo';
import { GlipNavigationInfo } from './GlipNavigationInfo';

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
