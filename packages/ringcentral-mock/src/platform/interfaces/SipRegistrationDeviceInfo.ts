import type { DeviceModelInfo } from './DeviceModelInfo';
import type { DeviceExtensionInfo } from './DeviceExtensionInfo';
import type { DeviceEmergencyServiceAddressResource } from './DeviceEmergencyServiceAddressResource';
import type { SipRegistrationDeviceEmergencyInfo } from './SipRegistrationDeviceEmergencyInfo';
import type { Shipping } from './Shipping';
import type { DevicePhoneLinesInfo } from './DevicePhoneLinesInfo';
import type { DeviceSiteInfo } from './DeviceSiteInfo';

export interface SipRegistrationDeviceInfo {
  /**
   * Link to a device resource
   */
  uri: string;
  /**
   * Internal identifier of a Device
   */
  id: string;
  /**
   * Device type
   */
  type:
    | 'HardPhone'
    | 'SoftPhone'
    | 'OtherPhone'
    | 'Paging'
    | 'WebPhone'
    | 'Room';
  /**
   * Device identification number (stock keeping unit) in the format TP-ID [-AT-AC], where TP is device type (HP for RC HardPhone, DV for all other devices including softphone); ID - device model ID; AT -addon type ID; AC - addon count (if any). For example 'HP-56-2-2'
   */
  sku: string;
  /**
   */
  status: 'Online' | 'Offline';
  /**
   * Device name. Mandatory if ordering  SoftPhone or OtherPhone. Optional for  HardPhone. If not specified for HardPhone, then device  model  name is used as device  name
   */
  name: string;
  /**
   * Serial number for HardPhone (is returned only when the phone is shipped and provisioned); endpoint_id for softphone and mobile applications
   */
  serial: string;
  /**
   * PC name for softphone
   */
  computerName: string;
  /**
   */
  model: DeviceModelInfo;
  /**
   */
  extension: DeviceExtensionInfo;
  /**
   */
  emergencyServiceAddress: DeviceEmergencyServiceAddressResource;
  /**
   */
  emergency: SipRegistrationDeviceEmergencyInfo;
  /**
   */
  shipping: Shipping;
  /**
   * Phone lines information
   */
  phoneLines: DevicePhoneLinesInfo[];
  /**
   * Box billing identifier of a device. Applicable only for HardPhones. It is an alternative way to identify the device to be ordered. EitherT? model  structure, or  boxBillingId  must be specified forT?HardPhone
   * Format: int64
   */
  boxBillingId: number;
  /**
   * Supported only for devices assigned to Limited extensions. If true, enables users to log in to this phone as a common phone.
   */
  useAsCommonPhone: boolean;
  /**
   * Pooling type of a deviceHost - device with standalone paid phone line which can be linked to Glip/Softphone instanceGuest - device with a linked phone lineNone - device without a phone line or with specific line (free, BLA, etc.) = ['Host', 'Guest', 'None']
   */
  linePooling: 'Host' | 'Guest' | 'None';
  /**
   * Network location status. 'True' if the device is located in the configured corporate network (On-Net); 'False' for Off-Net location. Parameter is not returned if `EmergencyAddressAutoUpdate` feature is not enabled for the account/user, or if device network location is not determined
   */
  inCompanyNet: boolean;
  /**
   */
  site: DeviceSiteInfo;
  /**
   * Datetime of receiving last location report in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z
   */
  lastLocationReportTime: string;
}
