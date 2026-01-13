import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const subscriptionFilters = ObjectMap.fromObject({
  presence: '/restapi/v1.0/account/~/extension/~/presence',
  detailedPresence:
    '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
  extensionInfo: '/restapi/v1.0/account/~/extension/~',
  accountExtension: '/restapi/v1.0/account/~/extension',
  companyContacts: '/restapi/v1.0/account/~/directory/contacts',
  messageStore: '/restapi/v1.0/account/~/extension/~/message-store',
  instantMessage:
    '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
  messageThreadsSync: '/restapi/v1.0/account/~/message-threads/sync',
  extensionGrants: '/restapi/v1.0/account/~/extension/~/grant',
  optOuts: '/restapi/v1.0/account/~/a2p-sms/opt-outs',
  messageThreadsEntriesSync:
    '/restapi/v1.0/account/~/message-threads/entries/sync',
  telephonySessions: '/restapi/v1.0/account/~/extension/~/telephony/sessions',
  callAnsweredElsewhere:
    '/restapi/v1.0/account/~/extension/~/telephony?action=call-answered-elsewhere',
  missedCalls: '/restapi/v1.0/account/~/extension/~/missed-calls',
  startRing: '/restapi/v1.0/account/~/extension/~/start-ring',
  stopRing: '/restapi/v1.0/account/~/extension/~/stop-ring',
  glipPosts: '/restapi/v1.0/glip/posts',
  glipGroups: '/restapi/v1.0/glip/groups',
} as const);

export type SubscriptionFilter = ObjectMapValue<typeof subscriptionFilters>;
export type SubscriptionFilters = Record<SubscriptionFilter, string>;

export default subscriptionFilters;
