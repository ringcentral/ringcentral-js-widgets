export interface UserVideoConfiguration {
  /**
   * Video provider of the user
   */
  provider: 'RCMeetings' | 'RCVideo' | 'None';
  /**
   * Specifies if the user is 'paid' (has meeting license) or 'free' (w/o meeting license)
   */
  userLicenseType: 'Paid' | 'Free';
}
