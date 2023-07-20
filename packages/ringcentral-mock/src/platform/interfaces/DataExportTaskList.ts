import type { DataExportTask } from './DataExportTask';
import type { GlipDataExportNavigationInfo } from './GlipDataExportNavigationInfo';
import type { GlipDataExportPagingInfo } from './GlipDataExportPagingInfo';

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
