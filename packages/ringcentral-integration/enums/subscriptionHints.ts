import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const subscriptionHints = ObjectMap.fromObject({
  limits: 'Limits',
  features: 'Features',
  accountStatus: 'AccountStatus',
  accountSettings: 'AccountSettings',
  companyNumbers: 'CompanyNumbers',
  dialingPlan: 'DialingPlan',
  permissions: 'Permissions',
  profileImage: 'ProfileImage',
  extensionInfo: 'ExtensionInfo',
  videoConfiguration: 'VideoConfiguration',
} as const);

export default subscriptionHints;
