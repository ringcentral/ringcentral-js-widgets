// Delivery mode data
export interface NotificationDeliveryMode {
  /**
   * Optional parameter. Specifies if the message will be encrypted or not
   */
  encryption: boolean;
  /**
   * PubNub channel name
   */
  address: string;
  /**
   * PubNub subscriber credentials required to subscribe to the channel
   */
  subscriberKey: string;
  /**
   * PubNub subscriber credentials required to subscribe to the channel. Optional (for PubNub transport type only)
   */
  secretKey: string;
  /**
   * Encryption algorithm 'AES' (for PubNub transport type only)
   */
  encryptionAlgorithm: string;
  /**
   * Key for notification message decryption (for PubNub transport type only)
   */
  encryptionKey: string;
  /**
   * Notifications transportation provider name
   */
  transportType: 'PubNub' | 'WebHook' | 'RC/APNS' | 'RC/GCM';
  /**
   * Name of a certificate. Supported for 'RC/APNS' and 'RC/GCM' transport types
   */
  certificateName: string;
  /**
   * Identifier of a registration. Supported for 'RC/APNS' and 'RC/GCM' transport types
   */
  registrationId: string;
}
