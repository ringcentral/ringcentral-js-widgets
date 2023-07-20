import type { BillingPlanInfo } from './BillingPlanInfo';
import type { BrandInfo } from './BrandInfo';
import type { ServicePlanInfo } from './ServicePlanInfo';
import type { TargetServicePlanInfo } from './TargetServicePlanInfo';
import type { ContractedCountryInfo } from './ContractedCountryInfo';

// Account service information, including brand, service plan and billing plan
export interface ServiceInfo {
  /**
   * Canonical URI of a service info resource
   */
  uri: string;
  /**
   */
  billingPlan: BillingPlanInfo;
  /**
   */
  brand: BrandInfo;
  /**
   */
  servicePlan: ServicePlanInfo;
  /**
   */
  targetServicePlan: TargetServicePlanInfo;
  /**
   */
  contractedCountry: ContractedCountryInfo;
}
