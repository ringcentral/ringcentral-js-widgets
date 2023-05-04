// Query parameters for operation listExtensionActiveCalls
export interface ListExtensionActiveCallsParameters {
  /**
   * The direction for the result records. If not specified, both inbound and outbound records are returned. Multiple values are accepted
   */
  direction: ('Inbound' | 'Outbound')[];
  /**
   * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
   * Default: Simple
   */
  view: 'Simple' | 'Detailed';
  /**
   * Call type of a record. If not specified, all call types are returned. Multiple values are accepted
   */
  type: ('Voice' | 'Fax')[];
  /**
   * Indicates the page number to retrieve. Only positive number values are allowed
   * Default: 1
   */
  page: number;
  /**
   * Indicates the page size (number of items)
   * Default: 100
   */
  perPage: number;
}
