// Notification payload body
export interface ExtensionInfoEventBody {
  /**
   * Internal identifier of an extension
   */
  extensionId: string;
  /**
   * Type of extension info change
   */
  eventType: 'Update' | 'Delete';
  /**
   * Returned for 'Update' event type only
   */
  hints: (
    | 'AccountSettings'
    | 'AccountStatus'
    | 'AnsweringRules'
    | 'CompanyNumbers'
    | 'DialingPlan'
    | 'ExtensionInfo'
    | 'Features'
    | 'Limits'
    | 'Permissions'
    | 'ProfileImage'
    | 'VideoConfiguration'
  )[];
  /**
   * Internal identifier of a subscription owner extension
   */
  ownerId: string;
}
