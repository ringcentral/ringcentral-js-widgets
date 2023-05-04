// Query parameters for operation listDirectoryEntries
export interface ListDirectoryEntriesParameters {
  /**
   * If 'True' then contacts of all accounts in federation are returned. If 'False' then only contacts of the current account are returned, and account section is eliminated in this case
   * Default: true
   */
  showFederated: boolean;
  /**
   * Type of an extension. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
   */
  type:
    | 'User'
    | 'Department'
    | 'Announcement'
    | 'Voicemail'
    | 'SharedLinesGroup'
    | 'PagingOnly'
    | 'IvrMenu'
    | 'ParkLocation'
    | 'Limited';
  /**
   * Page number
   * Default: 1
   */
  page: string;
  /**
   * Records count to be returned per one page. The default value is 1000. Specific keyword values: `all` - all records are returned in one page; `max` - maximum count of records that can be returned in one page
   * Maximum: 2000
   * Default: 1000
   */
  perPage: number;
  /**
   * Internal identifier of the business site to which extensions belong
   */
  siteId: string;
}
