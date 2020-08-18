import {
  ObjectMap,
  ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';

export const sourceStatus = ObjectMap.fromKeys([
  'pending',
  'initializing',
  'ready',
  'resetting',
]);

export type SourceStatusType = ObjectMapValue<typeof sourceStatus>;
