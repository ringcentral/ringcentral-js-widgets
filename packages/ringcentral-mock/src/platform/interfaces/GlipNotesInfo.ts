import type { GlipNavigationInfo } from './GlipNavigationInfo';
import type { GlipNoteInfo } from './GlipNoteInfo';

export interface GlipNotesInfo {
  /**
   */
  records: GlipNoteInfo[];
  /**
   */
  navigation: GlipNavigationInfo;
}
