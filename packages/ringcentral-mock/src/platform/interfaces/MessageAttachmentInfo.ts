export interface MessageAttachmentInfo {
  /**
   * Internal identifier of a message attachment
   * Format: int64
   */
  id: number;
  /**
   * Canonical URI of a message attachment
   */
  uri: string;
  /**
   * Type of message attachment
   */
  type:
    | 'AudioRecording'
    | 'AudioTranscription'
    | 'Text'
    | 'SourceDocument'
    | 'RenderedDocument'
    | 'MmsAttachment';
  /**
   * MIME type for a given attachment, for instance 'audio/wav'
   */
  contentType: string;
  /**
   * Supported for `Voicemail` only. Duration of a voicemail in seconds
   */
  vmDuration: number;
  /**
   * Name of a file attached
   */
  fileName: string;
  /**
   * Size of attachment in bytes
   */
  size: number;
  /**
   * Attachment height in pixels if available
   */
  height: number;
  /**
   * Attachment width in pixels if available
   */
  width: number;
}
