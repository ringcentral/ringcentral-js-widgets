import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const entityTypes = ObjectMap.fromKeys([
  'account',
  'contact',
  'lead',
  'opportunity',
  'systemUser',
  'company',
]);

export type EntityType = ObjectMapValue<typeof entityTypes>;
export type EntityTypes = Record<EntityType, string>;
