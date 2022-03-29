import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const alertLevels = ObjectMap.fromKeys([
  'success',
  'danger',
  'warning',
  'info',
]);

export type AlertLevelType = keyof typeof alertLevels;
