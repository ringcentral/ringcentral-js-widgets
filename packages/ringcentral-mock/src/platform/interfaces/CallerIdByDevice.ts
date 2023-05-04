import { CallerIdDeviceInfo } from './CallerIdDeviceInfo';
import { CallerIdByDeviceInfo } from './CallerIdByDeviceInfo';

// Caller ID settings by device
export interface CallerIdByDevice {
  /**
   */
  device: CallerIdDeviceInfo;
  /**
   */
  callerId: CallerIdByDeviceInfo;
}
