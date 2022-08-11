import { BillingPlanInfo } from './BillingPlanInfo';
import { BrandInfo } from './BrandInfo';
import { ServicePlanInfo } from './ServicePlanInfo';
import { TargetServicePlanInfo } from './TargetServicePlanInfo';
import { ContractedCountryInfo } from './ContractedCountryInfo';

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
