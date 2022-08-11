import { CallMonitoringExtensionInfo } from './CallMonitoringExtensionInfo';

export interface CallMonitoringBulkAssign {
  /**
   */
  addedExtensions: CallMonitoringExtensionInfo[];
  /**
   */
  updatedExtensions: CallMonitoringExtensionInfo[];
  /**
   */
  removedExtensions: CallMonitoringExtensionInfo[];
}
