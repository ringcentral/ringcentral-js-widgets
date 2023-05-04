import { GCMData } from './GCMData';

// GCM data
export interface GCMInfo {
  /**
   * Notification priority, if the value is 'high' then notification is turned on even if the application is in background
   */
  priority: 'high' | 'normal';
  /**
   * Notification lifetime value in seconds, the default value is 30 seconds
   */
  time_to_live: number;
  /**
   */
  data: GCMData;
}
