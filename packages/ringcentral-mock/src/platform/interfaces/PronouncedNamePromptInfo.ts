export interface PronouncedNamePromptInfo {
  /**
   */
  id: string;
  /**
   * Link to a prompt resource
   */
  contentUri: string;
  /**
   * Content media type
   */
  contentType: 'audio/mpeg' | 'audio/wav';
}
