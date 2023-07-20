import type { TaskResultRecord } from './TaskResultRecord';

// Task detailed result. Returned for failed and completed tasks
export interface TaskResultInfo {
  /**
   * Detailed task results by elements from initial request
   */
  records: TaskResultRecord[];
}
