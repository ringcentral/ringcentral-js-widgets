import {
  ObjectMap,
  type ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';

export const callDirection = ObjectMap.fromObject({
  inbound: 'Inbound',
  outbound: 'Outbound',
} as const);

export type CallDirection = ObjectMapValue<typeof callDirection>;

export default callDirection;
