// Query parameters for operation listChatTasks
export interface ListChatTasksParameters {
  /**
   * The end datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2019-03-10T18:23:45Z
   * Default: now
   */
  creationTimeTo: string;
  /**
   * The start datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2016-02-23T00:00:00
   */
  creationTimeFrom: string;
  /**
   * Internal identifier of a task creator
   */
  creatorId: string[];
  /**
   * Task execution status
   */
  status: ('Pending' | 'InProgress' | 'Completed')[];
  /**
   * Task assignment status
   */
  assignmentStatus: 'Unassigned' | 'Assigned';
  /**
   * Internal identifier of a task assignee
   */
  assigneeId: string[];
  /**
   * Task execution status by assignee(-s) specified in assigneeId
   */
  assigneeStatus: 'Pending' | 'Completed';
  /**
   * Token of the current page. If token is omitted then the first page should be returned
   */
  pageToken: string;
  /**
   * Number of records to be returned per screen
   * Maximum: 250
   * Minimum: 1
   * Default: 30
   */
  recordCount: number;
}
