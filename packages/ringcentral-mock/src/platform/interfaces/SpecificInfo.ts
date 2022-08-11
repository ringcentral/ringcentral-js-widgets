import { DataExportTaskContactInfo } from './DataExportTaskContactInfo';

// Information specified in request
export interface SpecificInfo {
  /**
   * Starting time for data collection
   */
  timeFrom: string;
  /**
   * Ending time for data collection
   */
  timeTo: string;
  /**
   */
  contacts: DataExportTaskContactInfo[];
  /**
   * List of chats from which the data (posts, files, tasks, events, notes, etc.) will be collected
   */
  chatIds: string[];
}
