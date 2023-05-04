import { TaskResultRecordErrorsInfo } from './TaskResultRecordErrorsInfo';

export interface TaskResultRecord {
  /**
   * Internal identifier of the created/updated element - wireless point or network switch
   */
  id: string;
  /**
   * Unique 48-bit identifier of the wireless access point complying with MAC address conventions. Returned only for 'Wireless Points Bulk Create' tasks
   */
  bssid: string;
  /**
   * Unique identifier of a network switch. Returned only for 'Switches Bulk Create' tasks
   */
  chassisId: string;
  /**
   * Operation status
   */
  status: string;
  /**
   */
  errors: TaskResultRecordErrorsInfo[];
}
