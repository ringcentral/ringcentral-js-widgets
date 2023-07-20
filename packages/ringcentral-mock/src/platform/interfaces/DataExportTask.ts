import type { CreatorInfo } from './CreatorInfo';
import type { SpecificInfo } from './SpecificInfo';
import type { ExportTaskResultInfo } from './ExportTaskResultInfo';

export interface DataExportTask {
  /**
   * Canonical URI of a task
   */
  uri: string;
  /**
   * Internal identifier of a task
   */
  id: string;
  /**
   * Task creation datetime
   */
  creationTime: string;
  /**
   * Task last modification datetime
   */
  lastModifiedTime: string;
  /**
   * Task status
   */
  status: 'Accepted' | 'InProgress' | 'Completed' | 'Failed' | 'Expired';
  /**
   */
  creator: CreatorInfo;
  /**
   */
  specific: SpecificInfo;
  /**
   * Data collection sets. Returned by task ID
   */
  datasets: ExportTaskResultInfo[];
}
