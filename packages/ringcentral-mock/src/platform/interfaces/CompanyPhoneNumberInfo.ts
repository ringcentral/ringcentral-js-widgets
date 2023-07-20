import type { CountryInfo } from './CountryInfo';
import type { ExtensionInfo } from './ExtensionInfo';
import type { TemporaryNumberInfo } from './TemporaryNumberInfo';
import type { ContactCenterProvider } from './ContactCenterProvider';

export interface CompanyPhoneNumberInfo {
  /**
   * Link to a company phone number resource
   */
  uri: string;
  /**
   * Internal identifier of a phone number
   * Format: int64
   */
  id: number;
  /**
   */
  country: CountryInfo;
  /**
   */
  extension: ExtensionInfo;
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
  paymentType:
    | 'External'
    | 'TollFree'
    | 'Local'
    | 'BusinessMobileNumberProvider'
    | 'ExternalNumberProvider';
  /**
   * Phone number
   */
  phoneNumber: string;
  /**
   * Status of a phone number. If the value is 'Normal', the phone number is ready to be used. If the value is 'Pending' it is an external number not yet ported to RingCentral.
   */
  status: 'Normal' | 'Pending' | 'PortedIn' | 'Temporary';
  /**
   * Phone number type
   */
  type: 'VoiceFax' | 'FaxOnly' | 'VoiceOnly';
  /**
   * Usage type of a phone number. Usage type of a phone number. Numbers of 'NumberPool' type wont't be returned for phone number list requests
   */
  usageType:
    | 'MainCompanyNumber'
    | 'AdditionalCompanyNumber'
    | 'CompanyNumber'
    | 'DirectNumber'
    | 'CompanyFaxNumber'
    | 'ForwardedNumber'
    | 'ForwardedCompanyNumber'
    | 'ContactCenterNumber'
    | 'ConferencingNumber'
    | 'MeetingsNumber'
    | 'NumberPool'
    | 'BusinessMobileNumber'
    | 'IntegrationNumber';
  /**
   */
  temporaryNumber: TemporaryNumberInfo;
  /**
   */
  contactCenterProvider: ContactCenterProvider;
  /**
   * Vanity pattern for this number. Returned only when vanity search option is requested. Vanity pattern corresponds to request parameters nxx plus line or numberPattern
   */
  vanityPattern: string;
}
