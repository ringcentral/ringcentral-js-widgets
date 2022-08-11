export interface PromptInfo {
  /**
   * Internal identifier of a prompt
   */
  uri: string;
  /**
   * Link to a prompt metadata
   */
  id: string;
  /**
   * Type of a prompt media content
   */
  contentType: string;
  /**
   * Link to a prompt media content
   */
  contentUri: string;
  /**
   * Name of a prompt
   */
  filename: string;
}
