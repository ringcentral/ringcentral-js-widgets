import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const availabilityTypes = ObjectMap.fromObject({
  alive: 'Alive',
  deleted: 'Deleted',
  purged: 'Purged',
} as const);

export default availabilityTypes;
