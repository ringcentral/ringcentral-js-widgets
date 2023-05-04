// Query parameters for operation listExtensionGrants
export interface ListExtensionGrantsParameters {
  /**
   * Type of extension to be returned. Multiple values are supported. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
   */
  extensionType:
    | 'User'
    | 'FaxUser'
    | 'VirtualUser'
    | 'DigitalUser'
    | 'Department'
    | 'Announcement'
    | 'Voicemail'
    | 'SharedLinesGroup'
    | 'PagingOnly'
    | 'IvrMenu'
    | 'ApplicationExtension'
    | 'ParkLocation'
    | 'Limited'
    | 'Bot'
    | 'Room';
  /**
   * Default: 1
   */
  page: string;
  /**
   * Default: 100
   */
  perPage: string;
}
