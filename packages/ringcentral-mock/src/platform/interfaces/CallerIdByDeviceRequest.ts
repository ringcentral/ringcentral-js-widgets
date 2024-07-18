import type { CallerIdByDeviceInfoRequest } from './CallerIdByDeviceInfoRequest';
import type { CallerIdDeviceInfoRequest } from './CallerIdDeviceInfoRequest';

// Caller ID settings by device
export interface CallerIdByDeviceRequest {
  /**
   */
  device: CallerIdDeviceInfoRequest;
  /**
   */
  callerId: CallerIdByDeviceInfoRequest;
}
