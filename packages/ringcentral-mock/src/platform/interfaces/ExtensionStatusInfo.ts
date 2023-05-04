// Status information (reason, comment). Returned for 'Disabled' status only
export interface ExtensionStatusInfo {
  /**
   * A free-form user comment, describing the status change reason
   */
  comment: string;
  /**
   * Type of suspension
   */
  reason:
    | 'Voluntarily'
    | 'Involuntarily'
    | 'SuspendedVoluntarily'
    | 'SuspendedVoluntarily2';
}
