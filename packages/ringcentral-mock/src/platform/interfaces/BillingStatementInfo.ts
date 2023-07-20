import type { BillingStatementCharges } from './BillingStatementCharges';
import type { BillingStatementFees } from './BillingStatementFees';

// Billing information. Returned for device update request if `prestatement` query parameter is set to 'true'
export interface BillingStatementInfo {
  /**
   * Currency code complying with [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) standard
   */
  currency: string;
  /**
   */
  charges: BillingStatementCharges[];
  /**
   */
  fees: BillingStatementFees[];
  /**
   */
  totalCharged: number;
  /**
   */
  totalCharges: number;
  /**
   */
  totalFees: number;
  /**
   */
  subtotal: number;
  /**
   */
  totalFreeServiceCredit: number;
}
