import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const syncTypes = ObjectMap.fromObject({
  fSync: 'FSync',
  iSync: 'ISync',
} as const);

export type SyncType = typeof syncTypes[keyof typeof syncTypes];

export default syncTypes;
