// Information on the task for multiple switches update
export interface BulkTaskInfoSwUpdate {
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
