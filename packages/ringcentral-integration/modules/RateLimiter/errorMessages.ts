import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const errorMessages = ObjectMap.prefixKeys(
  ['rateLimitReached'],
  'rateLimiterErrorMessages',
);
