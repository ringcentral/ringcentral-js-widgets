import { AssigneeInfo } from './AssigneeInfo';

export interface GlipCompleteTask {
  /**
   * Completeness status. 'Mandatory' if `completenessCondition` is set to `Simple`, otherwise 'Optional'
   */
  status: 'Incomplete' | 'Complete';
  /**
   */
  assignees: AssigneeInfo[];
  /**
   * Current completeness percentage of a task with the 'Percentage' completeness condition. 'Mandatory' if `completenessCondition` is set to `Percentage`, otherwise 'Optional'
   * Maximum: 100
   */
  completenessPercentage: number;
}
