import type { PhoneNumberCountryInfo } from './PhoneNumberCountryInfo';
import type { DeviceProvisioningExtensionInfo } from './DeviceProvisioningExtensionInfo';

// Phone number information
export interface PhoneNumberInfoIntId {
  /**
   * Internal identifier of a phone number
   * Format: int64
   */
  id: number;
  /**
   */
  country: PhoneNumberCountryInfo;
  /**
   */
  extension: DeviceProvisioningExtensionInfo;
  /**
   * Custom user name of a phone number, if any
   */
  label: string;
  /**
   * Location (City, State). Filled for local US numbers
   */
  location: string;
  /**
   * Payment type. 'External' is returned for forwarded numbers which are not terminated in the RingCentral phone system
   */
  paymentType: 'External' | 'TollFree' | 'Local';
  /**
   * Phone number
   */
  phoneNumber: string;
  /**
   * Status of a phone number. If the value is 'Normal', the phone number is ready to be used. Otherwise it is an external number not yet ported to RingCentral
   */
  status: string;
  /**
   * Phone number type
   */
  type: 'VoiceFax' | 'FaxOnly' | 'VoiceOnly';
  /**
   * Usage type of the phone number
   */
  usageType:
    | 'MainCompanyNumber'
    | 'AdditionalCompanyNumber'
    | 'CompanyNumber'
    | 'DirectNumber'
    | 'CompanyFaxNumber'
    | 'ForwardedNumber'
    | 'ForwardedCompanyNumber'
    | 'ContactCenterNumber';
}
