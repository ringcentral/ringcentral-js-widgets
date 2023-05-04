import { GlipNoteInfo } from './GlipNoteInfo';
import { GlipNavigationInfo } from './GlipNavigationInfo';

export interface GlipNotesInfo {
  /**
   */
  records: GlipNoteInfo[];
  /**
   */
  navigation: GlipNavigationInfo;
}
