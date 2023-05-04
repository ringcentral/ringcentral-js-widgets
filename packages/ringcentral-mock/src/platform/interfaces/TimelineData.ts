import { KeyInfo } from './KeyInfo';
import { TimelineDataPoint } from './TimelineDataPoint';

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
