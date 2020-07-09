import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const messageDirection = ObjectMap.fromObject({
  inbound: 'Inbound',
  outbound: 'Outbound',
} as const);

export default messageDirection;
