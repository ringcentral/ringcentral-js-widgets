import type { CallerIdDeviceInfoRequest } from './CallerIdDeviceInfoRequest';
import type { CallerIdByDeviceInfoRequest } from './CallerIdByDeviceInfoRequest';

// Caller ID settings by device
export interface CallerIdByDeviceRequest {
  /**
   */
  device: CallerIdDeviceInfoRequest;
  /**
   */
  callerId: CallerIdByDeviceInfoRequest;
}
