export interface ReferenceInfo {
  /**
   * Non-RC identifier of an extension
   */
  ref: string;
  /**
   * Type of external identifier
   */
  type: 'PartnerId' | 'CustomerDirectoryId';
}
