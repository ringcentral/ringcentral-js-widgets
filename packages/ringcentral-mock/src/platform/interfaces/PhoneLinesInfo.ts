import type { PhoneNumberInfoIntId } from './PhoneNumberInfoIntId';
import type { EmergencyAddress } from './EmergencyAddress';

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
