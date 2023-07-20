import type { CallerIdDeviceInfo } from './CallerIdDeviceInfo';
import type { CallerIdByDeviceInfo } from './CallerIdByDeviceInfo';

// Caller ID settings by device
export interface CallerIdByDevice {
  /**
   */
  device: CallerIdDeviceInfo;
  /**
   */
  callerId: CallerIdByDeviceInfo;
}
