// Query parameters for operation readUserCallLog
export interface ReadUserCallLogParameters {
  /**
   * Extension number of a user. If specified, returns call log for a particular extension only
   */
  extensionNumber: string;
  /**
   * If 'True' then calls from/to blocked numbers are returned
   * Default: true
   */
  showBlocked: boolean;
  /**
   * Phone number of a caller/callee in e.164 format without a plus sign '+'. If specified, all incoming and outcoming calls with this phone number are returned
   * Example: 12053320032
   */
  phoneNumber: string;
  /**
   * The direction for the resulting records. If not specified, both inbound and outbound records are returned. Multiple values are accepted
   */
  direction: ('Inbound' | 'Outbound')[];
  /**
   * Internal identifier of a session
   */
  sessionId: string;
  /**
   * Call type of a record. It is allowed to specify more than one type. If not specified, all call types are returned. Multiple values are accepted
   */
  type: ('Voice' | 'Fax')[];
  /**
   * Call transport type. 'PSTN' specifies that a call leg is initiated from the PSTN network provider; 'VoIP' - from an RC phone. By default this filter is disabled
   */
  transport: ('PSTN' | 'VoIP')[];
  /**
   * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
   * Default: Simple
   */
  view: 'Simple' | 'Detailed';
  /**
   * **Deprecated**. Supported for compatibility reasons. `True` if only recorded calls are returned. If both `withRecording` and `recordingType` are specified, then `withRecording` is ignored
   */
  withRecording: boolean;
  /**
   * Type of a call recording. If not specified, then calls without recordings are also returned
   */
  recordingType: 'Automatic' | 'OnDemand' | 'All';
  /**
   * The end datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time
   * Format: date-time
   */
  dateTo: string;
  /**
   * The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours
   * Format: date-time
   */
  dateFrom: string;
  /**
   * Indicates the page number to retrieve. Only positive number values are allowed
   * Default: 1
   */
  page: number;
  /**
   * Indicates the page size (number of items). The default value is 100. The maximum value is 1000, for detailed call log - 250
   * Default: 100
   */
  perPage: number;
  /**
   * If 'True' then deleted calls are returned
   */
  showDeleted: boolean;
}
