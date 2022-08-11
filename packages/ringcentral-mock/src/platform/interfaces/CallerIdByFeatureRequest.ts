import { CallerIdByFeatureInfoRequest } from './CallerIdByFeatureInfoRequest';

// Caller ID settings by feature
export interface CallerIdByFeatureRequest {
  /**
   */
  feature:
    | 'RingOut'
    | 'RingMe'
    | 'CallFlip'
    | 'FaxNumber'
    | 'AdditionalSoftphone'
    | 'Alternate'
    | 'CommonPhone'
    | 'MobileApp'
    | 'Delegated';
  /**
   */
  callerId: CallerIdByFeatureInfoRequest;
}
