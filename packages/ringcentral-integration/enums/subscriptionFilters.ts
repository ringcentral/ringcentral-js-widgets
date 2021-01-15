import {
  ObjectMap,
  ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';

export const subscriptionFilters = ObjectMap.fromObject({
  presence: '/restapi/v1.0/account/~/extension/~/presence',
  detailedPresence:
    '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
  extensionInfo: '/restapi/v1.0/account/~/extension/~',
  accountExtension: '/restapi/v1.0/account/~/extension',
  companyContacts: '/restapi/v1.0/account/~/directory/contacts',
  messageStore: '/restapi/v1.0/account/~/extension/~/message-store',
  telephonySessions: '/restapi/v1.0/account/~/extension/~/telephony/sessions',
} as const);

export type SubscriptionFilter = ObjectMapValue<typeof subscriptionFilters>;
export type SubscriptionFilters = Record<SubscriptionFilter, string>;

export default subscriptionFilters;
