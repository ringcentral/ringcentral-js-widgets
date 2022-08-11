export interface GetCallRecordingResponse {
  /**
   * Internal identifier of a call recording
   */
  id: string;
  /**
   * Link to a call recording binary content
   */
  contentUri: string;
  /**
   * Call recording file format. Supported format is audio/x-wav
   */
  contentType: string;
  /**
   * Recorded call duration
   */
  duration: number;
}
