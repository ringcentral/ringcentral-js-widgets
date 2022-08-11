// Notification payload body
export interface ExtensionListEventBody {
  /**
   * Internal identifier of an extension
   */
  extensionId: string;
  /**
   * Type of extension info change
   */
  eventType: 'Create' | 'Update' | 'Delete';
  /**
   * Internal identifier of a subscription owner extension
   */
  ownerId: string;
}
