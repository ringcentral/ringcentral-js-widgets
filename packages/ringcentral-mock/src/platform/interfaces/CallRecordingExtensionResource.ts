export interface CallRecordingExtensionResource {
  /**
   * Internal identifier of an extension
   */
  id: string;
  /**
   */
  uri: string;
  /**
   */
  extensionNumber: string;
  /**
   */
  type: string;
  /**
   * Direction of call
   */
  callDirection: 'Outbound' | 'Inbound' | 'All';
}
