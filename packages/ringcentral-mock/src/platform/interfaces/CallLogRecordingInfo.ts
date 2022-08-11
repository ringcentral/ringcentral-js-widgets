// Call recording data. Returned if the call is recorded - `withRecording` parameter is set to 'True' in this case
export interface CallLogRecordingInfo {
  /**
   * Internal identifier of the call recording
   */
  id: string;
  /**
   * Link to the call recording metadata resource
   */
  uri: string;
  /**
   * Indicates recording mode used
   */
  type: 'Automatic' | 'OnDemand';
  /**
   * Link to the call recording binary content
   */
  contentUri: string;
}
