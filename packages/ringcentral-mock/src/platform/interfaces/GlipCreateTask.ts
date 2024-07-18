import type { AssigneeInfo } from './AssigneeInfo';
import type { GlipAttachmentInfoRequest } from './GlipAttachmentInfoRequest';
import type { GlipTaskRecurrenceInfo } from './GlipTaskRecurrenceInfo';

export interface GlipCreateTask {
  /**
   * Task name/subject. Max allowed length is 250 characters.
   * Required
   */
  subject: string;
  /**
   * Required
   */
  assignees: AssigneeInfo[];
  /**
   * Default: Simple
   */
  completenessCondition: 'Simple' | 'AllAssignees' | 'Percentage';
  /**
   * Task start date in UTC time zone.
   * Format: date-time
   */
  startDate: string;
  /**
   * Task due date/time in UTC time zone.
   * Format: date-time
   */
  dueDate: string;
  /**
   * Default: Black
   */
  color:
    | 'Black'
    | 'Red'
    | 'Orange'
    | 'Yellow'
    | 'Green'
    | 'Blue'
    | 'Purple'
    | 'Magenta';
  /**
   * Task section to group / search by. Max allowed length is 100 characters.
   */
  section: string;
  /**
   * Task details. Max allowed length is 102400 characters (100kB).
   */
  description: string;
  /**
   */
  recurrence: GlipTaskRecurrenceInfo;
  /**
   */
  attachments: GlipAttachmentInfoRequest[];
}
