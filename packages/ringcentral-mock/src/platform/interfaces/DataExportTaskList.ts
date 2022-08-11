import { DataExportTask } from './DataExportTask';
import { GlipDataExportNavigationInfo } from './GlipDataExportNavigationInfo';
import { GlipDataExportPagingInfo } from './GlipDataExportPagingInfo';

export interface DataExportTaskList {
  /**
   */
  tasks: DataExportTask[];
  /**
   */
  navigation: GlipDataExportNavigationInfo;
  /**
   */
  paging: GlipDataExportPagingInfo;
}
