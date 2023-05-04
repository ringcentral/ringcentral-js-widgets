import { GlipCreatorInfo } from './GlipCreatorInfo';
import { LastModifiedByInfo } from './LastModifiedByInfo';
import { LockedByInfo } from './LockedByInfo';

export interface GetGlipNoteInfo {
  /**
   * Internal identifier of a note
   */
  id: string;
  /**
   * Title of a note
   */
  title: string;
  /**
   * Internal identifiers of the chat(s) where the note is posted or shared.
   */
  chatIds: string[];
  /**
   * Preview of a note (first 150 characters of a body)
   */
  preview: string;
  /**
   * Text of a note
   */
  body: string;
  /**
   */
  creator: GlipCreatorInfo;
  /**
   */
  lastModifiedBy: LastModifiedByInfo;
  /**
   */
  lockedBy: LockedByInfo;
  /**
   * Note publishing status. Any note is created in 'Draft' status. After it is posted it becomes 'Active'
   */
  status: 'Active' | 'Draft';
  /**
   * Creation time
   */
  creationTime: string;
  /**
   * Datetime of the note last update
   */
  lastModifiedTime: string;
  /**
   */
  type: 'Note';
}
