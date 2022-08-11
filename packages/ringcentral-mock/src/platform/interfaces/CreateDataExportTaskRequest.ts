import { DataExportTaskContactInfo } from './DataExportTaskContactInfo';

export interface CreateDataExportTaskRequest {
  /**
   * Starting time for data collection. The default value is `timeTo` minus 24 hours. Max allowed time frame between `timeFrom` and `timeTo` is 6 months
   */
  timeFrom: string;
  /**
   * Ending time for data collection. The default value is current time. Max allowed time frame between `timeFrom` and `timeTo` is 6 months
   */
  timeTo: string;
  /**
   */
  contacts: DataExportTaskContactInfo[];
  /**
   * List of chats from which the data (posts, files, tasks, events, notes, etc.) will be collected. Maximum number of chats supported is 10
   */
  chatIds: string[];
}
