import type { DeviceEmergencyInfo } from './DeviceEmergencyInfo';
import type { DeviceSiteInfo } from './DeviceSiteInfo';
import type { EmergencyServiceAddressResource } from './EmergencyServiceAddressResource';
import type { ExtensionInfoIntId } from './ExtensionInfoIntId';
import type { ModelInfo } from './ModelInfo';
import type { PhoneLinesInfo } from './PhoneLinesInfo';
import type { ShippingInfo } from './ShippingInfo';

export interface ExtensionDeviceResponse {
  /**
   * Internal identifier of a device
   */
  id: string;
  /**
   * Canonical URI of a device
   */
  uri: string;
  /**
   * Device identification number (stock keeping unit) in the format TP-ID [-AT-AC], where TP is device type (HP for RC HardPhone, DV for all other devices including softphone); ID - device model ID; AT -addon type ID; AC - addon count (if any). For example 'HP-56-2-2'
   */
  sku: string;
  /**
   * Device type
   * Default: HardPhone
   */
  type: 'Room' | 'SoftPhone' | 'OtherPhone' | 'HardPhone' | 'Paging';
  /**
   * Device name. Mandatory if ordering  SoftPhone  or  OtherPhone. Optional for  HardPhone. If not specified for HardPhone, then device model name is used as device name
   */
  name: string;
  /**
   * Device status
   */
  status: 'Offline' | 'Online';
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
  model: ModelInfo;
  /**
   */
  extension: ExtensionInfoIntId;
  /**
   */
  emergencyServiceAddress: EmergencyServiceAddressResource;
  /**
   */
  emergency: DeviceEmergencyInfo;
  /**
   * Phone lines information
   */
  phoneLines: PhoneLinesInfo[];
  /**
   */
  shipping: ShippingInfo;
  /**
   * Box billing identifier of a device. Applicable only for HardPhones. It is an alternative way to identify the device to be ordered. Either model  structure, or  boxBillingId  must be specified for HardPhone
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
