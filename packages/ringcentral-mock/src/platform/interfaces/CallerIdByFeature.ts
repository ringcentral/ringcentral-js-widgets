import { CallerIdByFeatureInfo } from './CallerIdByFeatureInfo';

// Caller ID settings by feature
export interface CallerIdByFeature {
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
  callerId: CallerIdByFeatureInfo;
}
