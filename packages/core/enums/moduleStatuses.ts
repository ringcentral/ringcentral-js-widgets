import { ObjectMap } from '../lib/ObjectMap';

export const moduleStatuses = ObjectMap.prefixKeys(
  ['pending', 'initializing', 'ready', 'resetting'],
  'module',
);
