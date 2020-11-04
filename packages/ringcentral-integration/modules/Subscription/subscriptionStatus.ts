import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const subscriptionStatus = ObjectMap.fromKeys([
  'subscribing',
  'subscribed',
  'unsubscribing',
  'notSubscribed',
]);
