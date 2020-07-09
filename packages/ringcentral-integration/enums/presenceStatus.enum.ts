import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const presenceStatus = ObjectMap.fromObject({
  offline: 'Offline',
  busy: 'Busy',
  available: 'Available',
} as const);
