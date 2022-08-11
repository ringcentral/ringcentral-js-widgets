// Information on the task for multiple wireless points update
export interface BulkTaskInfoWiUpdate {
  /**
   * Internal identifier of a task for multiple switches creation
   */
  id: string;
  /**
   * Status of a task
   */
  status: 'Accepted' | 'Failed';
  /**
   * Task creation time
   */
  creationTime: string;
  /**
   * Time of the task latest modification
   */
  lastModifiedTime: string;
}
