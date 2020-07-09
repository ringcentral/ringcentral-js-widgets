import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const subscriptionFilters = ObjectMap.fromObject({
  presence: '/account/~/extension/~/presence',
  detailedPresence:
    '/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
  extensionInfo: '/account/~/extension/~',
  accountExtension: '/account/~/extension',
  companyContacts: '/account/~/directory/contacts',
} as const);

export default subscriptionFilters;
