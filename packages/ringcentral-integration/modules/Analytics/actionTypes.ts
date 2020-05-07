import { createEnum } from '../../lib/Enum';
import {
  moduleActionTypes,
  ModuleActionTypes,
} from '../../enums/moduleActionTypes';

export const analyticsAcionTypes = createEnum(
  ['clear'],
  'analyticsAcionTypes',
  moduleActionTypes,
);

export interface AnalyticsAcionTypes extends ModuleActionTypes {
  clear: string;
}
