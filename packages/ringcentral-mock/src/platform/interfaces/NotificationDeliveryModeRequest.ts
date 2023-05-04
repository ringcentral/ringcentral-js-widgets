// Notification delivery settings
export interface NotificationDeliveryModeRequest {
  /**
   * Notifications transportation provider name
   */
  transportType: 'PubNub' | 'WebHook' | 'RC/APNS' | 'RC/GCM' | 'WebSocket';
  /**
   * Mandatory for 'WebHook' transport type, URL of a consumer service (cannot be changed during subscription update)
   */
  address: string;
  /**
   * Optional parameter. Specifies if the message will be encrypted or not. If request contains any presence event filter the value by default is 'True' (even if specified as 'false'). If request contains only message event filters the value by default is 'False'
   */
  encryption: boolean;
  /**
   * Name of a certificate. Supported for 'RC/APNS' and 'RC/GCM' transport types
   */
  certificateName: string;
  /**
   * Identifier of a registration. Supported for 'RC/APNS' and 'RC/GCM' transport types
   */
  registrationId: string;
  /**
   * Verification key of a subscription ensuring data security. Supported for 'Webhook' transport type
   */
  verificationToken: string;
}
