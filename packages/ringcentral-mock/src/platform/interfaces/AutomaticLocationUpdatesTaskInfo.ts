import type { TaskResultInfo } from './TaskResultInfo';

export interface AutomaticLocationUpdatesTaskInfo {
  /**
   * Internal identifier of a task
   */
  id: string;
  /**
   * Status of a task
   */
  status: 'Accepted' | 'InProgress' | 'Completed' | 'Failed';
  /**
   * Task creation time
   */
  creationTime: string;
  /**
   * Time of the task latest modification
   */
  lastModifiedTime: string;
  /**
   * Type of a task
   */
  type:
    | 'WirelessPointsBulkCreate'
    | 'WirelessPointsBulkUpdate'
    | 'SwitchesBulkCreate'
    | 'SwitchesBulkUpdate';
  /**
   */
  result: TaskResultInfo;
}
