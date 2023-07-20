import type { KeyInfo } from './KeyInfo';
import type { TimelineDataPoint } from './TimelineDataPoint';

export interface TimelineData {
  /**
   * Required
   */
  key: string;
  /**
   */
  keyInfo: KeyInfo;
  /**
   */
  points: TimelineDataPoint[];
}
