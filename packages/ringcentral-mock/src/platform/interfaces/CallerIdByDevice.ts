import type { CallerIdByDeviceInfo } from './CallerIdByDeviceInfo';
import type { CallerIdDeviceInfo } from './CallerIdDeviceInfo';

// Caller ID settings by device
export interface CallerIdByDevice {
  /**
   */
  device: CallerIdDeviceInfo;
  /**
   */
  callerId: CallerIdByDeviceInfo;
}
