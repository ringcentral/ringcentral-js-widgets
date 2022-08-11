export interface TaskAttachment {
  /**
   * Internal identifier of a file
   */
  id: string;
  /**
   * Attachment type (currently only `File` value is supported).
   */
  type: 'File';
  /**
   * Name of the attached file (including extension name).
   */
  name: string;
  /**
   * Link to an attachment content
   */
  contentUri: string;
}
