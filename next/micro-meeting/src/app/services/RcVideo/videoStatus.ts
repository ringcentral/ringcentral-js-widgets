import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const videoStatus = ObjectMap.prefixKeys(
  [
    'initializing',
    'initialized',
    'creating',
    'created',
    'updating',
    'updated',
    'idle',
  ],
  'videoStatus',
);
