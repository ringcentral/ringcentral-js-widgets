// Query parameters for operation listExtensions
export interface ListExtensionsParameters {
  /**
   * Number of extension to be retrieved
   */
  extensionNumber: string;
  /**
   * Extension email address. Multiple values are accepted
   * Example: alice.smith@example.com&email=bob.johnson@example.com
   */
  email: string;
  /**
   * Indicates the page number to retrieve. Only positive number values are allowed
   * Format: int64
   * Default: 1
   */
  page: number;
  /**
   * Indicates the page size (number of items)
   * Format: int64
   * Default: 100
   */
  perPage: number;
  /**
   * Extension current state. Multiple values are supported. If 'Unassigned' is specified, then extensions without `extensionNumber` attribute are returned. If not specified, then all extensions are returned.
   */
  status: ('Enabled' | 'Disabled' | 'NotActivated' | 'Unassigned')[];
  /**
   * Extension type. Multiple values are supported. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
   */
  type: (
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
    | 'ProxyAdmin'
    | 'DelegatedLinesGroup'
  )[];
}
