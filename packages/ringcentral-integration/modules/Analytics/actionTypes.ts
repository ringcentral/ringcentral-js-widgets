import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import type { ModuleActionTypes } from '../../enums/moduleActionTypes';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const analyticsActionTypes = ObjectMap.prefixKeys(
  [...ObjectMap.keys(moduleActionTypes), 'clear'],
  'analyticsActionTypes',
);

export interface AnalyticsActionTypes extends ModuleActionTypes {
  clear: string;
}
