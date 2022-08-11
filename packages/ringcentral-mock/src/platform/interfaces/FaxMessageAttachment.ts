export interface FaxMessageAttachment {
  /**
   * Internal identifier of a message attachment
   */
  id: string;
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
   * Name of a file attached
   */
  filename: string;
  /**
   * Size of attachment in bytes
   */
  size: number;
}
