export interface EmailRecipientInfo {
  /**
   * Internal identifier of an extension
   */
  extensionId: string;
  /**
   * User full name
   */
  fullName: string;
  /**
   * User extension number
   */
  extensionNumber: string;
  /**
   * Current state of an extension
   */
  status: 'Enabled' | 'Disable' | 'NotActivated' | 'Unassigned';
  /**
   * List of user email addresses from extension notification settings. By default main email address from contact information is returned
   */
  emailAddresses: string[];
  /**
   * Call queue manager permission
   */
  permission: 'FullAccess' | 'Messages' | 'MemberManagement';
}
