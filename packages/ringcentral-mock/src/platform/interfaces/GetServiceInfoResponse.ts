import { BrandInfo } from './BrandInfo';
import { ContractedCountryInfo } from './ContractedCountryInfo';
import { ServicePlanInfo } from './ServicePlanInfo';
import { TargetServicePlanInfo } from './TargetServicePlanInfo';
import { BillingPlanInfo } from './BillingPlanInfo';
import { ServiceFeatureInfo } from './ServiceFeatureInfo';
import { AccountLimits } from './AccountLimits';
import { PackageInfo } from './PackageInfo';

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
