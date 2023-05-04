// For 'Connect' or 'Voicemail' actions only. Extension reference
export interface IVRMenuExtensionInfo {
  /**
   * Link to an extension resource
   */
  uri: string;
  /**
   * Internal identifier of an extension
   */
  id: string;
  /**
   * Name of an extension
   */
  name: string;
}
