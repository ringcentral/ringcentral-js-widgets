import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const sourceStatus = ObjectMap.fromKeys([
  'pending',
  'initializing',
  'ready',
  'resetting',
]);

export type SourceStatusType = ObjectMapValue<typeof sourceStatus>;
