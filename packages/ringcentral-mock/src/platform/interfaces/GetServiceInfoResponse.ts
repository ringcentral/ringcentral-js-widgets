import type { BrandInfo } from './BrandInfo';
import type { ContractedCountryInfo } from './ContractedCountryInfo';
import type { ServicePlanInfo } from './ServicePlanInfo';
import type { TargetServicePlanInfo } from './TargetServicePlanInfo';
import type { BillingPlanInfo } from './BillingPlanInfo';
import type { ServiceFeatureInfo } from './ServiceFeatureInfo';
import type { AccountLimits } from './AccountLimits';
import type { PackageInfo } from './PackageInfo';

export interface GetServiceInfoResponse {
  /**
   * Canonical URI of the account Service Info resource
   */
  uri: string;
  /**
   * Account Service Plan name
   */
  servicePlanName: string;
  /**
   */
  brand: BrandInfo;
  /**
   */
  contractedCountry: ContractedCountryInfo;
  /**
   */
  servicePlan: ServicePlanInfo;
  /**
   */
  targetServicePlan: TargetServicePlanInfo;
  /**
   */
  billingPlan: BillingPlanInfo;
  /**
   * Service features information, see Service Feature List
   */
  serviceFeatures: ServiceFeatureInfo[];
  /**
   */
  limits: AccountLimits;
  /**
   */
  package: PackageInfo;
}
