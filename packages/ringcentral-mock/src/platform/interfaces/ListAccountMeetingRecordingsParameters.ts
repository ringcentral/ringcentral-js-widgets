// Query parameters for operation listAccountMeetingRecordings
export interface ListAccountMeetingRecordingsParameters {
  /**
   * Internal identifier of a meeting. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
   */
  meetingId: string;
  /**
   * Recordings of meetings started after the time specified will be returned. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
   */
  meetingStartTimeFrom: string;
  /**
   * Recordings of meetings started before the time specified will be returned. The default value is current time. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
   */
  meetingStartTimeTo: string;
  /**
   * Page number
   */
  page: number;
  /**
   * Number of items per page. The `max` value is supported to indicate the maximum size - 300
   * Maximum: 300
   * Default: 100
   */
  perPage: number;
}
