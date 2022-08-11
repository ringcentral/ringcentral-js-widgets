// Query parameters for operation readCompanyCallRecord
export interface ReadCompanyCallRecordParameters {
  /**
   * View of call records. The view value specified for 'FSync' will also be applied for 'ISync' by default, since it cannot be changed for ISync
   * Default: Simple
   */
  view: 'Simple' | 'Detailed';
}
