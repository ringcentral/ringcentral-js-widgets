import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callDirection = ObjectMap.fromObject({
  inbound: 'Inbound',
  outbound: 'Outbound',
} as const);

export default callDirection;
