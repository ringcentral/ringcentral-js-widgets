import { CallerIdDeviceInfoRequest } from './CallerIdDeviceInfoRequest';
import { CallerIdByDeviceInfoRequest } from './CallerIdByDeviceInfoRequest';

// Caller ID settings by device
export interface CallerIdByDeviceRequest {
  /**
   */
  device: CallerIdDeviceInfoRequest;
  /**
   */
  callerId: CallerIdByDeviceInfoRequest;
}
