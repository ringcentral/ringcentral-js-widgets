import type { GlipNoteInfo } from './GlipNoteInfo';
import type { GlipNavigationInfo } from './GlipNavigationInfo';

export interface GlipNotesInfo {
  /**
   */
  records: GlipNoteInfo[];
  /**
   */
  navigation: GlipNavigationInfo;
}
