export type CallViewProps = {};

export interface CallViewOptions {
  /**
   * If true, the call view will navigate to the post call view after the call ends.
   *
   * @default true
   */
  showPostCallView?: boolean;
  /**
   * If true, the call log form will be expanded when new call come in by default.
   *
   * @default true
   */
  defaultCallLogFormExpanded?: boolean;

  /**
   * If true, the smart notes feature will be enabled for the brand.
   *
   */
  brandAllowsSmartNotes?: boolean;
}
