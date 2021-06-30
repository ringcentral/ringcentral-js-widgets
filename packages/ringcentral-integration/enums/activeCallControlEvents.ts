import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const activeCallControlEvents = ObjectMap.prefixKeys(
  ['CALL_ANSWERED'],
  'activeCallControl',
);

export type ActiveCallControlEvents = keyof typeof activeCallControlEvents;
