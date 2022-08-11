// Billing information related to the call. Returned for 'Detailed' view only
export interface BillingInfo {
  /**
   * Cost per minute, paid and already included in your RingCentral Plan. For example International Calls
   */
  costIncluded: number;
  /**
   * Cost per minute, paid and not included in your RingCentral Plan
   */
  costPurchased: number;
}
