import type { EmergencyAddress } from './EmergencyAddress';
import type { PhoneNumberInfoIntId } from './PhoneNumberInfoIntId';

export interface PhoneLinesInfo {
  /**
   * Internal identifier of a phone line
   */
  id: string;
  /**
   * Type of phone line
   */
  lineType: 'Standalone' | 'StandaloneFree' | 'BlaPrimary' | 'BlaSecondary';
  /**
   */
  phoneInfo: PhoneNumberInfoIntId;
  /**
   */
  emergencyAddress: EmergencyAddress;
}
