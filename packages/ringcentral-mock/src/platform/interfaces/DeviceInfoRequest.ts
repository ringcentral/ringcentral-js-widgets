// Device information
export interface DeviceInfoRequest {
  /**
   * Device unique identifier, retrieved at previous session (if any)
   */
  id: string;
  /**
   * Supported for iOS devices only. Certificate name (used by iOS applications for APNS subscription)
   */
  appExternalId: string;
  /**
   * Supported for SoftPhone only. Computer name
   */
  computerName: string;
  /**
   * Serial number for HardPhone; `endpoint_id` for softphone and mobile applications. Returned only when the phone is shipped and provisioned
   */
  serial: string;
}
