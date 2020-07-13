import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const subscriptionStatus = ObjectMap.prefixKeys(
  ['subscribing', 'subscribed', 'unsubscribing', 'notSubscribed'],
  'subscriptionStatus',
);

export default subscriptionStatus;
