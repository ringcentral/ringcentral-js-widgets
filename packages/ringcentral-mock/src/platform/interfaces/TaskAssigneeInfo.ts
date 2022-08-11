export interface TaskAssigneeInfo {
  /**
   * Internal identifier of an assignee
   */
  id: string;
  /**
   * Status of the task execution by assignee
   */
  status: 'Pending' | 'Completed';
}
