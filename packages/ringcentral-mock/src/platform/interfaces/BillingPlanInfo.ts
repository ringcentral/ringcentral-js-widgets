// Information on account billing plan
export interface BillingPlanInfo {
  /**
   * Internal identifier of a billing plan
   */
  id: string;
  /**
   * Billing plan name
   */
  name: string;
  /**
   * Duration period
   */
  durationUnit: 'Day' | 'Month' | 'Year';
  /**
   * Number of duration units
   */
  duration: number;
  /**
   * Billing plan type
   */
  type: 'Initial' | 'Regular' | 'Suspended' | 'Trial' | 'TrialNoCC' | 'Free';
  /**
   * Included digital lines count
   */
  includedPhoneLines: number;
}
