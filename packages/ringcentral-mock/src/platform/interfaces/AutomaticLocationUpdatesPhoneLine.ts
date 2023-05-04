import { AutomaticLocationUpdatesPhoneNumberInfo } from './AutomaticLocationUpdatesPhoneNumberInfo';

export interface AutomaticLocationUpdatesPhoneLine {
  /**
   */
  lineType:
    | 'Unknown'
    | 'Standalone'
    | 'StandaloneFree'
    | 'BlaPrimary'
    | 'BlaSecondary'
    | 'BLF';
  /**
   */
  phoneInfo: AutomaticLocationUpdatesPhoneNumberInfo;
}
